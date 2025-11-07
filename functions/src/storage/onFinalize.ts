import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import sharp from "sharp";
import * as path from "path";
import * as os from "os";
import * as fs from "fs";
import { getDownloadURL } from "firebase-admin/storage";
import { logger } from "firebase-functions";

/**
 * Generate profile pictures variants
 */
export const onFinalizeFileUpload = functions
  .region("southamerica-east1")
  .storage.object()
  .onFinalize(async (object) => {
    // Removed context, it's not used
    const mediumFilePath = object.name; // Medium is the initial uploaded file Size
    const fileBucket = object.bucket; // Get the bucket name

    if (!mediumFilePath) {
      logger.log("No file path given! Finalizing...");
      return;
    }

    if (!mediumFilePath.startsWith("userProfilePics/")) {
      logger.log("Not a user profile picture. Finalizing...");
      return null;
    }

    const fileName = path.basename(mediumFilePath);
    const pathParts = mediumFilePath.split("/");
    const fileExtension = path.extname(mediumFilePath);
    const uid = pathParts[1];

    if (fileName.startsWith("thumb_") || fileName.startsWith("small_")) {
      logger.log("File is already a variant. Finalizing...");
      return null;
    }

    if (!uid) {
      logger.log("No user ID was given. Finalizing...");
      return null;
    }

    // Download initial file for creating small and thumb variants
    const tempLocalFile = path.join(os.tmpdir(), fileName);
    const currentBucket = admin.storage().bucket(fileBucket);
    const mediumFile = currentBucket.file(mediumFilePath);
    const mediumUrl = await getDownloadURL(mediumFile);

    // Update Auth (do it here instead of in the onUpdate function)
    try {
      logger.log("Updating Auth picture to the medium variant...");
      await admin.auth().updateUser(uid, { photoURL: mediumUrl });
      logger.log("Successfully updated Auth picture!");
    } catch (err) {
      logger.error("Could not update auth user photoURL", err);
    }

    try {
      logger.log("Saving medium image URL to firestore...");
      await admin.firestore().doc(`users/${uid}`).set(
        {
          photos: {
            mediumUrl,
          },
        },
        { merge: true },
      );
      logger.log("Successfully Saved medium size to firestore!");
    } catch (err) {
      logger.log("Error when saving medium size image URL to firestore:", err);
    }

    logger.log(`Downloading medium file... ${mediumFilePath}, ${mediumFile}`);
    for (let tryNum = 1; ; ) {
      try {
        // Add a small delay to prevent errors
        await new Promise((resolve) => setTimeout(resolve, 500));
        await mediumFile.download({ destination: tempLocalFile });
        break;
      } catch {
        tryNum++;
        if (tryNum >= 10) {
          logger.log("File failded to 10 times. returning...");
          return null;
        }
        logger.log(`Failed when downloading: attempting again nº ${tryNum}...`);
      }
    }

    logger.log("File downloaded, creating variants...");

    // Create "small" version
    const smallPath = `userProfilePics/${uid}/small_profile.${fileExtension}`;
    const tempSmall = path.join(os.tmpdir(), `small_profile.${fileExtension}`);
    await sharp(tempLocalFile)
      .resize({ width: 180, height: 180, fit: "inside" })
      .toFile(tempSmall);
    await currentBucket.upload(tempSmall, {
      destination: smallPath,
      metadata: { contentType: object.contentType },
    });
    logger.log("Successfully created small picture variant!");

    // Create "thumb" version
    const thumbPath = `userProfilePics/${uid}/thumb_profile`;
    const tempThumb = path.join(os.tmpdir(), "thumb_profile");
    await sharp(tempLocalFile)
      .resize({ width: 48, height: 48, fit: "cover" })
      .toFile(tempThumb);
    await currentBucket.upload(tempThumb, {
      destination: thumbPath,
      metadata: { contentType: object.contentType },
    });
    logger.log("Successfully created thumb picture variant!");

    // getDownloadURL provides a long-lived, publicly accessible URL, which works in emulators and production.
    const smallFile = currentBucket.file(smallPath);
    const smallUrl = await getDownloadURL(smallFile);
    const thumbFile = currentBucket.file(thumbPath);
    const thumbUrl = await getDownloadURL(thumbFile);

    // Update Firestore:
    try {
      logger.log("Saving variant image URLs to firestore...");
      await admin.firestore().doc(`users/${uid}`).set(
        {
          photos: {
            // medium: mediumFilePath,
            // mediumUrl,
            smallUrl,
            thumbUrl,
          },
        },
        { merge: true },
      );
      logger.log("Successfully Saved variants to firestore!");
    } catch (err) {
      logger.log("Error when saving variant image URLs to firestore:", err);
    }

    // Clean temp files
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Use asynchronous unlink and wait for all deletions
      await Promise.all([
        fs.promises.rm(tempLocalFile, { force: true, recursive: false }), // force can help with permissions sometimes
        fs.promises.rm(tempSmall, { force: true, recursive: false }),
        fs.promises.rm(tempThumb, { force: true, recursive: false }),
      ]);

      logger.log("Successfully deleted temporary files.");
    } catch (err) {
      logger.log("Failed to delete temporary files after 1s:", err);
    }

    logger.log("Finished onFinalize!");
    return null;
  });
