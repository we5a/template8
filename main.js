
const container = document.getElementById('container');

class Timer {

    constructor(timeString, updateInterval = 1, autoStart = false) {
        this.timeString = timeString;
        this.autoStart = autoStart;
        this.updateInterval = updateInterval * 1000;

        const parsedDate = (this.timeString).split(':');

        this.msDate = (parseInt(parsedDate[0] * 60) + parseInt(parsedDate[1])) * 1000;
        this.initialDate = new Date(this.msDate);
        this.countObject = Object.assign(this.initialDate);

        this.render();
    }

    createCountDown() {
        this.countDown = document.createElement('span');
        this.countDown.classList.add('count-down');
        const { hours, min, sec } = this.parseDateObj(this.countObject);
        this.countDown.innerHTML = `${hours}:${min}:${sec}`;

        return this.countDown;
    }

    static pad(num, size) {
        var s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
    }

    parseDateObj(dateObj) {
        const date = {};

        date.hours = Timer.pad((this.countObject.getHours() - 3), 2);
        date.min = Timer.pad(this.countObject.getMinutes(), 2);
        date.sec = Timer.pad(this.countObject.getSeconds(), 2);

        return date;
    }

    createAutoSign() {
        this.sign = document.createElement('div');
        this.sign.innerHTML = "auto";
        this.sign.classList.add('auto-sign');

        return this.sign;
    }

    createOutSign() {
        this.out = document.createElement('div');
        this.out.innerHTML = "Timer Out";
        this.out.classList.add('out-sign');

        return this.out;
    }

    createButton() {
        this.button = document.createElement('button');
        this.button.id = 'mainButton';
        this.button.innerHTML = 'Start';
        this.button.addEventListener('click', this.rushTimer.bind(this));

        if (this.autoStart) {
            this.button.dispatchEvent(new Event('click'));
            this.sign = this.createAutoSign();
            this.timer.append(this.sign);
        };

        return this.button;
    }

    rushTimer() {
        if (this.button.innerHTML === 'Start') {
            this.button.innerHTML = 'Stop';
            this.timeChanging();

        } else {
            this.button.innerHTML = 'Start';
            clearInterval(this.interval);
        }
    }

    timeChanging() {
        this.interval = setInterval(() => {
            this.countObject = new Date(this.countObject.valueOf() - this.updateInterval);
            let date = this.parseDateObj(this.countObject);
            const percent = (this.countObject.valueOf() / this.msDate).toFixed(6);

             this.bar.style.width = 100 * percent + '%';

            if (this.countObject.valueOf() < 0) {
                clearInterval(this.interval);
                this.countDown.innerHTML = `${date.hours}:${date.min}:${date.sec}`;
                this.button.innerHTML = "Start";
                this.countObject = Object.assign(this.initialDate);

                date = this.parseDateObj(this.countObject);
                this.countDown.innerHTML = `${date.hours}:${date.min}:${date.sec}`;

                if (this.sign) this.sign.remove();
              
                this.bar.style.width = 100 + '%';
                this.out = this.createOutSign();
                this.timer.append(this.out);

                setTimeout(() => {
                    this.out.remove();
                }, 5000);
            };
            this.countDown.innerHTML = `${date.hours}:${date.min}:${date.sec}`;
        }, this.updateInterval);
    }

    createBar() {
        this.bar = document.createElement('div');
        this.bar.classList.add('bar');

        return this.bar;
    }

    render() {
        this.timer = document.createElement("div");
        this.timer.classList.add('timer-block');
        this.timer.append(this.createCountDown());
        this.timer.append(this.createButton());
        this.timer.append(this.createBar());
        container.append(this.timer);
    }
}

// new Timer(timeString, updateInterval, autoStart);
// timeString -->  mm:ss  or mmm:sss and so on

new Timer('00:20', 0.01);
new Timer('00:10', 1, true);
new Timer('01:02', 0.3);
new Timer('75:532', 3, true);





