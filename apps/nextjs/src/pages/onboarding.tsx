import React, { useRef } from 'react'
import type { GetServerSideProps } from 'next'
import { getServerSession } from "next-auth/next"
import { authOptions } from '../../../../packages/auth/src/auth-options'
import { api } from '~/utils/api'
import Button from '~/components/buttons/Button'

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getServerSession(context.req, context.res, authOptions)
    const user = session?.user

    if (user?.username) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    } else {
        return {
            props: {},
        }
    }
}

const Onboarding = () => {
    const inputRef = useRef<HTMLInputElement>(null)
    const { mutate } = api.user.addUsername.useMutation()
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const username = inputRef.current?.value
        username && mutate(username)
    }
    return (
        <div>
            <form className='flex flex-col items-center gap-4 text-slate-50' onSubmit={handleSubmit}>
                <div className='flex flex-col'>
                    <label>Create Username</label>
                    <input
                        className='
                            rounded-lg text-black 
                            focus:outline-none focus:border-blue-600 
                            focus:border-2'
                        ref={inputRef}
                        type='text' />
                </div>
                <Button type='submit' label='Submit' />
            </form>
        </div>
    )
}

export default Onboarding

