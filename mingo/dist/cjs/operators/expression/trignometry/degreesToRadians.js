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
var degreesToRadians_exports = {};
__export(degreesToRadians_exports, {
  $degreesToRadians: () => $degreesToRadians
});
module.exports = __toCommonJS(degreesToRadians_exports);
var import_internal = require("./_internal");
const RADIANS_FACTOR = Math.PI / 180;
const $degreesToRadians = (0, import_internal.createTrignometryOperator)(
  (n) => n * RADIANS_FACTOR,
  {
    Infinity: Infinity,
    "-Infinity": Infinity
  }
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $degreesToRadians
});
