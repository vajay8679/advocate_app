import jwtAxios from "../@crema/services/auth/jwt-auth";
import ResponseService from "./ResponseService";

export const createItem = async (reqData) => {
    return jwtAxios.post('/admin/users', reqData)
        .then(ResponseService.handleSuccessResponse)
        .catch(ResponseService.handleErrorResponse);
}

export const updateItem = async (uuid, reqData) => {
    return jwtAxios.patch(`/admin/users/${uuid}`, reqData)
        .then(ResponseService.handleSuccessResponse)
        .catch(ResponseService.handleErrorResponse);
}

export const deleteItem = async (uuid) => {
    return jwtAxios.delete(`/admin/users/${uuid}`)
        .then(ResponseService.handleSuccessResponse)
        .catch(ResponseService.handleErrorResponse);
}

export const findItem = async (uuid) => {
    return jwtAxios.get(`/admin/users/${uuid}`)
        .then(ResponseService.handleSuccessResponse)
        .catch(ResponseService.handleErrorResponse);
}

export const listItem = async (reqData = {}) => {
    return jwtAxios.get(`/admin/users`, {params: reqData})
        .then(ResponseService.handleSuccessResponse)
        .catch(ResponseService.handleErrorResponse);
}

export const sendNewPassword = async (uuid) => {
    return jwtAxios.get(`/admin/users/send-new-password/${uuid}`)
        .then(ResponseService.handleSuccessResponse)
        .catch(ResponseService.handleErrorResponse);
}

const UserService = {
    createItem,
    updateItem,
    deleteItem,
    findItem,
    listItem,
    sendNewPassword,
}
export default UserService;
