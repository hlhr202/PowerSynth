outlets = 3

var domain = 10000.0

var decay = 1000.0
var decayMin = 1.0
var decayMax = 1000.0

var sustain = 1.0

var attackMax = 999.0

var releaseMin = 2000.0

var c1 = 0
var c2 = 0
var c3 = 0


function setAttack(v){
	if (v > attackMax) v = attackMax;
	decayMin = v + 1.0;
	
	outlet(0, 1, v, 1, c1);
	outlet(0, "listdump");
	outlet(1, "attack", "set", v);
}

function setDecay(v){
	if (v < decayMin) v = decayMin;
	if (v > decayMax) v = decayMax;
	
	attackMax = v - 1.0;
	releaseMin = v + 1.0;
	decay = v;
	
	outlet(0, 2, decay, sustain, c2);
	outlet(0, "listdump");
	outlet(1, "decay", "set", v);
}

function setSustain(v){
	sustain = v/100;
	outlet(0, 2, decay, sustain, c2);
	outlet(0, "listdump");
}

function setRelease(v){
	if (v < releaseMin) v = releaseMin;
	decayMax = v - 1.0;
	
	outlet(0, 3, v, 0, c3);
	outlet(0, "listdump");
	outlet(1, "release", "set", v);
}	


function setDomain(v){
	//domain = (v/127.0)*10000.0;
}


function onChange(){
	var list = arrayfromargs(arguments);
	//post(list,"\n");
	
	//assign curve
	c1 = list[5]
	c2 = list[8]
	c3 = list[11]
	
	//set attack
	list[4] = 1;
	list[3] = (list[3]>attackMax?attackMax:list[3]);
	var attack = list[3];
	outlet(1, "attack", "assign", attack);
	
	//set decay
	list[6] = (list[6]<decayMin?decayMin:list[6]);
	list[6] = (list[6]>decayMax?decayMax:list[6]);
	decay = list[6];
	outlet(1, "decay", "assign", decay);
	
	//set sustain
	sustain = list[7];
	outlet(1, "sustain", "assign", sustain*100);
	
	//set release
	list[10] = 0;
	list[9] = (list[9]<releaseMin?releaseMin:list[9]);
	var release = list[9];
	outlet(1, "release", "assign", release);
	
	outlet(2, list);
}