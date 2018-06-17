function Restaurant(cash, seats) {
    this.cash = cash;
    this.seats = seats;
    this.staff = [];
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
Waiter.work = function (work) {
    if (Array.isArray(foods)) {
        this.menu = foods;
    } else {
        return menu;
    }
}
//厨师类
function Cook(id, name, age, salary) {
    Staff.call(this, id, name, age, salary)
}
Cook.prototype = new Staff(); //不传参
Cook.prototype.constructor = Cook;
Cook.work = function (menu) {
    this.menu = menu;
    return menu;
}
// 顾客类
function Customer(name) {
    this.name = name;
}
Customer.prototype.eat = function (food) {
    console.log("eat" + food);
}
Customer.prototype.order = function (food) {
    return this.menu.push(food);
}
//菜品类
function Dish(name, cost, price) {
    this.name = name;
    this.cost = cost;
    this.price = price;
}

var ifeRestaurant = new Restaurant(100000, 20);
var newCook = new Cook(002, "Tony", 32, 10000);
ifeRestaurant.hire(newCook);
console.log(ifeRestaurant.staff);

// ifeRestaurant.fire(newCook);
// console.log(ifeRestaurant.staff);