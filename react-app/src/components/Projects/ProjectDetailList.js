import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAProject } from '../../store/projects';
import './Projects.css'
import TaskList from '../Tasks/TasksList';

function ProjectDetail({ workspaceId }) {
  const dispatch = useDispatch();
  const { id } = useParams()
  const projectObj = useSelector(state => state.projects)
  const project = projectObj[id]


  useEffect(() => {
    dispatch(getAProject(id))
  }, [dispatch, id])

  if (!project) return null

  return (
    <div className='innerContent'>
      <div className='projectDetail'>
        <TaskList />
      </div>

    </div>
  )
}
export default ProjectDetail