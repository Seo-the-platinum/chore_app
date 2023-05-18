import React from 'react'
import { useRouter } from 'next/router'
import { api } from '~/utils/api'

const HomeDetails = () => {
    const router = useRouter()
    const { data: home } = api.home.getHomeDetails.useQuery({ id: router.query.id as string })

    return (
        <div>
            <h1>Home Details</h1>
            <h3>{home?.name}</h3>
            <h3>{home?.admin.name}</h3>
        </div>
    )
}

export default HomeDetails