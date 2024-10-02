# GMFI API Server

This is the API server for the GMFI (Give Me Five Interesting) quiz game. It provides endpoints for generating quiz questions using the Gemini AI model.

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following content:

   ```bash
   PORT=3000
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

   Replace `your_gemini_api_key_here` with your actual Gemini API key.

4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Generate Questions

Generates a set of quiz questions based on the provided category and difficulty.

- **URL**: `/api/generate-questions`
- **Method**: `POST`
- **Content-Type**: `application/json`

**Request Body**:

```json
{
  "category": "string",
  "difficulty": "string",
  "number": number (optional, default: 10)
}
```

- `category`: The subject or topic for the questions
- `difficulty`: The difficulty level of the questions (e.g., "easy", "medium", "hard")
- `number`: The number of questions to generate (optional, defaults to 10)

**Success Response**:

- **Code**: 200
- **Content**:

```json
{
  "questions": [
    {
      "question": "string",
      "options": ["string", "string", "string", "string"],
      "answer": "string"
    },
    ...
  ]
}
```

**Error Responses**:

- **Code**: 400
- **Content**: `{ "error": "Category and difficulty are required" }`

- **Code**: 500
- **Content**: `{ "error": "Failed to generate questions" }`

## Rate Limiting

The API is rate-limited to 100 requests per 15 minutes per IP address.
