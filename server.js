const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const multer = require("multer");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(multer({dest: "/tmp/"}).any());

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

app.get("/index.html", (req, res) => {
	res.sendFile(__dirname + "/" + "index.html");
});

app.get("/process", (req, res) => {
	// Prepare output in JSON format
	response = {
		first_name: req.query.first_name,
		last_name: req.query.last_name,
	};
	console.log(response);
	res.end(JSON.stringify(response));
});

// Create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({extended: false});

app.post("/process", urlencodedParser, (req, res) => {
	// Prepare output in JSON format
	response = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
	};
	console.log(response);
	res.end(JSON.stringify(response));
});

app.get("/uploadfile.html", (req, res) => {
	res.sendFile(__dirname + "/" + "uploadfile.html");
});

app.post("/file_upload", (req, res) => {
//	console.log(req);
	console.log(req.files[0].originalname);
	console.log(req.files[0].path);
	console.log(req.files[0].mimetype);
	let file = __dirname + "/" + req.files[0].originalname;

	fs.readFile(req.files[0].path, (err, data) => {
		fs.writeFile(file, data, (err) => {
			if(err) {
				console.log(err);
			} else {
				response = {
					message: "File uploaded successfully",
					filename: req.files[0].originalname,
				};
			}
			console.log(response);
			res.end(JSON.stringify(response));
		});
	});
});


const server = app.listen(8081, () => {
	let host = server.address().address;
	let port = server.address().port;

	console.log("Example app listening at http://%s:%s", host, port);
});
