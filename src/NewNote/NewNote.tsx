import NoteForm from '../NoteForm/NoteForm';
import { NewNoteProps } from './NewNoteProps';

const NewNote = ({ onSubmit, onAddTag, availableTags }: NewNoteProps) => {
    return (
        <div>
            <h1>New Note</h1>
            <NoteForm 
                onSubmit={onSubmit}
                onAddTag={onAddTag}
                availableTags={availableTags}
            />
        </div>
    );
};

export default NewNote;