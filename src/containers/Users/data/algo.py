import pandas as pd
import numpy as np

def my_round(num):
    if num < 0.01:
        num = 0
    else:
        num = np.round(num,4)
    return num

df = pd.read_csv("./tec_cp.csv", dtype={"d_cp":object})
df.dtypes
df["date"] = df.date.map(lambda x: x[0:10])
df["ratio"] = df.ratio.map(lambda x: my_round(x))
df.to_csv("./round_tec_cp.csv",index=False)
