const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
require('dotenv').config()

const app = express();
const port = process.env.PORT;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const dbPass = process.env.ATLAS_DB_PASS;
mongoose
    .connect(`mongodb+srv://developer9723usman:huproatlasdb@cluster0.x3kffoi.mongodb.net/Users`)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("Error connecting to MongoDb", err);
    });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const User = require("./models/users");
const Notification = require('./models/notification');

const uniHost = "192.168.128.140";
const homeHost = "https://hu-pro-fyp.vercel.app";
// trgg ptmi yfsd osks

// to verify user email
const handleSendEmail = async (email, subject, text) => {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
        // Configure the email service or SMTP details here
        service: "gmail",
        auth: {
            user: "developer9723usman@gmail.com",
            pass: "trgg ptmi yfsd osks",
        },
    });

    // Compose the email message
    const mailOptions = {
        from: "HuPro",
        to: email,
        subject: subject,
        text: text,
    };

    // Send the email
    try {
        await transporter.sendMail(mailOptions);
        console.log("Verification email sent successfully");
    } catch (error) {
        console.error("Error sending verification email:", error);
    }
};

// endpoint to set notification

app.post("/setNotification", async (req, res) => {
    try {
        const { type, message } = req.body;
        const notification = await Notification.findOne({ type });
        if (notification) {
            notification.message = message;
            await notification.save();
            res.status(200).json({ message: "Notification updated" })
        } else {
            const newNotification = await new Notification({ type, message })
            await newNotification.save();
            res.status(200).json({ message: "Notification created" })
        }
    } catch (error) {
        return res.status(500).json({ message: "Apologize! Internal server error" })
    }

});

// endpoint to get notification from db
app.get("/getNotification", async (req, res) => {
    try {
        const notification = await Notification.find();
        if (notification) {
            return res.status(200).json(notification)
        } else {
            return res.status(200).json({ message: "There is no new notification, Click to add new" })
        }
    } catch (error) {
        return res.status(500).json({ message: "Apologize! Internal server error" })

    }
});

//endpoint to delete specific notification
app.post("/deleteNotification", async (req, res) => {
    try {
        const id = req.body.id;
        await Notification.deleteOne({ _id: id })
        return res.status(200).json({ message: "Notification deleted" })
    } catch (error) {
        return res.status(500).json({ message: "Apologize! Internal server error" })
    }
})

//endpoint to register user
app.post("/register", async (req, res) => {
    try {
        const { fullname, fathername, email, gender, dutyPlace, roll = 0, department, semester = 0, address, cnic, contact } = req.body;

        // Check if user already exists based on email or roll
        const existingUser = await User.findOne({ $or: [{ email }, { roll }] })

        if (existingUser) {
            console.log("User already exists");
            return res.status(400).json({ message: "User already registered try another Email or Roll No" });
        } else {
            //generate verification token
            const verificationToken = await crypto.randomBytes(20).toString("hex");

            // Create a new user document
            const newUser = await new User({ fullname, fathername, email, gender, roll, dutyPlace, department, semester, address, cnic, contact, verificationToken });

            // Save the new user to the database
            await newUser.save();

            //sending email to verify user email
            await handleSendEmail(newUser.email, "Email Verification from HuPro", `Please click the following link to verify your email: ${homeHost}/verify/${newUser.verificationToken}`);

            return res.status(201).json({ success: true, message: "Registered successfully, check your email for verification" });
        }
    } catch (error) {
        console.error("Error during registration:", error); // Log the specific error
        return res.status(500).json({ message: "Registration failed" });
    }
});



//endpoint to verify the email
app.get("/verify/:token", async (req, res) => {
    try {
        const token = req.params.token;

        //Find the user witht the given verification token
        const user = await User.findOne({ verificationToken: token });
        if (!user) {
            return res.status(404).json({ message: "Invalid verification token" });
        }

        //Mark the user as verified
        user.emailVerified = true;
        user.verificationToken = undefined;

        await user.save();

        res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        res.status(500).json({ message: "Email Verificatioion Failed" });
    }
});


app.post("/forgotpassword", async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });


        if (user && user.userVerified) {
            //generate new password
            const digits = "123456789huprosmartapp";
            let password = "";

            // Generate 7 random digits
            for (let i = 0; i < 7; i++) {
                password += digits[Math.floor(Math.random() * digits.length)];
            }
            //send email for password reset and update
            await handleSendEmail(user.email, "Password reset from HuPro", `Your Email is ${user.email}
        Password is: ${password.replace(/\s+/g, '')}`)

            user.password = password;
            await user.save()

            return res.status(200).json({ success: true, message: "Password reset successfully, check your email" })
        } else {
            return res.status(404).json({ message: "Oops! No verified user found" })
        }
    } catch (error) {
        console.log(error.message);
    }
});


app.post("/changePassword", async (req, res) => {
    try {
        const { id, oldPwd, newPwd } = req.body;
        const user = await User.findOne({ _id: id });


        if (user && user.password == oldPwd) {
            user.password = newPwd;
            await user.save()
            return res.status(200).json({ success: true, message: "Password reset successfully!" })
        } else {
            return res.status(404).json({ message: "Oops! Incorrect Old Password!" })
        }
    } catch (error) {
        console.log(error.message);
    }
});

// endpoint for login user
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || user.userVerified == false) {
            return res.status(401).json({ message: "No User Found!" })
        }
        else if (user.password !== password) {
            return res.status(401).json({ message: "Invalid password" })
        }
        else {
            const SecretKey = "HuProKey";
            const token = await jwt.sign({ userId: user._id }, "hypro");
            const privilege = await user.privilege;
            const id = await user._id;
            return res.status(200).json({ success: true, privilege, token, id, message: "Logged in sucessfuly" })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

})

// endpoint to get registered users
app.get("/getRegisteredUsers", async (req, res) => {
    try {
        const user = await User.find({ userVerified: true });

        if (!user) {
            return res.status(401).json({ data: "No registered user found" })
        }
        else {
            return res.status(200).json({ data: user })
        }
    } catch (error) {
        return res.status(500).json({ data: error.message })
    }

})

// endpoint to get applicant users
app.get("/getApplicantUsers", async (req, res) => {
    try {
        const user = await User.find({ userVerified: false });

        if (!user) {
            return res.status(401).json({ data: "No registered user found" })
        }
        else {
            return res.status(200).json({ data: user })
        }
    } catch (error) {
        return res.status(500).json({ data: error.message })
    }
})

// endpoint to get applicant users
app.post("/registerSpecificUser", async (req, res) => {
    try {
        const { id } = req.body;
        const user = await User.findOne({ _id: id });

        if (!user) {
            return res.status(401).json({ message: "No user found" })
        }
        else {
            const digits = "123456789huprosmartapp";
            let password = "";

            // Generate 7 random digits
            for (let i = 0; i < 7; i++) {
                password += digits[Math.floor(Math.random() * digits.length)];
            }
            user.password = password;
            user.userVerified = true;
            await user.save();
            //send email for login
            await handleSendEmail(user.email, `Registeration from HuPro`, ` Hello ${user.fullname}!
            Congratulation for registeration.
            Now you can login to your account with these credentials.
            Email: ${user.email}.
            Password: ${password.replace(/\s+/g, '')}.`)


            return res.status(200).json({ message: "User registered succesfully" })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

// endpoint to get applicant users
app.delete("/deleteSpecificUser", async (req, res) => {
    try {
        const { id } = req.body;
        const user = await User.deleteOne({ _id: id });

        if (!user) {
            return res.status(401).json({ message: "No user found" })
        }
        else {
            return res.status(200).json({ message: "User deleted succesfully" })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
});

app.post("/profileData", async (req, res) => {
    try {
        const { id } = req.body;
        const user = await User.find({ _id: id });
        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

app.post("/updateDetails", async (req, res) => {
    try {
        const { id, fullname, fathername, roll, department, semester, address, cnic, contact } = req.body;
        const user = await User.findOne({ _id: id });
        if (!user) {
            return req.status(401).json({ success: false, message: "Try another email!" })
        } else {
            user.fullname = fullname;
            user.fathername = fathername;
            user.roll = roll;
            user.department = department;
            user.semester = semester;
            user.address = address;
            user.cnic = cnic;
            user.contact = contact;

            await user.save();
            return res.status(200).json({ success: true, message: "Profile updated succesfully" })
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error!" })
    }
});

app.post("/assignDuty", async (req, res) => {
    try {
        const { id, duty } = req.body;
        const user = await User.findOne({ _id: id });
        if (!user) {
            return res.status(401).json({ success: false, message: "Something went wrong!" })
        } else {
            user.dutyPlace = duty;
            await user.save();
            return res.status(200).json({ success: true, message: "Duty assigned!" })
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error!" })

    }
})

app.post("/checkIn", async (req, res) => {
    try {
        const { id,time, date, latitude, longitude } = req.body;
        const user = await User.findOne({ _id: id });
        if (!user) {
            return res.status(401).json({ success: false, message: "Something went wrong!" })
        } else {
            await user.updateOne({ $set: { checkIn: {time, date, latitude, longitude } } })
            await user.save();
            return res.status(200).json({ success: true, message: "CheckedIn Successfully!" })
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })

    }
})

app.post("/checkOut", async (req, res) => {
    try {
        const { id,time, date, latitude, longitude } = req.body;
        const user = await User.findOne({ _id: id });
        if (!user && user.checkIn == user.checkOut) {
            return res.status(401).json({ success: false, message: "Something went wrong!" })
        } else {
            await user.updateOne({ $set: { checkOut: {time, date, latitude, longitude } } })
            await user.save();
            return res.status(200).json({ success: true, message: "CheckedOut Successfully!" })
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })

    }
});

app.post("/attendance", async (req, res) => {
    try {
        const { id, date, status } = req.body;
        const user = await User.findOne({ _id: id });
        if (!user) {
            return res.status(401).json({ success: false, message: "Something went wrong!" })
        } else {
            await user.updateOne({ $push: { attendance: { date, status } } })
            await user.updateOne({ $set: { lastattendance: { date, status } } })
            await user.save();
            return res.status(200).json({ success: true, message: "Attendance marked!" })
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })

    }
})