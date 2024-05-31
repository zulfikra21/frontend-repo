import { updateUser } from "@/apis/usersApi";
import { setLoading } from "@/store/actions";
import { LoadingButton } from "@mui/lab";
import { Button, Dialog, DialogContent, DialogTitle, Grid, Modal, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface UpdateModalProps {
    showModal: boolean
    user: { name: string, email: string, id: string, password: string, onHide: () => void}
    onHide: () => void
}

export function UpdateModal({ showModal, user, onHide }: UpdateModalProps) {
    const [_user, setUser] = useState({
        name:"",
        email:"",
        password:"",
    })
    const dispatch = useDispatch();
    const loading = useSelector((state: any) => state.global.isLoading)
    const token = useSelector((state: any) => state.global.token)
    useEffect(() => {
        setUser(user)
    },[user])

    async function submitUpdateUser() {
        dispatch(setLoading(true));
        const res = await updateUser(token, _user)
        dispatch(setLoading(false));
        if(res.status !== "SUCCESS") {
            alert(res.message)
            return
        }
        onHide()
        alert("User updated successfully")
        window.location.reload()
    }

    return (
        <>
            <Dialog
                onClose={onHide }
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                open={showModal}>
                <DialogTitle>{"Update users"}</DialogTitle>
                <DialogContent>
                    <Grid display={"flex"} direction={"column"} gap={2}>
                        <TextField onChange={(e) => setUser({ ..._user, name: e.target.value })} value={_user?.name} label="name" />
                        <TextField onChange={(e) => setUser({ ..._user, email: e.target.value })} value={_user?.email} label="email" />
                        <TextField onChange={(e) => setUser({ ..._user, password: e.target.value })} value={_user?.password} label="password" />

                        <LoadingButton loading={loading} onClick={submitUpdateUser} variant="contained">Update</LoadingButton>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    )
}