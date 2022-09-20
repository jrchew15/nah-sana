import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getTaskById } from "../../store/tasks";
import { useParams, useHistory } from 'react-router-dom';
import { deleteOneTask } from '../../store/tasks';
import TaskForm from './TaskForm';

const TaskDetail = ({ taskId }) => {
    // const { taskId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const tasks = useSelector((state) => state.tasks)
    const task = tasks[taskId]

    const [showSideBar, setShowSideBar] = useState(true)
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        dispatch(getTaskById(taskId))
    }, [dispatch])

    if (!task) { return null }
    return (
        <>
            {showSideBar && (
                <div id='side-bar' className='side-bar'>
                    <a href="javascript:void(0)" class="closebtn" onClick={() => { setShowSideBar(!showSideBar) }}>&times;</a>
                    <div>{task.name}</div>
                    <div>Due date  {task.dueDate.split(' ')[2]}{task.dueDate.split(' ')[1]}</div>
                    <div>Projects  {task.projectId}</div>
                    <div>Description  {task.description}</div>
                    <div>{task.complete.toString()}</div>
                    <button onClick={() => {
                        setShowForm(true)
                        // history.push(`/tasks/${task.id}/edit`)
                    }}>Edit</button>
                    <button onClick={async () => {
                        await dispatch(deleteOneTask(taskId))
                        history.push('/tasks')
                    }}>Delete</button>
                    {showForm ? <TaskForm /> : null}
                </div>
            )}
        </>
    )
}

export default TaskDetail
