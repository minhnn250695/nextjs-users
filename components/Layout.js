import { useEffect } from "react";
import { useSelector } from "react-redux";
import style from '../styles/loading.module.css'
import { LinearProgress } from '@material-ui/core'

function Layout({ children }) {
    const base = useSelector((state) => state.base)
    useEffect(() => {
    }, [base]);
    return (
        <>
            {base && base.isLoading && <div className={style.loading}><LinearProgress /></div>}
            <div className="h-screen p-6">
                <div style={{ height: 'calc(100vh - 128px)' }}>{children}</div>
            </div >
        </>
    )
}

export default Layout;