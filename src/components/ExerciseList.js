import React from 'react';
// import Profile from './Profile';
import Exercise from './Exercise';

const ExerciseList = ( props ) => {

    /* Map out profiles object and return a Profile component if arguments are satisfied for name and tag search */
    const mappedList = props.exercises.filter(exercise =>
        (exercise.name.toLowerCase().includes(props.searchStr.toLowerCase()))).slice(0,2).map((exercise, index) => {

        //return <Profile key={profile.id} profile={profile} sendTagToProfileList={updateTags}/>;
        return <Exercise key={index} name={exercise.name} target={exercise.target}/>
        });

    /* Display list of profiles that satisfy search arguments */
    return <div>{mappedList}</div>;
};

export default ExerciseList;