export const MAX_RAW_LOG_LENGTH = 10_000;

const SENSITIVE_VALUE_PATTERNS: Array<[RegExp, string]> = [
  [
    /\b(password|passwd|pwd|secret|token|api[_-]?key)\s*[:=]\s*["']?[^"'\s,;]+["']?/gi,
    "$1=[REDACTED]",
  ],
  [/\b(authorization)\s*:\s*(bearer|basic)\s+[^\s,;]+/gi, "$1: [REDACTED]"],
  [/\b(access_token|refresh_token|id_token)=([^&\s]+)/gi, "$1=[REDACTED]"],
];

export function sanitizeRawLogs(rawLogs: string | null | undefined): string | null {
  if (typeof rawLogs !== "string") {
    return null;
  }

  const normalizedLogs = normalizeLogText(rawLogs);
  const redactedLogs = redactSensitiveValues(normalizedLogs).trim();

  if (redactedLogs.length === 0) {
    return null;
  }

  return limitRawLogLength(redactedLogs);
}

function normalizeLogText(value: string): string {
  return value.replace(/\r\n/g, "\n").replace(/\r/g, "\n").replaceAll("\0", "");
}

function redactSensitiveValues(value: string): string {
  return SENSITIVE_VALUE_PATTERNS.reduce(
    (currentValue, [pattern, replacement]) =>
      currentValue.replace(pattern, replacement),
    value,
  );
}

function limitRawLogLength(value: string): string {
  if (value.length <= MAX_RAW_LOG_LENGTH) {
    return value;
  }

  return `${value.slice(0, MAX_RAW_LOG_LENGTH)}\n[TRUNCATED]`;
}
