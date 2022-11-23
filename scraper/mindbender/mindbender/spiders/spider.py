import scrapy
import os
import sys
import time
from pathlib import Path
from fake_useragent import UserAgent
from scrapy.linkextractors import LinkExtractor
import time
import logging as lg
from scrapy.spidermiddlewares.httperror import HttpError
import pandas as pd
from urllib.parse import urlparse
import pymongo

sys.path.append(f'{os.getcwd()}/..')
sys.path.append(f'{os.getcwd()}/../../..')

try:
    from settings import *
except:
    from mindbender.settings import *

from functions import *


class SpiderClass(scrapy.Spider):
    name = BOT_NAME
    time_started = int(time.time())


    def __init__(self):
        self.ua = UserAgent()

        create_dirs(html_saves_dir, json_saves_dir, csv_saves_dir)

        df = pd.read_csv(Path(f'./{input_csv_name}'), index_col=0)
        self.urls = df[url_column_name].to_list()

        self.meta = {
            'dont_merge_cookies': True,
            'proxy': "http://127.0.0.1:8181",
        }

        # client = pymongo.MongoClient(
        #     "mongodb+srv://admin:Mk4bCarwSAp6V7AXK42U@cluster0.iuyhs.mongodb.net/gatherer?retryWrites=true&w=majority")
        client = pymongo.MongoClient("mongodb://127.0.0.1:27017")
        db = client.gatherer
        self.email_collection = db.emails


    def start_requests(self):

        for url in self.urls:

            try:
                yield scrapy.Request(
                    url=url,
                    callback=self.parse,
                    meta=self.meta,
                    headers={
                        'User-Agent': self.ua.random
                    },
                    # dont_filter=True  # this removes filtering for duplicates (among other things)
                )


            except Exception as e:
                self.log(e)


    def parse(self, response):

        # parse out emails
        emails = parse_emails(response)
        self.log(f"emails: {emails}")

        for email in emails:

            try:

                out_obj = {
                    'email': email[0],
                    'email_domain': email[0].split('@')[1],
                    'email_status': email[1],
                    'timestamp': int(time.time()),
                    'url': response.url,  # page URL
                }

                try:
                    self.email_collection.insert_one(out_obj)

                except:
                    self.log("database error")


                yield out_obj # save data to external file (.csv, .jl, .json)

            except:

                pass

        domain = urlparse(response.url).netloc

        self.log(domain)

        le = LinkExtractor(deny_domains=[
            "facebook.com", "instagram.com", "youtube.com", "twitter.com", "linkedin.com", "twitch.tv", "imgur.com", "gyfcat.com", "youtu.be"
        ])

        for link in le.extract_links(response):
            # self.log(link.url)
            yield response.follow(link.url, callback=self.parse)

        domain = urlparse(response.url).netloc

        # with open(str(html_saves_dir / f"{domain}.html"), 'wb') as f:
        #     f.write(response.body)




    def closed(self, reason):
        # code here will execute when scrapy is closed
        self.log('Scrapy closed successfully')