import React, {useCallback} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {
  Title,
  LoadingSpinner,
  Section,
  IconButton,
  InfiniteListView,
  Button,
} from '@/view/shared';
import {ViewSpotScreenProps} from '../stack/ViewSpotScreen';
import {useNavigation} from '@react-navigation/native';
import {useTheme, AppTheme} from '@/view/theme';
import {Building, Space} from '@/api';
import {useAppMode, useBuildings, useMySpaces} from '@/state';
import {MySpot} from '../components';
import {SafeAreaView} from 'react-native-safe-area-context';

const favorites: Space[] = [];

type HomeScreenProps = {};

export const HostingHomeScreen = ({}: HomeScreenProps) => {
  const navigation = useNavigation<any>();
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  const {setAppMode} = useAppMode();

  const onSwitchToParking = () => {
    setAppMode('parking');
  };

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

  const onSearchBarSubmit = () => {
    navigation.navigate('Search');
  };

  const onAddSpot = () => {
    navigation.navigate('AddSpot');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.topArea}>
        <Button onPress={onAddSpot}>
          <Title>Add Spot</Title>
        </Button>
        <Section title="My Spots">
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
              emptyMessage="You have no registered parking spots"
              itemsPerPage={5}
            />
          )}
        </Section>
      </ScrollView>
      <View style={styles.bottomArea}>
        <Section>
          <Title style={{marginVertical: 4}}>Looking for parking?</Title>
          <IconButton
            icon="directions"
            text="Switch to Parking"
            onPress={onSwitchToParking}
          />
        </Section>
      </View>
    </SafeAreaView>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    topArea: {
      marginBottom: 100,
    },
    bottomArea: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: 100,
      borderTopColor: theme.colors.border,
      borderTopWidth: 1,
    },
  });
