import express, { response } from 'express';
import { protect } from '../middlewares/atheticationmiddleware.js';
import { roleMiddleware } from '../middlewares/rolemiddleware.js';
import { createTask, deleteTask, getTaskById, getTasks, updateTask } from '../controllers/Task.js';

const router = express.Router();

router.post("/", protect, roleMiddleware(["user","admin"]) , createTask);
// input required
// {
//     "title":"Task-1",
//     "description":"Task-1 created",
//     "status":"pending",
//     "priority":"high",
//     "assignedTo":"babakhalilmalyam2@gmail.com"
//   }
// responce
// {
//     "title": "Task-1",
//     "description": "Task-1 created",
//     "status": "pending",
//     "priority": "high",
//     "assignedTo": "66c95e8c25e3f4e573673efc",
//     "createdBy": "66c952cbe2d29b2edf74a8d1",
//     "_id": "66c962f7f00952b7a8aa7e85",
//     "createdAt": "2024-08-24T04:35:03.385Z",
//     "__v": 0
//   }
router.get("/", protect, getTasks);
// response
// [
//     {
//       "_id": "66c9603fbbcf631c5c58b965",
//       "title": "Task-1",
//       "description": "Task-1 created",
//       "status": "pending",
//       "priority": "high",
//       "assignedTo": {
//         "_id": "66c95e8c25e3f4e573673efc",
//         "name": "Baba khalil",
//         "email": "babakhalilmalyam2@gmail.com"
//       },
//       "createdBy": {
//         "_id": "66c952cbe2d29b2edf74a8d1",
//         "name": "Baba",
//         "email": "babakhalilmalyam@gmail.com"
//       },
//       "createdAt": "2024-08-24T04:23:27.571Z",
//       "__v": 0
//     },
//     {
//       "_id": "66c962f7f00952b7a8aa7e85",
//       "title": "Task-1",
//       "description": "Task-1 created",
//       "status": "pending",
//       "priority": "high",
//       "assignedTo": {
//         "_id": "66c95e8c25e3f4e573673efc",
//         "name": "Baba khalil",
//         "email": "babakhalilmalyam2@gmail.com"
//       },
//       "createdBy": {
//         "_id": "66c952cbe2d29b2edf74a8d1",
//         "name": "Baba",
//         "email": "babakhalilmalyam@gmail.com"
//       },
//       "createdAt": "2024-08-24T04:35:03.385Z",
//       "__v": 0
//     }
//   ]
router.get("/:id", protect, getTaskById);
// response
// {
    //       "_id": "66c9603fbbcf631c5c58b965",
    //       "title": "Task-1",
    //       "description": "Task-1 created",
    //       "status": "pending",
    //       "priority": "high",
    //       "assignedTo": {
    //         "_id": "66c95e8c25e3f4e573673efc",
    //         "name": "Baba khalil",
    //         "email": "babakhalilmalyam2@gmail.com"
    //       },
    //       "createdBy": {
    //         "_id": "66c952cbe2d29b2edf74a8d1",
    //         "name": "Baba",
    //         "email": "babakhalilmalyam@gmail.com"
    //       },
    //       "createdAt": "2024-08-24T04:23:27.571Z",
    //       "__v": 0
    //     }

router.put("/:id", protect,roleMiddleware(["admin","user"]), updateTask);
// response
// {
    //       "_id": "66c9603fbbcf631c5c58b965",
    //       "title": "Task-1",
    //       "description": "Task-1 created",
    //       "status": "completed",
    //       "priority": "high",
    //       "assignedTo": "66c95e8c25e3f4e573673efc",
    //         
    //       "createdBy": "66c952cbe2d29b2edf74a8d1",
    //       "createdAt": "2024-08-24T04:23:27.571Z",
    //       "__v": 0
    //     }

router.delete("/:id", protect,roleMiddleware(["admin"]), deleteTask);

// response
// {message:"Task Deleted"}
export default router;
