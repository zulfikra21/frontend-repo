
export async function fetchUsers(token: string) {
    let baseUrl = (process.env.BACKEND) ?  process.env.BACKEND : process.env.NEXT_PUBLIC_BACKEND_URL;

    if(typeof window === undefined) return 
    let res = await fetch(`${baseUrl}/fetch-user-data`, {
        headers:{
            "Authorization":`Bearer ${token}`
        }
    }).then((res) => res.json())

    return res
}


export async function updateUser(token: string, data: any) {
    let baseUrl = (process.env.BACKEND) ?  process.env.BACKEND : process.env.NEXT_PUBLIC_BACKEND_URL;
    if(typeof window === undefined) return 
    let res = await fetch(`${baseUrl}/update-user-data`, {
        method: "PUT",
        headers:{
            "Content-Type": "application/json",
            "Authorization":`Bearer ${token}`
        },
        body: JSON.stringify(data)
    }).then((res) => res.json()) 
    return res
}