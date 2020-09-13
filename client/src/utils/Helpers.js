import cookie from 'js-cookie';

export const setCookie = (key, value) => {
    cookie.set(key, value, {
        expires: 1,
    });
};
export const removeCookie = (key) => {
    cookie.remove(key, {
        expires: 1,
    });
};

export const getCookie = (key) => {
    return cookie.get(key);
};

export const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const removeLocalStorage = (key) => {
    localStorage.removeItem(key);
};

export const setClientData = (response, next) => {
    setCookie('token', response.data.token);
    setLocalStorage('user', response.data.user);
    next();
};

export const isAuthenticated = () => {
    const cookieChecked = getCookie('token');
    if (cookieChecked) {
        return localStorage.getItem('user') !== 'undefined';
    }
};

export const getAuthenticatedUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

export const removeAuthenticatedUser = (next) => {
    removeCookie('token');
    removeLocalStorage('user');
    next();
};

//sadasd
export const updateUser = (response, next) => {
    let auth = JSON.parse(localStorage.getItem('user'));
    auth = response.data;
    localStorage.setItem('user', JSON.stringify(auth));
    next();
};
