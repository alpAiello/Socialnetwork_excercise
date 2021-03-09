const aws = require("aws-sdk");

let secrets;
if (process.env.NODE_ENV == "production") {
	secrets = process.env; // in prod the secrets are environment variables
} else {
	secrets = require("./secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

const ses = new aws.SES({
	accessKeyId: secrets.AWS_KEY,
	secretAccessKey: secrets.AWS_SECRET,
	region: "eu-west-1",
});

ses.sendEmail({
	Source: "Funky Chicken <funky.chicken@spiced.academy>",
	Destination: {
		ToAddresses: ["4lessandro.aiello@gmail.com"],
	},
	Message: {
		Body: {
			Text: {
				Data:
					"We can't wait to start working with you! Please arrive on Monday at 9:00 am. Dress code is casual so don't suit up.",
			},
		},
		Subject: {
			Data: "Your Application Has Been Accepted!",
		},
	},
})
	.promise()
	.then(() => console.log("it worked!"))
	.catch((err) => console.log(err));
