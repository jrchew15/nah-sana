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
      <button className='create-project-button' onClick={() => setShowModal(true)}>
        <i className="square fa fa-plus-square-o fa-3x square" aria-hidden="true"></i>
        Create Project
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateProjectForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default CreateProjectModal;
