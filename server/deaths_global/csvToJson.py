# use crontab to get the raw file 
import csv
import json
import shutil

with open('./csv/global_deaths.csv') as f:
    reader = csv.DictReader(f)
    rows = list(reader)

with open('./deaths_global.json', 'w') as f:
    json.dump(rows, f)

shutil.move("./deaths_global.json", "deaths_global.json")