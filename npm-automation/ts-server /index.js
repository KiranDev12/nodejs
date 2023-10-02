"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 4005;
let runningMessage = "Server is running on port " + port;
app.get("/", (req, res) => {
    console.log("API was successfully requested");
    res.send(runningMessage + 'hello!');
});
const server = app.listen(port, () => {
    console.log(runningMessage);
});
module.exports = server;
