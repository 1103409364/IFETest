class Restaurant {
    constructor(cash, seats) {
        this.cash = cash;
        this.seats = seats;
        this.staff = [];
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
    static work(work) {
        if (Array.isArray(foods)) {
            this.menu = foods;
        } else {
            return menu;
        }
    }
}

//厨师类
class Cook extends Staff {
    constructor(id, name, age, salary) {
        super(id, name, age, salary);
    }
    static work(menu) {
        this.menu = menu;
        return menu;
    }
}

// 顾客类
class Customer {
    constructor(name) {
        this.name = name;
    }
    eat(food) {
        console.log("eat" + food);
    }
    order(food) {
        return this.menu.push(food);
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

var ifeRestaurant = new Restaurant(1000000, 20);
var newCook = new Cook(002, "Tony", 32, 10000);
ifeRestaurant.hire(newCook);
console.log(ifeRestaurant);

// ifeRestaurant.fire(newCook);
// console.log(ifeRestaurant.staff);