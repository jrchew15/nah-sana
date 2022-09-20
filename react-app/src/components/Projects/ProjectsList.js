import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects } from '../../store/projects';
import CreateProjectModal from './CreateProjectModal';

function GetProjects({ workspaceId }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProjects())
  }, [dispatch])

  const allProjects = useSelector(state => state.projects)

  let projectArr;
  let filtered;
  if (allProjects) {
    projectArr = Object.values(allProjects)
    filtered = projectArr.filter(project => project?.workspaceId === Number(workspaceId))
  } else {
    return null
  }

  return (
    <div >
      {filtered[0] ? (
        <>
          <h3>Projects</h3>
          {filtered.map(project => {
            return (
              <div>
                <div key={project.id} >
                  <NavLink to={`/workspaces/${workspaceId}/projects/${project.id}`} >
                    <img src={project.icon} alt="icon" style={{height: '25px', weight: '25px'}}/>
                    {project.name}
                    {project.workspaceId}
                  </NavLink>
                </div>
              </div>
            )
          })}
          <CreateProjectModal />
        </>
      ) : (
        <>
          Loading...
        </>
      )}
    </div>
  )
}
export default GetProjects