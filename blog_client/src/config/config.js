export let baseApiUrl = 'http://127.0.0.1:8000/api/v1'

export const authUrl = {
    login: baseApiUrl + '/auth/token',
    register: baseApiUrl + '/auth/register',
    logout: baseApiUrl + '/auth/logout',
    forgotPassword: baseApiUrl + '/auth/forgot-password',
    savePassword: baseApiUrl + '/auth/save-password'
}

export const blogUrl = {
    getAllPost: baseApiUrl + '/blog/post/',
    createPost: baseApiUrl + '/blog/post/',
    ownerPost: baseApiUrl + '/blog/owner/'
}