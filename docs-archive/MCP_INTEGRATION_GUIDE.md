# MCP Server Integration Guide

This document explains how the MCP (Model Context Protocol) server integrates with the CyberSim Pro platform.

## 🎯 Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    CyberSim Pro Platform                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────┐      ┌──────────────────┐            │
│  │  Marketing Site  │      │    Dashboard     │            │
│  │   (Next.js)      │      │    (Next.js)     │            │
│  │  Port: 3004      │      │    Port: 3000    │            │
│  └──────────────────┘      └──────────────────┘            │
│           │                         │                        │
│           └────────┬────────────────┘                        │
│                    │                                         │
│                    ▼                                         │
│         ┌──────────────────────┐                            │
│         │    Express API       │                            │
│         │    Port: 3003        │                            │
│         └──────────────────────┘                            │
│                    │                                         │
│                    │ uses                                    │
│                    ▼                                         │
│         ┌──────────────────────┐                            │
│         │  MCP Client Service  │                            │
│         │  (mcp-client.service)│                            │
│         └──────────────────────┘                            │
│                    │                                         │
│                    │ spawns & communicates via stdio        │
│                    ▼                                         │
│    ┌────────────────────────────────────┐                   │
│    │       MCP Server Process           │                   │
│    │  (packages/mcp-server)             │                   │
│    │                                    │                   │
│    │  ┌──────────────────────────────┐ │                   │
│    │  │  6 Core Simulation Tools:    │ │                   │
│    │  │  1. create_scenario          │ │                   │
│    │  │  2. simulate_attack          │ │                   │
│    │  │  3. analyze_network          │ │                   │
│    │  │  4. investigate_incident     │ │                   │
│    │  │  5. forensics_analysis       │ │                   │
│    │  │  6. generate_report          │ │                   │
│    │  └──────────────────────────────┘ │                   │
│    └────────────────────────────────────┘                   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## 📦 Components

### 1. MCP Server (`packages/mcp-server`)
**Location**: `CyberSimPro-Project/packages/mcp-server/`

The MCP server is a standalone Node.js process that provides 6 core cybersecurity simulation tools:

- **create_scenario** - Generate realistic training scenarios
- **simulate_attack** - Execute multi-phase attack simulations
- **analyze_network** - Network analysis and threat detection
- **investigate_incident** - Incident response investigations
- **forensics_analysis** - Digital forensics analysis
- **generate_report** - Auto-generate security reports

**Key Files**:
- `src/index.ts` - Main server entry point
- `src/scenarios/scenarioManager.ts` - Scenario management
- `src/simulators/threatSimulator.ts` - Attack simulation engine
- `src/simulators/networkSimulator.ts` - Network analysis
- `src/managers/incidentResponseManager.ts` - Incident response
- `src/analyzers/forensicsAnalyzer.ts` - Forensics analysis

### 2. MCP Client Service (`apps/api`)
**Location**: `CyberSimPro-Project/apps/api/src/services/mcp-client.service.ts`

The MCP Client Service acts as a bridge between the Express API and the MCP server:

- Spawns the MCP server process
- Communicates via stdio transport
- Exposes typed methods for each MCP tool
- Handles connection management and error handling

**Usage Example**:
```typescript
import { getMCPClient } from './services/mcp-client.service';

const mcpClient = getMCPClient();

// Create a scenario
const scenario = await mcpClient.createScenario({
  type: 'phishing',
  difficulty: 'intermediate',
  environment: 'corporate'
});

// Simulate an attack
const simulation = await mcpClient.simulateAttack({
  attack_type: 'ransomware',
  target: 'file-server-01',
  intensity: 'high'
});
```

### 3. API Routes (To Be Created)
**Location**: `CyberSimPro-Project/apps/api/src/routes/mcp.routes.ts`

REST API endpoints that expose MCP functionality:

```
POST /api/mcp/scenarios - Create scenario
POST /api/mcp/attacks - Simulate attack
POST /api/mcp/network-analysis - Analyze network
POST /api/mcp/incidents/:id - Investigate incident
POST /api/mcp/forensics - Perform forensics
POST /api/mcp/reports - Generate report
```

## 🚀 Setup Instructions

### 1. Build the MCP Server

```bash
cd CyberSimPro-Project/packages/mcp-server
npm install
npm run build
```

This compiles the TypeScript MCP server to `build/index.js`.

### 2. Install API Dependencies

```bash
cd CyberSimPro-Project/apps/api
npm install
```

This installs `@modelcontextprotocol/sdk` and other dependencies.

### 3. Start the System

**Option A: Start All Services**
```bash
# Terminal 1 - API (includes MCP server)
cd CyberSimPro-Project/apps/api
npm run dev

# Terminal 2 - Dashboard
cd CyberSimPro-Project/apps/dashboard
npm run dev

# Terminal 3 - Marketing
cd CyberSimPro-Project/apps/marketing-nextjs
npm run dev
```

**Option B: Use Turbo**
```bash
cd CyberSimPro-Project
npm run dev
```

## 🔧 Configuration

### Environment Variables

**API (.env)**:
```env
PORT=3003
MCP_SERVER_PATH=../packages/mcp-server/build/index.js
```

### MCP Server Configuration

The MCP server includes:
- **RBAC** - Role-based access control
- **Audit Logging** - All operations logged
- **Metrics Tracking** - Performance metrics
- **Control Feed** - Security control recommendations

## 📊 Data Flow

### Example: Creating and Running a Simulation

1. **User Action** (Dashboard)
   - User clicks "Create New Simulation"
   - Fills out form with scenario details

2. **API Request**
   ```typescript
   POST /api/mcp/scenarios
   {
     "type": "phishing",
     "difficulty": "intermediate",
     "environment": "corporate"
   }
   ```

3. **MCP Client Service**
   ```typescript
   const mcpClient = getMCPClient();
   const scenario = await mcpClient.createScenario(params);
   ```

4. **MCP Server** (via stdio)
   - Receives `create_scenario` tool call
   - Generates realistic scenario with:
     - MITRE ATT&CK mapping
     - IOCs (Indicators of Compromise)
     - Detection rules
     - Training objectives

5. **Response Flow**
   ```
   MCP Server → MCP Client → API → Dashboard → User
   ```

## 🎯 Integration Points

### Dashboard Integration

The dashboard should integrate MCP tools via API calls:

```typescript
// In Dashboard component
import { apiClient } from '@/lib/api-client';

// Create scenario
const scenario = await apiClient.post('/api/mcp/scenarios', {
  type: 'ransomware',
  difficulty: 'advanced'
});

// Start simulation
const simulation = await apiClient.post('/api/mcp/attacks', {
  attack_type: 'ransomware',
  target: scenario.target,
  intensity: 'high'
});

// Monitor simulation status
const status = await apiClient.get(`/api/mcp/attacks/${simulation.id}/status`);
```

### Marketing Site Integration

The marketing site showcases MCP capabilities:

- **Hero Section** - "6 MCP Simulation Tools"
- **Features Section** - Each of the 6 tools explained
- **Interactive Demo** (Future) - Live tool demonstrations

## 📝 API Endpoints (To Implement)

### Scenarios
```
POST   /api/mcp/scenarios              - Create scenario
GET    /api/mcp/scenarios              - List scenarios
GET    /api/mcp/scenarios/:id          - Get scenario details
DELETE /api/mcp/scenarios/:id          - Delete scenario
```

### Attacks
```
POST   /api/mcp/attacks                - Simulate attack
GET    /api/mcp/attacks                - List active simulations
GET    /api/mcp/attacks/:id            - Get simulation details
POST   /api/mcp/attacks/:id/stop       - Stop simulation
DELETE /api/mcp/attacks/:id            - Terminate simulation
```

### Network Analysis
```
POST   /api/mcp/network-analysis       - Analyze network segment
GET    /api/mcp/network-analysis/:id   - Get analysis results
```

### Incidents
```
POST   /api/mcp/incidents/:id/investigate  - Investigate incident
GET    /api/mcp/incidents                  - List investigations
GET    /api/mcp/incidents/:id              - Get investigation details
```

### Forensics
```
POST   /api/mcp/forensics              - Perform forensics analysis
GET    /api/mcp/forensics/:id          - Get forensics results
```

### Reports
```
POST   /api/mcp/reports                - Generate report
GET    /api/mcp/reports                - List reports
GET    /api/mcp/reports/:id            - Get report
GET    /api/mcp/reports/:id/download   - Download report PDF
```

## 🔒 Security Considerations

1. **Authentication** - All MCP endpoints require JWT authentication
2. **Authorization** - RBAC enforced at MCP server level
3. **Audit Logging** - All operations logged with operator context
4. **Rate Limiting** - Protect against abuse
5. **Approval Tokens** - High-impact operations require approval

## 🧪 Testing

### Unit Tests
```bash
cd packages/mcp-server
npm test
```

### Integration Tests
```bash
cd apps/api
npm test
```

### Manual Testing
```bash
# Test MCP client directly
cd apps/api
npm run dev

# In another terminal, test endpoints
curl -X POST http://localhost:3003/api/mcp/scenarios \
  -H "Content-Type: application/json" \
  -d '{"type":"phishing","difficulty":"beginner"}'
```

## 📚 Next Steps

1. ✅ MCP Server built and ready
2. ✅ MCP Client Service created
3. ✅ Marketing site updated with MCP focus
4. ⏳ Create API routes for MCP tools
5. ⏳ Integrate with Dashboard UI
6. ⏳ Add real-time simulation monitoring
7. ⏳ Implement WebSocket for live updates
8. ⏳ Add report PDF generation
9. ⏳ Build admin panel for MCP management

## 🐛 Troubleshooting

### MCP Server Not Starting
- Check that the server is built: `ls packages/mcp-server/build/`
- Verify Node.js version: `node --version` (requires v18+)
- Check logs: `tail -f packages/mcp-server/logs/audit.log`

### Connection Errors
- Ensure MCP server path is correct in environment
- Check stdio communication is working
- Verify no port conflicts

### Tool Execution Fails
- Check operator permissions
- Verify required parameters
- Review audit logs for error details

## 📞 Support

For questions or issues:
- Check existing documentation
- Review MCP server source code
- Contact the development team
