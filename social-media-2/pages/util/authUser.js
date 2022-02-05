import cookie from "js-cookie";
import Router  from "next/router";


export const setToken = (token) => {
    cookie.set("token", token)
    Router.push('/');
}