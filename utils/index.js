//exporting from index.js on behaf of multiple file have some merits, reduces lines of imports and don't need to specify index file.

const { createJWT, isTokenValid, attachCookiesToResponse } = require("./jwt");
module.exports = { createJWT, isTokenValid, attachCookiesToResponse };
