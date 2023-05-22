import React, { useRef } from 'react'
import type { GetServerSideProps } from 'next'
import { getServerSession } from "next-auth/next"
import { authOptions } from '../../../../packages/auth/src/auth-options'
import type { User } from '../types/global'

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getServerSession(context.req, context.res, authOptions)
    const user = session?.user

    if (user?.username) {
        return {
            redirect: {
                destination: '/homes',
                permanent: false,
            }
        }
    } else if (user) {
        return {
            props: {
                user
            },
        }
    } else {
        return {
            props: {},
        }
    }
}

type OnboardingProps = {
    user: User;
}
const Onboarding = ({ user }: OnboardingProps) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const username = inputRef.current?.value
        console.log(username)
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input ref={inputRef} type='text' />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default Onboarding

