import { Tag } from "../AppProps"

export type SimplifiedNote = {
    tags: Tag[]
    title: string
    id: string
}

export type NoteListProps = {
    availableTags: Tag[]
    notes: SimplifiedNote[]
    onUpdateTag: (id: string, label: string) => void
    onDeleteTag: (id: string) => void
}

export type EditTagsModalProps = {
    show: boolean
    availableTags: Tag[]
    handleClose: () => void
    onUpdateTag: (id: string, label: string) => void
    onDeleteTag: (id: string) => void
}