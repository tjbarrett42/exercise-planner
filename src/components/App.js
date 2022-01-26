import React, { useState, useEffect, useRef }from 'react';
import initialData from "../initial-data";
import PPL from '../PPL';
import cloneDeep from 'lodash/cloneDeep';
import exerciseDB from "../apis/exerciseDB";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import Column from './Column';
import SearchColumn from './SearchColumn';
import ExerciseResults from "./ExerciseResults";
import AnalysisSection from "./AnalysisSection";
import NavBar from "./NavBar";
import DaysOfWeekHeaders from "./DaysOfWeekHeaders";
import SearchSection from "./SearchSection";
import PresetsSection from "./PresetsSection";

import Accordion from '@mui/material/Accordion';
import Container from "@mui/material/Container";
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import './App.css';


const MainContainer = styled.div`
    display: flex;  
`

const App = () => {
    const [state, setState] = useState(initialData);
    const [ searchResults, setSearchResults ] = useState([]);
    const [ exercises, setExercises] = useState([]);
    const [ searchStr, setSearchStr ] = useState('');
    const [ targetList, setTargetList ] = useState([]);
    const [ equipmentList, setEquipmentList ] = useState([]);
    const firstUpdate = useRef(true);

    // useEffect(()=> {
    //     console.log('state updated: ', state);
    // },[state]);

    useEffect(() => {
        /* Get students object from API. Called once during load */
        async function getExercises() {
            try {
                const response = await exerciseDB.get(``);
                /* Declare 'tags' property for each student */
                setExercises(response.data);
                console.log(response.data);
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
    };

    useEffect(()=> {
        // Prevent first update loading
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        // Set search results to filtered exercises based off of search string
        setSearchResults(ExerciseResults(exercises,searchStr,targetList,equipmentList));
    }, [searchStr, targetList]);

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

            if (exercise.used === false) {
                idsToDelete.push(exercise.id);

                delete newState["exercises"][indExercises];
            }
        }
        // RIGHT how could I be so silly... I need to also remove the ids from column-0
        let newStateIds = newState["columns"]["column-0"]["exerciseIds"]

        setState(newState);

        for (let i = 0; i < searchResults.length; i++ ){
            const id = searchResults[i][0];
            const dbId = searchResults[i][1]
            const name = searchResults[i][2];
            const target = searchResults[i][3];
            const bodyPart = searchResults[i][4];
            const equipment = searchResults[i][5];
            const setsReps = [0,0];

            newState["exercises"][id] = {id: id, dbId: dbId, name: name, target: target, bodyPart: bodyPart, equipment: equipment, setsReps: setsReps, used: false};
            newState["columns"]["column-0"].exerciseIds.push(id);
            setState(newState);
        }
        newState["columns"]["column-0"]["exerciseIds"] = newStateIds.filter(n => !idsToDelete.includes(n));

    },[searchResults]);

    async function onTermSubmit(term) {
        setSearchStr(term);
    }

    async function onTargetSubmit(targets) {
        setTargetList(targets);
    }

    async function onEquipmentSubmit(equipment){
        setEquipmentList(equipment);
    }

    async function onLoadState(){
        const newState = cloneDeep({...PPL});
        setState(newState);
    }

    async function updateSetsRepsToState(exerciseId, setsReps){
        // For some reason regular object spread wasn't working here, need to revise and make more efficient
        const newState = {...state};
        newState["exercises"][exerciseId].setsReps = setsReps;
        setState(newState);
    }

    async function updateTitleToState(columnId, title){
        // For some reason regular object spread wasn't working here, need to revise and make more efficient
        const newState = {...state};
        newState["columns"][columnId].title = title;
        setState(newState);
    }

    async function deleteDraggable(exerciseId){
        const newState = cloneDeep(state);

        // iterate over newState columns and delete
        function deleteIdFromColumn(){
            for (let column in newState["columns"]){
                //console.log('looking at column ', column, ' which contains: ', newState["columns"][column]["exerciseIds"]);
                if (newState["columns"][column]["exerciseIds"].includes(exerciseId)){
                    const index = newState["columns"][column]["exerciseIds"].indexOf(exerciseId);
                    //console.log('deleting: ', newState["exercises"][exerciseId], ' from exercises');
                    //console.log('deleting: ', newState["columns"][column]["exerciseIds"][index], ' from column exerciseIds');
                    delete newState["exercises"][exerciseId]
                    newState["columns"][column]["exerciseIds"].splice(index,1);
                    return;
                }
            }
        }
        deleteIdFromColumn();
        setState(newState);
    }

    async function showInfoDialog(exercise){
        console.log(exercise);
    }

    return (
        <div>
            <Container disableGutters={true} maxWidth="false">
                <NavBar></NavBar>
                {/*<MobileDialog />*/}
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography variant="h5">Exercise Search</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <SearchSection onTermSubmit={onTermSubmit} onTargetSubmit={onTargetSubmit} onEquipmentSubmit={onEquipmentSubmit}></SearchSection>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography variant="h5">Planner</Typography>
                    </AccordionSummary>
                    <AccordionDetails>

                            <PresetsSection loadState={onLoadState}/>
                        <div className="outer-dd-context-and-headers">
                            <div className="dd-context-and-headers">
                                <DaysOfWeekHeaders></DaysOfWeekHeaders>
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
                                                        return <Column key={column.id} column={column} exercises={exercises} index={index} updateSetsRepsToState={updateSetsRepsToState} updateTitleToState={updateTitleToState} deleteDraggable={deleteDraggable} showInfoDialog={showInfoDialog}></Column>
                                                    }
                                                })}
                                                {provided.placeholder}
                                            </MainContainer>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                            </div>
                        </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography variant="h5">Set Visualizer</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <AnalysisSection data={state}/>
                    </AccordionDetails>
                </Accordion>
            </Container>
        </div>
    );
}

export default App;