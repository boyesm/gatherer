import pandas as pd

df = pd.read_csv("files/corncob_lowercase.txt", sep=r'\s{2,}')
words = df["Words"].values.tolist()
# print(len(words))

df = pd.read_csv("files/us_firstnames_f.csv")
fn_f = df["Name"].values.tolist()

df = pd.read_csv("files/us_firstnames_m.csv")
fn_m = df["Name"].values.tolist()

df = pd.read_csv("files/us_surnames.csv")
fn = df["Name"].values.tolist()

names = fn_f + fn_m + fn
# print(len(names))

# def common(lst1, lst2):
#     return list(set(lst1) & set(lst2))
def common(a,b):
    c = [value for value in a if value in b]
    return c


# print(common(names, words))
print(set(names).intersection(words))

# print(common([1, 2, 4], [2, 5, 7]))