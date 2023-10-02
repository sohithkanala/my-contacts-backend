const express = require("express");

const router = express.Router();

const {getAllContact} = require("../controllers/contactControlles");
const {getContact} = require("../controllers/contactControlles");
const {postContact} = require("../controllers/contactControlles");
const {putContact} = require("../controllers/contactControlles");
const {deleteContact} = require("../controllers/contactControlles");
const validateToken = require("../middleware/validateTokenHandler");

//GET method
router.use(validateToken);
router.route("/").get(getAllContact).post(postContact);

router.route("/:id").get(getContact).put(putContact).delete(deleteContact);


module.exports = router;