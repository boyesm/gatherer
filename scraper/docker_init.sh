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
-r socks5://10.0.0.52:9050 \
-vv


# start scraper
docker run \
--name gscraper \
--restart unless-stopped \
--dns 8.8.8.8 \
gatherer-scraper:latest



