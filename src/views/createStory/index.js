import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Platform,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {wp, hp, Size, color, Images, IOS, familyFont} from '../../utils/';
import CustomText from '../../components/CustomText';
import CustomButton from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {loginUser} from '../../redux';
import CustomTextInput from '../../components/CutomTextInput';
import {Paragraph, Dialog, Portal} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './style';

const CreateStory = () => {
  const dispatch = useDispatch();
  const nav = useNavigation();
  const {token, userId, isLoading} = useSelector(state => state.auth);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [activeBtn, setActiveBtn] = useState(1);

  const onRegister = async () => {
    if (password.length <= 0) {
      setIsError(true);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <View style={styles.row1}>
        <View style={styles.header2}>
          <CustomText
            title="Add Story"
            textcolor={color.primary}
            fontsize={Size(2.2)}
            aligntext={'center'}
            marginvertical={hp(0.5)}
            fontfamily={familyFont.semiBold}
          />
        </View>
        <View style={styles.header}>
          <AntDesign name="close" size={22} color={color.primary} />
        </View>
      </View>
      <View style={styles.topTab}>
        <CustomButton
          title="Front-Facing"
          fontsize={Size(1.4)}
          backgroundcolor={activeBtn == 1 ? color.white : color.gray}
          borderradius={hp(1)}
          textcolor={color.primary}
          padding={hp(1)}
          textalign="center"
          paddinghori={hp(2)}
          flexdirection="row"
          justifycontent="center"
          alignitems="center"
          width={wp(42)}
          fontfamily={familyFont.semiBold}
          onpress={() => {
            setActiveBtn(1);
          }}
        />
        <CustomButton
          title="Rear-Facing"
          fontsize={Size(1.4)}
          backgroundcolor={activeBtn == 2 ? color.white : color.gray}
          borderradius={hp(1)}
          textcolor={color.primary}
          padding={hp(1)}
          textalign="center"
          paddinghori={hp(2)}
          flexdirection="row"
          justifycontent="center"
          alignitems="center"
          width={wp(42)}
          fontfamily={familyFont.semiBold}
          onpress={() => {
            setActiveBtn(2);
          }}
        />
      </View>
      <View style={styles.story} />
      <CustomText
        title="Video counts down from 3"
        textcolor={color.primary}
        fontsize={Size(1.4)}
        aligntext={'center'}
        marginTop={hp(4)}
        fontfamily={familyFont.reg}
      />
      <CustomButton
        title="Record Video"
        fontfamily={familyFont.semiBold}
        fontsize={Size(2.1)}
        backgroundcolor={color.primary}
        borderradius={hp(1)}
        textcolor={color.white}
        padding={hp(2)}
        textalign="center"
        marginvertical={hp(3)}
        flexdirection="row"
        justifycontent="center"
        alignitems="center"
        onpress={() => {
          nav.navigate('StorySwipe');
        }}
        Icon=<Feather name="video" size={19} color={color.white} />
      />
      <CustomButton
        title="Upload Video"
        fontfamily={familyFont.semiBold}
        fontsize={Size(1.7)}
        textcolor={color.primary}
        textalign="center"
        flexdirection="row"
        justifycontent="center"
        alignitems="center"
        onpress={() => {
          nav.navigate('StorySwipe');
        }}
      />

      <Dialog visible={isLoading}>
        <Dialog.Content>
          <Paragraph>isLoading</Paragraph>
        </Dialog.Content>
      </Dialog>
    </View>
  );
};

export default CreateStory;
