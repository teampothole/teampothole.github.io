var bumps = [];

function drawCanvas(){
    var canvas = document.getElementById('testcanvas1');
    if(canvas.getContext){
        var context = canvas.getContext('2d');
        context.fillStyle = "rgb(255, 0, 255)";
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function drawBump (position, color, offset){
    // position is between 0 and 10

    var color = color || "#000000"    
    var canvas = document.getElementById('testcanvas1');
    var coordinate = (canvas.width / 10) * position;

    if (offset) {
	// console.log("offset", offset);
	coordinate = coordinate + offset;
    }

    if(canvas.getContext){
        var ctx = canvas.getContext('2d');
	ctx.strokeStyle = color;
	ctx.beginPath();
	ctx.moveTo(coordinate, 0);
	ctx.lineTo(coordinate, canvas.height);
	ctx.stroke();	
    }
}

function drawAverage(){
    if ( bumps.length < 5) return;
    
    var sum = 0;
    bumps.forEach(function(value){ sum += value });

    var position = sum/bumps.length;
    console.log("average", sum, position);

    for( var i=-5; i<5;i++) {
	drawBump(position, "#FF0000", i);
    }
}

function drawMessage(message){
    console.log('write message',message);
    var canvas = document.getElementById('testcanvas1');
    var ctx=canvas.getContext("2d");
    
    ctx.font="60px Georgia";
    ctx.fillText(message,100,100);
    
    ctx.font="90px Verdana";
    // Create gradient
    var gradient=ctx.createLinearGradient(0,0,canvas.width,0);
    gradient.addColorStop("1.0","magenta");
    gradient.addColorStop("0.5","blue");
    gradient.addColorStop("0","red");
    // Fill with gradient
    ctx.fillStyle=gradient;
    ctx.fillText(message,100,180);
}

function redrawCanvas(){
    drawCanvas();
    bumps.forEach(function(value){ drawBump(value) });
    drawAverage();
}

function addBump(value){
    bumps.push(value);
    redrawCanvas();
}

function generateBump(){
    var variance = Math.random() - 0.5;
    var value = 7 + variance;

    return value;
}

function notifyBump(message){
    console.log('have a bump', message);
    var position = generateBump();
    addBump(position);
    drawMessage(message);
}

drawCanvas();
// drawMessage("hello world");
// setInterval(notifyBump, 1000);

