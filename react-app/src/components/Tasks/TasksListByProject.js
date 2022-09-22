import { getTasksByProjectId } from "../../store/tasks";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getTasksByWorkspace } from "../../store/tasks";
import { Modal } from '../../context/Modal';


import { useHistory } from "react-router-dom";
import TaskForm from "./TaskForm";
// import TaskDetail from "./TaskDetail";
// REVISIT CSS
import './TaskStyle/TaskDetail.css'
import './TaskList.css'
import './TaskStyle/TaskTable.css'
import TaskDetail from "./TaskDetail";

const TasksListByProject = ({ projectId }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const tasks = useSelector((state) => state.tasks)
    const tasksArr = Object.values(tasks)
    // console.log(tasks)

    const [showTaskDetail, setShowTaskDetail] = useState(false)
    const [onClickTaskId, setOnClickTaskId] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [showSideBar, setShowSideBar] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [showModal, setShowModal] = useState(false)
    // console.log('**********projects from component****', projects)
    // console.log('**********tasks from component****', tasks)

    useEffect(() => {
        dispatch(getTasksByProjectId(projectId)).then(() => setIsLoaded(true))
    }, [dispatch, showTaskDetail])

    if (!tasksArr.length) return null
    return isLoaded ? (
        <>
            <div style={{ display: 'flex' }}>
                <div style={{ display: 'flex' }}>
                    <div>
                        <div className='add-task-button'
                            style={{ width: 'fit-content', border: 'solid 1px grey', borderRadius: '4px', fontSize: '20px', marginLeft: '15px', marginTop: '8px' }}
                            onClick={() => {
                                setShowTaskDetail(true)
                                setOnClickTaskId(null)
                            }}>
                            <i className="fa-solid fa-plus"></i> Add Task
                        </div>
                        <table className={showTaskDetail ? "table-onclick" : "table"}>
                            <tbody>
                                <tr className="table-row">
                                    <th className="table-head">Task Name</th>
                                    <th className="table-head">Due Date</th>
                                </tr>
                                {tasksArr.map((task) => (

                                    <tr key={task.id} className="table-row">
                                        <td className="table-cell" id='task-name'
                                            onClick={() => (
                                                setShowTaskDetail(!showTaskDetail),
                                                setOnClickTaskId(task.id),
                                                setShowSideBar(!showSideBar)
                                            )}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <div>

                                                <i className="fa fa-check-circle-o" aria-hidden="true" style={{ color: tasks[task.id].complete ? 'green' : 'white', borderRadius: '10px' }}></i>  {task.name}</div>
                                            {/* <div id='button' >details</div> */}
                                        </td>
                                        <td className="table-cell">{task.dueDate.split(' ')[2]} {task.dueDate.split(' ')[1]}</td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table >
                    </div>
                </div>
                <div>
                    {showTaskDetail ? <TaskForm plainForm={true} taskId={onClickTaskId} setShowTaskDetail={setShowTaskDetail} /> : null}
                </div>
                {/* <div>
                    {showTaskDetail ? <TaskDetail taskId={onClickTaskId} setShowTaskDetail={setShowTaskDetail} /> : null}
                </div> */}
            </div >
            {/* {showForm && (
                <Modal onClose={() => setShowModal(false)}>
                    <TaskForm setShowModal={setShowModal} />
                </Modal>
            )} */}
        </>
    ) : null
}

export default TasksListByProject
