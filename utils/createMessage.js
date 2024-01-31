/** @format */

const { BASE_URL } = process.env;

const createMessage = ({ name, email, verificationToken }) => {
	const confirmEmail = {
		to: email,
		subject: 'Confirm email',
		html: `<p>Dear ${name},</p>
        <p>Please confirm your email by clicking the following link:</p>
        <p><a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Confirm Email</a></p>`,
	};
	return confirmEmail;
};

export default { createMessage };
