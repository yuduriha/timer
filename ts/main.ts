window.onload = () => {
	calcTime();
	window.setInterval(() => {
		calcTime();
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
