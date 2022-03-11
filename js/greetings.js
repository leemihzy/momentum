const loginForm = document.getElementById("login-form");
const loginInput = loginForm.querySelector("input");
const link = document.querySelector("a");
const greeting = document.querySelector("#greeting");

// 일반적으로 문자열만 포함된 변수는 대문자로 표기, 문자열 저장하고 싶을 때 사용
const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function onLoginSubmit(e) {
  e.preventDefault();
  loginForm.classList.add(HIDDEN_CLASSNAME);

  localStorage.setItem(USERNAME_KEY, loginInput.value);
  paintGreetings(loginInput.value);
}

function paintGreetings(username) {
  greeting.classList.remove(HIDDEN_CLASSNAME);
  greeting.innerText = `Hello ${username} !`;
}

loginForm.addEventListener("submit", onLoginSubmit);
// onLoginSubmit({information});
// -> 첫번째인자: 이벤트(submit)에 대한 정보제공

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", onLoginSubmit);
} else {
  paintGreetings(savedUsername);
}
