import React, { useState, useEffect, useRef }from 'react';
import initialData from "../initial-data";
import initialSearchData from "../initial-search-data";
import Column from './Column';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import exerciseDB from "../apis/exerciseDB";
import SearchBar from './SearchBar';
import ExerciseList from "./ExerciseList";
import SearchColumn from './SearchColumn';
import Exercise from "./Exercise";
import ExerciseResults from "./ExerciseResults";


const MainContainer = styled.div`
    display: flex;
    
`

const App = () => {
    const [state, setState] = useState(initialData);
    const [ searchResults, setSearchResults ] = useState([]);
    const [ exercises, setExercises] = useState([]);
    const [ searchStr, setSearchStr ] = useState('');

    const firstUpdate = useRef(true);

    useEffect(()=> {
        console.log('state updated: ', state);
    },[state]);

    useEffect(() => {
        /* Get students object from API. Called once during load */
        async function getExercises() {
            try {
                const response = await exerciseDB.get(``);
                /* Declare 'tags' property for each student */
                setExercises(response.data);
            } catch (e) {
                console.error(e);
            }
        };
        getExercises();
    }, []);

    const onDragStart = start => {
        const homeIndex = state.columnOrder.indexOf(start.source.droppableId);

        setState({...state,
            homeIndex: homeIndex,
        });

    }

    const onDragEnd = result => {
        setState({...state,
            homeIndex: null,
        });

        const { destination, source, draggableId, type } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        if (type === 'column'){
            const newColumnOrder = Array.from(state.columnOrder);
            newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, draggableId);

            const newState = {
                ...state,
                columnOrder: newColumnOrder,
            };

            setState(newState);
            return
        }

        const start = state.columns[source.droppableId];
        const finish = state.columns[destination.droppableId];

        if (start === finish){
            const column = state.columns[source.droppableId];
            const newTaskIds = Array.from(column.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...column,
                taskIds: newTaskIds,
            };

            const newState = {
                ...state,
                columns: {
                    ...state.columns,
                    [newColumn.id]: newColumn,
                },
            };

            setState(newState);
            return;
        }

        // Moving from one list to another
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            taskIds: startTaskIds,
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds,
        };

        const newState = {
            ...state,
            columns: {
                ...state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        };

        // set used property to true after moving workout, to save from cleaning operation before every search
        newState["exercises"][draggableId].used = true;

        setState(newState);



    };

    async function onTermSubmit(term) {
        setSearchStr(term);
    }

    useEffect(()=> {
        // Prevent first update loading
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        // Set search results to filtered exercises based off of search string
        setSearchResults(ExerciseResults(exercises,searchStr));
    }, [searchStr]);

    useEffect(() => {
        // Prevent first update loading
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }

        // clean unused exercises before adding new ones
        // iterate over exercises obj to pop all exercises that have used = false, keeping only 'true' exercises
        // find length of obj
        // iterate through objects in "exercises"
        // check if current object has used property set to false
            // if false, then delete object. do nothing if true
        const newState = {...state};
        let idsToDelete = [];

        console.log('state before deletions: ', state);
        for (let indExercises in newState["exercises"]){
            let exercise = newState["exercises"][indExercises];
            // console.log(exercise.name, ' is used: ', exercise.used);
            if (exercise.used === false) {
                idsToDelete.push(exercise.id);
                // console.log('deleting', newState["exercises"][indExercises]);
                // TODO: Reintroduce when we fix taskids for column-0
                delete newState["exercises"][indExercises];
                console.log('newState after deleting ', newState["exercises"][indExercises], ': ', newState);
            }
        }
        // RIGHT how could I be so silly... I need to also remove the ids from column-0
        let newStateIds = newState["columns"]["column-0"]["taskIds"]
        console.log('taskids: ', newStateIds);
        console.log('ids to delete: ', idsToDelete);

        setState(newState);

        console.log('deleting complete, reloading new searchresults');
        console.log('state after deletions: ', state);

        // create new state and iterate over searchresults, creating new exercise objects and pushing taskids to columns. could probably setstate outside this loop
        //const newState = {...state};
        for (let i = 0; i < searchResults.length; i++ ){
            const id = searchResults[i][0];
            const name = searchResults[i][1];
            // console.log('test id: ', id, ' name: ', name);
            newState["exercises"][id] = {id: id, name: name, used: false};
            newState["columns"]["column-0"].taskIds.push(id);
            setState(newState);
            // console.log('state: ', state);
        }

        console.log('taskids: ', newState["columns"]["column-0"]["taskIds"]);
        console.log(newStateIds.filter(n => !idsToDelete.includes(n)));
        newState["columns"]["column-0"]["taskIds"] = newStateIds.filter(n => !idsToDelete.includes(n));

    },[searchResults])

    return (
        <div>
            <Container>
                <Grid container>
                    <Grid item xs={12}>
                        <SearchBar placeholder="Search by name" onFormSubmitToSB={onTermSubmit}/>
                        <ExerciseList className="profile-list" searchStr={searchStr} tagSearchStr={searchStr} exercises={exercises}/>

                    </Grid>
                    <Grid item xs={12}>
                        <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd} >

                            <Droppable droppableId="all-columns" direction="horizontal" type="column">
                                {(provided) => (

                                    <MainContainer
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {state.columnOrder.map((columnId, index) => {


                                            // Add isDropDisabled={isDropDisabled} bind to follow this logic ^, which
                                            if (index === 0){
                                                const column = state.columns[columnId];
                                                const tasks = column.taskIds.map(taskId => state.exercises[taskId]);
                                                return <SearchColumn key={column.id} column={column} tasks={tasks} index={index} isDropDisabled={1}></SearchColumn>
                                            } else {
                                                const column = state.columns[columnId];
                                                const tasks = column.taskIds.map(taskId => state.exercises[taskId]);
                                                return <Column key={column.id} column={column} tasks={tasks} index={index} ></Column>
                                            }

                                        })}
                                        {provided.placeholder}
                                    </MainContainer>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </Grid>
                </Grid>
            </Container>

            <Container>

            </Container>


        </div>
    );
}

export default App;