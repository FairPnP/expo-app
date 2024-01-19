import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Button, SelectInput, Text, TextInput, ImageUpload} from '../components';
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form';
import {
  Building,
  BuildingAPI,
  CreateBuildingRequest,
  Space,
  SpaceAPI,
  uploadToS3,
} from '@/api';
import {useTheme, AppTheme} from '@/view/theme';
import {useAccessToken, useCreateSpace, useUpdateSpace} from '@/state';

export type EditParkingSpaceScreenProps = {
  building: Building | CreateBuildingRequest;
  // no space for new parking space
  // provided space means editing existing space
  space?: Space;
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

function isBuilding(
  building: Building | CreateBuildingRequest,
): building is Building {
  return (building as Building).id !== undefined;
}

export const EditParkingSpaceScreen = ({navigation, route}) => {
  const {building} = route.params as EditParkingSpaceScreenProps;
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  const tokens = useAccessToken();
  const {mutateAsync: createSpace} = useCreateSpace();
  const {mutateAsync: updateSpace} = useUpdateSpace();

  const [selectedImage, setSelectedImage] = useState(null);
  const onImageSelected = useCallback((uri: string) => {
    setSelectedImage(uri);
  }, []);

  const formMethods = useForm();

  const getBuilding = useCallback(async () => {
    if (isBuilding(building)) {
      return building;
    } else {
      const res = await BuildingAPI.list({place_id: building.place_id});
      if (res?.buildings.length > 0) {
        return res.buildings[0];
      } else {
        return BuildingAPI.create(building).then(
          create_res => create_res.building,
        );
      }
    }
  }, [building]);

  const handleCreateSpace = useCallback(
    async (data: FormValues) => {
      const building = await getBuilding();
      const space = await createSpace({
        name: data.space_name,
        building_id: building.id,
        description: data.description,
        max_vehicle_size: data.max_vehicle_size,
        coverage: data.coverage,
        height_clearance_cm: data.height_clearance,
        access_restrictions: data.access_restrictions,
        parking_instructions: data.parking_instructions,
      });

      if (selectedImage) {
        const presignedUrl = await SpaceAPI.getPresignedUrl(space.id);
        await uploadToS3(presignedUrl.url, selectedImage);

        const userId = tokens?.idToken?.payload.sub;
        const pictureUrl = `https://fairpnp-dev-user-content.s3.us-east-2.amazonaws.com/user-uploads/${userId}/space-images/${space.id}.jpg`;
        await updateSpace({
          spaceId: space.id,
          updateData: {
            picture_url: pictureUrl,
          },
        });
      }

      return space;
    },
    [getBuilding, selectedImage, tokens?.idToken?.payload.sub],
  );

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    handleCreateSpace(data).then(() => {
      navigation.goBack();
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text>{building.name}</Text>
      <View style={styles.separator} />

      <ImageUpload onImageSelected={onImageSelected} />

      <FormProvider {...formMethods}>
        <TextInput
          name="space_name"
          label="Name"
          placeholder="ex. Driveway/Unit #"
          rules={{required: 'Name is required!'}}
        />
        <SelectInput
          name="max_vehicle_size"
          label="Max Vehicle Size"
          items={[
            {label: 'Bike', value: 'bike'},
            {label: 'Car', value: 'car'},
            {label: 'Truck/SUV', value: 'suv'},
            {label: 'RV/Trailer', value: 'rv'},
          ]}
          defaultValue={'suv'}
          rules={{required: 'Size category is required'}}
        />
        <SelectInput
          name="coverage"
          label="Coverage"
          items={[
            {label: 'Indoor', value: 'indoor'},
            {label: 'Outdoor: Covered', value: 'outdoor-covered'},
            {label: 'Outdoor: Open', value: 'outdoor'},
          ]}
          defaultValue={'outdoor'}
          rules={{required: 'Coverage is required'}}
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
