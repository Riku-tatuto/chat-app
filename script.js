// Firebaseの設定
const firebaseConfig = {
    apiKey: "AIzaSyC5lk2jg9dc7snS9d9PRowKw6ubmcySeZw",
    authDomain: "webchat-app-system.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "webchat-app-system",
    storageBucket: "webchat-app-system.firebasestorage.app",
    messagingSenderId: "300765893131",
    appId: "1:300765893131:web:5f7a858ec0f8a5f14e2d0e"
};

// Firebase 初期化
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// メッセージ送信
function sendMessage() {
    const message = document.getElementById("messageInput").value;
    if (message.trim() !== "") {
        db.ref("messages").push({
            text: message
        });
        document.getElementById("messageInput").value = "";
    }
}

// メッセージ受信
db.ref("messages").on("child_added", (snapshot) => {
    const msg = snapshot.val();
    const msgDiv = document.createElement("div");
    msgDiv.textContent = msg.text;
    document.getElementById("messages").appendChild(msgDiv);
});
