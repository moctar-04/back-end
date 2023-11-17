const {Sequelize}=require('sequelize');
require('dotenv').config();

const sequelize=new Sequelize(
    process.env.DATABASE,
    process.env.USERNAME,
    process.env.PASSWORD,
    {
        host:process.env.HOST,
        port:process.env.PORT,
        dialect:'mysql',
    }
);

//definir ma base de données
const db={};

db.sequelize=sequelize;
db.Sequelize=Sequelize;
db.User=require('./user.model')(sequelize,Sequelize);
db.Voiture=require('./voiture.model')(sequelize,Sequelize);
db.Passager=require('./passager.model')(sequelize,Sequelize);
db.Depart=require('./depart.model')(sequelize,Sequelize);
db.Chauffeur=require('./chauffeur.model')(sequelize,Sequelize);
db.Bagage=require('./bagage.model')(sequelize,Sequelize);
// db.Pays =require('./pays.model')(sequelize,Sequelize);
// db.Region =require('./region.model')(sequelize,Sequelize);
// db.User=require('./user.model')(sequelize,Sequelize);
// db.Role=require('./role.model')(sequelize,Sequelize);
// // //oneToMany
// db.Pays.hasMany(db.Region,{foreignKey:'paysID', as: 'regions', onDelete: 'cascade' });
// db.Region.belongsTo(db.Pays,{foreignKey:'paysID', as: 'pays'});
//manyTomany
// db.User.belongsToMany(db.Role,{through:'user_roles',as: 'roles',foreignKey:'role_id'})
// db.Role.belongsToMany(db.User,{through:'user_roles',as:'users',foreignKey:'user_id'})
db.Chauffeur.hasMany(db.Voiture,{foreign_key:'voiture_id',as:'voitures',onDelete:'cascade'});
db.Voiture.belongsTo(db.Chauffeur,{foreign_key:'voiture_id',as:'chauffeurs'});
db.Passager.hasMany(db.Bagage,{foreign_key:'bagage_id',as:'bagages',onDelete:'cascade'});
db.Bagage.belongsTo(db.Passager,{foreign_key:'bagage_id',as:'passagers'});
db.Voiture.belongsToMany(db.Passager,{through:'depart',as:'voitures',foreign_key:'passager_id'});
db.Passager.belongsToMany(db.Voiture,{through:'depart',as:'passagers',foreign_key:'voiture_id'});

module.exports=  db;