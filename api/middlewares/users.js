const { query, params } = require("express-validator/check");

exports.validate = method => {
  switch (method) {
    case "searchUser": {
      return [
        query("q", "No query param provide")
          .exists()
          .isString(),
        query("count", "Count value must be greater than 0")
          .optional({ checkFalsy: true })
          .isInt({ gt: 0 })
      ];
    }
  }
};
