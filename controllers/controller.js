const {Student,Exercise,Category,Teacher} = require('../models')
const bcrypt = require('bcryptjs')


class Controller{
    
    static home(req,res){
        res.render('landingpage')
        // res.send('masukkk')
    }

    static register(req,res){
        res.render('registerForm')
    }

    static registerPost(req,res){
        console.log(req.body);
        let {name,username,password} = req.body
        Student.create({
            name:name,
            username:username,
            password:password
        })
        .then(data => {
            res.redirect('/')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static login(req,res){
        res.render("formloginawal")
    }

    static loginTeacher(req,res){
        res.render('loginteacher')
    }

    static loginStudent(req,res){
        res.render('loginstudent')
    }

    static loginPostTeacher(req,res){
        // console.log(req.body);
        let{username, password} = req.body
        Teacher.findOne({
            where:{username:username}
        })
        .then(user => {
            if(user){
                const isValid = password == user.password

                if(isValid){
                    req.session.user = {
                        name: username,
                        role: "Teacher"
                    }
                    return res.redirect('/')
                }else{
                    let error = 'invalid username/password'
                    return res.redirect(`/login?error=${error}`)
                }
            }else{
                let error = 'invalid username/password'
                return res.redirect(`/login?error=${error}`)
            }
        })
        .catch(err => {
            res.send(err)
        })
    }

    static loginPostStudent(req,res){
        // console.log(req.body);
        let{username, password} = req.body
        Student.findOne({
            where:{username:username}
        })
        .then(user => {
            if(user){
                const isValid = bcrypt.compareSync(password, user.password);

                if(isValid){
                    req.session.user = {
                        name: username,
                        role: "Student"
                    }
                    return res.redirect('/')
                }else{
                    let error = 'invalid username/password'
                    return res.redirect(`/login?error=${error}`)
                }
            }else{
                let error = 'invalid username/password'
                return res.redirect(`/login?error=${error}`)
            }
        })
        .catch(err => {
            res.send(err)
        })

    }

    static listTask(req,res){
        res.render('landingpagestudent')
    }

    static listCategory(req,res){
        Category.findAll({
            include: Exercise
        })
        .then(data => {
            // res.send(data)
            res.render('listCategory', {data})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static categoryDetail(req,res){
        let CategoryId = +req.params.categoryId
        // console.log(categoryId);
        // res.send('masuk detail')
        Category.findOne({
            where: {id: CategoryId},
            include: Exercise
        })
        .then(data => {
            // res.send(data)
            res.render('categorydetail', {data})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static addExercise(req,res){
        // console.log(req.params.categoryId);
        let CategoryId = +req.params.categoryId
        Category.findOne({
            where: {id:CategoryId}
        })
        .then(data => {
            // res.send(data)
            res.render('addForm', {data})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static addPostExercise(req,res){
        let CategoryId = +req.params.categoryId
        let {question,answer,answer2,answer3} = req.body

        Exercise.create({
            question:question,
            answer: answer,
            answer2:answer2,
            answer3:answer3,
            TeacherId: 1,
            CategoryId: CategoryId
        })
        .then(data => {
            res.redirect(`/category/${CategoryId}`)
        })
        .catch(err => {
            res.send(err)
        })
    }

    static deleteExercise(req,res){
        // console.log(req.params.ExerciseId);
        let ExerciseId = +req.params.ExerciseId
        let CategoryId = +req.params.categoryId

        Exercise.destroy({
            where: {id: ExerciseId}
        })
        .then(data => {
            res.redirect(`/category/${CategoryId}`)
        })
        .catch(err => {
            res.send(err)
        })
    }

    static editExercise(req,res){
        let ExerciseId = +req.params.ExerciseId
        let CategoryId = +req.params.categoryId

        Exercise.findOne({
            include: Category,
            where: {id: ExerciseId}
        })
        .then(data => {
            // res.send(data)
            res.render('editForm', {data})
        })
        .catch(err => {
            res.send(err)
        })
    }
    
    static editExercisePost(req,res){
        let ExerciseId = +req.params.ExerciseId
        let CategoryId = +req.params.categoryId
        let {question,answer,answer2,answer3} = req.body

        Exercise.update(
            {
                question: question,
                answer: answer,
                answer2: answer2,
                answer3: answer3,
                TeacherId: 1,
                CategoryId: CategoryId
            },
            {where: {id:ExerciseId}}
        )
        .then(data => [
            res.redirect(`/category/${CategoryId}`)
        ])
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = Controller