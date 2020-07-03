
export const getUrlPath = () => {
    let path = window.location.pathname
    let newPath;
    if(path === '/'){
        newPath = 'creditor'
    } else {
        const splitPath = path.split("/");
        newPath = splitPath[1];
    }
    return newPath;
}