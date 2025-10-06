# AI Recommendations Setup Guide

## 🤖 Feature 5: AI Recommendations with Claude

This guide will help you set up the AI-powered recommendation system using Anthropic's Claude AI.

---

## 📋 Prerequisites

1. Anthropic API key (get from: https://console.anthropic.com/)
2. Node.js installed
3. Project dependencies installed

---

## 🚀 Setup Steps

### 1. Install Anthropic SDK

```bash
cd CyberSimPro-Project/apps/api
npm install @anthropic-ai/sdk
```

### 2. Add API Key to Environment

Add your Anthropic API key to `.env`:

```bash
# apps/api/.env
ANTHROPIC_API_KEY=sk-ant-api03-xxxxx
```

### 3. Register Routes in App

Add the recommendations routes to `apps/api/src/app.ts`:

```typescript
import recommendationsRouter from './routes/recommendations.routes'

// Add after other routes
app.use('/api/recommendations', recommendationsRouter)
```

### 4. Add Widget to Dashboard

Import and use the widget in your dashboard page:

```typescript
// apps/dashboard/src/app/dashboard/page.tsx
import { AIRecommendationsWidget } from '@/components/recommendations/AIRecommendationsWidget'

// In your component:
<AIRecommendationsWidget />
```

---

## 🎯 What It Does

### AI Service Features

✅ **generateRecommendations()**
- Analyzes user's learning profile
- Returns 3-5 personalized recommendations
- Considers completed modules, scores, weak areas
- Suggests next steps with reasons

✅ **analyzeLearningPath()**
- Assesses current skill level
- Suggests optimal learning path
- Estimates completion time
- Identifies strengths & improvement areas

✅ **generatePracticeQuestion()**
- Creates custom practice questions
- Targets user's weak areas
- Includes explanations
- Practical, realistic scenarios

### API Endpoints

```
GET  /api/recommendations
     - Get personalized recommendations
     
GET  /api/recommendations/learning-path
     - Analyze user's learning journey
     
POST /api/recommendations/practice-question
     - Generate targeted practice questions
     Body: { "weakArea": "passwords" }
```

### Frontend Widget

- Beautiful gradient UI (purple/blue)
- Priority badges (high/medium/low)
- Type icons (module/skill/practice)
- Direct links to training modules
- Loading states & error handling
- "Powered by Claude AI" badge

---

## 📊 How Recommendations Work

### User Profile Analysis

The system analyzes:
1. **Completed Modules** - What you've finished
2. **Scores** - Your performance on each module
3. **Time Spent** - Total learning time
4. **Weak Areas** - Topics needing improvement
5. **Strengths** - What you excel at

### Claude AI Processing

Claude receives:
- Your learning profile
- Available training modules
- Performance history

Claude provides:
- Personalized recommendations
- Clear reasoning for each suggestion
- Priority levels
- Estimated time requirements

### Fallback System

If AI fails:
- Falls back to rule-based recommendations
- Ensures users always get suggestions
- No service interruption

---

## 🎨 Integration Examples

### Dashboard Integration

```typescript
// Simple integration
<AIRecommendationsWidget />

// With custom layout
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  <div className="lg:col-span-2">
    {/* Main content */}
  </div>
  <div>
    <AIRecommendationsWidget />
  </div>
</div>
```

### Training Page Integration

```typescript
// Show recommendations after completing a module
{sessionComplete && <AIRecommendationsWidget />}
```

### Custom API Usage

```typescript
// Fetch recommendations directly
const response = await fetch('/api/recommendations')
const { data } = await response.json()

// Get learning path analysis
const analysis = await fetch('/api/recommendations/learning-path')
const { data: path } = await analysis.json()

// Generate practice question
const question = await fetch('/api/recommendations/practice-question', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ weakArea: 'network security' })
})
```

---

## 🔧 Customization

### Adjust AI Prompts

Edit `apps/api/src/services/ai-recommendation.service.ts`:

```typescript
private buildRecommendationPrompt(profile: UserProfile): string {
  // Customize the prompt sent to Claude
  // Add your own modules, criteria, etc.
}
```

### Add More Recommendation Types

Extend the `Recommendation` interface:

```typescript
interface Recommendation {
  type: 'module' | 'skill' | 'practice' | 'challenge' | 'review'
  // ... other fields
}
```

### Modify Widget Appearance

Edit `apps/dashboard/src/components/recommendations/AIRecommendationsWidget.tsx`:
- Change colors (gradient, borders)
- Add/remove UI elements
- Customize loading states
- Modify card layout

---

## 💰 Cost Management

### Claude API Costs

**Model:** claude-3-5-sonnet-20241022
- Input: ~$3 per 1M tokens
- Output: ~$15 per 1M tokens

**Typical Usage:**
- Recommendation request: ~500 input tokens, ~300 output tokens
- Cost per request: ~$0.006 (less than 1 cent)
- 1000 requests: ~$6

### Optimization Tips

1. **Cache user profiles** - Don't regenerate for every request
2. **Batch requests** - Combine multiple users
3. **Set max_tokens** - Limit response length (already set to 1024)
4. **Use fallbacks** - Only call AI when needed

---

## 🧪 Testing

### Test Recommendations

```bash
# With curl
curl http://localhost:3001/api/recommendations

# Expected response:
{
  "success": true,
  "data": [
    {
      "type": "module",
      "title": "...",
      "description": "...",
      "priority": "high",
      "reason": "...",
      "estimatedTime": 30
    }
  ]
}
```

### Test Learning Path

```bash
curl http://localhost:3001/api/recommendations/learning-path

# Expected response:
{
  "success": true,
  "data": {
    "currentLevel": "beginner",
    "suggestedPath": ["module1", "module2"],
    "estimatedTimeToComplete": 60,
    "strengths": ["..."],
    "areasForImprovement": ["..."]
  }
}
```

---

## 🐛 Troubleshooting

### "Cannot find module '@anthropic-ai/sdk'"

**Solution:**
```bash
cd apps/api
npm install @anthropic-ai/sdk
```

### "API key is invalid"

**Solution:**
- Check your `.env` file has correct key
- Verify key starts with `sk-ant-api03-`
- Get new key from https://console.anthropic.com/

### "Failed to generate recommendations"

**Solutions:**
1. Check API key is set correctly
2. Verify internet connection
3. Check Anthropic service status
4. Review server logs for details

### Widget shows "Failed to fetch"

**Solutions:**
1. Ensure API server is running
2. Check route is registered in app.ts
3. Verify CORS settings
4. Check browser console for errors

---

## 📈 Future Enhancements

### Potential Features

1. **Skill Gap Analysis**
   - Identify exact knowledge gaps
   - Suggest targeted content

2. **Adaptive Difficulty**
   - AI adjusts based on performance
   - Progressive challenge levels

3. **Peer Comparison**
   - Compare with similar users
   - Team-based recommendations

4. **Content Generation**
   - AI creates custom scenarios
   - Personalized quiz questions

5. **Progress Predictions**
   - Estimate time to proficiency
   - Completion forecasts

---

## ✅ Verification Checklist

- [ ] Anthropic SDK installed
- [ ] API key added to .env
- [ ] Routes registered in app.ts
- [ ] Widget added to dashboard
- [ ] API endpoints responding
- [ ] Widget displays recommendations
- [ ] Error handling works
- [ ] Fallbacks active

---

## 📚 Additional Resources

- [Anthropic API Documentation](https://docs.anthropic.com/)
- [Claude Prompt Engineering](https://docs.anthropic.com/claude/docs/prompt-engineering)
- [Best Practices](https://docs.anthropic.com/claude/docs/best-practices)

---

**Status: Feature Complete ✅**

AI Recommendations is now fully integrated with:
- Claude API service
- 3 API endpoints
- Beautiful frontend widget
- Automatic fallbacks
- Error handling
