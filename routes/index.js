const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')
const {middlewareTeacher, middlewareStudent, middlewareUser} = require('../middleware/userValidation')


// router.use(middleware)

//Buat User All
router.get('/', middlewareUser,  Controller.home )
router.get('/login', middlewareUser, Controller.login)
router.get('/register', middlewareUser, Controller.register)
router.post('/register', middlewareUser, Controller.registerPost)
router.get('/loginstudent', middlewareUser, Controller.loginStudent)
router.post('/loginstudent', middlewareUser, Controller.loginPostStudent)
router.get('/loginteacher', middlewareUser, Controller.loginTeacher)
router.post('/loginteacher', middlewareUser, Controller.loginPostTeacher)

//Buat Teacher
router.get('/category', middlewareTeacher, Controller.listCategory)
router.get('/category/:categoryId', middlewareTeacher, Controller.categoryDetail)
router.get('/category/:categoryId/add', middlewareTeacher, Controller.addExercise)
router.post('/category/:categoryId/add', middlewareTeacher, Controller.addPostExercise)
router.get('/category/:categoryId/exercise/:ExerciseId/delete', middlewareTeacher, Controller.deleteExercise)
router.get('/category/:categoryId/exercise/:ExerciseId/edit', middlewareTeacher, Controller.editExercise)
router.post('/category/:categoryId/exercise/:ExerciseId/edit', middlewareTeacher, Controller.editExercisePost)



//Buat Student
router.get('/taskStudent', middlewareStudent, Controller.listTask)
router.get('/taskStudent/:categoryId', middlewareStudent, Controller.startExercise)
router.post('/taskStudent/:categoryId/calculateAnswer', middlewareStudent, Controller.calcualteAnswer)



router.get('/logout',(req,res)=>{
    req.session.destroy(()=>{res.redirect('/')})
})




module.exports = router