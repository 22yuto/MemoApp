import React from 'react'
import { StyleSheet, View } from 'react-native'
import MemoList from '../components/MemoList'
import CircleButton from '../elements/CircleButton'

export default function MemoListScreen({ navigation }) {
  const handlePress = () => {
    const { params } = navigation.state
    navigation.navigate('MemoCreate', { currentUser: params.currentUser })
  }

  return (
    <View style={styles.container}>
      <MemoList navigation={navigation} />
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
