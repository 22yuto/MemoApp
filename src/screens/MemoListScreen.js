import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import { StyleSheet, View } from 'react-native'
import MemoList from '../components/MemoList'
import CircleButton from '../elements/CircleButton'

export default function MemoListScreen({ navigation }) {
  const [memoList, setMemoList] = useState([])

  useEffect(() => {
    const { currentUser } = firebase.auth()
    const db = firebase.firestore()
    db.collection(`users/${currentUser.uid}/memos`)
      .get()
      .then(snapshot => {
        const memos = []
        snapshot.forEach(doc => {
          memos.push({ ...doc.data(), key: doc.id })
          // 上記と同等 {body: 'test', createdOn: '2020/12/12', key: doc.id}
        })
        setMemoList(memos)
      })
      .catch(error => console.log(error))
  }, [])

  const handlePress = () => {
    navigation.navigate('MemoCreate')
  }

  return (
    <View style={styles.container}>
      <MemoList memoList={memoList} navigation={navigation} />
      <CircleButton
        name={'\uf067'}
        onPress={handlePress}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fffdf6',
  },
})
