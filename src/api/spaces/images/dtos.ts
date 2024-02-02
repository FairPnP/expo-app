// ======================================================================
// Presigned URL Entity

export interface PresignedUrl {
  space_image_id: number;
  slot_id: number;
  presigned_url: string;
}

// ======================================================================
// Presigned URL Create DTOs

export interface CreatePresignedUrlsResponse {
  data: PresignedUrl[];
}
