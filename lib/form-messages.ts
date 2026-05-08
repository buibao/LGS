type TranslationFn = (key: string) => string;

const zodMessageKeys = new Set([
  "validation.fullNameRequired",
  "validation.phoneRequired",
  "validation.emailInvalid",
  "validation.shortTextTooLong",
  "validation.notesTooLong",
  "validation.selectStatus",
  "validation.selectSource",
  "validation.honeypotInvalid",
  "validation.leadNotFound",
  "validation.saveLeadFailed",
  "validation.updateLeadFailed",
  "validation.invalidCampaign",
]);

export function translateFormMessage(message: string | undefined, t: TranslationFn) {
  if (!message) {
    return undefined;
  }

  return zodMessageKeys.has(message) ? t(message) : message;
}
