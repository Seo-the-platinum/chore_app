
import React from 'react'
import type { RouterOutputs } from '~/utils/api'
import type { User } from '../../types/global'

type choreWithUser = RouterOutputs['user']['getUsersChores'][number] & { user: User }
const Chore = ({ ...chore }: choreWithUser) => {
    console.log(chore.completed)
    return (
        <div className='flex flex-col border-2 rounded-lg bg-slate-900'>
            <h3>{chore.title}</h3>
            <h3>{chore.user.username}</h3>
            <h3>{chore.due.toLocaleDateString()}</h3>
            <h3>{chore.completed ? 'Completed' : 'Not Completed'}</h3>
        </div>
    )
}

export default Chore