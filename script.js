/*
    copyright 2022
    author: https://vk.com/uixuser
    created at: 2022.01.30 / 19:49
*/

var limitTxt = "К сожалению, вы не можете добавлять больше друзей за один день. Пожалуйста, попробуйте завтра.";
var addBtn = document.querySelectorAll(".friends_find_user_add");
var usersName = document.querySelectorAll(".friends_find_user_name");
var counter = 0;
var userList = [];
var time = 8000; // ms
var logTime = 15000; // ms
var init = null;
var initLogs = null;
var scrollCounter = 10000;
console.clear();
console.log(`%cАвтоматическое добавление в друзья запущено!`, 'font-weight: bold;');
console.log(`%cЗадержка перед отправкой: ${time/1000}с.\nЗадержка логирования: ${logTime/1000}с.`, 'color: #ddd;');


function sendReqToUser() {
    var body = document.body;
    addBtn = document.querySelectorAll(".friends_find_user_add");
    usersName = document.querySelectorAll(".friends_find_user_name");
    scroll(0, scrollCounter);
    addBtn[counter].click();

    userList.push({
        name: usersName[counter].innerText,
        status: "success",
        addedAt: new Date().toLocaleString(),
    })

    console.log(`%c${usersName[counter].innerText} добавлен в друзья.`, 'color: green;');

    if(document.body.innerText.indexOf(limitTxt) > -1) {
        clearInterval(initLogs);
        clearInterval(init);
        console.log('%c - Вы превысили лимит по заявкам в день. Попробуйте пожалуйста завтра.', 'color: crimson;');
        console.log('%c - Вы превысили лимит по заявкам в день. Попробуйте пожалуйста завтра.', 'color: crimson;');
        console.log('%c - Вы превысили лимит по заявкам в день. Попробуйте пожалуйста завтра.', 'color: crimson;');
    }

    counter++;
    scrollCounter = scrollCounter + 10000;
}

function getLogs() {
    console.log(`%cОтправлено ${userList.length} заявок.`, 'font-weight: bold;');
    localStorage.setItem("fake data", JSON.stringify(userList));
}

function setLogs() {
    if(localStorage.getItem("fake data") != null) {
        userList = JSON.parse(localStorage.getItem("fake data"));
        console.log('%cБаза "fake data" успешно загружена!', 'color: green;');
        console.log(`%cВсего отправлено: ${userList.length} заявок.\nПервая заявка: ${userList[0].addedAt}`, 'color: green;');
    } else {
        console.log('%cБаза "fake data" не найдена :(', 'color: crimson;');
    }
}
setLogs();
init = setInterval(sendReqToUser, time);
initLogs = setInterval(getLogs, logTime);
