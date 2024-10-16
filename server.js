const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require('mysql2');
const {router} = require("express/lib/application");

const app = express();

const corsOptions = {
    origin: "http://localhost:5173"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });



db.sequelize.sync();
// const db1 = mysql.createConnection({
//     host: 'localhost',
//     user: 'root', // 替换为你的 MySQL 用户名
//     password: 'root', // 替换为你的 MySQL 密码
//     database: 'jinghua' // 替换为你的数据库名称
// });
//
// // simple route
// app.get("/", (req, res) => {
//     const query = 'SELECT * FROM scripts';
//     db1.query(query, (err, result) => {
//         if(err) return console.log(err);
//         else{
//             console.log('get all scripts from db')
//             return res.json(result);
//
//         }
//     })
//     // res.json({ message: "Welcome to jinghua application." });
// });

require("./routes/script.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
