import axios from "axios";
import { redirect } from "express/lib/response";
import cookie from "js-cookie";
import Router  from "next/router";
import { parseCookies } from "nookies";


export const setToken = (token) => {
    cookie.set("token", token)
    Router.push('/');
}


export const redirectUser = (ctx, location) => {
    if(ctx.req){
        ctx.res.writeHead(302, {location: location})
        ctx.res.end()
    } else {
        Router.push(location)
    }
}


export const checkToken = async (ctx) => {
    const {token} = parseCookies(ctx)
    let pageProps = {}

    const protectedRoutes = ctx.pathname === '/';

    if(!token && protectedRoutes) {
        redirectUser(ctx, "/login");
    } else {
        try {
            const res = await axios.get('/api/v1/auth', {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })

            const {user, followData} = res.data 

            if(user){
                
            }
        } catch (error) {
            redirectUser(ctx, "/login")
        }
    }
}