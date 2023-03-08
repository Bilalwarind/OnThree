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
import CreateStory from '../views/createStory';
import RecordStory from '../views/createStory/recordStory';
import PublishStory from '../views/createStory/publishStory';
import ForgetPassword from '../views/auth/forgetPassword';

import {useDispatch, useSelector} from 'react-redux';
import PlayFullStory from '../views/storyPlay/playfullstory';

const Stack = createNativeStackNavigator();

const Navigation = ({params}) => {
  const {token} = useSelector(state => state.auth);
  return (
    <NavigationContainer>
      {token ? <AppStack /> : <AuthStack />}
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
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="StoryPlay" component={StoryPlay} />
      <Stack.Screen name="PlayFullStory" component={PlayFullStory} />

      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}
function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="StoryPlay" component={StoryPlay} />
      <Stack.Screen name="PlayFullStory" component={PlayFullStory} />

      <Stack.Screen name="PublishStory" component={PublishStory} />
      <Stack.Screen name="RecordStory" component={RecordStory} />
      <Stack.Screen name="CreateStory" component={CreateStory} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
      <Stack.Screen name="StorySwipe" component={StorySwipe} />
    </Stack.Navigator>
  );
}

export default Navigation;
