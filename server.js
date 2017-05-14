const express = require("express");
const app = express();

// This responds with "Hello World" on the homepage
app.get("/", (req, res) => {
	console.log("Got a GET request for the homepage");
	res.send("Hello World\n");
});

// This responds a POST request for the homepage
app.post("/", (req, res) => {
	console.log("Got a POST request for the homepage");
	res.send("Hello POST\n");
});

// This responds a DELETE request for the /del_user page
app.delete("/del_user", (req, res) => {
	console.log("Got a DELETE request for the /del_user page");
	res.send("Hello DELETE\n");
});

// This responds a GET request for the /list_user page
app.get("/list_user", (req, res) => {
	console.log("Got a GET request for the /list_user page");
	res.send("Page Listing\n");
});

// This responds a GET request for abcd, abxcd, ab123cd, and so on
app.get("/ab*cd", (req, res) => {
	console.log("Got a GET request for the /ab*cd");
	res.send("Page Pattern Match\n");
});

const server = app.listen(8081, () => {
	let host = server.address().address;
	let port = server.address().port;

	console.log("Example app listening at http://%s:%s", host, port);
});
