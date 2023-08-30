import jwtAxios from "../@crema/services/auth/jwt-auth";
import ResponseService from "./ResponseService";

export const createItem = async (reqData) => {
  return jwtAxios.post('/admin/bank-branches', reqData)
    .then(ResponseService.handleSuccessResponse)
    .catch(ResponseService.handleErrorResponse);
}

export const updateItem = async (uuid, reqData) => {
  return jwtAxios.patch(`/admin/bank-branches/${uuid}`, reqData)
    .then(ResponseService.handleSuccessResponse)
    .catch(ResponseService.handleErrorResponse);
}

export const deleteItem = async (uuid) => {
  return jwtAxios.delete(`/admin/bank-branches/${uuid}`)
    .then(ResponseService.handleSuccessResponse)
    .catch(ResponseService.handleErrorResponse);
}

export const findItem = async (uuid) => {
  return jwtAxios.get(`/admin/bank-branches/${uuid}`)
    .then(ResponseService.handleSuccessResponse)
    .catch(ResponseService.handleErrorResponse);
}

export const listItem = async (reqData = {}) => {
  return jwtAxios.get(`/admin/bank-branches`, {params: reqData})
    .then(ResponseService.handleSuccessResponse)
    .catch(ResponseService.handleErrorResponse);
}

const BankBranchesService  = {
  createItem,
  updateItem,
  deleteItem,
  findItem,
  listItem,
}
export default BankBranchesService ;
