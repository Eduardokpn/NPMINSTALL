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
var ifNull_exports = {};
__export(ifNull_exports, {
  $ifNull: () => $ifNull
});
module.exports = __toCommonJS(ifNull_exports);
var import_core = require("../../../core");
var import_util = require("../../../util");
const $ifNull = (obj, expr, options) => {
  const args = (0, import_core.computeValue)(obj, expr, null, options);
  return args.find((arg) => !(0, import_util.isNil)(arg));
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $ifNull
});
