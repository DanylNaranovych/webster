import AuthService from '../../services/authService';

export const login = (login, password) => async (dispatch) => {
    try {
        const response = await AuthService.login(login, password);

        dispatch({ type: 'SET_USER', payload: response.data });
        dispatch({ type: 'SET_MESSAGE', payload: 'Login success' });
    } catch (error) {
        console.error('Login failed', error);
        dispatch({ type: 'SET_MESSAGE', payload: error.message });
    }
};

export const registration =
    (email, password, confirmationPassword, login, full_name) =>
    async (dispatch) => {
        try {
            if (password !== confirmationPassword) {
                dispatch({
                    type: 'SET_MESSAGE',
                    payload: 'Password mismatch',
                });
                return;
            }

            await AuthService.register(email, password, login, full_name);
            dispatch({
                type: 'SET_MESSAGE',
                payload:
                    'The user has been successfully registered, please confirm your account, the link has been sent to the mail.',
            });
        } catch (error) {
            dispatch({
                type: 'SET_MESSAGE',
                payload: error.response.data.message,
            });
            console.error('Register failed', error);
        }
    };

export const confirmAccount = (token) => async (dispatch) => {
    try {
        await AuthService.confirmAccount(token);
        dispatch({ type: 'SET_MESSAGE', payload: 'The account is verified!' });
    } catch (error) {
        dispatch({
            type: 'SET_MESSAGE',
            payload: error.response.data.message,
        });
        console.error('Confirmation error', error);
    }
};

export const passwordReset = (email) => async (dispatch) => {
    try {
        await AuthService.passwordReset(email);
        dispatch({
            type: 'SET_MESSAGE',
            payload: 'A link to change the password was sent to the email.',
        });
    } catch (error) {
        dispatch({
            type: 'SET_MESSAGE',
            payload: error.response.data.message,
        });
        console.error('Error when trying to change the password', error);
    }
};

export const setNewPassword = (token, password) => async (dispatch) => {
    try {
        await AuthService.setNewPassword(token, password);
        dispatch({
            type: 'SET_MESSAGE',
            payload: 'Error when trying to change the password',
        });
    } catch (error) {
        dispatch({
            type: 'SET_MESSAGE',
            payload: error.response.data.message,
        });
        console.error('Register failed', error);
    }
};

export const logout = () => async (dispatch) => {
    try {
        await AuthService.logout();
        localStorage.removeItem('token');
        dispatch({ type: 'SET_USER', payload: null });
        dispatch({ type: 'SET_MESSAGE', payload: 'Logout success' });
    } catch (error) {
        dispatch({ type: 'SET_MESSAGE', payload: error.response.data.message });
        console.error('Logout error', error);
    }
};

export const setUser = (user) => {
    return { type: 'SET_USER', payload: user };
};
