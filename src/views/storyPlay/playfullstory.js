import React, {useState} from 'react';
import {Text, View, StatusBar, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import VideoPlayer from 'react-native-video-player';
import {color, hp, wp} from '../../utils';
import styles from './style';
import AntDesign from 'react-native-vector-icons/AntDesign';

const PlayFullStory = ({route, navigation}) => {
  const [url, setUrl] = useState(route?.params?.url);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <AntDesign
        name="back"
        size={22}
        color={color.white}
        onPress={() => {
          Alert.alert('Exit', 'Do you want to go back?', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel', 'Cancel'),
            },
            {text: 'OK', onPress: () => navigation.goBack()},
          ]);
        }}
      />
      <View style={{flex: 1, marginVertical: hp(2)}}>
        <VideoPlayer
          video={{
            uri: url,
          }}
          videoWidth={wp(100)}
          videoHeight={hp(100)}
          autoplay={true}
          thumbnail={{
            uri: url,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default PlayFullStory;
