import React, { useEffect, useState } from 'react'
import { Avatar, IconButton } from '@mui/material'
import './sidebar.css'
import { Chat, DonutLarge, MoreVert, SearchOutlined } from '@mui/icons-material'
import SidebarChat from './SidebarChat'
import db from '../firebase'
import { useStateValue } from '../StateProvider'

function Sidebar() {
    const [groups,setGroups] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        db.collection('groups').onSnapshot((snapshot) => setGroups(
            snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            }))
        ))
    });

    return (
        <div className='sidebar'>
            <div className='sidebar_header'>
                <Avatar src={user?.photoURL}/>
                <div className='sidebar_headerRight'>
                    <IconButton>
                        <DonutLarge/>
                    </IconButton>
                    <IconButton>
                        <Chat/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>

            <div className='sidebar_search'>
                <div className='sidebar_searchContainer'>
                    <SearchOutlined/>
                    <input placeholder='Search or start new chat' type="text"/>
                </div>
            </div>

            <div className='sidebar_chat'>
                <SidebarChat addNewChat={true}/>
                {
                    groups.map((group) => {
                        return <SidebarChat key={group.id} id={group.id} name={group.data.name} />
                    })
                }
            </div>
        </div>
    )
}

export default Sidebar