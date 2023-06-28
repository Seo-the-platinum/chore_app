import React from 'react'
import Nav from './nav/Nav'

//types
import type { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <div className='flex flex-col gap-6 w-full items-center'>
            <Nav />
            <main className='mb-14 min-full'>{children}</main>
        </div>
    )
}

export default Layout