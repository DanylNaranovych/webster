import $api from '../http';

export default class ArtWorkService {
    static async create(data) {
        return $api.post('artwork/', data);
    }

    static async update(data, id) {
        return $api.put(`artwork/${id}`, data);
    }

    static async get(id) {
        return $api.get(`artwork/${id}`);
    }

    static async getAll() {
        return $api.get('artwork/');
    }

    static async upload(id, file) {
        return $api.post(`artwork/${id}/object`, file);
    }

    static async uploadPhoto(id, file) {
        return $api.post(`artwork/${id}/photo`, file);
    }

    static async delete(id) {
        return $api.delete(`artwork/${id}`);
    }
}
