import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user:process.env.EMAIL_ACCOUNT,
        pass:process.nav.EMAIL_PASS
    }
})

export default transporter