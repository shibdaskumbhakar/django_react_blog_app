import { authUrl, blogUrl } from "../config/config";
import { get_config } from "../utils";
import axios from "axios";

export const loginAction = async (data) => {
    const res = await axios.post(authUrl.login, data);
    return res
}

export const registerAction = async (data) => {
    const res = await axios.post(authUrl.register, data);
    return res
}

export const forgotPasswordAction = async (data) => {
    const res = await axios.post(authUrl.forgotPassword, data);
    return res
}

export const savePasswordAction = async (data) => {
    const res = await axios.post(authUrl.savePassword, data);
    return res
}

export const getAllPost = (page_no=1) =>{
    let url = blogUrl.getAllPost + `?page=${page_no}`
    const res = axios.get(url)
    return res
}

export const getSinglePost = (slug) =>{
    let url = blogUrl.getAllPost + slug
    const res = axios.get(url)
    return res
}

export const createNewPost = (data) =>{
    const res = axios.post(blogUrl.createPost, data, get_config());
    return res
}

export const updatePost = (data, slug) =>{
    let url = blogUrl.getAllPost + slug +'/'
    const res = axios.put(url, data, get_config());
    return res
}

export const deletePost = (slug) =>{
    let url = blogUrl.getAllPost + slug +'/'
    const res = axios.delete(url, get_config());
    return res
}

export const ownerPosts = (page_no) =>{
    let url = blogUrl.getAllPost + `?page=${page_no}`
    const res = axios.get(url, get_config())
    return res
}

export const revokeAccessToken = (data) =>{
    const res = axios.post(authUrl.logout,data, get_config())
    return res
}