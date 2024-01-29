import React, { useEffect } from 'react';
import styles from './Modal.module.css';
import X from './../../assets/x.svg';

const Modal = ({ isOpen, setIsOpen, children, title }) => {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    const handleOutsideClick = (event) => {
      if (event.target.classList.contains(styles.modalOverlay) && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, setIsOpen]);

  return (
    <>
      {isOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modal_header}>
                <h1>{title}</h1>
                <button className={styles.closeButton} onClick={() => setIsOpen(false)}>
                    <img src={X} alt="" />
                </button>
            </div>
            <div className={styles.modalContent}>
                {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;