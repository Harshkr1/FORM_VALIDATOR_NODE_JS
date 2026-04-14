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
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Enter Email")
    .isEmail()
    .withMessage("Enter proper Email"),
  body("age")
    .optional()
    .isInt({ min: 18, max: 120 })
    .withMessage("enter valid range of age"),
  body("bio").optional().isLength({ max: 200 }),
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
    const { firstName, lastName, email, age, bio } = matchedData(req);
    usersStorage.addUser({ firstName, lastName, email, age, bio });
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
    const { firstName, lastName, email, age, bio } = matchedData(req);
    usersStorage.updateUser(req.params.id, {
      firstName,
      lastName,
      email,
      age,
      bio,
    });
    res.redirect("/");
  },
];

exports.usersDeletePost = (req, res) => {
  usersStorage.deleteUser(req.params.id);
  res.redirect("/");
};

exports.usersSearchGet = (req, res) => {
  const { fullName, email } = req.query;

  if (!fullName && !email) {
    throw new Error("Enter at least one detail");
  }

  let users = usersStorage.getUsers(); 

  if (fullName) {
    const parts = fullName.trim().split(/\s+/);
    const firstName = parts[0];
    const lastName = parts.slice(1).join(" ");

    users = users.filter((user) => {
      return user.firstName === firstName && user.lastName === lastName;
    });
  }

  if (email) {
    users = users.filter((user) => user.email === email);
  }

  res.render("search", {
    title: "Search User Page",
    users: users,
  });
};
