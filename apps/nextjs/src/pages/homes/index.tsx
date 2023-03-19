import React from 'react'
import { api } from '~/utils/api'

const Homes = () => {
    const { data: session } = api.auth.getSession.useQuery()

    return (
        <div className='flex flex-col items-center text-emerald-500'>
            <h1>My Homes</h1>
            {session ? <div>something here</div> : <h1>Please Login to see your chores</h1>}
        </div>
    )
}

export default Homes