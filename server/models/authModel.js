import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
    alias: "full_name",
    validate: (value) => value.length > 3,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    default: "customer",
  },
  phoneNum: Number,
});

const UserModel = mongoose.model("Users", userSchema);

export default UserModel;
