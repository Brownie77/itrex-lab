module.exports = (config, req) => {
  const data = {};
  const regex = /^[a-zA-Z]+$/;

  config.props.map((prop) => {
    if (!prop.what || !prop.where) {
      throw new Error('Adapt config violation.');
    }

    if (prop.as) {
      if (!regex.test(prop.as)) {
        throw new Error(
          `as must contain only letters, but ${prop.as} was received`,
        );
      }
    }

    const name = prop.as || prop.what;

    switch (prop.where) {
      case 'params': {
        if (req.params[prop.what] === undefined) {
          throw new Error(`${prop.what} prop does not exist in params.`);
        }

        const transformed = transform(req.params[prop.what], prop.do);
        data[name] = transformed;

        break;
      }
      case 'body': {
        if (req.body[prop.what] === undefined) {
          throw new Error(`${prop.what} prop does not exist in body.`);
        }

        const transformed = transform(req.body[prop.what], prop.do);
        data[name] = transformed;

        break;
      }
      case 'query': {
        if (req.query[prop.what] === undefined) {
          throw new Error(`${prop.what} prop does not exist in query.`);
        }

        const transformed = transform(req.query[prop.what], prop.do);
        data[name] = transformed;

        break;
      }
      default:
        throw new Error(`Unexpected data position ${prop.where} given.`);
    }
  });
  return data;
};

function transform(value, transformations) {
  if (!transformations) {
    return value;
  }

  let transformed = value;

  transformations.map((operation) => {
    switch (operation) {
      case 'capitalize':
        transformed = transformed.toUpperCase();
        break;
      case 'trim':
        transformed = transformed.trim();
        break;
      default:
        throw new Error(`Unexpected transformation ${operation} given`);
    }
  });

  return transformed;
}
