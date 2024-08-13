"use client";

import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { convertFileToUrl } from "@/lib/utils";

type FileUploaderProps = {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
  type: "image/*" | "application/pdf";
};

export const FileUploader = ({ files, onChange, type }: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  console.log(files, "filesss");

  return (
    <div {...getRootProps()} className="file-upload">
      <input {...getInputProps()} accept={type} />
      {files && files?.length > 0 ? (
        <>
          {files[0]?.type == "application/pdf" ? (
            <iframe
            src={convertFileToUrl(files[0])}
            width="100%"
            height="600px"
            style={{border: "none"}}
        ></iframe>
          ) : (
            <Image
              src={convertFileToUrl(files[0])}
              width={1000}
              height={1000}
              alt="uploaded image"
              className="max-h-[300px] overflow-hidden object-cover"
            />
          )}
        </>
      ) : (
        <>
          <Image
            src="/assets/icons/upload.svg"
            width={40}
            height={40}
            alt="upload"
          />
          <div className="file-upload_label">
            <p className="text-14-regular ">
              <span className="text-green-500">Click to upload </span>
              or drag and drop
            </p>
            <p className="text-12-regular">
              {type === "image/*"
                ? "SVG, PNG, JPG or GIF (max. 800x400px)"
                : "Only PDF is accepted"}
            </p>
          </div>
        </>
      )}
    </div>
  );
};
