var canvas = document.getElementById("charge-canvas");
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;
var chargeSpeed = 2;
var chargeSize= 5;
var numCharges = 25;
var allPosCharge=[];
var allNegCharge=[];
var magConstant = 20;
var PI = 3.141592;
var maxSpeed = 3;
var maxDist =30;

function initializeCharge() {
    for (var i = 0; i < numCharges; i++) {
        var charge = new Object();
        charge.x = Math.random() * width;
        charge.y = Math.random() * height;
        charge.xSpeed = Math.random() * chargeSpeed;
        charge.ySpeed = Math.random() * chargeSpeed;
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
			if(dist>5&&dist<maxDist){
				allPosCharge[x].xSpeed-=difX/Math.pow(dist,2);
				allPosCharge[x].ySpeed-=difY/Math.pow(dist,2);
				allNegCharge[y].xSpeed+=difX/Math.pow(dist,2);
				allNegCharge[y].ySpeed+=difY/Math.pow(dist,2);
			}
		}
	}
	for (var x = 0; x < allPosCharge.length; x++) {
		if(allPosCharge[x].xSpeed>maxSpeed){
			allPosCharge[x].xSpeed=maxSpeed;
		}
		if(allPosCharge[x].ySpeed>maxSpeed){
			allPosCharge[x].ySpeed=maxSpeed;
		}
		allPosCharge[x].x+=xSpeed;
		allPosCharge[x].y+=ySpeed;
		if (allPosCharge[x].x >= canvas.width||allPosCharge[x].x <= -5) {
            		allPosCharge[x].xSpeed=-allPosCharge[x].xSpeed;
        	}
        	if (allPosCharge[x].y >= canvas.height||allPosCharge[x].y <= -5) {
        		allPosCharge[x].ySpeed = -allPosCharge[x].ySpeed;
		}
	}
	for (var x = 0; x < allNegCharge.length; x++) {
		if(allNegCharge[x].xSpeed>maxSpeed){
			allNegCharge[x].xSpeed=maxSpeed;
		}
		if(allNegCharge[x].ySpeed>maxSpeed){
			allNegCharge[x].ySpeed=maxSpeed;
		}
		allNegCharge[x].x+=xSpeed;
		allNegCharge[x].y+=ySpeed;
		if (allNegCharge[x].x >= canvas.width||allNegCharge[x].x <= -5) {
            		allNegCharge[x].xSpeed=-allNegCharge[x].xSpeed;
        	}
        	if (allNegCharge[x].y >= canvas.height||allNegCharge[x].y <= -5) {
        		allNegCharge[x].ySpeed = -allNegCharge[x].ySpeed;
		}
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
