const aws = require("aws-sdk");

let secrets;
if (process.env.NODE_ENV == "production") {
	secrets = process.env; // in prod the secrets are environment variables
} else {
	secrets = require("../../secrets.json"); // in dev they are in secrets.json which is listed in .gitignore
}

const ses = new aws.SES({
	accessKeyId: secrets.AWS_KEY,
	secretAccessKey: secrets.AWS_SECRET,
	region: "us-east-1",
});

exports.sendEmail = (email, reset_code) => {
	return ses.sendEmail({
		Source: "alessandro aiello <4lessandro.aiello@gmail.com>",
		Destination: {
			ToAddresses: [email],
		},
		Message: {
			Body: {
				Text: {
					Data:
						`Here is the reset code for your account, if you did not ask for one please change your password. 
						Code: ` + reset_code,
				},
			},
			Subject: {
				Data: "The code to reset your Password",
			},
		},
	});
	// .promise()
	// .then(() => console.log("it worked!"))
	// .catch((err) => console.log(err));
};
