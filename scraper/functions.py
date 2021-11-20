import os
import logging as lg
from lxml import html, etree
from lxml.html.clean import Cleaner
import re
from email_validator import validate_email, EmailNotValidError
    
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
    try:
        html_str = inner_html(response.text)
        for e in re.findall("[\w.+-]+@[\w-]+\.[\w.-]+", html_str):
            try:
                valid = validate_email(e)
                t.append(valid.email)
            except EmailNotValidError as e:
                pass

    except Exception as e:
        lg.exception(f"Email processing error 1: {e}")

    try:
        tree = etree.HTML(response.text)
        emails = tree.xpath("//a[contains(@href,'mailto')]")
        for email in emails:
            sanitized_email = email.get("href").replace("mailto:", "").lower().split("?")[0]
            try:
                valid = validate_email(sanitized_email)
                t.append(valid.email)
            except EmailNotValidError as e:
                pass

    except Exception as e:
        lg.exception(f"Email processing error 2: {e}")


    return t



'''


client = pymongo.MongoClient("mongodb+srv://admin:Mk4bCarwSAp6V7AXK42U@cluster0.iuyhs.mongodb.net/gatherer?retryWrites=true&w=majority")
db = client.gatherer
email_collection = db.email


'''