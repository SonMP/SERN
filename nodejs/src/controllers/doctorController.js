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

module.exports = { getTopDoctorHome }