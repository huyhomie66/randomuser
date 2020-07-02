import Home from '@randomuser/screens/Home';
import Favorite from '@randomuser/screens/Favorite';
import React from 'react';
import {StoreProvider} from 'easy-peasy';
import store from '@randomuser/store';
import FeatherIcon from 'react-native-vector-icons/Feather';

import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';

const Stack = createStackNavigator();

FeatherIcon.loadFont();

const screenOptions = {
  headerTitleStyle: {
    fontSize: 18,
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  headerTintColor: '#fff',
  headerTransparent: true,
  gestureDirection: 'vertical',
};
const HeaderRightButton = () => {
  const {navigate} = useNavigation();

  return (
    <FeatherIcon.Button
      name="heart"
      size={30}
      backgroundColor="transparent"
      iconStyle={{color: 'white'}}
      onPressIn={() => navigate('Favorite')}
      color="#fff"
    />
  );
};

export default () => {
  return (
    <StoreProvider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerRight: (navigation) => <HeaderRightButton />,
            }}
          />
          <Stack.Screen name="Favorite" component={Favorite} />
        </Stack.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
};
