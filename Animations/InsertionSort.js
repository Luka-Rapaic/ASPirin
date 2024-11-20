class InsertionSort {
    startingState = [2, 5, 4, 1, 10, 25, 3, 7, 8, 18];
    events = [];
    interval = null;
    i = 0;

    elements = [
        new Element(2, 120, 100, 100, 2),
        new Element(102, 120, 100, 100, 5),
        new Element(202, 120, 100, 100, 4),
        new Element(302, 120, 100, 100, 1),
        new Element(402, 120, 100, 100, 10),
        new Element(502, 120, 100, 100, 25),
        new Element(602, 120, 100, 100, 3),
        new Element(702, 120, 100, 100, 7),
        new Element(802, 120, 100, 100, 8),
        new Element(902, 120, 100, 100, 18)
    ]

    key = new Element(2, 10, 100, 100, '');

    generateEvents() {
        this.events = [];
        let arr = [];
        for (let i = 0; i < this.startingState.length; i++) {
            arr[i] = this.startingState[i];
        }

        for (let i = 1; i < arr.length; i++) {
            let key = arr[i];
            let j = i - 1;

            this.events.push(['newKey', key, i]);

            for (; j >= 0 && arr[j] > key; j--) {
                this.events.push(['compare', j]);

                arr[j+1] = arr[j];
                this.events.push(['move', j]);
            }
            arr[j+1] = key;
            this.events.push(['insert', j+1]);
        }
        this.events.push(['complete']);
    }

    update() {
        let event = this.events[this.i];
        if (event[0] === 'newKey') {
            this.key.bgColor = '#cccccc';
            this.elements[event[2]].bgColor = '#cccccc';

            this.key.value = event[1];
            this.draw();

            this.key.bgColor = 'transparent';
            this.elements[event[2]].bgColor = 'transparent';
        } else if (event[0] === 'compare') {
            this.key.bgColor = '#cccccc';
            this.elements[event[1]].bgColor = '#cccccc';

            this.draw();

            this.key.bgColor = 'transparent';
            this.elements[event[1]].bgColor = '#D8F793';

        } else if (event[0] === 'move') {
            this.elements[event[1] + 1].bgColor = '#D8F793';
            this.elements[event[1]].bgColor = 'transparent';

            this.elements[event[1] + 1].value = this.elements[event[1]].value;
            this.draw();

        } else if (event[0] === 'insert') {
            this.elements[event[1]].bgColor = '#D8F793';

            this.elements[event[1]].value = this.key.value;

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
        insertionSortCtx.fillRect(0, 0, 1004, 230);

        this.key.draw(insertionSortCtx);
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
    if (insertionSort.elements.length >= 1) {
        insertionSort.elements[0].bgColor = '#D8F793';
    }
    insertionSort.key.value = '';
    insertionSort.key.bgColor = 'transparent';

    insertionSort.i = 0;
    insertionSort.draw();

    insertionSort.interval = setInterval(() => {insertionSort.update()}, 500);
}

