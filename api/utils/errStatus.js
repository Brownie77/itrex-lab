module.exports = (messages) => (err) => {
  switch (err.message) {
    case messages.badreq:
      return 400;
    case messages.notfound:
      return 404;
    case messages.conflict:
      return 409;
    default:
      console.log(err);
      return 500;
  }
};
