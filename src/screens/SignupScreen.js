import React, { useState } from 'react'
import firebase from 'firebase'
import {
  StyleSheet, View, TextInput, TouchableHighlight, Text,
} from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        const resetAction = StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Home' }),
          ],
        })
        navigation.dispatch(resetAction)
      })
      .catch()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>メンバー登録</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={text => setEmail(text)}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Email Address"
        underlineColorAndroid="transparent"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={text => setPassword(text)}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Password"
        secureTextEntry
        underlineColorAndroid="transparent"
      />
      <TouchableHighlight style={styles.button} onPress={handleSubmit} underlayColor="#c70f66">
        <Text style={styles.buttonTitle}>送信する</Text>
      </TouchableHighlight>
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
})
