# Ski Kyu - A Netrunner Card Drafting Simulator

This project was a personal pet project to create a simulation of a netrunner draft, without requiring the significant overhead of manually building a cube and managing a significant cardpool.  The core of this project is built using D3.js.   This project can be viewed live at shi-kyu.com.   As this was a personal project designed for me to learn more about d3.js, the code is a bit messy, and documentation is poor.

## Further technical information

 - Animations and canvas operations are done using d3.js - which is a library more designed for visual display of analytics.  Check out some code tutorials and examples here for reference -https://d3js.org/
 - Card data is gathered from NetrunnerDB, polling their API for information around cards.  I also downloaded a local copy of each card, rather than lean on their bandwidth (which would just be rude and slow).  To download all the images, there's a python script getimages.py that will scrape NetrunnerDB.  Be nice and don't abuse this.
 - Game logic is all written in standard Javascript, with nothing fancy under the hood.  I believe there's some jQuery involved.
 - AI is simply the number of decks that a card appears in. Basically it's just selecting for card popularity, which for a proof off concept meant that it took people's favourite cards (i.e. Jackson Howard), which gave the desired effect of "Hey I wanted that"
 - Code runs out of an S3 bucket on AWS
 
## Questions
For any further questions or enquiries, feel free to reach out to me at samgillespie90@gmail.com