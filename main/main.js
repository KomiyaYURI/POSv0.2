const loadAllItems = require('./loadAllItems.js');
var _ = require('lodash');

module.exports = function main(inputs) {
    let cartItem = loadAllItems();

    let groupByItem = _.countBy(inputs);


    function headMessage() {
        return "***<没钱赚商店>购物清单***\n";
    }
    let info;

    function match(barcode, count) {
         info = _.find(cartItem, function(obj) { return obj.barcode === barcode; });
    }

    let total = 0;
    function calculation(count) {
        //let info = _.find(items, function(obj) { return obj.barcode === barcode; });
        let subtotal = count * info.price;
        total += subtotal;
        return subtotal;
    }
    
    function printLine( count) {
            let cu = calculation(count);
        return `名称：${info.name}，数量：${count}${info.unit}，单价：${info.price.toFixed(2)}(元)，小计：${cu.toFixed(2)}(元)\n`
    }

    function printTotal() {
        return `----------------------\n总计：${total.toFixed(2)}(元)\n**********************`
    }
    //**********************


    let message = headMessage();

    _.forIn(groupByItem, function(value, key) {
        match(key, value)
        message += printLine( value);
    });

    message += printTotal();

    return message;
};