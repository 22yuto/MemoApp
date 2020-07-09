import React, { useState } from 'react'
import firebase from 'firebase'
import { StyleSheet, View, TextInput } from 'react-native'

import CircleButton from '../elements/CircleButton'

export default function MemoCreateScreen({ navigation }) {
  const [body, setBody] = useState('')

  function handleSubmit() {
    const { params } = navigation.state
    console.log(params)
    const db = firebase.firestore()
    db.collection(`users/${params.currentUser.uid}/memos`).add({
      body,
      createdOn: new Date(),
    })
      .then(docRef => {
        console.log(docRef.id)
      })
      .catch(error => console.log(error))
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.memoEditInput}
        multiline
        value={body}
        onChangeText={text => setBody(text)}
      />
      <CircleButton name={'\uf00c'} onPress={handleSubmit} />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  memoEditInput: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    fontSize: 16,
  },
})
