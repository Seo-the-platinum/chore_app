import React, { useEffect, useRef, useState } from 'react'
import { api } from '~/utils/api'
import type { SearchUsersProps } from '~/types/components/searchUsers'
import Button from '../buttons/Button'

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
        <form className='flex flex-col gap-2 pb-4' onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
            <label className='text-2xl text-center'>Add Member</label>
            <div className='flex flex-col items-center gap-2'>
                <div>
                    <input
                        className={` ${userQuery.length && users?.length && 'rounded-b-none'}
                            rounded-lg text-black w-full
                            focus:outline-none focus:border-blue-600 
                            focus:border-2`}
                        onChange={handleChange} type='text' value={userQuery} />
                    <div className='bg-slate-300 w-full rounded-b-lg border-none'>
                        {users && users.map((user, index) => (
                            <div
                                className={`${index === focusedIndex && 'border-b-2 rounded-lg bg-slate-300'}`}
                                key={user.id}
                                ref={index === focusedIndex ? resultContainer : null}>
                                {user.username}
                            </div>
                        ))}
                    </div>
                </div>
                <Button label='Add' type='submit' />
            </div>
        </form>
    )
}

export default SearchUsers