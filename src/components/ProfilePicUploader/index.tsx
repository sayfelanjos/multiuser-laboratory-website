// src/components/ProfilePicUploader.tsx
import React, {
  useState,
  useCallback,
  useEffect,
  // useRef
} from "react";
import { useDropzone } from "react-dropzone";
import Cropper from "react-easy-crop";
import type { Point, Area } from "react-easy-crop";
import {
  Button,
  Modal,
  Spinner,
  ProgressBar,
  Image,
  Container,
} from "react-bootstrap";
import { Divider, App } from "antd";
import FormRange from "react-bootstrap/FormRange";
import {} from // UploadOutlined,
// GoogleOutlined,
// WindowsOutlined,
"@ant-design/icons";

import {
  CameraFill,
  Upload,
  PenFill,
  PencilSquare,
} from "react-bootstrap-icons";
import { useAuth } from "../../hooks/useAuth";
import {
  // compressImage,
  resizeImageFile,
  // makeThumbnail,
} from "../../lib/imageUtils";
import {
  // uploadUserProfilePic,
  uploadFileWithProgress,
} from "../../lib/storageHandlers";
import getCroppedImg from "../../lib/imageUtils";
import "./_profile-pic-uploader.scss";
import userAvatar from "../../assets/images/carbon--user-avatar-filled.png";
import { showNotification } from "../../helpers/showNotification";

// import { httpsCallable } from "firebase/functions";
// import { openGoogleDrivePicker } from "../../lib/googlePicker";
// import { openOneDrivePicker } from "../../lib/oneDrivePicker";
// import { functions } from "../../firebase";

// type Props = {
//   googleConfig?: { clientId: string; apiKey: string; appId: string };
//   oneDriveConfig?: { clientId: string; redirectUri?: string; scope?: string[] };
// };
// export default function ProfilePicUploader({
//   googleConfig,
//   oneDriveConfig,
// }: Props) {

const usePrimaryInput = () => {
  // Default to 'mouse' for a desktop-first experience.
  const [primaryInput, setPrimaryInput] = useState<"mouse" | "touch">("mouse");

  useEffect(() => {
    // This media query is a great first-pass check for devices that are definitively touch-only.
    const isTouchOnlyDevice = window.matchMedia(
      "(hover: none) and (pointer: coarse)",
    ).matches;
    if (isTouchOnlyDevice) {
      setPrimaryInput("touch");
      return;
    }

    // For hybrid devices, we listen for the FIRST interaction to determine the user's intent.
    const handleMouseMove = () => {
      setPrimaryInput("mouse");
      cleanup();
    };

    const handleTouchStart = () => {
      setPrimaryInput("touch");
      cleanup();
    };

    // The cleanup function removes both listeners.
    const cleanup = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleTouchStart);
    };

    // We add the listeners. The first one to fire will call cleanup().
    window.addEventListener("mousemove", handleMouseMove, { once: true });
    window.addEventListener("touchstart", handleTouchStart, { once: true });

    // Fallback cleanup if the component unmounts before any interaction.
    return cleanup;
  }, []);

  return primaryInput;
};

export default function ProfilePicUploader({
  photoSize = 180,
}: {
  photoSize?: number;
}) {
  const { user, isLoading: isLoadingUser, refreshUserData } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [cropping, setCropping] = useState(false);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [progress, setProgress] = useState<number | null>(null);
  const [loadingSave, setLoadingSave] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [editing, setEditing] = useState(false);
  const primaryInput = usePrimaryInput();
  const { notification } = App.useApp();
  // const updateUserProfile = httpsCallable(functions, "updateUser");

  // === Dropzone setup ===
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const f = acceptedFiles[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
      setCropping(true); // open crop modal
    }
  }, []);

  const {
    getRootProps,
    getInputProps,
    open: openFileDialog,
    isDragActive,
  } = useDropzone({
    accept: { "image/*": [] },
    multiple: false,
    noClick: true,
    noKeyboard: true,
    onDrop,
  });

  // === Drop area styling: ===
  const isTouchPrimary = primaryInput === "touch";

  const dropzoneClassName =
    "dropzone p-5 mt-3 " +
    // (isTouchPrimary ? "is-touch p-2 px-3 " : "") +
    (isTouchPrimary ? "is-touch p-2 px-3 " : "") +
    (isDragActive && !isTouchPrimary ? "is-dragging " : "");

  // === Save cropped + compressed image ===
  async function handleSave() {
    if (!file || !user || !preview || !croppedAreaPixels) {
      return;
    }

    setLoadingSave(true);

    try {
      const { file: croppedFile, url: croppedFileUrl } = await getCroppedImg(
        preview,
        croppedAreaPixels,
      );

      // compress main image
      const resizedFile = await resizeImageFile(croppedFile, 512, 512, 1);

      setProgress(0);

      // upload main image with progress
      const url = await uploadFileWithProgress(
        resizedFile,
        user.uid,
        setProgress,
        "profile",
      );

      // upload thumbnail
      // await uploadUserProfilePic(user.uid, thumbFile);

      console.log("Uploaded profile pic:", url);
      setPreview(croppedFileUrl);
    } catch (err) {
      showNotification(
        notification,
        "Erro ao salvar foto de usuário!",
        "error",
      );
      console.error("Error uploading profile pic", err);
    } finally {
      setEditing(false);
      setCropping(false);
      setLoadingSave(false);
      setProgress(null);
      setZoom(1);
      setCrop({ x: 0, y: 0 });
      showNotification(
        notification,
        "Foto de usuário salva com sucesso!",
        "success",
      );
      refreshUserData();
    }
  }

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  // // === Cloud picker handlers (commented out for now) ===
  // async function onPickFromDrive() {
  //   if (!user || !googleConfig) return;
  //   const file = await openGoogleDrivePicker(googleConfig);
  //   if (file) {
  //     setFile(file);
  //     setPreview(URL.createObjectURL(file));
  //     setCropping(true);
  //   }
  // }

  // async function onPickFromOneDrive() {
  //   if (!user || !oneDriveConfig) return;
  //   const file = await openOneDrivePicker(oneDriveConfig);
  //   if (file) {
  //     setFile(file);
  //     setPreview(URL.createObjectURL(file));
  //     setCropping(true);
  //   }
  // }

  // // Check providers in the logged in user
  // const hasGoogle = user?.providerData?.some(
  //   (p) => p.providerId === "google.com",
  // );
  // const hasMicrosoft = user?.providerData?.some(
  //   (p) => p.providerId === "microsoft.com",
  // );

  return (
    <Container className="d-flex flex-column align-items-center position-relative">
      {/* Current preview */}
      <Image
        src={preview || user?.photoURL || userAvatar}
        roundedCircle
        height={photoSize}
        alt="User"
        // style={{ objectFit: "cover" }}
        // className="border"ss
      />
      {editing && (
        <>
          {/* Dropzone */}
          {isTouchPrimary || (
            <>
              <div {...getRootProps({ className: dropzoneClassName })}>
                <input {...getInputProps()} />
                {isDragActive ? "Drop image here" : "Drag & drop image here"}
              </div>
              <Divider> ou </Divider>
            </>
          )}
          <Button className="m-2" type="button" onClick={openFileDialog}>
            Procurar Arquivo
          </Button>
        </>
      )}

      <Button
        className={"" + (editing ? "" : "position-absolute")}
        style={{
          // top: `${photoSize}px`,
          // left: `${Math.round(photoSize / 2)}px`,
          bottom: `${0}px`,
          right: `${0}px`,
          height: "fit-content",
        }}
        type="button"
        variant={editing ? "link" : "secondary"}
        onClick={() => setEditing((e) => !e)}
      >
        {editing ? (
          "Cancelar"
        ) : (
          // <CameraFill />
          // <Upload />
          <h5 className="">
            <PencilSquare />
          </h5>
        )}
      </Button>

      {/* Action buttons */}
      <div className="d-flex gap-2">
        {/* <Button onClick={handleManualSelect}>
          <UploadOutlined /> Upload
        </Button> */}

        {/* Uncomment when Google Picker is ready */}

        {/* {hasGoogle && (
          <Button variant="light" onClick={onPickFromDrive}>
            <GoogleOutlined /> Import from Google Drive
          </Button>
        )} */}

        {/* Uncomment when OneDrive Picker is ready */}

        {/* {hasMicrosoft && (
          <Button variant="light" onClick={onPickFromOneDrive}>
            <WindowsOutlined /> Import from OneDrive
          </Button>
        )} */}
      </div>
      {/* Progress */}
      {progress !== null && (
        <div className="mt-2" style={{ width: "100%" }}>
          <ProgressBar now={progress} label={`${progress}%`} />
        </div>
      )}
      {/* Crop modal */}
      <Modal show={cropping} onHide={() => setCropping(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Recortar Imagem</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "400px", position: "relative" }}>
          <Cropper
            image={preview || ""}
            crop={crop}
            zoom={zoom}
            cropShape="round"
            showGrid={false}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={(z) => {
              setZoom(z);
            }}
            onCropComplete={onCropComplete}
          />
        </Modal.Body>
        <Modal.Footer>
          <FormRange
            min={1}
            max={3}
            step={0.02}
            value={zoom}
            onChange={(e) => setZoom(+e.target.value)}
          />
          <Button variant="secondary" onClick={() => setCropping(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={loadingSave && isLoadingUser}>
            {loadingSave ? <Spinner animation="border" size="sm" /> : "Salvar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
