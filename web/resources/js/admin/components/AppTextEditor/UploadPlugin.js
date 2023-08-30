import UploadService from '../../services/UploadService';
import {getMediaUrl} from '../../shared/Helper'

export const uploadAdapter = (loader) => {
  return {
    upload: () => {
      return new Promise((resolve, reject) => {
        loader.file.then((file) => {
          UploadService.upload('ckeditor', file).then(response => {

            if(response.data && response.data.file_url) {
              //const imgagePath = makeImageUrl(response.data.image_url);
              const imgagePath = response.data.file_url;
              console.log('imgagePath', imgagePath);
              return resolve({
                default: imgagePath
              });
            }
            console.log('Error while uploading editor file.', response);
            reject('Something went wrong file uploading file.')
          }).catch(error=> {
            console.log('Error while uploading editor file.', error);
            reject(error);
          })
        });
      });
    }
  };
}

const MyUploadAdapterPlugin = (editor) => {
  editor.plugins.get('FileRepository').createUploadAdapter = function (loader) {
    return uploadAdapter(loader);
  };
}

export default MyUploadAdapterPlugin;
