import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react'
import './sidebarChat.css';
import db from '../firebase';
import { Link } from 'react-router-dom';

function SidebarChat({id, name, addNewChat}) {
    const [dp,setDp] = useState("");
    const [messages, setMessages] = useState([])

    useEffect(() => {
        setDp(Math.floor(Math.random()*5000))
    }, [])

    useEffect(() => {
        if(id){
            db.collection("groups").doc(id).collection("messages").orderBy("timestamp",'desc')
            .onSnapshot((snapshot) => setMessages(snapshot.docs.map((doc) => doc.data())));
        }
    }, [id]);

    function createChat(){
        const groupName = prompt("please enter name for chat group");

        if(groupName){
            console.log(groupName)
            db.collection("groups").add({
                name: groupName
            });
        }
    }

    return !addNewChat ? (
        <Link to={`/${id}`}>
            <div className='sidebarChat'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${dp}.svg`}/>
                <div className='sidebarChat_info'>
                    <h3>{name}</h3>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
    ) : (
        <div onClick={createChat} className="sidebarChat">
            <h3> Add New Chat</h3>
        </div>
    )
}

export default SidebarChat