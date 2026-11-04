import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import openapiTS from "openapi-typescript";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "../../..");

const candidates = [
  path.join(root, "contracts", "openapi.yaml"),
  path.join(root, "contracts", "openapi.yml"),
  path.join(root, "openapi.yaml"),
  path.join(root, "openapi.yml")
];

const contractPath = await (async () => {
  for (const candidate of candidates) {
    try {
      await access(candidate);
      return candidate;
    } catch {
      // continue
    }
  }
  return undefined;
})();

if (!contractPath) {
  console.error("OpenAPI contract not found. Expected contracts/openapi.yaml (blocked by BE-W1-05).");
  process.exit(1);
}

const outputFile = path.join(root, "packages", "api-client", "src", "generated", "schema.ts");
const generated = await openapiTS(new URL(`file://${contractPath}`));
await mkdir(path.dirname(outputFile), { recursive: true });
await writeFile(outputFile, generated);
console.log(`Generated API types from ${contractPath}`);
