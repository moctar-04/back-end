const { DataTypes}=require('sequelize')

module.exports=function(sequelize,Sequelize){
    const Bagage=sequelize.define('bagage',{
        id:{
            type:Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        libelle:{
            type:Sequelize.STRING,
            allowNull:false
        },
        typeBagage:{
            type:Sequelize.STRING,
            allowNull:false
        },
        qte:{
            type:Sequelize.STRING,
            allowNull:false
        }
    },{timestamp:true});
    return Bagage;
}