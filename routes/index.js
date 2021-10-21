const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

router.get('/', Controller.home )
router.get('/register', Controller.register)
router.post('/register', Controller.registerPost)
router.get('/login', Controller.login)
router.get('/loginteacher', Controller.loginTeacher)
router.post('/loginteacher', Controller.loginPostTeacher)
router.get('/loginstudent', Controller.loginStudent)
router.post('/loginstudent', Controller.loginPostStudent)
router.get('/category', Controller.listCategory)
router.get('/category/:categoryId', Controller.categoryDetail)
router.get('/category/:categoryId/add', Controller.addExercise)
router.post('/category/:categoryId/add', Controller.addPostExercise)
router.get('/category/:categoryId/exercise/:ExerciseId/delete', Controller.deleteExercise)
router.get('/category/:categoryId/exercise/:ExerciseId/edit', Controller.editExercise)
router.post('/category/:categoryId/exercise/:ExerciseId/edit', Controller.editExercisePost)



module.exports = router