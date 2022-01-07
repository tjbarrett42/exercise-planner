import React from 'react';
import {Container} from "@mui/material";
import { Draggable } from 'react-beautiful-dnd';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField';
import ExerciseSetsRepsEntry from "./ExerciseSetsRepsEntry";
import Grid from '@mui/material/Grid';

const CustomCard = styled(Card)`
    border: 1px solid grey;
    padding: 0px;
    margin-bottom: 5px;

    background-color: ${props => 
        props.isDragDisabled
            ? 'lightgrey'
            : props.isDragging
                ? 'lightgreen'
                : 'white'};
    
`;

const CustomCardContent = styled(CardContent)`
    padding: 10px;
    padding-bottom: 0px;

`




const ExerciseDraggable = (props) => {

    async function updateSetsRepsToInnerList(exerciseId, setsReps){

        props.updateSetsRepsToColumn(exerciseId, setsReps);
    }

    // const isDragDisabled = props.task.id === 'task-1';
    // Logic for if draggable becomes 'used', where we then want to present sets/reps options
    if (props.exercise.used === true){
        return (
            <Draggable  draggableId={props.exercise.id} index={props.index}>
                {(provided, snapshot) => (
                    <CustomCard
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                        // isDragDisabled={isDragDisabled}
                    >
                        <CustomCardContent>
                            <Typography variant="body1">
                                {props.exercise.name}
                            </Typography>
                            <Grid container>
                                <Grid xs={6}>

                                </Grid>
                                <Grid xs={6}>
                                    <ExerciseSetsRepsEntry exerciseId = {props.exercise.id} onFormSubmitToSRE={updateSetsRepsToInnerList}/>
                                </Grid>
                            </Grid>
                        </CustomCardContent>
                    </CustomCard>
                )}
            </Draggable>
        );
    } else {
        return (
            <Draggable  draggableId={props.exercise.id} index={props.index}>
                {(provided, snapshot) => (
                    <CustomCard
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                        // isDragDisabled={isDragDisabled}
                    >
                        <CustomCardContent>
                            <Typography variant="body1">
                                {props.exercise.name}
                            </Typography>
                        </CustomCardContent>
                    </CustomCard>
                )}
            </Draggable>
        );
    }
}

export default ExerciseDraggable;