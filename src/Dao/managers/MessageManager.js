import messageModel from "../models/messages.model.js";

export default class MessageManager {
  async get() {
    const messages = await messageModel.find();
    return messages;
  }

  async post(message) {
    await messageModel.create(message);
  }
}