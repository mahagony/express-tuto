const express = require("express");
const app = express();

app.get("/", (req, res) => {
	res.send("Hello World\n");
});

const server = app.listen(8081, () => {
	let host = server.address().address;
	let port = server.address().port;

	console.log("Example app listening at http://%s:%s", host, port);
});
