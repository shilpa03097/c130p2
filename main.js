quick_draw_data_set = ["aircraft carrier","airplane", "alarm clock", "ambulance", "angel", "animal migration", "ant", "anvil", "apple", "arm","backpack", "bandage", "baseball","baseball bat", "bat", "bathtub", "beach", "bed","belt", "bench","bicycle","binoculars","bird","birthday cake","blackberry","bleberry","book","boomerang", "bottle cap","bracelt","brain","bread","bridge","broccoli","broom","bucket","bulldozer","bus", "butterfly","cactus","calculator","camera","campfire","candle","cannon","car","carrot","carrot","castle","cat","ceiling fan","cellon","cellpone","chair","church","circle","clock","cloud","coffe cup","compass","computer","cookie","cooler","couch","cow","crow"];
random_number = Math.floor((Math.random()*quick_draw_data_set.length)+1);
console.log(quick_draw_data_set[random_number]);
 sketch=quick_draw_data_set[random_number];
 document.getElementById('sketch_name').innerHTML='sketch_to_be_drawn'+sketch;
 
timer_counter=0;
timer_check="";
drawn_sketch="";
score=0;
answer_holder="";

function preload(){
classifier=ml5.imageClassifier('DoodleNet');
}

function setup(){
    canvas = createCanvas(280,280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
}

function updateCanvas(){
    background("white");
    random_number = Math.floor((Math.random()*quick_draw_data_set.length)+1);
    console.log(random_number);
    console.log(quick_draw_data_set[random_number]);
    document.getElementById("sketch_name").innnerHTML='sketch to be drawn' + sketch;
}

function draw(){
    strokeWeight(13);
    stroke(0);
if (mouseIsPressed){
    line(pmouseX, pmouseY, mouseX, mouseY);
    }
    check_sketch();
    if(drawn_sketch==sketch){
        answer_holder="set";
        score++;
        document.getElementById('score').innerHTML='score: '+score;
    }
}

function classifyCanvas(){
    classifier.classify(canvas, gotResult);
}

function gotResult(error,results){
    if (error){
        console.error(error);
    }
    console.log(results);
    drawn_sketch=results[0].label;
    document.getElementById('label').innerHTML = 'Label:' +drawn_sketch;

    document.getElementById('confidence').innerHTML='Confidence:' +Math.round(results[0].confidence*100)+ '%';
}
function check_sketch(){
   timer_counter++;
document.getElementById('time').innerHTML='timer'+timer_counter;
   console.log(timer_counter);
   if (timer_counter>400 ){
    timer_counter=0;
    timer_check="completed!";
   }
   if (timer_check=="completed!"||answer_holder=="set"){
    timer_check="";
    answer_holder="";
    updateCanvas();
   }
}

function clearCanvas(){
    background("white");
}