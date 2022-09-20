import json
import pandas as pd
from pandas import NA
import numpy  as np
import datetime
from urllib.request import urlopen


# Show all data 
pd.set_option('display.max_columns',None)
pd.set_option('display.max_rows',None)



def dataFilter(raw_df):
    
    committee_list = raw_df['committee']
    drop_list = []
    for committee_name in committee_list:
        sub_df = raw_df[raw_df['committee'] == committee_name] 
        if sub_df['size'].max() < 15:
            drop_list.append(committee_name)
            index = raw_df[raw_df['committee'] == committee_name].index[0]
            raw_df = raw_df.drop(index=index)
    return raw_df


def chartData(raw_df):

    yAxis_value = list(set(raw_df['committee']))
    xAxis_value = list(set(raw_df['year']))
    xAxis_value.sort()
    size_value = []
    for index, row in raw_df.iterrows():
        size_value.append([yAxis_value.index(row['committee']),xAxis_value.index(row['year']),row['size']])
    
    return {
        'yAxis':yAxis_value,
        'xAxis':xAxis_value,
        'size':size_value
    }


def getTag(str):
    if pd.isna(str) == False:
        try:
            return tag_dict[str]["tag"]
        except:
            return str
    else:
        return ''
    

def addTag(raw_df):
    df = raw_df
    df['tag'] = df['committee'].apply(getTag)
    return df


def getData(raw_df):
    df = raw_df.groupby(['committee','year'])['name'].count().to_frame()
    df.reset_index(inplace=True) #turn the grouped indexes into columns
    df.rename(columns={'name':'size'},inplace=True)
    result_df = chartData(df)

    return result_df

# Grouped by tag
def ScatterData(raw_df):
    df = addTag(raw_df)
    tag_list =list(set(','.join(list(df['tag'])).split(',')))
    tag_list.remove('')
    tag_list.remove('apache')
    result = {}
    for tag in tag_list:
        sub_df = df[ df['tag'].apply(lambda x: tag in x)]
        sub_dict = getData(sub_df)
        result[tag] = sub_dict
        result[tag]['num'] = len(sub_dict['yAxis'])
    res = sorted(result.items(),key=lambda x:x[1]['num'],reverse=True)
    scatter_dict = {}
    for r in res:
        scatter_dict[r[0]] = r[1]
    return scatter_dict
        
    

# Subchart: monthly growth graph for the selected committee 
def completeMonthColumn(df):
    # Complete the year-months from the date of creation to the present
    df['year_month'] = df['year'].map(str) +'-' +df['month'].map(str)
    result_dict = {}

    for committee in committeeList:
        sub_df = df[df['committee'] == committee]
        year_list = sub_df['year']
        date_list = list(sub_df['year_month'])
        date_list_new = [str(year) + '-' + str(month) for year in range(int(year_list.min()),today.year + 1) for month in range(1,13)]
        data_list_min = date_list[0]
        data_list_max = str(today.year) + '-' + str(today.month)
        date_list_new = date_list_new[date_list_new.index(data_list_min):date_list_new.index(data_list_max)+1]
        add_list =[]
        for date in date_list_new:
            if date in date_list:
                add_list.append(list(sub_df[sub_df['year_month'] == date]['add'])[0])
            else:
                add_list.append(0)
        result_dict[committee] = {
            'xAxis':date_list_new,
            'values':add_list,
            'description':committees_info['committees'][committee]["description"],
            'established':committees_info['committees'][committee]["established"]
        }
        

    return result_dict
            
def lineData(raw_df):
    df = raw_df.groupby(['committee','year','month'])['name'].count().to_frame()
    df.reset_index(inplace = True)
    df.rename(columns={'name':'add'},inplace=True)
    result_dict = completeMonthColumn(df)
    return result_dict
    


def getCommitter(committees):
    # Create a datafame, which contains the members' information for each committee: committee name, name, id, date
    committer = pd.DataFrame()
    print(committees)
    for item in committees:
        committee_info = pd.DataFrame.from_dict(committees[item]['roster'],orient='index',columns=['name','date'])
        committee_info['committee'] = item
        committee_info['description'] = committees[item]['description']

        committer = pd.concat([committer,committee_info],axis = 0)

    committer['date'] = pd.to_datetime(committer['date'])
    committer['year'] = committer['date'].dt.year
    committer['month'] = committer['date'].dt.month
    committeeList = list(set(committer['committee']))

    return committer, committeeList


def readJson(json_file):
    if json_file.startswith('http'):
        response = urlopen(json_file) 
        json_str = response.read()
    else:
        json_str = open(json_file).read()

    json_data = json.loads(json_str)
    return json_data


def extractDate(x):
    if x:
        return x.replace(',',';').split(';')[0]
    else:
        return NA

def saveData(dict,file_name,mode='w'):

    with open(file_name, mode, encoding='utf-8') as file_obj:
        json.dump(dict,file_obj, indent=4, ensure_ascii=False)


def getCommittees(url):
    committees_info = readJson(url)
    committees = committees_info['committees']
    committer, committeeList = getCommitter(committees)
    committees = pd.DataFrame.from_dict(committees,orient='index',columns=[ "display_name","established","roster_count"])
    committees['established'] = pd.to_datetime(committees['established'].map(extractDate))
    committees['description'] = [committees_info['committees'][index]['description'] for index in committees.index]
    committees.reset_index(inplace=True)
    committees.rename(columns={'index':'committee_name'},inplace=True)

    return committees,committer,committees_info, committeeList

if __name__ == '__main__':
    today = datetime.datetime.today()

    # If the projects_total.json file does not exist, you need to execute the spider.py file first
    tag_dict  = readJson('./public/json/projects_total.json')

    # Read the information in 'committee-info.json' which contains information such as roste_count, description, established, roster, etc.
    # The 'committee-info.json' was downloaded from 'https://whimsy.apache.org/public/'
    # or get data directly from 'https://whimsy.apache.org/public/committee-info.json'

    committees,committer,committees_info, committeeList = getCommittees('https://whimsy.apache.org/public/committee-info.json')

    scatter = ScatterData(committer)
    committee_detail_dict = lineData(committer)

    committee_data = {
        'scatter':scatter,
        "committee_detail":committee_detail_dict
    }

    file_name = './public/json/committer.json'
    saveData(committee_data,file_name)