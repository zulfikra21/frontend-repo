import { Grid, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {  useState } from "react";
import { useDispatch, useSelector, } from "react-redux";
import { setLoading, saveToken } from "@/store/actions";
import { useRouter } from "next/navigation";
import { wrapper } from "@/store/store";
import Cookie from "js-cookie"
import cookie from "cookie"


export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {

    let cookies: string  = context.req.headers.cookie || "";
    let parseCookie = cookie.parse(cookies);
    store.dispatch(saveToken(parseCookie.token))
    return { props: {} };
  });


function Login() {
 
    const dispatch = useDispatch()
    const router = useRouter();
    const isLoading = useSelector((state: any) => state.global.isLoading)
    // const isLoading = useSelector((state: any) => state.global.isLoading)
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })
    async function onSubmit(e: any) {
        dispatch(setLoading(true));
        dispatch(saveToken("hello world"))

        try {
            const res = await window.fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: userData.email,
                    password: userData.password
                })
            })
            dispatch(setLoading(false));
            let response = await res.json();
            if(response.status !== "SUCCESS") {
                throw response.message
            }
            dispatch(saveToken("hello world"))
            Cookie.set("token", response.data.token);
            router.push("/")
        } catch (error) {
            // dispatch(setLoading(false));

            alert("Invalid Credentials")
            console.log(error)
        }
    }

    return (
        <Grid container direction={"row"} justifyContent="center" marginTop={20}>
            <Grid lg={2} item display={"flex"} gap={2} direction={"column"}>
                <TextField value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} name="email" id="outlined-basic" label="Email" variant="outlined" />
                <TextField value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} name="password" type="password" id="outlined-basic" label="Password" variant="outlined" />
                <LoadingButton onClick={onSubmit} variant="contained" loading={isLoading} >Login</LoadingButton>
            </Grid>
        </Grid>
    )
}

export default Login