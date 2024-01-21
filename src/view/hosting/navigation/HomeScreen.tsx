import React, {useCallback} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {Title, ListView, LoadingSpinner} from '@/view/shared';
import {ManageSpotScreenProps} from '../stack/ManageSpotScreen';
import {useNavigation} from '@react-navigation/native';
import {useTheme, AppTheme} from '@/view/theme';
import {Building, Space} from '@/api';
import {useBuildings, useMySpaces} from '@/state';
import {MySpot} from '../components';

const favorites: Space[] = [];

type HomeScreenProps = {};

export const HomeScreen = ({}: HomeScreenProps) => {
  const navigation = useNavigation<any>();
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);

  const {data: spaces, isLoading} = useMySpaces();
  const {data: buildings} = useBuildings(
    spaces?.spaces.map(s => s.building_id),
  );

  const handleSpotPress = useCallback(
    (space: Space, building: Building) => {
      const props: ManageSpotScreenProps = {
        building: building,
        space: space,
      };
      navigation.navigate('ManageSpot', props);
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

  return (
    <View style={styles.container}>
      <View style={styles.separator} />
      <ScrollView>
        <View style={styles.page}>
          <Title>My Spots</Title>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <ListView
              data={spaces?.spaces}
              renderItem={renderSpot}
              keyExtractor={item => item.id.toString()}
              emptyMessage="You have no registered parking spots"
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    page: {
      flex: 1,
      padding: 8,
    },
    spacer: {
      height: 20,
    },
    topBar: {
      paddingVertical: 8,
      paddingHorizontal: 8,
    },
    separator: {
      borderBottomColor: theme.colors.border,
      borderBottomWidth: 1,
    },
  });
