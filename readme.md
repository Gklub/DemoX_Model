## DEMO-X

2016 年 “龙驰杯” hackathon 比赛二等奖、最具技术奖、最具创意奖作品Model部分。


## Require


Model: 在服务器上运行该项目，启动游戏模型，需要安装NodeJS，游戏核心逻辑计算和计时部分都在于此。


View:
用于演示结果的html，用socket连接。网络环境较好，支持CSS3的浏览器即可。


Controller: 本游戏使用Android端百度语音控制，请在Android机上安装demoX的安卓应用。


View、Controller详情见组件项目


## Game Rule

每个回合开始时有五种随机「咒语」可供选择，分别对应集气(power)，攻击(atk)，高级攻击(ult)，
防御(def)，高级防御(hdef)。高级技能的消耗**高于低级技能**使用时才有效，使用时将消耗**所有的**power，放出当前能够使用的最强技能

power

level | power | def
------------ | ------------- | ------------
0 | +1 | 0

attack

level | power | atk
------------ | ------------- | ------------
1 | -1 | 1
2 | -2 | 2
3 | -3 | 3
4 | -4 | 4
5 | -5 | max


defend

level | power | def
------------ | ------------- | ------------
1 | 0 | 1
2 | -1 | 2
3 | -2 | 3
4 | -3 | max

**def4相当于refect**

ex1: {gay1:pow, gay2:atk2, gay3:def2}  => {0, 1, 1}

ex2: {gay1:atk2, gay2:def2, gay3:atk1} => {1, 1, 0}

ex3: {gay1:atk1, gay2:def2} => {1, 1}

ex4: {gay1:atk2, gay2:def1} => {1, 0}

ex5: {gay1:atk5, gay2:def3} => {1, 0}

ex6: {gay1:atk3, gay2:atk5, gay3:def3, gay4:ref} => {0, 0, 0, 1}


## Game Model

这是一个回合、策略、语音控制的实时对战游戏，在每个回合倒计时结束前，你可以选择集气，不同方式的攻击或者不同方式的防御，最终击败所有的对手来获取胜利。（巴拉拉能量！

游戏逻辑都写在由NodeJS写的后端中，与控制器进行消息通信，与游戏界面进行实时通信，通过一个计时器，进行回合控制，回合结束之前将进行控制器所发的第一个请求动作，否则将执行当前能够进行的随机动作之一，也就是所谓的AI。

后台启动后，等待界面的「start」，这将会发送一个message，启动游戏内部的计时器，与界面保持当前回合剩余时间的实时通信。每个回合大概有3/4的时间用于等待，3/4时间左右时发送给界面一个members组，包含所有成员的信息（无论状态），剩余1/4时间给予CSS3特效时间。这里的时间长度和比例需要看现场网络的状态（笑

```
game start!
```

开始加入的第一回合。控制器的登录界面会发送登陆信息

```
{ name:'Sino' }
{ name:'Gay' }
```


第一回合是加入游戏回合，过了第一回合(-1)，或者姓名重复(0)都会有对应非1的code返回，这里返回是否加入游戏，是控制器唯一需要返回的api，之后均为单向通信，由后端判断是否逻辑有效。

第二回合开始后，在倒计时前接受所有成员的出招情况，并发送给view端。

当某个回合结束时，剩余成员数<=1，则回合结束时发送给view一个「end」消息，取消游戏计时器，清空members组，等待下一个「start」






## And AI

AI是这个游戏很重要的一部分，其行为的不可预知性能带来节目效果，其本质是一个无人控制的member。




## Makefile

启动后端

```
node bin/www
```
或者

```
make run
```

在第一回合时：

加入n(<=8)号

```
make n
```

加入4/8个AI:

```
make man/men
```




## 全部组件

* [Android](https://github.com/SinoReimu/DEMO-X---Android) By [SinoReimu](https://github.com/SinoReimu)
* [Frontend](https://github.com/XGHeaven/DEMO-X-frontend) By [XGHeaven](https://github.com/XGHeaven)
* [Backend](https://github.com/Gklub/DemoX_Model) By [imxana](https://github.com/imxana)
