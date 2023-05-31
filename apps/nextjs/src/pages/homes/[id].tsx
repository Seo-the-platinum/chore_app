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
        <div className='text-emerald-500'>
            <h1>Home Details</h1>
            <h3>{home.name.toLocaleUpperCase()}</h3>
            <h3>{home.admin.username}</h3>
            <SearchUsers houseId={home.id} />
            <form className='flex flex-col' onSubmit={handleSubmit}>
                <label>Add Chore</label>
                <input ref={inputRef} type='text' />
                <label>Assign Member</label>
                <select ref={selectRef}>
                    <option value=''> Select Member </option>
                    {
                        home.members.map(member => (
                            <option key={member.id} value={member.id}>{member.username}</option>
                        ))
                    }
                </select>
                <label>Due Date</label>
                <input ref={dateRef} type='date' />
                <button type='submit'>Create Chore</button>
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