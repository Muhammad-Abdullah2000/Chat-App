import React, { useRef } from 'react'
import AppLayout from '../components/layout/AppLayout';
import { IconButton, Stack } from '@mui/material';
import { gray, orange } from '../components/constants/color';
import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material';
import { InputBox } from '../components/styles/StyledComponent';
import FileMenu from '../components/dialogs/FileMenu';
import { sampleMessage } from '../components/constants/sampleData';
import MessageComponent from '../components/shared/MessageComponent';

const user = {
    _id: "sdfssdfsdf",
    name: "Muhammad Abdullah"
}

const Chat = () => {

    const containerRef = useRef(null);



    return (
        <>
            <Stack
                ref={containerRef}
                boxSizing={"border-box"}
                padding={"1rem"}
                spacing={"1rem"}
                bgcolor={gray}
                height={"90%"}
                sx={{
                    overflowX: "hidden",
                    overflowY: "auto",
                }}

            >
                {
                    sampleMessage.map((i) => (
                        <MessageComponent key={i._id} message={i} user={user} />
                    ))
                }

            </Stack>

            <form style={{
                height: "10%"
            }}>

                <Stack
                    direction={"row"}
                    height={"100%"}
                    padding={"1rem"}
                    alignItems={"center"}
                    position={"relative"}
                >

                    <IconButton sx={{
                        position: "absolute",
                        left: "1rem",
                        rotate: "30deg"
                    }}

                    >
                        <AttachFileIcon />
                    </IconButton>


                    <InputBox placeholder='Type Message Here...' />

                    <IconButton type='submit' sx={{
                        rotate: "-30deg",
                        backgroundColor: orange,
                        color: "black",
                        marginLeft: "1rem",
                        padding: "0.5rem",
                        "&hover": {
                            bgcolor: "error.dark",
                        }
                    }}>
                        <SendIcon />
                    </IconButton>

                </Stack>

            </form>

            <FileMenu />

        </>
    )
}

export default AppLayout()(Chat);
