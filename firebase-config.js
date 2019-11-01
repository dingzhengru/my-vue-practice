const firebaseConfig = {
  apiKey: "AIzaSyA1v-8vqcbl-kvKKUybHKQkJdimDNs2Ykk",
  authDomain: "vue-demo-92774.firebaseapp.com",
  databaseURL: "https://vue-demo-92774.firebaseio.com",
  projectId: "vue-demo-92774",
  storageBucket: "vue-demo-92774.appspot.com",
  messagingSenderId: "293558852778",
  appId: "1:293558852778:web:e0b38cd9525f765ba6c4d3"
};

// Auth
// 登入設定檔(email&password)
const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be whitelisted in the Firebase Console.
    url: 'http://localhost:8081',
    // This must be true.
    handleCodeInApp: true,
    // iOS: {
    //     bundleId: 'com.example.ios'
    // },
    // android: {
    //     packageName: 'com.example.android',
    //     installApp: true,
    //     minimumVersion: '12'
    // },
    // dynamicLinkDomain: 'example.page.link'
};
