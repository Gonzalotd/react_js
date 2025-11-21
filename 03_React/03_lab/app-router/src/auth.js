let isAuthenticated = false;

export const getAuth = () => isAuthenticated;

export const setAuth = ( value ) => {
    isAuthenticated = value;
}