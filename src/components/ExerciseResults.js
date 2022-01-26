import React from 'react';


function ExerciseResults(exercises,searchStr,targetList,equipmentList) {
    const mappedList = exercises.filter(exercise =>
        (exercise.name.toLowerCase().includes(searchStr.toLowerCase()) && targetList.includes(exercise.target) && equipmentList.includes(exercise.equipment))).slice(0,10).map((exercise, index) => {

        //return <Profile key={profile.id} profile={profile} sendTagToProfileList={updateTags}/>;
        // console.log('exercise: ', exercise);
        return [(Date.now()+index).toString(), exercise.id, exercise.name, exercise.target, exercise.bodyPart, exercise.equipment];
    });

    /* Display list of profiles that satisfy search arguments */
    return mappedList;
}

export default ExerciseResults;