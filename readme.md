#Android

./login 登陆
post:
{
	'name':用户名
}
return:
{
	'code':'1' // 成功为1，用户名重复为0，游戏已开始为-1
	'id':用户ID  // 失败无返回
}

./api/power 攒气
post:
{
	'id':用户ID,
}

./api/attack 攻击
post:
{
	'id':用户ID,
	'level':攻击等级(1~5)
}

./api/defend 防御
post:
{
	'id':用户ID,
	'level':防御等级:(1~4)
}

./api/*
return:
{
	'code':'1' // 成功为1，失败为0
}
#socket.io
##'message'

game control:
{
	type: 'game control'
	status: 'begin' // 'end'
}

##'members'
{
	members: [members]
}

##'time'

count down
{
	gameID: GameID(string),
	countDown: time(number)
}



##test code:

curl -d 'name=gay' 'http://139.129.24.151:3000/login'

curl -d 'id=0123456789ABCDEF' 'http://139.129.24.151:3000/api/power'

curl -d 'level=2&id=0123456789ABCDEF' 'http://139.129.24.151:3000/api/attack'

curl -d 'level=2&id=0123456789ABCDEF' 'http://139.129.24.151:3000/api/defend'
