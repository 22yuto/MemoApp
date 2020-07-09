import React from 'react'
import { StyleSheet, View } from 'react-native'
import MemoList from '../components/MemoList'
import CircleButton from '../elements/CircleButton'

export default function MemoListScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <MemoList navigation={navigation} />
      <CircleButton name={'\uf067'} onPress={() => navigation.navigate('MemoEdit')} />
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
