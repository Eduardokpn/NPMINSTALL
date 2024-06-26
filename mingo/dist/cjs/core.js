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
var core_exports = {};
__export(core_exports, {
  ComputeOptions: () => ComputeOptions,
  Context: () => Context,
  OperatorType: () => OperatorType,
  ProcessingMode: () => ProcessingMode,
  computeValue: () => computeValue,
  getOperator: () => getOperator,
  initOptions: () => initOptions,
  redact: () => redact,
  useOperators: () => useOperators
});
module.exports = __toCommonJS(core_exports);
var import_util = require("./util");
var ProcessingMode = /* @__PURE__ */ ((ProcessingMode2) => {
  ProcessingMode2["CLONE_ALL"] = "CLONE_ALL";
  ProcessingMode2["CLONE_INPUT"] = "CLONE_INPUT";
  ProcessingMode2["CLONE_OUTPUT"] = "CLONE_OUTPUT";
  ProcessingMode2["CLONE_OFF"] = "CLONE_OFF";
  return ProcessingMode2;
})(ProcessingMode || {});
class ComputeOptions {
  constructor(_opts, _root, _local, timestamp = Date.now()) {
    this._opts = _opts;
    this._root = _root;
    this._local = _local;
    this.timestamp = timestamp;
    this.update(_root, _local);
  }
  /**
   * Initialize new ComputeOptions.
   *
   * @param options
   * @param root
   * @param local
   * @returns {ComputeOptions}
   */
  static init(options, root, local) {
    return options instanceof ComputeOptions ? new ComputeOptions(
      options._opts,
      (0, import_util.isNil)(options.root) ? root : options.root,
      Object.assign({}, options.local, local)
    ) : new ComputeOptions(options, root, local);
  }
  /** Updates the internal mutable state. */
  update(root, local) {
    this._root = root;
    this._local = local ? Object.assign({}, local, {
      variables: Object.assign({}, this._local?.variables, local?.variables)
    }) : local;
    return this;
  }
  getOptions() {
    return Object.freeze({
      ...this._opts,
      context: Context.from(this._opts.context)
    });
  }
  get root() {
    return this._root;
  }
  get local() {
    return this._local;
  }
  get idKey() {
    return this._opts.idKey;
  }
  get collation() {
    return this._opts?.collation;
  }
  get processingMode() {
    return this._opts?.processingMode || "CLONE_OFF" /* CLONE_OFF */;
  }
  get useStrictMode() {
    return this._opts?.useStrictMode;
  }
  get scriptEnabled() {
    return this._opts?.scriptEnabled;
  }
  get useGlobalContext() {
    return this._opts?.useGlobalContext;
  }
  get hashFunction() {
    return this._opts?.hashFunction;
  }
  get collectionResolver() {
    return this._opts?.collectionResolver;
  }
  get jsonSchemaValidator() {
    return this._opts?.jsonSchemaValidator;
  }
  get variables() {
    return this._opts?.variables;
  }
  get context() {
    return this._opts?.context;
  }
}
function initOptions(options) {
  return options instanceof ComputeOptions ? options.getOptions() : Object.freeze({
    idKey: "_id",
    scriptEnabled: true,
    useStrictMode: true,
    useGlobalContext: true,
    processingMode: "CLONE_OFF" /* CLONE_OFF */,
    ...options,
    context: options?.context ? Context.from(options?.context) : Context.init({})
  });
}
var OperatorType = /* @__PURE__ */ ((OperatorType2) => {
  OperatorType2["ACCUMULATOR"] = "accumulator";
  OperatorType2["EXPRESSION"] = "expression";
  OperatorType2["PIPELINE"] = "pipeline";
  OperatorType2["PROJECTION"] = "projection";
  OperatorType2["QUERY"] = "query";
  OperatorType2["WINDOW"] = "window";
  return OperatorType2;
})(OperatorType || {});
class Context {
  constructor(ops) {
    this.operators = {
      ["accumulator" /* ACCUMULATOR */]: {},
      ["expression" /* EXPRESSION */]: {},
      ["pipeline" /* PIPELINE */]: {},
      ["projection" /* PROJECTION */]: {},
      ["query" /* QUERY */]: {},
      ["window" /* WINDOW */]: {}
    };
    for (const [type, operators] of Object.entries(ops)) {
      this.addOperators(type, operators);
    }
  }
  static init(ops = {}) {
    return new Context(ops);
  }
  static from(ctx) {
    return new Context(ctx.operators);
  }
  addOperators(type, ops) {
    for (const [name, fn] of Object.entries(ops)) {
      if (!this.getOperator(type, name)) {
        this.operators[type][name] = fn;
      }
    }
    return this;
  }
  // register
  addAccumulatorOps(ops) {
    return this.addOperators("accumulator" /* ACCUMULATOR */, ops);
  }
  addExpressionOps(ops) {
    return this.addOperators("expression" /* EXPRESSION */, ops);
  }
  addQueryOps(ops) {
    return this.addOperators("query" /* QUERY */, ops);
  }
  addPipelineOps(ops) {
    return this.addOperators("pipeline" /* PIPELINE */, ops);
  }
  addProjectionOps(ops) {
    return this.addOperators("projection" /* PROJECTION */, ops);
  }
  addWindowOps(ops) {
    return this.addOperators("window" /* WINDOW */, ops);
  }
  // getters
  getOperator(type, name) {
    return type in this.operators ? this.operators[type][name] || null : null;
  }
}
const GLOBAL_CONTEXT = Context.init();
function useOperators(type, operators) {
  for (const [name, fn] of Object.entries(operators)) {
    (0, import_util.assert)(
      (0, import_util.isFunction)(fn) && (0, import_util.isOperator)(name),
      `'${name}' is not a valid operator`
    );
    const currentFn = getOperator(type, name, null);
    (0, import_util.assert)(
      !currentFn || fn === currentFn,
      `${name} already exists for '${type}' operators. Cannot change operator function once registered.`
    );
  }
  switch (type) {
    case "accumulator" /* ACCUMULATOR */:
      GLOBAL_CONTEXT.addAccumulatorOps(operators);
      break;
    case "expression" /* EXPRESSION */:
      GLOBAL_CONTEXT.addExpressionOps(operators);
      break;
    case "pipeline" /* PIPELINE */:
      GLOBAL_CONTEXT.addPipelineOps(operators);
      break;
    case "projection" /* PROJECTION */:
      GLOBAL_CONTEXT.addProjectionOps(operators);
      break;
    case "query" /* QUERY */:
      GLOBAL_CONTEXT.addQueryOps(operators);
      break;
    case "window" /* WINDOW */:
      GLOBAL_CONTEXT.addWindowOps(operators);
      break;
  }
}
function getOperator(type, operator, options) {
  const { context: ctx, useGlobalContext: fallback } = options || {};
  const fn = ctx ? ctx.getOperator(type, operator) : null;
  return !fn && fallback ? GLOBAL_CONTEXT.getOperator(type, operator) : fn;
}
const systemVariables = {
  $$ROOT(_obj, _expr, options) {
    return options.root;
  },
  $$CURRENT(obj, _expr, _options) {
    return obj;
  },
  $$REMOVE(_obj, _expr, _options) {
    return void 0;
  },
  $$NOW(_obj, _expr, options) {
    return new Date(options.timestamp);
  }
};
const redactVariables = {
  $$KEEP(obj, _expr, _options) {
    return obj;
  },
  $$PRUNE(_obj, _expr, _options) {
    return void 0;
  },
  $$DESCEND(obj, expr, options) {
    if (!(0, import_util.has)(expr, "$cond"))
      return obj;
    let result;
    for (const [key, current] of Object.entries(obj)) {
      if ((0, import_util.isObjectLike)(current)) {
        if (current instanceof Array) {
          const array = [];
          for (let elem of current) {
            if ((0, import_util.isObject)(elem)) {
              elem = redact(elem, expr, options.update(elem));
            }
            if (!(0, import_util.isNil)(elem)) {
              array.push(elem);
            }
          }
          result = array;
        } else {
          result = redact(
            current,
            expr,
            options.update(current)
          );
        }
        if ((0, import_util.isNil)(result)) {
          delete obj[key];
        } else {
          obj[key] = result;
        }
      }
    }
    return obj;
  }
};
function computeValue(obj, expr, operator, options) {
  const copts = ComputeOptions.init(options, obj);
  operator = operator || "";
  if ((0, import_util.isOperator)(operator)) {
    const callExpression = getOperator(
      "expression" /* EXPRESSION */,
      operator,
      options
    );
    if (callExpression)
      return callExpression(obj, expr, copts);
    const callAccumulator = getOperator(
      "accumulator" /* ACCUMULATOR */,
      operator,
      options
    );
    if (callAccumulator) {
      if (!(obj instanceof Array)) {
        obj = computeValue(obj, expr, null, copts);
        expr = null;
      }
      (0, import_util.assert)(obj instanceof Array, `'${operator}' target must be an array.`);
      return callAccumulator(
        obj,
        expr,
        // reset the root object for accumulators.
        copts.update(null, copts.local)
      );
    }
    throw new import_util.MingoError(`operator '${operator}' is not registered`);
  }
  if ((0, import_util.isString)(expr) && expr.length > 0 && expr[0] === "$") {
    if ((0, import_util.has)(redactVariables, expr)) {
      return expr;
    }
    let context = copts.root;
    const arr = expr.split(".");
    if ((0, import_util.has)(systemVariables, arr[0])) {
      context = systemVariables[arr[0]](
        obj,
        null,
        copts
      );
      expr = expr.slice(arr[0].length + 1);
    } else if (arr[0].slice(0, 2) === "$$") {
      context = Object.assign(
        {},
        copts.variables,
        // global vars
        // current item is added before local variables because the binding may be changed.
        { this: obj },
        copts.local?.variables
        // local vars
      );
      const prefix = arr[0].slice(2);
      (0, import_util.assert)(
        (0, import_util.has)(context, prefix),
        `Use of undefined variable: ${prefix}`
      );
      expr = expr.slice(2);
    } else {
      expr = expr.slice(1);
    }
    if (expr === "")
      return context;
    return (0, import_util.resolve)(context, expr);
  }
  if ((0, import_util.isArray)(expr)) {
    return expr.map((item) => computeValue(obj, item, null, copts));
  } else if ((0, import_util.isObject)(expr)) {
    const result = {};
    for (const [key, val] of Object.entries(expr)) {
      result[key] = computeValue(obj, val, key, copts);
      if (["expression" /* EXPRESSION */, "accumulator" /* ACCUMULATOR */].some(
        (t) => !!getOperator(t, key, options)
      )) {
        (0, import_util.assert)(
          Object.keys(expr).length === 1,
          "Invalid aggregation expression '" + JSON.stringify(expr) + "'"
        );
        return result[key];
      }
    }
    return result;
  }
  return expr;
}
function redact(obj, expr, options) {
  const result = computeValue(obj, expr, null, options);
  return (0, import_util.has)(redactVariables, result) ? redactVariables[result](obj, expr, options) : result;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ComputeOptions,
  Context,
  OperatorType,
  ProcessingMode,
  computeValue,
  getOperator,
  initOptions,
  redact,
  useOperators
});
