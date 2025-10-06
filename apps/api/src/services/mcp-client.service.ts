import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { spawn, ChildProcess } from 'child_process';
import path from 'path';

interface MCPToolResult {
  content: Array<{
    type: string;
    text: string;
  }>;
  isError?: boolean;
}

interface MCPTool {
  name: string;
  description: string;
  inputSchema: any;
}

export class MCPClientService {
  private client: Client | null = null;
  private transport: StdioClientTransport | null = null;
  private serverProcess: ChildProcess | null = null;
  private isConnected: boolean = false;

  constructor() {
    this.initialize().catch(console.error);
  }

  private async initialize(): Promise<void> {
    try {
      // Path to the MCP server
      const mcpServerPath = path.join(__dirname, '../../../packages/mcp-server/build/index.js');
      
      // Spawn the MCP server process
      this.serverProcess = spawn('node', [mcpServerPath], {
        stdio: ['pipe', 'pipe', 'pipe'],
      });

      // Create stdio transport
      this.transport = new StdioClientTransport({
        command: 'node',
        args: [mcpServerPath],
      });

      // Create MCP client
      this.client = new Client(
        {
          name: 'cybersim-api-client',
          version: '1.0.0',
        },
        {
          capabilities: {},
        }
      );

      // Connect to the server
      await this.client.connect(this.transport);
      this.isConnected = true;
      
      console.log('MCP Client connected successfully');
    } catch (error) {
      console.error('Failed to initialize MCP client:', error);
      this.isConnected = false;
    }
  }

  async listTools(): Promise<MCPTool[]> {
    if (!this.client || !this.isConnected) {
      throw new Error('MCP client not connected');
    }

    try {
      const response = await this.client.listTools();
      return response.tools || [];
    } catch (error) {
      console.error('Error listing MCP tools:', error);
      throw error;
    }
  }

  async callTool(toolName: string, args: Record<string, any>): Promise<any> {
    if (!this.client || !this.isConnected) {
      throw new Error('MCP client not connected');
    }

    try {
      const result: MCPToolResult = await this.client.callTool({
        name: toolName,
        arguments: args,
      }) as MCPToolResult;

      if (result.isError) {
        throw new Error(result.content[0]?.text || 'Unknown MCP error');
      }

      // Parse the JSON response
      const textContent = result.content[0]?.text || '{}';
      return JSON.parse(textContent);
    } catch (error) {
      console.error(`Error calling MCP tool ${toolName}:`, error);
      throw error;
    }
  }

  // Specific tool methods
  async createScenario(params: {
    type: string;
    difficulty: string;
    environment?: string;
    sector?: string;
    adversary_profile?: string;
    focus_cves?: string[];
  }): Promise<any> {
    return await this.callTool('create_scenario', params);
  }

  async simulateAttack(params: {
    attack_type: string;
    target: string;
    intensity?: string;
    operator?: any;
    approval_token?: string;
  }): Promise<any> {
    return await this.callTool('simulate_attack', params);
  }

  async analyzeNetwork(params: {
    network_segment: string;
    duration?: number;
    focus?: string[];
  }): Promise<any> {
    return await this.callTool('analyze_network', params);
  }

  async investigateIncident(params: {
    incident_id: string;
    scope?: string;
  }): Promise<any> {
    return await this.callTool('investigate_incident', params);
  }

  async forensicsAnalysis(params: {
    artifact_type: string;
    system_id: string;
    analysis_depth?: string;
  }): Promise<any> {
    return await this.callTool('forensics_analysis', params);
  }

  async generateReport(params: {
    report_type: string;
    incident_ids?: string[];
    include_recommendations?: boolean;
    mode?: string;
  }): Promise<any> {
    return await this.callTool('generate_report', params);
  }

  async stopSimulation(params: {
    simulation_id?: string;
    reason?: string;
    operator?: any;
    approval_token?: string;
  }): Promise<any> {
    return await this.callTool('stop_simulation', params);
  }

  async replayTelemetry(params: {
    simulation_id: string;
    scenario_id?: string;
    telemetry?: any[];
    telemetry_base64?: string;
    operator?: any;
    approval_token?: string;
  }): Promise<any> {
    return await this.callTool('replay_telemetry', params);
  }

  async listMetrics(): Promise<any> {
    return await this.callTool('list_metrics', {});
  }

  async exportControls(): Promise<any> {
    return await this.callTool('export_controls', {});
  }

  async syncRiskRegister(params: {
    system: string;
    incident_id: string;
    priority?: string;
    owner?: string;
    due_date?: string;
  }): Promise<any> {
    return await this.callTool('sync_risk_register', params);
  }

  async generateValidationReport(): Promise<any> {
    return await this.callTool('generate_validation_report', {});
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
    }
    if (this.serverProcess) {
      this.serverProcess.kill();
    }
    this.isConnected = false;
  }
}

// Singleton instance
let mcpClientInstance: MCPClientService | null = null;

export function getMCPClient(): MCPClientService {
  if (!mcpClientInstance) {
    mcpClientInstance = new MCPClientService();
  }
  return mcpClientInstance;
}
