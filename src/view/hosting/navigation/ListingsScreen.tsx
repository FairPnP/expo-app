import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {
  Text,
  LoadingSpinner,
  Section,
  InfiniteListView,
  Button,
  ViewSpotScreenProps,
} from '@/view/shared';
import {useNavigation} from '@react-navigation/native';
import {useTheme, AppTheme} from '@/view/theme';
import {Building, Space} from '@/api';
import {useBuildings, useMySpaces} from '@/state';
import {MySpot} from '../components';
import {SafeAreaView} from 'react-native-safe-area-context';

type ListingsScreenProps = {};

export const ListingsScreen = ({}: ListingsScreenProps) => {
  const navigation = useNavigation<any>();
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);

  const {spaces, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading} =
    useMySpaces(5);
  const {data: buildings} = useBuildings(spaces?.map(s => s.building_id));

  const handleSpotPress = useCallback(
    (space: Space, building: Building) => {
      const props: ViewSpotScreenProps = {
        building: building,
        space: space,
      };
      navigation.navigate('ViewSpot', props);
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
  });
