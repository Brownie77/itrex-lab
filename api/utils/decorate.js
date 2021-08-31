module.exports = decorate = (schema, payload) => {
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
  } else {
    throw new Error('Only object values supported.');
  }
};

function morphValue(value, type) {
  switch (type) {
    case 'string':
      return String(value);
    case 'bool':
      return !!value;
    case 'number':
      const res = Number(value);
      if (res === Number.isNaN()) {
        throw new Error(`Cannot convert string ${value} to Number.`);
      }
      return res;
  }
}
