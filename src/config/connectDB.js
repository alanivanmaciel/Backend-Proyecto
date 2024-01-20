import { connect } from "mongoose";

const connectDB = async () => {
  try {
    await connect(
      "mongodb+srv://alanivanmaciel:unpbx@codercluster.ntazj2s.mongodb.net/eccomerce?retryWrites=true&w=majority"
    );
    console.log("Base de datos conectada");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
