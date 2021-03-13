const mongoose = require("mongoose");

const dbConnection = async () => {

    try {
        await mongoose.connect(
                process.env.DB_CONNECTION, 
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true, 
                    useCreateIndex: true, 
                    useFindAndModify: true
                    
                });

        console.log("db online");
    } catch (error) {
        console.log(error); 
        console.log("error conectando db");
    }

}


module.exports = {
    dbConnection
}