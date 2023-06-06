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
        <div className='text-emerald-500 flex flex-col items-center'>
            <h3 className='text-3xl'>{home.name.toLocaleUpperCase()}</h3>
            <h3>{home.admin.username}</h3>
            <SearchUsers houseId={home.id} />
            <form className='flex flex-col focus:outline-none focus:border-blue-600 focus:border-2' onSubmit={handleSubmit}>
                <label>Add Chore</label>
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
                <button className='rounded-lg focus:outline-none focus:border-blue-600 focus:border-2' type='submit'>Create Chore</button>
            </form>
            <div>
                <h2>Chores</h2>
                {
                    home.chores.map(chore => (
                        <Chore key={chore.id} {...chore} />
                    ))
                }
            </div>
        </div>
    )
}

export default HomeDetails