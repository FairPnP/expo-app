import axios from 'axios';

export type UploadS3Response = {
  url: string;
};

export async function uploadToS3(
  preSignedUrl: string,
  imageUri: string,
): Promise<string> {
  const fileData = await fetch(imageUri);
  const blob = await fileData.blob();

  try {
    const response = await axios.put(preSignedUrl, blob, {
      headers: {
        'Content-Type': blob.type,
      },
      transformRequest: d => d,
    });

    return response.data;
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw error;
  }
}
