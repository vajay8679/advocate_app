import jwtAxios from "../@crema/services/auth/jwt-auth";
import ResponseService from "./ResponseService";

export const listItem = async (reqData = {}) => {
  return jwtAxios.get(`/permission`, {params: reqData})
    .then(ResponseService.handleSuccessResponse)
    .catch(ResponseService.handleErrorResponse);
}

const PermissionService = {
  listItem
}
export default PermissionService;
