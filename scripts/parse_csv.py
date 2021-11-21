import pandas as pd


df = pd.read_csv("files/us_firstnames_f.csv")
fn_f = df["Name"].values.tolist()
fn_f = fn_f[:100]

df = pd.read_csv("files/us_firstnames_m.csv")
fn_m = df["Name"].values.tolist()
fn_m = fn_m[:100]

print(fn_f + fn_m)

df = pd.read_csv("files/us_surnames.csv")
fn = df["Name"].values.tolist()
fn = fn[:200]
print(fn)
