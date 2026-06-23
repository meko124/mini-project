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

// parseSpecificity('div');
// parseSpecificity('.item');
// parseSpecificity('#nav');