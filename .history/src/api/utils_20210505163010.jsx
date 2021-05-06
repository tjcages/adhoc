import moment from "moment";
import { getNameEmail } from '../utils';

export const getBody = (message, mimeType) => {
    let encodedBody = "";
    if (typeof message.parts === "undefined") {
      encodedBody = message.body.data;
    } else {
      encodedBody = getHTMLPart(message.parts, mimeType);
    }
    encodedBody = encodedBody
      .replace(/-/g, "+")
      .replace(/_/g, "/")
      .replace(/\s/g, "");
    return decodeURIComponent(escape(window.atob(encodedBody)));
  };
  
  const getHTMLPart = (arr, mimeType) => {
    for (let x = 0; x < arr.length; x++) {
      if (typeof arr[x].parts === "undefined") {
        if (arr[x].mimeType === mimeType) {
          return arr[x].body.data;
        }
      } else {
        return getHTMLPart(arr[x].parts, mimeType);
      }
    }
    return "";
  };
  
  export const isHTML = str => {
    const doc = new DOMParser().parseFromString(str, "text/html");
    return Array.from(doc.body.childNodes).some(node => node.nodeType === 1);
  }

  export const getFromName = (from) => {
    const nameEmail = getNameEmail(from);
    return nameEmail.name;
}

export const getFormattedDate = (date, fallbackDateObj) => {
    let messageDate = moment(date);
    if (!messageDate.isValid()) {
      messageDate = moment(fallbackDateObj.parserFn(fallbackDateObj.date));
    }
    const nowDate = moment(new Date());
    const isMessageFromToday = messageDate.format("YYYYMMDD") === nowDate.format("YYYYMMDD");
    let formattedDate;
    if (isMessageFromToday) {
      formattedDate = messageDate.format("h:mm a");
    }
    else {
      if (messageDate.year() !== nowDate.year()) {
        formattedDate = messageDate.format("YYYY/MM/DD");
      }
      else {
        formattedDate = messageDate.format("MMM D");
      }
    }
    return formattedDate;
}