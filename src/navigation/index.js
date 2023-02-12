import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../views/splash';
import StorySwipe from '../views/storySwipe';
import Login from '../views/auth/login';
import Register from '../views/auth/register';
import Profile from '../views/account/profile';
import UpdateProfile from '../views/account/updateProfile';
import StoryPlay from '../views/storyPlay';

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
      <Stack.Screen name="StoryPlay" component={StoryPlay} />
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
      <Stack.Screen name="StorySwipe" component={StorySwipe} />
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
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
    </Stack.Navigator>
  );
}

export default Navigation;
