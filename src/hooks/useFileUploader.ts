import React from 'react'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify';
import { UPLOAD_IMAGE, UPLOAD_VIDEO } from 'src/constants/endpoints.constant';
import httpService from 'src/utils/httpService';

interface IProps {
  validateSize?: boolean;
  maxSize?: number;
  sourceId: string;
}

const useFileUploader = ({ validateSize = false, maxSize, sourceId }: IProps) => {
  // states
  const [fileType, setFileType] = React.useState<'IMAGE' | 'VIDEO' | null>(null);
  const [file, setFile] = React.useState('');

  const VIDEO_URL = UPLOAD_VIDEO;
  const IMAGE_URL = UPLOAD_IMAGE;

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: (data: FormData) => httpService.post(fileType === 'IMAGE' ? `${VIDEO_URL}/${sourceId}` : `${IMAGE_URL}/${sourceId}`, data),
    onSuccess: (data) => {
      setFile(data.data.fileName);
    },
    onError: (err) => {
      console.log(err);
      toast.error(fileType === 'IMAGE' ? 'Failed to upload image':'Failed to upload video')
    }
  });


    const uploader = React.useCallback((file: FileList) => {

      if (file.length > 1) {
        toast.error('You can not upload multiple files');
        return;
      }

      if (file[0].type.startsWith('image')) {
        setFileType('IMAGE');
      } else {
        setFileType('VIDEO');
      }

    const formData = new FormData();
    formData.append('file', file[0]);
    mutate(formData);

    }, [mutate]);

    

  return {
    uploader,
    isLoading,
    file,
    isError,
    error,
  }
}


export default useFileUploader
