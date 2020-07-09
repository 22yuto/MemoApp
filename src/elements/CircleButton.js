import React, { useState, useEffect } from 'react'
import {
  StyleSheet, Text, View, TouchableHighlight,
} from 'react-native'
import * as Font from 'expo-font'
import fontAwesome from '../../assets/fonts/fa-solid-900.ttf'

export default function CircleButton({
  style, color, name, onPress,
}) {
  const [fontLoaded, setFontLoaded] = useState(false)

  useEffect(() => {
    (async () => {
      await Font.loadAsync({
        FontAwesome: fontAwesome,
      })
      setFontLoaded(true)
    })()
  }, [])

  let bgColor = '#e31676'
  let textColor = '#fff'

  if (color === 'white') {
    bgColor = '#fff'
    textColor = '#e31676'
  }

  return (
    <TouchableHighlight style={[styles.container, style]} onPress={onPress} underlayColor="transparent">
      <View style={[styles.circleButton, { backgroundColor: bgColor }]}>
        {
          fontLoaded ? (
            <Text style={[styles.circleButtonTitle, { color: textColor }]}>{name}</Text>
          ) : null
        }
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    position: 'absolute',
    bottom: 32,
    right: 32,
  },
  circleButton: {
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
    fontFamily: 'FontAwesome',
    fontSize: 24,
    lineHeight: 32,
    color: '#fff',
  },
})
