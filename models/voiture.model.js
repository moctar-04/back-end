const {DataTypes}= require('sequelize')

module.exports=function (sequelize,Sequelize) {
    const Voiture=sequelize.define('voiture',{
        id:{
            type:Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        modele:{
            type:Sequelize.STRING,
            allowNull:false
        },
        matricule:{
            type:Sequelize.STRING,
            allowNull:false
        }
    },{timestamp:true});
    return Voiture;
}