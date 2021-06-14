let canvas = document.getElementById("snake"); /* canvas = elementos gráficos */
let context = canvas.getContext("2d"); /*context renderiza o que está no canvas */
let box = 32; /*box com 32 quadradrinhos (boxes) */
let snake = [];
snake[0] = {
    x: 8 * box, /*vai ficar na posição 8, 8 */
    y: 8 * box
}
let direction = "right;"
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box, /* o Math.random retorna sempre um n. aleatorio (da parte que a gente citou que é até 16) até 1*/
    y: Math.floor(Math.random() * 15 + 1) * box /* o Math.floor retira a parte flutuante do Math.random */
}



function criarBG() {
    context.fillStyle = "rgb(12, 6, 6)";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha(){
    for(i=0; i < snake.length; i++){
        context.fillStyle = "white";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update (event) {
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarJogo(){ 

    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0; /**quando ela chegar na posição 0, ela voltar pra posição 15 */
    if(snake[0].x < 0 && direction == "left") snake[0].x = 15 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 15 * box;

    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Game Over =( ');
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box; /* += é acresentar, -= é retirar */

    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }else {
       food.x = Math.floor(Math.random() * 15 + 1) * box; /* (qdo a snack come a fruta) o x e o y vão de novo receber posição aleatorio (da parte que a gente citou que é até 16) até 1*/
       food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

  
    let newHead = {
        x: snakeX,
        y: snakeY
    }
    
    snake.unshift(newHead); /* unshift acrescenta elementos no array */
}

let jogo = setInterval(iniciarJogo, 100); /*função de tempo - intervalo pra cobrinha mexer */
