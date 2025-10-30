// src/lib/storageHandlers.ts
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
// import type { UploadResult } from "firebase/storage"; // optional
import { storage } from "../firebase";

/**
 * Uploads a user profile picture and returns its download URL.
 */
export async function uploadUserProfilePic(
  uid: string,
  file: File,
): Promise<string> {
  const storageRef = ref(storage, `userProfilePics/${uid}/profile.jpg`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}

export function uploadFileWithProgress(
  file: File,
  uid: string,
  onProgress?: (percent: number) => void,
  newFileName?: string,
) {
  const fileExtension = file.name.replace(/^.+\.(\w+)$/, "$1");
  const filePath =
    `userProfilePics/${uid}/` + `${newFileName || Date.now()}.${fileExtension}`;
  const storageRef = ref(storage, filePath);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise<{ downloadURL: string; path: string }>(
    (resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          if (onProgress) {
            const pct = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            onProgress(Math.round(pct));
          }
        },
        (err) => reject(err),
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          resolve({ downloadURL: url, path: filePath });
        },
      );
    },
  );
}
