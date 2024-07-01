import { Stack } from '@mui/material'
import React from 'react'
import Chatitem from '../shared/Chatitem'

const ChatList = ({ w = "100%", chats = [], chatId, onlineUsers = [], newMessagesAlert = [{
  chatId: "",
  count: 0
}], handleDeleteChat }) => {
  return (
    <Stack width={w} direction={"column"} overflow={"auto"} height={"100%"}>
      {
        chats?.map((data, index) => {

          const { avatar, _id, name, groupchat, members } = data;

          const newMessageAlert = newMessagesAlert.find(
            ({ chatId }) => chatId === _id
          );

          const isOnline = members?.some((member) => onlineUsers.includes(_id));

          return <Chatitem
            index={index}
            newMessageAlert={newMessageAlert}
            isOnline={isOnline}
            avatar={avatar}
            name={name}
            _id={_id}
            key={_id}
            groupChat={groupchat}
            sameSender={chatId === _id}
            handleDeleteChat={handleDeleteChat}
          />
        })
      }
    </Stack>
  )
}

export default ChatList