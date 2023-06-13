import React from 'react'

//Types
import { Chore } from '../../types/global';
import type { User } from '../../types/global'
import Link from 'next/link'

type choreWithUser = Chore & { user: User }

const Chore = ({ ...chore }: choreWithUser) => {
    if (!chore) return null
    return (
        <Link
            className='
                flex flex-col text-slate-50
                rounded-lg bg-gradient-to-br from-black from-50%  via-indigo-900 to-black to-51%
                text-center w-56 h-24 justify-evenly'
            href={`/chores/${chore.id}`}>
            <h3>{chore.title.toUpperCase()}</h3>
            <div className='flex justify-evenly text-center'>
                <div>
                    <p className='text-sm'>{chore.user.username}</p>
                </div>
                <div>
                    <p className={`${chore.completed ? 'text-green-500' : 'text-red-500'} text-sm`}>
                        {chore.completed ? 'Completed' : 'Not Completed'}
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default Chore