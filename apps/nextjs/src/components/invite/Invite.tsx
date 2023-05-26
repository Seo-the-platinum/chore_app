import React from 'react'
import type { InviteProps } from '~/types/global'

const Invite = ({ invite }: InviteProps) => {
    return (
        <div className='border-2 border-white rounded-lg bg-slate-500 bg-opacity-50'>
            <ul className='flex'>
                <li>{invite?.house?.name}</li>
                <li>{invite?.house?.admin?.username}</li>
            </ul>
        </div>
    )
}

export default Invite