var Global =  {
  DEBUG_MODE : 1,
  members : [],
  countDownInit: 12,
  countDown : 12,
  gameState : 0,
  gameID : '',
}

function memberEx() {
  this.id
  this.name
  this.power
  this.status
  this.level
  this.isDead
  this.ready
}

Global.randomIDCreator = function (l) {
  var ar = "0123456789ABCDEF";
  var result = "";
  for (var i = 0; i < l; i++) {
    result += ar[Math.floor(Math.random()*ar.length)];
  }
  return result
}

Global.sessionRepeat = function(session, sessions) {
  var isRepeated = false
  sessions.forEach(function (n) {
    session == n && (isRepeated = true)
  })
  return isRepeated
}

Global.countDowner = function (fun) {
  setTimeout(function(){
    Global.countDown -= 0.1
    if(Global.countDown>0){
        setTimeout(arguments.callee, 100);
    } else {
      fun && fun()
    }
  },100);
}

Global.damageCalculator = function () {
  var attack = false
  var reflect = false
  var members = Global.members.filter(function (m) {
    return !m.isDead
  })

  // check situaion state
  members.forEach(function (i) {
    if (!i.ready) {
      Global.DEBUG_MODE && console.log('not ready')
      Global.randomSkill(i)
    }
    if (i.status=='defend') {
      if (i.level==4) {
        Global.DEBUG_MODE && console.log('ref!')
        reflect=true
      }
    }
    if (i.status=='attack') {
      Global.DEBUG_MODE && console.log('sb atk!')
      attack = true
    }
  })

  // calculate the power
  members.forEach(function (e) {
    if (e.status=='power') {
      e.power++
    } else if (e.status=='attack') {
      if (e.level >= 5) {
        e.power = 0
      } else
        e.power -= e.level
    } else if (e.status=='defend') {
      if (e.level >= 4) {
        e.power = 0
      } else {
        e.power -= (e.level-1)
      }
    }
  })

  // do the damamge
  if (attack) {
    var arr = members.filter(function(e){return e.status=='attack'})
    var maxAtk = 1

    arr.forEach(function (e) {
      maxAtk = Math.max(e.level,maxAtk)
    })

    members.forEach(function (e) {
      if (e.level < maxAtk) {
        e.isDead = true
        Global.DEBUG_MODE && console.log('be hit')
      }
      if (e.status=='power') {
        e.isDead = true
        Global.DEBUG_MODE && console.log('be hit2')
      }
      if (e.status=='attack' && reflect) {
        Global.DEBUG_MODE && console.log('be flect')
        e.isDead = true
      }
      if (e.status=='defend' && e.level==4) {
        Global.DEBUG_MODE && console.log('im flect')
        e.isDead = false
      }

    })
  }

}

Global.randomSkill = function (men) {
  var skills = [{s:'power',level:0}, {s:'defend',level:1}]
  if (men.power==1) {
    skills.push(
      {s:'attack',level:1},
      {s:'defend',level:2}
    )
  }
  if (men.power>1) {
    skills.push(
      {s:'attack',level:1},
      {s:'attack',level:Math.min(men.power, 5)},
      {s:'defend',level:Math.min(men.power+1, 4)}
    )
  }
  var ski = skills[Math.floor(Math.random()*skills.length)];
  if (Global.gameState == 1) {
    ski.s = 'power'
    ski.level = 0
  }
  men.status = ski.s
  men.level = ski.level

  Global.DEBUG_MODE && console.log('round!!!!!',Global.gameState);
  Global.DEBUG_MODE && console.log('randomSkill',ski);
}


module.exports = Global
