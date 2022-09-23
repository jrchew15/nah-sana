// Constants
const GET_PROJECTS = 'projects/GET_PROJECTS'
const GET_A_PROJECT = 'projects/GET_A_PROJECT'
const CREATE_PROJECT = 'projects/CREATE_PROJECT'
const UPDATE_PROJECT = 'projects/UPDATE_PROJECT'
const DELETE_PROJECT = 'projects/DELETE_PROJECT'


const getProjects = (projects) => {
  return {
    type: GET_PROJECTS,
    projects
  }
}
const getProject = (project) => {
  return {
    type: GET_A_PROJECT,
    project
  }
}
const createProject = (project) => {
  return {
    type: CREATE_PROJECT,
    project
  }
}
const updateProject = (project) => {
  return {
    type: UPDATE_PROJECT,
    project
  }
}

const deleteProject = (projectId) => {
  return {
    type: DELETE_PROJECT,
    projectId
  }
}

export const getAllProjects = () => async (dispatch) => {
  const response = await fetch('/api/projects')
  if (response.ok) {
    const projects = await response.json()
    dispatch(getProjects(projects))
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const getAProject = (id) => async (dispatch) => {
  const response = await fetch(`/api/projects/${id}`)
  if (response.ok) {
    const project = await response.json()
    dispatch(getProject(project))
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const createAProject = (payload) => async (dispatch) => {
  const response = await fetch(`/api/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  });
  if (response.ok) {
    const project = await response.json()
    dispatch(createProject(project))
    return project
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const updateAProject = (payload) => async (dispatch) => {
  const response = await fetch(`/api/projects/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  });
  if (response.ok) {
    const project = await response.json()
    dispatch(updateProject(project))
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const deleteAProject = (projectId) => async (dispatch) => {
  const response = await fetch(`/api/projects/${projectId}`, {
    method: 'DELETE'
  });
  if (response.ok) {
    dispatch(deleteProject(projectId))
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

const initialState = { project: null }

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROJECTS:
      const allProjects = {}
      action.projects.projects.forEach(project => {
        allProjects[project.id] = project
      })
      return { ...allProjects }
    case GET_A_PROJECT:
      let oneProject = { ...state }
      oneProject[action.project.id] = action.project
      return oneProject
    case CREATE_PROJECT:
      return { ...state, [action.project.id]: action.project }
    case UPDATE_PROJECT:
      return { ...state, [action.project.id]: action.project }
    case DELETE_PROJECT:
      const deleteState = { ...state }
      delete deleteState[action.id]
      return deleteState
    default:
      return state;
  }
}

export default projectReducer
