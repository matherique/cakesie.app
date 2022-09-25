import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const BUCKET_NAME = "cakesie-app"
const REGION = "sa-east-1"

const client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID as string,
    secretAccessKey: process.env.SECRET_ACCESS_KEY as string,
  }
})

export async function upload(filename: string, bytes: Buffer,) {
  const cmd = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: filename,
    Body: bytes,
    ContentType: "image/png",
  });

  return client.send(cmd)
}
