import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import sharp from "sharp";
import * as path from "path";
import * as os from "os";
import * as fs from "fs";
import { getDownloadURL } from "firebase-admin/storage";
// import { ref, getMetadata } from "firebase/storage";

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
      console.log("No file path given! Finalizing...");
      return;
    }

    if (!mediumFilePath.startsWith("userProfilePics/")) {
      console.log("Not a user profile picture. Finalizing...");
      return null;
    }

    const fileName = path.basename(mediumFilePath);
    const pathParts = mediumFilePath.split("/");
    const fileExtension = path.extname(mediumFilePath);
    const uid = pathParts[1];

    if (fileName.startsWith("thumb_") || fileName.startsWith("small_")) {
      console.log("File is already a variant. Finalizing...");
      return null;
    }

    if (!uid) {
      console.log("No user ID was given. Finalizing...");
      return null;
    }

    // Download initial file for creating small and thumb variants
    const tempLocalFile = path.join(os.tmpdir(), fileName);
    const currentBucket = admin.storage().bucket(fileBucket);
    const fileRef = currentBucket.file(mediumFilePath);
    const fileMetadata = await fileRef.getMetadata();
    console.log(fileMetadata);
    await fileRef.download({ destination: tempLocalFile });

    // Create "small" version
    const smallPath = `userProfilePics/${uid}/small_profile.${fileExtension}`;
    const tempSmall = path.join(os.tmpdir(), `small_profile.${fileExtension}`);
    await sharp(tempLocalFile)
      .resize({ width: 180, height: 180, fit: "inside" })
      .toFile(tempSmall);
    await currentBucket.upload(tempSmall, {
      destination: smallPath,
      metadata: { contentType: "image/jpeg" },
    });
    console.log("Successfully created small picture variant!");

    // Create "thumb" version
    const thumbPath = `userProfilePics/${uid}/thumb_profile`;
    const tempThumb = path.join(os.tmpdir(), "thumb_profile");
    await sharp(tempLocalFile)
      .resize({ width: 48, height: 48, fit: "cover" })
      .toFile(tempThumb);
    await currentBucket.upload(tempThumb, {
      destination: thumbPath,
      metadata: { contentType: "image/jpeg" },
    });
    console.log("Successfully created thumb picture variant!");

    // getDownloadURL provides a long-lived, publicly accessible URL, which works in emulators and production.
    const mediumFile = currentBucket.file(mediumFilePath);
    const mediumUrl = await getDownloadURL(mediumFile);
    const smallFile = currentBucket.file(smallPath);
    const smallUrl = await getDownloadURL(smallFile);
    const thumbFile = currentBucket.file(thumbPath);
    const thumbUrl = await getDownloadURL(thumbFile);

    // Update Auth (do it here instead of in the onUpdate function)
    try {
      console.log("Updating Auth picture to the small variant...");
      await admin.auth().updateUser(uid, { photoURL: mediumUrl });
      console.log("Successfully updated Auth picture!");
    } catch (e) {
      console.warn("Could not update auth user photoURL", e);
    }

    // Update Firestore:
    try {
      console.log("Saving image URLs to firestore...");
      await admin
        .firestore()
        .doc(`users/${uid}`)
        .set(
          {
            photos: {
              medium: mediumFilePath,
              mediumUrl,
              small: smallPath,
              smallUrl,
              thumb: thumbPath,
              thumbUrl,
            },
          },
          { merge: true },
        );
      console.log("Successfully Saved to firestore!");
    } catch (err) {
      console.log("Error when saving image URLs to firestore:", err);
    }

    // Clean temp files
    try {
      fs.unlinkSync(tempLocalFile);
      fs.unlinkSync(tempSmall);
      fs.unlinkSync(tempThumb);
    } catch (err) {
      console.log("Failed to delete temporary files:", err);
    }

    console.log("Finished onFinalize!");
    return null;
  });
