'user strict';
var sql = require('./db.js');

//Task object constructor
var RunEqi = function (run_eqi) {
    this.KKScode = run_eqi.KKScode;
    this.DateStart = run_eqi.DateStart;
    this.DateExpired = run_eqi.DateExpired;
};
RunEqi.createRunEqi = function (newRunEqi, result) {
    sql.query("INSERT INTO running_equipment set ?", newRunEqi, function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};
RunEqi.getRunEqiByKKS = function (KKScode, result) {
    sql.query("Select task from running_equipment where KKScode = ? ", KKScode, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);

        }
    });
};
RunEqi.getAllRunEqi = function (result) {
    sql.query("Select * from running_equipment", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('running_equipment : ', res);

            result(null, res);
        }
    });
};
RunEqi.updateDateStartByKKS = function (kks, run_eqi, result) {
    sql.query("UPDATE running_equipment SET DateStart = ? WHERE KKScode = ?", [run_eqi.DateStart, kks], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
RunEqi.updateDateExpiredByKKS = function (kks, run_eqi, result) {
    sql.query("UPDATE running_equipment SET DateExpired = ? WHERE KKScode = ?", [run_eqi.DateExpired, kks], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
RunEqi.remove = function (kks, result) {
    sql.query("DELETE FROM running_equipment WHERE KKScode = ?", [kks], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {

            result(null, res);
        }
    });
};
