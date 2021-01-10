# use crontab to get the raw file 
import csv
import json
import shutil

with open('./csv/deaths_us.csv') as f:
    reader = csv.DictReader(f)
    rows = list(reader)

with open('./deaths_us.json', 'w') as f:
    json.dump(rows, f)

shutil.move("./deaths_us.json", "deaths_us.json")