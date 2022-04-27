export const toPath = (name: string) => "/" +
  name.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, offset) => (offset ? "-" : "") + $.toLowerCase());
