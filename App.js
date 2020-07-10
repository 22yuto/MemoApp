import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import firebase from 'firebase'
import 'firebase/firestore'
import { decode, encode } from 'base-64'
import MemoListScreen from './src/screens/MemoListScreen'
import MemoCreateScreen from './src/screens/MemoCreateScreen'
import MemoDetailScreen from './src/screens/MemoDetailScreen'
import MemoEditScreen from './src/screens/MemoEditScreen'
import LoginScreen from './src/screens/LoginScreen'
import SignupScreen from './src/screens/SignupScreen'
import ENV from './env.json'

// Unhandled promise rejection: ReferenceError: Can't find variable: atob というエラー
// base-64インストールして下記記載で完治
// 参考： https://qiita.com/carrydaisuki/items/b64c1e199ab6870d3161
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

const firebaseConfig = {
  apiKey: ENV.FIREBASE_API_KEY,
  authDomain: ENV.FIREBASE_AUTH_DOMAIN,
  databaseURL: ENV.FIREBASE_DB_URL,
  projectId: ENV.FIREBASE_PRJ_ID,
  storageBucket: ENV.FIREBASE_STORAGE,
  messagingSenderId: ENV.FIREBASE_SENDER_ID,
  appId: ENV.FIREBASE_APP_ID,
}
firebase.initializeApp(firebaseConfig)

// 各スクリーンの登録
// 一番上に登録してあるものが最初に出る
const App = createStackNavigator({
  Login: { screen: LoginScreen },
  Signup: { screen: SignupScreen },
  Home: { screen: MemoListScreen },
  MemoCreate: { screen: MemoCreateScreen },
  MemoDetail: { screen: MemoDetailScreen },
  MemoEdit: { screen: MemoEditScreen },
}, {
  defaultNavigationOptions: {
    headerTitle: 'Memot',
    headerTintColor: '#fff', // ヘッダーアプリバーの前画面に戻るテキスト色
    headerBackTitleVisible: null, // ヘッダーアプリバー左側テキスト有無
    headerStyle: {
      backgroundColor: '#265366',
    },
    headerTitleStyle: {
      color: '#fff',
    },
  },
})

export default createAppContainer(App)
