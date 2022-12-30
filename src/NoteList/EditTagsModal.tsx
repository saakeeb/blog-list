import { Button, Col, Form, Modal, ModalTitle, Row, Stack } from 'react-bootstrap';
import { EditTagsModalProps } from './NoteListProps';

const EditTagsModal = ({
    availableTags,
    show,
    handleClose,
    onDeleteTag,
    onUpdateTag
}: EditTagsModalProps) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <ModalTitle>Edit Tags</ModalTitle>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Stack gap={2}>
                        {availableTags.map(tag => (
                            <Row key={tag.id}>
                                <Col>
                                    <Form.Control
                                        type='text'
                                        value={tag.label}
                                        onChange={e => onUpdateTag(tag.id, e.target.value)}
                                    />
                                </Col>
                                <Col xs="auto">
                                    <Button
                                        variant='outline-danger'
                                        onClick={() => onDeleteTag(tag.id)}
                                    >
                                        &times;
                                    </Button>
                                </Col>
                            </Row>
                        ))}
                    </Stack>
                </Form>
            </Modal.Body>
        </Modal>
    )
};

export default EditTagsModal;