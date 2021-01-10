# use crontab to get the raw file 
import csv
import json
import shutil

with open('./csv/recovered_global.csv') as f:
    reader = csv.DictReader(f)
    rows = list(reader)

with open('./recovered_global.json', 'w') as f:
    json.dump(rows, f)

shutil.move("./recovered_global.json", "recovered_global.json")