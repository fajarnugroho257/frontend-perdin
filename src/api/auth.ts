import axios from "axios";

const API_URL = "http://localhost:8000";
// login
export const login = async (username: string, password: string) => {
    const response = await axios.post(`${API_URL}/auth/login`, { username, password });
    return response.data;
}
// register
export const register = async (nama: string, username:string, password: string) => {
    const response = await axios.post(`${API_URL}/auth`, { nama, username, password, role:'pegawai' });
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

// USER
export const getAllUser = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/users`, 
        {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
    return response.data;
};
// detail data user
export const detailDataUser = async (user_id:string) => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/users/detail/${user_id}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    return response.data;
}
// update data user
export const updateDataUser = async (params:object, user_id:string) => {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${API_URL}/users/update/${user_id}`,params, 
        {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        } 
    );
    return response.data;
}
// delete user
export const deleteUser = async (user_id:string) => {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${API_URL}/users/delete/${user_id}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    return response.data;
}
// get all pulau
export const getAllDataPulau = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/pulau`, 
        {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
    return response.data;
};
// store pulau
export const storePulau = async (params:object) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/pulau`,params, 
        {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        } 
    );
    return response.data;
}
// detail pulau
export const detailPulau = async (pulau_id:string) => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/pulau/detail/${pulau_id}`, 
        {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        } 
    );
    return response.data;
}
// update data pulau
export const updatePulau = async (params:object, pulau_id:string) => {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${API_URL}/pulau/update/${pulau_id}`,params, 
        {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        } 
    );
    return response.data;
}
// delete pulau
export const deletePulau = async (pulau_id:string) => {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${API_URL}/pulau/delete/${pulau_id}`, 
        {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        } 
    );
    return response.data;
}
// get all provinsi
export const getAllDataProvinsi = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/provinsi`, 
        {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
    return response.data;
};
// store provinsi
export const storeProvinsi = async (params:object) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/provinsi`,params, 
        {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        } 
    );
    return response.data;
}
// detail provinsi
export const detailProvinsi = async (prov_id:string) => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/provinsi/detail/${prov_id}`, 
        {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        } 
    );
    return response.data;
}
// update data provinsi
export const updateProvinsi = async (params:object, prov_id:string) => {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${API_URL}/provinsi/update/${prov_id}`,params, 
        {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        } 
    );
    return response.data;
}
// delete provinsi
export const deleteProvinsi = async (prov_id:string) => {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${API_URL}/provinsi/delete/${prov_id}`, 
        {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        } 
    );
    return response.data;
}
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