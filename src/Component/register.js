import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ActivityIndicator} from 'react-native';
import { Octicons } from '@expo/vector-icons';
import Ripple from 'react-native-material-ripple';
import avatar1 from '../assets/Avatar/avatar1.png';
import avatar2 from '../assets/Avatar/avatar2.png';
import avatar3 from '../assets/Avatar/avatar3.png';
import avatar4 from '../assets/Avatar/avatar4.png';
import avatar5 from '../assets/Avatar/avatar5.png';
import avatar6 from '../assets/Avatar/avatar6.png';

const avatars = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
];

export  function Register({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState('');
  const [avatar, setAvatar] = useState(avatars[0]);
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = 'http://localhost:5555/api/users';

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(apiUrl + 'create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
        },
        body: JSON.stringify({ userName: username, email, phone, password, birthday, avatar }),
      });

      setIsLoading(false);

      if (response.ok) {
        alert('Registration Successful');
        navigation.navigate('Login');
      } else {
        const errorResult = await response.text();
        alert(`Registration Failed: ${errorResult}`);
      }
    } catch (error) {
      setIsLoading(false);
      alert(`Error: ${error.message}`);
    }
  };

  const handleAvatarChange = (selectedAvatar) => {
    setAvatar(selectedAvatar);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formInputWrapper}>
        <Octicons name="person" size={20} color="black" />
        <TextInput
          cursorColor={'#000'}
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
        />
      </View>
      <View style={styles.formInputWrapper}>
        <Octicons name="mail" size={20} color="black" />
        <TextInput
          cursorColor={'#000'}
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
        />
      </View>
      <View style={styles.formInputWrapper}>
        <Octicons name="device-mobile" size={20} color="black" />
        <TextInput
          cursorColor={'#000'}
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Phone"
        />
      </View>
      <View style={styles.formInputWrapper}>
        <Octicons name="shield-lock" size={20} color="black" />
        <TextInput
          cursorColor={'#000'}
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          placeholder="Password"
        />
      </View>
      <View style={styles.formInputWrapper}>
        <Octicons name="calendar" size={20} color="black" />
        <TextInput
          cursorColor={'#000'}
          style={styles.input}
          value={birthday}
          onChangeText={setBirthday}
          placeholder="Birthday (YYYY-MM-DD)"
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Select Avatar:</Text>
        <View style={styles.avatarSelection}>
          {avatars.map((avatarSrc, index) => (
            <Image
              key={index}
              source={avatarSrc}
              style={[
                styles.avatar,
                avatar === avatarSrc && styles.selectedAvatar,
              ]}
              onPress={() => handleAvatarChange(avatarSrc)}
            />
          ))}
        </View>
      </View>

      <Ripple
        onPress={handleRegister}
        rippleColor="rgb(0, 0, 0)"
        rippleOpacity={0.5}
        rippleDuration={300}
        rippleCentered={true}
        rippleFades={false}
        rippleContainerBorderRadius={20}
        style={styles.register}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Register</Text>
        )}
      </Ripple>
      <View style={styles.auth_question}>
        <Text style={styles.question_text}>Forgot Password?</Text>
        <Ripple
          rippleColor="rgb(0, 0, 0)"
          rippleOpacity={0.5}
          rippleDuration={300}
          rippleCentered={true}
          rippleFades={false}
          rippleContainerBorderRadius={20}
          style={[styles.login, styles.signup_btn]}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={[styles.buttonText, styles.signup_btn_text]}>Already have an Account?</Text>
        </Ripple>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  question_text: {
    fontSize: 16,
    marginRight: 5,
    marginTop: 10,
  },
  auth_question: {
    width: '90%',
    marginTop: 20,
    alignItems: 'center',
  },
  formInputWrapper: {
    width: '90%',
    height: 55,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
    marginBottom: 15,
  },
  input: {
    width: '90%',
    height: '100%',
    marginLeft: 10,
  },
  formGroup: {
    width: '90%',
    marginVertical: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  avatarSelection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'transparent',
    marginHorizontal: 5,
  },
  selectedAvatar: {
    borderColor: '#17469f',
  },
  register: {
    padding: 15,
    backgroundColor: '#17469f',
    alignItems: 'center',
    borderRadius: 10,
    width: '90%',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  signup_btn_text: {
    color: '#17469f',
  },
  login: {
    padding: 15,
    backgroundColor: '#17469f',
    alignItems: 'center',
    borderRadius: 10,
    width: '90%',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signup_btn: {
    width: '100%',
    marginTop: 7,
    borderColor: '#17469f',
    backgroundColor: '#fff',
    borderWidth: 1,
    paddingVertical: 10,
  }
});
