import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import "./ConfirmationModal.css";

function ConfirmationModal({ show, data, onUpdateData, onClose }) {
    const [editedData, setEditedData] = useState('');

    // Завантаження початкових даних під час відкриття модального вікна
    useEffect(() => {
        setEditedData(data);
    }, [data, show]);

    const handleSave = () => {
        onUpdateData(editedData); // Передача змінених даних назад у батьківський компонент
    };

    return (
        <div className='confirmation-modal'>
            <Modal className='confirmation-modal' show={show} onHide={() => onUpdateData(data)}>
                <Modal.Header>
                    <Modal.Title>Execute SQL query</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <textarea
                        className="form-control"
                        rows="16"
                        value={editedData}
                        onChange={(e) => setEditedData(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <button className='button-red' onClick={() => onClose()}>
                        <div className='button-content'>
                            <div className='button-icon'>
                                <img src='./images/cross_red.png'></img>
                                <img className='img-hover' src='./images/cross_black.png'></img>
                            </div>
                            <div className='button-label'>Cancel</div>
                        </div>
                    </button>
                    <button className='button-green' onClick={handleSave}>
                        <div className='button-content'>
                            <div className='button-icon'>
                                <img src='./images/tick_green.png'></img>
                                <img className='img-hover' src='./images/tick_black.png'></img>
                            </div>
                            <div className='button-label'>Execute</div>
                        </div>
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ConfirmationModal;