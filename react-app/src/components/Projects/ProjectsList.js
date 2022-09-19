import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects } from '../../store/projects';

function GetProjects() {
  const dispatch = useDispatch();
    
  useEffect(() => {
    dispatch(getAllProjects())
  }, [dispatch])
  
  const allProjects = useSelector(state => state.projects)

  let projectArr;
  if (allProjects) {
    projectArr = Object.values(allProjects)
  } else {
    return null
  }

  return (
    <div >
      {projectArr[0] ? (
        <>
          <h3>Projects</h3>
          {projectArr.map(project => {
            return (
              <div key={project.id} >
                <NavLink to={`/projects/${project.id}`} >
                  {project.name}
                </NavLink>
              </div>
            )
          })}
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