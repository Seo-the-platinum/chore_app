import React, { useRef } from 'react'
import { useRouter } from 'next/router'
import { api } from '~/utils/api'
import SearchUsers from '../../components/users/SearchUsers'
import Chore from '../../components/chore/Chore'

const HomeDetails = () => {
    const router = useRouter()
    const inputRef = useRef<HTMLInputElement>(null)
    const selectRef = useRef<HTMLSelectElement>(null)
    const dateRef = useRef<HTMLInputElement>(null)
    const { mutate } = api.home.addChore.useMutation()
    const { data: home, isLoading } = api.home.getHomeDetails.useQuery({ id: router.query.id as string })
    if (!home || isLoading) return null

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const chore = inputRef?.current?.value
        const user = selectRef?.current?.value
        const date = dateRef?.current?.valueAsDate

        if (chore && user && date) {
            mutate({ houseId: home?.id, title: chore, userId: user, dueDate: date })
        }
    }

    return (
        <div className='text-emerald-500 flex flex-col items-center gap-4 text-center text-lg'>
            <h3 className='text-3xl'>{home.name.toLocaleUpperCase()}</h3>
            <div className='flex flex-col divide-y-2 divide-indigo-800 justify-evenly'>
                <SearchUsers houseId={home.id} />
                <form
                    className='
                        flex flex-col pt-4 
                        justify-evenly gap-4 pb-4
                        focus:outline-none focus:border-blue-600
                        focus:border-2'
                    onSubmit={handleSubmit}>
                    <label className='text-2xl'>Create Chore</label>
                    <label>Chore Title</label>
                    <input className='rounded-lg text-black focus:outline-none focus:border-blue-600 focus:border-2' ref={inputRef} type='text' />
                    <label>Assign Member</label>
                    <select className='rounded-lg text-black focus:outline-none focus:border-blue-600 focus:border-2' ref={selectRef}>
                        <option value=''> Select Member </option>
                        {
                            home.members.map(member => (
                                <option key={member.id} value={member.id}>{member.username}</option>
                            ))
                        }
                    </select>
                    <label>Due Date</label>
                    <input className='rounded-lg text-black focus:outline-none focus:border-blue-600 focus:border-2' ref={dateRef} type='date' />
                    <button
                        className='
                            rounded-lg bg-indigo-900 text-lg
                            w-28 h-8 self-center text-slate-50
                            focus:outline-none focus:border-blue-600 
                            focus:border-2'
                        type='submit'>
                        Add Chore
                    </button>
                </form>
                <div className='pt-2 flex flex-col gap-4'>
                    <label className='text-3xl'>Chores</label>
                    {
                        home.chores.map(chore => (
                            <Chore key={chore.id} {...chore} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default HomeDetails