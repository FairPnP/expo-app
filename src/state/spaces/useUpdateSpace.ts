// useUpdateSpace.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SpaceImageAPI, uploadToS3 } from '@/api';
import { SPACE_QUERY_KEY } from './consts';

export const useUpdateSpaceImages = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      spaceId,
      imageUris,
    }: {
      spaceId: string;
      imageUris: string[];
    }) => {
      // create presigned urls
      const presignedUrls = await SpaceImageAPI.createPresignedUrls(
        spaceId,
        imageUris.length,
      );
      // upload images to s3
      await Promise.all(
        imageUris.map((img, i) =>
          uploadToS3(presignedUrls.data[i].presigned_url, img),
        ),
      );

      // update space images
      await SpaceImageAPI.postImageUpload(
        presignedUrls.data.map(p => p.space_image_id),
      );

      return spaceId;
    },
    onSuccess: spaceId => {
      // Invalidate and refetch spaces query to update the list
      queryClient.invalidateQueries({ queryKey: [SPACE_QUERY_KEY, spaceId] });
    },
  });
};
