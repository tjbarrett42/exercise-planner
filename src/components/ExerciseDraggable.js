import React, {useState} from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import Typography from "@mui/material/Typography";
import ExerciseSetsRepsEntry from "./ExerciseSetsRepsEntry";
import Grid from '@mui/material/Grid';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ClearIcon from '@mui/icons-material/Clear';
import './ExerciseDraggable.css';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import IconButton from "@mui/material/IconButton";
import InfoDialog from './InfoDialog';
import AboutDialog from "./AboutDialog";

const CustomCard = styled(Card)`
    border: 1px solid grey;
    padding: 0px;
    margin: 0px;
    
    background-color: ${props =>
             props.isDragging
                ? 'lightgreen'
                 : 'white'};
`;

const CustomCardContent = styled(CardContent)`
    padding: 5px;
    &:last-child {
        padding-bottom: 5px;
    }
`
const ExerciseDraggable = (props) => {
    const [ openInfo, setOpenInfo ] = useState(false);
    const handleClickOpenInfo = () => {
        setOpenInfo(true);
    };
    const handleCloseInfo = (value) => {
        setOpenInfo(false);
    };


    async function updateSetsRepsToInnerList(exerciseId, setsReps){
        props.updateSetsRepsToColumn(exerciseId, setsReps);
    }

    async function deleteDraggable(){
        props.deleteDraggable(props.exercise.id);
    }

    async function showInfoDialog(){
        props.showInfoDialog(props.exercise);
    }

    // const isDragDisabled = props.task.id === 'task-1';
    // Logic for if draggable becomes 'used', where we then want to present sets/reps options
    if (props.exercise.used === true){
        return (
            <Draggable  draggableId={props.exercise.id} index={props.index}>
                {(provided, snapshot) => (
                    <CustomCard
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                        // isDragDisabled={isDragDisabled}
                    >
                        <CustomCardContent>
                            <Grid container direction="row">
                                <Grid item xs={2} className="handle-grid">
                                    <IconButton {...provided.dragHandleProps} >
                                        <DragIndicatorIcon></DragIndicatorIcon>
                                    </IconButton>
                                    <IconButton onClick={handleClickOpenInfo}>
                                        <InfoOutlinedIcon></InfoOutlinedIcon>
                                    </IconButton>
                                    <InfoDialog open={openInfo} onClose={handleCloseInfo} exercise={props.exercise}/>
                                    <IconButton onClick={deleteDraggable}>
                                        <ClearIcon></ClearIcon>
                                    </IconButton>
                                </Grid>
                                <Grid container item xs={10}>
                                    <Grid item xs={12}>
                                        <Typography variant="body1">
                                            {props.exercise.name}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle2">
                                            {props.exercise.target}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="subtitle2">
                                            Sets/Reps:
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <ExerciseSetsRepsEntry exerciseId = {props.exercise.id} onFormSubmitToSRE={updateSetsRepsToInnerList} setsReps={props.exercise.setsReps}/>
                                    </Grid>
                                </Grid>

                            </Grid>
                        </CustomCardContent>
                    </CustomCard>
                )}
            </Draggable>
        );
    } else {
        return (
            <Draggable  draggableId={props.exercise.id} index={props.index}>
                {(provided, snapshot) => (
                    <CustomCard
                        {...provided.draggableProps}

                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                        // isDragDisabled={isDragDisabled}
                    >
                        <CustomCardContent>
                            <Grid container>
                                <Grid item xs={1}>
                                    <div {...provided.dragHandleProps}>
                                        <DragIndicatorIcon  ></DragIndicatorIcon>
                                    </div>
                                </Grid>
                                <Grid item xs={11}>
                                    <Typography variant="body1">
                                        {props.exercise.name}
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        {props.exercise.target}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CustomCardContent>
                    </CustomCard>
                )}
            </Draggable>
        );
    }
}

export default ExerciseDraggable;