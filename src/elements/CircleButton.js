import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function CircleButton({ children, style, color }) {
  let bgColor = '#e31676'
  let textColor = '#fff'

  if (color === 'white') {
    bgColor = '#fff'
    textColor = '#e31676'
  }

  return (
    <View style={[styles.circleButton, style, { backgroundColor: bgColor }]}>
      <Text style={[styles.circleButtonTitle, { color: textColor }]}>
        {children}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  circleButton: {
    position: 'absolute',
    bottom: 32,
    right: 32,
    width: 40,
    height: 40,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    zIndex: 10,
  },
  circleButtonTitle: {
    fontSize: 32,
    lineHeight: 32,
    color: '#fff',
  },
})
