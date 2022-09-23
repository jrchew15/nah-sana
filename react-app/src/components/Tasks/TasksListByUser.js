import { getTasks } from "../../store/tasks";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Modal } from '../../context/Modal';

import TaskForm from "./TaskForm";

import './TaskStyle/TaskDetail.css'
import './TaskList.css'

const TasksListByUser = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.session.user.id)
    const workspace = useSelector((state) => state.workspace)
    const tasksArr = workspace['tasks']
    let filtered
    if (tasksArr.length) {
        filtered = tasksArr.filter(task => task?.userId === currentUser)
    }


    const [showModal, setShowModal] = useState(false)
    const [onClickTaskId, setOnClickTaskId] = useState(null)

    useEffect(() => {
        dispatch(getTasks())
    }, [dispatch])

    if (!tasksArr.length) return null
    return (
        <>
            <div className="task-container-list scroller">
                {filtered.map((task) => (
                    <>
                        <div className="task-flex">
                            <div className="task-items" onClick={() => {
                                setShowModal(true)
                                setOnClickTaskId(task.id)
                            }}>
                                <button className="task-button">
                                    <i class="fa fa-check-circle-o" aria-hidden="true" style={{ color: task.complete ? 'green' : 'white', borderRadius: '10px' }}></i>
                                </button>
                                {task.name}</div>
                        </div>
                    </>
                ))}
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <TaskForm taskId={onClickTaskId} setShowModal={setShowModal} />
                </Modal>
            )
            }
        </>
    )
}

export default TasksListByUser
