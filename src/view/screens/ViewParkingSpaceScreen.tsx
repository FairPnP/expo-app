// import {StyleSheet, View} from 'react-native';
// import React from 'react';
// import {BuildingAPI} from '@/buildings';
// import {SpaceAPI, useLoadSpaces} from '@/spaces';
// import {
//   AppTheme,
//   Button,
//   SelectInput,
//   SwitchInput,
//   Text,
//   TextInput,
//   useTheme,
// } from '@/common';
// import {FormProvider, SubmitHandler, useForm} from 'react-hook-form';

// type AddSpotScreenProps = {
//   route: {
//     params: {
//       place_id: string;
//       latitude: number;
//       longitude: number;
//       main_text: string;
//       secondary_text: string;
//     };
//   };
//   navigation: any;
// };

// type FormValues = {
//   space_name: string;
//   size_category: string;
//   indoor: boolean;
// };

// export const ViewParkingSpaceScreen = ({
//   route,
//   navigation,
// }: AddSpotScreenProps) => {
//   const props = route.params;
//   const {refreshSpaces} = useLoadSpaces();
//   const theme = useTheme().theme.appTheme;
//   const styles = getStyles(theme);

//   const formMethods = useForm();

//   const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
//     BuildingAPI.list({place_id: props.place_id})
//       .then(res => {
//         if (res?.buildings.length > 0) {
//           return res.buildings[0];
//         } else {
//           return BuildingAPI.create({
//             name: props.main_text,
//             place_id: props.place_id,
//             latitude: props.latitude,
//             longitude: props.longitude,
//           }).then(create_res => create_res.building);
//         }
//       })
//       .then(building =>
//         SpaceAPI.create({
//           name: data.space_name,
//           building_id: building.id,
//         }),
//       )
//       .then(() => {
//         refreshSpaces();
//         navigation.navigate('Home');
//       });
//   };

//   return (
//     <View>
//       <Text>{props.main_text}</Text>
//       <Text>{props.secondary_text}</Text>
//       <View style={styles.separator} />

//       <FormProvider {...formMethods}>
//         <TextInput
//           name="space_name"
//           label="Name"
//           placeholder="ex. Driveway/Unit #"
//           rules={{
//             required: 'Name is required!',
//           }}
//         />
//         <SelectInput
//           name="size_category"
//           label="Size Category"
//           items={[
//             {label: 'Bike', value: 'bike'},
//             {label: 'Car', value: 'car'},
//             {label: 'SUV', value: 'suv'},
//             {label: 'RV', value: 'rv'},
//           ]}
//           rules={{required: 'Size category is required'}}
//         />
//         <SwitchInput
//           name="indoor"
//           label="Indoor Space"
//           control={formMethods.control}
//         />
//       </FormProvider>

//       <Button onPress={formMethods.handleSubmit(onSubmit)}>
//         Add Parking Spot
//       </Button>
//     </View>
//   );
// };

// const getStyles = (theme: AppTheme) =>
//   StyleSheet.create({
//     separator: {
//       borderBottomColor: theme.colors.border,
//       borderBottomWidth: 1,
//     },
//   });
