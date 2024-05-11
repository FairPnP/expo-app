import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Text,
  LoadingSpinner,
  Section,
  InfiniteListView,
  Button,
  ViewListingScreenProps,
  Title,
  IconButton,
} from '@/view/shared';
import {useNavigation} from '@react-navigation/native';
import {useTheme, AppTheme} from '@/view/theme';
import {Building, Space} from '@/api';
import {useAppMode, useBuildings, useMySpaces} from '@/state';
import {MySpot} from '../components';
import {SafeAreaView} from 'react-native-safe-area-context';

type ListingsScreenProps = {};

export const ListingsScreen = ({}: ListingsScreenProps) => {
  const navigation = useNavigation<any>();
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  const {setAppMode} = useAppMode();

  const {spaces, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading} =
    useMySpaces(5);
  const {data: buildings} = useBuildings(spaces?.map(s => s.building_id));

  const handleSpotPress = useCallback(
    (space: Space, building: Building) => {
      const props: ViewListingScreenProps = {
        building: building,
        space: space,
      };
      navigation.navigate('ViewListing', props);
    },
    [navigation],
  );

  const renderSpot = useCallback(
    ({item}: {item: Space}) => {
      return (
        <MySpot
          building={buildings?.find(b => b.id === item.building_id)}
          mySpot={item}
          onPress={handleSpotPress}
        />
      );
    },
    [buildings, handleSpotPress],
  );

  const onAddListing = () => {
    navigation.navigate('AddListingAddress');
  };

  const titleComponent = () => {
    return <Button text="Add Listing" onPress={onAddListing} />;
  };

  const onSwitchToParking = () => {
    setAppMode('parking');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Section title="My Listings" titleComponent={titleComponent}>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <InfiniteListView
            data={spaces}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            renderItem={renderSpot}
            keyExtractor={item => item.id.toString()}
            emptyMessage="You have no listings."
            itemsPerPage={5}
          />
        )}
      </Section>
      <View style={styles.bottomArea}>
        <Title style={{marginTop: 4}}>Looking for parking?</Title>
        <IconButton
          icon="directions"
          text="Switch to Parking"
          onPress={onSwitchToParking}
        />
      </View>
    </SafeAreaView>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      height: '100%',
      backgroundColor: theme.colors.background,
      paddingTop: 32,
      paddingHorizontal: 16,
    },
    bottomArea: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: 100,
      paddingHorizontal: 8,
      backgroundColor: theme.colors.background,
      borderTopColor: theme.colors.border,
      borderTopWidth: 1,
    },
  });
