# start tor proxy
docker run -d \
--name torproxy \
--restart unless-stopped \
-p 9050:9050 \
tor_proxy


# start proxy converter (can the 't' be removed here?)
docker run -itd \
--name proxytranslator \
--restart unless-stopped \
-p 8181:8181 \
mosajjal/pproxy:latest \
-l http://:8181 \
-vv

# I removed these \/\/\/\/, and it still seems to work. Keeping here is case I run into problems later.
# -r socks5://10.0.0.71:9050 \
#-r socks5://127.0.0.1:9050


# start scraper (background)
#docker run \
#--name gscraper \
#--restart unless-stopped \
#--dns 8.8.8.8 \
#--ulimit nofile=65536 \
#gatherer-scraper:latest


# start scraper (foreground)
#docker run -it \
#--name gscraper \
#--restart unless-stopped \
#--dns 8.8.8.8 \
#--ulimit nofile=65536 \
#gatherer-scraper:latest \
#bash

# init database
docker run -d \
--name mongodb \
-p 27017:27017 \
-v gatherer-db:/data/db \
mongo