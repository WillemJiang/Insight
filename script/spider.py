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
    except Exception as e:
        
        page = e.partial
        html = page.decode('utf-8')

    return html


def htmlToDict(html):

    soup = BeautifulSoup(html,"lxml")
    dict = {}

    repo_list = soup.find_all("li",class_="Box-row")
    for repo in repo_list:

        name, programmingLanguage = getDetail(repo)
        tag = getTag(repo)

        dict[name]={}
        dict[name]['programmingLanguage'] = programmingLanguage
        dict[name]['tag'] = tag
    
    return dict


def getTag(soup):

    try:
        tag_list = [tag.text.strip() for tag in soup.find_all('a',class_='topic-tag')]
        tagStr = ','.join(tag_list)
    except:
        print(tag_list)
        return ''

    return tagStr


def getDetail(soup):

    try: 
        name = soup.find('a',class_='d-inline-block').text.strip()
        language = soup.find('span',class_='mr-3').text.strip()
    except:
        print(soup.find('span',class_='mr-3'))
        return name,''
    
    return name, language


def Merge(dict1, dict2): 

    res = {**dict1, **dict2} 
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
        dic = htmlToDict(html)
        dict = Merge(dict,dic) 
    return dict


def saveData(dict,file_name,mode='w'):

    with open(file_name, mode, encoding='utf-8') as file_obj:
        json.dump(dict,file_obj, indent=4, ensure_ascii=False)



if __name__ == '__main__':
    data = getTotal()
    saveData(data,'./public/json/projects_total.json')