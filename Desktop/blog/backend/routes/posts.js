const {Router} = require("express"); 
const { validateJwt } = require("../middleware/validateJwt");
const {getPosts, createPost, getPost, updatePost, deletePost} = require("../controllers/posts");
const { check } = require("express-validator");
const { isDate } = require("../helpers/isDate");
const { validateFields } = require("../middleware/validateFields");
const router = Router();


router.use(validateJwt);

router.get("/", getPosts);
router.get("/edit/:id", getPost); 
router.post(
        "/", 
        [
            check("title", "Title is required").not().isEmpty(), 
            check("description", "Description is required").not().isEmpty(), 
            check("posted", "date posted is required").custom(isDate), 
            validateFields
        ],
        createPost
    );
router.put("/:id", 
        [
            check("title", "Title is required").not().isEmpty(), 
            check("description", "Description is required").not().isEmpty(),
            validateFields
        ],
        updatePost
    ); 
router.delete("/:id", deletePost); 


module.exports = router;