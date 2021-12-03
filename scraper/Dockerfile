FROM python:3

WORKDIR /usr/src/app

COPY . .

RUN pip install --no-cache-dir -r requirements.txt

RUN cd mindbender

CMD scrapy crawl mindbender -o output.jl -s JOBDIR=./crawls/crawl-0

