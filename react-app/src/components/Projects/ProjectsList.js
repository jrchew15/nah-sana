import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects } from '../../store/projects';
import CreateProjectModal from './CreateProjectModal';

function GetProjects({ workspaceId }) {
  const dispatch = useDispatch();
  const allProjects = useSelector(state => state.projects)

  let projectArr;
  let filtered;
  useEffect(() => {
    dispatch(getAllProjects())
  }, [dispatch, filtered])
  if (allProjects) {
    projectArr = Object.values(allProjects)
    filtered = projectArr.filter(project => project?.workspaceId === Number(workspaceId))
  } else {
    return null
  }

  return (
    <div className='project-container'>
      <h3 className='title-projects'>Projects</h3>
      {filtered.length > 0 ? (
        <>

          <div className='project-wrapper'>
            <CreateProjectModal />
            {filtered.map(project => {
              return (
                <NavLink className='project-links' to={`/workspaces/${workspaceId}/projects/${project.id}`} >
                  <img src={project.icon} alt="icon" style={{ height: '3.2em', weight: '25px' }} />
                  <div className='project-titles'>
                    {project.name}
                  </div>
                </NavLink>
              )
            })}
          </div>
        </>
      ) : (
        <>
          <div className='project-wrapper' >
            <CreateProjectModal />
          </div>

        </>
      )}
    </div>
  )
}
export default GetProjects
