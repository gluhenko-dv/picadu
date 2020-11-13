// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаем переменную, в которую положим меню
let menu = document.querySelector('.sidebar');
// отслеживаем клик по кнопке меню и запускаем функцию
menuToggle.addEventListener('click', function (event) {
  // отменяем стандартное поведение ссылки
  event.preventDefault();
  // вешаем класс на меню, когда кликнули по кнопке меню
  menu.classList.toggle('visible');
});

const regExpValidEmail = /^\w+@\w+\.\w{2,}$/;


const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordInput = document.querySelector('.login-password');
const loginSignup = document.querySelector('.login-signup');

const userElem = document.querySelector('.user');
const userNameElem = document.querySelector('.user-name');

const exitElem = document.querySelector('.exit');
const editElem = document.querySelector('.edit');
const editContainer = document.querySelector('.edit-container');

const editUsername = document.querySelector('.edit-username');
const editPhotoURL = document.querySelector('.edit-photo');


const listUser = [{
    id: '01',
    email: 'admin@admin.ru',
    password: '12345',
    displayName: 'admin'
  },
  {
    id: '02',
    email: 'user',
    password: '123456',
    displayName: 'user'
  }
];

const setUsers = {
  user: null,
  logIn(email, password, handler) {
    if(!regExpValidEmail.test(email)) return alert('Email не валиден');
    const user = this.getUser(email);
    if (user && user.password === password){
      this.authorizedUser(user);
      handler();
    }else{
      alert('Пользователь с такими данными не найден');
    }
  },
  logOut(handler) {
    this.user = null;
    handler();
  },
  signUp(email, password, handler) {
    if(!regExpValidEmail.test(email)) return alert('Email не валиден');
    if (!email.trim() || !password.trim()){
      alert('Введите данные')
      return;
    }
    if (!this.getUser(email)){
      const user = {email, password, displayName: email.split('@')[0]};
      listUser.push(user);
      this.authorizedUser(user);
      handler();
    }
    else{
      alert('Пользователь с таким email уже существует');
    }
  },
  getUser(email){
    return listUser.find(item=> item.email === email);
  },
  authorizedUser(user){
    this.user = user;
  }
};

const toggleAuthDom = () => {
  const user = setUsers.user;
  console.log('user', user);
  if(user){
    loginElem.style.display = 'none';
    userElem.style.display = '';
    userNameElem.textContent = user.displayName;
  }else{
    loginElem.style.display = '';
    userElem.style.display = 'none';
  }
}

loginForm.addEventListener('submit', event => {
  event.preventDefault();
  const emailValue = emailInput.value;
  const passwordlValue = passwordInput.value;
  setUsers.logIn(emailValue, passwordlValue, toggleAuthDom);
  loginForm.reset();
});

loginSignup.addEventListener('click', event => {
  event.preventDefault();
  const emailValue = emailInput.value;
  const passwordlValue = passwordInput.value;
  setUsers.signUp(emailValue, passwordlValue, toggleAuthDom);
  loginForm.reset();
});

exitElem.addEventListener('click', event =>{
  event.preventDefault();
  setUsers.logOut(toggleAuthDom);
});

editElem.addEventListener('click', event =>{
  event.preventDefault();
  editContainer.classList.toggle('visible');
});

toggleAuthDom();