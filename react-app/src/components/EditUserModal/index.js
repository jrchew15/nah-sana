import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import EditUserForm from './EditUserForm';

function EditUserFormModal({ toggleUserDropdown }) {
  const [showModal, setShowModal] = useState(false);
  const user = useSelector(state => state.session.user)

  useEffect(() => {
    setShowModal(false)
  }, [user])

  return (
    <>
      <span onClick={() => {
        setShowModal(true)
        toggleUserDropdown()
      }}>
        My Settings
      </span>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditUserForm />
        </Modal>
      )}
    </>
  );
}

export default EditUserFormModal;
