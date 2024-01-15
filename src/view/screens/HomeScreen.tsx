import React, {useCallback, useEffect} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {MySpot, MyFavorite, Space, useLoadSpaces} from '@/spaces';
import {useTheme, AppTheme, Title, ListView, LoadingSpinner} from '@/common';
import {Building} from '@/buildings';
import {ManageSpotScreenProps} from './ManageSpotScreen';
import {SearchBar} from '../components';
import {useNavigation} from '@react-navigation/native';
// import {useRecoilState} from 'recoil';

const favorites: Space[] = [];

type HomeScreenProps = {};

export const HomeScreen = ({}: HomeScreenProps) => {
  const navigation = useNavigation<any>();
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);

  const {spaces, buildings, isLoading, refreshSpaces} = useLoadSpaces();

  useEffect(() => {
    refreshSpaces();
  }, [refreshSpaces]);

  // const [favorites, setFavorites] = useRecoilState(myFavoritesState);
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
          building={buildings.find(b => b.id === item.building_id)}
          mySpot={item}
          onPress={handleSpotPress}
        />
      );
    },
    [buildings, handleSpotPress],
  );
  const renderFavorite = ({item}) => <MyFavorite favoriteName={item.name} />;

  const onSearchBarSubmit = () => {
    navigation.navigate('Search');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <SearchBar onSubmit={onSearchBarSubmit} />
      </View>
      <View style={styles.separator} />
      <ScrollView>
        <View style={styles.page}>
          <Title>My Spots</Title>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <ListView
              data={spaces}
              renderItem={renderSpot}
              keyExtractor={item => item.id.toString()}
              emptyMessage="You have no registered parking spots"
            />
          )}
          <View style={styles.spacer} />

          <Title>My Favorites</Title>
          <ListView
            data={favorites}
            renderItem={renderFavorite}
            keyExtractor={item => item.id.toString()}
            emptyMessage="You have no favorites"
          />
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
