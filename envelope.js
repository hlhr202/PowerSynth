outlets = 3

//var attack = 0.0
var domain = 10000.0
var decayMin = 1000.0
var attackMax = 999.0


function setAttack(v){
//	attack = (v/127.0)*(domain/10000.0);

	if (v > attackMax) v = attackMax;
	outlet(0, 1, v, 1);
	outlet(0, "listdump");
	outlet(1, "updateAttack1","set", v);
}

function setDomain(v){
	domain = (v/127.0)*10000.0;
}

function onChange(){
	var list = arrayfromargs(arguments);
	list[4] = 1;
	list[3] = (list[3]>attackMax?attackMax:list[3]);
	var attack = (list[3]>attackMax?attackMax:list[3]);
	outlet(1, "updateAttack1", "assign", attack);
	outlet(2, list);
}