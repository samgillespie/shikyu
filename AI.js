//This fun
function getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray);
}

function LoadWeightings(data) {
    //Data is usable here
    cardweightings = data;
}

function parseData(url, callBack) {
    Papa.parse(url, {
        download: true,
        complete: function(results) {
            callBack(results.data);
        }
    });
}

function SelectTraditional(cards,cardweightings)

{
    //for testing
    //cards = ["04078", "06067", "04030", "02051", "02033", "03004", "02032"]
    var selection = Array.apply(null, new Array(cards.length)).map(Number.prototype.valueOf,0);
    for (i in cardweightings)
    {
        var enumerate = 0
        for (j in cards)
        {
            if (cardweightings[parseInt(i)][0]==cards[j])
            {
                selection[enumerate]=parseInt(cardweightings[parseInt(i)][1])
            }
            enumerate = enumerate+1
        }
    }

    var cardselected = selection.indexOf(getMaxOfArray(selection));

    return cardselected;
}

function SelectGrid(cards,cardweightings)
{

    //cards = ["01099", "03005", "06069", "02033", "02053", "07014", "05011", "02052", "05017"]
    var selection = Array.apply(null, new Array(cards.length)).map(Number.prototype.valueOf,0);
    for (i in cardweightings)
    {
        var enumerate = 0
        for (j in cards)
        {
            if (cardweightings[parseInt(i)][0]==cards[j])
            {
                selection[enumerate]=parseInt(cardweightings[parseInt(i)][1])
            }
            enumerate = enumerate+1
        }
    }

    //arrangements [0,1,2] [0,3,6]
    var row1 = selection[0]+selection[1]+selection[2];
    var row2 = selection[3]+selection[4]+selection[5];
    var row3 = selection[6]+selection[7]+selection[8];
    var col1 = selection[0]+selection[3]+selection[6];
    var col2 = selection[1]+selection[4]+selection[7];
    var col3 = selection[2]+selection[5]+selection[8];
    var arrangement = ["row1","row2","row3","col1","col2","col3"]
    var results = [row1,row2,row3,col1,col2,col3]

    var cardsselected = arrangement[results.indexOf(getMaxOfArray(results))];

    return cardsselected;



}


parseData("data/AICardSelection.csv", LoadWeightings);