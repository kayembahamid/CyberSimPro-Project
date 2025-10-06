import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || ''
});

interface UserProfile {
  userId: string
  completedModules: string[]
  scores: { moduleId: string; score: number }[]
  timeSpent: number
  weakAreas: string[]
  strengths: string[]
}

interface Recommendation {
  type: 'module' | 'skill' | 'practice'
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  reason: string
  estimatedTime: number
  moduleId?: string
}

export class AIRecommendationService {
  // Generate personalized recommendations using Claude
  async generateRecommendations(userProfile: UserProfile): Promise<Recommendation[]> {
    try {
      const prompt = this.buildRecommendationPrompt(userProfile);
      
      const message = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        messages: [{
          role: 'user',
          content: prompt
        }]
      });

      const content = message.content[0];
      if (content.type === 'text') {
        return this.parseRecommendations(content.text);
      }
      
      return [];
    } catch (error) {
      console.error('AI recommendation error:', error);
      return this.getFallbackRecommendations(userProfile);
    }
  }

  // Build prompt for Claude
  private buildRecommendationPrompt(profile: UserProfile): string {
    return `You are a cybersecurity training advisor. Analyze this user's learning profile and provide 3-5 personalized recommendations.

User Profile:
- Completed Modules: ${profile.completedModules.join(', ') || 'None'}
- Recent Scores: ${profile.scores.map(s => `${s.moduleId}: ${s.score}%`).join(', ')}
- Total Time Spent: ${Math.round(profile.timeSpent / 60)} minutes
- Weak Areas: ${profile.weakAreas.join(', ') || 'Not enough data'}
- Strengths: ${profile.strengths.join(', ') || 'Building foundation'}

Available Training Modules:
1. Phishing Detection 101 - Learn to identify phishing attempts
2. Password Security Basics - Master password best practices
3. Network Security Basics - Understand network fundamentals
4. Ransomware Response - Learn ransomware prevention & response

Provide recommendations in this EXACT JSON format:
[
  {
    "type": "module|skill|practice",
    "title": "Brief title",
    "description": "Clear description",
    "priority": "high|medium|low",
    "reason": "Why this is recommended",
    "estimatedTime": 30,
    "moduleId": "module-id if applicable"
  }
]

Focus on:
1. Addressing weak areas
2. Building on strengths
3. Progressive difficulty
4. Practical skills

Return ONLY the JSON array, no other text.`;
  }

  // Parse Claude's response into recommendations
  private parseRecommendations(response: string): Recommendation[] {
    try {
      // Extract JSON from response
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }
      
      const recommendations = JSON.parse(jsonMatch[0]);
      
      // Validate and return
      return recommendations.map((rec: any) => ({
        type: rec.type || 'module',
        title: rec.title,
        description: rec.description,
        priority: rec.priority || 'medium',
        reason: rec.reason,
        estimatedTime: rec.estimatedTime || 30,
        moduleId: rec.moduleId
      }));
    } catch (error) {
      console.error('Parse error:', error);
      return [];
    }
  }

  // Fallback recommendations if AI fails
  private getFallbackRecommendations(profile: UserProfile): Recommendation[] {
    const recommendations: Recommendation[] = [];
    
    if (profile.completedModules.length === 0) {
      recommendations.push({
        type: 'module',
        title: 'Start with Phishing Detection',
        description: 'Perfect beginner module to learn email security',
        priority: 'high',
        reason: 'Best starting point for cybersecurity fundamentals',
        estimatedTime: 30,
        moduleId: 'phishing-detection-101'
      });
    }
    
    if (profile.weakAreas.includes('passwords')) {
      recommendations.push({
        type: 'module',
        title: 'Master Password Security',
        description: 'Strengthen your password management skills',
        priority: 'high',
        reason: 'Address identified weakness in password security',
        estimatedTime: 25,
        moduleId: 'password-security-basics'
      });
    }
    
    recommendations.push({
      type: 'practice',
      title: 'Daily Security Challenge',
      description: 'Practice identifying threats with daily scenarios',
      priority: 'medium',
      reason: 'Regular practice builds lasting skills',
      estimatedTime: 10
    });
    
    return recommendations;
  }

  // Analyze user's learning path and suggest next steps
  async analyzeLearningPath(userProfile: UserProfile): Promise<{
    currentLevel: string
    suggestedPath: string[]
    estimatedTimeToComplete: number
    strengths: string[]
    areasForImprovement: string[]
  }> {
    try {
      const prompt = `Analyze this cybersecurity learner's progress and provide a learning path assessment.

User Profile:
- Completed: ${userProfile.completedModules.join(', ')}
- Scores: ${userProfile.scores.map(s => `${s.score}%`).join(', ')}
- Time: ${Math.round(userProfile.timeSpent / 60)} minutes

Provide assessment in JSON format:
{
  "currentLevel": "beginner|intermediate|advanced",
  "suggestedPath": ["module1", "module2", "module3"],
  "estimatedTimeToComplete": 180,
  "strengths": ["strength1", "strength2"],
  "areasForImprovement": ["area1", "area2"]
}

Return ONLY JSON.`;

      const message = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 512,
        messages: [{ role: 'user', content: prompt }]
      });

      const content = message.content[0];
      if (content.type === 'text') {
        const jsonMatch = content.text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      }
    } catch (error) {
      console.error('Learning path analysis error:', error);
    }

    // Fallback
    return {
      currentLevel: 'beginner',
      suggestedPath: ['phishing-detection-101', 'password-security-basics'],
      estimatedTimeToComplete: 60,
      strengths: ['Eager to learn'],
      areasForImprovement: ['Build foundation']
    };
  }

  // Get AI-powered quiz question based on weak areas
  async generatePracticeQuestion(weakArea: string): Promise<{
    question: string
    options: string[]
    correctAnswer: number
    explanation: string
  }> {
    try {
      const prompt = `Generate a cybersecurity practice question about: ${weakArea}

Provide in JSON format:
{
  "question": "Question text",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswer": 0,
  "explanation": "Why this is correct"
}

Make it practical and realistic. Return ONLY JSON.`;

      const message = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 512,
        messages: [{ role: 'user', content: prompt }]
      });

      const content = message.content[0];
      if (content.type === 'text') {
        const jsonMatch = content.text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      }
    } catch (error) {
      console.error('Question generation error:', error);
    }

    // Fallback question
    return {
      question: `What is the best practice for ${weakArea}?`,
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 0,
      explanation: 'This follows security best practices.'
    };
  }
}

export const aiRecommendationService = new AIRecommendationService();
