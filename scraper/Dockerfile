FROM python:3

WORKDIR /usr/src/app

COPY . .

RUN pip install --no-cache-dir -r requirements.txt

WORKDIR /usr/src/app/mindbender

CMD scrapy crawl mindbender -o output.jl -s JOBDIR=./crawls/crawl-0

