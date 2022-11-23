import requests
from bs4 import BeautifulSoup
import pandas as pd
import time

df = pd.DataFrame(columns=["urls"])

url = f"https://studying-in-canada.org/universities/"

r = requests.get(url, headers={'User-Agent': 'nice'})

soup = BeautifulSoup(r.text, 'html.parser')

for a in soup.find_all('a'):
    link = a.get('href')
    if ('studying-in-canada' not in link) and ('http' in link):
        df.loc[len(df.index)] = [link]
        print(link)

df.to_csv('letsgo1.csv')