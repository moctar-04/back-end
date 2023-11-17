const db=require('../models');
const Bcrypt=require('bcryptjs');
//const auth=require('../middlewares/jwtAuth');
//const {op}=re
require('dotenv').config();
const User=db.User;
const Role=db.Role;
const Op=db.Sequelize.Op;

function createUser(req,res) {
  console.log('req.body:', req.body); 
  this.password="";
    const userwithCryptedPassword={username:req.body.username,email:req.body.email,password:Bcrypt.hashSync(req.body.password)}
    User.create(userwithCryptedPassword)
    .then((data)=>{
        res.json(data)
    })
    .catch((error)=>{
        console.log(error)
        res.status(500).json({'error':"error when creating user"});
    })
}


function getUserById(req,res) {
    User.findByPk(req.params.id)
    .then((data)=>{
        res.json(data)
    })
    .catch((error)=>{
        res.status(500).json({'error':"error when getting user"});
    })
}

const getAllUser = async (req,res)=>{
    try {
        res.json(await User.findAll())
    } catch (error) {
        res.status(500).json({'error':"error when getting all users"});
    }
};

const deleteUser= function (req,res){
    User.destroy({where:
    {
        id:req.params.id
    }})
    .then((data)=>{
        res.status(200).json({'message':"user deleted successfully"})
    })
    .catch(()=>{
        res.status(500).json({'error':"error deleting user"});
    })
}


// async function authenticateLog(req,res) {
//     if(req.body.username == null || req.body.password== null){
//         return res.status(400).json({"error":"missing parameters"});
//     } 
//     User.findOne({
//         where:{username:req.body.username}
//     })
//     .then((UserFound)=>{
//         if (req.body.password==UserFound.password) {
//             return res.json(UserFound);
//         } else {
//             return  res.status(404).json({'error':"user not found"})
//         }
//     })
//     .catch((error)=>{
//         console.log(error)
//         return  res.status(500).json({'error':"anable to verify user"})
//         })
// }

// async function authenticate(username, password) {
//     User.findOne({
//         where:{username:username}
//     })
//     .then((UserFound)=>{
//         if (password==UserFound.password) {
//             console.log(UserFound);
//         } else {
//             return  res.status(404).json({'error':"user not found"});
//         }
//     })
// }

async function getAll() {
    return User.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}

async function createUserWithRole(req,res){
    try {
        const user=await User.create({
            username:req.body.username,
            password:Bcrypt.hashSync(req.body.password),
            email:req.body.email,
        });
        const roles=await Role.findAll({where:{nom:{[Op.or]:req.body.roles}}});

        user.setRoles(roles);
        res.json({'message':"user create successfully"});
    } catch (error) {
        res.json({'error':"user not created"});
    }
}
//la fonction login with token generating 
function signIn(req,res){
    User.findOne({where:{username:req.body.username}},{include:[
        {
            model:db.Role,
            as:'roles'
        }
    ]}).then(user=>{
        console.log(user)
        if(Bcrypt.compareSync(req.body.password,user.password)){
            const playload={
                userId:user.id,
                username:user.username,
                roles:user.roles
            }
            const options ={
                expiresIn:'1h'
            }
            const token=auth.generateToken(playload,process.env.SECRET_KEY,options);
            console.log(token);
            res.json({'token':token});
        }else
        res.json({'error':"mot de passe incorrect"})
    }).catch((error)=>{
        console.log(error)
        res.json({'error':"erroe"})
    })
}
// function verifyToken(req,res,next){
//     if(req.url=='/login'){
// next();
// if (req.headers.authorization != null && req.headers.authorization.indexOf('bearer ')!= -1){
//     const token=req.headers.authorization.split(' ')[1];
//     const tokenData=decodedToken(token,process.env.SECRET_KEY);
//     if(tokenData)next()
//         else res.json({'error':"invalid token"});
// }
// else res.json({'error':"Misssing authorazation"});
// }
// }

module.exports={
    createUser,
    getAllUser,
    getUserById,
    deleteUser,
    createUserWithRole,
    signIn
}