const { DataTypes } = require("sequelize")

module.exports=function(sequelize,Sequelize){
    const User=sequelize.define('user',{
        id:{
            type:Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        username:{
            type:Sequelize.STRING,
            allowNull:false,
        },
        password:{
            type:Sequelize.STRING,
            allowNull:false,
        },
        email:{
            type:Sequelize.STRING,
            allowNull:false,
        }
    },{timestamp:true});
    return User;
};
