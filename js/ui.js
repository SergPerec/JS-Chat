export const UI_ELEMENTS = {
  MODALS_CONTENT: document.querySelectorAll('.modals__content'),
  MODALS_SETTINGS_BTN: document.querySelector('.chat__top-btn--setings'),
  MODALS_SETTINGS: document.querySelector('.modals__settings'),
  SETTINGS_FORM: document.querySelector('.modals__settings-form'),
  SETTINGS_INPUT: document.querySelector('.modals__settings-input'),
  MODALS_LOGIN_BTN: document.querySelector('.chat__top-btn--login'),
  MODALS_LOGIN: document.querySelector('.modals__login'),
  MODALS_CODE: document.querySelector('.modals__code'),
  MODALS_CODE_BTN: document.querySelector('.modals__code__btn'),
  MODALS: document.querySelector('.modals'),
  MODALS_OVERLAY: document.querySelector('.modals__overlay'),
  MODALS_CLOSE: document.querySelectorAll('.modals__close-btn'),
  TEMPLATE: document.querySelector('.template'),
  MESSAGE_FORM: document.querySelector('.chat__message-form'),
  MESSAGE_LIST: document.querySelector('.chat__content'),
  MESSAGE_TEXT_VALUE: document.querySelector('.chat__message-input'),
  MESSAGE_WRAPPER: document.querySelector('.chat__content-wrapper'),
  LOGIN_FORM: document.querySelector('.modals__login-form'),
  LOGIN_INPUT: document.querySelector('.modals__login-input'),
  LOGIN_FORM_SUCCESSFUL: document.querySelector('.modals__login-successful'),
  LOGIN_NEXT_BTN: document.querySelector('.modals__login-next-btn'),
  MODALS_CONFIRMATIONS: document.querySelector('.modals__confirmation'),
  CODE_FORM: document.querySelector('.modals__code-form'),
  CODE_INPUT: document.querySelector('.modals__code-input')
};

function showSettingsModal () {
  UI_ELEMENTS.MODALS_SETTINGS.classList.add('modals-show');
}

function showLoginModal () {
  UI_ELEMENTS.MODALS_LOGIN.classList.add('modals-show');
}

function showCodeModal () {
  UI_ELEMENTS.MODALS_CODE.classList.add('modals-show');
  UI_ELEMENTS.MODALS_LOGIN.classList.remove('modals-show');
}

export function showModals (e) {
  UI_ELEMENTS.MODALS.classList.add('modals-show');
  switch (e.target) {
    case UI_ELEMENTS.MODALS_SETTINGS_BTN:
      showSettingsModal();
      break;
    case UI_ELEMENTS.MODALS_LOGIN_BTN:
      showLoginModal();
      break;
    case UI_ELEMENTS.MODALS_CODE_BTN:
      showCodeModal();
      break;
    default:
      break;
  }
}

export function closeModals () {
  UI_ELEMENTS.MODALS_CONTENT.forEach((item) => item.classList.remove('modals-show'));
  UI_ELEMENTS.MODALS_SETTINGS.classList.remove('modals-show');
  UI_ELEMENTS.MODALS.classList.remove('modals-show');
}

function scrollListToBottom () {
  UI_ELEMENTS.MESSAGE_WRAPPER.scrollTop = UI_ELEMENTS.MESSAGE_WRAPPER.scrollHeight;
}

export function showNewMessage (userName, text, time) {
  const textValue = text ?? UI_ELEMENTS.MESSAGE_TEXT_VALUE.value;
  const name = userName ?? 'Я';
  const dateNow = new Date(time);
  const hoursMinutes = dateNow.getHours() + ':' + dateNow.getMinutes();

  const itemMessage = UI_ELEMENTS.TEMPLATE.content.cloneNode(true);
  const timeMessage = itemMessage.querySelector('.chat__content-item-time');
  timeMessage.textContent = hoursMinutes;
  const textMessage = itemMessage.querySelector('.chat__content-item-text');
  textMessage.textContent = textValue;
  const user = itemMessage.querySelector('.chat__content-item-name');
  user.textContent = `${name}: `;

  UI_ELEMENTS.MESSAGE_LIST.append(itemMessage);
  scrollListToBottom();
}

export function showSuccessfulSending () {
  UI_ELEMENTS.LOGIN_FORM_SUCCESSFUL.textContent = 'Код отправлен на почту.';
  UI_ELEMENTS.LOGIN_FORM_SUCCESSFUL.classList.add('modals__login-successful__ok');

  setTimeout(() => {
    UI_ELEMENTS.LOGIN_FORM_SUCCESSFUL.textContent = '';
  }, 5000);
}
