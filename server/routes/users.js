const router = require("express").Router();
const userController = require("../controller/users");
/**
 * get users
 * create user
 * update user
 * delete user
 */

/**
 * get user by email or id
 * @method GET
 */
router.get("/:userId", userController.getUserById);

/**
 * Update user by id
 * @method PUT
 */
router.put("/:userId", userController.putUserById);

/**
 * Update user by id
 * @method PATCT
 */
router.patch("/:userId", userController.patchUserById);

/**
 * Delete user by id
 * @method DELETE
 */
router.delete("/:userId", userController.deleteUser);

/**
 * Get all users
 * @method GET
 * @router /api/v1/user
 */
router.get("/", userController.getUsers);

/**
 * Create users
 * @method POST
 * @router /api/v1/user
 */
router.post("/", userController.postUser);

module.exports = router;
