import express  from "express";
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
    searchUsers,   
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router(); 

// read
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

// update
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);
//get
router.post('/search', (req, res) => {
    console.log('Received POST request to /users/search');
    searchUsers(req, res);
  });

export default router;