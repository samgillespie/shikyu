/**
 * Created by Enigma on 22/05/2015.
 */

//This function specifies the animation used for AI removal
function AIImageRemove(obj)
{
    var orig_width = d3.select(obj).attr("width")

    d3.select(obj)
        .transition().duration(800)
        .attr("width",0)
        .transition().delay(2000)
        .style("opacity",0)
        .transition().delay(3000)
        .remove()
}

function AIImageRemoveTraditional(obj)
{
    d3.select(obj).attr("id","Removed")
        .on("mouseover",null)
        .on('mouseout',null)
        .on("click",null)
        .transition().duration(1000)
        .attr("x",xscale(7))
        .attr("y",yscale(5.6))
}

//This function will remove the specified choice by the AI
function GridRemove(choice)
{
    var cards = d3.selectAll("#NotSelected")
    var listtoremove = []
    if (choice == "row1") {listtoremove = [0,1,2]}
    else if (choice == "row2") {listtoremove = [3,4,5]}
    else if (choice == "row3") {listtoremove = [6,7,8]}
    else if (choice == "col1") {listtoremove = [0,3,6]}
    else if (choice == "col2") {listtoremove = [1,4,7]}
    else {listtoremove = [2,5,8]}

    setTimeout(function(){AIImageRemove(cards[0][listtoremove[0]])},1500)
    setTimeout(function(){AIImageRemove(cards[0][listtoremove[1]])},2000)
    setTimeout(function(){AIImageRemove(cards[0][listtoremove[2]])},2500)

}

function GetCardList(cardListRequest)
{
    playersTurn = false
    //Create an array of available Cards
    if (typeof availableCards == 'undefined')
    {
        var cubeJSONdata = cardListRequest.data;
        var Cards = cubeJSONdata[0].cards;
        draftSide = ""
        availableCards = [];

        for (i in Cards)
        {
            for (j in cardpoolJSON)
            {
                if (cardpoolJSON[j].code == i)
                {
                    cardType = cardpoolJSON[j].type_code;
                    if (draftSide = "")
                    {
                        draftSide = cardpoolJSON[j].side_code
                    }
                    break
                }
            }

            if (cardType == "identity")
            {
                continue;
            }

            for (j=1; j<= Cards[i];j++)
            {
                availableCards.push(i)
            }
        }
    }

}

function UpdateDraftGrid(cardsinpack,numberofpacks,AInum,iterate,cardListRequest)
{

    playersTurn = false
    //Create an array of available Cards
    GetCardList(cardListRequest)

    //If cards need to be cleared away, clear then away now.
    if (CardsSelected.length != 0)
    {
        //Move Currently Active Cards Away
        MoveCardsToEnd()

        for (i in CardsSelected)
        {
            draft.push(currentSelection[CardsSelected[i]])
        }
    }

    //currentSelection keeps track of what's selected - Grid Drafting
    currentSelection = [];


    //Check to see if the draft is over
    if (iterate >= numberofpacks)
    {
        CreateDeck()
        return
    }

    //SPAWN CARDS
    //Create Array [0:n] to create an array, and generate that many cards
    var array = Array.apply(null, Array(cardsinpack)).map(function (_, i) {return i;});
    var imageAddress = [];
    for (i in array)
    {
        currentCard = Math.floor(Math.random() * availableCards.length);  //Random Card
        currentSelection.push(availableCards[currentCard]);  //Add card to view
        availableCards.splice(currentCard,1);  //remove card from unselected card pool
        imageAddress.push("".concat(baseImageAddress,currentSelection[currentSelection.length-1],".png")) //Get imagename
    }

    //selected = counter of the number of cards selected
    var selected = 0;

    //Draw cards on screen
    var imgs = svg.selectAll("img").data(array);

    setTimeout(function()
    {
    imgs.enter()
        .append("image")
        .attr("xlink:href", function(d)
        {
            return imageAddress[d];
        })
        .attr("x", function(d)
        {
            return PlaceCardX(d,9)
        })
        .attr("y", function(d)
        {
            return PlaceCardY(d,9)
        })
        .attr("cardID",function(d){return d})
        .attr("cardNameID", function(d){return currentSelection[d]})
        .attr("width", function(){return xscale(1)})
        .attr("height", function(){return yscale(3.2)})
        .style("opacity",0)
        .attr("id","NotSelected")

        .transition().duration(2000).style("opacity",100)

        GiveLargeCardMouseover(d3.selectAll("#NotSelected"))


    if (AInum != 0)
    {
        //First round the player will go first
        var playerstart = iterate%2;
        if (playerstart == 0)
        {
            ToastPopup("Draft Pack "+ (iterate+1)+": Your Turn");
            playersTurn = true;
            d3.selectAll("svg").transition().duration(500).style("background","#111111")
        }
        else
        {
            d3.selectAll("svg").transition().duration(500).style("background","#000000")
            ToastPopup("Draft Pack "+(iterate+1)+": AI Player's Turn");
            AISelection = SelectGrid(currentSelection,LoadWeightings)
            svg.append("image").attr("xlink:href","menuimages/CrysisOnline.png")
                .attr("height",yscale(5))
                .attr('width',xscale(5))
                .attr("x",xscale(12))
                .attr("y",yscale(2))
                .transition().duration(500)
                .attr("x",xscale(5))
                .transition().delay(3500)
                .attr("x",xscale(12))
                .transition().delay(4500).remove()

            GridRemove(AISelection)
            setTimeout(function()
            {
                ToastPopup("Your Turn");
                d3.selectAll("svg").transition().duration(500).style("background","#111111")
                playersTurn = true;
            },4000)
        }

    }
    },1500)
    if (AInum == 0)
    {
        playersTurn = true
    }
}

function UpdateDraftTraditional(cardsinpack,numberofpacks,AInum,cardListRequest)
{

    //numberofpacks = Total number of cards to draft to
    var AIlist = ["crypsisblue.png", "crypsisred.png", "crypsisgreen.png", "crypsisyellow.png"]
    NumberOfCardsToChooseFrom = cardsinpack
    //Get Card list (Just in case)

    GetCardList(cardListRequest)
    if (iterate == 0)
    {
        currentSelection = [];
        packStartPlayer = ""
        packsopened = 0
        MaxCardsInPack = cardsinpack
    }

    console.log(currentSelection);


    if (draft.length >= numberofpacks)
    {
       CreateDeck()
       return
    }

    //Delay AI decision till new pack is open
    var delay =0


    //If there are no available cards, spawn a bunch of cards
    if (d3.selectAll("#NotSelected")[0].length == 0)
    {

        //Count number of packs opened
        packsopened++;

        //Change the start player for the pack based on who started the previous pack.
        if (packStartPlayer == "")
        {
            packStartPlayer = "Player"
        }
        else
        {
        if (AInum == 0)
        {
            packStartPlayer = "Player"
        }
        else if (packStartPlayer == "Player")
        {
            packStartPlayer = "AI1"
        }
        else
        {
            var current = packStartPlayer.slice(-1);
            if (current == AInum)
            {
                packStartPlayer = "Player"
            }
            else
            {
                packStartPlayer = "AI"+(parseInt(current)+1)
            }
        }
        }


        if (packStartPlayer == "Player")
        {
            console.log(iterate)
            while (iterate%(AInum+1)!=0)
            {
                iterate++
            }
        }
        else
        {
            var current = packStartPlayer.slice(-1);
            while (iterate%(AInum+1)!=current)
            {
                iterate++
            }
        }


        var RealNumberOfPacks = Math.ceil(numberofpacks * (AInum+1)/(cardsinpack))
        if (AInum != 0)
        {
            ToastPopup("Opening Pack: "+parseInt(packsopened)+" of "+RealNumberOfPacks)
        }

        delay = 2000

        var array = Array.apply(null, Array(cardsinpack)).map(function (_, i) {return i;   });
        //Purge Current Selection just in case
        currentSelection = []

        var imageAddress = [];
        for (i in array) {
            currentCard = Math.floor(Math.random() * availableCards.length);  //Random Card
            currentSelection.push(availableCards[currentCard]);  //Add card to view
            availableCards.splice(currentCard, 1);  //remove card from unselected card pool
            imageAddress.push("".concat(baseImageAddress, currentSelection[currentSelection.length - 1], ".png")) //Get imagename
        }

        //selected = counter of the number of cards selected
        var selected = 0;

        //Draw cards on screen

        var imgs = svg.selectAll("img").data(array);

        setTimeout(function () {
            imgs.enter()
                .append("image")
                .attr("xlink:href", function (d) {
                    return imageAddress[d];
                })
                .attr("x", function (d) {
                    return PlaceCardX(d, cardsinpack)
                })
                .attr("y", function (d) {
                    return PlaceCardY(d, cardsinpack)
                })
                .attr("cardID", function (d) {
                    return d
                })
                .attr("cardNameID", function (d) {
                    return currentSelection[d]
                })
                .attr("width", function () {
                    return xscale(1)
                })
                .attr("height", function () {
                    return yscale(3.2)
                })
                .style("opacity", 0)
                .attr("id", "NotSelected")
                .transition().duration(2000).style("opacity", 100)

            GiveLargeCardMouseoverTraditional(d3.selectAll("#NotSelected"))

        }, 1500)

    }


    if (iterate % (AInum + 1) == 1)
    {
        //Add delay because otherwise the first AI bugs out and chooses the players selection
        delay = delay+1000
    }

    //Check to see whose turn it is.  If it is the AI's turn, do that then.
    if (iterate % (AInum + 1) != 0)
    {
        //Get AI to select Card
        setTimeout(function(){
            svg.append("image").attr("xlink:href", "menuimages/" + AIlist[iterate % (AInum + 1)-1])
                .attr("height", yscale(5))
                .attr('width', xscale(5))
                .attr("x", xscale(12))
                .attr("y", yscale(2))
                .transition().duration(500)
                .attr("x", xscale(5))
                .transition().delay(2500)
                .attr("x", xscale(12))
                .transition().delay(3500).remove();

            ToastPopup("AI Player " + (iterate % (AInum + 1)) + "'s Turn");

            setTimeout(function ()
            {
                var cardtoremove = SelectTraditional(currentSelection, cardweightings);
                currentSelection.splice(cardtoremove, 1);
                var cards = d3.selectAll("#NotSelected");

                iterate++;
                AIImageRemoveTraditional(cards[0][cardtoremove]);



                setTimeout(function()
                {
                    UpdateDraftTraditional(cardsinpack, numberofpacks, AInum)
                },2000)

            }, 1000)
        },(delay+500))
    }
    else
    {
        setTimeout(function()
        {
            playersTurn = true
            ToastPopup("Your Turn");
        },delay)
    }
}


//SelectedInLine will grab all selected cards and work out whether the current selection is in a row.
//iterate needed to work out whether or not an AI has taken a row.
//Currently only works for a 3x3 Grid.
function SelectedInLine(iterate)
{
    //If the full 3x3 Grid is present
    if (iterate%2 == 0 || AInum == 0)
    {
        //row1
        if (CardsSelected.length == 3)
        {
            if (CardsSelected[0] == "0" && CardsSelected[1] == "1" && CardsSelected[2] == "2") { return true;}

            //row2
            else if (CardsSelected[0] == "3" && CardsSelected[1] == "4" && CardsSelected[2] == "5") { return true;}

            //row3
            else if (CardsSelected[0] == "6" && CardsSelected[1] == "7" && CardsSelected[2] == "8") { return true;}

            //col1
            else if (CardsSelected[0] == "0" && CardsSelected[1] == "3" && CardsSelected[2] == "6") { return true;}

            //col2
            else if (CardsSelected[0] == "1" && CardsSelected[1] == "4" && CardsSelected[2] == "7") { return true;}

            //col3
            else if (CardsSelected[0] == "2" && CardsSelected[1] == "5" && CardsSelected[2] == "8") { return true;}

            else {  ToastPopup("Select all cards in one Row or Column")  }
        }
        return false
    }
    else
    {
        //if a row or column (AISelection) is removed, consider all 6 possible cases manually.
        //There's gotta be a better way of doing this, but for now this will have to stay

        if (AISelection == "row1")
        {
            if(CardsSelected.length == 3)
            {
                //row2
                if (CardsSelected[0] == "3" && CardsSelected[1] == "4" && CardsSelected[2] == "5") { return true;}

                //row3
                else if (CardsSelected[0] == "6" && CardsSelected[1] == "7" && CardsSelected[2] == "8") { return true;}
            }

            else if (CardsSelected.length == 2)
            {
                //col1
                if (CardsSelected[0] == "3" && CardsSelected[1] == "6") { return true;}

                //col2
                else if (CardsSelected[0] == "4" && CardsSelected[1] == "7") { return true;}

                //col3
                else if (CardsSelected[0] == "5" && CardsSelected[1] == "8") { return true;}
            }
            return false;
        }
        else if (AISelection == "row2")
        {
            if(CardsSelected.length == 3)
            {
                //row2
                if (CardsSelected[0] == "0" && CardsSelected[1] == "1" && CardsSelected[2] == "2") { return true;}

                //row3
                else if (CardsSelected[0] == "6" && CardsSelected[1] == "7" && CardsSelected[2] == "8") { return true;}
            }

            else if (CardsSelected.length == 2)
            {
                //col1
                if (CardsSelected[0] == "0" && CardsSelected[1] == "6") { return true;}

                //col2
                else if (CardsSelected[0] == "1" && CardsSelected[1] == "7") { return true;}

                //col3
                else if (CardsSelected[0] == "2" && CardsSelected[1] == "8") { return true;}
            }
            return false;
        }

        else if (AISelection == "row3")
        {
            if(CardsSelected.length == 3)
            {
                //row2
                if (CardsSelected[0] == "0" && CardsSelected[1] == "1" && CardsSelected[2] == "2") { return true;}

                //row3
                else if (CardsSelected[0] == "3" && CardsSelected[1] == "4" && CardsSelected[2] == "5") { return true;}
            }

            else if (CardsSelected.length == 2)
            {
                //col1
                if (CardsSelected[0] == "0" && CardsSelected[1] == "3") { return true;}

                //col2
                else if (CardsSelected[0] == "1" && CardsSelected[1] == "4") { return true;}

                //col3
                else if (CardsSelected[0] == "2" && CardsSelected[1] == "5") { return true;}
            }
            return false;
        }

        else if (AISelection == "col1")
        {
            if(CardsSelected.length == 3)
            {
                //row2
                if (CardsSelected[0] == "1" && CardsSelected[1] == "4" && CardsSelected[2] == "7") { return true;}

                //row3
                else if (CardsSelected[0] == "2" && CardsSelected[1] == "5" && CardsSelected[2] == "8") { return true;}
            }

            else if (CardsSelected.length == 2)
            {
                //col1
                if (CardsSelected[0] == "1" && CardsSelected[1] == "2") { return true;}

                //col2
                else if (CardsSelected[0] == "4" && CardsSelected[1] == "5") { return true;}

                //col3
                else if (CardsSelected[0] == "7" && CardsSelected[1] == "8") { return true;}
            }
            return false;
        }
        else if (AISelection == "col2")
        {
            if(CardsSelected.length == 3)
            {
                //row2
                if (CardsSelected[0] == "0" && CardsSelected[1] == "3" && CardsSelected[2] == "6") { return true;}

                //row3
                else if (CardsSelected[0] == "2" && CardsSelected[1] == "5" && CardsSelected[2] == "8") { return true;}
            }

            else if (CardsSelected.length == 2)
            {
                //col1
                if (CardsSelected[0] == "0" && CardsSelected[1] == "2") { return true;}

                //col2
                else if (CardsSelected[0] == "3" && CardsSelected[1] == "5") { return true;}

                //col3
                else if (CardsSelected[0] == "6" && CardsSelected[1] == "8") { return true;}
            }
            return false;
        }
        else if (AISelection == "col3")
        {
            if(CardsSelected.length == 3)
            {
                //row2
                if (CardsSelected[0] == "0" && CardsSelected[1] == "3" && CardsSelected[2] == "6") { return true;}

                //row3
                else if (CardsSelected[0] == "1" && CardsSelected[1] == "4" && CardsSelected[2] == "7") { return true;}
            }

            else if (CardsSelected.length == 2)
            {
                //col1
                if (CardsSelected[0] == "0" && CardsSelected[1] == "1") { return true;}

                //col2
                else if (CardsSelected[0] == "3" && CardsSelected[1] == "4") { return true;}

                //col3
                else if (CardsSelected[0] == "6" && CardsSelected[1] == "7") { return true;}
            }
            return false;
        }
    }
}