import React from 'react'
import { useRouter } from 'next/router'
import { api } from '~/utils/api'

const HomeDetails = () => {
    const router = useRouter()
    const { data: home } = api.home.getHomeDetails.useQuery({ id: router.query.id as string })
    console.log(home)
    const handleSubmit = (e) => {
        e.preventDefault()
        const chore = e.target[0].value
        console.log(chore)
    }
    return (
        <div className='text-emerald-500'>
            <h1>Home Details</h1>
            <h3>{home?.name}</h3>
            <h3>{home?.admin.name}</h3>
            <form className='flex flex-col' onSubmit={handleSubmit}>
                <label>Chore</label>
                <input type='text' />
                <label>Member</label>
                <select>
                    <option value=''> Select Member </option>
                    {
                        home?.members.map(member => (
                            <option key={member.id} value={member.id}>{member.name}</option>
                        ))
                    }
                </select>
                <button type='submit'>Create Chore</button>
            </form>
            <form></form>
        </div>
    )
}

export default HomeDetails