const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const routes = require("./routes");

// Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(morgan("combined")); // Logging

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use("/api", routes);

// Add this new route for generating questions
app.post("/api/generate-questions", async (req, res) => {
  try {
    const { category, difficulty, number = 10 } = req.body;

    if (!category || !difficulty) {
      return res
        .status(400)
        .json({ error: "Category and difficulty are required" });
    }

    // Call the question generation function (assuming it's imported or defined)
    const questions = await generateQuestions(category, difficulty, number);

    res.json({ questions });
  } catch (error) {
    console.error("Error generating questions:", error);
    res.status(500).json({ error: "Failed to generate questions" });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
