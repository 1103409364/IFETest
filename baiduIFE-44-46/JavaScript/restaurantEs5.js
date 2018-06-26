function Restaurant(obj) {
    this.cash = obj.cash;
    this.seats = obj.seats;
    this.staff = obj.staff;
}
// 招聘职员
Restaurant.prototype.hire = function (newStaff) {
    this.staff.push(newStaff);
}
// 解雇职员
Restaurant.prototype.fire = function (oldStaff) {
    var index = this.staff.indexOf(oldStaff);
    if (index >= 0) {
        this.staff.splice(index, 1);
    }
}
//职员类
function Staff(id, name, age, salary) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.salary = salary;
}
Staff.prototype.work = function () {
    console.log("完成");
}
// 服务员类
// 混合继承（构造+原型）
function Waiter(id, name, age, salary) {
    Staff.call(this, id, name, age, salary)
}
Waiter.prototype = new Staff();
Waiter.prototype.constructor = Waiter;

Waiter.prototype.work = function (task) {
    if (Array.isArray(task)) {
        console.log("the order is" + task)
    } else {
        return task;
    }
}
//添加一个静态方法来实现单例：
Waiter.getSingle = (function () {
    var waiter = null;
    return function (id, name, age, salary) {
        if (!waiter) {
            waiter = new Waiter(id, name, age, salary);
        }
        return waiter;
    }
})();
//厨师类
function Cook(id, name, age, salary) {
    Staff.call(this, id, name, age, salary)
}
Cook.prototype = new Staff(); //不传参
Cook.prototype.constructor = Cook;
Cook.prototype.work = function (orders) {
    console.log(orders + "做好了")
    return orders;
}
Cook.getSingle = (function () {
    var cook = null;
    return function (id, name, age, salary) {
        if (!cook) {
            cook = new Cook(id, name, age, salary);
        }
        return cook;
    }
})()
// 顾客类
function Customer(name) {
    this.name = name;
}
Customer.prototype.eat = function (dishes) {
    console.log("顾客开始吃" + dishes);
}
Customer.prototype.seat = function (res) {
    if (res.seats > 0) {
        res.seats--;
        console.log("顾客坐下");

    } else {
        console.log("排队");
    }
}
// 点菜
Customer.prototype.order = function (menu) {
    return menu.order(1);
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

var waiter = Waiter.getSingle(001, "Fan", 25, 5000);
var cook = Cook.getSingle(002, "Q", 35, 8000);
ifeRestaurant.hire(waiter);
ifeRestaurant.hire(cook);
// console.log(ifeRestaurant);
var customer1 = new Customer;
customer1.seat(ifeRestaurant);
if (ifeRestaurant.seats == 0) {
    console.log("有客人");
    var orders = waiter.orderSer(customer1);
    var dishes = cook.work(orders);
    customer1.eat(dishes);
}