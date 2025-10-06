import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { getMCPClient } from '../services/mcp-client.service';
import { authenticate } from '../middleware/auth';

const router = Router();
const mcpClient = getMCPClient();

// Extend Express Request type to include user
interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
    email?: string;
  };
}

// Validation schemas
const createScenarioSchema = z.object({
  type: z.enum(['phishing', 'ransomware', 'ddos', 'data_breach', 'insider_threat', 'apt']),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced', 'expert']),
  environment: z.string().optional(),
  sector: z.string().optional(),
  adversary_profile: z.string().optional(),
  focus_cves: z.array(z.string()).optional(),
});

const simulateAttackSchema = z.object({
  attack_type: z.string(),
  target: z.string(),
  intensity: z.enum(['low', 'medium', 'high', 'critical']).optional(),
});

const analyzeNetworkSchema = z.object({
  network_segment: z.string(),
  duration: z.number().optional(),
  focus: z.array(z.string()).optional(),
});

const investigateIncidentSchema = z.object({
  incident_id: z.string(),
  scope: z.enum(['initial', 'full', 'deep_dive']).optional(),
});

const forensicsAnalysisSchema = z.object({
  artifact_type: z.enum(['memory', 'disk', 'network', 'logs', 'registry']),
  system_id: z.string(),
  analysis_depth: z.enum(['quick', 'standard', 'comprehensive']).optional(),
});

const generateReportSchema = z.object({
  report_type: z.enum(['incident', 'vulnerability', 'compliance', 'executive']),
  incident_ids: z.array(z.string()).optional(),
  include_recommendations: z.boolean().optional(),
  mode: z.enum(['standard', 'facilitation', 'executive']).optional(),
});

// POST /api/mcp/scenarios - Create scenario
router.post('/scenarios', authenticate, async (req, res) => {
  try {
    const validatedData = createScenarioSchema.parse(req.body);
    
    const result = await mcpClient.callTool('create_scenario', validatedData);
    
    res.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error('Error creating scenario:', error);
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to create scenario',
    });
  }
});

// POST /api/mcp/attacks - Simulate attack
router.post('/attacks', authenticate, async (req: AuthRequest, res) => {
  try {
    const validatedData = simulateAttackSchema.parse(req.body);
    
    // Add operator context for auditing
    const operator = {
      id: req.user?.id || 'anonymous',
      role: req.user?.role || 'user',
    };
    
    const result = await mcpClient.callTool('simulate_attack', {
      ...validatedData,
      operator,
    });
    
    res.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error('Error simulating attack:', error);
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to simulate attack',
    });
  }
});

// POST /api/mcp/network-analysis - Analyze network
router.post('/network-analysis', authenticate, async (req, res) => {
  try {
    const validatedData = analyzeNetworkSchema.parse(req.body);
    
    const result = await mcpClient.callTool('analyze_network', validatedData);
    
    res.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error('Error analyzing network:', error);
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to analyze network',
    });
  }
});

// POST /api/mcp/incidents/:id/investigate - Investigate incident
router.post('/incidents/:id/investigate', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { scope } = req.body;
    
    const validatedData = investigateIncidentSchema.parse({
      incident_id: id,
      scope,
    });
    
    const result = await mcpClient.callTool('investigate_incident', validatedData);
    
    res.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error('Error investigating incident:', error);
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to investigate incident',
    });
  }
});

// POST /api/mcp/forensics - Forensics analysis
router.post('/forensics', authenticate, async (req, res) => {
  try {
    const validatedData = forensicsAnalysisSchema.parse(req.body);
    
    const result = await mcpClient.callTool('forensics_analysis', validatedData);
    
    res.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error('Error performing forensics analysis:', error);
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to perform forensics analysis',
    });
  }
});

// POST /api/mcp/reports - Generate reports
router.post('/reports', authenticate, async (req, res) => {
  try {
    const validatedData = generateReportSchema.parse(req.body);
    
    const result = await mcpClient.callTool('generate_report', validatedData);
    
    res.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error('Error generating report:', error);
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to generate report',
    });
  }
});

// GET /api/mcp/metrics - List metrics
router.get('/metrics', authenticate, async (req, res) => {
  try {
    const result = await mcpClient.callTool('list_metrics', {});
    
    res.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error('Error listing metrics:', error);
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to list metrics',
    });
  }
});

// GET /api/mcp/controls - Export controls
router.get('/controls', authenticate, async (req, res) => {
  try {
    const result = await mcpClient.callTool('export_controls', {});
    
    res.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error('Error exporting controls:', error);
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to export controls',
    });
  }
});

// POST /api/mcp/simulations/:id/stop - Stop simulation
router.post('/simulations/:id/stop', authenticate, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    
    const operator = {
      id: req.user?.id || 'anonymous',
      role: req.user?.role || 'user',
    };
    
    const result = await mcpClient.callTool('stop_simulation', {
      simulation_id: id,
      reason,
      operator,
    });
    
    res.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error('Error stopping simulation:', error);
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to stop simulation',
    });
  }
});

// GET /api/mcp/health - Health check
router.get('/health', async (req, res) => {
  try {
    // Check if client is available (isConnected is private, so we just check if client exists)
    const status = mcpClient ? 'connected' : 'disconnected';
    
    res.json({
      success: true,
      data: {
        status,
        serverUrl: process.env.MCP_SERVER_URL || 'stdio',
      },
    });
  } catch (error: any) {
    console.error('Error checking MCP health:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to check MCP health',
    });
  }
});

export default router;
