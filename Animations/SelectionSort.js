class SelectionSort {
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

        for (let i = 0; i < arr.length-1; i++) {
            let minIndex = i;
            for (let j = i+1; j < arr.length; j++) {
                this.events.push(['compare', minIndex, j]);
                if (arr[j] < arr[minIndex]) {
                    this.events.push(['updateMin', minIndex, j]);
                    minIndex = j;
                }
            }

            this.events.push(['switch', minIndex, i]);
            let tmp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = tmp;
            this.events.push(['sorted', i]);
        }
        this.events.push(['complete']);
    }

    update() {
        let event = this.events[this.i];
        if (event[0] === 'compare') {
            this.elements[event[1]].bgColor = '#aaaaaa';
            this.elements[event[2]].bgColor = '#cccccc';
            this.draw();
            this.elements[event[1]].bgColor = 'transparent';
            this.elements[event[2]].bgColor = 'transparent';

        } else if (event[0] === 'updateMin') {
            this.elements[event[2]].bgColor = '#aaaaaa';
            this.draw();
            this.elements[event[2]].bgColor = 'transparent';

        } else if (event[0] === 'switch') {
            let tmp = this.elements[event[1]].value;
            this.elements[event[1]].value = this.elements[event[2]].value;
            this.elements[event[2]].value = tmp;

            // this.elements[event[1]].bgColor = '#aaaaaa';
            this.elements[event[2]].bgColor = '#D8F793';
            this.draw();
            // this.elements[event[1]].bgColor = 'transparent';
            this.elements[event[2]].bgColor = 'transparent';

        } else if (event[0] === 'sorted') {
            this.elements[event[1]].bgColor = '#D8F793';

        } else if (event[0] === 'complete') {
            for (let element of this.elements) element.bgColor = "#D8F793";
            this.draw();
            clearInterval(this.interval);
            this.interval = null;
        }
        this.i++;
    }

    draw() {
        selectionSortCtx.fillStyle = "whitesmoke";
        selectionSortCtx.fillRect(0, 0, 1004, 120);

        for (let element of this.elements) element.draw(selectionSortCtx);
    }
}

let selectionSortCanvas = document.getElementById("SelectionSortCanvas");
let selectionSortCtx = selectionSortCanvas.getContext('2d', {alpha: false});

let selectionSort = new SelectionSort();
selectionSort.generateEvents();
selectionSort.draw();

function playSelectionSortAnimation() {
    if (selectionSort.interval !== null) {
        clearInterval(selectionSort.interval);
    }

    for (let i = 0; i < selectionSort.elements.length; i++) {
        selectionSort.elements[i].value = selectionSort.startingState[i];
        selectionSort.elements[i].bgColor = 'transparent';
    }
    selectionSort.i = 0;
    selectionSort.draw();

    selectionSort.interval = setInterval(() => {selectionSort.update()}, 500);
}

