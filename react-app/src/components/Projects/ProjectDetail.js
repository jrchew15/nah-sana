import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { deleteAProject, getAllProjects, getAProject } from '../../store/projects';
import EditProjectModal from './EditProjectModal';
import ProjectDetailList from './ProjectDetailList'
import './Projects.css'
function ProjectDetail({ workspaceId }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const { id } = useParams()
  const projectObj = useSelector(state => state.projects)
  const project = projectObj[id]
  const [seeOverview, setOverview] = useState(true)
  const [seeList, setList] = useState(false)

  useEffect(() => {
    dispatch(getAProject(id))
  }, [dispatch, id])

  if (!project) return null

  const handleDeleteClick = async (e) => {
    await dispatch(deleteAProject(id))
    await dispatch(getAllProjects())
    await history.push(`/workspaces/${workspaceId}/projects`)
  }

  let dueDate;
  project.dueDate ? dueDate = new Date(project.dueDate).toString().slice(0, 16) : dueDate = null

  let overview = (
    <div className='projectDetail'>
      <div className='projectDetailLeft'>
        {
          project ? (
            <>
              <div>
                {project.description}
              </div>
              <div>
                {dueDate}
              </div>
            </>
          ) : (
            <>
              <p>Loading...</p>
            </>
          )
        }
      </div>
      <div className='projectDetailRight'>
        <EditProjectModal project={project} />
        <button onClick={handleDeleteClick} className='projectButton'>Delete Project</button>
        {project.status}
      </div>
    </div>
  )

  function projectDetailView() {
    if (seeOverview === true) {
      return overview
    } else {
      return (<ProjectDetailList />)
    }
  }


  return (
    <div className='innerContent'>
      <div className='projectNavBar'>
        <div className='projectNavBarIcon'>
          <div className='projectIconContainer'>
            <img src={project.icon} alt="project icon" className='projectIcon' />
          </div>

        </div>
        <div className='projectNavBarInfo'>
          <div>
            {project.name}
            {project.status}
          </div>
          <div className='projectNavBarLinkContainer'>
            <button
              onClick={(e) => {setOverview(true) && setList(false)}}
              className={seeOverview ? "projectNavBarLinksActive" : "projectNavBarLinks"}
            >
              Overview
            </button>
            <button
              onClick={(e) => {setOverview(false) && setList(true)}}
              className={seeList ? "projectNavBarLinksActive" : "projectNavBarLinks"}
            >
              List
            </button>
            {/* 
            <a href={`/workspaces/${workspaceId}/projects/${id}`} className="projectNavBarLinks">Overview</a>
            <a href={`/workspaces/${workspaceId}/projects/${id}/list`} className="projectNavBarLinks">List</a> */}
          </div>
        </div>

      </div>
      {projectDetailView()}

    </div>
  )
}
export default ProjectDetail