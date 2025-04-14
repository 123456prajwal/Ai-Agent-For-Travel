/**
 * Multi-Agent Communication Protocol (MCP) Server
 *
 * This server acts as a central coordinator for multiple AI agents,
 * allowing them to communicate with each other, access shared tools,
 * and coordinate complex workflows.
 */

const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");

// Initialize Express app and HTTP server
const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Agent registry to track available agents
const agentRegistry = new Map();

// Tool registry to manage available tools
const toolRegistry = new Map();

// In-memory session store (would use a database in production)
const sessionStore = new Map();

// In-memory agent state store (would use a database in production)
const agentStates = new Map();

// WebSocket connections by agent ID
const agentConnections = new Map();

// WebSocket connections by session ID (for client updates)
const sessionConnections = new Map();

/**
 * Agent Communication Protocol
 *
 * Standardized message format for agent communication:
 * {
 *   messageId: "unique-id",
 *   sender: "agent-id",
 *   recipient: "agent-id" || "broadcast",
 *   type: "request" | "response" | "notification",
 *   content: {
 *     action: "tool-name",
 *     parameters: {},
 *     context: {}
 *   },
 *   timestamp: 1718456789
 * }
 */

// Helper function to create a standardized message
function createMessage(sender, recipient, type, content) {
  return {
    messageId: uuidv4(),
    sender,
    recipient,
    type,
    content,
    timestamp: Date.now(),
  };
}

// Tool Registration System
function registerTool(toolName, toolHandler, requiredPermissions = []) {
  toolRegistry.set(toolName, {
    handler: toolHandler,
    permissions: requiredPermissions,
  });
  console.log(`Tool registered: ${toolName}`);
}

// Agent Registration Endpoint
app.post("/api/register-agent", (req, res) => {
  const { agentId, capabilities, permissions } = req.body;

  // Validate agent details
  if (!agentId || !capabilities) {
    return res.status(400).json({ error: "Invalid agent registration" });
  }

  // Generate authentication token
  const token = uuidv4(); // In production, use a more secure token generation method

  // Register agent
  agentRegistry.set(agentId, {
    capabilities,
    permissions: permissions || [],
    status: "idle",
    token,
    lastSeen: Date.now(),
  });

  console.log(`Agent registered: ${agentId}`);
  res.status(201).json({ token });
});

// WebSocket Connection Handler
wss.on("connection", (ws, req) => {
  let agentId = null;

  // Handle messages
  ws.on("message", (message) => {
    try {
      const msg = JSON.parse(message);

      // Handle auth message
      if (msg.type === "auth") {
        const { agentId: claimedAgentId, token } = msg.content;

        // Validate token
        const agentData = agentRegistry.get(claimedAgentId);
        if (agentData && agentData.token === token) {
          agentId = claimedAgentId;

          // Store connection
          agentConnections.set(agentId, ws);

          // Update agent status
          agentData.status = "online";
          agentData.lastSeen = Date.now();

          // Send success response
          ws.send(
            JSON.stringify(
              createMessage("server", agentId, "response", {
                action: "auth",
                success: true,
              }),
            ),
          );

          console.log(`Agent authenticated: ${agentId}`);
        } else {
          // Authentication failed
          ws.send(
            JSON.stringify(
              createMessage("server", "unknown", "response", {
                action: "auth",
                success: false,
                error: "Authentication failed",
              }),
            ),
          );

          // Close connection
          ws.close(4000, "Authentication failed");
        }
        return;
      }

      // Require authentication for other messages
      if (!agentId) {
        ws.send(
          JSON.stringify(
            createMessage("server", "unknown", "response", {
              action: "error",
              error: "Not authenticated",
            }),
          ),
        );
        ws.close(4001, "Not authenticated");
        return;
      }

      // Handle regular messages
      handleAgentMessage(agentId, msg, ws);
    } catch (error) {
      console.error("Error processing message:", error);
      ws.send(
        JSON.stringify(
          createMessage("server", agentId || "unknown", "response", {
            action: "error",
            error: "Invalid message format",
          }),
        ),
      );
    }
  });

  // Handle disconnection
  ws.on("close", () => {
    if (agentId) {
      const agentData = agentRegistry.get(agentId);
      if (agentData) {
        agentData.status = "offline";
        agentData.lastSeen = Date.now();
      }

      // Remove connection
      agentConnections.delete(agentId);

      console.log(`Agent disconnected: ${agentId}`);
    }
  });
});

// Handle agent messages
async function handleAgentMessage(agentId, message, ws) {
  // Update last seen timestamp
  const agentData = agentRegistry.get(agentId);
  if (agentData) {
    agentData.lastSeen = Date.now();
  }

  // Process message based on type
  switch (message.type) {
    case "request":
      // Handle tool execution request
      if (message.content && message.content.action) {
        const { action, parameters } = message.content;

        // Execute tool
        const result = await executeTool(agentId, action, parameters);

        // Send response
        ws.send(
          JSON.stringify(
            createMessage("server", agentId, "response", {
              action,
              requestId: message.messageId,
              ...result,
            }),
          ),
        );
      }
      break;

    case "notification":
      // Handle notifications (no response expected)
      console.log(`Notification from ${agentId}:`, message.content);
      break;

    default:
      // Unknown message type
      ws.send(
        JSON.stringify(
          createMessage("server", agentId, "response", {
            action: "error",
            error: "Unknown message type",
          }),
        ),
      );
  }
}

// Tool Execution System
async function executeTool(agentId, toolName, parameters) {
  // Check if tool exists
  if (!toolRegistry.has(toolName)) {
    return {
      success: false,
      error: "Tool not found",
    };
  }

  const tool = toolRegistry.get(toolName);

  // Check permissions
  const agentPermissions = agentRegistry.get(agentId)?.permissions || [];
  if (
    tool.permissions.length > 0 &&
    !hasRequiredPermissions(agentPermissions, tool.permissions)
  ) {
    return {
      success: false,
      error: "Permission denied",
    };
  }

  try {
    // Execute the tool
    const result = await tool.handler(parameters, { agentId });
    return {
      success: true,
      result,
    };
  } catch (error) {
    console.error(`Error executing tool ${toolName}:`, error);
    return {
      success: false,
      error: error.message || "Tool execution failed",
    };
  }
}

// Check if agent has required permissions
function hasRequiredPermissions(agentPermissions, requiredPermissions) {
  return requiredPermissions.every((permission) =>
    agentPermissions.includes(permission),
  );
}

// Agent State Management
function getAgentState(agentId, key) {
  if (!agentStates.has(agentId)) {
    return null;
  }
  return agentStates.get(agentId)[key];
}

function setAgentState(agentId, key, value) {
  if (!agentStates.has(agentId)) {
    agentStates.set(agentId, {});
  }
  agentStates.get(agentId)[key] = value;
  return true;
}

// Session State Management
function getSessionState(sessionId, key) {
  if (!sessionStore.has(sessionId)) {
    return null;
  }
  return sessionStore.get(sessionId)[key];
}

function setSessionState(sessionId, key, value) {
  if (!sessionStore.has(sessionId)) {
    sessionStore.set(sessionId, {});
  }
  sessionStore.get(sessionId)[key] = value;
  return true;
}

// Start the server
const PORT = process.env.MCP_PORT || 8080;
server.listen(PORT, () => {
  console.log(`MCP Server running on port ${PORT}`);
});

module.exports = {
  app,
  server,
  registerTool,
  getAgentState,
  setAgentState,
  getSessionState,
  setSessionState,
  createMessage,
};
