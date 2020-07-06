
export const getUrlPath = () => {
    let path = window.location.pathname
    let newPath;
    if(path === '/'){
        newPath = localStorage.getItem('path') ? localStorage.getItem('path'):null
    } else {
        const splitPath = path.split("/");
        newPath = splitPath[1];
        localStorage.setItem('path', newPath)
    }
    return newPath;
}