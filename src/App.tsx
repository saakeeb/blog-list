import { useEffect, useMemo, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import ReactGA from 'react-ga';
import { useLocalStorage } from './Hooks/useLocalStorage';
import EditNote from './EditNote/EditNote';
import NewNote from './NewNote/NewNote';
import Note from './Note/Note';
import NoteLayout from './NoteLayout/NoteLayout';
import NoteList from './NoteList/NoteList';
import { NoteData, RawNote, Tag } from './AppProps';
import { blogDatas } from './Services/BlogData';
import useGATiming from './React-GA/useGATiming';
import { TRACKING_ID } from './React-GA/React-GA';
import useAnalyticsEventTracker from './React-GA/useAnalyticsEventTracker';

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);
  // const blogData = useMemo(() => blogDatas(), []);
  const blogData = blogDatas();
  const location = useLocation();
  const [initialized, setInitialized] = useState<boolean>(false);
  const GATiming = useGATiming("App Loading Time");
  const gaEventTracker = useAnalyticsEventTracker('Notes Event');

  useEffect(() => {
    ReactGA.initialize(TRACKING_ID);
    ReactGA.pageview(window.location.pathname + window.location.search);
    const time = Date.now();
    GATiming('App Action', time);
  }, [initialized, location, GATiming]);

  // useEffect(() => {
  //   // if (tags.length >= 0) {
  //   //   blogData.map((blog) => {
  //   //     const newTags = blog.tags.map(label => ({ id: uuidv4(), label }));
  //   //     setTags([...tags, ...newTags]);
  //   //     const newNote = { id: uuidv4(), tagIds: newTags.map(tag => tag.id), textArea: blog.textArea, title: blog.title };
  //   //     setNotes([...notes, newNote]);
  //   //   });
  //   // }
  // }, []);

  useEffect(() => {
    if (tags.length === 0 && notes.length === 0) {
      const newTags = [...new Set(blogData.flatMap(blog => blog.tags))].map(label => ({ id: uuidv4(), label }));
      const newNotes = blogData.map(blog => {
        const noteTags = blog.tags.map(tag => newTags.find(newTag => newTag.label === tag) || { id: uuidv4(), label: tag });
        return { id: uuidv4(), tagIds: noteTags.map(tag => tag.id), textArea: blog.textArea, title: blog.title };
      });
      setTags(newTags);
      setNotes(newNotes);
    }
  }, []);

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
    });
    gaEventTracker('Create Button Click', 'Note Created');
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
    gaEventTracker('Update Button Click', 'Note Updated');
  }

  const onDeleteNote = (id: string) => {
    setNotes(prevNotes => {
      return prevNotes.filter(note => note.id !== id)
    })
    gaEventTracker('Delete Button Click', 'Note Deleted');
  }

  const addTag = (tag: Tag) => {
    setTags(prev => [...prev, tag])
    gaEventTracker('Create Tag Click', 'Tag Created');
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
    gaEventTracker('Update Tag Click', 'Tag Updated');
  }

  const deleteTag = (id: string) => {
    setTags(prevTags => {
      return prevTags.filter(tag => tag.id !== id)
    })
    gaEventTracker('Delete Tag Click', 'Tag Deleted');
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
