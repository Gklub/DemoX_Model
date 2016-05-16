# Makefile begin

url = localhost:3000
# url = 139.129.24.151:3000
urlapi = 'http://$(url)/login'

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

c1 = curl -d 'name=gay
c2 = ' $(urlapi)

1:
	$(c1)1$(c2)
2:
	$(c1)2$(c2)
3:
	$(c1)3$(c2)
4:
	$(c1)4$(c2)
5:
	$(c1)5$(c2)
6:
	$(c1)6$(c2)
7:
	$(c1)7$(c2)
8:
	$(c1)8$(c2)
#Makefile end
