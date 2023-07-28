'use client'
import { Note } from '@prisma/client';
import { useState } from 'react';
import { CreateNote, IChildrenProps, UpdateNote } from '../../typing';
import { NoteContext } from './NoteContext';

export const NotesProvider = ({ children }: IChildrenProps) => {
    const [notes, setNotes] = useState<any[]>([])
    const [selectedNote, setSelectedNote] = useState<Note | null>(null)

    async function loadNotes() {
        const res = await fetch("/api/notes");
        const data = await res.json();
        setNotes(data);
    }

    async function createNote(note: CreateNote) {
        const res = await fetch("/api/notes", {
            method: "POST",
            body: JSON.stringify(note),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const newNote = await res.json();
        setNotes([...notes, newNote]);
    }

    const deleteNote = async (id: number) => {
        const res = await fetch(`http://localhost:3000/api/notes/${id}`, {
            method: 'DELETE',
        })
        const data = await res.json()

        setNotes(notes.filter(note => note.id !== id))
    }

    const updateNote = async (id: number, note: UpdateNote) => {
        const res = await fetch(`http://localhost:3000/api/notes/${id}`, { method: 'PUT', body: JSON.stringify(note), headers: { 'Content-Type': 'application/json' } })
        const data = await res.json()
        console.log("🚀 ~ file: NoteProvider.tsx:43 ~ updateNote ~ data:", data)
    }

    return <NoteContext.Provider value={{ notes, loadNotes, createNote, deleteNote, selectedNote, setSelectedNote, updateNote }}>{children}</NoteContext.Provider>
}