import React, {forwardRef, useCallback, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  HorizontalGroup,
  ImageUpload,
  TextInput,
  TextLink,
  Title,
} from '../common';
import {AppTheme, useTheme} from '@/view/theme';
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import {useAuth, useUpdateUserProfiles, useUserProfile} from '@/state';
import {FormProvider, useForm} from 'react-hook-form';

export type EditUserProfileProps = {};

type FormValues = {
  firstName: string;
  lastName: string;
};

export const EditUserProfileBottomSheet = forwardRef<BottomSheetModal>(
  (props, ref) => {
    const theme = useTheme().theme.appTheme;
    const styles = getStyes(theme);
    const {userId} = useAuth();
    const {data: profile} = useUserProfile(userId);
    const [image, setImage] = React.useState<string>(null);
    const splitName = profile?.name.split(' ');
    const formMethods = useForm();
    const {dismiss} = useBottomSheetModal();
    const {mutateAsync: updateProfile} = useUpdateUserProfiles();

    const snapPoints = ['80%'];

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          {...props}
        />
      ),
      [],
    );

    useEffect(() => {
      if (profile) {
        setImage(profile.avatar_url);
      }
    }, [profile]);

    const onImagesSelected = (images: string[]) => {
      setImage(images[0]);
    };

    const onFormSubmit = useCallback(
      async (data: FormValues) => {
        const name = `${data.firstName} ${data.lastName}`;
        // only update if there are changes
        let params = {};
        // check name
        if (name !== profile.name) {
          params = {name};
        }
        // check avatar
        if (image !== profile.avatar_url) {
          params = {...params, avatarUri: image};
        }
        // update profile
        if (Object.keys(params).length > 0) {
          await updateProfile(params);
        }

        dismiss();
      },
      [image],
    );

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        style={styles.sheetContainer}
        backdropComponent={renderBackdrop}
        backgroundStyle={{backgroundColor: theme.colors.background}}
        handleIndicatorStyle={{display: 'none'}}
        enablePanDownToClose={false}>
        <View style={styles.container}>
          <HorizontalGroup style={styles.header}>
            <TextLink
              style={{
                padding: 8,
              }}
              onPress={() => dismiss()}>
              Cancel
            </TextLink>
            <Title>Edit Profile</Title>
            <TextLink
              style={{padding: 8}}
              onPress={formMethods.handleSubmit(onFormSubmit)}>
              Save
            </TextLink>
          </HorizontalGroup>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <ImageUpload
              defaultImages={[image]}
              maxImages={1}
              onImagesSelected={onImagesSelected}
            />
          </View>

          <FormProvider {...formMethods}>
            <TextInput
              name="firstName"
              label="First Name"
              bottomSheet
              defaultValue={splitName[0]}
              rules={{required: 'First name is required!'}}
            />
            <TextInput
              name="lastName"
              label="Last Name"
              bottomSheet
              defaultValue={splitName.length > 1 ? splitName[1] : ''}
              rules={{required: 'Last name is required!'}}
            />
          </FormProvider>
        </View>
      </BottomSheetModal>
    );
  },
);

const getStyes = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingHorizontal: 24,
    },
    header: {
      paddingHorizontal: 24,
      marginTop: 4,
      marginBottom: 16,
    },
    sheetContainer: {
      // marginHorizontal: 24,
    },
  });
