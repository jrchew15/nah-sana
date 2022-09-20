import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../../../context/Modal';
import CreateWS from './CreateWS';

function CreateWorkspaceModal() {
    const [showModal, setShowModal] = useState(false);
    const projects = useSelector(state => state.projects)

    useEffect(() => {
        setShowModal(false)
    }, [projects])

    return (
        <>
            <button className='create-project-button' onClick={() => setShowModal(true)}>
                <i class="square fa fa-plus-square-o fa-3x square" aria-hidden="true"></i>
                Create Workspace
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateWS />
                </Modal>
            )}
        </>
    );
}

export default CreateWorkspaceModal;
