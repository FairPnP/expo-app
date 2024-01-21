import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RouteProp} from '@react-navigation/native';
import {ParkingHome} from './ParkingHome';
import {MapScreen} from './MapScreen';
import {SpotsScreen} from './SpotsScreen';
import {InboxScreen} from '@/view/shared';
import {ProfileScreen} from './ProfileScreen';
import {FontAwesome5} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

type TabBarIconProps = {
  route: RouteProp<Record<string, object | undefined>, string>;
  focused: boolean;
  color: string;
  size: number;
};

const TabBarIcon: React.FC<TabBarIconProps> = ({route, color, size}) => {
  if (route.name === 'Home') {
    return <FontAwesome5 name="home" size={size} color={color} />;
  } else if (route.name === 'Map') {
    return <FontAwesome5 name="map" size={size} color={color} />;
  } else if (route.name === 'Spots') {
    return <FontAwesome5 name="parking" size={size} color={color} />;
  } else if (route.name === 'Inbox') {
    return <FontAwesome5 name="comments" size={size} color={color} />;
  } else if (route.name === 'Profile') {
    return <FontAwesome5 name="user" size={size} color={color} />;
  } else {
    return <FontAwesome5 name="question" size={size} color={color} />;
  }
};

export const ParkingNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        // Make sure to pass route to the screenOptions
        headerShown: false,
        tabBarHideOnKeyboard: true,
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({focused, color, size}) => (
          <TabBarIcon
            route={route}
            focused={focused}
            color={color}
            size={size}
          />
        ),
        tabBarStyle: {
          height: 60,
          paddingBottom: 6,
        },
      })}>
      <Tab.Screen name="Home" component={ParkingHome} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Spots" component={SpotsScreen} />
      <Tab.Screen name="Inbox" component={InboxScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
