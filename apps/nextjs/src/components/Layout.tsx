import React from 'react'
import Nav from './nav/Nav'

//types
import type { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <div className='max-w-7xl flex flex-col gap-2'>
            <Nav />
            <main className='mb-14 min-full'>{children}</main>
        </div>
    )
}

export default Layout