// 因為auth().currentUser會延遲，所以改用Watch的方式取得是否登入
// 當auth狀態改變就會執行此程式，利用sessionStorage存是否登入(關頁面就會刪除)
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        window.sessionStorage.setItem('isLogin', true);
        console.log('Logged');
    } else {
        window.sessionStorage.removeItem('isLogin');
        console.log('no user');
    }
});



var providerGoogle = new firebase.auth.GoogleAuthProvider();

// Optional(scope, languageCode, CustomParameters)
// scope: 跟用戶索取資料類型、範圍 https://developers.google.com/identity/protocols/googlescopes
// languageCode: 語言代碼 http://www.lingoes.net/en/translator/langcode.htm

//contacts.readonly (See and download your contacts)
providerGoogle.addScope('https://www.googleapis.com/auth/contacts.readonly')

// 登入設定檔(email&password)
var actionCodeSettings = {
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