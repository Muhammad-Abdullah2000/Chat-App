import { useInputValidation } from "6pp";
import { Button, Dialog, DialogTitle, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { sampleUsers } from '../constants/sampleData';
import UserItem from '../shared/UserItem';

const NewGroup = () => {

    const groupName = useInputValidation("");

    const [members, setMembers] = useState(sampleUsers);
    const [selectedMembers, setSelectedMembers] = useState([]);


    const selectMemberHandler = (id) => {

        setSelectedMembers((prev) => (prev.includes(id) ? prev.filter((currElement) => currElement !== id) : [...prev, id]));

    };


    const submitHandler = () => { };

    const closeHandler = () => { };


    return <Dialog open onClose={closeHandler}>

        <Stack p={{ xs: "1rem", sm: "3rem" }} width={"25rem"} spacing={"2rem"}>

            <DialogTitle textAlign={"center"} variant='h4'>New Group</DialogTitle>

            <TextField label="Group Name" value={groupName.value} onChange={groupName.changeHandler} />

            <Typography variant="body1">Members</Typography>

            <Stack>
                {
                    members.map((user) => (
                        <UserItem
                            user={user}
                            key={user._id}
                            handler={selectMemberHandler}
                            isAdded={selectedMembers.includes(user._id)}
                        />
                    ))
                }
            </Stack>

            <Stack direction={"row"} justifyContent={"space-evenly"}>
                <Button variant="outlined" color="error">Cancel</Button>
                <Button variant="contained" onClick={submitHandler}>Create</Button>
            </Stack>

        </Stack>

    </Dialog>
}

export default NewGroup