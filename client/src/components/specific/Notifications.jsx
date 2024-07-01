import { Avatar, Button, Dialog, DialogTitle, ListItem, Stack, Typography } from '@mui/material';
import React, { memo } from 'react';
import { sampleNotifications } from '../constants/sampleData';

const Notifications = () => {

    const friendRequesthandler = ({ _id, accept }) => {

    };



    return <Dialog open>

        <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"70rem"}>

            <DialogTitle>Notifications</DialogTitle>

            {
                sampleNotifications.length > 0 ? (
                    sampleNotifications.map(({ sender, _id }) => <NotificationItem sender={sender} _id={_id} handler={friendRequesthandler} key={_id} />)
                ) : (
                    <Typography textAlign={"center"}>0 Notifications</Typography>

                )}

        </Stack>

    </Dialog>
};


const NotificationItem = memo(({ sender, _id, handler }) => {

    const { name, avatar2 } = sender;

    const avatarUrl = Array.isArray(avatar2) && avatar2.length > 0 ? avatar2[0] : '';

    return (
        <ListItem>
            <Stack
                direction={"row"}
                alignItems={"center"}
                spacing={"1rem"}
                width={"100%"}
            >

                <Avatar sx={{
                    height: 30,
                    width: 30,
                    objectFit: "contain",
                }}

                    src={avatarUrl}
                />

                <Typography
                    variant='body1'
                    sx={{
                        flexGlow: 1,
                        display: "-webkit-box",
                        WebkitLineClamp: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        width: "100%",
                        fontSize: 12
                    }}

                >

                    {`${name} sent you a friend Request`}

                </Typography>

                <Stack direction={{
                    xs: "column",
                    sm: "row",
                }}


                >
                    <Button sx={{
                        fontSize: 10
                    }} onClick={() => handler({ _id, accept: true })}>Accept</Button>

                    <Button sx={{
                        fontSize: 10
                    }} color='error' onClick={() => handler({ _id, accept: false })}>Reject</Button>

                </Stack>

            </Stack>
        </ListItem>
    )

});

export default Notifications