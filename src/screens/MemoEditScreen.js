import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import { StyleSheet, View, TextInput } from 'react-native'

import CircleButton from '../elements/CircleButton'

export default function MemoEditScreen({ navigation }) {
  const [memo, setMemo] = useState({})

  useEffect(() => {
    const { params } = navigation.state
    setMemo(params.memo)
  }, [])

  const handlePress = () => {
    const { currentUser } = firebase.auth()
    const db = firebase.firestore()

    db.collection(`users/${currentUser.uid}/memos`)
      .doc(memo.key)
      .update({
        body: memo.body,
        createdOn: firebase.firestore.Timestamp.now(),
      })
      .then(() => {
        navigation.state.params.returnMemo(memo)
        navigation.goBack()
      })
      .catch()
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.memoEditInput}
        multiline
        value={memo.body}
        onChangeText={text => setMemo({ ...memo, body: text })}
      />
      <CircleButton name={'\uf00c'} onPress={handlePress} />
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
