const express = require("express")
const app = express()
const { body, validationResult } = require("express-validator")
const multer = require("../middlewares/multer-config")
const { User } = require("../models")
require("dotenv").config()
const host = process.env.HOST
const port = process.env.PORT

// sign up (créer un user)

app.post(
  "/",
  body("firstName")
    .exists()
    .isLength({ min: 2 })
    .withMessage("Invalid First Name"),
  body("lastName")
    .exists()
    .isLength({ min: 2 })
    .withMessage("Invalid Last Name"),
  body("email").exists().isEmail().withMessage("Invalid Email"),
  body("password").exists().withMessage("Password is required"),
  async (req, res) => {
    const errorResult = validationResult(req).array()

    if (errorResult.length > 0) {
      res.status(400).json(errorResult)
    } else {
      const { firstName, lastName, email, password } = req.body
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        password,
        profile_picture: "",
      })
      res.json(newUser)
    }
  }
)

// ajouter une photo de profile au sign up

app.post("/:id/upload", multer.single("picture"), async (req, res) => {
  try {
    await User.update(
      {
        profile_picture: `http://${host}:${port}/pictures/${req.file.filename}`,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
    const updateUser = await User.findOne({ where: { id: req.params.id } })
    res.json(updateUser)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = app
