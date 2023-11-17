const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const db = require('./models');
const Userroutes = require('./controllers/user.controller');

//const basicAuth=require('./controllers/basic-auth')

const port=3000;
//const BasicAuth=require('./middlewares/basicAuth')
//const {verifyToken}=require('./middlewares/jwtAuth')
//const corsOptions={origin: ['htpp://localhost:4200']}

const app=express();
//app.use(basicAuth);

// const PaysRoutes=require('./controllers/pays.controller');
// const RegionRoutes=require('./controllers/region.controller');
// const UserRoutes=require('./controllers/user.controller');
// const RolesRoutes=require('./controllers/role.controller');

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use('/api/user',Userroutes);
// app.use('/api/pays',[BasicAuth],PaysRoutes);
// app.use('/api/region',[BasicAuth],RegionRoutes);
// app.use('/api/user',[verifyToken],UserRoutes);
// //app.use('/api/user',[BasicAuth],UserRoutes);
// app.use('/api/role',RolesRoutes);

//creation des table
db.sequelize.sync({alter:true}).then(function() {
    console.log("les tables ont été creer avec success");
}).catch((error)=>{
    console.log(error);
    console.log("error lors de la creation des tables");
})

app.listen(port,function() {
    console.log("le serveur ecoute sur le port "+port);
})