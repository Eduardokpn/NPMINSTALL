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
var replaceAll_exports = {};
__export(replaceAll_exports, {
  $replaceAll: () => $replaceAll
});
module.exports = __toCommonJS(replaceAll_exports);
var import_core = require("../../../core");
var import_util = require("../../../util");
const $replaceAll = (obj, expr, options) => {
  const args = (0, import_core.computeValue)(obj, expr, null, options);
  const arr = [args.input, args.find, args.replacement];
  if (arr.some(import_util.isNil))
    return null;
  (0, import_util.assert)(
    arr.every(import_util.isString),
    "$replaceAll expression fields must evaluate to string"
  );
  return args.input.replace(new RegExp(args.find, "g"), args.replacement);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $replaceAll
});
