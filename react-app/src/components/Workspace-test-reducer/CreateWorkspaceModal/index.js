import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../../../context/Modal';
import CreateWS from './CreateWS';

function CreateWorkspaceModal({ toggleUserDropdown }) {
    const [showModal, setShowModal] = useState(false);
    const projects = useSelector(state => state.projects)

    useEffect(() => {
        setShowModal(false)
    }, [projects])

    return (
        <>
            <span onClick={() => {
                setShowModal(true)
                toggleUserDropdown()
            }}>
                {/* <i class="square fa fa-plus-square-o fa-3x square" aria-hidden="true"></i> */}
                Create Workspace
            </span>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateWS setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default CreateWorkspaceModal;
