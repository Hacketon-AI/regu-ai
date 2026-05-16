type LogLevel = "error" | "warn" | "info";

interface LogContext {
  [key: string]: unknown;
}

interface LogData {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: unknown;
  context?: LogContext;
}

function log(level: LogLevel, message: string, data?: unknown, context?: LogContext) {
  const timestamp = new Date().toISOString();
  const logData: LogData = {
    level,
    message,
    timestamp,
  };

  if (data !== undefined) {
    logData.data = data;
  }

  if (context !== undefined) {
    logData.context = context;
  }

  const logMethod = console[level] || console.log;
  logMethod(JSON.stringify(logData));
}

export const logger = {
  error: (message: string, error?: unknown, context?: LogContext) => {
    log("error", message, error, context);
  },

  warn: (message: string, context?: LogContext) => {
    log("warn", message, undefined, context);
  },

  info: (message: string, context?: LogContext) => {
    log("info", message, undefined, context);
  },
};

// Made with Bob
