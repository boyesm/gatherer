FROM python:3

WORKDIR /usr/src/app

COPY . .

RUN pip install --no-cache-dir -r requirements.txt

WORKDIR /usr/src/app/mindbender

# make job dir stored in an external volume so that it doesn't increase the zie of the container

CMD scrapy crawl mindbender -o output.jl -s JOBDIR=./crawls/crawl

