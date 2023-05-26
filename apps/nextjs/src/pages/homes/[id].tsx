import React, { useRef } from 'react'
import { useRouter } from 'next/router'
import { api } from '~/utils/api'
import SearchUsers from '../../components/users/SearchUsers'

const HomeDetails = () => {
    const router = useRouter()
    const inputRef = useRef<HTMLInputElement>(null)
    const { data: home } = api.home.getHomeDetails.useQuery({ id: router.query.id as string })
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const chore = inputRef?.current?.value
        console.log(chore)
    }
    if (!home) return null

    return (
        <div className='text-emerald-500'>
            <h1>Home Details</h1>
            <h3>{home?.name.toLocaleUpperCase()}</h3>
            <h3>{home?.admin.username}</h3>
            <SearchUsers houseId={home.id} />
            <form className='flex flex-col' onSubmit={handleSubmit}>
                <label>Add Chore</label>
                <input ref={inputRef} type='text' />
                <label>Assign Member</label>
                <select>
                    <option value=''> Select Member </option>
                    {
                        home?.members.map(member => (
                            <option key={member.id} value={member.id}>{member.username}</option>
                        ))
                    }
                </select>
                <button type='submit'>Create Chore</button>
            </form>
        </div>
    )
}

export default HomeDetails