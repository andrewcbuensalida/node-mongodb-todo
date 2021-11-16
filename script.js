const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Todo = require("./models/todo");
require("dotenv").config();
// const cors = require("cors");

const app = express();
// app.use(cors());

mongoose
	.connect(
		// `mongodb://andrewcbuensalida:${process.env.DBPW_TODO}@mongo:27017/?authSource=admin` //if in docker
		`mongodb+srv://andrewcbuensalida:${process.env.DBPW_TODO}@graphql-net-ninja-books.iirvr.mongodb.net/todo-mongoose-codedamn-db?retryWrites=true&w=majority`
	)
	.then(() => console.log("db connected"));

app.use("/", express.static(path.resolve(__dirname, "assets")));

app.use(bodyParser.json());

app.post("/api/delete", async (req, res) => {
	const { record } = req.body;
	const response = await Todo.deleteOne({ record });
	res.json({ status: "ok" });
});

app.post("/api/modify", async (req, res) => {
	const { old: oldTitle, new: newTitle } = req.body;

	const response = await Todo.updateOne(
		{
			record: oldTitle,
		},
		{
			$set: {
				record: newTitle,
			},
		}
	);
	res.json({ status: "ok" });
});

app.get("/api/get", async (req, res) => {
	const records = await Todo.find({});
	res.json(records);
});

app.post("/api/create", async (req, res) => {
	const record = req.body;
	const response = await Todo.create(record);
	res.json({ status: "ok" });
});

const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
	console.log(`Listening to ${PORT} `);
});
