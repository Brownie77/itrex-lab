/* eslint-disable valid-typeof */
/* eslint-disable no-restricted-syntax */
function morphValue(value, type) {
  switch (type) {
    case 'string':
      return String(value);
    case 'bool':
      return !!value;
    case 'number': {
      const res = Number(value);
      if (Number.isNaN(res)) {
        throw new Error(`Cannot convert string ${value} to Number.`);
      }
      return res;
    }
    default:
      throw new Error('Unknown or unsupported type declared');
  }
}

module.exports = (schema, payload) => {
  if (schema.type === 'object') {
    const data = {};
    for (const [prop, params] of Object.entries(schema.props)) {
      const name = params.as || prop;
      if (params.type && typeof payload[prop] !== params.type) {
        if (payload[prop] !== undefined) {
          data[name] = morphValue(payload[prop], params.type);
        }
      } else {
        data[name] = payload[prop];
      }
    }
    return data;
  }
  throw new Error('Only object values supported.');
};
