import jwtAxios from "../@crema/services/auth/jwt-auth";
import ResponseService from "./ResponseService";

export const createItem = async (reqData) => {
  return jwtAxios.post('/admin/pages', reqData)
    .then(ResponseService.handleSuccessResponse)
    .catch(ResponseService.handleErrorResponse);
}

export const updateItem = async (uuid, reqData) => {
  return jwtAxios.patch(`/admin/pages/${uuid}`, reqData)
    .then(ResponseService.handleSuccessResponse)
    .catch(ResponseService.handleErrorResponse);
}

export const deleteItem = async (uuid) => {
  return jwtAxios.delete(`/admin/pages/${uuid}`)
    .then(ResponseService.handleSuccessResponse)
    .catch(ResponseService.handleErrorResponse);
}

export const findItem = async (uuid) => {
  return jwtAxios.get(`/admin/pages/${uuid}`)
    .then(ResponseService.handleSuccessResponse)
    .catch(ResponseService.handleErrorResponse);
}

export const listItem = async (reqData = {}) => {
  return jwtAxios.get(`/admin/pages`, {params: reqData})
    .then(ResponseService.handleSuccessResponse)
    .catch(ResponseService.handleErrorResponse);
}

const PageService = {
  createItem,
  updateItem,
  deleteItem,
  findItem,
  listItem,
}
export default PageService;
