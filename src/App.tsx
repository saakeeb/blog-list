import { useMemo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import { useLocalStorage } from './Hooks/useLocalStorage';
import EditNote from './EditNote/EditNote';
import NewNote from './NewNote/NewNote';
import Note from './Note/Note';
import NoteLayout from './NoteLayout/NoteLayout';
import NoteList from './NoteList/NoteList';
import { NoteData, RawNote, Tag } from './AppProps';

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTag = useMemo(() => {
    return notes.map(note => {
      return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) }
    })
  }, [notes, tags]);

  const onCreateNote = ({ tags, ...data }: NoteData) => {
    setNotes(prevNotes => {
      return [
        ...prevNotes,
        { ...data, id: uuidv4(), tagIds: tags.map(tag => tag.id) },
      ]
    })
  }

  const onUpdateNote = (id: string, { tags, ...data }: NoteData) => {
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map(tag => tag.id) }
        } else {
          return note
        }
      })
    })
  }

  const onDeleteNote = (id: string) => {
    setNotes(prevNotes => {
      return prevNotes.filter(note => note.id !== id)
    })
  }

  const addTag = (tag: Tag) => {
    setTags(prev => [...prev, tag])
  }

  const updateTag = (id: string, label: string) => {
    setTags(prevTags => {
      return prevTags.map(tag => {
        if (tag.id === id) {
          return { ...tag, label }
        }
        else {
          return tag;
        }
      })
    })
  }

  const deleteTag = (id: string) => {
    setTags(prevTags => {
      return prevTags.filter(tag => tag.id !== id)
    })
  }

  return (
    <div className='block mx-4'>
      <div className='w-full xl:max-w-7xl md:max-w-5xl sm:max-w-xl mx-auto block my-4'>
        <Routes>
          <Route
            path='/'
            element={<NoteList
              availableTags={tags}
              notes={notesWithTag}
              onUpdateTag={updateTag}
              onDeleteTag={deleteTag}
            />}
          />
          <Route
            path='/new'
            element={<NewNote
              onSubmit={onCreateNote}
              onAddTag={addTag}
              availableTags={tags}
            />}
          />
          <Route path='/:id' element={<NoteLayout notes={notesWithTag} />}>
            <Route index element={<Note onDelete={onDeleteNote} />} />
            <Route
              path='edit'
              element={<EditNote
                onSubmit={onUpdateNote}
                onAddTag={addTag}
                availableTags={tags}
              />}
            />
          </Route>
          <Route path='*' element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
