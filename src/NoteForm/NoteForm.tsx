import { FormEvent, useRef, useState } from 'react';
import { Form, Stack, Row, Col, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import CreatableReactSelect from 'react-select/creatable';
import { Tag } from '../AppProps';
import { NoteFromProps } from './NoteFromProps';

const NoteForm = ({
    onSubmit,
    onAddTag,
    availableTags,
    title = "",
    textArea = "",
    tags = []
}: NoteFromProps) => {

    const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
    const titleRef = useRef<HTMLInputElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(e);
        
        onSubmit({
            title: titleRef.current!.value,
            textArea: textAreaRef.current!.value,
            tags: selectedTags,
        });
        navigate("/"); // back to home page
        // navigate(".."); //back to previous page
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Stack gap={4}>
                <Row>
                    <Col>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                ref={titleRef}
                                required
                                defaultValue={title}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="tags">
                            <Form.Label>Tags</Form.Label>
                            <CreatableReactSelect
                                isMulti
                                onCreateOption={label => {
                                    const newTag = { id: uuidv4(), label }
                                    onAddTag(newTag)
                                    setSelectedTags(prev => [...prev, newTag])
                                }}
                                value={selectedTags.map(tag => {
                                    return {label: tag.label, value: tag.id}
                                })}
                                options={availableTags.map(tag => {
                                    return {label: tag.label, value: tag.id}
                                })}
                                onChange = { tags => {
                                    setSelectedTags(tags.map(tag => {
                                        return { label: tag.label, id: tag.value }
                                    }))
                                }}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId="body">
                    <Form.Label>Body</Form.Label>
                    <Form.Control
                        ref={textAreaRef}
                        required
                        as="textarea"
                        rows={10}
                        defaultValue={textArea}
                    />
                </Form.Group>
                <Stack direction="horizontal" gap={2} className="justify-content-end">
                    <Button type='submit' variant='primary'>Save</Button>
                    <Link to="..">
                        <Button type='button' variant='outline-secondary'>Cancel</Button>
                    </Link>
                </Stack>
            </Stack>
        </Form>
    );
};

export default NoteForm;