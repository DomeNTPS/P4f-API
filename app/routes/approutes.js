'use strict';
module.exports = function (app) {
    var todoList = require('../controller/appController');

    // todoList Routes
    app.route('/running_equipment')
        .get(todoList.list_all_running_equipment)
        .post(todoList.create_a_task);

    app.route('/running_equipment/:KKScode')
        .get(todoList.read_a_task)
        .put(todoList.update_a_task)
        .delete(todoList.delete_a_task);
};