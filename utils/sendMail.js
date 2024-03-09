const nodemailer = require('nodemailer');

const sendEmailhandler = async (email, subject, text) => {
	try {
		const transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			service: 'gmail',
			port: 587,
			secure: true,
			auth: {
				user: "akheniad@gmail.com",
				pass: process.env.EMAIL_KEY,
			},
		});

		await transporter.sendMail({
			from: "akheniad@gmail.com",
			to: email,
			subject: subject,
			text: text,
		});
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};

module.exports = {sendEmailhandler}