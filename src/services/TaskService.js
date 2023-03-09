import axios from "axios";

const JSON_BIN_SECRET = import.meta.env.VITE_JSON_BIN_SECRET;
const JSON_BIN_ID = import.meta.env.VITE_JSON_BIN_ID;

const instance = axios.create({
    baseURL: `https://api.jsonbin.io/v3/b/${JSON_BIN_ID}`,
    headers: {
        "X-Access-Key": JSON_BIN_SECRET,
    }
});

// Récupération de toutes les tâches
export async function getAllTasks(){
    const res = await instance.get('/latest');
    return res.data.record;
}

// Mise à jour de toutes les tâches
export async function updateAllTasks(tasks){
    const res = await instance.put('/', tasks);
}