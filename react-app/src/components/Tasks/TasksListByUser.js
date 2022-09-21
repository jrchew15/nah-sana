import { getTasks } from "../../store/tasks";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getTasksByWorkspace } from "../../store/tasks";
import { Modal } from '../../context/Modal';

import { Route, useParams, useHistory } from "react-router-dom";
import TaskForm from "./TaskForm";
import TaskDetailByWorkSpace from "./TaskDetailByWorkSpace";
// REVISIT CSS
import './TaskStyle/TaskDetail.css'
import './TaskList.css'

const TasksListByUser = ({ projects }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const tasks = useSelector((state) => state.tasks)
    const tasksArr = Object.values(tasks)

    const [showModal, setShowModal] = useState(false)
    const [showTaskDetail, setShowTaskDetail] = useState(false)
    const [onClickTaskId, setOnClickTaskId] = useState(null)
    // console.log('**********projects from component****', projects)
    // console.log('**********tasks from component****', tasks)

    useEffect(() => {
        dispatch(getTasks())
    }, [dispatch])

    if (!tasksArr.length) return null
    return (
        <>
            {/* REVISIT */}
            <div className="task-container-list scroller">
                {tasksArr.map((task) => (
                    <>
                        <div className="task-flex">
                            <button className="task-button">
                                <i class="fa fa-check-circle-o" aria-hidden="true"></i>
                            </button>
                            <div className="task-items" onClick={() => {
                                setShowModal(true)
                                setShowTaskDetail(true)
                                setOnClickTaskId(task.id)
                            }}>{task.name}</div>
                        </div>
                    </>
                ))}
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <TaskDetailByWorkSpace taskId={onClickTaskId} />
                </Modal>
            )
            }
        </>
    )
}

export default TasksListByUser
