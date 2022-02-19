import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@mui/icons-material';
import { Avatar, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './chat.css'
import db from '../firebase';
import { useStateValue } from '../StateProvider';
import firebase from 'firebase/compat/app';

function Chat() {
    const [dp,setDp] = useState("");
    const [input,setInput] = useState("");
    const { groupId } = useParams();
    const [name,setName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        if(groupId){
            db.collection("groups").doc(groupId).onSnapshot((snapshot) => setName(snapshot.data().name));

            db.collection("groups")
            .doc(groupId)
            .collection("messages")
            .orderBy("timestamp",'asc')
            .onSnapshot((snapshot) => setMessages(snapshot.docs.map((doc) => doc.data())));
            
            setDp(Math.floor(Math.random()*5000))
        }
    }, [groupId]);

    function sendMessage(e){
        e.preventDefault();
        db.collection("groups").doc(groupId).collection("messages").add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput("");
    }

    return (
        <div className='chat'>
            <div className='chat_header'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${dp}.svg`}/>
                <div className='chat_headerInfo'>
                    <h3>{name}</h3>
                    <p>{messages.length? `last seen ${new Date(messages[messages.length-1].timestamp?.toDate()).toUTCString()}` : ""}</p>
                </div>
                <div className='chat_headerRight'>
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>
            <div className='chat_body'>
                {messages.map((message) => (
                    <p className={`chat_message ${message.name === user.displayName && `chat_receiver`}`}>
                        <span className='chat_name'>{message.name}</span>
                        {message.message}
                        <div className='chat_timestamp'>{new Date(message.timestamp?.toDate()).toUTCString()}</div>
                    </p>
                ))}
            </div>
            <div className='chat_footer'>
                <InsertEmoticon/>
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder='Type a message'/>
                    <button onClick={sendMessage} type='submit'>Send a message</button>
                </form>
                <Mic/>
            </div>
        </div>
    )
}

export default Chat