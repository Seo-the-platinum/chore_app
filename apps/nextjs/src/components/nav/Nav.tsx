import React from 'react'
import Header from './Header'
import Footer from './Footer'
import ResizeHook from '~/utils/ResizeHook'
import { signIn, signOut } from "next-auth/react";
import { api } from '~/utils/api'
import Link from 'next/link'
import { BsFillEnvelopeFill } from "react-icons/bs";

const Nav = () => {
    const width = ResizeHook()
    const { data: session } = api.auth.getSession.useQuery()
    const { data: invites } = api.user.getUserInvites.useQuery(undefined, { enabled: !!session })

    const handleSignIn = async () => {
        await signIn(undefined, { callbackUrl: "/onboarding" })
    }
    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/' })
    }
    return (
        <div className='flex justify-between gap-10 z-10'>
            <Link className="pl-4 text-slate-50 text-4xl font-extrabold tracking-tight self-start" href='/'>
                Chore <span className='text-emerald-500'>App</span>
            </Link>
            {
                width < 640 ? <Footer /> :
                    <Header />
            }
            {
                session ?
                    <div className='flex gap-4'>
                        {
                            invites && invites.length > 0 && <Link className='flex justify-center relative' href={`/invites/${session.user.id}`}>
                                <BsFillEnvelopeFill className='fill-slate-50' size='2em' />
                                <p className='absolute left-3/4 rounded-full bg-red-500 w-4 h-4 text-center text-sm'>{invites.length}</p>
                            </Link>
                        }

                        <button
                            className='rounded-xl p-1 text-slate-100 bg-emerald-500 w-20 h-10'
                            onClick={() => void handleSignOut()}>Sign Out
                        </button>
                    </div>
                    :
                    <button
                        className='rounded-xl p-1 text-slate-100 bg-emerald-500 w-20 h-10'
                        onClick={() => void handleSignIn()}>Sign In
                    </button>
            }
        </div>
    )
}

export default Nav