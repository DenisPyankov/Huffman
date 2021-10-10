let fs = require ('fs');
let argv = process.argv;
let A = new Array();
let tree = new Array();
let fcode = new Array();
function Node (letter, freq, used, father, code) {
	this.letter = letter;
	this.freq = freq;
	this.used = used;
	this.father = father;
	this.code = code;
}

let i = 0;
let j = 0;


let data = fs.readFileSync(argv[2], 'utf8');
data.toString();
console.log(data);
for (i = 0; i< data.length; i++) {
	A[data.charAt(i)]=0;
}
for (i = 0; i< data.length; i++) {
	A[data.charAt(i)]++;
}
for (i in A) {
	let n = new Node (i, A[i], false, null, '');
	tree.push(n);
}


let power = tree.length;
if (power == 1)
	tree[0].code = '0';

let lenow = 0;
while (tree[tree.length - 1].letter.length < power) {
	lenow = tree.length;
	tree.sort(function(a,b) {
		if (a.freq < b.freq || ( a.freq == b.freq && a.letter.length > b.letter.length ))
			return -1;
		if ( (a.freq > b.freq) || ( a.freq == b.freq && a.letter.length < b.letter.length )) 
			return 1;
		return 0;
	});
	p=0;
	while (tree.length == lenow) {
		if(tree[p].used == tree[p+1].used && tree[p].used == false) {
			n = new Node (tree[p].letter + tree[p+1].letter, 
			tree[p].freq + tree[p+1].freq, false, null, '');
			tree.push(n);
			tree[p].used = true;
			tree[p+1].used = true;
			tree[p].father = tree[tree.length-1].letter;
			tree[p+1].father = tree[tree.length-1].letter;
		}
	p++;
	}
}

tree.sort(function(a,b) {
	if (a.letter.length < b.letter.length) 
		return 1;
	if (a.letter.length > b.letter.length) 
		return -1;
		return 0;
});

for (i in tree) {
	let g1 = 0;
	let g2 = 0;
	let g = 0;
	for (j in tree)
		if (tree[j].father == tree[i].letter) {
			if (g == 0) {
				g1 = tree[j];
				g++
			}
			else {
				g2 = tree[j];
			}
		}
	if (g1.freq <= g2.freq) {
		g1.code = tree[i].code + '0';
		g2.code = tree[i].code + '1';
	}
	else {
		g1.code = tree[i].code + '1';
		g2.code = tree[i].code + '0';
	}
}

for (i in tree) {
	if (tree[i].letter.length == 1) {
		fcode.push(tree[i]);
	}
}
console.log(fcode);


i = 0;
let string = '';
let str = '';
if (argv[3] == 'code') {
	while (i < data.length) {
		for (j in fcode)
			if (data.charAt(i) == fcode[j].letter) 
				string += fcode[j].code
		i++;
	}
	fs.writeFileSync(argv[4], string);
}

if (argv[3] == 'decode') {
	let dec = fs.readFileSync(argv[5], 'utf8');
	dec.toString();
	while  (i < dec.length) {
		str += dec.charAt(i);
		for (j in fcode)
			if (str == fcode[j].code) {
				string += fcode[j].letter;
				str = '';
			}
		i++;
	}
	fs.writeFileSync(argv[4], string);
}























				
		







