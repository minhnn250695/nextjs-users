import React, { useEffect } from 'react'
import useUser from '../lib/useUser'
import { useRouter } from 'next/router'


export default function Header() {
    const { authen, mutateUser } = useUser()
    const router = useRouter()
    useEffect(() => {
        console.log('Header authen value', authen);
    }, [authen]);
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link href="/">
                            <span>Home</span>
                        </Link>
                    </li>
                    {!authen?.isLoggedIn && (
                        <li>
                            <Link href="/login">
                                <span>Login</span>
                            </Link>
                        </li>
                    )}
                    {authen?.isLoggedIn && (
                        <>
                            <li>
                                <Link href="/users" >
                                    <span> User</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/tasks">Task</Link>
                            </li>

                            <li>
                                <a
                                    href="/api/logout"
                                    onClick={async (e) => {
                                        e.preventDefault()
                                        mutateUser(
                                            await fetch('/api/logout', { method: 'POST' }),
                                            false
                                        )
                                        router.push('/login')
                                    }}
                                >
                                    Logout
                                </a>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
            <style jsx>{`
            ul {
              display: flex;
              list-style: none;
              margin-left: 0;
              padding-left: 0;
            }
    
            li {
              margin-right: 1rem;
              display: flex;
            }
    
            li:first-child {
              margin-left: auto;
            }
    
            a {
              color: #fff;
              text-decoration: none;
              display: flex;
              align-items: center;
            }
    
            a img {
              margin-right: 1em;
            }
    
            header {
              padding: 0.2rem;
              color: #fff;
              background-color: #333;
            }
          `}</style>
        </header>
    )
}

const Link = ({ children, href }) => {
    const router = useRouter()
    return (
        <a
            href="#"
            onClick={(e) => {
                e.preventDefault()
                router.push(href)
            }}
        >
            {children}
            <style jsx>{`
        a {
          margin-right: 10px;
        }
      `}</style>
        </a>
    )
}
