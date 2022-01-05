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
    width: 220px;
    
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
    return props.tasks.map((task, index) => (
        <ExerciseDraggable key={task.id} task={task} index={index}/>
    ));
}

const Column = (props) => {
    return (
        <Draggable draggableId={props.column.id} index={props.index}>
            {(provided) => (
                <MainContainer {...provided.draggableProps} ref={provided.innerRef}>
                    <Title {...provided.dragHandleProps}>{props.column.title}</Title>
                    <Droppable droppableId={props.column.id} type="task">
                        {(provided, snapshot) => (
                            <TaskList
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                isDraggingOver={snapshot.isDraggingOver}
                            >
                                <InnerTaskList tasks={props.tasks}/>
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