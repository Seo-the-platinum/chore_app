import React from 'react'
import Nav from './nav/Nav'
import type { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <div className='max-w-7xl min-h-full flex flex-col gap-1'>
            <Nav />
            <main className='min-h-full mb-14 overflow-y-auto'>{children}</main>
        </div>
    )
}

export default Layout