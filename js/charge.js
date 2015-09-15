var canvas = document.getElementById("charge-canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth*2/3-10;
canvas.height = window.innerHeight-10;
var width = canvas.width;
var height = canvas.height;
var chargeSpeed = 2;
var chargeSize= 10;
var numCharges = 15;
var allPosCharge=[];
var allNegCharge=[];
var magConstant = 100;
var PI = 3.141592;
var maxSpeed = 10;
var maxDist =900;
var collisions = false;

function bounce(obj1,obj2){
	if(collisions){
		var aSpeed = Math.sqrt(Math.pow(obj1.velocity.x,2)+Math.pow(obj1.velocity.y,2));
		var bSpeed = Math.sqrt(Math.pow(obj2.velocity.x,2)+Math.pow(obj2.velocity.y,2));
		var difX2=0;
		var difY2=0;
		var dist2=0;
		while(/*bSpeed<=aSpeed&&allParticles[a].radius<=allParticles[b].radius&&*/dist2<(obj1.radius+obj2.radius)){
			difX2 = (obj1.position.x-obj2.position.x);
			difY2 = (obj1.position.y-obj2.position.y);
			dist2 =Math.sqrt((Math.pow(difX2,2)+Math.pow(difY2,2)));
			obj1.position.x=obj1.position.x-obj1.velocity.x/10;
			obj1.position.y=obj1.position.y-obj1.velocity.y/10;
		}
		var tempX = obj1.velocity.x;
		var tempY = obj1.velocity.y;
		obj1.velocity.x=obj2.velocity.x;
		obj1.velocity.y=obj2.velocity.y;
		obj2.velocity.x=tempX;
		obj2.velocity.y=tempY;
	}
	return [obj1,obj2];
}

function calcNewVelocities(allPosCharge, allNegCharge){
	for (var x = 0; x < allPosCharge.length; x++) {
		for (var y = 0; y < allNegCharge.length; y++) {
			var difX = (allPosCharge[x].position.x-allNegCharge[y].position.x);
			var difY = (allPosCharge[x].position.y-allNegCharge[y].position.y);
			var dist =Math.sqrt((Math.pow(difX,2)+Math.pow(difY,2)));
			if(dist>20&&dist<maxDist){
				allPosCharge[x].velocity.x-=(difX*magConstant)/Math.pow(dist,3);
				allPosCharge[x].velocity.y-=(difY*magConstant)/Math.pow(dist,3);
				allNegCharge[y].velocity.x+=(difX*magConstant)/Math.pow(dist,3);
				allNegCharge[y].velocity.y+=(difY*magConstant)/Math.pow(dist,3);
			}
			else if (dist <= 20){
				var newObjects=bounce(allPosCharge[x],allNegCharge[y]);
				allPosCharge[x]=newObjects[0];
				allNegCharge[y]=newObjects[1];
			}
		}
	}
	for (var x = 0; x < allPosCharge.length; x++) {
		for (var y = x; y < allPosCharge.length; y++) {
			var difX = (allPosCharge[x].position.x-allPosCharge[y].position.x);
			var difY = (allPosCharge[x].position.y-allPosCharge[y].position.y);
			var dist =Math.sqrt((Math.pow(difX,2)+Math.pow(difY,2)));
			if(dist>20&&dist<maxDist){
				allPosCharge[x].velocity.x+=(difX*magConstant)/Math.pow(dist,3);
				allPosCharge[x].velocity.y+=(difY*magConstant)/Math.pow(dist,3);
				allPosCharge[y].velocity.x-=(difX*magConstant)/Math.pow(dist,3);
				allPosCharge[y].velocity.y-=(difY*magConstant)/Math.pow(dist,3);
			}
			else if (dist <= 20){
				var newObjects=bounce(allPosCharge[x],allPosCharge[y]);
				allPosCharge[x]=newObjects[0];
				allPosCharge[y]=newObjects[1];
			}
		}
	}
	for (var x = 0; x < allNegCharge.length; x++) {
		for (var y = x; y < allNegCharge.length; y++) {
			var difX = (allNegCharge[x].position.x-allNegCharge[y].position.x);
			var difY = (allNegCharge[x].position.y-allNegCharge[y].position.y);
			var dist =Math.sqrt((Math.pow(difX,2)+Math.pow(difY,2)));
			if(dist>20&&dist<maxDist){
				allNegCharge[x].velocity.x+=(difX*magConstant)/Math.pow(dist,3);
				allNegCharge[x].velocity.y+=(difY*magConstant)/Math.pow(dist,3);
				allNegCharge[y].velocity.x-=(difX*magConstant)/Math.pow(dist,3);
				allNegCharge[y].velocity.y-=(difY*magConstant)/Math.pow(dist,3);
			}
			else if (dist <= 20){
				var newObjects=bounce(allNegCharge[x],allNegCharge[y]);
				allNegCharge[x]=newObjects[0];
				allNegCharge[y]=newObjects[1];
			}
		}
	}
}

function move(allParticles){
	for (var x = 0; x < allParticles.length; x++) {
		if(allParticles[x].velocity.x>maxSpeed){
			allParticles[x].velocity.x=maxSpeed;
		}
		if(allParticles[x].velocity.y>maxSpeed){
			allParticles[x].velocity.y=maxSpeed;
		}
		allParticles[x].position.x+=allParticles[x].velocity.x;
		allParticles[x].position.y+=allParticles[x].velocity.y;
		if (allParticles[x].position.x + 5>= canvas.width) {
	         	allParticles[x].velocity.x=-Math.abs(allParticles[x].velocity.x);
	        }
		if(allParticles[x].position.x <= 5){
			allParticles[x].velocity.x=Math.abs(allParticles[x].velocity.x);
		}
	        if (allParticles[x].position.y +5 >= canvas.height) {
         		allParticles[x].velocity.y = -Math.abs(allParticles[x].velocity.y);
		}
		if(allParticles[x].position.y <= 5){
			allParticles[x].velocity.y = Math.abs(allParticles[x].velocity.y);
		}
	}
}

function initializeCharge() {
	document.getElementById("numcharges").value=numCharges;
	document.getElementById("chargestr").value=magConstant/10;
	for (var i = 0; i < numCharges; i++) {
	        var charge = new Object();
		charge.position=new Object();
		charge.velocity=new Object();
	        charge.position.x = (Math.random() * (width-5))+5;
	        charge.position.y = (Math.random() * (height-5))+5;
	        charge.velocity.x = Math.random() * chargeSpeed;
	        charge.velocity.y = Math.random() * chargeSpeed;
		var cha = (Math.random() * 2) -1;
		if(cha>0){
			allPosCharge.push(charge);
		}
		else{
			allNegCharge.push(charge);
		}
	}
}

function moveCharges(){
	calcNewVelocities(allPosCharge, allNegCharge);
	move(allPosCharge);
	move(allNegCharge);
}

function drawCharges() {
    ctx.fillStyle = "rgba(255,255,255,.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < allPosCharge.length; i++) {
        charge = allPosCharge[i];
        ctx.beginPath();
        var colorString = 'rgb(255,0,0)';
        //ctx.fillStyle = colorString;
        ctx.strokeStyle = colorString;
        ctx.arc(charge.position.x, charge.position.y, chargeSize, 0, 2 * PI);
        ctx.fill();
        ctx.stroke();
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < allNegCharge.length; i++) {
        charge = allNegCharge[i];
        ctx.beginPath();
        var colorString = 'rgb(0,0,255)';
       //ctx.fillStyle = colorString;
        ctx.strokeStyle = colorString;
        ctx.arc(charge.position.x - (chargeSize / 2), charge.position.y - (chargeSize / 2), chargeSize, 0, 2 * PI);
        ctx.fill();
        ctx.stroke();
    }
}
initializeCharge();

$("#controls-submit").click(function() {
	if($("#numcharges").val()>100 || $("#numcharges").val()<0){
		alert("please use no more than 100 charges");
	}
	else if ( $("#chargestr").val() > 100 || $("#chargestr").val() <-100){
		alert("please use a charge strength of no more than 100");
	}
	else{
		numCharges = $("#numcharges").val();
		magConstant = $("#chargestr").val()*10;
		collisions = $("#collisions").is(":checked");
		allPosCharge=[];
		allNegCharge=[];
		initializeCharge();
	}
});

function main() {
	moveCharges();
	drawCharges();
	requestAnimationFrame(main);
};
requestAnimationFrame(main);
