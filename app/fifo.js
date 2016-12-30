module.exports = function fifo(menu, baristas, workday) {
  baristas = baristas.map(function(id) {
    return { id: id, availableAt: workday.start };
  });

  function nextAvailable() {
    return baristas.sort((a, b) =>  a.availableAt - b.availableAt)[0];
  }

  return function(orders) {
    return orders.map(function(order) {
      var fulfillment = {};
      var barista = nextAvailable();
      var drink = menu.find(drink => drink.type === order.type);

      fulfillment['barista_id'] = barista.id;
      fulfillment['order_id'] = order['order_id'];
      fulfillment['start_time'] = Math.max(order['order_time'], barista.availableAt);

      barista.availableAt = fulfillment['start_time'] + drink['brew_time'];

      return fulfillment;
    }).filter(order => order['start_time'] <= workday.end);
  }
};
