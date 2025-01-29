import express from "express";
import morgan from "morgan";

const app = express();

// Use Morgan for HTTP request logging
app.use(morgan("combined"));

app.get("/health", (req, res) => {
	res.send("Server is healthy");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

export default app;