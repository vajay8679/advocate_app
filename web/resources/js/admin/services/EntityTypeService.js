import jwtAxios from "../@crema/services/auth/jwt-auth";
import ResponseService from "./ResponseService";

export const listItem = async (reqData = {}) => {
  return jwtAxios.get(`/admin/entity-type`, {params: reqData})
    .then(ResponseService.handleSuccessResponse)
    .catch(ResponseService.handleErrorResponse);
}
const EntityTypeService = {
  listItem
}
export default EntityTypeService;
