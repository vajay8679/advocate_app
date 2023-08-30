export const environment = 'local';//

const Configurations = {
    development: {
        apiUrl: 'http://bu-app.demo/api',
        appUrl: 'http://bu-app.demo/',
        mediaUrl: 'http://bu-app.demo/',
        facebookAppId: '',
        assetDir: 'admin-app',
    },
    local: {
        apiUrl: 'http://localhost:8000/api',
        appUrl: 'http://localhost:8000/',
        mediaUrl: 'http://localhost:8000/',
        facebookAppId: '',
        assetDir: 'admin-app',
    },
    stage: {
        apiUrl: '',
        mediaUrl: '',
        appUrl: '',
        facebookAppId: ''
    },
}

const Configuration = Configurations[environment];

export default Configuration;
