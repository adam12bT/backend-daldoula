const express = require('express');
const router = express.Router();
const messageController = require('../Controllers/messagesController');

router.get('/chat/:user1/:user2', messageController.getMessagesBetweenUsers);
router.get('/chat-user/:userId', messageController.getChatPartners);


module.exports = router;
