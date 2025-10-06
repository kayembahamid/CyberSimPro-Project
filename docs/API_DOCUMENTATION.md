# CyberSim Pro - Training API Documentation

## Overview
The Training API provides endpoints for managing and executing interactive cybersecurity training simulations.

**Base URL:** `http://localhost:3003/api/training`

---

## Endpoints

### 1. Get All Training Modules
Retrieve a list of all available training modules.

**Endpoint:** `GET /api/training/modules`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "phishing-detection-101",
      "title": "Phishing Detection 101",
      "description": "Learn to identify and respond to phishing emails...",
      "difficulty": "BEGINNER",
      "estimatedMinutes": 15,
      "category": "Email Security",
      "totalPoints": 65,
      "totalSteps": 8,
      "prerequisites": []
    }
  ]
}
```

---

### 2. Get Module Details
Retrieve detailed information about a specific training module, including all steps.

**Endpoint:** `GET /api/training/modules/:moduleId`

**Parameters:**
- `moduleId` (path) - The ID of the training module

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "phishing-detection-101",
    "title": "Phishing Detection 101",
    "steps": [
      {
        "id": "phish-intro",
        "type": "INSTRUCTION",
        "title": "Introduction to Phishing",
        "content": "# Welcome to Phishing Detection 101...",
        "order": 1,
        "points": 0
      }
    ]
  }
}
```

---

### 3. Get Training Statistics
Get platform-wide training statistics.

**Endpoint:** `GET /api/training/stats`

**Response:**
```json
{
  "success": true,
  "data": {
    "totalModules": 3,
    "totalSteps": 23,
    "totalPoints": 190,
    "categories": ["Email Security", "Incident Response", "Network Security"],
    "difficulties": ["BEGINNER", "INTERMEDIATE"]
  }
}
```

---

### 4. Start Training Session
Start a new training session for a specific module.

**Endpoint:** `POST /api/training/start/:moduleId`

**Parameters:**
- `moduleId` (path) - The ID of the training module to start

**Request Body:**
```json
{
  "userId": "user-123",
  "simulationId": "optional-custom-id"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "sessionId": "sim_1728043200_abc123",
    "moduleId": "phishing-detection-101",
    "currentStep": {
      "id": "phish-intro",
      "type": "INSTRUCTION",
      "title": "Introduction to Phishing",
      "content": "...",
      "order": 1
    },
    "progress": {
      "currentStepIndex": 0,
      "completedSteps": 0,
      "totalSteps": 8,
      "score": 0,
      "progressPercentage": 0
    }
  }
}
```

---

### 5. Submit Answer
Submit an answer for the current step in a training session.

**Endpoint:** `POST /api/training/answer/:sessionId`

**Parameters:**
- `sessionId` (path) - The session ID from start training

**Request Body:**
```json
{
  "stepId": "phish-q1",
  "answer": 3
}
```

**Answer Types:**
- Multiple Choice: Number (0-based index)
- True/False: Boolean
- Short Answer: String
- Task: String (open-ended)

**Response:**
```json
{
  "success": true,
  "data": {
    "answerResult": {
      "correct": true,
      "pointsEarned": 10,
      "explanation": "Correct! The domain doesn't match...",
      "nextStepId": "phish-q2"
    },
    "currentStep": {
      "id": "phish-q2",
      "type": "QUESTION",
      "title": "Urgency and Threats",
      "content": "..."
    },
    "progress": {
      "currentStepIndex": 2,
      "completedSteps": 1,
      "score": 10,
      "progressPercentage": 13
    },
    "isComplete": false,
    "finalResults": null
  }
}
```

**When Training is Complete:**
```json
{
  "success": true,
  "data": {
    "answerResult": {...},
    "currentStep": null,
    "progress": {...},
    "isComplete": true,
    "finalResults": {
      "totalSteps": 8,
      "completedSteps": 8,
      "correctAnswers": 7,
      "totalPoints": 65,
      "earnedPoints": 58,
      "percentageScore": 89,
      "passed": true,
      "feedback": [
        "🎉 Congratulations! You passed the simulation.",
        "Excellent work! You have strong grasp of the concepts."
      ]
    }
  }
}
```

---

### 6. Get Session Progress
Get current progress for an active training session.

**Endpoint:** `GET /api/training/progress/:sessionId`

**Parameters:**
- `sessionId` (path) - The session ID

**Response:**
```json
{
  "success": true,
  "data": {
    "currentStep": {...},
    "progress": {
      "currentStepIndex": 3,
      "completedSteps": 2,
      "score": 20,
      "progressPercentage": 38
    },
    "stepsSummary": [
      {
        "id": "phish-intro",
        "title": "Introduction to Phishing",
        "type": "INSTRUCTION",
        "completed": true
      }
    ],
    "isComplete": false
  }
}
```

---

### 7. Get Hint
Get a hint for a specific step (if available).

**Endpoint:** `GET /api/training/hint/:sessionId/:stepId`

**Parameters:**
- `sessionId` (path) - The session ID
- `stepId` (path) - The step ID

**Response:**
```json
{
  "success": true,
  "data": {
    "hint": "Look carefully at the sender's email address"
  }
}
```

---

### 8. End Training Session
End an active training session and get final results.

**Endpoint:** `DELETE /api/training/session/:sessionId`

**Parameters:**
- `sessionId` (path) - The session ID

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Session ended",
    "finalResults": {
      "totalSteps": 8,
      "completedSteps": 5,
      "correctAnswers": 4,
      "totalPoints": 65,
      "earnedPoints": 35,
      "percentageScore": 54,
      "passed": false,
      "feedback": [...]
    }
  }
}
```

---

## Error Responses

All endpoints may return error responses in the following format:

```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `404` - Resource not found (module, session, or step)
- `500` - Server error

---

## Step Types

### INSTRUCTION
Informational step that requires no answer, auto-completes.

### QUESTION
Interactive question requiring an answer.

**Question Types:**
- `MULTIPLE_CHOICE` - Select from options (answer is index 0-3)
- `TRUE_FALSE` - Boolean answer
- `SHORT_ANSWER` - Text answer (case-insensitive)

### TASK
Open-ended task requiring detailed response.

### ASSESSMENT
Final summary step, auto-completes.

---

## Scoring System

- Each step can award points (typically 10-15 points per question)
- Correct answers earn the full points
- Incorrect answers earn 0 points
- Progress is tracked in real-time
- Passing grade: 70% or higher

---

## Session Management

- Sessions are stored in-memory on the server
- Each session has a unique `sessionId`
- Sessions auto-cleanup on completion
- No persistence between server restarts (MVP)

---

## Example Workflow

```javascript
// 1. Get available modules
const modules = await fetch('/api/training/modules')

// 2. Start training
const session = await fetch('/api/training/start/phishing-detection-101', {
  method: 'POST',
  body: JSON.stringify({ userId: 'user123' })
})

// 3. Submit answers
const result = await fetch(`/api/training/answer/${sessionId}`, {
  method: 'POST',
  body: JSON.stringify({
    stepId: 'phish-q1',
    answer: 3
  })
})

// 4. Check if complete
if (result.data.isComplete) {
  console.log('Final Score:', result.data.finalResults.percentageScore)
}
```

---

## Rate Limiting
Currently no rate limiting implemented (MVP).

## Authentication
Currently no authentication required (MVP).

---

**Last Updated:** October 2025
**API Version:** 1.0.0
