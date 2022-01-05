import React, { useEffect } from 'react';
import Exercise from "./Exercise";


function ExerciseResults(exercises,searchStr) {
    const mappedList = exercises.filter(exercise =>
        (exercise.name.toLowerCase().includes(searchStr.toLowerCase()))).slice(0,10).map((exercise, index) => {

        //return <Profile key={profile.id} profile={profile} sendTagToProfileList={updateTags}/>;

        return [(Date.now()+index).toString(), exercise.name];
    });

    /* Display list of profiles that satisfy search arguments */
    return mappedList;
}

export default ExerciseResults;