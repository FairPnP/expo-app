// useUpdateSpace.js
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {SpaceAPI, UpdateSpaceRequest, uploadToS3} from '@/api';
import {MY_SPACES_QUERY_KEY} from './consts';

export const useUpdateSpaceImages = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      spaceId,
      imageUris,
    }: {
      spaceId: number;
      imageUris: string[];
    }) => {
      // create presigned urls
      const presignedUrls = await SpaceAPI.createPresignedUrls(
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
      await SpaceAPI.postImageUpload(
        presignedUrls.data.map(p => p.space_image_id),
      );

      return spaceId;
    },
    onSuccess: spaceId => {
      // Invalidate and refetch spaces query to update the list
      queryClient.invalidateQueries({queryKey: [MY_SPACES_QUERY_KEY]});
    },
  });
};
