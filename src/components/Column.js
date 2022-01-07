import React from 'react';
import {Container} from "@mui/material";
import ExerciseDraggable from './ExerciseDraggable';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import WorkoutTitleEntry from "./WorkoutTitleEntry";

const MainContainer = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    background-color: white;
    border-radius: 2px;
    width: 300px;
    
    display: flex;
    flex-direction: column;
`

const Title = styled.div`
    padding: 8px;

`

const TaskList = styled.div`
    padding: 8px;
    transition: background-color 0.2s ease;
    background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'inherit')};
    flex-grow: 1;
    min-height: 100px;
`;

const InnerTaskList = (props) => {
    async function updateSetsRepsToColumn(exerciseId, setsReps){
        props.updateSetsRepsToApp(exerciseId, setsReps);
    }

    return props.exercises.map((exercise, index) => (
        <ExerciseDraggable key={exercise.id} exercise={exercise} index={index} updateSetsRepsToColumn={updateSetsRepsToColumn}/>
    ));
}

const Column = (props) => {
    async function updateSetsRepsToApp(exerciseId, setsReps){
        props.updateSetsRepsToState(exerciseId, setsReps);
    }

    async function updateTitleToApp(columnId, title){
        props.updateTitleToState(columnId, title);
    }

    return (
        <Draggable draggableId={props.column.id} index={props.index}>
            {(provided) => (
                <MainContainer {...provided.draggableProps} ref={provided.innerRef}>
                    <Title {...provided.dragHandleProps}>
                        <WorkoutTitleEntry columnId={props.column.id} onFormSubmitToWTE={updateTitleToApp}/>
                    </Title>
                    <Droppable droppableId={props.column.id} type="exercise">
                        {(provided, snapshot) => (
                            <TaskList
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                isDraggingOver={snapshot.isDraggingOver}
                            >
                                <InnerTaskList exercises={props.exercises} updateSetsRepsToApp={updateSetsRepsToApp}/>
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