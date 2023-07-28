'use client'
import { useNotes } from '@/context/NoteContext'
import React, { ChangeEvent, FormEvent, useRef, useEffect, useState } from 'react'

interface INoteFormProps {
    showForm: boolean,
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>
}

const NoteForm = ({ showForm, setShowForm }: INoteFormProps) => {
    const { createNote, selectedNote, setSelectedNote, updateNote } = useNotes();
    const [title, setTitle] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [])

    useEffect(() => {
        if (selectedNote) {
            setTitle(selectedNote.title);
            setContent(selectedNote.content || "");
        }
    }, [selectedNote])


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (selectedNote) {
            await updateNote(selectedNote.id, { title, content })
            setSelectedNote(null)
            setShowForm(!showForm)
        } else {
            if (title.trim() === ' ' || content.trim() === ' ') return;
            await createNote({ title, content })
            setShowForm(!showForm)
        }
        setTitle('')
        setContent('')
    }

    const handleCancel = () => {
        setShowForm(!showForm)
        setSelectedNote(null)
        setTitle("")
        setContent("")
    }
    return (
        <>
            <form onSubmit={handleSubmit} autoComplete='off'>
                <div className="mb-6">
                    <label htmlFor="title" className="block mb-2 text-sm capitalize text-gray-900 font-bold dark:text-white">Title</label>
                    <input
                        type="text"
                        id='title'
                        name="title"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        value={title}
                        ref={inputRef}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="content" className="block mb-2 text-sm capitalize text-gray-900 font-bold dark:text-white">Your message</label>
                    <textarea
                        id='content'
                        name="content"
                        rows={4}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write your thoughts here..."
                        value={content}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}></textarea>

                </div>
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!title || !content}>{selectedNote ? 'Update Note' : 'Save Note'}</button>
                <button type="button" className="focus:outline-none text-white bg-red-700 ml-4 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={handleCancel}>Cancel</button>
            </form>
        </>
    )
}

export default NoteForm