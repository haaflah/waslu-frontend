import { createTranslator } from "@waslu/config/i18n/create-translator";
import commonEn from "@waslu/config/i18n/en/common";
import appEn from "./messages/en.json";

export const t = createTranslator(commonEn, appEn);
