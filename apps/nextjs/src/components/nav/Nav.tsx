import React from 'react'
import Header from './Header'
import Footer from './Footer'
import ResizeHook from '~/utils/ResizeHook'
import { signIn, signOut } from "next-auth/react";
import { api } from '~/utils/api'

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
                    <button
                        className='rounded p-1 text-slate-100 bg-emerald-500'
                        onClick={() => void signOut()}>Sign Out</button> :
                    <button
                        className='rounded p-1 text-slate-100 bg-emerald-500'
                        onClick={() => void signIn()}>Sign In</button>
            }
        </div>
    )
}

export default Nav