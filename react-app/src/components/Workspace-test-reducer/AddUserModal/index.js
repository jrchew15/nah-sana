import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../../../context/Modal';
import AddUser from './AddUser';

function AddUserToWorkspace() {
    const [showModal, setShowModal] = useState(false);
    const user = useSelector(state => state.workspace.users)

    useEffect(() => {
        setShowModal(false)
    }, [user])

    return (
        <>
            <button className='create-project-button' onClick={() => setShowModal(true)}>
                <i class="square fa fa-plus-square-o fa-3x square" aria-hidden="true"></i>
                Add User to Workspace
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AddUser setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default AddUserToWorkspace;
