import React, { useEffect, useState } from 'react';
import { Modal } from '../../../context/Modal';
import UpdateWorkspace from './UpdateWorkSpace';

function UpdateWorkspaceModal() {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setShowModal(false)
    }, [])

    return (
        <>
            <button className='create-project-button' onClick={() => setShowModal(true)}>
                <i class="square fa fa-plus-square-o fa-3x square" aria-hidden="true"></i>
                Update Workspace
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <UpdateWorkspace />
                </Modal>
            )}
        </>
    );
}

export default UpdateWorkspaceModal;
