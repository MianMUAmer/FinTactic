import numpy as np
import pandas as pd
# import matplotlib.pyplot as plt
from statsmodels.tsa.stattools import adfuller

closePrices = [12,34,56,78,90,133,100,86,34,56,90,90,12,56,78,89,90]
dates = ["12-04-2012","19-09-2012","18-08-2012","17-07-2012","23-08-2012","26-03-2012","30-11-2012","21-12-2012","18-04-2012","16-06-2012","12-12-2012","12-01-2012","02-09-2012","22-04-2012","13-09-2012","12-06-2012","14-09-2012"]
data = {'Dates': dates, 'Closing Price': closePrices}  
  
# Create DataFrame  
df = pd.DataFrame(data)  
print(df.describe())

test_result=adfuller(df['Closing Price'])
print(test_result)

# Updating the header
# df.columns=["Month","Sales"]
# df.head()
# df.describe()
# df.set_index('Month',inplace=True)

# from pylab import rcParams
# rcParams['figure.figsize'] = 15, 7
# df.plot()