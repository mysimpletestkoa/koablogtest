"use strict";
const path = require("path");

/*  path config
 *  set views's path
 *  set static file's path
 */
const root = path.dirname(__dirname); // Located in the root directory of the project

module.exports.path = {};
module.exports.path.static = path.join(root, "public");

