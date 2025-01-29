// 🔥 Firebaseの設定（自分のfirebaseConfigに置き換える）
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Firebaseを初期化
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

// メールアドレスで新規登録
function signUpWithEmail() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => console.log("ユーザー登録成功:", userCredential.user))
        .catch(error => console.error("登録エラー:", error.message));
}

// メールアドレスでログイン
function loginWithEmail() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => console.log("ログイン成功:", userCredential.user))
        .catch(error => console.error("ログインエラー:", error.message));
}

// Googleでログイン
function loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then(result => console.log("Googleログイン成功:", result.user))
        .catch(error => console.error("エラー:", error.message));
}

// ログアウト
function logout() {
    auth.signOut().then(() => console.log("ログアウト成功"));
}

// メッセージ送信
function sendMessage() {
    const message = document.getElementById('message').value;
    const user = auth.currentUser;
    if (user && message) {
        db.ref("messages").push({
            name: user.email,
            text: message,
            timestamp: Date.now()
        });
        document.getElementById('message').value = "";
    }
}

// チャットの更新を監視
db.ref("messages").on("child_added", snapshot => {
    const msg = snapshot.val();
    const chatBox = document.getElementById("chat-box");
    const messageElement = document.createElement("div");
    messageElement.textContent = `${msg.name}: ${msg.text}`;
    chatBox.appendChild(messageElement);
});
