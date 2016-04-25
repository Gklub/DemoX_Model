var express = require('express');
var router = express.Router();
var gb = require('./global');


module.exports = function (app) {
  app.post('/api/power', function (req, res) {
    gb.DEBUG_MODE && console.log(req.body);
    var id = req.body.id
    gb.members.forEach(function (mem) {
      if (mem.id == id) {
        if (mem.ready) return
        mem.status = 'power'
        mem.level = 0
        // mem.power++
        res.json({'code':'1'})
        mem.ready = true
      }
    })
  })

  app.post('/api/attack', function (req, res) {
    gb.DEBUG_MODE && console.log(req.body);
    var id = req.body.id
    var level = req.body.level
    gb.members.forEach(function (mem) {
      if (mem.id == id) {
        if (level == 1) {
          if (mem.power>=1) {
            if (mem.ready) return
            mem.status = 'attack'
            mem.level = 1
            res.json({'code':'1'})
            mem.ready = true
          } else {
            res.json({'code':'0'})
            gb.DEBUG_MODE && console.log('not enough power');
          }
        } else if (level == 2) {
          if (mem.power>1) {
            if (mem.ready) return
            mem.status = 'attack'
            mem.level = mem.power
            res.json({'code':'1'})
            mem.ready = true
          } else {
            res.json({'code':'0'})
            gb.DEBUG_MODE && console.log('not enough power');
          }
        }
      }
    })

  })

  app.post('/api/defend', function (req, res) {
    gb.DEBUG_MODE && console.log(req.body);
    var id = req.body.id
    var level = req.body.level
    gb.members.forEach(function (mem) {
      if (mem.id == id) {
        if (level == 1) {
          if (mem.ready) return
          mem.status = 'defend'
          mem.level = 1
          res.json({'code':'1'})
          mem.ready = true
        } else if (level == 2) {
          if (mem.power>=1) {
            if (mem.ready) return
            mem.status = 'defend'
            mem.level = mem.power+1
            res.json({'code':'1'})
            mem.ready = true
          } else {
            res.json({'code':'0'})
            gb.DEBUG_MODE && console.log('not enough power');
          }
        }

      }
    })
  })

};
