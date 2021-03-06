export const  formatBytes = (bytes, decimals) => {
    if(bytes === 0) return '0 Bytes';
    let k = 1000,
        dm = decimals || 2,
        sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const textValidation = (e) => {
    let regexp = /[а-яА-ЯёЁa-zA-Z]/;
    if (e.match(regexp)){
       return true
    } else{
        return false
    }
};