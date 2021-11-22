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
            'dont_merge_cookies': True
        }

        client = pymongo.MongoClient(
            "mongodb+srv://admin:Mk4bCarwSAp6V7AXK42U@cluster0.iuyhs.mongodb.net/gatherer?retryWrites=true&w=majority")
        db = client.gatherer
        self.email_collection = db.email


    def start_requests(self):
        if proxy_enabled:
            try:
                proxy_num = self.state.get('proxy_num', 0)
            except KeyError as e:
                self.state['proxy_num'] = 0

        for url in self.urls:

            if proxy_enabled:
                proxy_num = self.state.get('proxy_num', 0) + 1
                self.state['proxy_num'] = proxy_num
                self.meta['proxy'] = f'{username}-session-{proxy_num}:{password}@zproxy.lum-superproxy.io:22225'

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

        # remove dupes
        emails = list(set(emails))

        for email in emails:

            out_obj = {
                'email': email,
                'email_domain': email.split('@')[1],
                'timestamp': int(time.time()),
                'url': response.url,  # page URL
            }

            self.email_collection.insert_one(out_obj)

            yield out_obj # save data to external file (.csv, .jl, .json)

        domain = urlparse(response.url).netloc

        self.log(domain)

        le = LinkExtractor(allow_domains=domain)

        for link in le.extract_links(response):
            self.log(link.url)
            yield response.follow(link.url, callback=self.parse)

        domain = urlparse(response.url).netloc

        # with open(str(html_saves_dir / f"{domain}.html"), 'wb') as f:
        #     f.write(response.body)


        '''
            https://docs.exactbuyer.com/contact-enrichment/enrichment
            try:
                eb_res = requests.get(  # enrich
                    "https://api.exactbuyer.com/v1/enrich",
                    headers={'X-API-Key': 'z0nGZdvXXQ5'},
                    params={'email': email}
                )
            except Exception as e:
                print(f'{job_id}: eb api request failed {e}')
                continue
    
            if eb_res.status_code != 200:
                print(f'{job_id}: eb cant enrich contact')
                continue
        
        '''




    def closed(self, reason):
        # code here will execute when scrapy is closed
        self.log('Scrapy closed successfully')