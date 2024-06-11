import $api from '../http';

export default class ArtWorkService {
    static async create(data) {
        return $api.post('artwork/', data);
    }

    static async get(id) {
        return $api.get(`artwork/${id}`);
    }
}
