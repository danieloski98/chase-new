import React from 'react'
import { s3_config } from '../utils/s3';
import { uploadFile } from 'react-s3';

const useUploader = () => {
    const uploader = React.useCallback(async(file: File) => {
        const response = await uploadFile(file, s3_config);
        console.log(response);
        return response;
    }, []);
  return {
    uploader
  }
}

export default useUploader
