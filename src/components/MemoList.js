import React from 'react'
import {
  StyleSheet, View, Text, TouchableHighlight, FlatList,
} from 'react-native'

export default function MemoList({ navigation, memoList }) {
  const renderMemo = ({ item }) => (
    <TouchableHighlight
      onPress={() => navigation.navigate('MemoDetail', { memo: item })}
    >
      <View style={styles.memoListItem}>
        <Text style={styles.memoTitle}>{item.body.substring(0, 10)}</Text>
        <Text style={styles.memoDate}>{dateString(item.createdOn)}</Text>
      </View>
    </TouchableHighlight>
  )

  const dateString = date => {
    if (date == null) return ''
    const dateObject = date.toDate()
    return dateObject.toISOString().split('T')[0]
  }

  return (
    <View style={styles.memoList}>

      <FlatList data={memoList} renderItem={renderMemo} />

    </View>
  )
}

const styles = StyleSheet.create({
  memoList: {
    width: '100%',
    flex: 1,
  },
  memoListItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
  },
  memoTitle: {
    fontSize: 18,
    marginBottom: 4,
  },
  memoDate: {
    fontSize: 12,
    color: '#a2a2a2',
  },
})
