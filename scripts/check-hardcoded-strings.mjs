import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import ts from "typescript";

const ROOT = process.cwd();
const APPS = ["apps/storefront/src", "apps/seller/src"];
const ATTRS = new Set(["placeholder", "aria-label", "title", "alt"]);
const ALLOWED = [/^https?:\/\//, /^\w+(\.\w+)+$/];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (["i18n", "__tests__"].includes(entry.name)) return [];
        return walk(full);
      }
      if (!/\.(tsx|ts)$/.test(entry.name) || /\.d\.ts$/.test(entry.name)) return [];
      return [full];
    })
  );

  return files.flat();
}

function isAllowedText(value) {
  return ALLOWED.some((rule) => rule.test(value));
}

function collectViolations(sourceFile, content) {
  const violations = [];
  const lines = content.split("\n");

  function report(node, text) {
    const { line } = sourceFile.getLineAndCharacterOfPosition(node.getStart());
    if (lines[line - 1]?.includes("i18n-ignore-next-line")) return;
    const normalized = text.replace(/\s+/g, " ").trim();
    if (!normalized || isAllowedText(normalized)) return;
    violations.push({ line, text: normalized });
  }

  function visit(node) {
    if (ts.isJsxText(node)) {
      report(node, node.getText());
    }

    if (ts.isJsxAttribute(node) && node.initializer && ATTRS.has(node.name.getText())) {
      if (ts.isStringLiteral(node.initializer)) {
        report(node, node.initializer.text);
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return violations;
}

const files = (await Promise.all(APPS.map((app) => walk(path.join(ROOT, app))))).flat();
let hasViolations = false;

for (const file of files) {
  const content = await readFile(file, "utf8");
  const source = ts.createSourceFile(file, content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const violations = collectViolations(source, content);

  if (violations.length > 0) {
    hasViolations = true;
    for (const violation of violations) {
      console.error(`${path.relative(ROOT, file)}:${violation.line} Hard-coded UI string: "${violation.text}"`);
    }
  }
}

if (hasViolations) {
  process.exit(1);
}

console.log("No hard-coded user-facing strings detected.");
