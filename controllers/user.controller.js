const { createUser,getAllUser, createUserWithRole,signIn,getUserById}=require('../services/user.service');
const express=require('express');
const Userroutes=express.Router();

Userroutes.post('/create',createUser);
Userroutes.post('/createavecrole',createUserWithRole);
//Userroutes.get('/auth',authentication);
Userroutes.get('/all',getAllUser);
Userroutes.get('/getOne',getUserById);
//Userroutes.delete('/all',getAllUser)
Userroutes.post('/login',signIn);

module.exports=Userroutes;
