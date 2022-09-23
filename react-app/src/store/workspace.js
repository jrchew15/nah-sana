//constants

const LOAD_WORKSPACE = 'workspace/LOAD_WORKSPACE'
const CREATE_WORKSPACE = 'workspace/CREATE_WORKSPACE'
const UPDATE_WORKSPACE = 'workspace/UPDATE_WORKSPACE'
const GET_ONE_WORKSPACE = 'workspace/GET_ONE_WORKSPACE'

const ADD_USER = 'workspace/ADD_USER'
const REMOVE_USER = 'workspace/REMOVE_USER'

const loadWorkspace = (workspace) => ({
    type: LOAD_WORKSPACE,
    workspace
})
const getOneWorkspace = (workspace) => ({
    type: GET_ONE_WORKSPACE,
    workspace
})

const createWorkspace = (workspace) => ({
    type: CREATE_WORKSPACE,
    workspace
})
const updateWorkspace = (workspace) => ({
    type: UPDATE_WORKSPACE,
    workspace
})

const addUser = (user) => ({
    type: ADD_USER,
    user
})
const removeUser = (userId) => ({
    type: REMOVE_USER,
    userId
})
// Get All Workspace
export const workspaceGet = () => async (dispatch) => {
    const response = await fetch(`/api/workspaces`)
    if (response.ok) {
        const workspace = await response.json()
        dispatch(loadWorkspace(workspace))
    }
}
//Get All workspace details
export const oneWorkspace = (id) => async (dispatch) => {
    const response = await fetch(`/api/workspaces/${id}`)
    if (response.ok) {
        const workspace = await response.json()
        dispatch(getOneWorkspace(workspace))
        return workspace
    }
}
//Create Workspace
export const workspaceCreate = (workspace) => async (dispatch) => {
    const response = await fetch('/api/workspaces', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workspace)
    })
    if (response.ok) {
        const wks = await response.json();
        dispatch(createWorkspace(wks))
        return wks
    }
    return response
}
//Update Workspace
export const workspaceUpdate = (workspace, id) => async (dispatch) => {
    const response = await fetch(`/api/workspaces/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workspace)
    })
    if (response.ok) {
        const wks = await response.json();
        dispatch(updateWorkspace(wks));
        return wks
    }
    return response
}
//add user
export const addUserToWorkspace = (user, id) => async (dispatch) => {
    const response = await fetch(`/api/workspaces/${id}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    })
    if (response.ok) {
        const user = await response.json();
        dispatch(addUser(user));
        return null
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']

    }
}
export const removeUserFromWorkspace = (id, userid) => async (dispatch) => {
    const response = await fetch(`/api/workspaces/${id}/users/${userid}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        const res = await response.json()
        dispatch(removeUser(userid))
    }
    return response
}
const initialState = {};
export default function workspaceReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case LOAD_WORKSPACE:
            const allWorkspaces = {}
            action.workspace.workspaces.forEach(ws => {
                allWorkspaces[ws.id] = ws
            });
            return {
                ...allWorkspaces
            }
        case GET_ONE_WORKSPACE:
            newState = { ...state }
            newState = { ...newState[action.workspace.id], ...action.workspace }
            return newState
        case CREATE_WORKSPACE:
            newState = { ...state }
            let newWorkspace = { ...newState['workspace'] }
            newWorkspace[action.workspace.id] = action.workspace
            newState['workspaces'] = newWorkspace
            return newState
        // newState = { ...state }
        // newState[action.workspace.id] = action.workspace

        case UPDATE_WORKSPACE:
            newState = { ...state }
            newState['workspace'] = { ...action.workspace }
            return newState

        case ADD_USER:
            newState = { ...state }
            let newUsers = { ...newState['users'] }
            newUsers[action.user.id] = action.user
            newState['users'] = newUsers
            // newState['users'].push(action.user)
            return newState
        case REMOVE_USER:
            newState = { ...state }
            let oldUsers = { ...newState['users'] }
            delete oldUsers[action.userId]
            newState['users'] = oldUsers
            return newState
        default:
            return state;

    }
}
