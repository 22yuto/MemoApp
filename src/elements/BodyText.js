import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default function BodyText({ children }) {
  return (
    <View>
      <Text style={styles.text}>
        {children}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    color: '#ddd',
    backgroundColor: '#eee',
  },
})
