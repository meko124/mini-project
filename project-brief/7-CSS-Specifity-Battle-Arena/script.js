function parseSpecificity(selector) {

	let s = selector.trim();
	let a = 0 , b = 0 , c = 0;

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
    
    for (let i = 0; i < 4; i++) {
        if (selectorA[i] > selectorB[i]) {
            return {
                winner: 'A',
                reason: `colom ${[i]}: ${selectorA[i]} vs ${selectorB[i]}`
            };
        }
        if (selectorA[i] < selectorB[i]) {
            return {
                winner: 'B',
                reason: `colom ${[i]}: ${selectorB[i]} vs ${selectorA[i]}`
            };
        }
    }
    return {winner: 'draw', reason: 'All colom similiar'};
}
// parseSpecificity('div');
// parseSpecificity('.item');
// parseSpecificity('#nav');