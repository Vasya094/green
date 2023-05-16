import axios from "axios"

export const sendMessage = async (text: string, chatId: string) => {
  const idInstance = localStorage.getItem("IdInstance")
  const apiTokenInstance = localStorage.getItem("ApiTokenInstance")
  debugger
  return await axios.post(
    `https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`,
    {
      message: text,
      chatId,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
}

interface INotification {
  data: {
    receiptId: number
    body: {
      typeWebhook: "incomingMessageReceived"
      instanceData: {
        idInstance: 1101820906
        wid: "79378207707@c.us"
        typeInstance: "whatsapp"
      }
      senderData: {
        chatId: string
      }
      messageData: {
        typeMessage: "extendedTextMessage"
        extendedTextMessageData: {
          text: string
        }
        textMessageData: {
          textMessage: string
        }
      }
    }
  }
}

export const getNotifications = async (chatId: string) => {
  const idInstance = localStorage.getItem("IdInstance")
  const apiTokenInstance = localStorage.getItem("ApiTokenInstance")
  const { data } = (await axios.get(
    `https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )) as INotification
  if (data) {
    await axios.delete(
      `https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${data.receiptId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    if (data?.body?.senderData?.chatId === chatId) {
      return (
        data?.body?.messageData?.textMessageData?.textMessage ||
        data?.body?.messageData?.extendedTextMessageData?.text ||
        "someting wrong ot unsupported message type"
      )
    }
  }
}
