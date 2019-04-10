console.log("...there...");


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
        this.initialDate = this.parseDateObj(this.countObject);
        this.countDown.innerHTML = `${this.initialDate.hours}:${this.initialDate.min}:${this.initialDate.sec}`;

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

    createAutoSign(){
        this.sign = document.createElement('div');
        this.sign.innerHTML = "auto";
        this.sign.classList.add('auto-sign');

        return this.sign;
    }

    createButton() {
        this.button = document.createElement('button');
        this.button.id = 'mainButton';
        this.button.innerHTML = 'Start';
        this.button.addEventListener('click', this.rushTimer.bind(this));

        if(this.autoStart) { 
            this.button.dispatchEvent(new Event('click'));
            this.sign = this.createAutoSign();
            this.timer.append(this.sign);
        };
       
        return this.button;
    }

    rushTimer() {
        if (this.button.innerHTML === 'Start') {
            this.button.innerHTML = 'Stop';
            console.log("Timer started");
            this.timeChanging();

        } else {
            this.button.innerHTML = 'Start';

            console.log("Timer stoped");
            clearInterval(this.interval);
        }
        

    }

    timeChanging() {
        

        this.interval = setInterval(() => {
            this.countObject = new Date(this.countObject.valueOf() - this.updateInterval );
            const date = this.parseDateObj(this.countObject);
            console.log("tic");

            

            if (this.countObject.valueOf() <= 0) {

                clearInterval(this.interval);
                this.countDown.innerHTML = `${date.hours}:${date.min}:${date.sec}`;
                clearInterval(update);
                this.button.innerHTML = "Finish";
                this.bar.style.width = 0 + 'px';
            }

        }, this.updateInterval);

        const update = setInterval(() => {
            
            const allWidth = Math.round(container.offsetWidth * 0.853);
            const currentWidht = this.bar.offsetWidth;
            const percent = (this.countObject.valueOf() / this.msDate).toFixed(6);

            console.log(allWidth, currentWidht);
            
            this.bar.style.width = allWidth * percent + 'px';
           
            
            console.log('per', percent);

            const date = this.parseDateObj(this.countObject);
            this.countDown.innerHTML = `${date.hours}:${date.min}:${date.sec}`;


            if(this.button.innerHTML === 'Start'){
                
                clearInterval(update)
            };
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

new Timer('01:00', 0.01);
new Timer('00:10', 1, true);
new Timer('51:49', 5);


let myd = new Date(1025);
console.log(typeof myd);
// myd.setMilliseconds(0);

console.log(myd.toLocaleTimeString());
console.log('in ms', myd.valueOf());

myd = new Date(myd.valueOf() + 2498); //--

console.log(myd.toLocaleTimeString());
console.log('in ms', myd.valueOf());



