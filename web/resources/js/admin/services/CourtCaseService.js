import jwtAxios from "../@crema/services/auth/jwt-auth";
import ResponseService from "./ResponseService";

export const createItem = async (reqData) => {
  return jwtAxios.post('/court-case', reqData)
    .then(ResponseService.handleSuccessResponse)
    .catch(ResponseService.handleErrorResponse);
}

export const updateItem = async (uuid, reqData) => {
  return jwtAxios.patch(`/court-case/${uuid}`, reqData)
    .then(ResponseService.handleSuccessResponse)
    .catch(ResponseService.handleErrorResponse);
}

export const deleteItem = async (uuid) => {
  return jwtAxios.delete(`/court-case/${uuid}`)
    .then(ResponseService.handleSuccessResponse)
    .catch(ResponseService.handleErrorResponse);
}

export const findItem = async (uuid) => {
  return jwtAxios.get(`/court-case/${uuid}`)
    .then(ResponseService.handleSuccessResponse)
    .catch(ResponseService.handleErrorResponse);
}

export const listItem = async (reqData = {}) => {
  return jwtAxios.get(`/court-case`, {params: reqData})
    .then(ResponseService.handleSuccessResponse)
    .catch(ResponseService.handleErrorResponse);
}

export const deleteCaseFile =(uuid) => {
  return jwtAxios.delete(`/court-case-file/${uuid}`)
    .then(ResponseService.handleSuccessResponse)
    .catch(ResponseService.handleErrorResponse);
}

export const addCaseFile =(reqData) => {
  return jwtAxios.post('/court-case-file', reqData)
    .then(ResponseService.handleSuccessResponse)
    .catch(ResponseService.handleErrorResponse);
}

const CourtCaseService = {
  createItem,
  updateItem,
  deleteItem,
  findItem,
  listItem,
  deleteCaseFile,
  addCaseFile
}
export default CourtCaseService;
