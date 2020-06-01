const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shakeButton = document.querySelector('.shake');
const MOVE_AMOUNT = 10;

//set up canvas for drawing

const {width, height} = canvas; 

//Create a random point for the dot to appear

let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);


ctx.linejoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = MOVE_AMOUNT;
let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
ctx.beginPath();
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// Draw Function

function draw({ key }) {

    //change hue for color variation

    hue += 1;
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    ctx.moveTo(x, y);
    switch (key) {
        case 'ArrowUp':
        y -= MOVE_AMOUNT;
        break;
    
        case 'ArrowDown':
        y += MOVE_AMOUNT;
        break;
    
        case 'ArrowRight':
        x += MOVE_AMOUNT;
        break;
        
        case 'ArrowLeft':
        x -= MOVE_AMOUNT;
        break;

        default:
        break;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
    
}


//Handler

function handleKey(e){
    if (e.key.includes('Arrow')) {
        e.preventDefault();
        draw({ key: e.key });
    }
}

//Clear canvas (shake) function

function clearCanvas() {
    canvas.classList.add('shake');
    ctx.clearRect(0, 0, width, height);

    canvas.addEventListener(
        'animationend', 
        function() {
        canvas.classList.remove('shake');
    }, 
    { once: true } 
    );
}

//listen for arrow keys

window.addEventListener('keydown', handleKey);
shakeButton.addEventListener('click', clearCanvas);
