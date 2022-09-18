from datetime import datetime

# "Fri, 01 Apr 2022 00:00:00 GMT" -> date object date(2022,4,1)
def sql_date_to_date_obj(sql_date):
    date_only_str = ' '.join(sql_date.split(' ')[1:4])
    return datetime.date(datetime.strptime(date_only_str, '%d %b %Y'))

