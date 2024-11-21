class Element {
    constructor(x, y, width, height, value) {
        this.x = x;
        this.y = y;
        this.w = width;
        this.h = height;
        this.value = value;
    }

    bgColor = "transparent";

    draw(ctx) {

        ctx.fillStyle = this.bgColor;
        ctx.fillRect(this.x, this.y, this.w, this.h);

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

class BubbleSort {
    startingState = [2, 5, 4, 1, 10, 25, 3, 7, 8, 18];
    events = [];
    interval = null;
    i = 0;

    elements = [
        new Element(2, 2, 100, 100, 2),
        new Element(102, 2, 100, 100, 5),
        new Element(202, 2, 100, 100, 4),
        new Element(302, 2, 100, 100, 1),
        new Element(402, 2, 100, 100, 10),
        new Element(502, 2, 100, 100, 25),
        new Element(602, 2, 100, 100, 3),
        new Element(702, 2, 100, 100, 7),
        new Element(802, 2, 100, 100, 8),
        new Element(902, 2, 100, 100, 18)
    ]

    generateEvents() {
        this.events = [];
        let arr = [];
        for (let i = 0; i < this.startingState.length; i++) {
            arr[i] = this.startingState[i];
        }

        while(true) {
            let cnt = 0;
            for (let i = 0; i < arr.length-1; i++) {
                this.events.push(['compare', i, i+1]);
                if (arr[i] > arr[i+1]) {
                    let tmp = arr[i];
                    arr[i] = arr[i+1];
                    arr[i+1] = tmp;
                    cnt++;
                    this.events.push(['switch', i, i+1]);
                }
            }
            if (cnt === 0) {
                this.events.push(['complete']);
                break;
            }
        }
    }

    playAnimation() {
        if (this.interval !== null) clearInterval(this.interval);

        this.interval = setInterval(() => {this.update()});
    }

    update() {
        let event = this.events[this.i];
        if (event[0] === 'compare') {
            this.elements[event[1]].bgColor = '#cccccc';
            this.elements[event[2]].bgColor = '#cccccc';
            this.draw();
            this.elements[event[1]].bgColor = 'transparent';
            this.elements[event[2]].bgColor = 'transparent';

        } else if (event[0] === 'switch') {
            let tmp = this.elements[event[1]].value;
            this.elements[event[1]].value = this.elements[event[2]].value;
            this.elements[event[2]].value = tmp;

            this.elements[event[1]].bgColor = '#cccccc';
            this.elements[event[2]].bgColor = '#cccccc';
            this.draw();
            this.elements[event[1]].bgColor = 'transparent';
            this.elements[event[2]].bgColor = 'transparent';

        } else if (event[0] === 'complete') {
            for (let element of this.elements) element.bgColor = "#D8F793";
            this.draw();
            clearInterval(this.interval);
            this.interval = null;
        }
        this.i++;
    }

    draw() {
        bubbleSortCtx.fillStyle = "whitesmoke";
        bubbleSortCtx.fillRect(0, 0, 1004, 104);

        for (let element of this.elements) element.draw(bubbleSortCtx);
    }
}

let bubbleSortCanvas = document.getElementById("BubbleSortCanvas");
let bubbleSortCtx = bubbleSortCanvas.getContext('2d', {alpha: false});

let bubbleSort = new BubbleSort();
bubbleSort.generateEvents();
bubbleSort.draw();

function playBubbleSortAnimation() {
    if (bubbleSort.interval !== null) {
        clearInterval(bubbleSort.interval);
    }

    for (let i = 0; i < bubbleSort.elements.length; i++) {
        bubbleSort.elements[i].value = bubbleSort.startingState[i];
        bubbleSort.elements[i].bgColor = 'transparent';
    }
    bubbleSort.i = 0;
    bubbleSort.draw();

    bubbleSort.interval = setInterval(() => {bubbleSort.update()}, 500);
}