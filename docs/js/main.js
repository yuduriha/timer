"use strict";
window.onload = function () {
    calcTime();
    window.setInterval(function () {
        calcTime();
        calcStamina();
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
function calcStamina() {
    var hour = Number(document.getElementById("hour").value);
    var minute = Number(document.getElementById("minute").value);
    var maxStamina = Number(document.getElementById("max_stamina").value);
    var parMinute = Number(document.getElementById("par_minute").value);
    var rest = hour * 60 + minute;
    var recovery = Math.floor(rest / parMinute);
    document.getElementById("result2").innerHTML = '' + (maxStamina - recovery);
}
