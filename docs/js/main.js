"use strict";
window.onload = function () {
    calcTime();
    loadSetting();
    window.setInterval(function () {
        calcTime();
        var data = getInputData();
        calcStamina(data.maxStamina, data.parMinute);
    }, 500);
};
function calcTime() {
    var hour = Number(document.getElementById("hour").value);
    var minute = Number(document.getElementById("minute").value);
    var result = new Date();
    result.setHours(result.getHours() + hour);
    result.setMinutes(result.getMinutes() + minute);
    document.getElementById("result").innerHTML = replaceDate(result);
}
function replaceDate(date) {
    return ('0' + (date.getMonth() + 1)).slice(-2) + "月" +
        ('0' + date.getDate()).slice(-2) + "日 " +
        ('0' + date.getHours()).slice(-2) + ":" +
        ('0' + date.getMinutes()).slice(-2);
}
function calcStamina(maxStamina, parMinute) {
    var hour = Number(document.getElementById("hour").value);
    var minute = Number(document.getElementById("minute").value);
    var rest = hour * 60 + minute;
    var recovery = Math.floor(rest / parMinute);
    document.getElementById("result2").innerHTML = '' + (maxStamina - recovery);
}
function onTapInput() {
    var data = getInputData();
    saveSetting(data.maxStamina, data.parMinute);
    calcStamina(data.maxStamina, data.parMinute);
}
function getInputData() {
    var maxStamina = Number(document.getElementById("max_stamina").value);
    var parMinute = Number(document.getElementById("par_minute").value);
    return {
        maxStamina: maxStamina,
        parMinute: parMinute
    };
}
var COOKIE_TAG = {
    MAX_STAMINA: "max_stamina",
    PAR_MINUTE: "par_minute"
};
function saveSetting(maxStamina, parMinute) {
    document.cookie = COOKIE_TAG.MAX_STAMINA + "=" + maxStamina;
    document.cookie = COOKIE_TAG.PAR_MINUTE + "=" + parMinute;
}
function loadSetting() {
    var cookieList = document.cookie.split(";");
    var map = {};
    cookieList.forEach(function (cookie) {
        var key_vlue = cookie.split("=");
        map[key_vlue[0].trim()] = key_vlue[1];
    });
    if (map[COOKIE_TAG.MAX_STAMINA]) {
        document.getElementById("max_stamina").value = map[COOKIE_TAG.MAX_STAMINA];
    }
    if (map[COOKIE_TAG.PAR_MINUTE]) {
        document.getElementById("par_minute").value = map[COOKIE_TAG.PAR_MINUTE];
    }
}
