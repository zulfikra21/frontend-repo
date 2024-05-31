import React, { useState } from 'react';
import Image from "next/image";
import { Button, Container, Grid } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { wrapper } from '@/store/store';
import { fetchUsers } from '@/apis/usersApi';
import cookie from "cookie"
import { saveToken, setLoading } from '@/store/actions';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { UpdateModal } from '@/components/UpdateModal';


function Page({ token, users }: any) {
  // parse from stringify
  const [selectionUser, selectUser] = useState<any>({})
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch()
  dispatch(setLoading(false))

  let _users = JSON.parse(users);
  if (!token) {
    return (
      <Grid>
        <Grid item>
          <span>Page is not found</span>
        </Grid>
      </Grid>
    )
  }
  // initial columns for table label
  let columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 70 },

  ]

  return (
    <Grid display={"flex"} direction={"column"} justifyContent={"center"} >
      <Grid item>
        <DataGrid
          rows={_users}
          columns={columns}
          onRowSelectionModelChange={(row) => {
            let user = _users.find((u: any) => u.id === row[0])
            selectUser(user)
          }}
          checkboxSelection
        />
      </Grid>
      <Grid>
        <Button variant="contained" disabled={!selectionUser?.id} onClick={() => setShowModal(true)}>Update User</Button>
        <UpdateModal onHide={() => setShowModal(false)} showModal={showModal} user={selectionUser} />
      </Grid>
    </Grid>
  );
}



export default Page

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    let state: any = store.getState();
    if (state.global.token === "") {
      let token = cookie.parse(context.req.headers?.cookie || "")?.token;
      store.dispatch(saveToken(token));
      state.global.token = token;
    }
    // console.log(store.getState().global)
    let users = await fetchUsers(state.global?.token);
    let status = users.status
    let userList = users.data
    if (users.status !== "SUCCESS") {
      userList = []
    }
    return {
      props: {
        token: state.global?.token,
        users: JSON.stringify(userList),
        status
      },
    };
  }
);