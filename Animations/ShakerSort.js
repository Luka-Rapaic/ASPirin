class ShakerSort {
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

        let cnt = 0;
        while(true) {
            cnt = 0;
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
            cnt = 0;
            for (let i = arr.length-2; i >= 0; i--) {
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
        shakerSortCtx.fillStyle = "whitesmoke";
        shakerSortCtx.fillRect(0, 0, 1004, 104);

        for (let element of this.elements) element.draw(shakerSortCtx);
    }
}

let shakerSortCanvas = document.getElementById("ShakerSortCanvas");
let shakerSortCtx = shakerSortCanvas.getContext('2d', {alpha: false});

let shakerSort = new ShakerSort();
shakerSort.generateEvents();
shakerSort.draw();

function playShakerSortAnimation() {
    if (shakerSort.interval !== null) {
        clearInterval(shakerSort.interval);
    }

    for (let i = 0; i < shakerSort.elements.length; i++) {
        shakerSort.elements[i].value = shakerSort.startingState[i];
        shakerSort.elements[i].bgColor = 'transparent';
    }
    shakerSort.i = 0;
    shakerSort.draw();

    shakerSort.interval = setInterval(() => {shakerSort.update()}, 500);
}

