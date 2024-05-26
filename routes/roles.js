const express = require("express");
const router = express.Router()

const { 
    getRoles,
    getSingleRole,
    updateRole,
    createRole,
    deleteRole
} = require("../controllers/roles");

router.route("/").get(getRoles).post(createRole);
router.route("/:id").get(getSingleRole).put(updateRole).delete(deleteRole)

module.exports = router;