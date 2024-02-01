/** @format */

import { createTransport } from 'nodemailer';
import dev from 'dotenv';

dev.config();

const { SENDMAILER_LOGIN, SENDMAILER_PASSWORD } = process.env;

const transporter = createTransport({
	service: 'gmail',
	auth: {
		user: SENDMAILER_LOGIN,
		pass: SENDMAILER_PASSWORD,
	},
});

export const sendMailer = async confirmEmail => {
	const email = { ...confirmEmail, from: SENDMAILER_LOGIN };
	await transporter.sendMail(email);
};
