# use crontab to get the raw file 
import csv
import json

with open('./csv/alpha3_country.csv') as f:
    reader = csv.DictReader(f)
    rows = list(reader)

with open('./json/alpha3_country.json', 'w') as f:
    json.dump(rows, f)
