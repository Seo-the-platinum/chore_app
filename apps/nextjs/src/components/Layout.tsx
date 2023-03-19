import React from 'react'
import Nav from './nav/Nav'
import type { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <div className='max-w-7xl min-full flex-grow'>
            <Nav />
            <main>{children}</main>
        </div>
    )
}

export default Layout