var people = [];
var $config, $startScreen, $working, $spinner;
var waitingInterval4Company,waitingInterval4Name;

function startWaiting4Company() {
    var state = 0;
    var states = ['|', '/', '-', '\\'];
    waitingInterval4Company = setInterval(function() {
        state = (++state) % states.length;
        $('#waiting4Company').html(states[state]);
    }, 100)
}
function endWaiting4Company(){
    $('#waiting4Company').empty();
    clearInterval(waitingInterval4Company);
}
function startWaiting4Name() {
    var state = 0;
    var states = ['|', '/', '-', '\\'];
    waitingInterval4Name = setInterval(function() {
        state = (++state) % states.length;
        $('#waiting4Name').html(states[state]);
    }, 100)
}
function endWaiting4Name(){
    $('#waiting4Name').empty();
    clearInterval(waitingInterval4Name);
}


function chooser(cb) {
    var $box = $('#luckycompany');

    var speed = 100;
    var level = 150;//控制下滑的速度，默认值是50
    var decayInt = setInterval(function() {
        speed += level;
        level = Math.max(5, level - 1);
    }, 400);

    function role() {
        var end = false;
        var to = '30px';

        if(speed > 1000) {
            to = '30px';
            end = true;
            speed = 1500;
        }
        if(!end){
            var a = people.get();
        }else{
            var a = employees[randomNo].company;
        }

        $box.html(a);

        $box.animate({
            top: to
        }, speed, function() {
            if(!end) {
                $box.css({top:'-30px'});
                role();
            } else {
                clearInterval(decayInt);
                cb();
            }
        });
    }

    role();
}

function ListEval(list, nr) {
    this.list = list || [];
    this.nr = nr || 2;
    this.lasts = [];

    this.get = function() {
        if(this.list.length === 1) {
            return this.length[0];
        } else if(this.list.length === 0) {
            return null;
        }

        var tmp;
        do {
            tmp = this.list[~~(Math.random() * this.list.length)]
        } while(this.lasts.indexOf(tmp) > -1);

        this.lasts.pop();
        this.lasts.unshift(tmp);

        return tmp;
    };

    this.init = function() {
        if(this.list.length <= 1) {
            return;
        }

        if(this.list.length <= nr) {
            this.nr = this.list.length - 1;
        }

        for(var i = 0; i < this.nr; i++) {
            this.lasts.push(null);
        }
    };

    this.init();
}

function done() {
    endWaiting4Name();
    var id = employees[randomNo].id;
    var name = employees[randomNo].name;
    var company = employees[randomNo].company;
    testAnim(getRandomAction(attentionSeekers),'luckycompanydiv');
    addTextForLuckyName(name,name,id,1000);
}