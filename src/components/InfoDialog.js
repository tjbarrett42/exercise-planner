import React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import {Box} from "@mui/material";
import Container from "@mui/material/Container";

/* Open dialog from app bar for more information about the site, formulas, calculations, etc.*/


const InfoDialog = ({onClose, open, exercise}) => {
    const gifUrl = "http://d205bpvrqc9yn1.cloudfront.net/"

    return (
        <Dialog
            onClose={onClose}
            open={open}
            scroll={'paper'}

        >
            <DialogTitle>Exercise Information</DialogTitle>
            <DialogContent >
                <DialogContentText
                    id="scroll-dialog-description"
                    tabIndex={-1}
                >
                    <Container>
                        <Typography component={'p'} variant="h4">
                            {exercise.name}
                        </Typography>
                        <Typography component={'span'} variant="body1">
                            <p>Target: {exercise.target}</p>
                            <p>Body part: {exercise.bodyPart}</p>
                            <p>Equipment: {exercise.equipment}</p>
                        </Typography>
                        <Box
                            component="img"
                            sx={{
                                // height: 233,
                                // width: 350,
                                // maxHeight: { xs: 233, md: 167 },
                                // maxWidth: { xs: 350, md: 250 },
                            }}
                            alt={gifUrl.concat(exercise.dbId,".gif")}
                            src={gifUrl.concat(exercise.dbId,".gif")}
                        />
                    </Container>


                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Back</Button>
            </DialogActions>

        </Dialog>
    );
}

export default InfoDialog;