import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import generateUniqueId from "generate-unique-id";

const uniqueId = generateUniqueId({
  length: 10, // Length of the ID
  uppercase: true, // Use uppercase letters
  numbers: true, // Include numbers
  symbols: false, // Do not include symbols
});

const userSchema = new mongoose.Schema(
  {
    userID: { type: mongoose.Types.ObjectId, default: uniqueId },
    email: {
      type: String,
      require: true,
      validate: {
        validator: function (value) {
          const emailRGX =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.(com|net|org|edu|gov|mil|co|info|io|biz|me|app|tv)$/;
          return emailRGX.test(value);
        },
        message: (props) => `${props.value} is not a valid!`,
      },
      // unique: true,
    },
    firstName: {
      type: String,
      require: true,
      validate: {
        validator: function (value) {
          const fnameRGX = /^[A-Za-z]+$/;
          return fnameRGX.test(value);
        },
        message: (props) => `${props.value} is not a valid!`,
      },
    },
    lastName: {
      type: String,
      require: true,
      validate: {
        validator: function (value) {
          const lNameRGX = /^[A-Za-z]+$/;
          return lNameRGX.test(value);
        },
        message: (props) => `${props.value} is not a valid!`,
      },
    },
    password: {
      type: String,
      require: true,
      validate: {
        validator: function (value) {
          const passRGX =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;
          return passRGX.test(value);
        },
        message: (props) => `${props.value} must have 
        \n
        At least 8 characters long
        \n 
        At least one uppercase letter
        \n
        At least one lowercase letter
        \n
        At least one digit
        \n
        At least one special character (e.g., !@#$%^&*())
        `,
      },
    },
    role: {
      type: String,
      default: "customer",
      validate: {
        validator: function (value) {
          const allowedValues = ["admin", "customer"];
          return allowedValues.includes(value);
        },
        message: (props) =>
          `${props.value} is not a valid status! Only 'admin' or 'customer' are allowed.`,
      },
    },
    phoneNum: {
      type: Number,
      validate: {
        validator: function (value) {
          const phoneNumRGX = /^[0-9]+$/;

          return phoneNumRGX.test(value);
        },
        message: (props) => `${props.value} is not a valid!`,
      },
    },
    address: { type: String },
  },
  {
    virtuals: {
      fullName: {
        get() {
          return this.firstName + " " + this.lastName;
        },
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

const UserModel = mongoose.model("Users", userSchema);

export default UserModel;
