import { redisClient } from "./redis/redisClient";

export const getOnlineUser = async () => {
  try {
    const activeKey = await redisClient.keys(`active:*`);
    const onlineUsers = [];

    for (const key of activeKey) {
      const userId = await redisClient.get(key);
      if (userId) {
        onlineUsers.push(userId);
      }
    }
    console.log("Current online users:", onlineUsers);
    return onlineUsers;
  } catch (error) {
    console.log("Unable to fetch the list of all online user");
    return [];
  }
};
