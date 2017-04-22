import path from "path";
import bodyParser from "body-parser";

import express from "express";
let app = express();

import logger from "nodejslogger";


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');


// Respond to the health check pings
app.use("/healthcheck", (req, res) => {
    res.send("Server is Running");
});

// Api routing will be handled by routes/
require("./routes")(app);

let port = process.env.NODE_PORT || 8080;
app.listen(port, () => {
    logger.info(`Trends Store Server starting on port ${port}!`);
});