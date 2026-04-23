import fs from "node:fs";
import path from "node:path";
import winston from "winston";

const logsDir = path.resolve(process.cwd(), "logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const { combine, timestamp, errors, json, colorize, printf } = winston.format;

const devFormat = combine(
  colorize(),
  timestamp(),
  errors({ stack: true }),
  printf(({ level, message, timestamp: ts, stack, ...meta }) => {
    const payload = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : "";
    return `${String(ts)} [${level}] ${String(message)}${stack ? `\n${stack}` : ""}${payload}`;
  })
);

const productionFormat = combine(timestamp(), errors({ stack: true }), json());

/**
 * Shared application logger configured with console and file transports.
 */
export const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: process.env.NODE_ENV === "development" ? devFormat : productionFormat,
  defaultMeta: { service: "bharat-ghumho-api" },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: path.join(logsDir, "error.log"), level: "error" }),
    new winston.transports.File({ filename: path.join(logsDir, "combined.log"), level: "info" })
  ]
});

/**
 * Morgan-compatible write stream for HTTP request logging.
 */
export const morganStream = {
  write: (message: string): void => {
    logger.info(message.trim());
  }
};
