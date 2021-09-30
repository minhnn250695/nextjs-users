import { useRouter } from 'next/router'

export default function Header() {
    return (
        <div style={{ fontSize: 'xx-large' }}>
            <Link href="/users" >
                <span> User</span>
            </Link>
            <Link href="/tasks">Task</Link>
        </div>
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
