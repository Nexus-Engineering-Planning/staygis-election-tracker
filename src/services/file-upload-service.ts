import fileUploadApi from "@/apis/file-upload-api";

const fileUploadService = async (data: File) => {
  const formData = new FormData();
  formData.append("file", data);
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
  );
  formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);

  const res = await fileUploadApi(formData);
  return res.data;
};

export default fileUploadService;
