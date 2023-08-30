import jwtAxios from "../@crema/services/auth/jwt-auth";
import ResponseService from "./ResponseService";

const upload = (section, file) => {
  const formData = new FormData();
  //formData.append( "file", file, file.name);
  formData.append( "image", file, file.name);
  formData.append( "media_section", section);
  return jwtAxios.post(`/upload`, formData, {headers: { "Content-Type": "multipart/form-data" }})
    .then(ResponseService.handleSuccessResponse)
    .catch(ResponseService.handleErrorResponse);
}

const UploadService = {
  upload
}
export default UploadService;
