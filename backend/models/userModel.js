const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: "string",
      required: [true, "Please enter a name"],
    },
    email: {
      type: String,
      required: [true, "Please enter a email address"],
      uniquie: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: "string",
      required: [true, "Please enter a password"],
      minLength: [6, "Password must be at least 6 characters"],
      // maxLength: [23, "Password must  not be more then 23 characters"],
    },
    photo: {
      type: String,
      default: "photo",
    },
    phone: {
      type: String,
      default: "+994",
    },
    bio: {
      type: String,
      default: "bio",
      maxLength: [250, "Bio must  not be more then 250 characters"],
    },
  },
  {
    timestamps: true,
  }
);

// Encrypt password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

const user = mongoose.model("User", userSchema);
module.exports = user;
