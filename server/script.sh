#!/bin/sh
cd /var/www/html/Server/recovered_global
rm time_series_covid19_recovered_global.csv
wget https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv 
chmod +x csvToJson.py && python csvToJson.py >> logfile.log 2&>1
chmod 770 recovered_global.json
cd /var/www/html/Server/deaths_global
rm time_series_covid19_deaths_global.csv
wget https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv 
chmod +x csvToJson.py && python csvToJson.py >> logfile.log 2&>1
chmod 770 deaths_global.json
cd /var/www/html/Server/confirmed_global
rm time_series_covid19_confirmed_global.csv
wget https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv 
chmod +x csvToJson.py && python csvToJson.py >> logfile.log 2&>1
chmod 770 confirmed_global.json
cd /var/www/html/Server/confirmed_us
rm time_series_covid19_confirmed_US.csv
wget https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv 
chmod +x csvToJson.py && python csvToJson.py >> logfile.log 2&>1
chmod 770 confirmed_us.json
cd /var/www/html/Server/deaths_us
rm time_series_covid19_deaths_US.csv
wget https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_US.csv 
chmod +x csvToJson.py && python csvToJson.py >> logfile.log 2&>1
chmod 770 deaths_us.json

