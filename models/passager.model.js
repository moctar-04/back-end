const { DataTypes}=require('sequelize')

module.exports=function(sequelize,Sequelize){
    const Passager=sequelize.define('passager',{
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
        numCNI:{
            type:Sequelize.STRING,
            allowNull:false
        },
    },{timestamp:true});
    return Passager;
}