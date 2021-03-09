import axios from "axios";

const superAxios = axios.create({
	xsrfHeaderName: "csrf-token",
	xsrfCookieName: "token",
});

export default superAxios;