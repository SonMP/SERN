import db from "../models";
import bcrypt, { compareSync } from 'bcryptjs';

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};

            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    where: { email: email },
                    attributes: ['email', 'roleId', 'passWord'],
                    raw: true

                })
                // console.log('user:', user);
                // console.log('password:', password);
                if (user) {
                    let check = bcrypt.compareSync(password, user.passWord);
                    if (check) {
                        userData.errCode = 0;
                        userData.message = 'OK';
                        delete user.passWord;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.message = `Wrong password!`
                    }

                } else {
                    userData.errCode = 2;
                    userData.message = `User's not found!`;
                }
            } else {
                userData.errCode = 1;
                userData.message = `Your's email isn't exist your system`;
            }
            resolve(userData);
        } catch (e) {
            reject(e)
        }
    })

}


let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let email = await db.User.findOne({
                where: { email: userEmail }
            })
            if (email) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {

            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['passWord']
                    }
                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['passWord']
                    }
                })
                console.log(users)
            }
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = { handleUserLogin, getAllUsers }