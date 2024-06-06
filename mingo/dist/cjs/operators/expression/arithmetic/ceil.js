var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var ceil_exports = {};
__export(ceil_exports, {
  $ceil: () => $ceil
});
module.exports = __toCommonJS(ceil_exports);
var import_core = require("../../../core");
var import_util = require("../../../util");
const $ceil = (obj, expr, options) => {
  const n = (0, import_core.computeValue)(obj, expr, null, options);
  if ((0, import_util.isNil)(n))
    return null;
  (0, import_util.assert)((0, import_util.isNumber)(n) || isNaN(n), "$ceil expression must resolve to a number.");
  return Math.ceil(n);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $ceil
});
