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
        <>
            <form onSubmit={handleSubmit} className="mt-8">
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">Blog Title</label>
                        <input
                            ref={titleRef}
                            required
                            defaultValue={title}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 
                            dark:placeholder-gray-400 shadow dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder='Add Title'
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Blog Tags</label>
                        <CreatableReactSelect
                            isMulti
                            required
                            onCreateOption={label => {
                                const newTag = { id: uuidv4(), label }
                                onAddTag(newTag)
                                setSelectedTags(prev => [...prev, newTag])
                            }}
                            value={selectedTags.map(tag => {
                                return { label: tag.label, value: tag.id }
                            })}
                            options={availableTags.map(tag => {
                                return { label: tag.label, value: tag.id }
                            })}
                            onChange={tags => {
                                setSelectedTags(tags.map(tag => {
                                    return { label: tag.label, id: tag.value }
                                }))
                            }}
                            className="shadow"
                            placeholder="Add Tags"
                            theme={(theme) => ({
                                ...theme,
                                borderRadius: 6,
                                colors: {
                                    ...theme.colors,
                                    primary25: 'rgba(59, 130, 246, 0.7)',
                                    primary: 'black',
                                },
                            })}
                        />
                    </div>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Blog Body</label>
                    <textarea
                        rows={10}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write your blog details here..."
                        ref={textAreaRef}
                        required
                        defaultValue={textArea}
                    />
                </div>
                <div className='mt-4 ml-auto flex justify-end'>
                    <button type='submit' className="bg-blue-500 hover:bg-blue-700 border-2 border-blue-500 text-white py-2 px-4 rounded shadow">Save</button>
                    <Link to="..">
                        <button type='button' className="bg-gray-100 hover:bg-gray-500 hover:text-gray-50 text-gray-500 ml-2 py-2 px-4 border-2 border-gray-500 rounded shadow">Cancel</button>
                    </Link>
                </div>
            </form>
        </>
    );
};

export default NoteForm;