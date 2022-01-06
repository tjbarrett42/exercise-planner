import React from 'react';
import {Container} from "@mui/material";
import { Draggable } from 'react-beautiful-dnd';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField';
import ExerciseSetsRepsEntry from "./ExerciseSetsRepsEntry";

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
    // const isDragDisabled = props.task.id === 'task-1';

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
                        {/*<ExerciseSetsRepsEntry onFormSubmitToSRE={}/>*/}
                        {/*<Typography variant="subtitle1">*/}
                        {/*    {props.exercise.target}*/}
                        {/*</Typography>*/}
                        {/*<Typography variant="subtitle2">*/}
                        {/*    {props.exercise.dbId}*/}
                        {/*</Typography>*/}
                        {/*<Typography variant="subtitle2">*/}
                        {/*    {props.exercise.bodyPart}*/}
                        {/*</Typography>*/}
                        {/*<Typography variant="subtitle2">*/}
                        {/*    {props.exercise.equipment}*/}
                        {/*</Typography>*/}

                    </CustomCardContent>
                </CustomCard>
            )}
        </Draggable>
    );
}

export default ExerciseDraggable;