// ======================================================================
// Presigned URL Entity

export interface PresignedUrl {
  space_image_id: string;
  slot_id: string;
  presigned_url: string;
}

// ======================================================================
// Presigned URL Create DTOs

export interface CreatePresignedUrlsResponse {
  data: PresignedUrl[];
}
