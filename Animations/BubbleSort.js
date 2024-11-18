class Element {
    constructor(x, y, width, height, value) {
        this.x = x;
        this.y = y;
        this.w = width;
        this.h = height;
        this.value = value;
    }

    current = false;
    swapped = false;
    complete = false;

    clearAttributes() {
        this.current = false;
        this.complete = false;
    }
    draw() {
        if (this.current) {
            ctx.fillStyle = "#cccccc";
            ctx.fillRect(this.x, this.y, this.w, this.h);
        } else if (this.complete) {
            ctx.fillStyle = "#D8F793";
            ctx.fillRect(this.x, this.y, this.w, this.h);
        }

        ctx.lineWidth = "4";
        ctx.fillStyle = "#000000";

        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.stroke();

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "40px Arial";

        ctx.fillText(this.value, this.x + this.w/2, this.y + this.h/2, this.w);
    }
}

class Animation {
    constructor() {
        this.elements[this.i].current = true;
        this.elements[this.i+1].current = true;
        console.log(this.elements);
        this.draw();
    }

    startingState = [2, 5, 4, 1, 10, 25, 3, 7, 8, 18];

    elements = [
        new Element(2, 10, 100, 100, 2),
        new Element(102, 10, 100, 100, 5),
        new Element(202, 10, 100, 100, 4),
        new Element(302, 10, 100, 100, 1),
        new Element(402, 10, 100, 100, 10),
        new Element(502, 10, 100, 100, 25),
        new Element(602, 10, 100, 100, 3),
        new Element(702, 10, 100, 100, 7),
        new Element(802, 10, 100, 100, 8),
        new Element(902, 10, 100, 100, 18)
    ]

    i = 0;
    cnt = 0;
    n = 10;
    interval = null;

    update() {
        if (this.elements[this.i+1].value < this.elements[this.i].value) {
            let element = this.elements[this.i].value;
            this.elements[this.i].value = this.elements[this.i+1].value;
            this.elements[this.i+1].value = element;

            this.cnt++;
            this.draw();
            return;
        }

        this.elements[this.i].clearAttributes();
        this.elements[this.i+1].clearAttributes();
        this.i++;

        if (this.i >= this.n-1) {
            if (this.cnt == 0) {
                for (let element of this.elements) {
                    element.complete = true;
                }
                clearInterval(this.interval);
                this.interval = null;
                this.draw();
                return;
            }
            this.cnt = 0;
            this.i = 0;
        }

        this.elements[this.i].current = true;
        this.elements[this.i+1].current = true;

        this.draw();
    }

    draw() {
        ctx.fillStyle = "whitesmoke";
        ctx.fillRect(0, 0, 1004, 120);

        // ctx.fillStyle = "#000000";
        // ctx.textAlign = "left";
        // ctx.textBaseline = "middle";
        // ctx.font = "25px Arial";
        //
        // ctx.fillText(`cnt = ${this.cnt}`, 100, 25, 200);
        // ctx.fillText(`i = ${this.i}`, 100, 55, 200);

        // ctx.textAlign = "center";
        // ctx.fillText(`${this.elements[this.i+1].value} < ${this.elements[this.i].value}`, 400, 25, 200);

        for (let element of this.elements) element.draw();
    }

    start() {
        if (this.interval != null) clearInterval(this.interval);

        this.i = 0;
        this.cnt = 0;

        for (let i = 0; i < this.n; i++) {
            this.elements[i].value = this.startingState[i];
            this.elements[i].clearAttributes();
        }

        this.elements[0].current = true;
        this.elements[1].current = true;
        this.draw()

        this.interval = setInterval(() => {animation.update()}, 500);
    }
}

let canvas = document.getElementById("BubbleSortCanvas");
let ctx = canvas.getContext('2d', {alpha: false});

let animation = new Animation();

function BubbleSortAnimationStart() {animation.start()}