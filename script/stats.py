import json
from urllib import request
import pandas as pd
from pandas import NA
import numpy  as np
import datetime
from urllib.request import urlopen


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

    tag = []
    if (pd.isna(str) == False) & (github_projects_info.__contains__(str)):

        if github_projects_info[str].__contains__('tag'):
            tag = github_projects_info[str]['tag'].split(',')

        if github_projects_info[str].__contains__('children'):
            for key in github_projects_info[str]['children'].keys():
                tag = tag + github_projects_info[str]['children'][key]['tag'].split(',')
    tag = ','.join(tag)
    committees_info['committees'][str]['tag'] = tag

    return tag


# Add tags to projects
def addTag(raw_df):
    df = raw_df
    df['tag'] = df['committee'].apply(getTag)
    return df

def getRepoData(str):

    repo = {}
    if (pd.isna(str) == False) & (github_projects_info.__contains__(str)):

        if github_projects_info[str].__contains__('repo'):
            repo = json.loads(github_projects_info[str]['repo'])

    committees_info['committees'][str]['repo'] = repo

    return repo
    
def addRepoData(raw_df):
    df = raw_df
    df['repo'] = df['committee'].apply(getRepoData)
    return df


def getData(raw_df):
    df = raw_df.groupby(['committee','year'])['name'].count().to_frame()
    df.reset_index(inplace=True) #turn the grouped indexes into columns
    df.rename(columns={'name':'size'},inplace=True)
    result_df = chartData(df)

    return result_df

# Remove meaningless tags
def tagFilter(df):
    tag_list =list(set(','.join(list(df['tag'])).split(',')))
    tag_list.remove('')

    for tag in tag_remove_list:
        tag_list.remove(tag)

    return tag_list

# Grouped by tag
def scatterData(raw_df):
    df = addRepoData(addTag(raw_df))
    tag_list = tagFilter(df)
    result = {}
    for tag in tag_list:
        sub_df = df[ df['tag'].apply(lambda x: tag in x.split(','))]
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
    df['year_month'] = df['year'].map(str) + df['month'].map(str)
    result_dict = committees_info

    for committee in committee_list:
        pmc_dict = {}
        sub_df = df[df['committee'] == committee]
        date_list = list(sub_df['year_month'])

        for date in date_list:

            pmc_dict[date] = list(sub_df[sub_df['year_month'] == date]['add'])[0]

        result_dict['committees'][committee]['pmc'] = pmc_dict
    

    return result_dict


def addPMC(raw_df):
    df = raw_df.groupby(['committee','year','month'])['name'].count().to_frame()
    df.reset_index(inplace = True)
    df.rename(columns={'name':'add'},inplace=True)
    result_dict = completeMonthColumn(df)
    return result_dict
    


def getPMCMemeber(committees):
    # Create a datafame, which contains the members' information for each committee: committee name, name, id, date
    pmc_member = pd.DataFrame()
    for item in committees:
        committee_info = pd.DataFrame.from_dict(committees[item]['roster'],orient='index',columns=['name','date'])
        committee_info['committee'] = item
        committee_info['description'] = committees[item]['description']

        pmc_member = pd.concat([pmc_member,committee_info],axis = 0)

    pmc_member['date'] = pd.to_datetime(pmc_member['date'])
    pmc_member['year'] = pmc_member['date'].dt.year
    pmc_member['month'] = pmc_member['date'].dt.month
    committee_list = list(set(pmc_member['committee']))

    return pmc_member, committee_list


def readJson(json_file):
    if json_file.startswith('http'):
        response = urlopen(json_file) 
        json_str = response.read()
    else:
        json_str = open(json_file,encoding='utf-8').read()

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


# Check if the logo URL is available
def checkURL(url):
    
    try:
        urlopen(url).code
        return True
    except Exception as e:
            
        return False


def addLogoToCommittee(raw_dict):
    projects = raw_dict
    for project_name in projects.keys():
        print('accessing the logo URL of %s ...'%project_name)
        logo_url = 'https://apache.org/logos/res/%s/default.png' %project_name
        if checkURL(logo_url):
            projects[project_name]['logo'] = logo_url   
        else:
            print("%s's logo URL access is invalid"%project_name)
        
    return projects


def getCommittees(url):
    committees_info = readJson(url)
    committees = committees_info['committees']

    # Adding a logo to the committee
    committees_info['committees'] = addLogoToCommittee(committees_info['committees'])

    pmc_member, committee_list = getPMCMemeber(committees)
    committees = pd.DataFrame.from_dict(committees,orient='index',columns=[ "display_name","established","roster_count"])
    committees['established'] = pd.to_datetime(committees['established'].map(extractDate))
    committees['description'] = [committees_info['committees'][index]['description'] for index in committees.index]
    committees.reset_index(inplace=True)
    committees.rename(columns={'index':'committee_name'},inplace=True)

    return committees,pmc_member,committees_info, committee_list

if __name__ == '__main__':
    today = datetime.datetime.today()

    # If the projects_total.json file does not exist, you need to execute the spider.py file first
    github_projects_info  = readJson('./public/json/projects_total.json')

    # meaningless tags list
    tag_remove_list =['apache']

    # Read the information in 'committee-info.json' which contains information such as roste_count, description, established, roster, etc.
    # The 'committee-info.json' was downloaded from 'https://whimsy.apache.org/public/'
    # or get data directly from 'https://whimsy.apache.org/public/committee-info.json'

    committees,pmc_member,committees_info, committee_list = getCommittees('https://whimsy.apache.org/public/committee-info.json')
    committees_info = addPMC(pmc_member)

    scatter = scatterData(pmc_member)

    committee_data = {
        "committees":committees_info['committees'],
        'scatter':scatter
    }

    file_name = './public/json/committee.json'
    saveData(committee_data,file_name)