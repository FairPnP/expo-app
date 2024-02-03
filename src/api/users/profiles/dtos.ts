// ======================================================================
// Entity

export interface UserProfile {
  user_id: string;
  name: string;
  avatar_url?: string;
}

// ======================================================================
// Create DTOs

export interface CreatePresignedUrlResponse {
  upload_url: string;
  fetch_url: string;
}

// ======================================================================
// Read DTOs

export interface ReadUserProfileResponse {
  user_profile: UserProfile;
}

// ======================================================================
// Update DTOs

export interface UpdateUserProfileRequest {
  name?: string;
  avatar_url?: string;
}

export interface UpdateUserProfileResponse {
  user_profile: UserProfile;
}
