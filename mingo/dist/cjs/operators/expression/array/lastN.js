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
var lastN_exports = {};
__export(lastN_exports, {
  $lastN: () => $lastN
});
module.exports = __toCommonJS(lastN_exports);
var import_core = require("../../../core");
var import_util = require("../../../util");
var import_lastN = require("../../accumulator/lastN");
const $lastN = (obj, expr, options) => {
  if (obj instanceof Array)
    return (0, import_lastN.$lastN)(obj, expr, options);
  const { input, n } = (0, import_core.computeValue)(obj, expr, null, options);
  if ((0, import_util.isNil)(input))
    return null;
  (0, import_util.assert)((0, import_util.isArray)(input), "Must resolve to an array/null or missing");
  return (0, import_lastN.$lastN)(input, { n, input: "$$this" }, options);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $lastN
});
