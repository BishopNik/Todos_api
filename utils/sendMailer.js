/** @format */

import { createTransport } from 'nodemailer';
require('dotenv').config();

const { SENDMAILER_LOGIN, SENDMAILER_PASSWORD } = process.env;

const transporter = createTransport({
	service: 'gmail',
	auth: {
		user: SENDMAILER_LOGIN,
		pass: SENDMAILER_PASSWORD,
	},
});

const sendMailer = async confirmEmail => {
	const email = { ...confirmEmail, from: SENDMAILER_LOGIN };
	await transporter.sendMail(email);
};

export default sendMailer;
