let getHomePage = (req, res) => {
    return res.render('homePage.ejs');
}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}

let getPiKaChu = (req, res) => {
    return res.render('test/pikachu.ejs');
}
//object:{key:value}
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getPiKaChu: getPiKaChu
};