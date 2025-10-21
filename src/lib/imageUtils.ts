import pica from "pica";
import { Area } from "react-easy-crop";

function get2DContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("2D context not supported");
  }
  return ctx;
}

export async function resizeImageFile(
  file: File,
  maxWidth = 1024,
  maxHeight = 1024,
  quality = 1,
  newFileName?: string,
): Promise<File> {
  const imgBitmap = await createImageBitmap(file);
  const ratio = Math.min(
    maxWidth / imgBitmap.width,
    maxHeight / imgBitmap.height,
    1,
  );
  const targetWidth = Math.round(imgBitmap.width * ratio);
  const targetHeight = Math.round(imgBitmap.height * ratio);

  const srcCanvas = document.createElement("canvas");
  srcCanvas.width = imgBitmap.width;
  srcCanvas.height = imgBitmap.height;
  const sctx = get2DContext(srcCanvas);
  sctx.drawImage(imgBitmap, 0, 0);

  const dstCanvas = document.createElement("canvas");
  dstCanvas.width = targetWidth;
  dstCanvas.height = targetHeight;

  await pica().resize(srcCanvas, dstCanvas);

  // convert to blob
  const blob = await pica().toBlob(dstCanvas, "image/jpeg", quality);
  return new File(
    [blob],
    `${newFileName || file.name.replace(/\.[^/.]+$/, "")}.jpg`,
    {
      type: "image/jpeg",
    },
  );
}

export async function makeThumbnail(
  file: File,
  thumbSize = 256,
  quality = 1,
): Promise<File> {
  return await resizeImageFile(file, thumbSize, thumbSize, quality);
}

export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

export function degreeToRadian(degreeValue: number) {
  return (degreeValue * Math.PI) / 180;
}

/**
 * Returns the new bounding area of a rotated rectangle.
 */
export function rotateSize(width: number, height: number, rotation: number) {
  const rotRad = degreeToRadian(rotation);

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 */
export default async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area,
  rotation = 0,
  flip = { horizontal: false, vertical: false },
) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No image context");
  }

  const rotRad = degreeToRadian(rotation);

  // calculate bounding box of the rotated image
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation,
  );

  // set canvas size to match the bounding box
  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  // translate canvas context to a central location to allow rotating and flipping around the center
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.translate(-image.width / 2, -image.height / 2);

  // draw rotated image
  ctx.drawImage(image, 0, 0);

  const croppedCanvas = document.createElement("canvas");

  const croppedCtx = croppedCanvas.getContext("2d");

  if (!croppedCtx) {
    throw new Error("No cropped image context");
  }

  // Set the size of the cropped canvas
  croppedCanvas.width = pixelCrop.width;
  croppedCanvas.height = pixelCrop.height;

  // Draw the cropped image onto the new canvas
  croppedCtx.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  );

  // As Base64 string
  // return croppedCanvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise<{ blob: Blob; url: string; file: File }>((resolve) => {
    croppedCanvas.toBlob((file) => {
      if (file) {
        resolve({
          blob: file,
          url: URL.createObjectURL(file),
          file: new File([file], "cropped-file"),
        });
      }
    }, "image/jpeg");
  });
}
