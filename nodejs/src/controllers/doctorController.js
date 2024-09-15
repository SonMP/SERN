import DoctorService from '../services/DoctorService';

let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let response = await DoctorService.getTopDoctorHomeService(+limit);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error server...'
        })
    }
}

let getAllDocTor = async (req, res) => {
    try {
        let doctors = await DoctorService.getAllDocTor();
        return res.status(200).json(doctors);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}

let postInforDoctor = async (req, res) => {
    try {
        let response = await DoctorService.postInforDoctorService(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}

let getDetailDoctorById = async (req, res) => {
    try {
        let infor = await DoctorService.getDetailDoctorByIdService(req.query.id);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }

}

module.exports = { getTopDoctorHome, getAllDocTor, postInforDoctor, getDetailDoctorById }