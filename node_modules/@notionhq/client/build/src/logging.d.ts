export declare enum LogLevel {
    DEBUG = "debug",
    INFO = "info",
    WARN = "warn",
    ERROR = "error"
}
export interface Logger {
    (level: LogLevel, message: string, extraInfo: Record<string, unknown>): void;
}
export declare function makeConsoleLogger(name: string): Logger;
/**
 * Transforms a log level into a comparable (numerical) value ordered by severity.
 */
export declare function logLevelSeverity(level: LogLevel): number;
//# sourceMappingURL=logging.d.ts.map