import jwtAxios from "../@crema/services/auth/jwt-auth";
import ResponseService from "./ResponseService";


export const fetchDashboardReport = async (reqData = {}) => {
  return jwtAxios.get(`/dashboard-view`, { params: reqData })
    .then(ResponseService.handleSuccessResponse)
    .catch(ResponseService.handleErrorResponse);
}

const DashboardService = {
  fetchDashboardReport
}
export default DashboardService;
