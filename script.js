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
    
/*    ctx.font="60px Verdana";
    ctx.fillText("Hallo",100,100);

    ctx.font="60px Verdana";
    ctx.fillText("Du",100,0);

    ctx.font="60px Verdana";
    ctx.fillText(message,0,100);*/
    
    ctx.font="60px Verdana";
    // Create gradient
    var gradient=ctx.createLinearGradient(0,0,canvas.width,0);
    gradient.addColorStop("1.0","magenta");
    gradient.addColorStop("0.5","blue");
    gradient.addColorStop("0","red");
    // Fill with gradient
    ctx.fillStyle=gradient;
    var parts = message.split("\n")
    var height = 100;
    
    parts.forEach(function(message){
	var mtrx = ctx.measureText(message);
	console.log(mtrx.width);
	ctx.fillText(message,500-mtrx.width, height);
	height = height + 80;
    });    
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

function precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
}

function formatTimestamp(value){
    // var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(value).toLocaleString("en-US");
}

function addLog(text) {
    var ul = document.getElementById("timestamps");
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.appendChild(document.createTextNode(text));
    li.appendChild(a);
    ul.insertBefore(li, ul.childNodes[0]);
    // ul.appendChild(li);
}

function addTimestamp(value) {
    addLog(formatTimestamp(value));
}

function notifyBump(timestamp){
    console.log('have a bump', timestamp);
    var position = generateBump();
    addBump(position);
    drawMessage("KM " + precisionRound(position, 4)+"");
    addTimestamp(timestamp);
}

function notifyNextRoot(root){
    addLog(root);
}

drawCanvas();
// drawMessage("hello world");
// setInterval(notifyBump, 1000);

