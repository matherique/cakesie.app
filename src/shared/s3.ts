import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

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
  });

  return client.send(cmd)
}

export async function get(filename: string) {
  const cmd = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: filename,
  });

  return getSignedUrl(client, cmd, { expiresIn: 60 * 60 })
}

export async function remove(filename: string) {
  const cmd = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: filename,
  });

  return client.send(cmd)
}