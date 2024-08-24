// backend/utils/s3.ts
import { S3 } from 'aws-sdk';

const s3 = new S3();

export const uploadFileToS3 = async (fileContent: Buffer, fileName: string) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME || "",
    Key: fileName,
    Body: fileContent,
  };
  const uploadResult = await s3.upload(params).promise();
  return uploadResult.Location;
};
