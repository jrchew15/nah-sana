import { useParams, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { deleteAProject, getAllProjects, getAProject } from '../../store/projects';
import EditProjectModal from './EditProjectModal';

function ProjectDetail() {
  const dispatch = useDispatch();
  const history = useHistory()
  const { id } = useParams()
  const projectObj = useSelector(state => state.projects)
  const project = projectObj[id]


  useEffect(() => {
    dispatch(getAProject(id))
  }, [dispatch, id])

  if (!project) return null

  const handleDeleteClick = async (e) => {
    await dispatch(deleteAProject(id))
    await dispatch(getAllProjects())
    await history.push('/projects')
  }

  return (
    <div >
      {
        project ? (
          <>
            <EditProjectModal project={project} />
            <button onClick={handleDeleteClick}>Delete Project</button>
            <div>
              {project.name}
            </div>
            <div>
              {project.description}
            </div>
            <div>
              {project.dueDate}
            </div>
            <div>
              {project.status}
            </div>
          </>
        ) : (
          <>
            <p>Loading...</p>
          </>
        )
      }
    </div>
  )
}
export default ProjectDetail