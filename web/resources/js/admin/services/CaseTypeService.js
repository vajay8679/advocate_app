import jwtAxios from "../@crema/services/auth/jwt-auth";
import ResponseService from "./ResponseService";

export const createItem = async (reqData) => {
  return jwtAxios.post('/admin/case-types', reqData)
    .then(ResponseService.handleSuccessResponse)
    .catch(ResponseService.handleErrorResponse);
}

export const updateItem = async (uuid, reqData) => {
  return jwtAxios.patch(`/admin/case-types/${uuid}`, reqData)
    .then(ResponseService.handleSuccessResponse)
    .catch(ResponseService.handleErrorResponse);
}

export const deleteItem = async (uuid) => {
  return jwtAxios.delete(`/admin/case-types/${uuid}`)
    .then(ResponseService.handleSuccessResponse)
    .catch(ResponseService.handleErrorResponse);
}

export const findItem = async (uuid) => {
  return jwtAxios.get(`/admin/case-types/${uuid}`)
    .then(ResponseService.handleSuccessResponse)
    .catch(ResponseService.handleErrorResponse);
}

export const listItem = async (reqData = {}) => {
  return jwtAxios.get(`/admin/case-types`, {params: reqData})
    .then(ResponseService.handleSuccessResponse)
    .catch(ResponseService.handleErrorResponse);
}
export const searchListItem = async (reqData) => {
  return jwtAxios.get(`/court-case-search`, {params: reqData})
    .then(ResponseService.handleSuccessResponse)
    .catch(ResponseService.handleErrorResponse);
}

const CaseTypeService = {
  createItem,
  updateItem,
  deleteItem,
  findItem,
  listItem,
  searchListItem,
}
export default CaseTypeService;
