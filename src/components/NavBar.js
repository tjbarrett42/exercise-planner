import React, {useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AboutDialog from "./AboutDialog";
import ContactDialog from "./ContactDialog";
import MobileDialog from "./MobileDialog";

/* Navbar component using MUI's AppBar. */
const NavBar = () => {
    const [ openAbout, setOpenAbout ] = useState(false);
    const [ openContact, setOpenContact ] = useState(false);
    const [ openMobile, setOpenMobile ] = useState(true);

    const handleClickOpenAbout = () => {
        setOpenAbout(true);
    };
    const handleCloseAbout = (value) => {
        setOpenAbout(false);
    };

    const handleClickOpenContact = () => {
        setOpenContact(true);
    };
    const handleCloseContact = (value) => {
        setOpenContact(false);
    };

    const handleClickOpenMobile = () => {
        setOpenMobile(true);
    };
    const handleCloseMobile = (value) => {
        setOpenMobile(false);
    };

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        {/*<IconButton*/}
                        {/*    size="large"*/}
                        {/*    edge="start"*/}
                        {/*    color="inherit"*/}
                        {/*    aria-label="menu"*/}
                        {/*    sx={{ mr: 2 }}*/}
                        {/*>*/}
                        {/*</IconButton>*/}
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Workout Split Planner v1.1
                        </Typography>
                        <Button color="inherit" onClick={handleClickOpenAbout}>About</Button>
                        <Button color="inherit" onClick={handleClickOpenContact}>Contact</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <AboutDialog open={openAbout} onClose={handleCloseAbout}/>
            <ContactDialog open={openContact} onClose={handleCloseContact}/>
            <MobileDialog open={openMobile} onClose={handleCloseMobile}/>
        </div>

    );
}

export default NavBar;