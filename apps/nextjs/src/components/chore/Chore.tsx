
import React from 'react'
//Types
import type { RouterOutputs } from '~/utils/api'
import type { User } from '../../types/global'
import Link from 'next/link'

type choreWithUser = RouterOutputs['user']['getUsersChores'][number] & { user: User }

const Chore = ({ ...chore }: choreWithUser) => {
    return (
        <Link className='flex flex-col border-2 rounded-lg bg-slate-900 text-center' href={`/chores/${chore.id}`}>
            <h3>{chore.title.toUpperCase()}</h3>
            <div className='flex justify-evenly'>
                <div>
                    <h3>{chore.user.username}</h3>
                </div>
                <div className=''>
                    <h3 className={`${chore.completed ? 'text-green-500' : 'text-red-500'}`}>
                        {chore.completed ? 'Completed' : 'Not Completed'}
                    </h3>
                </div>
            </div>
        </Link>
    )
}

export default Chore