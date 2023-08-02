/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react'
import { s3_config } from '../utils/s3';
import uploadFile from 'react-s3';
import { Buffer } from "buffer";


const useUploader = () => {
    const uploader = React.useCallback(async(file: File) => {
      console.log(file);
        const response = await uploadFile.uploadFile(file, s3_config);
        console.log(response);
        return response;
    }, []);
  return {
    uploader
  }
}

export default useUploader
