// useUpdateUser.js
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {UserProfileAPI, uploadToS3} from '@/api';
import {USER_QUERY_KEY} from './consts';

export const useUpdateUserProfiles = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      avatarUri,
    }: {
      name?: string;
      avatarUri?: string;
    }) => {
      let avatarUrl = undefined;
      if (avatarUri) {
        // create presigned url
        const presignedUrl = await UserProfileAPI.createPresignedUrl();

        await uploadToS3(presignedUrl.upload_url, avatarUri);
        avatarUrl = presignedUrl.fetch_url;
      }

      // update user profile
      let profile = await UserProfileAPI.update({
        name,
        avatar_url: avatarUrl,
      });

      return profile;
    },
    onSuccess: profile => {
      // Invalidate and refetch users query to update the list
      queryClient.invalidateQueries({
        queryKey: [USER_QUERY_KEY, profile.user_profile.user_id],
      });
    },
  });
};
