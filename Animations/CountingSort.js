class CountingSort {
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

    tmp = [];
    tmpInterval = null;

    generateEvents() {
        this.events = [];
        let arr = [];

        for (let i = 0; i < this.startingState.length; i++) {
            arr[i] = this.startingState[i];
        }

        let min = arr[0], max = arr[0];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] < min) min = arr[i];
            else if (arr[i] > max) max = arr[i];
        }

        let n = max - min + 1;
        let tmp = [];
        for (let i = 0; i < n; i++) tmp.push(0);
        this.events.push(['fadeIn', n]);

        for (let i = 0; i < arr.length; i++) {
            this.events.push(['count', i, arr[i]-min]);
            tmp[arr[i]-min]++;
        }

        let i = 0, j = 0;

        while (i < n) {
            while (tmp[i] === 0) {
                this.events.push(['iterate', i, j]);
                i++;
            }
            while (tmp[i] !== 0) {
                this.events.push(['insert', i, j, min + i]);
                arr[j++] = min + i;
                tmp[i]--;
            }
            i++;
        }

        this.events.push(['completed']);
    }

    update() {
        let event = this.events[this.i];
        if (event[0] === 'fadeIn') {
            this.fadeIn(event[1], event[2]);
        } else if (event[0] === 'count') {
            this.count(event[1], event[2]);
        } else if (event[0] === 'iterate') {
            this.iterate(event[1], event[2]);
        } else if (event[0] === 'insert') {
            this.insert(event[1], event[2], event[3]);
        } else if (event[0] === 'completed') {
            this.completed();
        }
        this.i++;
    }

    fadeIn(n) {
        this.tmp = [];
        let size = 1000/n;
        let font = `${50 * size/100}px Arial`

        for (let i = 0; i < n; i++) {
            this.tmp.push(new Element(2 + i*size, 222, size, size, 0));
            this.tmp[i].font = font;
        }

        let animation = this;
        let iteration = 0;

        this.tmpInterval = setInterval(() => {
            if (iteration === 20) {
                clearInterval(animation.tmpInterval);
                animation.tmpInterval = null;
                return;
            }

            for (let element of animation.tmp) element.y -= 5.5;
            animation.draw();

            iteration++;
        }, 20);
    }

    count(i, j) {
        this.elements[i].bgColor = '#cccccc';
        this.tmp[j].bgColor = '#cccccc';
        this.tmp[j].value++;

        this.draw();

        this.elements[i].bgColor = 'transparent';
        this.tmp[j].bgColor = 'transparent';
    }

    iterate(i, j) {
        this.tmp[i].bgColor = '#cccccc';
        this.elements[j].bgColor = '#cccccc';

        this.draw();

        this.tmp[i].bgColor = 'transparent';
        this.elements[j].bgColor = 'transparent';
    }

    insert(i, j, value) {
        this.tmp[i].bgColor = '#cccccc';
        this.tmp[i].value--;
        this.elements[j].bgColor = '#cccccc';
        this.elements[j].value = value;

        this.draw();

        this.tmp[i].bgColor = 'transparent';
        this.elements[j].bgColor = 'transparent';
    }

    completed() {
        clearInterval(this.interval);
        this.interval = null;

        let animation = this;
        let iteration = 0;

        this.tmpInterval = setInterval(() => {
            if (iteration === 20) {
                clearInterval(animation.tmpInterval);
                animation.tmpInterval = null;

                for (let element of this.elements) {
                    element.bgColor = '#D8F793';
                }
                this.draw();

                return;
            }

            for (let element of animation.tmp) element.y += 5.5;
            animation.draw();

            iteration++;
        }, 20);
    }

    draw() {
        countingSortCtx.fillStyle = "whitesmoke";
        countingSortCtx.fillRect(0, 0, 1054, 214);

        for (let element of this.elements) element.draw(countingSortCtx);
        for (let element of this.tmp) element.draw(countingSortCtx);
    }
}

let countingSortCanvas = document.getElementById("CountingSortCanvas");
let countingSortCtx = countingSortCanvas.getContext('2d', {alpha: false});

let countingSort = new CountingSort();
countingSort.generateEvents(0, countingSort.elements.length);

countingSort.draw();

function playCountingSortAnimation() {
    if (countingSort.interval !== null) {
        clearInterval(countingSort.interval);
        countingSort.interval = null;
    }
    if (countingSort.tmpInterval !== null) {
        clearInterval(countingSort.tmpInterval);
        countingSort.tmpInterval = null;
    }
    
    for (let i = 0; i < countingSort.startingState.length; i++) {
        countingSort.elements[i].value = countingSort.startingState[i];
        countingSort.elements[i].bgColor = 'transparent';
    }

    countingSort.tmp = [];

    countingSort.i = 0;
    countingSort.draw();

    countingSort.interval = setInterval(() => {countingSort.update()}, 500);
}

