/** @format */

import { createTransport } from 'nodemailer';
import dev from 'dotenv';

dev.config();

const { SENDMAILER_LOGIN, SENDMAILER_PASSWORD } = process.env;

// Налаштування транспорту для відправки електронних листів
const transporter = createTransport({
	service: 'gmail',
	auth: {
		user: SENDMAILER_LOGIN,
		pass: SENDMAILER_PASSWORD,
	},
});

// Функція для відправлення листа
export const sendEmail = async (text, email) => {
	try {
		// Налаштування електронного листа
		const mailOptions = {
			from: email, //SENDMAILER_LOGIN,
			to: 'taskpro.project@gmail.com',
			subject: 'Need Help',
			text: `Comment: ${text}, email for reply: ${email}`,
		};
		// Відправлення електронного листа
		await transporter.sendMail(mailOptions);
	} catch (error) {
		console.error('Error sending email:', error);
	}
};
