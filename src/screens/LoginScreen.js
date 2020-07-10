import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import * as SecureStore from 'expo-secure-store'
import { StackActions, NavigationActions } from 'react-navigation'
import {
  StyleSheet, View, TextInput, TouchableHighlight, Text, TouchableOpacity,
} from 'react-native'
import { Loading } from '../elements/Loading'

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let unmounted = false;

    (async () => {
      const emailData = await SecureStore.getItemAsync('email')
      const passwordData = await SecureStore.getItemAsync('password')
      firebase.auth().signInWithEmailAndPassword(emailData, passwordData)
        .then(() => {
          if (!unmounted) {
            setIsLoading(false)
          }
          navigateToHome()
        })
        .catch()
    })()

    return () => {
      unmounted = true;
    }
  }, [])

  const navigateToHome = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' }),
      ],
    })
    navigation.dispatch(resetAction)
  }

  const handleSubmit = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        SecureStore.setItemAsync('email', email)
        SecureStore.setItemAsync('password', password)
        navigateToHome()
      })
      .catch()
  }

  const handleSignup = () => {
    navigation.navigate('Signup')
  }

  return (
    <View style={styles.container}>
      <Loading text="ログイン中" isLoading={isLoading} />
      <Text style={styles.title}>ログイン</Text>
      <TextInput
        style={styles.input}
        name="email"
        value={email}
        onChangeText={text => setEmail(text)}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Email Address"
        underlineColorAndroid="transparent"
      />
      <TextInput
        style={styles.input}
        name="password"
        value={password}
        onChangeText={text => setPassword(text)}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Password"
        secureTextEntry
        underlineColorAndroid="transparent"
      />
      <TouchableHighlight style={styles.button} underlayColor="#c70f66" onPress={handleSubmit}>
        <Text style={styles.buttonTitle}>ログインする</Text>
      </TouchableHighlight>

      <TouchableOpacity onPress={handleSignup} style={styles.signup}>
        <Text style={styles.signupText}>メンバー登録する</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    alignSelf: 'center',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#eee',
    height: 48,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
  },
  button: {
    backgroundColor: '#e31676',
    height: 48,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    alignSelf: 'center',
  },
  buttonTitle: {
    color: '#fff',
    fontSize: 18,
  },
  signup: {
    marginTop: 16,
    alignSelf: 'center',
  },
  signupText: {
    fontSize: 16,
  },
})
