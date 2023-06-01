import React from 'react'
import { api } from '~/utils/api'

const Chores = () => {
    const { data: chores } = api.user.getUsersChores.useQuery()
    return (
        <div>
            <h1>My Chores</h1>
        </div>
    )
}

export default Chores