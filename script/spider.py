from cmath import log
import urllib.request
import time
import re
from bs4 import BeautifulSoup
import json
import ssl

# Set up uncertification
ssl._create_defualt_https_context = ssl._create_unverified_context


def getHtml(url):
    #Refactoring request headers to masquerade as Microsoft Edge browser access
    headers = {
        'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.81 Safari/537.36 Edg/104.0.1293.54'
    }
    # Create request instances
    try:
        req = urllib.request.Request(url = url,headers =headers)

        # sends a request to the URL
        response=urllib.request.urlopen(req)

        # extract the response
        html = response.read().decode('utf-8')
    except TimeoutError as t:
        print('Access timeout!')
        

    return html


def htmlToDict(raw_dict,html):

    soup = BeautifulSoup(html,"lxml")
    res_dict = raw_dict

    repo_list = soup.find_all("li",class_="Box-row")
    for repo in repo_list:
        name_str, dic= getDetail(repo)
        tag = getTag(repo)
        dic['tag'] = tag

        res_dict = Merge(res_dict, name_str, dic) 
    
    return res_dict


def getTag(soup):

    tag_a_list = soup.find_all('a',class_='topic-tag')

    if len(tag_a_list) > 0:
        tag_list = [tag.text.strip() for tag in tag_a_list]
        tagStr = ','.join(tag_list)
    else:
        return ''

    return tagStr


def getParentText(soup):
    if soup != None:
        return soup.parent.text.strip()

    return ''

def getDetail(soup):

    name= soup.find('a',class_='d-inline-block').text.strip()
    description = soup.find('p',class_ = 'wb-break-word').text.strip()
    programmingLanguage = getParentText(soup.find('span',class_="repo-language-color"))
    issue =getParentText(soup.find('svg',class_="octicon-issue-opened"))
    star = getParentText(soup.find('svg',class_="octicon-star"))
    pr = getParentText(soup.find('svg',class_= "octicon-git-pull-request"))
    fork = getParentText(soup.find('svg',class_="octicon-repo-forked"))

    return name, {
        "description":description,
        "programmingLanguage":programmingLanguage,
        "issue":issue,
        "star":star,
        "pr":pr,
        "fork":fork
    }


def Merge(dict1, name_str, dict2): 

    res = dict1
    name_list = name_str.split('-')
    name = name_list[0]

    if res.__contains__(name) == False:
        res[name] = {
            'logo':'https://apache.org/logos/res/%s/default.png' %name
        }

    if len(name_list) > 1:
        if res[name].__contains__('children') == False:
            res[name]['children'] = {}

        
        res[name]['children'][name_str] = dict2

    else:
        res[name] = {**res[name],**dict2}

    return res


def getTotal():
    
    soup = BeautifulSoup(getHtml('https://github.com/orgs/apache/repositories?type=all'),"lxml")
    total_page = int(re.findall('data-total-pages="(.*?)"',str(soup.find_all('em',class_="current")[0]))[0])
    print('There are %s pages in total'%total_page)
    dict = {}
    for page in range(1,total_page + 1):

        time.sleep(.6)
        print('page'+ str(page) + ' is running ...')
        url = "https://github.com/orgs/apache/repositories?page=%s&type=all" %page
        html = getHtml(url)
        dict = htmlToDict(dict,html)
    return dict


def saveData(dict,file_name,mode='w'):

    with open(file_name, mode, encoding='utf-8') as file_obj:
        json.dump(dict,file_obj, indent=4, ensure_ascii=False)



if __name__ == '__main__':
    data = getTotal()
    saveData(data,'./public/json/projects_total.json')