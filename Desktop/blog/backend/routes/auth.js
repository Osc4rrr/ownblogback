const {Router} = require("express"); 
const { login, register, renewToken, userDetails, userPosts, updateUser } = require("../controllers/auth");
const { validateJwt } = require("../middleware/validateJwt");
const router = Router(); 


router.post("/login", login); 
router.post("/register", register);
router.get("/userDetails",validateJwt, userDetails); 
router.get("/userPosts",validateJwt, userPosts); 
router.get("/renew",validateJwt, renewToken);
router.put("/:id", validateJwt, updateUser);


module.exports = router;