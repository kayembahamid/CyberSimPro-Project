# 🏗️ CyberSim Pro - Complete Technical Architecture

**How Backend Connects to Frontend** - Complete Data Flow Guide

---

## 📊 System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                              │
│                      (React/Next.js App)                          │
└───────────────┬────────────────────────┬────────────────────────┘
                │                        │
                ↓                        ↓
┌───────────────────────┐    ┌──────────────────────────┐
│  Marketing Website    │    │  Dashboard App           │
│  Port: 3004           │    │  Port: 3001              │
│  Next.js 14           │    │  Next.js 14              │
└───────────┬───────────┘    └──────────┬───────────────┘
            │                           │
            │ HTTP Requests             │ HTTP Requests
            │ (Contact Form)            │ (API Calls)
            │                           │
            └───────────┬───────────────┘
                        │
                        ↓
        ┌───────────────────────────────────────┐
        │      API Backend (Express)            │
        │      Port: 3000                       │
        │                                       │
        │  ┌─────────────────────────────────┐ │
        │  │  Routes Layer                   │ │
        │  │  - auth.routes.ts               │ │
        │  │  - training.routes.ts           │ │
        │  │  - simulations.routes.ts        │ │
        │  │  - mcp.routes.ts                │ │
        │  └─────────────┬───────────────────┘ │
        │                │                      │
        │  ┌─────────────▼───────────────────┐ │
        │  │  Controllers Layer              │ │
        │  │  - Handle HTTP requests         │ │
        │  │  - Validate input               │ │
        │  │  - Call services                │ │
        │  └─────────────┬───────────────────┘ │
        │                │                      │
        │  ┌─────────────▼───────────────────┐ │
        │  │  Services Layer                 │ │
        │  │  - Business logic               │ │
        │  │  - Data processing              │ │
        │  │  - External API calls           │ │
        │  └─────────────┬───────────────────┘ │
        │                │                      │
        │  ┌─────────────▼───────────────────┐ │
        │  │  Prisma ORM                     │ │
        │  │  - Database queries             │ │
        │  │  - Data models                  │ │
        │  └─────────────┬───────────────────┘ │
        └────────────────┼─────────────────────┘
                         │
                         ↓
        ┌────────────────────────────────────┐
        │     PostgreSQL Database            │
        │     - Users                        │
        │     - Training modules             │
        │     - Simulations                  │
        │     - Certifications               │
        └────────────────────────────────────┘
                         │
                         ↓
        ┌────────────────────────────────────┐
        │     MCP Server                     │
        │     - AI Analysis Tools            │
        │     - Claude API Integration       │
        │     - Security Analysis            │
        └────────────────────────────────────┘
```

---

## 🔄 Complete Data Flow Examples

### Example 1: User Logs In (Authentication Flow)

#### Step-by-Step Flow:

```
1. User enters credentials on frontend
   ↓
2. Frontend sends POST request to API
   ↓
3. API validates and returns JWT token
   ↓
4. Frontend stores token and redirects to dashboard
```

#### **Frontend Code** (Dashboard - Login Page):
**File**: `apps/dashboard/src/app/login/page.tsx`

```typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    // 1. Frontend prepares data
    const loginData = {
      email,
      password
    }

    try {
      // 2. Frontend sends HTTP request to backend API
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      })

      // 3. Parse JSON response from backend
      const data = await response.json()

      if (response.ok) {
        // 4. Store JWT token received from backend
        localStorage.setItem('token', data.token)
        
        // 5. Redirect to dashboard
        router.push('/dashboard')
      } else {
        alert(data.message || 'Login failed')
      }
    } catch (error) {
      console.error('Login error:', error)
      alert('Network error - cannot connect to API')
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  )
}
```

#### **Backend Code** (API - Auth Route):
**File**: `apps/api/src/routes/auth.routes.ts`

```typescript
import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller'

const router = Router()
const authController = new AuthController()

// 1. API receives POST request at /api/auth/login
router.post('/login', authController.login)

export default router
```

#### **Backend Code** (API - Auth Controller):
**File**: `apps/api/src/controllers/auth.controller.ts`

```typescript
import { Request, Response } from 'express'
import { AuthService } from '../services/auth.service'
import jwt from 'jsonwebtoken'

export class AuthController {
  private authService = new AuthService()

  login = async (req: Request, res: Response) => {
    try {
      // 2. Extract credentials from request body
      const { email, password } = req.body

      // 3. Call service layer to validate credentials
      const user = await this.authService.validateUser(email, password)

      if (!user) {
        // 4a. If invalid, return error
        return res.status(401).json({
          message: 'Invalid credentials'
        })
      }

      // 4b. If valid, generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: '24h' }
      )

      // 5. Return success response with token
      return res.status(200).json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      })
    } catch (error) {
      console.error('Login error:', error)
      res.status(500).json({ message: 'Server error' })
    }
  }
}
```

#### **Backend Code** (API - Auth Service):
**File**: `apps/api/src/services/auth.service.ts`

```typescript
import { prisma } from '../lib/prisma'
import bcrypt from 'bcrypt'

export class AuthService {
  async validateUser(email: string, password: string) {
    // 1. Query database for user
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return null
    }

    // 2. Verify password hash
    const isValidPassword = await bcrypt.compare(password, user.passwordHash)

    if (!isValidPassword) {
      return null
    }

    // 3. Return user data (without password)
    return {
      id: user.id,
      email: user.email,
      name: user.name
    }
  }
}
```

---

### Example 2: Fetching Training Modules

#### **Frontend Code** (Dashboard - Training Page):
**File**: `apps/dashboard/src/app/dashboard/training/page.tsx`

```typescript
'use client'

import { useEffect, useState } from 'react'

interface TrainingModule {
  id: string
  title: string
  description: string
  difficulty: string
  duration: number
}

export default function TrainingPage() {
  const [modules, setModules] = useState<TrainingModule[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTrainingModules()
  }, [])

  const fetchTrainingModules = async () => {
    try {
      // 1. Get JWT token from storage
      const token = localStorage.getItem('token')

      // 2. Send authenticated request to backend
      const response = await fetch('http://localhost:3000/api/training', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      // 3. Parse JSON response
      const data = await response.json()

      if (response.ok) {
        // 4. Update state with received data
        setModules(data.modules)
      } else {
        console.error('Failed to fetch modules:', data.message)
      }
    } catch (error) {
      console.error('Network error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Training Modules</h1>
      {modules.map(module => (
        <div key={module.id}>
          <h2>{module.title}</h2>
          <p>{module.description}</p>
          <span>{module.difficulty}</span>
          <span>{module.duration} mins</span>
        </div>
      ))}
    </div>
  )
}
```

#### **Backend Code** (API - Training Route):
**File**: `apps/api/src/routes/training.routes.ts`

```typescript
import { Router } from 'express'
import { TrainingController } from '../controllers/training.controller'
import { authMiddleware } from '../middleware/auth'

const router = Router()
const trainingController = new TrainingController()

// Protected route - requires authentication
router.get('/', authMiddleware, trainingController.getAllModules)

export default router
```

#### **Backend Code** (API - Auth Middleware):
**File**: `apps/api/src/middleware/auth.ts`

```typescript
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1. Extract token from Authorization header
    const authHeader = req.headers.authorization
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' })
    }

    const token = authHeader.substring(7) // Remove 'Bearer '

    // 2. Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)

    // 3. Attach user info to request
    req.user = decoded

    // 4. Continue to next middleware/controller
    next()
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' })
  }
}
```

#### **Backend Code** (API - Training Controller):
**File**: `apps/api/src/controllers/training.controller.ts`

```typescript
import { Request, Response } from 'express'
import { TrainingService } from '../services/training.service'

export class TrainingController {
  private trainingService = new TrainingService()

  getAllModules = async (req: Request, res: Response) => {
    try {
      // User is authenticated (from middleware)
      const userId = req.user.userId

      // 1. Get modules from service
      const modules = await this.trainingService.getModulesForUser(userId)

      // 2. Return data to frontend
      res.status(200).json({
        modules,
        count: modules.length
      })
    } catch (error) {
      console.error('Error fetching modules:', error)
      res.status(500).json({ message: 'Server error' })
    }
  }
}
```

#### **Backend Code** (API - Training Service):
**File**: `apps/api/src/services/training.service.ts`

```typescript
import { prisma } from '../lib/prisma'

export class TrainingService {
  async getModulesForUser(userId: string) {
    // 1. Query database with Prisma
    const modules = await prisma.trainingModule.findMany({
      include: {
        // Include user progress
        progress: {
          where: { userId }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // 2. Transform data for frontend
    return modules.map(module => ({
      id: module.id,
      title: module.title,
      description: module.description,
      difficulty: module.difficulty,
      duration: module.duration,
      isCompleted: module.progress.length > 0 && module.progress[0].completed
    }))
  }
}
```

---

### Example 3: Running MCP Simulation

#### **Frontend Code** (Dashboard - Simulation):
**File**: `apps/dashboard/src/app/dashboard/simulations/page.tsx`

```typescript
'use client'

import { useState } from 'react'

export default function SimulationPage() {
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)

  const runNetworkAnalysis = async () => {
    setLoading(true)

    try {
      const token = localStorage.getItem('token')

      // 1. Send simulation request to MCP endpoint
      const response = await fetch('http://localhost:3000/api/mcp/analyze-network', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          trafficData: {
            packets: 1000,
            protocols: ['TCP', 'UDP', 'HTTP'],
            duration: 60
          }
        })
      })

      const data = await response.json()

      // 2. Display results
      setResults(data)
    } catch (error) {
      console.error('Simulation error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button onClick={runNetworkAnalysis} disabled={loading}>
        {loading ? 'Analyzing...' : 'Run Network Analysis'}
      </button>

      {results && (
        <div>
          <h2>Analysis Results:</h2>
          <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
```

#### **Backend Code** (API - MCP Route):
**File**: `apps/api/src/routes/mcp.routes.ts`

```typescript
import { Router } from 'express'
import { MCPController } from '../controllers/mcp.controller'
import { authMiddleware } from '../middleware/auth'

const router = Router()
const mcpController = new MCPController()

router.post('/analyze-network', authMiddleware, mcpController.analyzeNetwork)

export default router
```

#### **Backend Code** (API - MCP Controller):
**File**: `apps/api/src/controllers/mcp.controller.ts`

```typescript
import { Request, Response } from 'express'
import { MCPService } from '../services/mcp.service'

export class MCPController {
  private mcpService = new MCPService()

  analyzeNetwork = async (req: Request, res: Response) => {
    try {
      const { trafficData } = req.body

      // 1. Call MCP service for analysis
      const analysis = await this.mcpService.analyzeNetworkTraffic(trafficData)

      // 2. Save results to database
      await this.mcpService.saveAnalysisResults(
        req.user.userId,
        analysis
      )

      // 3. Return results
      res.status(200).json({
        success: true,
        analysis
      })
    } catch (error) {
      console.error('MCP error:', error)
      res.status(500).json({ message: 'Analysis failed' })
    }
  }
}
```

#### **Backend Code** (MCP Service):
**File**: `apps/api/src/services/mcp.service.ts`

```typescript
import Anthropic from '@anthropic-ai/sdk'
import { prisma } from '../lib/prisma'

export class MCPService {
  private anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
  })

  async analyzeNetworkTraffic(trafficData: any) {
    // 1. Call Claude AI via MCP for analysis
    const message = await this.anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [{
        role: 'user',
        content: `Analyze this network traffic data and identify any security threats:
        
        ${JSON.stringify(trafficData, null, 2)}
        
        Provide:
        1. Threat assessment
        2. Suspicious patterns
        3. Recommendations`
      }]
    })

    // 2. Parse AI response
    const analysis = {
      threats: this.extractThreats(message.content),
      patterns: this.extractPatterns(message.content),
      recommendations: this.extractRecommendations(message.content),
      riskScore: this.calculateRiskScore(message.content),
      timestamp: new Date()
    }

    return analysis
  }

  async saveAnalysisResults(userId: string, analysis: any) {
    // 3. Save to database
    await prisma.analysisResult.create({
      data: {
        userId,
        type: 'network_analysis',
        results: analysis,
        createdAt: new Date()
      }
    })
  }

  private extractThreats(content: any): string[] {
    // Parse AI response for threats
    return []
  }

  private extractPatterns(content: any): string[] {
    return []
  }

  private extractRecommendations(content: any): string[] {
    return []
  }

  private calculateRiskScore(content: any): number {
    return 0
  }
}
```

---

## 🔌 API Client Pattern (Centralized)

### **Better Approach**: Using API Client Service

**File**: `apps/dashboard/src/lib/api-client.ts`

```typescript
// Centralized API client with all endpoints

class APIClient {
  private baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
  private token: string | null = null

  constructor() {
    // Get token from localStorage
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token')
    }
  }

  // Generic request method
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    
    const headers = {
      'Content-Type': 'application/json',
      ...(this.token && { 'Authorization': `Bearer ${this.token}` }),
      ...options.headers
    }

    const response = await fetch(url, {
      ...options,
      headers
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`)
    }

    return response.json()
  }

  // Auth endpoints
  auth = {
    login: (email: string, password: string) =>
      this.request('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      }),

    signup: (data: any) =>
      this.request('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify(data)
      })
  }

  // Training endpoints
  training = {
    getAll: () => this.request('/api/training'),
    
    getById: (id: string) => this.request(`/api/training/${id}`),
    
    getProgress: (userId: string) =>
      this.request(`/api/training/progress/${userId}`)
  }

  // Simulation endpoints
  simulations = {
    getAll: () => this.request('/api/simulations'),
    
    create: (data: any) =>
      this.request('/api/simulations', {
        method: 'POST',
        body: JSON.stringify(data)
      }),

    getResults: (id: string) =>
      this.request(`/api/simulations/${id}/results`)
  }

  // MCP endpoints
  mcp = {
    analyzeNetwork: (data: any) =>
      this.request('/api/mcp/analyze-network', {
        method: 'POST',
        body: JSON.stringify(data)
      }),

    detectThreats: (data: any) =>
      this.request('/api/mcp/detect-threats', {
        method: 'POST',
        body: JSON.stringify(data)
      }),

    runForensics: (data: any) =>
      this.request('/api/mcp/forensics', {
        method: 'POST',
        body: JSON.stringify(data)
      })
  }
}

// Export singleton instance
export const apiClient = new APIClient()
```

### **Using the API Client**:

```typescript
// In any component:
import { apiClient } from '@/lib/api-client'

// Login
const result = await apiClient.auth.login(email, password)

// Get training modules
const modules = await apiClient.training.getAll()

// Run MCP analysis
const analysis = await apiClient.mcp.analyzeNetwork(trafficData)
```

---

## 🗄️ Database Schema (Prisma)

**File**: `apps/api/prisma/schema.prisma`

```prisma
// User model
model User {
  id            String   @id @default(uuid())
  email         String   @unique
  passwordHash  String
  name          String
  role          String   @default("user")
  createdAt     DateTime @default(now())
  
  // Relations
  progress      TrainingProgress[]
  simulations   Simulation[]
  certifications Certification[]
}

// Training module model
model TrainingModule {
  id          String   @id @default(uuid())
  title       String
  description String
  difficulty  String
  duration    Int
  content     Json
  createdAt   DateTime @default(now())
  
  // Relations
  progress    TrainingProgress[]
}

// User progress model
model TrainingProgress {
  id              String   @id @default(uuid())
  userId          String
  moduleId        String
  completed       Boolean  @default(false)
  score           Int?
  completedAt     DateTime?
  
  // Relations
  user    User            @relation(fields: [userId], references: [id])
  module  TrainingModule  @relation(fields: [moduleId], references: [id])
}

// Simulation model
model Simulation {
  id          String   @id @default(uuid())
  userId      String
  type        String
  status      String
  results     Json?
  createdAt   DateTime @default(now())
  
  user        User     @relation(fields: [userId], references: [id])
}
```

---

## 🔄 Complete Request/Response Cycle

### Example: User Completes Training Module

```
1. USER ACTION (Frontend)
   ↓
   User clicks "Complete Module" button

2. FRONTEND (React/Next.js)
   ↓
   const response = await fetch('http://localhost:3000/api/training/123/complete', {
     method: 'POST',
     headers: { 'Authorization': 'Bearer token123' }
   })

3. API GATEWAY (Express)
   ↓
   Request hits: POST /api/training/:id/complete

4. MIDDLEWARE (Auth)
   ↓
   - Verify JWT token
   - Extract user ID
   - Attach to request

5. ROUTE HANDLER
   ↓
   router.post('/:id/complete', authMiddleware, controller.completeModule)

6. CONTROLLER
   ↓
   - Extract module ID from params
   - Call service layer

7. SERVICE LAYER
   ↓
   - Business logic
   - Validate completion
   - Calculate score

8. DATABASE (Prisma)
   ↓
   await prisma.trainingProgress.create({
     data: {
       userId,
       moduleId,
       completed: true,
       completedAt: new Date()
     }
   })

9. RESPONSE UP THE CHAIN
   ↓
   Service → Controller → Route → API Gateway

10. FRONTEND RECEIVES
    ↓
    const data = await response.json()
    // Update UI with completion status
```

---

## 🔒 Security Flow

### JWT Token Authentication:

```
1. USER LOGS IN
   ↓
2. API VERIFIES CREDENTIALS
   ↓
3. API GENERATES JWT TOKEN
   {
     userId: "123",
     email: "user@example.com",
     exp: 1234567890
   }
   ↓
4. FRONTEND STORES TOKEN
   localStorage.setItem('token', token)
   ↓
5. SUBSEQUENT REQUESTS
   headers: {
     'Authorization': 'Bearer eyJhbGc...'
   }
   ↓
6. API VERIFIES TOKEN
   - Check signature
   - Check expiration
   - Extract user info
   ↓
7. GRANT ACCESS
   Request proceeds to controller
```

---

## 📦 Environment Variables

### **Frontend** (`.env.local`):
```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_MCP_ENABLED=true
```

### **Backend** (`.env`):
```bash
DATABASE_URL=postgresql://user:pass@localhost:5432/cybersim
JWT_SECRET=your-secret-key-here
ANTHROPIC_API_KEY=sk-ant-...
PORT=3000
NODE_ENV=development
```

---

## 🚀 Complete Startup Sequence

```bash
# Terminal 1: Start Database
docker-compose up -d postgres

# Terminal 2: Start API Backend
cd apps/api
npm install
npx prisma migrate dev
npx prisma db seed
npm run dev
# → http://localhost:3000

# Terminal 3: Start Dashboard
cd apps/dashboard
npm install
npm run dev
# → http://localhost:3001

# Terminal 4: Start Marketing Site
cd apps/marketing-nextjs
npm install
npm run dev
# → http://localhost:3004
```

---

## 📊 Data Flow Summary

| Layer | Technology | Purpose | Port |
|-------|-----------|---------|------|
| Frontend (Marketing) | Next.js 14 | Public website | 3004 |
| Frontend (Dashboard) | Next.js 14 | User portal | 3001 |
| API Gateway | Express | REST API | 3000 |
| Database | PostgreSQL | Data storage | 5432 |
| MCP Server | Node.js | AI analysis | - |

---

## 🎯 Key Takeaways

1. **Frontend sends HTTP requests** to backend API
2. **API validates requests** using middleware
3. **Controllers handle routing** and call services
4. **Services contain business logic** and database operations
5. **Prisma ORM** manages database queries
6. **Responses flow back** through the same chain
7. **JWT tokens** secure all authenticated requests
8. **MCP integration** provides AI-powered analysis

---

**This is the complete technical architecture showing how every piece connects!**
