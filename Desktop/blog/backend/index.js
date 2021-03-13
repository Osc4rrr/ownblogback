const express = require("express"); 
const { dbConnection } = require("./database/config");
require("dotenv").config();
const app = express(); 
const cors = require("cors");

//db
dbConnection();

//cors
app.use(cors());


//Directorio publico
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

//lectura, parseo de body
app.use(express.json());

//rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/uploadImage", require("./routes/uploadImage"));



app.listen(process.env.PORT, () => {
    console.log("App running at port " + process.env.PORT); 
})
