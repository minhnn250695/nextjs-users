import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout';
import ActionTypes from '../../redux/actions/actionTypes';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {deleteTask} from '../../redux/actions/task'

export default function Tasks(props) {
    const router = useRouter()
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.task);

    useEffect(() => {
        if (tasks.length === 0) {
            dispatch({
                type: ActionTypes.TASK_UPDATE_STORE,
                payload: props.tasks
            });
        }
        dispatch({ type: ActionTypes.END_LOADING });

    }, [tasks])
    const onClickDeleteTask = (id) => {
        dispatch(deleteTask(id));
    }
    return (
        <>
            <Layout>
                <div>
                    <h1 className="d-flex justify-content-center user-list" color="dark">Task List</h1>
                    <div className="d-flex justify-content-end p-3">
                        <Link href="/tasks/new">
                            <Button variant="contained" color="primary" style={{ float: 'right', marginTop: '10px', right: '18px' }} >Add New Task</Button>
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
                            {tasks && tasks.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
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

                <Button type="button" variant="contained" color="primary" style={{ float: 'right', marginTop: '30px', right: '18px' }} onClick={(e) => {
                    e.preventDefault()
                    router.push('/')
                }}>Back To Home
                </Button>
            </Layout>
        </>
    );
}

export async function getStaticProps({ params }) {
    const res = await fetch('http://localhost:3000/api/task');
    const tasks = await res.json();
    return {
        props: {
            tasks
        }
    }
}