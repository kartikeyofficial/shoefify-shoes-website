import { c as createSsrRpc } from "./router-VAEstg49.mjs";
import { c as createServerFn } from "./server-CutrnPlu.mjs";
import { o as objectType, n as numberType, s as stringType } from "../_libs/zod.mjs";
const getCategories = createServerFn({
  method: "GET"
}).handler(createSsrRpc("3fcd3cd0c54ec425c65b3afab76d818a2640068ae289f23950642a6fd946447b"));
const createCategory = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  name: stringType(),
  sort_order: numberType().optional()
}).parse(input)).handler(createSsrRpc("1fd7a1cbb41e3c90e0ce7ecf4933cf3c8f78e3c65bcc7912be5b34a083868ca6"));
createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  id: stringType(),
  name: stringType(),
  sort_order: numberType().optional()
}).parse(input)).handler(createSsrRpc("c1513fd340e368df1cd6fa34140686b2261483797a4a1d351f274c844ffc6df1"));
const deleteCategory = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  id: stringType()
}).parse(input)).handler(createSsrRpc("f00b1b3697d9da4487b6bfbb64feeb6c5c6e02d6d09275a2d82bfe090fad4cc4"));
export {
  createCategory as c,
  deleteCategory as d,
  getCategories as g
};
