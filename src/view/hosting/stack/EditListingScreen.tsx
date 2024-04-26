import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {
  Button,
  TextInput,
  ImageUpload,
  LoadingOverlay,
  LocationCard,
} from '@/view/shared';
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form';
import {useTheme, AppTheme} from '@/view/theme';
import {useAuth, useCreateSpace, useUpdateSpaceImages} from '@/state';
import {
  GooglePlaceData,
  GooglePlaceDetail,
} from 'react-native-google-places-autocomplete';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export type EditParkingSpaceScreenProps = {
  data: GooglePlaceData;
  details: GooglePlaceDetail;
  // maybe add to reuse for edit spac
  //space?: Space;
};

type FormValues = {
  name: string;
  description: string;
};

export const EditListingScreen = ({navigation, route}) => {
  const params = route.params as EditParkingSpaceScreenProps;
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  const {userId} = useAuth();
  const place_id = params.data.place_id;
  const {mutateAsync: createSpace, invalidateMySpaces} = useCreateSpace({
    skipInvalidate: true,
  });
  const {mutateAsync: uploadSpaceImages} = useUpdateSpaceImages();
  const [isPending, setIsPending] = useState(false);

  const [selectedImages, setSelectedImages] = useState<string[]>(null);
  const onImagesSelected = useCallback(
    (uris: string[]) => {
      setSelectedImages(uris);
    },
    [setSelectedImages],
  );

  const formMethods = useForm();

  const handleCreateSpace = useCallback(
    async (data: FormValues) => {
      setIsPending(true);
      const space = await createSpace({
        name: data.name,
        place_id: place_id,
        description: data.description,
      });

      if (selectedImages) {
        await uploadSpaceImages({spaceId: space.id, imageUris: selectedImages});
      }
      invalidateMySpaces();
      setIsPending(false);
    },
    [place_id, selectedImages, userId, createSpace],
  );

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    handleCreateSpace(data).then(() => {
      navigation.navigate('Listings');
    });
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <LoadingOverlay visible={isPending} />
      <LocationCard
        mainText={params.data.structured_formatting.main_text}
        secondaryText={params.data.structured_formatting.secondary_text}
      />

      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <ImageUpload maxImages={5} onImagesSelected={onImagesSelected} />
      </View>

      <FormProvider {...formMethods}>
        <TextInput
          name="name"
          label="Name"
          placeholder="ex. Driveway/Unit #"
          rules={{required: 'Name is required!'}}
        />
        <TextInput
          name="description"
          label="Description"
          placeholder="Describe the space"
          multiline
          inputStyle={{height: 100}}
        />

        <View style={styles.bottom}>
          <Button
            text="Confirm Details"
            onPress={formMethods.handleSubmit(onSubmit)}
          />
        </View>
      </FormProvider>
    </KeyboardAwareScrollView>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      backgroundColor: theme.colors.background,
    },
    bottom: {
      flexDirection: 'row',
    },
  });
