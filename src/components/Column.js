import React from 'react';
import {Container} from "@mui/material";
import ExerciseDraggable from './ExerciseDraggable';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import WorkoutTitleEntry from "./WorkoutTitleEntry";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Grid from '@mui/material/Grid';

const MainContainer = styled.div`
    margin: 1px;
    border: 1px solid lightgrey;
    background-color: white;
    border-radius: 5px;
    width: 300px;
    
    display: flex;
    flex-direction: column;
`

const Title = styled.div`
    padding: 5px;
    

`

const TaskList = styled.div`
    padding: 0px;
    transition: background-color 0.2s ease;
    background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'inherit')};
    flex-grow: 1;
    min-height: 100px;
`;

const InnerTaskList = (props) => {
    async function updateSetsRepsToColumn(exerciseId, setsReps){
        props.updateSetsRepsToApp(exerciseId, setsReps);
    }

    async function deleteDraggable(exerciseId){
        props.deleteDraggable(exerciseId);
    }

    return props.exercises.map((exercise, index) => (
        <ExerciseDraggable key={exercise.id} exercise={exercise} index={index} updateSetsRepsToColumn={updateSetsRepsToColumn} deleteDraggable={deleteDraggable}/>
    ));
}

const Column = (props) => {
    async function updateSetsRepsToApp(exerciseId, setsReps){
        props.updateSetsRepsToState(exerciseId, setsReps);
    }

    async function updateTitleToApp(columnId, title){
        props.updateTitleToState(columnId, title);
    }

    async function deleteDraggable(exerciseId) {
        props.deleteDraggable(exerciseId);
    }

    return (
        <Draggable draggableId={props.column.id} index={props.index}>
            {(provided) => (
                <MainContainer {...provided.draggableProps} ref={provided.innerRef}>
                    <Grid container>
                        <Grid item xs={1} {...provided.dragHandleProps}>
                            <DragIndicatorIcon ></DragIndicatorIcon>
                        </Grid>
                        <Grid item xs={11}>
                            <Title >
                                <WorkoutTitleEntry columnId={props.column.id} onFormSubmitToWTE={updateTitleToApp}/>
                            </Title>
                        </Grid>
                    </Grid>


                    <Droppable droppableId={props.column.id} type="exercise">
                        {(provided, snapshot) => (
                            <TaskList
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                isDraggingOver={snapshot.isDraggingOver}
                            >
                                <InnerTaskList exercises={props.exercises} updateSetsRepsToApp={updateSetsRepsToApp} deleteDraggable={deleteDraggable}/>
                                {provided.placeholder}
                            </TaskList>
                        )}
                    </Droppable>
                </MainContainer>
            )}

        </Draggable>
    )
}

export default Column;