
function outerFunction() {
    let counter = 0; // This is a variable in the outer function
  
    function innerFunction() {
      counter++;  // The inner function can access and modify the outer function's variable
      console.log(counter);
    }
  
    return innerFunction;  // We return the inner function as a closure
  }
  
  const incrementCounter = outerFunction();  // outerFunction returns innerFunction
  incrementCounter();  // Outputs: 1
  incrementCounter();  // Outputs: 2
  incrementCounter();  // Outputs: 3


  function k() {
    let counter = 5; // This is a variable in the outer function
  
    return {
        decrement: function() {
            counter--;
            console.log(counter);
        },
        reset: function() {
            counter = 0;
            console.log("counter has reset");
        }
    }
  }

  const decrement = k();
  decrement.decrement();
  decrement.decrement();
  decrement.decrement();
  decrement.reset();


  const orders = [
    {id: 101, customerName: "Arun", total: 150, status: "Completed"},
    {id: 102, customerName: "Bharath", total: 180, status: "Pending"},
    {id: 103, customerName: "Charan", total: 225, status: "Completed"},
    {id: 104, customerName: "Dhanush", total: 100, status: "Cancelled"},
    {id: 105, customerName: "Eshwar", total: 147, status: "Pending"},
    {id: 106, customerName: "Fazel", total: 75, status: "Cancelled"},
    {id: 107, customerName: "Gagan", total: 90, status: "Cancelled"},
    {id: 108, customerName: "Harish", total: 178, status: "Completed"},
    {id: 109, customerName: "Ishan", total: 200, status: "Completed"},
    {id: 110, customerName: "Jairam", total: 270, status: "Pending"},
];

const groupedOrdersFil = {
    Completed: orders.filter((order) => order.status === 'Completed'),
    Pending: orders.filter((order) => order.status === 'Pending'),
    Cancelled: orders.filter((order) => order.status === 'Cancelled')
};

console.log(groupedOrdersFil);

// Step 1: Get unique status values
const uniqueStatuses = [...new Set(orders.map(order => order.status))];

// Step 2: Use map to group orders by status
const groupedOrders = uniqueStatuses.map(status => ({
    status,
    orders: orders.filter(order => order.status === status)
}));

// Convert the result into an object for easier access
const groupedOrdersObj = groupedOrders.reduce((acc, group) => {
    acc[group.status] = group.orders;
    return acc;
}, {});


let htmlContent = '';

for (let status in groupedOrdersObj) {
    htmlContent += `<h2>${status}</h2>`;
    groupedOrdersObj[status].forEach(order => {
        htmlContent += `<p>Order ID: ${order.id}, Customer: ${order.customerName}, Total: ${order.total}, Status: ${order.status}</p>`;
    });
    htmlContent += ``;
}

// Step 4: Set the innerHTML of the "orders" element
document.getElementById("orders").innerHTML = htmlContent;

console.log(groupedOrdersObj);
