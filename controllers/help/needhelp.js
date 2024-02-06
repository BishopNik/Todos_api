import { sendEmail } from "../../utils/index.js";


  export const sendEmailNeedHelp = async (req, res) => {
	const { text, email } = req.body;
	try {
	  await sendEmail(text, email);
	  res.status(200).json({message: 'Email sent successfully'});
	} catch (error) {
	  console.error('Error sending email:', error);
	  res.status(500).json({message: 'Error sending email'});
	}
  };