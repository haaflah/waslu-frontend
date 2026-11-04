import commonEn from "@waslu/config/i18n/en/common";
import appEn from "./messages/en.json";

export const locales = ["en"] as const;
export type Locale = (typeof locales)[number];

type MessageTree = Record<string, unknown>;

function deepMerge(base: MessageTree, extra: MessageTree): MessageTree {
  const merged: MessageTree = { ...base };

  for (const key of Object.keys(extra)) {
    const baseValue = merged[key];
    const extraValue = extra[key];

    if (
      typeof baseValue === "object" &&
      baseValue !== null &&
      !Array.isArray(baseValue) &&
      typeof extraValue === "object" &&
      extraValue !== null &&
      !Array.isArray(extraValue)
    ) {
      merged[key] = deepMerge(baseValue as MessageTree, extraValue as MessageTree);
    } else {
      merged[key] = extraValue;
    }
  }

  return merged;
}

function getByPath(messages: MessageTree, key: string): string {
  const value = key.split(".").reduce<unknown>((current, part) => {
    if (typeof current === "object" && current !== null) {
      return (current as MessageTree)[part];
    }
    return undefined;
  }, messages);

  if (typeof value !== "string") {
    throw new Error(`Missing translation for key: ${key}`);
  }

  return value;
}

export async function getTranslator(locale: Locale = "en") {
  const dictionaries: Record<Locale, MessageTree> = {
    en: deepMerge(commonEn as MessageTree, appEn as MessageTree)
  };

  const active = dictionaries[locale] ?? dictionaries.en;
  return (key: string) => getByPath(active, key);
}
