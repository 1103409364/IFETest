function Restaurant(obj) {
    this.cash = obj.cash;
    this.seats = obj.seats;
    this.staff = obj.staff;
}
Restaurant.prototype = {
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
    finishWork: function () {
        console.log("完成工作");
    }
}
// 服务员类
// 混合继承（构造+原型）
var SingleWaiter = (function () {
    var waiter;
    function Waiter(id, name, salary) {
        Staff.call(this, id, name, salary)
    }
    Waiter.prototype = {
        finishWork: function (order) {
            if (Array.isArray(order)) {

            } else {

            }
        }
    }
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
var SingleCook = (function () {
    var cook;
    function Cook(id, name, salary) {
        Staff.call(this, id, name, salary)
    }
    Cook.prototype = {
        finishWork: function (order) {
            for (let i = 0; i < dishes.length; i++) {
                console.log("厨师:" + dishes[i] + "做好了");
            }
            return dishes;
        }
    }

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
    this.dishes = [];
}
Customer.prototype.eat = function (dishes) {
    for (let i = 0; i < dishes.length; i++) {
        console.log("顾客吃:" + dishes[i]);
    }
}
Customer.prototype.come = function (res) {
    if (res.seats > 0) {
        res.seats--;
        console.log(this.name + "来吃饭，先坐下点菜");

    } else {
        console.log(this.name + "排队");
    }
}
Customer.prototype.leave = function (res) {
    res.seats++;
    console.log(this.name + "离开")
}
// 点菜
Customer.prototype.order = function (dishesId) {
    this.dishes.push(menu.order(dishesId));
}
// 菜品类
// function Dish(name, cost, price) {
//     this.name = name;
//     this.cost = cost;
//     this.price = price;
// }
var menu = {
    1: {
        name: "烤鱼",
        price: 199,
    },
    order: function (id) {
        console.log("点菜");
        return this[id]["name"];
    }
}
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
for (let i = 0; i < 10; i++) {
    let cus = new Customer("顾客" + i);
    queueCus.push(cus);
}
var waiter = Waiter.getSingle(001, "Fan", 25, 5000);
var cook = Cook.getSingle(002, "Q", 35, 8000);
ifeRestaurant.hire(waiter);
ifeRestaurant.hire(cook);
// console.log(ifeRestaurant);
for (let i = 0; i < 10; i++) {
    var customer1 = queueCus.pop();
    customer1.come(ifeRestaurant);
    customer1.order(1);
    var dishesList = waiter.work(customer1["dishes"]);
    var dish = cook.work(dishesList);
    for (let i = 0; i < dish.length; i++) {
        waiter.work(dish[i]);
    }
    customer1.eat(dish);
    customer1.leave(ifeRestaurant);
}
