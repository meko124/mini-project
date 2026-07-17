function parseSpecificity(selector) {

	let s = selector.trim();
	let a = 0 , b = 0 , c = 0, d = 0;

	s = s.replace(/::[\w-]+/g, () => {d++; return '';});
    s = s.replace(/#[\w-]+/g, () => {b++; return '';});
    s = s.replace(/:[\w-]+(\([^)]*\))?/g, () => {c++; return '';});
    s = s.replace(/\[[^\]]*\]/g, () => {c++; return '';});
    s = s.replace(/\.[\w-]+/g, () => {c++; return '';});

    const elements = s.match(/[a-zA-Z][\w-]*/g) || [];

    d += elements.length;
    return [a,b,c,d];
}

function compare(selectorA,selectorB) {
    const labels = ['inline','ID','class','elemen'];

    for (let i = 0; i < 4; i++) {
        if (selectorA[i] > selectorB[i]) {
            return {
                winner: 'A',
                reason: `${labels[i]}: ${selectorA[i]} vs ${selectorB[i]}`
            };
        }
        if (selectorA[i] < selectorB[i]) {
            return {
                winner: 'B',
                reason: `${labels[i]}: ${selectorB[i]} vs ${selectorA[i]}`
            };
        }
    }
    return {winner: 'draw', reason: 'All colom similiar equels draw!'};
}
// parseSpecificity('div');
// parseSpecificity('.item');
// parseSpecificity('#nav');
document.getElementById('btnBattle').addEventListener('click',() => {

    //take an inputs
    const inputA = document.getElementById('selectorA').value;
    const inputB = document.getElementById('selectorB').value;

    if (!inputA || !inputB) {
        document.getElementById('result').textContent = '⚠️ fill both selectors!';
        return;
    }

    //parse
    const tupleA = parseSpecificity(inputA);
    const tupleB = parseSpecificity(inputB);

    //compare
    const outcome = compare(tupleA, tupleB);

    //render
    document.getElementById('scoreA').textContent = `[${tupleA.join(', ')}]`;
    document.getElementById('scoreB').textContent = `[${tupleB.join(', ')}]`;

    //animation health bar
    const totalA = tupleA.reduce((sum, n) => sum + n, 0);
    const totalB = tupleB.reduce((sum, n) => sum + n, 0);
    const total = totalA + totalB  || 1;

    document.getElementById('barA').style.width = `${(totalA / total) * 100}%`;
    document.getElementById('barB').style.width = `${(totalB / total) * 100}%`;

    //highlight winning
    const fighterA = document.getElementById('fighterA');
    const fighterB = document.getElementById('fighterB');

    fighterA.className = 'fighter';
    fighterB.className = 'fighter';

    if (outcome.winner == 'A') {
        fighterA.classList.add('winner');
        fighterB.classList.add('loser');
    } else if (outcome.winner == 'B') {
        fighterB.classList.add('winner');
        fighterA.classList.add('loser');
    }

    //showing a result
    const emoji = outcome.winner === 'draw' ? '🤝' : '🏆';
    document.getElementById('result').textContent =`${emoji} ${outcome.reason}`; 
});