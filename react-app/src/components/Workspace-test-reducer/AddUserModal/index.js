import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../../../context/Modal';
import AddUser from './AddUser';

function AddUserToWorkspace() {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setShowModal(false)
    }, [])

    return (
        <>
            <button className='create-project-button' onClick={() => setShowModal(true)}>
                <i class="square fa fa-plus-square-o fa-3x square" aria-hidden="true"></i>
                Add User to Workspace
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AddUser />
                </Modal>
            )}
        </>
    );
}

export default AddUserToWorkspace;
