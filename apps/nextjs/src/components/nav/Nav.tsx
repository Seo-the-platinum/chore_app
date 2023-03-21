import React from 'react'
import Header from './Header'
import Footer from './Footer'
import ResizeHook from '~/utils/ResizeHook'
import { signIn, signOut } from "next-auth/react";
import { api } from '~/utils/api'
import { MdAddCircleOutline } from "react-icons/md";
import Link from 'next/link'

const Nav = () => {
    const width = ResizeHook()
    const { data: session } = api.auth.getSession.useQuery()
    console.log(session)
    return (
        <div className='flex justify-end gap-10'>
            {
                width < 640 ? <Footer /> :
                    <Header />
            }
            {
                session ?
                    <>
                        <Link className='flex items-center' href='/addHome' > <p className='text-slate-300'>Add Home</p>
                            <MdAddCircleOutline className='fill-emerald-500 w-4 h-4 sm:w-10 sm:h-10' />
                        </Link>
                        <button
                            className='rounded p-1 text-slate-100 bg-emerald-500'
                            onClick={() => void signOut()}>Sign Out</button>
                    </>
                    :
                    <button
                        className='rounded p-1 text-slate-100 bg-emerald-500'
                        onClick={() => void signIn()}>Sign In</button>
            }
        </div>
    )
}

export default Nav