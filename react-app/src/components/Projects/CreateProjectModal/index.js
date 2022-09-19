import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../../../context/Modal';
import CreateProjectForm from './CreateProjectForm';

function CreateProjectModal() {
  const [showModal, setShowModal] = useState(false);
  const projects = useSelector(state => state.projects)

  useEffect(() => {
    setShowModal(false)
  }, [projects])

  return (
    <>
      <button onClick={() => setShowModal(true)}>Create Project</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateProjectForm />
        </Modal>
      )}
    </>
  );
}

export default CreateProjectModal;