
import { UI_ELEMENTS, showModals, closeModals, showNewMessage, showSuccessfulSending } from './UI.js';

UI_ELEMENTS.MODALS_SETTINGS_BTN.addEventListener('click', showModals);
UI_ELEMENTS.MODALS_CLOSE.forEach((item) => item.addEventListener('click', closeModals));
UI_ELEMENTS.MESSAGE_FORM.addEventListener('submit', sendMessage);
UI_ELEMENTS.MODALS_LOGIN_BTN.addEventListener('click', showModals);
UI_ELEMENTS.MODALS_CODE_BTN.addEventListener('click', showModals);
UI_ELEMENTS.LOGIN_FORM.addEventListener('submit', getCode);
UI_ELEMENTS.CODE_FORM.addEventListener('submit', () => {
  setCookie('code', UI_ELEMENTS.CODE_INPUT.value);
});
UI_ELEMENTS.SETTINGS_FORM.addEventListener('submit', changeName);

async function getCode (e) {
  e.preventDefault();
  const body = {
    email: UI_ELEMENTS.LOGIN_INPUT.value
  };
  const response = await fetch('https://edu.strada.one/api/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  if (response.ok) {
    showSuccessfulSending();
  }
}

async function getUser() {
  const url = 'https://edu.strada.one/api/user/me';
  const token = getCookie('code');
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  const json = await response.json();
  console.log(json);
}

async function changeName(event) {
  event.preventDefault();
  const userName = UI_ELEMENTS.SETTINGS_INPUT.value;
  
  const name = {
    name: `${userName}`,
  };
  const token = getCookie('code');
  const response = await fetch('https://edu.strada.one/api/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(name),
  });
  getUser();
}

function render (json) {
  console.log(json);
  const listMessage = json.messages.reverse();
  listMessage.forEach((elem) => {
    showNewMessage(elem.user.name, elem.text, elem.createdAt)
  });
}

async function getMessages() {
  const url = 'https://edu.strada.one/api/messages/';
  const token = getCookie('code');
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  const json = await response.json();
  render(json); 
} 

function sendMessage(e) {
  e.preventDefault();
  const token = getCookie('code');
  const socket = new WebSocket(`wss://edu.strada.one/websockets?${token}`);
  const textVal = { text: UI_ELEMENTS.MESSAGE_TEXT_VALUE.value };
  console.log(textVal)
  socket.onopen = function () {
    socket.send(JSON.stringify(textVal));
  };
  socket.onmessage = function () {
    getMessages();
  };
  e.target.reset();
}

document.addEventListener('DOMContentLoaded', getMessages);