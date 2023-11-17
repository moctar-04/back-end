const { DataTypes}=require('sequelize')

module.exports=function(sequelize,Sequelize){
    const Chauffeur=sequelize.define('chauffeur',{
        id:{
            type:Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        prenom:{
            type:Sequelize.STRING,
            allowNull:false
        },
        nom:{
            type:Sequelize.STRING,
            allowNull:false
        },
        telephone:{
            type:Sequelize.STRING,
            allowNull:false
        },
        numPermis:{
            type:Sequelize.STRING,
            allowNull:false
        },
    },{timestamp:true});
    return Chauffeur;
}