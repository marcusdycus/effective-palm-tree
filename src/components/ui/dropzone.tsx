"use client";

// Packages:
import type {
  DropzoneProps as _DropzoneProps,
  DropzoneState as _DropzoneState,
} from "react-dropzone";
import React from "react";
import { useDropzone } from "react-dropzone";
import truncate from "truncate";

import { cn } from "@/lib/utils";
import { FileOutlineIcon } from "../icons/FileOutlineIcon";
import { FileUploadIcon } from "../icons/FileUploadIcon";
import { PdfIcon } from "../icons/PdfIcon";
import { TrashIcon } from "../icons/TrashIcon";
import { Label } from "./label";

export type DropzoneState = _DropzoneState;

export interface DropzoneProps
  extends Omit<_DropzoneProps, "children" | "accept"> {
  containerClassName?: string;
  dropZoneClassName?: string;
  children?: (dropzone: DropzoneState) => React.ReactNode;
  showFilesList?: boolean;
  accept: string;
  dropzoneTitle?: string;
  // showErrorMessage?: boolean;
  labelId?: string;
  setFilesUploaded: React.Dispatch<React.SetStateAction<File[]>>;
  filesUploaded: File[];
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: string;
  deleteUploadedFile: (index: number) => void;
  blockDisallowedFiles?: boolean;
}

const Dropzone = ({
  containerClassName,
  dropZoneClassName,
  children,
  showFilesList = true,
  dropzoneTitle = "Drop files here",
  accept,
  setFilesUploaded,
  filesUploaded,
  setErrorMessage,
  errorMessage,
  deleteUploadedFile,
  ...props
}: DropzoneProps) => {
  const dropzone = useDropzone({
    ...props,
    onDrop(acceptedFiles, fileRejections, event) {
      const disallowedExtensions = [
        ".jpg",
        ".jpeg",
        ".png",
        ".gif",
        ".webp",
        ".svg",
      ];

      const triedToAddDisallowedFile = acceptedFiles.some((file) => {
        const ext = file.name.toLowerCase().slice(file.name.lastIndexOf("."));
        return disallowedExtensions.includes(ext);
      });

      if (props.blockDisallowedFiles && triedToAddDisallowedFile) {
        setErrorMessage("Image files are not allowed.");
        return;
      }

      if (props.onDrop) props.onDrop(acceptedFiles, fileRejections, event);
      else {
        setFilesUploaded((_filesUploaded) => [
          ..._filesUploaded,
          ...acceptedFiles,
        ]);

        if (fileRejections.length > 0) {
          let _errorMessage = `Could not upload ${fileRejections[0]?.file.name}`;
          if (fileRejections.length > 1)
            _errorMessage =
              _errorMessage + `, and ${fileRejections.length - 1} other files.`;
          setErrorMessage(_errorMessage);
        } else {
          setErrorMessage("");
        }
      }
    },

    onDropAccepted: (acceptedFiles, event) => {
      if (props.onDropAccepted) props.onDropAccepted(acceptedFiles, event);
    },
  });

  return (
    <div className={cn("flex w-full flex-col gap-2", containerClassName)}>
      <div className="flex w-full flex-row items-center gap-2">
        <Label className={"text-sm font-bold"}>{dropzoneTitle}</Label>
      </div>
      <div
        {...dropzone.getRootProps()}
        className={cn(
          "flex h-32 w-full cursor-pointer select-none items-center justify-center rounded-lg border-2 border-dashed border-gray-200 px-10 transition-all hover:bg-accent hover:text-accent-foreground",
          dropZoneClassName,
        )}
      >
        <input
          {...dropzone.getInputProps()}
          type={"file"}
          accept={typeof accept === "string" ? accept : undefined}
        />
        {children ? (
          children(dropzone)
        ) : dropzone.isDragAccept ? (
          <div className="text-sm font-medium">Drop your files here!</div>
        ) : (
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex flex-row items-center text-sm font-medium">
              <FileUploadIcon className="mr-2 h-8 w-8" />
            </div>
            <div className="flex flex-row items-center text-sm font-bold">
              Upload a file or drag and drop
            </div>
            <div className="flex  flex-row items-center text-sm font-light text-gray-400">
              {`${typeof accept === "string" ? accept : ""} up to `}
              {props?.maxSize
                ? props.maxSize >= 1024 * 1024 * 1024
                  ? (props.maxSize / (1024 * 1024 * 1024)).toFixed(2) + " GB"
                  : (props.maxSize / (1024 * 1024)).toFixed(2) + " MB"
                : "10MB"}
            </div>
            {props.maxSize && (
              <div className="text-xs font-medium text-gray-400">
                {`Max. file size: ${
                  props.maxSize >= 1024 * 1024 * 1024
                    ? (props.maxSize / (1024 * 1024 * 1024)).toFixed(2) + " GB"
                    : (props.maxSize / (1024 * 1024)).toFixed(2) + " MB"
                }`}
              </div>
            )}
          </div>
        )}
      </div>
      {errorMessage && (
        <span className="text-xs text-red-600">{errorMessage}</span>
      )}
      {showFilesList && filesUploaded.length > 0 && (
        <div
          className={`flex w-full flex-col gap-2 ${filesUploaded.length > 2 ? "h-48" : "h-fit"} m-y ${filesUploaded.length > 0 ? "pb-2" : ""}`}
        >
          <div className="w-full">
            {filesUploaded.map((fileUploaded, index) => (
              <div
                key={index}
                className="mt-2 flex h-16 w-full flex-row items-center justify-between rounded-lg border-2 border-solid border-gray-200 px-4 shadow-sm"
              >
                <div className="flex h-full flex-row items-center gap-4">
                  {fileUploaded.type === "application/pdf" ? (
                    <PdfIcon className="h-6 w-6" />
                  ) : (
                    <FileOutlineIcon className="h-6 w-6" />
                  )}
                  <div className="flex flex-col gap-0">
                    <div className="text-[0.85rem] font-medium leading-snug">
                      {truncate(
                        fileUploaded.name.split(".").slice(0, -1).join("."),
                        30,
                      )}
                    </div>
                    <div className="text-[0.7rem] leading-tight text-gray-500">
                      .{fileUploaded.name.split(".").pop()} •{" "}
                      {(fileUploaded.size / (1024 * 1024)).toFixed(2)} MB
                    </div>
                  </div>
                </div>
                <div
                  className="cursor-pointer select-none rounded-full border-2 border-solid border-gray-100 p-2 shadow-sm transition-all hover:bg-accent"
                  onClick={() => deleteUploadedFile(index)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      deleteUploadedFile(index);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <TrashIcon className="h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropzone;
