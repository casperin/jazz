const express = require('express')
const app = express.Router()
const db = require('../db')

const error = res => err => {
  console.log(err)
  res.render('error', {message: 'internal server error', error})
}

app.get('/', (req, res, next) => {
  db.getUsers().then(console.log)
  res.render('index')
})

app.get('/signup', (req, res) => res.render('signup'))

app.post('/signup', (req, res) => {
  const {email, password} = req.body
  if (!email) return res.render('signup', {missing: 'email'})
  if (!password) return res.render('signup', {missing: 'password', email})
  db.findUserWhere('email', email)
    .then(user => user
      ? res.render('signup', {message: 'You have already signed up with this email.', email})
      // nested promise! :(
      : db.createUser({email, password}).then(() => res.render('signup', {message: 'You are signed up!'}))
    )
    .catch(error(res))
})

app.get('/signin', (req, res) => res.redirect('/'))
app.post('/signin', (req, res) => {
  const {email, password} = req.body
  db.findUserWhere('email', email)
    .then(user => user && user.password === password
      ? res.render('index', {message: 'You are signed in!', email})
      : res.render('index', {message: 'Try again', email})
    )
})

module.exports = app

