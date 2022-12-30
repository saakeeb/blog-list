import NoteForm from '../NoteForm/NoteForm';
import { useNote } from '../NoteLayout/useNote';
import { EditNoteProps } from './EditNoteProps';

const EditNote = ({ onSubmit, onAddTag, availableTags }: EditNoteProps) => {
    const note = useNote();
    return (
        <>
            <h1>Edit Note</h1>
            <NoteForm 
                title={note.title}
                textArea={note.textArea}
                tags={note.tags}
                onSubmit={data=> onSubmit(note.id, data)}
                onAddTag={onAddTag}
                availableTags={availableTags}
            />
        </>
    );
};

export default EditNote;