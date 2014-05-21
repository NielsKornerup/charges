var canvas = document.getElementById("charge-canvas");
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;
var chargeSpeed = 3;
var chargeSize= 5;
var numCharges = 25;
var allPosCharge=[];
var allNegCharge=[];
var magConstant = 100;
var PI = 3.141592

function initializeCharge() {
    for (var i = 0; i < numCharges; i++) {
        var charge = new Object();
        charge.x = Math.random() * width;
        charge.y = Math.random() * height;
        charge.rotation = Math.random() * 2 * PI;
        charge.speed = chargeSpeed;
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
	for (var x = 0; x < allPosCharge.length; x++) {
		for (var y = 0; y < allNegCharge.length; y++) {
			var difX = (allPosCharge[x].x-allNegCharge[y].x);
			var difY = (allPosCharge[x].y-allNegCharge[y].y);
			var dist =Math.sqrt((Math.pow(difX,2)+Math.pow(difY,2)));
			if(dist>5){
				var rotation = Math.atan(difY / difX);
				if (difY < 0 && difX < 0) {
					rotation += PI;
				} 
				else if (difX < 0 && difY > 0) {
					rotation += PI;
				}
				allPosCharge[x].rotation+=(((rotation - allPosCharge[x].rotation)*magConstant)/dist);
				allNegCharge[y].rotation+=(((rotation - allNegCharge[y].rotation)*magConstant)/dist);
				/*PosSpeedX= Math.cos(allPosCharge[x].rotation)*allPosCharge[x].speed;
				PosSpeedY= Math.sin(allPosCharge[x].rotation)*allPosCharge[x].speed;
				NegSpeedX= Math.cos(allNegCharge[y].rotation)*allNegCharge[y].speed;
				NegSpeedY= Math.sin(allNegCharge[y].rotation)*allNegCharge[y].speed;*/
			}
		}
	}
	
	for (var x = 0; x < allPosCharge.length; x++) {
		SpeedX= Math.cos(allPosCharge[x].rotation)*allPosCharge[x].speed;
		SpeedY= Math.sin(allPosCharge[x].rotation)*allPosCharge[x].speed;
		allPosCharge[x].x+=SpeedX;
		allPosCharge[x].y+=SpeedY;
	}
	for (var x = 0; x < allNegCharge.length; x++) {
		SpeedX= Math.cos(allNegCharge[x].rotation)*allNegCharge[x].speed;
		SpeedY= Math.sin(allNegCharge[x].rotation)*allNegCharge[x].speed;
		allNegCharge[x].x+=SpeedX;
		allNegCharge[x].y+=SpeedY;
	}
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
        ctx.arc(charge.x - (chargeSize / 2), charge.y - (chargeSize / 2), chargeSize, 0, 2 * PI);
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
        ctx.arc(charge.x - (chargeSize / 2), charge.y - (chargeSize / 2), chargeSize, 0, 2 * PI);
        ctx.fill();
        ctx.stroke();
    }
}
initializeCharge();

	function main() {
		moveCharges();
		drawCharges();
		requestAnimationFrame(main);
	};
	requestAnimationFrame(main);