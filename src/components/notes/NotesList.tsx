import { useNotes } from '@/context/NoteContext'
import { Note } from '@prisma/client'
import React from 'react'
import { FaPencilAlt } from "react-icons/fa";
import { FcEmptyTrash } from "react-icons/fc";

interface INotesListProps {
    notes: Note[]
    showForm: boolean,
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>
}

const NotesList = ({ notes, showForm, setShowForm }: INotesListProps) => {

    const { deleteNote, setSelectedNote } = useNotes()

    return (
        <>
            {notes.map((note: Note, index: number) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={note.id}>
                    <td className="px-6 py-4">
                        {index + 1}
                    </td>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {note.title}
                    </td>
                    <td className="px-6 py-4">
                        {note.content}
                    </td>
                    <td className="px-6 py-4">
                        {new Date(note.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                        <button type='button' className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => {
                            setSelectedNote(note)
                            setShowForm(!showForm)
                        }}>
                            <FaPencilAlt className='text-xl' />
                        </button>
                        <button type='button' className="font-medium ml-6 text-red-600 dark:text-red-500 hover:underline" onClick={async () => { if (confirm("Are you sure you delete this note?")) await deleteNote(Number(note.id)) }}>
                            <FcEmptyTrash className="text-2xl" />
                        </button>
                    </td>
                </tr>
            ))}
        </>
    )
}

export default NotesList