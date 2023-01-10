import ReactMarkdown from 'react-markdown';
import { Link, useNavigate } from 'react-router-dom';
import { NoteFromProps } from './NoteFromProps';
import { useNote } from '../NoteLayout/useNote';

const Note = ({ onDelete }: NoteFromProps) => {
    const note = useNote();
    const navigate = useNavigate();
    return (
        <>
            <div className='mb-4 mt-8'>
                <div className='flex justify-end'>
                    <Link to={`/${note.id}/edit`}>
                        <button type='submit' className="bg-blue-500 hover:bg-blue-700 border-2 border-blue-500 text-white py-2 px-4 rounded shadow">Edit</button>
                    </Link>
                    <button
                        onClick={() => {
                            onDelete(note.id)
                            navigate("/")

                        }}
                        type='button'
                        className="bg-gray-100 hover:bg-red-400 hover:text-gray-50 text-red-600 ml-2 py-2 px-4 border-2 border-red-400 rounded shadow"
                    >
                        Delete
                    </button>
                    <Link to="/">
                        <button type='button' className="bg-gray-100 hover:bg-gray-500 hover:text-gray-50 text-gray-500 ml-2 py-2 px-4 border-2 border-gray-500 rounded shadow">Back</button>
                    </Link>
                </div>
                <div className='flex justify-center flex-col m-8'>
                    <h1 className='block text-center text-2xl mb-3'>{note.title}</h1>
                    {note.tags.length > 0 && (
                        <div className='flex justify-center'>
                            {
                                note.tags.map(tag => (
                                    <span
                                        key={tag.id}
                                        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                                    >
                                        {tag.label}
                                    </span>
                                ))
                            }
                        </div>
                    )}
                    <div className='mt-6 shadow-md rounded-sm p-4'>
                        <ReactMarkdown>
                            {note.textArea}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Note;