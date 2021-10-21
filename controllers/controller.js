const {Student,Exercise,Category,Teacher,Sequelize} = require('../models')
const bcrypt = require('bcryptjs');
const shuffle = require('../helpers/shuffle')
const Op = Sequelize.Op;


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

///BUAT STUDENT

    static listTask(req,res){
        // res.render('landingpagestudent')
        Category.findAll({
            include: Exercise
        })
        .then(data => {
            res.render('landingpagestudent', {data})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static startExercise(req,res){
        let categoryId = +req.params.categoryId
        // res.send(req.params)
        // console.log(req.params);

        Category.findOne({
            where: {id: categoryId},
            include: Exercise
        })
        .then(data => {
            // res.send(data)
            res.render('startexercise', {data,shuffle})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static calcualteAnswer(req,res){
        let id = +req.params.categoryId
        // res.send('asuuup')
        Category.findOne({
            where: {id: id},
            include: Exercise
        })
        .then(data => {
            let userScore = 0
            data.Exercises.forEach(el => {
                let answer = el.answer
                let nilai = 100/data.Exercises.length
                let userAnswer = req.body[el.id]
                console.log({answer,userAnswer});
                if(userAnswer == answer){
                    userScore += nilai
                }
            })
            // console.log(userScore);
            res.render('scorestudent', {userScore})
        })
        .catch(err => {
            res.send(err)
        })
    }


///BUAT TEACHER
    static listCategory(req,res){
        // console.log(req.query);
        let type = req.query.type

        if(type){
            Category.findAll({
                where:{
                    [Op.or] : [
                        Sequelize.where(Sequelize.fn('lower',Sequelize.col('type')),{
                            [Op.like]: `%${type.toLowerCase()}%`
                        })
                    ]
                },
                include: Exercise
            })
            .then(data => {
                // res.send(data)
                res.render('listCategory', {data})
            })
            .catch(err => {
                res.send(err)
            })
        }else{
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
       
    }

    static categoryDetail(req,res){
        let CategoryId = +req.params.categoryId
        let question = req.query.question

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
            where: {id:CategoryId},
            include: Exercise
        })
        .then(data => {
            // res.send(data)
            console.log(data.Exercises.length);
            if(data.Exercises.length == 5){
                res.send('Soal sudah kebanyakan, kasian murid')
            }else{
                res.render('addForm', {data})
            }
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
            let newError = err.errors.map(el => el.message)
            res.send(newError)
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