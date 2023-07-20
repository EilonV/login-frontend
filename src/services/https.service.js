import http from "../http-common";

class UserDataService {
    getAll(page = 0) {
        return http.get(`?page=${page}`);
    }

    get(id) {
        return http.get(`/user?id=${id}`);
    }

    find(query, by = "name", page = 0) {
        return http.get(`users?${by}=${query}&page=${page}`);
    }

}

export default new RestaurantDataService();