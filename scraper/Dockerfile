# pull python img
# copy mindbender folder
# install requirements.txt
# set dns
# set system wide proxy
# run script







FROM python:3

WORKDIR /usr/src/app

COPY requirements.txt ./
COPY functions.py ./
RUN mkdir ./mindbender
COPY mindbender/ ./mindbender/

RUN pip install --no-cache-dir -r requirements.txt






# CMD scrapy crawl mindbender -s JOBDIR=./crawls/crawl-0 -o new3_output.jl

