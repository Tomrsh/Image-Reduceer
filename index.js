const express = require('express');
const { initializeApp } = require('firebase/app');
const { getDatabase, ref, push, set } = require('firebase/database');

const app = express();
app.use(express.json());

const firebaseConfig = {
  apiKey: "AIzaSyAb7V8Xxg5rUYi8UKChEd3rR5dglJ6bLhU",
  authDomain: "t2-storage-4e5ca.firebaseapp.com",
  databaseURL: "https://t2-storage-4e5ca-default-rtdb.firebaseio.com",
  projectId: "t2-storage-4e5ca",
  storageBucket: "t2-storage-4e5ca.firebasestorage.app",
  messagingSenderId: "667143720466",
  appId: "1:667143720466:web:c8bfe23f3935d3c7e052cb",
  measurementId: "G-K2KPMMC5C6"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);

app.post('/send', async (req, res) => {
    const { sender, receiver, msg } = req.body;
    
    try {
        const chatID = [sender, receiver].sort().join("_");
        const msgRef = ref(db, `chats/${chatID}`);
        const newMsgRef = push(msgRef);

        // Message bhejte waqt status 'sent' rakha hai
        await set(newMsgRef, {
            s: sender,
            m: msg,
            t: Date.now(),
            status: "sent" 
        });

        res.status(200).json({ success: true, id: newMsgRef.key });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.listen(process.env.PORT || 3000, () => console.log("API Strong!"));
