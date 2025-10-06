# MCP API Integration Guide

## Overview

This document describes the integration of the Model Context Protocol (MCP) server with the CyberSim Pro API, providing REST endpoints for advanced cybersecurity simulations and analysis.

## Completed Tasks

### 1. Marketing Website ✅
- **Location**: `apps/marketing-nextjs/`
- **Tech Stack**: Next.js 14, Tailwind CSS, Framer Motion
- **Features**:
  - Hero section with animated gradients
  - Features showcase with interactive cards
  - Pricing tiers section
  - Contact form
  - Fully responsive design
  - Smooth scroll navigation

**To run**:
```bash
cd apps/marketing-nextjs
npm install
npm run dev
```
Visit: http://localhost:3000

### 2. MCP Server Build Fix ✅
- **Issue**: TypeScript compilation errors with MCP SDK v0.5.0
- **Resolution**: 
  - Updated to MCP SDK v1.0.2
  - Fixed `setRequestHandler` method usage
  - Added proper type annotations
  - Build now completes successfully

**To build**:
```bash
cd packages/mcp-server
npm run build
```

### 3. MCP API Routes ✅
- **Location**: `apps/api/src/routes/mcp.routes.ts`
- **Registered**: Routes added to `app.ts` under `/api/mcp`

## Available API Endpoints

### Base URL
```
http://localhost:4000/api/mcp
```

### Endpoints

#### 1. Create Scenario
```http
POST /api/mcp/scenarios
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "phishing" | "ransomware" | "ddos" | "data_breach" | "insider_threat" | "apt",
  "difficulty": "beginner" | "intermediate" | "advanced" | "expert",
  "environment": "corporate",
  "sector": "finance",
  "adversary_profile": "apt29",
  "focus_cves": ["CVE-2021-44228"]
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "scenario-123",
    "type": "phishing",
    "difficulty": "intermediate",
    "description": "...",
    "objectives": [],
    "indicators": []
  }
}
```

#### 2. Simulate Attack
```http
POST /api/mcp/attacks
Authorization: Bearer <token>
Content-Type: application/json

{
  "attack_type": "spear_phishing",
  "target": "corporate-network",
  "intensity": "medium" | "low" | "high" | "critical"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "simulationId": "sim-456",
    "attackType": "spear_phishing",
    "target": "corporate-network",
    "status": "running",
    "detectionRate": 75.5,
    "timeline": []
  }
}
```

#### 3. Analyze Network
```http
POST /api/mcp/network-analysis
Authorization: Bearer <token>
Content-Type: application/json

{
  "network_segment": "prod-dmz",
  "duration": 15,
  "focus": ["anomalies", "vulnerabilities", "threats"]
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "segmentId": "prod-dmz",
    "anomalies": [],
    "vulnerabilities": [],
    "threats": [],
    "detectionArtifacts": {
      "sigma": [],
      "splunk": [],
      "kql": []
    }
  }
}
```

#### 4. Investigate Incident
```http
POST /api/mcp/incidents/:id/investigate
Authorization: Bearer <token>
Content-Type: application/json

{
  "scope": "initial" | "full" | "deep_dive"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "incidentId": "inc-789",
    "scope": "full",
    "severity": "high",
    "status": "investigating",
    "findings": [],
    "timeline": []
  }
}
```

#### 5. Forensics Analysis
```http
POST /api/mcp/forensics
Authorization: Bearer <token>
Content-Type: application/json

{
  "artifact_type": "memory" | "disk" | "network" | "logs" | "registry",
  "system_id": "srv-001",
  "analysis_depth": "quick" | "standard" | "comprehensive"
}
```

#### 6. Generate Reports
```http
POST /api/mcp/reports
Authorization: Bearer <token>
Content-Type: application/json

{
  "report_type": "incident" | "vulnerability" | "compliance" | "executive",
  "incident_ids": ["inc-123", "inc-456"],
  "include_recommendations": true,
  "mode": "standard" | "facilitation" | "executive"
}
```

#### 7. List Metrics
```http
GET /api/mcp/metrics
Authorization: Bearer <token>
```

#### 8. Export Controls
```http
GET /api/mcp/controls
Authorization: Bearer <token>
```

#### 9. Stop Simulation
```http
POST /api/mcp/simulations/:id/stop
Authorization: Bearer <token>
Content-Type: application/json

{
  "reason": "Exercise completed"
}
```

#### 10. Health Check
```http
GET /api/mcp/health
```

**Response**:
```json
{
  "success": true,
  "data": {
    "status": "connected",
    "serverUrl": "stdio"
  }
}
```

## Integration with Dashboard

### Step 1: Update API Client

In `apps/dashboard/src/lib/api-client.ts`, add MCP service methods:

```typescript
// MCP Services
export const mcpService = {
  createScenario: async (data: CreateScenarioRequest) => {
    return api.post('/mcp/scenarios', data);
  },
  
  simulateAttack: async (data: SimulateAttackRequest) => {
    return api.post('/mcp/attacks', data);
  },
  
  analyzeNetwork: async (data: NetworkAnalysisRequest) => {
    return api.post('/mcp/network-analysis', data);
  },
  
  investigateIncident: async (incidentId: string, scope?: string) => {
    return api.post(`/mcp/incidents/${incidentId}/investigate`, { scope });
  },
  
  performForensics: async (data: ForensicsRequest) => {
    return api.post('/mcp/forensics', data);
  },
  
  generateReport: async (data: ReportRequest) => {
    return api.post('/mcp/reports', data);
  },
  
  getMetrics: async () => {
    return api.get('/mcp/metrics');
  },
  
  getControls: async () => {
    return api.get('/mcp/controls');
  },
  
  stopSimulation: async (simulationId: string, reason?: string) => {
    return api.post(`/mcp/simulations/${simulationId}/stop`, { reason });
  },
  
  checkHealth: async () => {
    return api.get('/mcp/health');
  },
};
```

### Step 2: Update Scenario Page

In `apps/dashboard/src/app/dashboard/scenarios/page.tsx`:

```typescript
import { mcpService } from '@/lib/api-client';

// In your component:
const handleCreateScenario = async (data: any) => {
  try {
    const response = await mcpService.createScenario(data);
    // Handle success
    toast.success('Scenario created successfully');
  } catch (error) {
    toast.error('Failed to create scenario');
  }
};
```

### Step 3: Update Simulations Page

In `apps/dashboard/src/app/dashboard/simulations/page.tsx`:

```typescript
import { mcpService } from '@/lib/api-client';

// In your component:
const handleStartSimulation = async (data: any) => {
  try {
    const response = await mcpService.simulateAttack(data);
    // Handle success
    setSimulations(prev => [...prev, response.data]);
  } catch (error) {
    toast.error('Failed to start simulation');
  }
};

const handleStopSimulation = async (id: string) => {
  try {
    await mcpService.stopSimulation(id, 'User requested stop');
    // Update UI
  } catch (error) {
    toast.error('Failed to stop simulation');
  }
};
```

## Architecture

```
┌─────────────────┐
│   Dashboard     │
│   (Next.js)     │
└────────┬────────┘
         │
         │ HTTP/REST
         │
┌────────▼────────┐
│   API Server    │
│   (Express)     │
│  /api/mcp/*     │
└────────┬────────┘
         │
         │ MCP Client
         │
┌────────▼────────┐
│   MCP Server    │
│  (stdio/IPC)    │
│                 │
│ - Scenarios     │
│ - Simulations   │
│ - Analysis      │
│ - Forensics     │
└─────────────────┘
```

## Environment Variables

Add to `apps/api/.env`:

```env
# MCP Configuration
MCP_SERVER_URL=stdio
MCP_SERVER_PATH=../packages/mcp-server/build/index.js
```

## Testing

### Test Health Endpoint
```bash
curl http://localhost:4000/api/mcp/health
```

### Test with Authentication
```bash
curl -X POST http://localhost:4000/api/mcp/scenarios \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "phishing",
    "difficulty": "beginner"
  }'
```

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message here"
}
```

Common HTTP status codes:
- `200`: Success
- `400`: Bad request (validation error)
- `401`: Unauthorized (missing/invalid token)
- `404`: Not found
- `500`: Server error

## Next Steps

1. **Update Dashboard UI**
   - Add MCP integration to existing scenario creation forms
   - Add simulation controls (start/stop buttons)
   - Display live simulation status
   - Show network analysis results

2. **Add Real-time Updates**
   - Implement WebSocket for live simulation updates
   - Show progress indicators
   - Stream logs and events

3. **Enhance Reporting**
   - Create report templates
   - Add PDF export functionality
   - Implement report scheduling

4. **Add Monitoring**
   - Track MCP server health
   - Monitor active simulations
   - Log performance metrics

## Troubleshooting

### MCP Server Not Connecting
```bash
# Check if MCP server builds
cd packages/mcp-server
npm run build

# Check logs
tail -f apps/api/logs/error.log
```

### Authentication Issues
- Ensure JWT token is included in Authorization header
- Token must be prefixed with "Bearer "
- Check token expiration

### TypeScript Errors
```bash
# Rebuild the project
cd apps/api
npm run build
```

## Resources

- [MCP SDK Documentation](https://modelcontextprotocol.io)
- [API Documentation](./docs/API_DOCUMENTATION.md)
- [MCP Integration Guide](./MCP_INTEGRATION_GUIDE.md)

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review existing documentation
3. Check application logs
4. Contact the development team

---

**Status**: ✅ Ready for Dashboard Integration
**Last Updated**: October 4, 2025
