import React, { useState } from 'react'
import { api } from '~/utils/api'
const SearchMember = () => {
    const [userQuery, setUserQuery] = useState('')
    const { data: members } = api.user.getFilteredUsers.useQuery(userQuery, { enabled: !!userQuery.length })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const username = e.target.value
        setUserQuery(username)
    }
    console.log(members)
    return (
        <form className='flex flex-col'>
            <label>Add A Member</label>
            <div>
                <input onChange={handleChange} type='text' />
                <div>
                    {members && members.map((member) => (
                        <p key={member.id}>{member.username}</p>
                    ))}
                </div>
                <button type='submit'>Add</button>
            </div>
        </form>
    )
}

export default SearchMember