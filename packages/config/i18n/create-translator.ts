// A tiny translation helper. It works in server and client components.
//
//   const t = createTranslator(commonMessages, appMessages);
//   t("seller.home.title"); // "Welcome to Waslu Seller"

export type Messages = { [key: string]: string | Messages };

function merge(base: Messages, extra: Messages): Messages {
  const result: Messages = { ...base };

  for (const key of Object.keys(extra)) {
    const baseValue = result[key];
    const extraValue = extra[key];

    if (typeof baseValue === "object" && typeof extraValue === "object" && extraValue !== undefined) {
      result[key] = merge(baseValue, extraValue);
    } else if (extraValue !== undefined) {
      result[key] = extraValue;
    }
  }

  return result;
}

export function createTranslator(...sources: Messages[]) {
  const messages = sources.reduce<Messages>(merge, {});

  return function t(key: string): string {
    let value: string | Messages | undefined = messages;

    for (const part of key.split(".")) {
      value = typeof value === "object" ? value[part] : undefined;
    }

    if (typeof value === "string") return value;

    // Show the key on screen instead of crashing the page.
    if (process.env.NODE_ENV !== "production") {
      console.warn(`Missing translation for key: ${key}`);
    }
    return key;
  };
}
