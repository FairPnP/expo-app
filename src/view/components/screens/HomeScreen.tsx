import React, {useCallback, useEffect} from 'react';
import {StyleSheet, ScrollView, View, ActivityIndicator} from 'react-native';
import {
  MySpot,
  MyFavorite,
  Space,
  useLoadSpaces,
} from '@/spaces';
import {useTheme, AppTheme, Title, ListView} from '@/common';
import {Building} from '@/buildings';
import { ManageSpotScreenProps } from './ManageSpotScreen';
// import {useRecoilState} from 'recoil';

const favorites: Space[] = [];

type HomeScreenProps = {
  navigation: any;
};

export const HomeScreen = ({navigation}: HomeScreenProps) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles();

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

  return (
    <ScrollView>
      <View style={styles.container}>
        <Title>My Spots</Title>
        {isLoading ? (
          <ActivityIndicator size="large" color={theme.colors.primary} />
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
  );
};

const getStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 8,
    },
    spacer: {
      height: 20,
    },
  });
