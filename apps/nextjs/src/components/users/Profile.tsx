import React from 'react'
import Image from 'next/image'
import HomeWithChores from '../home/HomeWithChores'
//Types
import type { ProfileProps } from '../../types/components/profile'

const Profile = ({ user }: ProfileProps) => {
    return (
        <div className='flex flex-col divide-y-2 divide-indigo-700'>
            <div className='flex items-end gap-4 pb-4'>
                <Image alt='Users Profile Image' className='rounded-full' src={`${user.image ? user.image : '/images/temp.png'}`} width={84} height={84} />
                <h2 className='text-2xl'>{user.username}</h2>
            </div>
            <div className='pt-4 text-center flex-col flex gap-2'>
                <h2 className='text-3xl'>Homes</h2>
                <div className='flex flex-col gap-8'>
                    {
                        user.homes && user.homes.map((home) => {
                            return <HomeWithChores key={home.id} home={home} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile