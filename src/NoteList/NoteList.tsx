import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ReactSelect from 'react-select';
import { Tag } from '../AppProps';
import { NoteListProps } from './NoteListProps';
import NoteCard from './NoteCard';
import EditTagsModal from './EditTagsModal';

const NoteList = ({ availableTags, notes, onUpdateTag, onDeleteTag }: NoteListProps) => {
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [editTagsModal, setEditTagsModal] = useState(false);
    const [title, setTitle] = useState("");

    const filterNotes = useMemo(() => {
        return notes.filter(note => {
            return (
                (title === "" || note.title.toLowerCase().includes(title.toLowerCase())) &&
                (selectedTags.length === 0 || selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id)))
            )
        })
    }, [title, selectedTags, notes]);

    return (
        <>
            <div className="flex mb-4">
                <div className="mr-auto">
                    <h1 className='text-2xl'>Notes</h1>
                </div>
                <div className="flex">
                    <Link to={"/new"}>
                        <button className="bg-blue-500 border-2 border-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded shadow">Create</button>
                    </Link>
                    <button
                        className=" bg-gray-100 hover:bg-gray-500 hover:text-gray-50 text-gray-500 ml-2 py-2 px-4 border-2 border-gray-500 rounded shadow"
                        onClick={() => setEditTagsModal(true)}
                    >
                        Edit Tags
                    </button>
                </div>
            </div>
            <form>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                        <input
                            type="text"
                            id="title" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                            dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search Title"
                            // required
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tags</label>
                        <ReactSelect
                            isMulti
                            placeholder="Search Tags"
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
            </form>
            <div className="grid w-full block md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-8">
                {
                    filterNotes.map(note => (
                        <div className="w-full" key={note.id}>
                            <NoteCard
                                id={note.id}
                                title={note.title}
                                tags={note.tags}
                            />
                        </div>
                    ))
                    
                }
            </div>
            <EditTagsModal
                show={editTagsModal}
                handleClose={() => setEditTagsModal(false)}
                availableTags={availableTags}
                onUpdateTag={onUpdateTag}
                onDeleteTag={onDeleteTag}
            />
        </>
    );
};

export default NoteList;