import { computeValue } from "../../../core";
const $mod = (obj, expr, options) => {
  const args = computeValue(obj, expr, null, options);
  return args[0] % args[1];
};
export {
  $mod
};
