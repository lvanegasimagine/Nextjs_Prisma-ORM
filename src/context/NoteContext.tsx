import { createContext, useContext } from "react";
import { CreateNote, UpdateNote } from "../../typing";
import { Note } from "@prisma/client";

interface INoteContext {
    notes: Note[],
    loadNotes: () => Promise<void>
    createNote: (notes: CreateNote) => Promise<void>
    deleteNote: (id: number) => Promise<void>
    selectedNote: Note | null
    setSelectedNote: (note: Note | null) => void
    updateNote: (id: number, note: UpdateNote) => void
}

export const NoteContext = createContext<INoteContext>({
    notes: [],
    loadNotes: async () => { },
    createNote: async (notes: CreateNote) => { },
    deleteNote: async (id: number) => { },
    selectedNote: null,
    setSelectedNote: (note: Note | null) => { },
    updateNote: async (id: number, note: UpdateNote) => { },
});

// * Custom Hooks
export const useNotes = () => {
    const context = useContext(NoteContext)

    if (!context) throw new Error('useNotes must be provided')

    return context
}