const Message = require('../model/messages');

exports.saveMessage = async (data) => {
  const { senderId, receiverId, content } = data;
  const message = new Message({ senderId, receiverId, content });
  return await message.save();
};

exports.getMessagesBetweenUsers = async (req, res) => {
  const { user1, user2 } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { senderId: user1, receiverId: user2 },
        { senderId: user2, receiverId: user1 }
      ]
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load messages' });
  }
};


exports.getChatPartners = async (req, res) => {
  const { userId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { senderId: userId },
        { receiverId: userId }
      ]
    });

    const userIds = new Set();

    messages.forEach(msg => {
      if (msg.senderId.toString() !== userId) {
        userIds.add(msg.senderId.toString());
      }
      if (msg.receiverId.toString() !== userId) {
        userIds.add(msg.receiverId.toString());
      }
    });

    res.json(Array.from(userIds));
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch chat partners' });
  }
};
