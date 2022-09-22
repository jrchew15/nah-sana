import React, { useEffect, useState } from 'react';
import { Modal } from '../../../context/Modal';
import UpdateWorkspace from './UpdateWorkSpace';

function UpdateWorkspaceModal({ toggleUserDropdown }) {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setShowModal(false)
    }, [])

    return (
        <>
            <span onClick={() => {
                setShowModal(true)
                toggleUserDropdown()
            }}>
                {/* <i class="square fa fa-plus-square-o fa-3x square" aria-hidden="true"></i> */}
                Update Workspace
            </span>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <UpdateWorkspace setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default UpdateWorkspaceModal;
