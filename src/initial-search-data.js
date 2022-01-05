const initialSearchData = {
    tasks: {
        'task-1': { id: 'task-1', content: 'Pushups 3x8-12'},
        'task-2': { id: 'task-2', content: 'Deadlifts 1x5'},
        'task-3': { id: 'task-3', content: 'Curls 3x6-8'},
        'task-4': { id: 'task-4', content: 'Crunches 3x15-20'},
        'task-5': { id: 'task-5', content: 'Squats 5x5-6'},
        'task-6': { id: 'task-6', content: 'Jumping jacks 4x25'},
        'task-7': { id: 'task-7', content: 'Landmine presses 6x9'},
        'task-8': { id: 'task-8', content: 'Tricep pushdowns 4x20'},
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'Monday',
            taskIds: ['task-1', 'task-2', 'task-3', 'task-4', 'task-5','task-6','task-7'],
        },
        'column-2': {
            id: 'column-2',
            title: 'Tuesday',
            taskIds: [],
        },
        'column-3': {
            id: 'column-3',
            title: 'Wednesday',
            taskIds: [],
        },
    },
    columnOrder: ['column-1', 'column-2', 'column-3'],
};

export default initialSearchData;