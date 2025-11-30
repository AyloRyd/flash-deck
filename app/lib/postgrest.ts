import { PostgrestClient } from "@supabase/postgrest-js";
import type { PostgrestError } from "@supabase/postgrest-js";

export const postgrest = new PostgrestClient(import.meta.env.VITE_REST_URL);

export const setAccessToken = (token: string) => {
  postgrest.headers.set("Authorization", `Bearer ${token}`);
};

export const clearAccessToken = () => {
  if (postgrest.headers.get("Authorization")) {
    postgrest.headers.delete("Authorization");
  }
};

type HttpCode = "400" | "401" | "403" | "404" | "405" | "409" | "500" | "503";
type CustomMessages = Partial<Record<`code${HttpCode}`, string>>;

const PG_TO_HTTP: Record<string, HttpCode> = {
  // Connection errors
  "08000": "503",
  "08003": "503",
  "08006": "503",
  "08001": "503",
  "08004": "503",
  "08007": "503",
  "08P01": "503",

  // Constraint violations
  "23503": "409",
  "23505": "409",

  // Transaction errors
  "25006": "405",

  // Auth errors
  "28000": "403",
  "28P01": "403",

  // Config errors
  "53400": "500",

  // Insufficient resources
  "53000": "503",
  "53100": "503",
  "53200": "503",
  "53300": "503",

  // Undefined function/table
  "42883": "404",
  "42P01": "404",

  // Privileges
  "42501": "403",

  // PL/pgSQL errors
  P0001: "400",

  // Invalid grantor/role
  "0L000": "403",
  "0P000": "403",
};

const PG_PATTERN_TO_HTTP: Array<{ pattern: RegExp; code: HttpCode }> = [
  { pattern: /^08/, code: "503" }, // pg connection err
  { pattern: /^09/, code: "500" }, // triggered action exception
  { pattern: /^0L/, code: "403" }, // invalid grantor
  { pattern: /^0P/, code: "403" }, // invalid role specification
  { pattern: /^25/, code: "500" }, // invalid transaction state
  { pattern: /^28/, code: "403" }, // invalid auth specification
  { pattern: /^2D/, code: "500" }, // invalid transaction termination
  { pattern: /^38/, code: "500" }, // external routine exception
  { pattern: /^39/, code: "500" }, // external routine invocation
  { pattern: /^3B/, code: "500" }, // savepoint exception
  { pattern: /^40/, code: "500" }, // transaction rollback
  { pattern: /^53/, code: "503" }, // insufficient resources
  { pattern: /^54/, code: "500" }, // too complex
  { pattern: /^55/, code: "500" }, // obj not in prerequisite state
  { pattern: /^57/, code: "500" }, // operator intervention
  { pattern: /^58/, code: "500" }, // system error
  { pattern: /^F0/, code: "500" }, // config file error
  { pattern: /^HV/, code: "500" }, // foreign data wrapper error
  { pattern: /^P0/, code: "500" }, // PL/pgSQL error
  { pattern: /^XX/, code: "500" }, // internal error
];

const DEFAULT_MESSAGES: Record<HttpCode, string> = {
  "400": "Invalid request. Please check your input and try again.",
  "401": "Authentication required. Please log in and try again.",
  "403": "You don't have permission to access this resource.",
  "404": "The requested resource was not found.",
  "405": "This operation is not allowed.",
  "409":
    "This action conflicts with existing data. Please check for duplicates.",
  "500": "An unexpected server error occurred. Please try again later.",
  "503": "Service temporarily unavailable. Please try again later.",
};

function getHttpCode(pgCode: string): HttpCode {
  if (pgCode in PG_TO_HTTP) {
    return PG_TO_HTTP[pgCode];
  }

  for (const { pattern, code } of PG_PATTERN_TO_HTTP) {
    if (pattern.test(pgCode)) {
      return code;
    }
  }

  return "400";
}

export interface PgRError {
  code: HttpCode;
  message: string;
  details: string;
  hint: string;
}

export function pgRErr(
  error:
    | PostgrestError
    | {
        code: string;
        message: string;
        details?: string;
        hint?: string;
      },
  customMessages?: CustomMessages
): PgRError {
  const httpCode = getHttpCode(error.code);
  const customKey = `code${httpCode}` as keyof CustomMessages;

  let message: string;

  if (customMessages?.[customKey]) {
    message = customMessages[customKey]!;
  } else {
    message = DEFAULT_MESSAGES[httpCode];

    if (error.hint) {
      message = `${message} Hint: ${error.hint}`;
    }
  }

  return {
    code: httpCode,
    message,
    details: error.details || "",
    hint: error.hint || "",
  };
}
