const middlewareUser = (req,res,next)=>{
    if(!req.session.user){
        // console.log(req.session.user, 'ASUUPPPP');
        next()
    }else{
        if(req.session.user.role == "Teacher"){
            res.redirect('/category')
        }else{
            res.redirect('/taskStudent')
        }
    }
}


const middlewareTeacher = (req,res,next)=>{
    if(req.session.user){
        // console.log(req.session.user, 'ASUUPPPP');
        if(req.session.user.role == 'Teacher'){
            next()
        }else{
            res.redirect('/taskStudent')
        }
    }else{
        res.redirect('/')
    }
}

const middlewareStudent = (req,res,next)=>{
    if(req.session.user){
        // console.log(req.session.user, 'ASUUPPPP');
        if(req.session.user.role == 'Student'){
            next()
        }else{
            res.redirect('/category')
        }
    }else{
        res.redirect('/')
    }
}

module.exports = {
    middlewareTeacher,
    middlewareStudent,
    middlewareUser
}