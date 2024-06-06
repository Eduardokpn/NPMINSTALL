"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformArguments = void 0;
const generic_transformers_1 = require("./generic-transformers");
function transformArguments(username) {
    return (0, generic_transformers_1.pushVerdictArguments)(['ACL', 'DELUSER'], username);
}
exports.transformArguments = transformArguments;
