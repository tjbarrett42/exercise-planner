import React from 'react';
import {Container} from "@mui/material";
import ExerciseDraggable from './ExerciseDraggable';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const MainContainer = styled.div`
    margin: 8px;
    border: 1px solid red;
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

// memo(function InnerTaskList (props) {
//
// })

const InnerTaskList = (props) => {
    async function updateSetsRepsToColumn(exerciseId, setsReps){
        props.updateSetsRepsToApp(exerciseId, setsReps);
    }

    return props.exercises.map((exercise, index) => (
        <ExerciseDraggable key={exercise.id} exercise={exercise} index={index} updateSetsRepsToColumn={updateSetsRepsToColumn}/>
    ));
}

const SearchColumn = (props) => {
    async function updateSetsRepsToApp(exerciseId, setsReps){
        props.updateSetsRepsToState(exerciseId, setsReps);
    }




    return (
        <MainContainer >
            <Title >{props.column.title}</Title>
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
    )
}

export default SearchColumn;