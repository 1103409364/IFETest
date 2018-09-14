function Restaurant(obj) {
    this.cash = obj.cash;
    this.seats = obj.seats;
    this.staff = obj.staff;
}
Restaurant.prototype = {
    // 重设constructor属性
    constructor: Restaurant,
    // 招聘职员
    hire: function (newStaff) {
        this.staff.push(newStaff);
    },

    // 解雇职员
    fire: function (oldStaff) {
        var index = this.staff.indexOf(oldStaff);
        if (index >= 0) {
            this.staff.splice(index, 1);
        }
    }
}
//职员类
function Staff(id, name, salary) {
    this.id = id;
    this.name = name;
    this.salary = salary;
}
Staff.prototype = {
    constructor: staff,
    finishWork: function () {
        console.log("完成工作");
    }
}
// 服务员类
function Waiter(id, name, salary) {
    Staff.call(this, id, name, salary)
}
Waiter.prototype = {
    constructor: waiter,
    finishWork: function (dish, cook) {
        if (Array.isArray(dish)) {
            // var _ck = singleCook.getSingle(id, name, salary);
            console.log("服务员大喊：厨子做一个 " + dish);
            cook.finishWork(dish, waiter);
            // _ck = null;
        } else {
            console.log("服务员上菜：" + dish);
        }
    }
}

var singleWaiter = (function () {
    var waiter;

    return {
        getSingle: function (id, name, salary) {
            if (!waiter) {
                waiter = new Waiter(id, name, salary);
            }
            return waiter;
        }
    };
})();

//厨师类
function Cook(id, name, salary) {
    Staff.call(this, id, name, salary)
}
Cook.prototype = {
    constructor: Cook,
    finishWork: function (dish, waiter) {
        // _wt = singleWaiter.getSingle(id, name, salary);
        for (let i = 0; i < dish.length; i++) {
            console.log("厨师:" + dish[i] + "做好了");
            waiter.finishWork(dish[i], cook);
        }
        // _wt = null;
    }
}
var singleCook = (function () {
    var cook;


    return {
        getSingle: function (id, name, salary) {
            if (!cook) {
                cook = new Cook(id, name, salary);
            }
            return cook;
        }
    }
})();

// 顾客类
function Customer(name) {
    this.name = name;
}

Customer.prototype = {
    //顾客随机点菜
    order: function (menu) {
        var dishes = [];
        var i = Math.floor(Math.random() * menu.length);
        console.log(this.name + "点菜:" + menu[i]);
        dishes.push(menu[i]);
        // return dishes;
        waiter.finishWork(dishes, cook);
    },
    eat: function () {
        console.log(this.name + "：我要开动拉");
        console.log(this.name + ":吃完了，服务员结账");
    }
}
//菜品类
function Dish(name, cost, price) {
    this.name = name;
    this.cost = cost;
    this.price = price;
}
var menu = [
    (new Dish("烤鱼", 50, 100)).name,
    (new Dish("花蛤豆腐汤", 15, 30)).name,
    (new Dish("红烧肉", 1, 2)).name,
    (new Dish("凉拌黄瓜", 3, 6)).name
]
var ifeRestaurant = new Restaurant({
    cash: 1000000,
    seats: 1,
    staff: []
});
//用数组实现一个队列：先进先出，插入在一端，删除在另一端。
//就像排队一样，刚来的人入队（push）要排在队尾(rear)，每次出队(pop)的都是队首(front)的人
function Queue(size) {
    var list = [];
    //向队列中添加数据
    this.push = function (data) {
        if (data == null) {
            return false;
        }
        //如果传递了size参数就设置了队列的大小
        if (size != null && !isNaN(size)) {
            if (list.length == size) {
                this.pop();
            }
        }
        list.unshift(data);
        return true;
    }
    //从队列中取出数据
    this.pop = function () {
        return list.pop();
    }

    //返回队列的大小
    this.size = function () {
        return list.length;
    }

    //返回队列的内容
    this.quere = function () {
        return list;
    }
}

var queueCus = new Queue();
for (let i = 0; i < 5; i++) {
    let cus = new Customer("顾客" + i);
    queueCus.push(cus);
}

var waiter = singleWaiter.getSingle(001, "Fan", 5000);
var cook = singleCook.getSingle(002, "Q", 8000);
ifeRestaurant.hire(waiter);
ifeRestaurant.hire(cook);
for (let i = 0; i < 5; i++) {
    let cus = queueCus.pop();
    cus.order(menu, waiter);
    // waiter.finishWork(dishes, cook);
    cus.eat();
    console.log("服务员:下一位顾客请坐-------");
}

