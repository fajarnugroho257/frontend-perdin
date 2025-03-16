import axios from "axios";

const API_URL = "http://localhost:8000";

export const login = async (username: string, password: string) => {
    const response = await axios.post(`${API_URL}/auth/login`, { username, password });
    return response.data;
}

export const register = async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/register`, { email, password });
    return response.data;
};
// KOTA
// all data
export const allDataKota = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/kota`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    return response.data;
}
// detail data
export const detailDataKota = async (kota_id:string) => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/kota/detail/${kota_id}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    return response.data;
}
// store data
export const storeKota = async (params:object) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/kota`,params, 
        {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        } 
    );
    return response.data;
}
// delete data
export const deleteKota = async (kota_id:string) => {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${API_URL}/kota/delete/${kota_id}`, 
        {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        } 
    );
    return response.data;
}

// update data
export const updateKota = async (params:object, kota_id:string) => {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${API_URL}/kota/update/${kota_id}`,params, 
        {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        } 
    );
    return response.data;
}

// PERDIN
export const getAllPerdin = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/perdin`, 
        {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
    return response.data;
};
export const getAllPerdinPersetujuan = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/perdin/persetujuan`, 
        {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
    return response.data;
};
// update perdin
export const detailDataPerdin = async (perdin_id:string) => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/perdin/detail/${perdin_id}`, 
        {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
    return response.data;
};
// update perdin
export const updateStatus = async (perdin_id:string, status:string) => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/perdin/update/${perdin_id}/${status}`, 
        {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
    return response.data;
};

// store
export const storePerdin = async (params:object) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/perdin`, params , 
        {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
    return response.data;
};

// update
export const updatePerdin = async (params:object, perdin_id:string) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/perdin/update-data-perdin/${perdin_id}`, params , 
        {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
    return response.data;
};

// REFERENSI DATA
export const getAllPulau = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/kota/pulau`, 
        {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
    return response.data;
};
export const getAllProvinsi = async (pulau_id:string) => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/kota/provinsi/${pulau_id}`, 
        {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
    return response.data;
};
export const getAllPref = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/perdin/pref`, 
        {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
    return response.data;
};