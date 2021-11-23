source ~/dev/gatherer/venv/bin/activate & cd ~/dev/gatherer/scraper/mindbender &



nohup scrapy crawl mindbender -o output.jl -s JOBDIR=~/dev/gatherer/scraper/crawls/crawl-0 &