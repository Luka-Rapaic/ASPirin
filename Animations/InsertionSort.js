class InsertionSort {
    startingState = [2, 5, 4, 1, 10, 25, 3, 7, 8, 18];
    events = [];
    interval = null;
    i = 0;

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

    generateEvents() {
        this.events = [];
        let arr = [];
        for (let i = 0; i < this.startingState.length; i++) {
            arr[i] = this.startingState[i];
        }

        for (let i = 1; i < arr.length; i++) {
            let key = arr[i];
            let j = i - 1;
            this.events.push(['compare', key, j]);
            for (; j >= 0 && arr[j] > key; j--) {
                arr[j+1] = arr[j];
                this.events.push(['switch', j, j+1]);
            }
            arr[j+1] = key;
            this.events.push(['insert', key, j+1]);
        }
        this.events.push(['complete']);
    }

    update() {
        let event = this.events[this.i];
        if (event[0] === 'compare') {
            this.elements[event[2]].bgColor = '#cccccc';
            this.draw();
            this.elements[event[2]].bgColor = 'transparent';

        } else if (event[0] === 'switch') {
            let tmp = this.elements[event[1]].value;
            this.elements[event[1]].value = this.elements[event[2]].value;
            this.elements[event[2]].value = tmp;
            this.draw();

        } else if (event[0] === 'insert') {
            this.elements[event[2]].value = event[1];

            this.elements[event[2]].bgColor = '#cccccc';
            this.draw();

        } else if (event[0] === 'complete') {
            for (let element of this.elements) element.bgColor = "#D8F793";
            this.draw();
            clearInterval(this.interval);
            this.interval = null;
        }
        this.i++;
    }

    draw() {
        insertionSortCtx.fillStyle = "whitesmoke";
        insertionSortCtx.fillRect(0, 0, 1004, 120);

        for (let element of this.elements) element.draw(insertionSortCtx);
    }
}

let insertionSortCanvas = document.getElementById("InsertionSortCanvas");
let insertionSortCtx = insertionSortCanvas.getContext('2d', {alpha: false});

let insertionSort = new InsertionSort();
insertionSort.generateEvents();
insertionSort.draw();

function playInsertionSortAnimation() {
    if (insertionSort.interval !== null) {
        clearInterval(insertionSort.interval);
    }

    for (let i = 0; i < insertionSort.elements.length; i++) {
        insertionSort.elements[i].value = insertionSort.startingState[i];
        insertionSort.elements[i].bgColor = 'transparent';
    }
    insertionSort.i = 0;
    insertionSort.draw();

    insertionSort.interval = setInterval(() => {insertionSort.update()}, 500);
}

