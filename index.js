// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodIds = 0;
let customerIds = 0;
let mealIds = 0;
let deliveryIds = 0;

class Neighborhood {
  constructor(name) {
    this.id = neighborhoodIds++;
    this.name = name;
    store.neighborhoods.push(this);
  } 
  deliveries() {
    return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id);
  }
  customers() {
    return store.customers.filter(customer => customer.neighborhoodId === this.id);
  }
  meals() {
    const allMeals = this.customers().map(customer => customer.meals());
    const merged = [].concat.apply([], allMeals);
    return [...new Set(merged)];
  }
}


class Customer {
  constructor(name, neighborhoodId) {
    this.name = name;
    this.id = ++customerIds;
    this.neighborhoodId = neighborhoodId;
    store.customers.push(this);
  }
  deliveries() {
    return store.deliveries.filter(delivery => delivery.customerId === this.id);
  }
  meals() {
    return this.deliveries().map(delivery => delivery.meal());
  }
  totalSpent() {
    return this.meals().reduce((total, meal) => (total += meal.price), 0);
  }
}


class Meal {
  constructor(title, price = 0) {
    this.title = title;
    this.price = price;
    this.id = ++mealIds;
    store.meals.push(this);
  }
  deliveries() {
    return store.deliveries.filter(delivery => delivery.mealId === this.id);
  } 
  customers() {
    return this.deliveries().map(delivery => delivery.customer());
  }
    static byPrice() {
      return store.meals.sort((a, b) => b.price - a.price);
    }
}


class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.id = ++deliveryIds;
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    store.deliveries.push(this);
  }
  meal() {
    return store.meals.find(meal => meal.id === this.mealId);
  }
  customer() {
    return store.customers.find(customer => customer.id === this.customerId);
  }
  neighborhood() {
    return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId);
  }
}

