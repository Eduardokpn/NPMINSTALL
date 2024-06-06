import { UpdateOptions } from "../../core";
import { RawObject } from "../../types";
/** Updates the value of the field to a specified value if the specified value is less than the current value of the field. */
export declare const $min: (obj: RawObject, expr: RawObject, arrayFilters?: RawObject[], options?: UpdateOptions) => string[];
