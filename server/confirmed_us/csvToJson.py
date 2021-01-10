# use crontab to get the raw file 
import csv
import json
import shutil

with open('./csv/confirmed_us.csv') as f:
    reader = csv.DictReader(f)
    rows = list(reader)

with open('./confirmed_us.json', 'w') as f:
    json.dump(rows, f)

shutil.move("./confirmed_us.json", "confirmed_us.json")