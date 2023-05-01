import mongoose from "mongoose"

const connectDatabase = () => {
    mongoose.connect(process.env.MONGODB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((data) => {
            console.log(`Mongodb connected with server : ${data.connection.host}`);
        });
}



export default connectDatabase