import os
import logging as lg
from lxml import html, etree
from lxml.html.clean import Cleaner
import re
from validate_email import validate_email_or_fail
from validate_email.exceptions import *


def create_dirs(*dirs):
    for dir in dirs:
        if not os.path.exists(dir):
            os.makedirs(dir)
            lg.info(f'Created directory {str(dir)}')


def inner_html(response):
    cleaner = Cleaner()
    cleaner.javascript = True
    cleaner.style = True

    output_response = cleaner.clean_html(html.fromstring(response))
    for element in ["a", "p", "div", "h1", "h2", "h3", "h4", "h5", "h6"]:
        for elem in output_response.xpath("*//" + element):
            try:
                elem.text = "\n" + elem.text + "\n" if elem.text else "\n"
            except:
                continue
    return output_response.text_content()


def parse_emails(response):
    t = []
    ve = []
    try:
        html_str = inner_html(response.text)
        for e in re.findall("[\w.+-]+@[\w-]+\.[\w.-]+", html_str):
            t.append(e)

    except Exception as e:
        lg.exception(f"Email processing error 1: {e}")

    try:
        tree = etree.HTML(response.text)
        emails = tree.xpath("//a[contains(@href,'mailto')]")
        for e in emails:
            e = e.get("href").replace("mailto:", "").lower().split("?")[0]
            t.append(e)

    except Exception as e:
        lg.exception(f"Email processing error 2: {e}")

    # clean up emails
    for i, e in enumerate(t):
        try:
            e = e.lower()
            e = e.strip()

            e = re.sub("%[A-Fa-f0-9]{2}", "", e)  # replace all URL encoding characters

            t[i] = e

        except Exception as e:
            lg.info(f"failed while cleaning up emails: {e}")

    # remove dupes
    t = list(set(t))

    print(f"unprocessed emails: {t}")

    # verify emails
    for e in t:
        try:
            if validate_email_or_fail(e, check_smtp=False):
                ve.append([e, "dns verified"])

        except (AddressFormatError, DomainBlacklistedError, DomainNotFoundError, NoMXError):

            continue

        except Exception as ex:
            ve.append([e, str(ex).lower()[:-1]])

    return ve


'''


client = pymongo.MongoClient("mongodb+srv://admin:Mk4bCarwSAp6V7AXK42U@cluster0.iuyhs.mongodb.net/gatherer?retryWrites=true&w=majority")
db = client.gatherer
email_collection = db.email


'''
