const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/////...
//crea y dibuja los objetos
class Symbol{
    constructor(x, y, fontSize, height){
        this.characters ='.   ';//♡
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.text = '';
        this.color = '';
        this.height = height;
    }
    //random caracter y dibujar.
    draw(context){
        this.text = this.characters.charAt(Math.floor(Math.random()*this.characters.length));
        this.color = 'rgb('+(Math.random()*255)+','+(Math.random()*1)+','+(Math.random()*2555)+')';//200150
        //this.color = '#1D8CBC';
        context.fillStyle = this.color;
        context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
        if(this.y * this.fontSize > this.height && Math.random() > 0.98){//cada objeto es una columna
            this.y = 0;            
        }
        else{
            this.y += 1;
        }
    }
}
//efecto de como mostrar todos los objetos.
class Effect{
    constructor(width,height){
        this.width = width;
        this.height = height;
        this.fontSize = 20;
        this.columns = this.width/this.fontSize;
        this.symbols = [];
        this.#init();
        console.log(this.symbols);
    }
    //arreglo de objetos
    #init(){
        for (let i = 0; i < this.columns; i++){
            this.symbols[i] = new Symbol(i, 1, this.fontSize, this.height);//se crea un numero limitado de objetos
        }
    }
}

const effect = new Effect(canvas.width,canvas.height); // ejectuta el metodo init()

//loop
function animate(){
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0,0,canvas.width,canvas.height);//pinta todo el canvas
    ctx.font = effect.fontSize + 'px monospace'; //caracteres que ocupan la mismo valor horizontal
    effect.symbols.forEach(symbol => symbol.draw(ctx));//por cada caracter del array inicializado, dibujar.
    requestAnimationFrame(animate);
}
animate();

//fill efetc. no borra los caracteres anteriores

window.addEventListener('resize',function(){
    this.location.reload();
});