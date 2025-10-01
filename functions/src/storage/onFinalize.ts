import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import sharp from "sharp";
import * as path from "path";
import * as os from "os";
import * as fs from "fs";
import { getDownloadURL } from "firebase-admin/storage";

/**
 * Generate profile pictures variants
 */
export const onFinalizeFileUpload = functions.storage
  .object()
  .onFinalize(async (object) => {
    // Removed context, it's not used
    const filePath = object.name;
    const fileBucket = object.bucket; // Get the bucket name

    if (!filePath) {
      console.log("No file path given! Finalizing...");
      return;
    }

    if (!filePath.startsWith("userProfilePics/")) {
      console.log("Not a user profile picture. Finalizing...");
      return null;
    }

    // This checks the actual filename, not the whole path.
    const fileName = path.basename(filePath);
    if (fileName.startsWith("thumb_") || fileName.startsWith("small_")) {
      console.log("File is already a variant. Finalizing...");
      return null;
    }

    const parts = filePath.split("/");
    const uid = parts[1];
    if (!uid) {
      console.log("No user ID was given. Finalizing...");
      return null;
    }

    const tempLocalFile = path.join(os.tmpdir(), fileName);

    // Use the bucket from the event, not a globally imported one
    const currentBucket = admin.storage().bucket(fileBucket);
    await currentBucket.file(filePath).download({ destination: tempLocalFile });

    const smallPath = `userProfilePics/${uid}/small_${fileName}`;
    const thumbPath = `userProfilePics/${uid}/thumb_${fileName}`;
    const tempSmall = path.join(os.tmpdir(), "small_" + fileName);
    const tempThumb = path.join(os.tmpdir(), "thumb_" + fileName);

    // Create "small" version
    await sharp(tempLocalFile)
      .resize({ width: 180, height: 180, fit: "inside" })
      .toFile(tempSmall);
    await currentBucket.upload(tempSmall, {
      destination: smallPath,
      metadata: { contentType: "image/jpeg" },
    });
    console.log("Successfully created small picture variant!");

    // Create "thumb" version
    await sharp(tempLocalFile)
      .resize({ width: 48, height: 48, fit: "cover" })
      .toFile(tempThumb);
    await currentBucket.upload(tempThumb, {
      destination: thumbPath,
      metadata: { contentType: "image/jpeg" },
    });
    console.log("Successfully created thumb picture variant!");

    // Use getDownloadURL for a stable URL, which works in emulators and production.
    // getDownloadURL provides a long-lived, publicly accessible URL.
    const smallFile = currentBucket.file(smallPath);
    const smallUrl = await getDownloadURL(smallFile);
    const thumbFile = currentBucket.file(thumbPath);
    const thumbUrl = await getDownloadURL(thumbFile);

    // Update Storage:
    try {
      console.log("Saving image URLs to firestore...");
      await admin
        .firestore()
        .doc(`users/${uid}`)
        .set(
          {
            userPhoto: {
              original: filePath,
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

    // Update Auth is made here instead of the onUpdate function.
    try {
      console.log("Updating Auth picture to the small variant...");
      await admin.auth().updateUser(uid, { photoURL: smallUrl });
      console.log("Successfully updated Auth picture!");
    } catch (e) {
      console.warn("Could not update auth user photoURL", e);
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
