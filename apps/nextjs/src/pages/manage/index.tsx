import React from 'react'
import { api } from '~/utils/api'

const Manage = () => {
    const { data: session } = api.auth.getSession.useQuery()
    return (
        <div className='flex flex-col items-center text-emerald-500'>
            <h1>Manage Homes</h1>
            {
                session ? <div> something here </div> : <h1>Please Login to manage homes</h1>
            }
        </div>
    )
}

export default Manage