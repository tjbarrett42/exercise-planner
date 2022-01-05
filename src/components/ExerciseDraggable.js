import React from 'react';
import {Container} from "@mui/material";
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';


const Container2 = styled.div`
    border: 1px solid black;
    padding: 10px;
    margin: 5px;

    background-color: ${props => 
        props.isDragDisabled
            ? 'lightgrey'
            : props.isDragging
                ? 'lightgreen'
                : 'white'};
    
`;

const Handle = styled.div`
    width: 20px;
    height: 20px;
    background-color: orange;
    border-radius: 4px;
    margin-right: 8px;
`

const ExerciseDraggable = (props) => {
    // const isDragDisabled = props.task.id === 'task-1';
    return (
        <Draggable  draggableId={props.task.id} index={props.index}>
            {(provided, snapshot) => (
                <Container2 className="task-draggable"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                    // isDragDisabled={isDragDisabled}
                >
                    {props.task.name}
                </Container2>
            )}
        </Draggable>
    );
}

export default ExerciseDraggable;