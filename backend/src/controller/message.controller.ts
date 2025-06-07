import { RequestHandler } from "express";
import { MessageType } from "../utils/schema/messageSchema";
import prismaClient from "../utils/prismaClient";
import io from "../socket";

export const getMessage: RequestHandler<
  { receiverId: string },
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  const senderId = req.user.id;
  const receiverId = req.params.receiverId;
  try {
    // these message are according to the time they were sent

    const conversation = await prismaClient.conversation.findFirst({
      where: {
        participants: { every: { id: { in: [senderId, receiverId] } } },
      },
      select: { messages: { orderBy: { createdAt: "asc" } } },
    });

    if (!conversation) {
      res.status(200).json({
        success: true,
        message: "no message",
        data: [],
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "successfully retrieved  message",
      data: conversation.messages,
    });
    return;
  } catch (error) {
    next(error);
  }
};

export const sendMessage: RequestHandler<
  { receiverId: string },
  unknown,
  MessageType,
  unknown
> = async (req, res, next) => {
  const senderId = req.user.id;
  const receiverId = req.params.receiverId;
  const { content } = req.body;

  try {
    const transaction = await prismaClient.$transaction(async (tx) => {
      // find the conversation
      let conversation = await tx.conversation.findFirst({
        where: {
          participants: { every: { id: { in: [senderId, receiverId] } } },
        },
      });

      // if conversation is not found
      if (!conversation) {
        conversation = await tx.conversation.create({
          data: {
            participants: { connect: [{ id: senderId }, { id: receiverId }] },
          },
        });
      }

      // creating a new message

      const newMessage = await tx.message.create({
        data: {
          content,
          senderId,
          receiverId,
          conversationId: conversation.id,
        },
      });
      return newMessage;
    });

    res.status(201).json({
      success: true,
      message: transaction.content,
    });

    // sending the message two a room in which there are sender and receiver both

    io.to(receiverId).emit("send-message", transaction.content);
    return;
  } catch (error) {
    next(error);
  }
};
