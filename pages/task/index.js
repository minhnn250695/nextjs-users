import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Link from 'next/link'
import Constant from '../constant/index';

export default function Tasks(props) {
    return (
        <>
            <div>
                <h1 className="d-flex justify-content-center user-list" color="dark">Task List</h1>
                <div className="d-flex justify-content-end p-3">
                    <Link href="/tasks/new">
                        <Button variant="contained" color="primary" >Add New Task</Button>
                    </Link>
                </div>
            </div>
            <TableContainer className="" component={Paper}>
                <Table className="" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell align="right">ID</TableCell>
                            <TableCell align="right">Task Name</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.tasks && props.tasks.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell style={{ maxWidth: "200px" }} align="right">{row.id}</TableCell>
                                <TableCell align="right">{row.taskName}</TableCell>
                                <TableCell align="right">
                                    <Link href={`/tasks/${row.id}`}>
                                        <Button variant="contained" color="primary">Edit</Button>
                                    </Link>
                                    <Button variant="contained" className="ml-2" color="primary" onClick={() => onClickDeleteTask(row.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export async function getServerSideProps() {
    const res = await fetch(Constant.baseURL + Constant.getAllTask)
    const tasks = await res.json()
    if (!tasks) {
        return {
            notFound: true,
        }
    }

    return {
        props: { tasks },
    }
}