import { defineConfig } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import shared from "@waslu/config/eslint";

export default defineConfig([...shared, ...nextVitals, ...nextTs]);
