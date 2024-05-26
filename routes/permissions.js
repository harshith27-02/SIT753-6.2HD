const express = require("express");
const router = express.Router()

const { 
    getPermissions,
    createPermission,
    updatePermission,
    getSinglePermission,
    deletePermission
} = require("../controllers/permissions");

router.route("/").get(getPermissions).post(createPermission);
router.route("/:id").get(getSinglePermission).put(updatePermission).delete(deletePermission)

module.exports = router;   