import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { Button, SelectInput, Text, TextInput, ImageUpload, LoadingOverlay } from '@/view/shared';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useTheme, AppTheme } from '@/view/theme';
import { useAuth, useGooglePlace, useCreateSpace, useUpdateSpaceImages } from '@/state';

export type EditParkingSpaceScreenProps = {
  place_id?: string;
  // maybe add to reuse for edit space
  //space?: Space;
};

type FormValues = {
  space_name: string;
  description: string;
  max_vehicle_size: string;
  coverage: string;
  height_clearance?: number;
  access_restrictions?: string;
  parking_instructions: string;
};

export const EditParkingSpaceScreen = ({ navigation, route }) => {
  const { place_id } = route.params as EditParkingSpaceScreenProps;
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  const { userId } = useAuth();
  const { data: google_place } = useGooglePlace(place_id);
  const { mutateAsync: createSpace, invalidateMySpaces } = useCreateSpace({ skipInvalidate: true });
  const { mutateAsync: uploadSpaceImages } = useUpdateSpaceImages();
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
        name: data.space_name,
        place_id: place_id,
        description: data.description,
        max_vehicle_size: data.max_vehicle_size,
        coverage: data.coverage,
        height_clearance_cm: data.height_clearance,
        access_restrictions: data.access_restrictions,
        parking_instructions: data.parking_instructions,
      });

      if (selectedImages) {
        await uploadSpaceImages({ spaceId: space.id, imageUris: selectedImages });
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
    <ScrollView style={styles.container}>
      <LoadingOverlay visible={isPending} />
      <Text>{google_place?.name}</Text>
      <View style={styles.separator} />

      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <ImageUpload maxImages={5} onImagesSelected={onImagesSelected} />
      </View>

      <FormProvider {...formMethods}>
        <TextInput
          name="space_name"
          label="Name"
          placeholder="ex. Driveway/Unit #"
          rules={{ required: 'Name is required!' }}
        />
        <SelectInput
          name="max_vehicle_size"
          label="Max Vehicle Size"
          items={[
            { label: 'Bike', value: 'bike' },
            { label: 'Car', value: 'car' },
            { label: 'Truck/SUV', value: 'suv' },
            { label: 'RV/Trailer', value: 'rv' },
          ]}
          defaultValue={'suv'}
          rules={{ required: 'Size category is required' }}
        />
        <SelectInput
          name="coverage"
          label="Coverage"
          items={[
            { label: 'Indoor', value: 'indoor' },
            { label: 'Outdoor: Covered', value: 'outdoor-covered' },
            { label: 'Outdoor: Open', value: 'outdoor' },
          ]}
          defaultValue={'outdoor'}
          rules={{ required: 'Coverage is required' }}
        />
        {/* <TextAreaInput
          name="description"
          label="Description"
          placeholder="Describe the space"
        />
        <FileInput name="picture" label="Upload a Picture" />
        <TextInput
          name="height_clearance"
          label="Height Clearance (meters)"
          keyboardType="numeric"
        />
        <TextAreaInput
          name="access_restrictions"
          label="Access Restrictions"
          placeholder="Any restrictions?"
        />
        <TextAreaInput
          name="parking_instructions"
          label="Parking Instructions"
          placeholder="Instructions for parking"
        /> */}

        <Button onPress={formMethods.handleSubmit(onSubmit)}>
          <Text>Add Parking Spot</Text>
        </Button>
      </FormProvider>
    </ScrollView>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    separator: {
      borderBottomColor: theme.colors.border,
      borderBottomWidth: 1,
    },
  });
