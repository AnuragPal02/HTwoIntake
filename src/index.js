import connectDB from "./db/dbConnection.js";
import app from "./app.js";

connectDB().then(()=>{
    app.listen(process.env.PORT || 3000,()=>{
        console.log(`Server is running on ${process.env.PORT}`);
    })
}).catch((error)=>{
    console.log("Something error while connecting to database\n",error);
});