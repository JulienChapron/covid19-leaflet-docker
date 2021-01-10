# use crontab to get the raw file 
import csv
import json
import shutil

with open('./csv/daily_Covid19.csv') as f:
    reader = csv.DictReader(f)
    rows = list(reader)

with open('./json/daily_Covid19.json', 'w') as f:
    json.dump(rows, f)

shutil.move("./json/daily_Covid19.json", "./daily_Covid19.json")