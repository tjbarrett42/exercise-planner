import React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

/* Open dialog from app bar for more information about the site, formulas, calculations, etc.*/
const AboutDialog = ({onClose, open}) => {
    return (
        <Dialog
            onClose={onClose}
            open={open}
            scroll={'paper'}

        >
            <DialogTitle>About the Workout Split Planner</DialogTitle>
            <DialogContent >
                <DialogContentText
                    id="scroll-dialog-description"
                    tabIndex={-1}
                >
                    <Typography variant="h5">
                        What are sets?
                    </Typography>
                    <Typography variant="body1">
                        <p>
                            'Sets' are groups of repetitions of an exercise, such as bicep curls.
                        </p>
                        <p>
                            <a href="https://outlift.com/hypertrophy-training-volume/#:~:text=The%20ideal%20training%20volume%20for%20building%20muscle%20is%20around%209,enough%20to%20maximize%20muscle%20growth.">In hypertrophy training, there are optimal ranges of sets per week for muscle growth.</a>
                        </p>
                        <p>
                            This site evaluates your routine's weekly set volume and visualizes your daily muscle group usage for optimizing lifts and rest periods.
                        </p>
                    </Typography>
                    <Typography variant="h5">
                        What are splits?
                    </Typography>
                    <Typography variant="body1">
                        <p>
                            All consistent muscle building routines can be categorized into workout 'splits', or patterns.
                        </p>
                        <p>
                            These patterns vary from athlete to athlete, but in general splits are just sessions of workouts that repeat weekly, targeting specific sets of muscles of the body per day, planning adequate rest before workout sessions using the same muscles.
                        </p>
                        <p>
                            Some examples of common splits:
                            <ul>
                                <li>
                                    Upper body / lower body split:
                                    <ul>
                                        <li>M: Upper body</li>
                                        <li>T: Lower body</li>
                                        <li>W: Rest</li>
                                        <li>T: Upper body</li>
                                        <li>F: Lower body</li>
                                        <li>S+SU: Rest</li>
                                    </ul>
                                </li>
                                <li>
                                    Body part split:
                                    <ul>
                                        <li>M: Chest and triceps</li>
                                        <li>T: Back and biceps</li>
                                        <li>W: Legs and shoulders</li>
                                        <li>T: Rest</li>
                                        <li>F: Chest and triceps</li>
                                        <li>S: Back and biceps</li>
                                        <li>SU: Legs and shoulders</li>
                                    </ul>
                                </li>
                                <li>
                                    Push, pull, legs split:
                                    <ul>
                                        <li>M: Push (heavy bench press)</li>
                                        <li>T: Pull (heavy deadlift)</li>
                                        <li>W: Legs (heavy back squat)</li>
                                        <li>T: Rest</li>
                                        <li>F: Push (high volume or bench press alternative)</li>
                                        <li>S: Pull (high volume or deadlift alternative)</li>
                                        <li>SU: Legs (high volume or back squat alternative)</li>
                                    </ul>
                                </li>
                            </ul>
                        </p>
                        <p>

                        </p>

                    </Typography>

                    <Typography variant="h5">
                        How it Works
                    </Typography>
                    <Typography variant="body1">
                        <p>
                            First, a filterable object of over 1300 exercises with their respective target muscles, required equipment, and demonstration GIFs is created clientside from an API call to ExerciseDB. This object is sorted by the Search component based on name, equipment used, and target muscle, and rendered on the results column.
                        </p>
                        <p>
                            Utilizing the react-beautiful-dnd library, this render creates draggable cards that can be dropped into other columns. Each analysis refresh aggregates the data from these columns to visualize this data with the recharts library.
                        </p>
                    </Typography>

                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Back</Button>
            </DialogActions>

        </Dialog>
    );
}

export default AboutDialog;