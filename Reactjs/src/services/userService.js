import axios from "../axios";
const handleLoginService = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users/?id=${inputId}`);
}

const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data)
}

const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: { id: userId }
    })
}

const editUserService = (data) => {
    return axios.put('/api/edit-user', data)
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode/?type=${inputType}`);
}

const getTopDoctorService = (limit) => {
    return axios.get(`/api/top-doctor-home/?limit=${limit}`);
}

const getAllDocTorService = () => {
    return axios.get('/api/get-all-doctor')
}

const saveDetailDoctorService = (data) => {
    return axios.post('/api/save-infor-doctor', data);
}
const getDetailInforDoctor = (inputId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`)
}

const bulkCreateScheduleService = (data) => {
    return axios.post('/api/bulk-create-schedule', data);
}
const getScheduleByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-by-date?doctorId=${doctorId}&date=${date}`)
}
export default {
    handleLoginService, getAllUsers, createNewUserService,
    deleteUserService, editUserService, getAllCodeService,
    getTopDoctorService, getAllDocTorService, saveDetailDoctorService,
    getDetailInforDoctor, bulkCreateScheduleService, getScheduleByDate
};
