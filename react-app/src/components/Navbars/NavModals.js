import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import AddUser from '../Workspace-test-reducer/AddUserModal/AddUser';
import TaskForm from '../Tasks/TaskForm';
import CreateProjectForm from '../Projects/CreateProjectModal/CreateProjectForm';

export function NavAddUserModal() {
    const [showModal, setShowModal] = useState(false);
    const user = useSelector(state => state.workspace.users)

    useEffect(() => {
        setShowModal(false)
    }, [user])

    return (
        <>
            <span onClick={() => setShowModal(true)} >
                <i className='fas fa-user-plus' style={{ marginRight: '5px' }} />
                Invite Teammates
            </span>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AddUser setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export function NavDropdownAddUserModal({ handleClick }) {
    if (!handleClick) {
        handleClick = () => { }
    }
    const [showModal, setShowModal] = useState(false);
    const user = useSelector(state => state.workspace.users)

    useEffect(() => {
        setShowModal(false)
    }, [user])

    return (
        <>
            <span onClick={() => {
                setShowModal(true)
                handleClick()
            }} >
                <i className='fas fa-user-plus' />
                Invite
            </span>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AddUser setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export function NavTaskModal({ handleClick }) {
    if (!handleClick) {
        handleClick = () => { }
    }
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setShowModal(false)
    }, [])

    return (
        <>
            <span onClick={() => {
                setShowModal(true)
                handleClick()
            }}>
                <i className="far fa-check-circle" /><span>Task</span>
            </span>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <TaskForm setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export function NavProjectForm({ handleClick }) {
    if (!handleClick) {
        handleClick = () => { }
    }
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setShowModal(false)
    }, [])

    return (
        <>
            <span onClick={() => {
                setShowModal(true)
                handleClick()
            }}>
                <i className="fas fa-clipboard-list" /><span>Project</span>
            </span>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateProjectForm setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}
