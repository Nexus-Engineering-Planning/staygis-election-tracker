// import pLimit from "p-limit";
import { useMutation } from "@tanstack/react-query";
import fileUploadService from "@/services/file-upload-service";

const useFileUpload = () => {
  const useSingleFileUpload = () => {
    return useMutation({
      mutationFn: fileUploadService,
      onSuccess: (uploadRes) => {
        console.log(uploadRes);
      },
    });
    //   }
    // const mutationFn = async (
    //   image: ImageOrVideo,
    // ): Promise<AxiosResponse<UploadApiResponse>> => {
    //   const formdata = new FormData();

    //   formdata.append('file', {
    //     uri: image.path,
    //     type: image.mime,
    //     name: image.filename,
    //   });

    //   formdata.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    //   return await cloudinaryHttp.post<
    //     UploadApiResponse,
    //     AxiosResponse<UploadApiResponse>,
    //     FormData
    //   >(`${CLOUDINARY_CLOUD_NAME}/image/upload`, formdata, {
    //     onUploadProgress: (progressEvent: AxiosProgressEvent) => {
    //       if (progressEvent.total) {
    //         const progress = Number(
    //           (progressEvent.loaded / progressEvent.total).toFixed(1),
    //         );

    //         dispatch(
    //           updateImageProgress({imageName: image.filename, progress}),
    //         );
    //       }
    //     },
    //   });
    // };

    // const {
    //   mutateAsync: singleImageUploadMutation,
    //   isPending: isLoadingSingleImageUpload,
    // } = useMutation({mutationFn});

    // return {
    //   singleImageUploadMutation,
    //   isLoadingSingleImageUpload,
    // };
  };

  //   const useMultipleImageUpload = () => {
  //     const {singleImageUploadMutation} = useSingleImageUpload();

  //     const mutationFn = async (
  //       images: ImageOrVideo[],
  //     ): Promise<AxiosResponse<UploadApiResponse>[]> => {
  //       const limit = pLimit(5);

  //       return await Promise.all(
  //         images.map(image => {
  //           return limit(async () => singleImageUploadMutation(image));
  //         }),
  //       );
  //     };

  //     const {
  //       mutateAsync: multipleImageUploadMutation,
  //       isPending: isLoadingMultipleImageUpload,
  //     } = useMutation({
  //       mutationFn,
  //     });

  //     return {
  //       multipleImageUploadMutation,
  //       isLoadingMultipleImageUpload,
  //     };
  //   };

  return {
    useSingleFileUpload,
    //   useMultipleImageUpload,
  };
};

export default useFileUpload;
