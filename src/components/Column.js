import React from 'react';
import {Container} from "@mui/material";
import ExerciseDraggable from './ExerciseDraggable';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

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
    return props.exercises.map((exercise, index) => (
        <ExerciseDraggable key={exercise.id} exercise={exercise} index={index}/>
    ));
}

const Column = (props) => {
    return (
        <Draggable draggableId={props.column.id} index={props.index}>
            {(provided) => (
                <MainContainer {...provided.draggableProps} ref={provided.innerRef}>
                    <Title {...provided.dragHandleProps}>{props.column.title}</Title>
                    <Droppable droppableId={props.column.id} type="exercise">
                        {(provided, snapshot) => (
                            <TaskList
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                isDraggingOver={snapshot.isDraggingOver}
                            >
                                <InnerTaskList exercises={props.exercises}/>
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