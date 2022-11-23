import requests
from bs4 import BeautifulSoup
import pandas as pd
import time

df = pd.DataFrame(columns=["urls"])

for i in range(1000):
    try:
        url = f"https://www.glassdoor.ca/Reviews/canada-reviews-SRCH_IL.0,6_IN3_IP{i}.htm"

        r = requests.get(url, headers={'User-Agent': 'nice'})

        soup = BeautifulSoup(r.text, 'html.parser')

        for a in soup.find_all('a'):
            link = a.get('href')
            if ('glassdoor' not in link) and ('Glassdoor' not in link) and ('http://' in link):
                df.loc[len(df.index)] = [link]
                print(link)
    except:
        print('failed!')

    # time.sleep(5)

df.to_csv('letsgo.csv')


