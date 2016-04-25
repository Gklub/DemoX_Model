#Makefile begin

run:
	node bin/www
ssh:
	ssh root@139.129.24.151
ip:
	ifconfig | grep "inet " | grep -v 127.0.0.1
push:
	git push origin master
pull:
	git pull origin master
reset:
	git reset --hard HEAD
men: man 5 6 7 8
man: 1 2 3 4
1:
	curl -d 'name=gay1' 'http://139.129.24.151:3000/login'
2:
	curl -d 'name=gay2' 'http://139.129.24.151:3000/login'
3:
	curl -d 'name=gay3' 'http://139.129.24.151:3000/login'
4:
	curl -d 'name=gay4' 'http://139.129.24.151:3000/login'
5:
	curl -d 'name=gay5' 'http://139.129.24.151:3000/login'
6:
	curl -d 'name=gay6' 'http://139.129.24.151:3000/login'
7:
	curl -d 'name=gay7' 'http://139.129.24.151:3000/login'
8:
	curl -d 'name=gay8' 'http://139.129.24.151:3000/login'
#Makefile end
