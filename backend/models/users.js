const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  privilege: {
    type: String,
    default: "User"
  },
  fullname: {
    type: String,
    required: true,
  },
  fathername: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  roll: {
    type: String,
    default: 0,
    unique: true,
  },
  department: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    default: 0,
  },
  address: {
    type: String,
    required: true,
  },
  cnic: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    default: "",
  },
  dutyPlace: {
    type: String,
    default: "",
  },
  lastattendance: {
    type: Array,
    default:[{status:"",date:""}]
  },
  attendance: {
    type: Array,
  },
  checkIn:{
    type:Array,
    default:[{date:"",latitude:"",longitude:""}]
  },
  checkOut:{
    type:Array,
    default:[{date:"",latitude:"",longitude:""}]
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  userVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    default: "",
  },

  //   orders: [
  //     {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "Order",
  //     },
  //   ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User