import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

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
        <Modal show={show} onHide={() => onUpdateData(data)}>
            <Modal.Header closeButton>
                <Modal.Title>Execute SQL query</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <textarea
                    className="form-control"
                    rows="5"
                    value={editedData}
                    onChange={(e) => setEditedData(e.target.value)}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => onClose()}>
                    Відмінити
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Зберегти
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmationModal;