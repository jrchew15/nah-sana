import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getTaskById } from "../../store/tasks";
import { useHistory } from 'react-router-dom';
import { deleteOneTask } from '../../store/tasks';
import TaskForm from './TaskForm';
import { Modal } from '../../context/Modal';
import './TaskStyle/TaskDetail.css';

const TaskDetail = ({ taskId, setShowTaskDetail: setTaskDetail }) => {
    // const { taskId } = useParams()
    const dispatch = useDispatch()
    const tasks = useSelector((state) => state.tasks)
    const workspaceUsers = useSelector((state) => state.workspace.users)
    const project = useSelector((state) => state.projects)
    const task = tasks[taskId]

    const [showForm, setShowForm] = useState(false)
    const [taskComplete, setTaskComplete] = useState(false)
    const [showTaskDetail, setShowTaskDetail] = useState(true)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        dispatch(getTaskById(taskId))
    }, [dispatch])

    if (!task) { return null }
    return (
        <>
            {showTaskDetail && (
                <div className='task-detail-container'>
                    <a href="javascript:void(0)" className="closebtn" onClick={() => { setTaskDetail(false) }}>&times;</a>
                    <div id='task-complete' className='task-complete'
                        style={{ backgroundColor: taskComplete.toString() === 'false' ? 'gray' : 'olive' }}
                        onClick={() => (
                            setTaskComplete(!taskComplete)
                            // handleSubmit()
                        )}>
                        <i class="fa fa-check-circle-o" aria-hidden="true"></i>
                        {taskComplete.toString() === 'false' ? "Mark Complete" : "Completed"}
                    </div>
                    <div className='task-name'>{task.name}</div>
                    <table>
                        <tr className='task-detail'>
                            <th>Assignee</th>
                            <td>{workspaceUsers[task.userId].firstName}{workspaceUsers[task.userId].lastName}</td>
                        </tr>
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
                    <div style={{ display: 'flex' }}>
                        <button className='button'
                            onClick={() => {
                                setShowForm(true)
                                setShowTaskDetail(false)
                                setShowModal(true)
                            }}>Edit</button>
                        <button className='button'
                            onClick={async () => {
                                await dispatch(deleteOneTask(taskId))
                                // history.push('/tasks')
                            }}>Delete</button>
                    </div >
                </div>
            )
            }
            {showForm && showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <TaskForm taskId={taskId} setShowModal={setShowModal} setTaskDetail={setTaskDetail} userId={workspaceUsers[task.userId].id} projectId={Object.keys(project)[0]} />
                </Modal>
            )}
        </>
    )
}

export default TaskDetail
