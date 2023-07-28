'use client'
import React, { useEffect, useState } from 'react'
import NoteForm from '@/components/notes/NoteForm';
import NotesList from '@/components/notes/NotesList';
import { useNotes } from '@/context/NoteContext';

function HomePage() {
  const [showForm, setShowForm] = useState<boolean>(false)
  const { notes, loadNotes } = useNotes();

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  return (
    <main className='container pt-[150px]'>
      <div className="relative overflow-x-auto">
        {!showForm && <div className='flex justify-end items-end'> <button type="button" className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={() => setShowForm(!showForm)}>New Post</button> </div>}
        {showForm && <NoteForm setShowForm={setShowForm} showForm={showForm} />}
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-8">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Content
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <NotesList notes={notes} showForm={showForm} setShowForm={setShowForm}/>
          </tbody>
        </table>
      </div>

    </main >
  )
}

export default HomePage

