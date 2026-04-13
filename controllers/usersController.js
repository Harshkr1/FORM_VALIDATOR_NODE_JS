const usersStorage = require("../storages/usersStorage");
const { body, validationResult, matchedData } = require("express-validator");

// defining the various errors that can occur
const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";

// Here we are defining our own validator as it can be observed very clearly
// with proper situations that are required by us.
const validateUser = [
  body("firstName")
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First name ${lengthErr}`),
  body("lastName")
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Last name ${lengthErr}`),
];

exports.usersListGet = (req, res) => {
  res.render("index", {
    title: "User list",
    users: usersStorage.getUsers(),
  });
};

exports.usersCreateGet = (req, res) => {
  res.render("createUser", {
    title: "Create user",
  });
};

exports.usersCreatePost = [
  validateUser,
  (req, res) => {
    const errors = validationResult(req);

    // Here it can be clearly observed that if there is any error
    // present then we will render createaUser with passing errors.
    // in the Create User ejs we will modify to add this conditon
    // for conditonal rendering.
    if (!errors.isEmpty()) {
      return res.status(400).render("createUser", {
        title: "Create user",
        errors: errors.array(),
      });
    }

    // MatchedData returns us an object of the data which has been validated
    // sucessfully.
    const { firstName, lastName } = matchedData(req);
    usersStorage.addUser({ firstName, lastName });
    res.redirect("/");
  },
];

exports.usersUpdateGet = (req, res) => {
  const user = usersStorage.getUser(req.params.id);
  res.render("updateUser", {
    title: "Update user",
    user: user,
  });
};

exports.usersUpdatePost = [
  validateUser,
  (req, res) => {
    const user = usersStorage.getUser(req.params.id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("updateUser", {
        title: "Update user",
        user: user,
        errors: errors.array(),
      });
    }
    const { firstName, lastName } = matchedData(req);
    usersStorage.updateUser(req.params.id, { firstName, lastName });
    res.redirect("/");
  },
];

exports.usersDeletePost = (req, res) => {
  usersStorage.deleteUser(req.params.id);
  res.redirect("/");
};