import jwtAxios from "../@crema/services/auth/jwt-auth";
import ResponseService from "./ResponseService";

export const createItem = async (reqData) => {
  return jwtAxios.post('/admin/bank-branch', reqData)
    .then(ResponseService.handleSuccessResponse)
    .catch(ResponseService.handleErrorResponse);
}

export const updateItem = async (uuid, reqData) => {
  return jwtAxios.patch(`/admin/bank-branch/${uuid}`, reqData)
    .then(ResponseService.handleSuccessResponse)
    .catch(ResponseService.handleErrorResponse);
}

export const deleteItem = async (uuid) => {
  return jwtAxios.delete(`/admin/bank-branch/${uuid}`)
    .then(ResponseService.handleSuccessResponse)
    .catch(ResponseService.handleErrorResponse);
}

export const findItem = async (uuid) => {
  return jwtAxios.get(`/admin/bank-branch/${uuid}`)
    .then(ResponseService.handleSuccessResponse)
    .catch(ResponseService.handleErrorResponse);
}

export const listItem = async (reqData = {}) => {
  return jwtAxios.get(`/admin/bank-branch`, {params: reqData})
    .then(ResponseService.handleSuccessResponse)
    .catch(ResponseService.handleErrorResponse);
}

const BankService = {
  createItem,
  updateItem,
  deleteItem,
  findItem,
  listItem,
}
export default BankService;
