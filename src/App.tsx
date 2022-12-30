import 'bootstrap/dist/css/bootstrap.min.css';
import { useMemo } from 'react';
import { Container } from 'react-bootstrap';
import { Routes, Route, Navigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import { useLocalStorage } from './Hooks/useLocalStorage';
import EditNote from './EditNote/EditNote';
import NewNote from './NewNote/NewNote';
import Note from './Note/Note';
import NoteLayout from './NoteLayout/NoteLayout';
import NoteList from './NoteList/NoteList';

export type Note = {
  id: string
} & NoteData

export type RawNote = {
  id: string
} & RawNoteData

export type RawNoteData = {
  title: string
  textArea: string
  tagIds: string[]
}
export type NoteData = {
  title: string
  textArea: string //teaxtArea as markdown
  tags: Tag[]
}

export type Tag = {
  id: string
  label: string
}

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTag = useMemo(() => {
    return notes.map(note => {
      return {...note, tags: tags.filter(tag=> note.tagIds.includes(tag.id))}
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

  const onUpdateNote = (id: string, {tags, ...data}: NoteData) => {
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
      return prevNotes.filter(note=> note.id !== id)
    })
  }

  const addTag = (tag: Tag) => {
    setTags(prev => [...prev, tag])
  }

  const updateTag = (id: string, label: string) => {
    setTags(prevTags => {
      return prevTags.map(tag => {
        if (tag.id === id) {
          return {...tag, label}
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
    <Container className='m-4 d-block mx-auto'>
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
    </Container>
  )
}

export default App
