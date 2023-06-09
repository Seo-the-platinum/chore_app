import React from 'react'
import { api } from '~/utils/api'
import Link from 'next/link'
import { MdAddCircleOutline } from "react-icons/md";
import HomesList from '../../components/home/HomesList'

const Homes = () => {
    const { data: homes } = api.home.getHomes.useQuery()

    return (
        <div className='flex flex-col items-center text-emerald-500'>
            <h1 className='text-4xl'>My Homes</h1>
            <Link
                className='flex items-center text-slate-50 gap-1 text-lg'
                href='/addHome'>
                Add Home
                <MdAddCircleOutline />
            </Link>
            {homes && <HomesList homes={homes} />}
        </div>
    )
}

export default Homes