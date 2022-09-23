import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../../../context/Modal';
import EditProjectForm from './EditProjectForm';

function EditProjectModal({ project }) {
  const [showModal, setShowModal] = useState(false);
  const projects = useSelector(state => state.projects)

  useEffect(() => {
    setShowModal(false)
  }, [projects])

  return (
    <>
      <button onClick={() => setShowModal(true)} className='projectButton' id="editProject">Edit Project</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditProjectForm project={project} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default EditProjectModal;
