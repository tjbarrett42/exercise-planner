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
import ExerciseDataAggregation from "./ExerciseDataAggregation";
import SearchFilters from "./SearchFilters";
import AnalysisSection from "./AnalysisSection";

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
            const newExerciseIds = Array.from(column.exerciseIds);
            newExerciseIds.splice(source.index, 1);
            newExerciseIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...column,
                exerciseIds: newExerciseIds,
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
        const startExerciseIds = Array.from(start.exerciseIds);
        startExerciseIds.splice(source.index, 1);
        const newStart = {
            ...start,
            exerciseIds: startExerciseIds,
        };

        const finishExerciseIds = Array.from(finish.exerciseIds);
        finishExerciseIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            exerciseIds: finishExerciseIds,
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


        console.log('state: ', state);
    };

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

        // console.log('state before deletions: ', state);
        for (let indExercises in newState["exercises"]){
            let exercise = newState["exercises"][indExercises];
            // console.log(exercise.name, ' is used: ', exercise.used);
            if (exercise.used === false) {
                idsToDelete.push(exercise.id);
                // console.log('deleting', newState["exercises"][indExercises]);
                // TODO: Reintroduce when we fix exerciseIds for column-0
                delete newState["exercises"][indExercises];
                // console.log('newState after deleting ', newState["exercises"][indExercises], ': ', newState);
            }
        }
        // RIGHT how could I be so silly... I need to also remove the ids from column-0
        let newStateIds = newState["columns"]["column-0"]["exerciseIds"]
        // console.log('exerciseIds: ', newStateIds);
        // console.log('ids to delete: ', idsToDelete);

        setState(newState);

        // console.log('deleting complete, reloading new searchresults');
        // console.log('state after deletions: ', state);

        // create new state and iterate over searchresults, creating new exercise objects and pushing exerciseIds to columns. could probably setstate outside this loop
        //const newState = {...state};
        for (let i = 0; i < searchResults.length; i++ ){
            const id = searchResults[i][0];
            const dbId = searchResults[i][1]
            const name = searchResults[i][2];
            const target = searchResults[i][3];
            const bodyPart = searchResults[i][4];
            const equipment = searchResults[i][5];
            const setsReps = [0,0];

            // console.log('test id: ', id, ' name: ', name);
            newState["exercises"][id] = {id: id, dbId: dbId, name: name, target: target, bodyPart: bodyPart, equipment: equipment, setsReps: setsReps, used: false};
            newState["columns"]["column-0"].exerciseIds.push(id);
            setState(newState);
            // console.log('state: ', state);
        }

        // console.log('exerciseIds: ', newState["columns"]["column-0"]["exerciseIds"]);
        // console.log(newStateIds.filter(n => !idsToDelete.includes(n)));
        newState["columns"]["column-0"]["exerciseIds"] = newStateIds.filter(n => !idsToDelete.includes(n));

    },[searchResults]);

    async function onTermSubmit(term) {
        setSearchStr(term);
    }

    async function setRepsSubmit(term) {
        setSearchStr(term);
    }

    async function updateSetsRepsToState(exerciseId, setsReps){
        // For some reason regular object spread wasn't working here, need to revise and make more efficient
        ////console.log('updating setsReps as ', setsReps[0],'x',setsReps[1], ' for id: ', exerciseId);
        const newState = {...state};
        newState["exercises"][exerciseId].setsReps = setsReps;
        setState(newState);
    }

    async function updateTitleToState(columnId, title){
        // console.log('updating title as ', title, ' for column id: ',columnId);
        // console.log('current title', state["columns"][columnId]["title"]);

        // For some reason regular object spread wasn't working here, need to revise and make more efficient
        const newState = {...state};
        newState["columns"][columnId].title = title;
        setState(newState);
    }

    return (
        <div>
            <Container disableGutters={true} maxWidth>
                <Grid>
                    <Grid item xs={12}>
                        <SearchBar placeholder="Search by name" onFormSubmitToSB={onTermSubmit}/>
                        {/*<ExerciseList className="profile-list" searchStr={searchStr} tagSearchStr={searchStr} exercises={exercises}/>*/}
                        <SearchFilters/>

                    </Grid>
                    <Grid item xs={12}>
                        <Grid container columns={8}>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={1}>Monday</Grid>
                            <Grid item xs={1}>Tuesday</Grid>
                            <Grid item xs={1}>Wednesday</Grid>
                            <Grid item xs={1}>Thursday</Grid>
                            <Grid item xs={1}>Friday</Grid>
                            <Grid item xs={1}>Saturday</Grid>
                            <Grid item xs={1}>Sunday</Grid>
                        </Grid>
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
                                                const exercises = column.exerciseIds.map(exerciseId => state.exercises[exerciseId]);
                                                return <SearchColumn key={column.id} column={column} exercises={exercises} index={index} isDropDisabled={1} updateSetsRepsToState={updateSetsRepsToState}></SearchColumn>
                                            } else {
                                                const column = state.columns[columnId];
                                                const exercises = column.exerciseIds.map(exerciseId => state.exercises[exerciseId]);
                                                return <Column key={column.id} column={column} exercises={exercises} index={index} updateSetsRepsToState={updateSetsRepsToState} updateTitleToState={updateTitleToState}></Column>
                                            }
                                        })}
                                        {provided.placeholder}
                                    </MainContainer>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </Grid>
                    <Grid item xs={12}>
                        Data:
                        <AnalysisSection data={state}>

                        </AnalysisSection>

                    </Grid>
                </Grid>
            </Container>

            <Container>

            </Container>


        </div>
    );
}

export default App;