
const phases = [
	{label: 'breath in', count: 4},
	{label: 'hold your breath', count: 4},
	{label: 'breath out', count: 6},
	{label: 'hold your breath', count: 2},
];

let timer = null;
let phaseIdx = 0;
let countdown = phases[0].count;

function start() {
	timer = setInterval(() => {

			document.getElementById("count").textContent = countdown;
			document.getElementById("label").textContent = phases[phaseIdx].label;

			countdown--;
	}, 1000);
}
function stop() {
	clearInterval(timer);
}
