import { Menu } from '@mui/material';
import React from 'react';

const FileMenu = ({ anchorEl }) => {
    return (
        <Menu open={false} anchorEl={anchorEl}>
            <div style={{
                width: "10rem"
            }}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere ducimus autem nihil nisi ratione quia officia iste ipsam iusto delectus.
            </div>
        </Menu>
    );
};

export default FileMenu;
