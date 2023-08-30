import jwtAxios from "../@crema/services/auth/jwt-auth";
import ResponseService from "./ResponseService";

const changePassword = async (currentPassword, password, passwordConfirm) => {
  return jwtAxios.post('/change-password', {
    current_password: currentPassword,
    password: password,
    password_confirmation: passwordConfirm,
  })
    .then(ResponseService.handleSuccessResponse)
    .catch(ResponseService.handleErrorResponse);
}

const updateProfileInfo = async (reqData) => {
  return jwtAxios.post(`/profile`, reqData)
    .then(ResponseService.handleSuccessResponse)
    .catch(ResponseService.handleErrorResponse);
}

const UserProfileService = {
  changePassword,
  updateProfileInfo,
};

export default UserProfileService
