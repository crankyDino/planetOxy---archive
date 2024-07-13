export function rain(): void {
    // Initializing the canvas
    let canvas: HTMLCanvasElement = document.querySelector('#matrix__rain');
    let ctx = canvas.getContext('2d');

    // Setting the width and height of the canvas
    canvas.width = window.innerWidth;
    canvas.height = document.querySelector("body").clientHeight;

    // Setting up the letters
    let letters: string = 'ABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDYJHTFJHFGHIJKLMNOPQRSTUVXYZAB4675376584597^()*&^$^#&^%$*^&(%^&#^$#%%*&^(*&%&764547860896-=-=\][]]]\[./,..21027*//02651CDEFGHIJKLMNOPQRSTUVXYZ';
    let lettersArr: Array<string> = letters.split('');

    // Setting up the columns
    var fontSize = 10,
        columns = canvas.width / fontSize;

    // Setting up the drops
    let drops: Array<any> = [];
    for (var i = 0; i < columns; i++) {
        drops[i] = 1;
    }

    // Setting up the draw function
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, .1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (var i = 0; i < drops.length; i++) {
            var text = lettersArr[Math.floor(Math.random() * lettersArr.length)];
            ctx.fillStyle = '#0f0';
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            drops[i]++;
            if (drops[i] * fontSize > canvas.height && Math.random() > .999) {
                drops[i] = 0;
            }
        }
    }
    // Loop the animation
    loop(draw)
}


/**
 * that cool effect on the dialog background
 * matrix shit bay-bay
 */
export function blockHoverEffect(): void {
    const blocks = Array.from(document.querySelectorAll(".bg__grid")) as Array<HTMLDivElement>
    blocks.forEach(blok => {
        blok.addEventListener("mouseenter", () => {
            blok.style.backgroundColor = 'green'
        })
        blok.addEventListener("mouseleave", () => {
            blok.style.backgroundColor = 'transparent'
        })
    });
}



let looper: number
function loop(func: Function, duration: number = 33) {
    looper = setInterval(func, duration);
}

export function freeze(): void {
    clearInterval(looper)
}