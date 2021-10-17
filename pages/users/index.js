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
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { deleteUser } from '../../redux/actions/user';
import ActionTypes from '../../redux/actions/actionTypes';
import Layout from '../../components/Layout';

export default function Users(props) {
    const router = useRouter()
    const dispatch = useDispatch();
    const users = useSelector((state) => state.user);

    useEffect(() => {
        if (users.length === 0) {
            dispatch({
                type: ActionTypes.USER_UPDATE_STORE,
                payload: props.users
            });
        }
        dispatch({ type: ActionTypes.END_LOADING });

    }, [users])

    const deleteUserOnclick = (id) => {
        dispatch(deleteUser(id));
    }

    return (
        <>
            <Layout>
                <div>
                    <h1 className="d-flex justify-content-center user-list" color="dark">User List</h1>
                    <div className="d-flex justify-content-end p-3">
                        <Link href="/users/new" style={{ right: 0 }}>
                            <Button variant="contained" color="primary" style={{ float: 'right', marginTop: '10px', right: '18px' }}>Add New User</Button>
                        </Link>
                    </div>
                </div>
                <TableContainer className="" component={Paper}>
                    <Table className="" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell align="right">ID</TableCell>
                                <TableCell align="right">User Name</TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell align="right">Address</TableCell>
                                <TableCell align="right">Phone</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users && users.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                    </TableCell>
                                    <TableCell style={{ maxWidth: "200px" }} align="right">{row?.id}</TableCell>
                                    <TableCell align="right">{row?.userName}</TableCell>
                                    <TableCell align="right">{row?.email}</TableCell>
                                    <TableCell align="right">{row?.address}</TableCell>
                                    <TableCell align="right">{row?.phone}</TableCell>
                                    <TableCell align="right">
                                        <Link href={`/users/${row?.id}`}>
                                            <Button variant="contained" color="primary">Edit</Button>
                                        </Link>
                                        <Button variant="contained" className="ml-2" color="primary" onClick={() => deleteUserOnclick(row.id)}>Delete</Button>
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

export async function getServerSideProps() {
    const res = await fetch('http://localhost:3000/api/user')
    const users = await res.json()
    if (!users) {
        return {
            notFound: true,
        }
    }

    return {
        props: { users },
    }
}