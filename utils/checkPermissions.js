const CustomError = require("../errors");

const checkPermissions = (requestUser, resourceUserId) => {
  //   console.log(requestUser);

  //   console.log(resourceUserId);
  //   console.log(typeof resourceUserId);
  //only admin or same user can access that account
  if (requestUser.role == admin) return;
  if (requestUser.userId == resourceUserId.toString()) return;
  //resource id is id from db which is always in object format
  throw new CustomError.UnauthenticatedError(
    "not authorized to access this route"
  );
};

module.exports = checkPermissions;
