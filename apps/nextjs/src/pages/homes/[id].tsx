import React from 'react'
import { useRouter } from 'next/router'
import { api } from '~/utils/api'
import SearchMember from '../../components/member/SearchMember'

const HomeDetails = () => {
    const router = useRouter()
    const { data: home } = api.home.getHomeDetails.useQuery({ id: router.query.id as string })
    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        const chore = e.target[0].value
    }
    return (
        <div className='text-emerald-500'>
            <h1>Home Details</h1>
            <h3>{home?.name.toLocaleUpperCase()}</h3>
            <h3>{home?.admin.username}</h3>
            <SearchMember />
            <form className='flex flex-col' onSubmit={handleSubmit}>
                <label>Add Chore</label>
                <input type='text' />
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