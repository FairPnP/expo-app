import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RouteProp} from '@react-navigation/native';
import {InboxScreen} from '@/view/shared';
import {FontAwesome5} from '@expo/vector-icons';
import {ProfileScreen} from './ProfileScreen';
import {HostingHomeScreen} from './HostingHome';
import {ReservationsScreen} from './ReservationsScreen';
import {ListingsScreen} from './ListingsScreen';
import {useTheme} from '@/view/theme';

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
  } else if (route.name === 'Listings') {
    return <FontAwesome5 name="list-alt" size={size} color={color} />;
  } else if (route.name === 'Reservations') {
    return <FontAwesome5 name="parking" size={size} color={color} />;
  } else if (route.name === 'Inbox') {
    return <FontAwesome5 name="comments" size={size} color={color} />;
  } else if (route.name === 'Profile') {
    return <FontAwesome5 name="user" size={size} color={color} />;
  } else {
    return <FontAwesome5 name="question" size={size} color={color} />;
  }
};

export const HostingNavigator = () => {
  const theme = useTheme().theme.appTheme;

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
          backgroundColor: theme.colors.card,
          color: theme.colors.text,
        },
      })}>
      <Tab.Screen name="Home" component={HostingHomeScreen} />
      <Tab.Screen name="Listings" component={ListingsScreen} />
      <Tab.Screen name="Reservations" component={ReservationsScreen} />
      <Tab.Screen name="Inbox" component={InboxScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
