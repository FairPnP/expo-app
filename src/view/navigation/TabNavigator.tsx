import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RouteProp} from '@react-navigation/native';
import {
  SearchScreen,
  ActivityScreen,
  ProfileScreen,
  HomeScreen,
  HostScreen,
} from '../screens';

const Tab = createBottomTabNavigator();

type TabBarIconProps = {
  route: RouteProp<Record<string, object | undefined>, string>;
  focused: boolean;
  color: string;
  size: number;
};

const TabBarIcon: React.FC<TabBarIconProps> = ({route, color, size}) => {
  let iconName: string;

  if (route.name === 'Home') {
    iconName = 'home';
  } else if (route.name === 'Search') {
    iconName = 'magnify';
  } else if (route.name === 'Host') {
    iconName = 'garage';
  } else if (route.name === 'Activity') {
    iconName = 'view-list-outline';
  } else if (route.name === 'Profile') {
    iconName = 'account';
  } else {
    iconName = 'question';
  }

  return <Icon name={iconName} size={size} color={color} />;
};

export const TabNavigator = () => {
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
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Host" component={HostScreen} />
      <Tab.Screen name="Activity" component={ActivityScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
