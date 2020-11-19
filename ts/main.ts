window.onload = () => {
	calcTime();
	loadSetting();

	window.setInterval(() => {
		calcTime();
		let data = getInputData();
		calcStamina(data.maxStamina, data.parMinute);
	}, 500);
}

function calcTime() : void {
	let hour = Number((<HTMLInputElement>document.getElementById("hour")).value);
	let minute = Number((<HTMLInputElement>document.getElementById("minute")).value);

	let result = new Date();

	result.setHours(result.getHours() + hour);
	result.setMinutes(result.getMinutes() + minute);
	
	(<HTMLElement>document.getElementById("result")).innerHTML = replaceDate(result);
}

function replaceDate(date : Date) : string {
	return ('0' + (date.getMonth() + 1)).slice(-2) + "月" +
		('0' + date.getDate()).slice(-2) + "日 " + 
		('0' + date.getHours()).slice(-2) + ":" + 
		('0' + date.getMinutes()).slice(-2);
}

function calcStamina(maxStamina : number, parMinute : number) : void {
	let hour = Number((<HTMLInputElement>document.getElementById("hour")).value);
	let minute = Number((<HTMLInputElement>document.getElementById("minute")).value);

	// 残り時間(分)
	let rest = hour * 60 + minute;

	// 回復するスタミナ
	let recovery = Math.floor(rest / parMinute);
	
	(<HTMLElement>document.getElementById("result2")).innerHTML = '' + (maxStamina - recovery);
}


function onTapInput() : void {
	let data = getInputData();

	// 設定保存
	saveSetting(data.maxStamina, data.parMinute);

	calcStamina(data.maxStamina, data.parMinute);
}

function getInputData() {
	let maxStamina = Number((<HTMLInputElement>document.getElementById("max_stamina")).value);
	let parMinute = Number((<HTMLInputElement>document.getElementById("par_minute")).value);

	return {
		maxStamina: maxStamina,
		parMinute: parMinute
	};
}

const COOKIE_TAG = {
	MAX_STAMINA: "max_stamina",
	PAR_MINUTE: "par_minute"
};

function saveSetting(maxStamina: number, parMinute: number) : void{
	document.cookie = COOKIE_TAG.MAX_STAMINA + "=" + maxStamina;
	document.cookie = COOKIE_TAG.PAR_MINUTE + "=" + parMinute;
}

function loadSetting() : void {
	let cookieList = document.cookie.split(";");
	let map : {[index: string]: string} = {};
	cookieList.forEach((cookie) => {
		let key_vlue = cookie.split("=");
		map[key_vlue[0].trim()] = key_vlue[1];
	});

	if(map[COOKIE_TAG.MAX_STAMINA]) {
		(<HTMLInputElement>document.getElementById("max_stamina")).value = map[COOKIE_TAG.MAX_STAMINA];
	}
	if(map[COOKIE_TAG.PAR_MINUTE]) {
		(<HTMLInputElement>document.getElementById("par_minute")).value = map[COOKIE_TAG.PAR_MINUTE];
	}
}