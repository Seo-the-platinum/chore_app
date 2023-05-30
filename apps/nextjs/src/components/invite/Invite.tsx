import React from 'react'
import type { InviteProps } from '~/types/global'

const Invite = ({ invite, mutate }: InviteProps) => {

    const handleAccept = () => {
        mutate({ inviteId: invite.id, accepted: true })
    }
    const handleDecline = () => {
        mutate({ inviteId: invite.id, accepted: false })
    }

    return (
        <div className='flex items-center justify-between px-2 border-4 border-slate-800 rounded-lg bg-slate-50'>
            <p>{`${invite?.house?.admin?.username} invited you to ${invite?.house?.name}`}</p>
            <div className='flex  gap-4'>
                <button className='text-emerald-500 font-bold' onClick={handleAccept}>Accept</button>
                <button className='text-red-500 font-bold' onClick={handleDecline}>Decline</button>
            </div>
        </div>
    )
}

export default Invite