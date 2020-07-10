import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import CircleButton from '../elements/CircleButton'

export default function MemoDetailScreen({ navigation }) {
  const [memo, setMemo] = useState({
    body: '',
    createdOn: '',
  })

  const dateString = date => {
    if (date == null) return ''
    const dateObject = date.toDate()
    return dateObject.toISOString().split('T')[0]
  }

  useEffect(() => {
    const { params } = navigation.state
    setMemo(params.memo)
  }, [])

  const returnMemo = memoData => {
    setMemo(memoData)
  }

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.memoHeader}>
          <View>
            <Text style={styles.memoHeaderTitle}>{memo.body.substring(0, 10)}</Text>
            <Text style={styles.memoHeaderDate}>
              {memo.createdOn && dateString(memo.createdOn)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.memoContent}>
        <Text style={styles.memoBody}>
          {memo.body}
        </Text>
      </View>

      <CircleButton
        name={'\uf303'}
        color="white"
        style={styles.editButton}
        onPress={() => navigation.navigate('MemoEdit', { memo, returnMemo })}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  memoHeader: {
    height: 100,
    backgroundColor: '#17313c',
    justifyContent: 'center',
    padding: 10,
  },
  memoBody: {
    lineHeight: 22,
    fontSize: 15,
  },
  memoHeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  memoHeaderDate: {
    fontSize: 12,
    color: '#fff',
  },
  memoContent: {
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  editButton: {
    top: 80,
  },
})
