import express from 'express';
import { login,  logout, register } from '../controllers/login.js';
const loginrouter = express.Router();

loginrouter.post('/register', register);
loginrouter.post('/login', login);
// {
//     "email":"babakhalilmalyam@gmail.com",
//     "password":"1234"
//   }
// response
// {
//     "message": "Login successful",
//     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Yzk1MmNiZTJkMjliMmVkZjc0YThkMSIsImVtYWlsIjoiYmFiYWtoYWxpbG1hbHlhbUBnbWFpbC5jb20iLCJuYW1lIjoiQmFiYSIsImlhdCI6MTcyNDQ3MTQ5MywiZXhwIjoxNzI0NDg5NDkzfQ.XPUBQcijYe_kSTz2iQkJDWoSB2-Kdr_IMXwL5-V2pus",
//     "userRole": "user"
//   }
loginrouter.post('/logout', logout);
export default loginrouter;


