const HELPERS = {
  for: function(n, block) {
    var accum = "";
    for (var i = 1; i <= n; i++) {
      accum += block.fn(i);
    }
    return accum;
  },
  formatDate: function(date) {
    if (!date) {
      return "";
    }
    return ` ${
      date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
    }-${date.getMonth() + 1}-${date.getFullYear()}`;
  },
  ifEquals: function(arg1, arg2, options) {
    return arg1 == arg2 ? options.fn(this) : options.inverse(this);
  },
  math: function(lvalue, operator, rvalue, options) {
    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);

    return {
      "+": lvalue + rvalue,
      "-": lvalue - rvalue,
      "*": lvalue * rvalue,
      "/": lvalue / rvalue,
      "%": lvalue % rvalue
    }[operator];
  }
};

module.exports = HELPERS;
