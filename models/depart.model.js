const { DataTypes}=require('sequelize')

module.exports=function(sequelize,Sequelize){
    const Depart=sequelize.define('depart',{
        id:{
            type:Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        dateDepart:{
            type:Sequelize.DATE,
            allowNull:false
        },
        heureDepart:{
            type:Sequelize.DATE,
            allowNull:false
        },
        destination:{
            type:Sequelize.STRING,
            allowNull:false
        }
    },{timestamp:true});
    return Depart;
}