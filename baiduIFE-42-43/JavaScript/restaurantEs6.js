class Restaurant {
    constructor(obj) {
        this.cash = obj.cash;
        this.seats = obj.seats;
        this.staff = obj.staff;
    }
    hire(newStaff) {
        this.staff.push(newStaff);
    }
    fire(oldStaff) {
        var index = this.staff.indexOf(oldStaff);
        if (index >= 0) {
            this.staff.splice(index, 1);
        }
    }
}

//职员类
class Staff {
    constructor(id, name, age, salary) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.salary = salary;
    }
    work() {
        console.log("完成工作");
    }
}

// 混合继承（构造+原型）
class Waiter extends Staff {
    constructor(id, name, age, salary) {
        super(id, name, age, salary)
    }
    work(task) {
        if (Array.isArray(task)) {
            console.log("the order is" + task)
        } else {
            console.log(task);
        }
    }
}

//厨师类
class Cook extends Staff {
    constructor(id, name, age, salary) {
        super(id, name, age, salary);
    }
    work(dishes) {
        console.log("菜做好了")
    }
}

// 顾客类
class Customer {
    constructor(name) {
        this.name = name;
    }
    eat() {
        console.log("eat");
    }
    order(dishes) {
        console(dishes);
    }
}

//菜品类
class Dish {
    constructor(name, cost, price) {
        this.name = name;
        this.cost = cost;
        this.price = price;
    }
}

var ifeRestaurant = new Restaurant({
    cash: 1000000,
    seats: 20,
    staff: []
});
var newCook = new Cook(002, "Tony", 32, 10000);
var newCook1 = new Cook(003, "Tony", 32, 10000);
ifeRestaurant.hire(newCook);
ifeRestaurant.hire(newCook1);
console.log(ifeRestaurant.staff);

ifeRestaurant.fire(newCook1);
console.log(ifeRestaurant.staff);