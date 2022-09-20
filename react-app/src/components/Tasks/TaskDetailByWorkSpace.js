import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getTaskById, updateOneTask } from "../../store/tasks";
import { useParams, useHistory } from 'react-router-dom';
import { deleteOneTask } from '../../store/tasks';
import TaskForm from './TaskForm';
import './TaskStyle/TaskDetail.css'
import './TaskStyle/TaskModal.css'

const TaskDetailByWorkSpace = ({ taskId }) => {
    // const { taskId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const tasks = useSelector((state) => state.tasks)
    const task = tasks[taskId]

    const [showTaskDetail, setShowTaskDetail] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [taskComplete, setTaskComplete] = useState(false)


    useEffect(() => {
        dispatch(getTaskById(taskId))
    }, [dispatch])

    const handleSubmit = async (e) => {
        // e.preventDefault()
        const response = await fetch(`/api/tasks/${task.id}`)
        if (response.ok) {
            const data = await response.json()
            let taskData = {
                ...data,
                complete: taskComplete
            }
            // !!!!!!!!can not update the database yet!!!!!
            await dispatch(updateOneTask(taskData))
        }
    }

    if (!task) { return null }

    return (
        <>
            {showTaskDetail && (
                // !!!!!!!! Need Modal Radius !!!!!!
                <div className='task-modal'>
                    <div className='task-modal-content'>
                        <div className='task-complete'>
                            <div id='task-complete'
                                style={{ backgroundColor: taskComplete.toString() === 'false' ? 'white' : 'lime' }}
                                onClick={() => (
                                    setTaskComplete(!taskComplete),
                                    handleSubmit()
                                )}>
                                <i class="fa fa-check-circle-o" aria-hidden="true"></i>
                                {taskComplete.toString() === 'false' ? "Mark Complete" : "Completed"}
                            </div>
                        </div>
                        <hr></hr>
                        <div className='task-name'>{task.name}</div>
                        <table>
                            <tr className='task-detail'>
                                <th>Due Date</th>
                                <td>{task.dueDate.split(' ')[2]}{task.dueDate.split(' ')[1]}</td>
                            </tr>
                            <tr className='task-detail'>
                                <th>Projects</th>
                                <td>{task.projectId}</td>
                            </tr>
                            <tr className='task-detail'>
                                <th>Description</th>
                                <td> {task.description}</td>
                            </tr>
                        </table>
                        <button onClick={() => {
                            setShowForm(true)
                            setShowTaskDetail(!showTaskDetail)
                            // history.push(`/tasks/${task.id}/edit`)
                        }}>Edit</button>
                        <button onClick={async () => {
                            await dispatch(deleteOneTask(taskId))
                            history.push('/tasks')
                        }}>Delete</button>
                    </div>
                </div>
            )
            }
            {showForm ? <TaskForm taskId={task.id} /> : null}
        </>
    )
}

export default TaskDetailByWorkSpace
