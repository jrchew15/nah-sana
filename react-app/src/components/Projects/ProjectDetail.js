import { useParams, useHistory, NavLink, Route, Switch } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { deleteAProject, getAllProjects, getAProject } from '../../store/projects';
import EditProjectModal from './EditProjectModal';
import TasksListByProject from '../Tasks/TasksListByProject';
import './Projects.css'

function ProjectDetail({ workspaceId }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const { id } = useParams()
  const redirectCheck = useSelector(state => state.workspace.projects)
  const projectObj = useSelector(state => state.projects)
  const project = projectObj[id]
  const [projectLoaded, setProjectLoaded] = useState(false)

  useEffect(() => {
    dispatch(getAProject(id))
  }, [dispatch, id])
  
  useEffect(() => {
    if (project) {
      setProjectLoaded(true)
    }
  }, [project])
  
  function redirect() {
    setTimeout(() => { history.push(`/workspaces/${workspaceId}`) }, 1000)
  }

  let exists = false;
  redirectCheck.forEach(project => {
    if (Number(project.id) === Number(id)){
      exists = true;
    }
  })
  if (!exists){
    return (
      <div>
        <h1 className='projectDoesNotExist'>Project does not exist...redirecting</h1>
        {redirect()}
      </div>
    )
  }


  if (!project) return null

  const handleDeleteClick = async (e) => {
    await dispatch(deleteAProject(id))
    await dispatch(getAllProjects())
    await history.push(`/workspaces/${workspaceId}`)
  }

  let dueDate;
  project?.dueDate ? dueDate = project.dueDate.toString().slice(0, 16) : dueDate = null

  function widgetColor() {
    if (project?.status === "At Risk") {
      return "statusWidgetColorRisk"
    } else if (project?.status === "Off Track") {
      return "statusWidgetColorOffTrack"
    } else if (project?.status === "On Hold") {
      return "statusWidgetColorHold"
    } else {
      return "statusWidgetColor"
    }
  }

  function widgetColorFont() {
    if (project?.status === "At Risk") {
      return "statusWidgetColorRiskFont"
    } else if (project?.status === "Off Track") {
      return "statusWidgetColorOffTrackFont"
    } else if (project?.status === "On Hold") {
      return "statusWidgetColorHoldFont"
    } else {
      return "statusWidgetColorFont"
    }
  }

  function circleType() {
    if (project?.status === "At Risk") {
      return "projectNavStatusCircleRisk"
    } else if (project?.status === "Off Track") {
      return "projectNavStatusCircleOffTrack"
    } else if (project?.status === "On Hold") {
      return "projectNavStatusCircleHold"
    } else {
      return "projectNavStatusCircle"
    }
  }

  let overview = (
    <div className='projectDetail'>
      <div className='projectDetailLeft'>
        {
          project ? (
            <div className='projectDescriptionContainer'>
              <h3 className="projectHeader">Project Description</h3>
              <div className="projectDescriptionTextContainer">
                <p className='profileInfoText'>
                  {project?.description ? project?.description : "No Description Provided"}
                </p>
              </div>
            </div>
          ) : (
            <>
              <p>Loading...</p>
            </>
          )
        }
      </div>
      <div className='projectDetailRight'>
        <div className='statusWidgetContainer'>
          <div className={widgetColor()}></div>
          <div className={widgetColorFont()}>
            {project.status}
          </div>
          <div className='statusWidgetDue'>
            Due On: {dueDate}
          </div>
        </div>
        <div className='projectDetailRightButtons'>
          <EditProjectModal project={project} />
          <button onClick={handleDeleteClick} className='projectButton' id="deleteProject">Delete Project</button>
        </div>
      </div>
    </div>
  )

  let list = (
    <div className='projectDetailTaskOuterContainer'>
      <TasksListByProject projectId={id} />
    </div>
  )


  return projectLoaded && project ? (
    <div className='innerContent'>
      <div className='projectNavBar'>
        <div className='projectNavBarIcon'>
          <div className='projectIconContainer'>
            <img src={project.icon} alt="project icon" className='projectIcon' />
          </div>
        </div>
        <div className='projectNavBarInfo'>
          <div className='projectNavBarInfoTop'>
            <div className='projectNavBarInfoName'>
              {project.name}
            </div>
            <div className='projectNavStatus'>
              <div className={circleType()}></div>
              <div className='projectNavBarInfoStatus'>
                {project.status}
              </div>
            </div>
          </div>
          <nav className='projectNavTabsContainer'>
            <div className='projectNavTabs'>
              <NavLink to={`/workspaces/${workspaceId}/projects/${id}`} exact>Overview</NavLink>
            </div>
            <div className='projectNavTabsSpace'></div>
            <div className='projectNavTabs'>
              <NavLink to={`/workspaces/${workspaceId}/projects/${id}/list`}>List</NavLink>
            </div>
          </nav>
        </div>
      </div>
      <div className='projectDetailOuter'>
        <Switch>
          <Route exact path={`/workspaces/${workspaceId}/projects/${id}`}>
            {overview}
          </Route>
          <Route exact path={`/workspaces/${workspaceId}/projects/${id}/list`}>
            {list}
          </Route>
        </Switch>
      </div>

    </div>
  ) : (
    <h1>Loading...</h1>
  )
}
export default ProjectDetail
