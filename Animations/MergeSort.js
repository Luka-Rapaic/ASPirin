class MergeSort {
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
    arr = [];
    tmpInterval = null;

    generateEvents(low, high, arr = null, fastTrack = false, firstCall = true) {
        if (firstCall) {
            this.events = [];
            arr = [];
            for (let i = 0; i < this.startingState.length; i++) {
                arr[i] = this.startingState[i];
            }
        }

        if (low < high-1) {
            let mid = Math.floor((low + high) / 2);

            if (!fastTrack) this.events.push(['split', low, mid, high]);
            this.generateEvents(low, mid, arr, fastTrack, false);
            this.generateEvents(mid, high, arr, true, false);

            let n1 = mid - low;
            let n2 = high - mid;

            let tmp1 = [];
            for (let i = 0; i < n1; i++) tmp1.push(arr[i+low]);

            let tmp2 = [];
            for (let i = 0; i < n2; i++) tmp2.push(arr[i+mid]);

            if (!fastTrack) this.events.push(['fadeIn', tmp2, tmp1.length]);

            let i = 0, j = 0;
            while (i < n1 && j < n2) {
                // if (!fastTrack) this.events.push(['compare', i, j]);
                if (tmp1[i] <= tmp2[j]) {
                    if (!fastTrack) this.events.push(['copyLeft', low, i, j]);
                    arr[low++] = tmp1[i++];
                } else {
                    if (!fastTrack) this.events.push(['copyRight', low, i, j]);
                    arr[low++] = tmp2[j++];
                }
            }

            while (i < n1) {
                if (!fastTrack) this.events.push(['appendLeft', low, i]);
                arr[low++] = tmp1[i++];
            }
            while (j < n2) {
                if (!fastTrack) this.events.push(['appendRight', low, j]);
                arr[low++] = tmp2[j++];
            }

            if (!fastTrack) this.events.push(['functionEnd']);
        }

        if (firstCall) {
            this.events.push(['completed']);
        }
    }



    update() {
        let event = this.events[this.i];
        if (event[0] === 'split') {
            this.split(event[1], event[2], event[3]);
        } else if (event[0] === 'fadeIn') {
            this.fadeIn(event[1], event[2]);
        } else if (event[0] === 'compare') {
            this.compare(event[1], event[2]);
        } else if (event[0] === 'copyLeft') {
            this.copyLeft(event[1], event[2], event[3]);
        } else if (event[0] === 'copyRight') {
            this.copyRight(event[1], event[2], event[3]);
        } else if (event[0] === 'appendLeft') {
            this.appendLeft(event[1], event[2]);
        } else if (event[0] === 'appendRight') {
            this.appendRight(event[1], event[2]);
        } else if (event[0] === 'functionEnd') {
            this.functionEnd();
        } else if (event[0] === 'completed') {
            this.completed();
        }
        this.i++;
    }

    split(low, mid, high) {
        let animation = this;
        let iteration = 0;

        this.tmpInterval = setInterval(() => {
            if (iteration === 20) {
                clearInterval(animation.tmpInterval);
                animation.tmpInterval = null;

                animation.elements.splice(mid, Infinity);
                return;
            }

            if (iteration < 10) for (let i = mid; i < high; i++) animation.elements[i].x += 5;
            else for (let i = mid; i < high; i++) animation.elements[i].y -= 11;

            animation.draw();

            iteration++;
        }, 20);
    }

    fadeIn(tmp2, tmp1len) {
        this.tmp = [];

        for (let i = 0; i < tmp2.length; i++) {
            this.tmp.push(new Element(52 + (tmp1len + i) * 100, -108, 100, 100, tmp2[i]));
        }

        this.arr = [];

        for (let i = 0; i < tmp2.length + tmp1len; i++) {
            this.arr.push(new Element(2 + i * 100, 222, 100, 100, ''));
        }

        let animation = this;
        let iteration = 0;

        this.tmpInterval = setInterval(() => {
            if (iteration === 20) {
                clearInterval(animation.tmpInterval);
                animation.tmpInterval = null;
                return;
            }

            for (let element of animation.tmp) element.y += 5.5;
            for (let element of animation.arr) element.y -= 5.5;
            animation.draw();

            iteration++;
        }, 20);
    }

    compare(i, j) {
        this.elements[i].bgColor = '#cccccc';
        this.tmp[j].bgColor = '#cccccc';

        this.draw();

        this.elements[i].bgColor = 'transparent';
        this.tmp[j].bgColor = 'transparent';
    }

    copyLeft(low, i, j) {
        this.elements[i].bgColor = '#cccccc';
        this.tmp[j].bgColor = '#cccccc';
        // this.arr[low].bgColor = '#cccccc';
        this.arr[low].value = this.elements[i].value;

        this.draw();

        this.elements[i].bgColor = 'transparent';
        this.tmp[j].bgColor = 'transparent';
        // this.arr[low].bgColor = 'transparent';
    }

    copyRight(low, i, j) {
        this.elements[i].bgColor = '#cccccc';
        this.tmp[j].bgColor = '#cccccc';
        // this.arr[low].bgColor = '#cccccc';
        this.arr[low].value = this.tmp[j].value;

        this.draw();

        this.elements[i].bgColor = 'transparent';
        this.tmp[j].bgColor = 'transparent';
        // this.arr[low].bgColor = 'transparent';
    }

    appendLeft(low, i) {
        this.elements[i].bgColor = '#cccccc';
        // this.arr[low].bgColor = '#cccccc';
        this.arr[low].value = this.elements[i].value;

        this.draw();

        this.elements[i].bgColor = 'transparent';
        // this.arr[low].bgColor = 'transparent';
    }

    appendRight(low, j) {
        this.tmp[j].bgColor = '#cccccc';
        // this.arr[low].bgColor = '#cccccc';
        this.arr[low].value = this.tmp[j].value;

        this.draw();

        this.tmp[j].bgColor = 'transparent';
        // this.arr[low].bgColor = 'transparent';
    }

    functionEnd() {
        let animation = this;
        let iteration = 0;

        this.tmpInterval = setInterval(() => {
            if (iteration === 20) {
                clearInterval(animation.tmpInterval);
                animation.tmpInterval = null;

                animation.elements = animation.arr;

                return;
            }

            for (let element of animation.elements) {
                element.y -= 5.5;
            }
            for (let element of animation.tmp) {
                element.y -= 5.5;
            }
            for (let element of animation.arr) {
                element.y -= 5.5;
            }
            animation.draw();

            //TODO fix timings!

            iteration++;
        }, 20);
    }

    completed() {
        clearInterval(this.interval);
        this.interval = null;

        for (let element of this.elements) {
            element.bgColor = '#D8F793';
        }
        this.draw();
    }

    draw() {
        mergeSortCtx.fillStyle = "whitesmoke";
        mergeSortCtx.fillRect(0, 0, 1054, 214);

        for (let element of this.elements) element.draw(mergeSortCtx);
        for (let element of this.tmp) element.draw(mergeSortCtx);
        for (let element of this.arr) element.draw(mergeSortCtx);
    }
}

let mergeSortCanvas = document.getElementById("MergeSortCanvas");
let mergeSortCtx = mergeSortCanvas.getContext('2d', {alpha: false});

let mergeSort = new MergeSort();
mergeSort.generateEvents(0, mergeSort.elements.length);

mergeSort.draw();

function playMergeSortAnimation() {
    if (mergeSort.interval !== null) {
        clearInterval(mergeSort.interval);
        mergeSort.interval = null;
    }
    if (mergeSort.tmpInterval !== null) {
        clearInterval(mergeSort.tmpInterval);
        mergeSort.tmpInterval = null;
    }

    mergeSort.elements = [];
    for (let i = 0; i < mergeSort.startingState.length; i++) {
        mergeSort.elements.push(new Element(2 + i * 100, 2, 100, 100, mergeSort.startingState[i]));
    }

    mergeSort.tmp = [];
    mergeSort.arr = [];

    mergeSort.i = 0;
    mergeSort.draw();

    mergeSort.interval = setInterval(() => {mergeSort.update()}, 500);
}

