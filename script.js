// Firebaseの設定
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
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
