"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Loader2, FileText } from "lucide-react";
import { toast } from "sonner";
import { Input } from "./ui/input";
import useFileUpload from "@/lib/hooks/use-file-upload";

interface FileUploaderProps {
  onUploadSuccess: (data: { public_url: string; public_id: string }) => void;
  previewUrl?: string;
}

const FileUploader = ({ onUploadSuccess, previewUrl }: FileUploaderProps) => {
  const [fileUrl, setFileUrl] = useState<string | undefined>(previewUrl);
  //   const [isUploading, setIsUploading] = useState(false);
  const [isPdf, setIsPdf] = useState<boolean>(
    previewUrl?.endsWith(".pdf") || false
  );

  const { useSingleFileUpload } = useFileUpload();
  const { mutateAsync: uploadFile, isPending: isUploading } =
    useSingleFileUpload();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const MAX_IMAGE_SIZE = 2_097_152; // 2MB
    const MAX_PDF_SIZE = 4_194_304; // 4MB

    // Check file type and size
    const isImage = file.type.startsWith("image/");
    const isPdfFile = file.type === "application/pdf";

    if (isImage && file.size > MAX_IMAGE_SIZE) {
      toast.error("Image size exceeds 2MB. Please select a smaller file.");
      event.target.value = "";
      return;
    }

    if (isPdfFile && file.size > MAX_PDF_SIZE) {
      toast.error("PDF size exceeds 4MB. Please select a smaller file.");
      event.target.value = "";
      return;
    }

    if (!isImage && !isPdfFile) {
      toast.error("Please upload a valid image (PNG, JPEG, JPG) or PDF file.");
      event.target.value = "";
      return;
    }

    setIsPdf(isPdfFile);

    await uploadFile(file, {
      onSuccess: (uploadResData) => {
        if (uploadResData) {
          const { secure_url, public_id } = uploadResData;
          setFileUrl(secure_url);
          onUploadSuccess({ public_url: secure_url, public_id });
        }
      },
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <label className="cursor-pointer">
        {fileUrl ? (
          <div className="flex flex-1 items-center justify-center relative h-14 w-full bg-white">
            {isPdf ? (
              <FileText className="h-32 w-32 rounded-md" />
            ) : (
              <Image
                src={fileUrl}
                alt="Uploaded Image"
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            )}
          </div>
        ) : (
          <div className="flex flex-1 h-14 items-center justify-center border border-dashed rounded-md">
            {isUploading ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <span>+</span>
            )}
          </div>
        )}

        <Input
          id="report"
          type="file"
          accept="image/png,image/jpeg,image/jpg"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default FileUploader;
