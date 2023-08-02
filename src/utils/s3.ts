import S3 from 'react-s3';

export const s3_config = {
    bucketName: import.meta.env.VITE_AWS_BUCKET_NAME,
    dirName: 'media', /* optional */
    region: import.meta.env.VITE_AWS_REGION,
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_KEY,
}

const ReactS3Client = new S3(s3_config);


export default ReactS3Client
