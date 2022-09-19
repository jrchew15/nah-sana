export const LOAD_TASKS = 'tasks/LOAD_TASKS';
export const UPDATE_TASK = 'tasks/UPDATE_TASK';
export const ADD_TASK = 'tasks/ADD_TASK';
export const REMOVE_TASK = 'tasks/REMOVE_TASK';

const loadAll = tasks => ({
    type: LOAD_TASKS,
    tasks
});

// const loadByProject = (tasks, projectId) => ({
//     type: LOAD_TASKS,
//     tasks,
//     projectId
// });

// const loadOneTask = (task) => ({
//     type: LOAD_TASKS,
//     task
// });

const add = (task) => ({
    type: ADD_TASK,
    task
});

const update = (task) => ({
    type: UPDATE_TASK,
    task
});

const remove = (taskId, projectId) => ({
    type: REMOVE_TASK,
    taskId,
    projectId
});

export const getTasks = () => async dispatch => {
    const response = await fetch(`/api/tasks`);
    if (response.ok) {
        const tasks = await response.json()
        console.log('*******tasks from thunk******', tasks)
        dispatch(loadAll(tasks))
        return tasks
    }
};

// export const getTasksById = (taskId) => async (dispatch) => {
//     const response = await fetch(`/api/tasks/${taskId}`);
//     if (response.ok) {
//         const task = await response.json()
//         dispatch(loadOneTask(task))
//         return task
//     }
// };

// export const getTasksByProjectId = (projectId) => async (dispatch) => {
//     const response = await fetch(`/api/projects/${projectId}/tasks`);
//     if (response.ok) {
//         const tasks = await response.json()
//         dispatch(loadByProject(tasks, projectId))
//         return tasks
//     }
// };

export const createOneTask = data => async dispatch => {
    const response = await fetch(`/api/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    if (response.ok) {
        const task = await response.json()
        dispatch(add(task))
        return task
    }
};

export const updateOneTask = data => async dispatch => {
    const response = await fetch(`/api/tasks/${data.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    if (response.ok) {
        const task = await response.json()
        dispatch(update(task))
        return task
    }
};

export const deleteOneTask = taskId => async dispatch => {
    const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    if (response.ok) {
        const task = await response.json()
        dispatch(remove(task))
    }
};

const initialState = {};
const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_TASKS:
            let allTasks = {}
            console.log('*********tasks from reducer******', action.tasks)
            allTasks = { ...action.tasks }
            return allTasks
        default:
            return state;
    }
};

export default tasksReducer;
