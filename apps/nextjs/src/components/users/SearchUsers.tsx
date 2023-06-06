import React, { useEffect, useRef, useState } from 'react'
import { api } from '~/utils/api'
import type { SearchUsersProps } from '~/types/components/searchUsers'

const SearchUsers = ({ houseId }: SearchUsersProps) => {
    const [userQuery, setUserQuery] = useState('')
    const [focusedIndex, setFocusedIndex] = useState(-1)
    const resultContainer = useRef<HTMLInputElement>(null)
    const { data: users } = api.user.getFilteredUsers.useQuery({ query: userQuery, houseId: houseId }, { enabled: !!userQuery.length })
    const { mutate } = api.user.sendInvite.useMutation()

    useEffect(() => {
        if (!resultContainer.current) return;
        resultContainer?.current?.scrollIntoView({ block: 'center' })
    }, [focusedIndex])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const username = e.target.value
        setUserQuery(username)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!users) return
        const user = users[focusedIndex]
        user && mutate({ houseId: houseId, userId: user.id })
    }
    const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        const { key } = e
        let nextIndex = 0
        if (key === 'ArrowDown' && users) {
            nextIndex = (focusedIndex + 1) % users.length
        }
        if (key === 'ArrowUp' && users) {
            nextIndex = (focusedIndex - 1) % users.length
        }
        if (key === 'Escape' && users) {
            setUserQuery('')
        }
        setFocusedIndex(nextIndex)
    }

    return (
        <form className='flex flex-col' onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
            <label>Add A Member</label>
            <div>
                <input className='rounded-lg text-black focus:outline-none focus:border-blue-600 focus:border-2' onChange={handleChange} type='text' value={userQuery} />
                <div className='bg-slate-50'>
                    {users && users.map((user, index) => (
                        <div
                            className={`${index === focusedIndex && 'border-white border-2 rounded-lg bg-slate-300'}`}
                            key={user.id}
                            ref={index === focusedIndex ? resultContainer : null}>
                            {user.username}
                        </div>
                    ))}
                </div>
                <button className='rounded-lg focus:outline-none focus:border-blue-600 focus:border-2' type='submit'>Add</button>
            </div>
        </form>
    )
}

export default SearchUsers