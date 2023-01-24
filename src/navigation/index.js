import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../views/splash';
import Login from '../views/login';
import profile from '../views/profile';
import UpdateProfile from '../views/profile/updateProfile';

import {useDispatch, useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();

const Navigation = ({params}) => {
  const {token} = useSelector(state => state.auth);
  return (
    <NavigationContainer>
      {1 == 2 ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}
function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName="UpdateProfile"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="profile" component={profile} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
    </Stack.Navigator>
  );
}

export default Navigation;
