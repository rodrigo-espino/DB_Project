import {Navbar} from './Navbar'

export function Layout({children}) {
    return (
        <>
        <Navbar/>
        <main className='container py-4'>
        {children}
        </main>
        </>
    )
}