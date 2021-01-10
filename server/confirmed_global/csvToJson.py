# use crontab to get the raw file 
import csv
import json
import shutil

with open('./csv/confirmed_global.csv') as f:
    reader = csv.DictReader(f)
    rows = list(reader)

with open('./confirmed_global.json', 'w') as f:
    json.dump(rows, f)

shutil.move("./confirmed_global.json", "confirmed_global.json")