function serialize(obj) {
  return JSON.parse(JSON.stringify(obj));
}
export {
  serialize as s
};
