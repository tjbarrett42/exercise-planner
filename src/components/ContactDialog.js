import React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

/* Open dialog from app bar for more contact information*/
const ContactDialog = ({onClose, open}) => {
    return (
        <Dialog
            onClose={onClose}
            open={open}
            scroll={'paper'}

        >
            <DialogTitle>Contact</DialogTitle>
            <DialogContent >
                <DialogContentText
                    id="scroll-dialog-description"
                    tabIndex={-1}
                >
                    <Typography variant="h5">
                        Email
                    </Typography>
                    <Typography variant="body1">
                        Questions or comments? Feel free to send me an email at timothy@jamesbarrett.us
                    </Typography>

                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Back</Button>
            </DialogActions>

        </Dialog>
    );
}

export default ContactDialog;