import db from "../models"
let createClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('aaa')
            if (!data.name || !data.imageBase64 || !data.descriptionMarkdown || !data.descriptionHTML && !data.address) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter!'
                })
            } else {
                await db.Clinic.create({
                    name: data.name,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,
                    address: data.address
                })
                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = { createClinic }