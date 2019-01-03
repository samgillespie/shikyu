import requests
import os
import urllib

##Get latest cards
cardscall = "http://netrunnerdb.com/api/2.0/public/cards"
response = requests.get(cardscall)
resp = response.json()
cards = resp["data"]

downloadedcards = os.listdir("E:\Shi-Kyu\images")
for i in enumerate(downloadedcards):
    code = i[1].split(".")
    code = code[0]
    downloadedcards[i[0]] = code

for i in cards:
    code = str(i[u'code'])
    if (code in downloadedcards) == False:
        try:
            imageurl = i["imagesrc"]
        except:
            imageurl = "https://netrunnerdb.com/card_image/"+code+".png"
        
        try:
            urllib.urlretrieve(imageurl,"E:\Shi-Kyu\images\\"+code+".png")
            print imageurl
        except:
            print code+" Failed"
