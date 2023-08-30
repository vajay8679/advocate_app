const parseApiError = (errorResponse)  => {
    let {response} = errorResponse;
    let {data, status} = response;
    let message = data.message || false;
    let errorMessage = message || 'Something went wrong. Please try again later.'
    if(typeof message == 'object'){
        let msg = '';
        for (let [key, value] of Object.entries(message)) {
            msg += `${value} <br id="line${key}"/>`;
        }
        errorMessage = msg;
    }
    return {
        message: errorMessage,
        status
    };
}

const handleSuccessResponse = (response) => {
    let result = {};
    const  {data, status} = response;
    switch (status) {
        case 401:
            result = Promise.reject('Unauthorized access');
            break;
        default:
            result = {
                data: data?.data,
                message: data?.message,
            };
            break;
    }
    return result;
}
const handleErrorResponse = (response) => {
    let errorMessage = 'Something went wrong. Please try again later.';
    if(typeof response === "undefined"){
        errorMessage = 'Please check your network.'
    }else {
        const {message} = parseApiError(response);
        errorMessage = message;
    }
    return Promise.reject(errorMessage);
}
const ResponseService = {
    handleSuccessResponse,
    handleErrorResponse
}
export default ResponseService;
