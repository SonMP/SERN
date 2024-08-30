import express from "express";
import homeController, { getHomePage, getAboutPage, getPiKaChu } from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", (req, res) => {
        return res.send("hello")
    });

    router.get("/home", getHomePage);
    router.get("/about", getAboutPage);
    router.get("/pikachu", getPiKaChu);

    return app.use("/", router);

}

module.exports = initWebRoutes;