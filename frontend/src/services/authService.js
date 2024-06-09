import $api from '../http';

export default class AuthService {
    static async login(login, password) {
        return $api.post('auth/login', { login, password });
    }

    static async register(email, password, login, full_name) {
        return $api.post('auth/register', {
            email,
            password,
            login,
            full_name,
        });
    }

    static async confirmAccount(token) {
        return $api.post(`auth/confirm-account/${token}`);
    }

    static async passwordReset(email) {
        return $api.post(`auth/password-reset`, { email });
    }

    static async setNewPassword(token, password) {
        return $api.post(`auth/password-reset/${token}`, { password });
    }

    static async logout() {
        return $api.post('auth/logout');
    }
}
