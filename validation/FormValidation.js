const signupValidation= check => [
    check("username", "Please Enter a Valid Username")
      .not()
      .isEmpty().notEmpty(),
    check("email", "Please enter a valid email").isEmail().notEmpty(),
    check("password", "Please enter a valid password").isLength({
      min: 6
    }).notEmpty()
  ]


const LoginValidation =check=> [
  check("username", "Please enter a valid username").notEmpty(),
  check("password", "Please enter a valid password").isLength({
    min: 6
  }).notEmpty()
]

module.exports={signupValidation,LoginValidation}