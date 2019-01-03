/**
 * Created by Enigma on 19/05/2015.
 */
//This file contains all the necessary functions to move and manipulate the available cards on screen.


function GiveLargeCardMouseover(group)
{
    group.on('mouseover', function() {
        var imagename = this.getAttribute("href")
        //Create a duplicate of the current image
        svg.selectAll("imgLarge").data([1])
            .enter()
            .append('image')
            .attr("x", xscale(6.5))
            .attr("y", yscale(1))
            .attr('id', "CardZoom")
            .attr('height', yscale(8))
            .attr('width', xscale(3.5))
            .attr("xlink:href", imagename)
            .style("opacity", 0)
            .on("click", function () {
                ShowPreviousSelection()
            })
            .transition()
            .style("opacity", 1);
    })
    group.on("mouseout",function(){
        svg.selectAll("#CardZoom").transition().style("opacity",0)
            .transition().delay(500).remove();
    })

    group.on("click",function()
    {
        if (playersTurn == true){
            //This function should move a card to a "selected" status, and once the correct number
            //of cards has been selected, these cards should move into the saved position and then update the draft
            if (this.getAttribute("id") == "NotSelected")
            {
                SelectCard(this)
            }
            else
            {
                DeSelectCard(this)
            }

            //Therefore there's two functions at play
            CardsSelected.sort();

            if (SelectedInLine(iterate))
            {
                //push to draft
                var selected = d3.selectAll("#Selected")
                for (i in CardsSelected)
                {
                    draft.push(currentSelection[CardsSelected[i]])
                    d3.select(selected[0][i]).attr("selectedID",draft.length-1)
                }

                d3.selectAll("#CardZoom").remove()
                iterate = iterate+1
                UpdateDraftGrid(cardsinpack,numberofpacks,AInum,iterate);
            }
        }
    })
}

function GiveLargeCardMouseoverTraditional(group)
{
    group.on('mouseover', function() {
        var imagename = this.getAttribute("href")
        //Create a duplicate of the current image
        svg.selectAll("imgLarge").data([1])
            .enter()
            .append('image')
            .attr("x", xscale(6.5))
            .attr("y", yscale(1))
            .attr('id', "CardZoom")
            .attr('height', yscale(8))
            .attr('width', xscale(3.5))
            .attr("xlink:href", imagename)
            .style("opacity", 0)
            .on("click", function ()
            {
                ShowPreviousSelection()
            })
            .transition()
            .style("opacity", 1);
    })
    group.on("mouseout",function(){
        svg.selectAll("#CardZoom").transition().style("opacity",0)
            .transition().delay(500).remove();
    })

    setTimeout(function()
    {
        group.on("click",function()
        {
            if (playersTurn == true)
            {
                //This function should move a card to a "selected" status, and once the correct number
                //of cards has been selected, these cards should move into the saved position and then update the draft
                SelectCard(this)
                playersTurn = false;

                this.setAttribute("selectedID",draft.length)

                cardIDtoremove = this.getAttribute("cardNameID")


                draft.push(cardIDtoremove)

                for (i=0;i<=currentSelection.length;i++)
                {
                    if (currentSelection[i] == cardIDtoremove)
                    {
                        currentSelection.splice(i,1);
                    }
                }
                console.log("#####PLAYER SELECTION#####")
                console.log(currentSelection)
                MoveCardsToEndTraditional();
                svg.selectAll("#DraftTextPlayerCards").text("Selected Cards "+draft.length+"/"+numberofpacks)
                iterate++;
                if (AInum == 0)
                {
                    if (cardsinpack >= 2)
                    {

                        UpdateDraftTraditional(cardsinpack-1,numberofpacks,AInum);
                        cardsinpack--
                    }
                    else
                    {
                        cardsinpack = MaxCardsInPack
                        UpdateDraftTraditional(MaxCardsInPack,numberofpacks,AInum);

                    }
                }
                else
                {
                    UpdateDraftTraditional(cardsinpack,numberofpacks,AInum);
                }
            }
        })
    })
}

function PlaceCardX(num,maxnum)
{
    if (maxnum <= 3 || maxnum == 6 || maxnum == 9 )
    {
        return xscale(1.5*(num%3)+0.5)
    }

    else if (maxnum == 4)
    {
        return xscale(1.5*(num%2)+0.5)
    }

    else if (maxnum == 5)
    {
        if (num == 2)
        {
            return xscale(2)
        }
        return xscale(3.0*(num%2)+0.5)
    }

    else if (maxnum == 7)
    {
        if (num <= 2)
        {
            return xscale(1.5*(num%3)+0.5)
        }
        if (num == 3)
        {
            return xscale(2)
        }
        else
        {
            return xscale(1.5*((num+1)%3)+0.5)
        }
    }

    else if (maxnum == 8)
    {
        if (num <= 3)
        {
            return xscale(1.5*(num%3)+0.5)
        }
        else
        {
            return xscale(1.5*((num+1)%3)+0.5)
        }
    }
    else if (maxnum == 10)
    {
        if (num <= 4)
        {
            return xscale(1.5*(num%4)+0.5)
        }
        else if (num >= 5)
        {
            return xscale(1.5 * ((num + 2) % 4) + 0.5)
        }
    }
    else if (maxnum == 11)
    {
        if (num <= 4)
        {
            return xscale(1.5*(num%4)+0.5)
        }
        else if (num == 5)
        {
            return xscale(1.5*1.5+0.5)
        }
        else
        {
            return xscale(1.5*((num+1)%4)+0.5)
        }
    }
    else if (maxnum == 12)
    {
        return xscale(1.5 * (num % 4) + 0.5)
    }
}

function PlaceCardY(num,maxnum)
{
    if (maxnum <= 3 || maxnum == 6 || maxnum == 9) {
        return yscale(3.2 * parseInt(num / 3))
    }

    else if (maxnum == 4) {
        return yscale(3.2 * parseInt(num / 2))
    }

    else if (maxnum == 5) {
        if (num == 2) {
            return yscale(3.2)
        }
        return yscale(3.2 * parseInt(num / 3 * 2))
    }

    else if (maxnum == 7) {
        var addedterm = 0
        if (num == 0 || num == 2 || num == 4 || num == 5)
        {addedterm = 1 }else {addedterm = 0}


        if (num <= 2) {
            return yscale(3.2 * parseInt(num / 3)+addedterm)
        }
        if (num == 3)
        {
            return yscale(3.2 * parseInt(num / 3))
        }
        else
        {
            return yscale(3.2 * parseInt((num + 2) / 3)-addedterm)
        }
    }

    else if (maxnum == 8)
    {
        if (num <= 4) {
            return yscale(3.2 * parseInt(num / 3))
        }
        else {
            return yscale(3.2 * parseInt((num + 1) / 3))
        }
    }

    else if (maxnum == 10)
    {
        if (num <= 5)
        {
            return yscale(3.2*parseInt(num/4))
        }
        else
        {
            return yscale(3.2*parseInt((num+2)/4))
        }

    }

    else if (maxnum == 11)
    {
        if (num <= 6)
        {
            return yscale(3.2 * parseInt((num) / 4))
        }
        else
        {
            return yscale(3.2 * parseInt((num + 1) / 4))
        }
    }

    else if (maxnum == 12)
    {
        return yscale(3.2 * parseInt((num) / 4))
    }
}

function SelectCard(card)
{
    card.setAttribute("id","Selected");
  //  card.setAttribute("height", yscale(3.6));
   // card.setAttribute("width",  xscale(1.1));

    var num = card.getAttribute("cardID")
    CardsSelected.push(num)
    backdrop.selectAll("#CardBorders").remove()
    GenerateCardSelectBorder(CardsSelected)


}

function DeSelectCard(card)
{
    card.setAttribute("id","NotSelected");
    card.setAttribute("height", yscale(3.2));
    card.setAttribute("width",  xscale(1));

    var num = card.getAttribute("cardID");

    card.setAttribute("x", PlaceCardX(num,cardsinpack));
    card.setAttribute("y", PlaceCardY(num,cardsinpack));


    var index = CardsSelected.indexOf(num);
    CardsSelected.splice(index,1);

    backdrop.selectAll("#CardBorders").remove()

    var CardBorders =backdrop.selectAll("#CardBorders")

    backdrop.selectAll("#CardBorders").remove()
    GenerateCardSelectBorder(CardsSelected)
}

function GenerateCardSelectBorder(CardsSelected)
{

    backdrop.selectAll("cardBorders").data(CardsSelected).enter().append("rect")
        .attr("x",function(d){ return PlaceCardX(d,cardsinpack)-xscale(0.05)})
        .attr("y",function(d){ return PlaceCardY(d,cardsinpack)+yscale(0.05)})
        .attr("height",function(){return yscale(3.1)})
        .attr("width",function(){return xscale(1.1)})
        .attr("CardID",function(d){return d;})
        .attr("id","CardBorders")
        .attr("rx",10)
        .attr('ry',10)
        .style("stroke","#000000")
        .style("stroke-width","2px")
        .style("opacity",0.8)
        .style('fill',"yellow")
}

function HidePreviousSelection()
{
    svg.selectAll("#PreviousSelection")
        .on("mouseover",null)
        .on("mouseout",null)
        .on("click",function()
        {
            ShowPreviousSelection()
        })
        .transition().duration(1000).attr("x",function()
        {
            return xscale(7)
        })
        .attr("y",function()
        {
            return yscale(1.2)
        })

    svg.selectAll("#NotSelected")
        .transition().style("opacity",1)

    svg.on("click",null)
    if (draftType == "Traditional")
    {
        GiveLargeCardMouseoverTraditional(svg.selectAll("#NotSelected"))
    }
    else
    {
        GiveLargeCardMouseover(svg.selectAll("#NotSelected"))
    }

    svg.selectAll("#Selected")
        .transition().style("opacity",1)

    if (draftType == "Traditional")
    {
        GiveLargeCardMouseoverTraditional(svg.selectAll("#Selected"))
    }
    else
    {
        GiveLargeCardMouseover(svg.selectAll("#Selected"))
    }


    svg.selectAll("#Removed")
        .transition().style("opacity",1)

    svg.selectAll("#DraftText")
        .transition().style("opacity",1)

    svg.selectAll("#DraftTextPlayerCards")
        .transition().style("opacity",1)
}

function ShowPreviousSelection()
{
    svg.selectAll("#NotSelected")
        .on("mouseover",null)
        .on("mouseoff",null)
        .on("click", null)
        .transition().style("opacity",0)

    svg.selectAll("#Selected")
        .on("mouseover",null)
        .on("mouseoff",null)
        .on("click", null)
        .transition().style("opacity",0)

    svg.selectAll("#Removed")
        .transition().style("opacity",0)

    svg.selectAll("#DraftText")
        .transition().style("opacity",0)

    svg.selectAll("#DraftTextPlayerCards")
        .transition().style("opacity",0)

    setTimeout(function(){svg.on("click",function(){HidePreviousSelection()})},1000)

    svg.selectAll("#PreviousSelection")
        .on("click",function()
        {
            HidePreviousSelection()
        })
        .transition()
        .attr("x",function()
        {
            return xscale(this.getAttribute("selectedID")%10)
        })
        .attr("y",function()
        {
            if (draft.length <= 40)
            {
                return yscale(parseInt(this.getAttribute("selectedID")/10)*2.5)
            }
            else
            {
                return yscale(parseInt(this.getAttribute("selectedID")/10)*1.5)
            }
        })
}

function MoveCardsToEnd()
{
    d3.selectAll("#Selected").attr("id","PreviousSelection");

    d3.selectAll("#PreviousSelection")
        .on("mouseover",null)
        .on("mouseout",null)
        .on("click",null)
        .transition().duration(1000).attr("x",function()
        {
            return xscale(7)
        })
        .attr("y",function()
        {
            return yscale(1.2)
        })

    setTimeout(function()
    {
        d3.selectAll("#PreviousSelection").on("click",function()
        {
            ShowPreviousSelection();
        })
    },1100)

    d3.selectAll("#NotSelected")
        .attr("id","Removed")
        .on("mouseover",null)
        .on('mouseout',null)
        .on("click",null)
        .transition().duration(1000)
        .attr("x",xscale(7))
        .attr("y",yscale(5.6))

    backdrop.selectAll("#CardBorders").remove();
    CardsSelected = [];
    d3.selectAll("#CardZoom").transition().style("opacity",0).transition().delay(200).remove()

}

function MoveCardsToEndTraditional()
{
    d3.selectAll("#Selected").attr("id","PreviousSelection");

    d3.selectAll("#PreviousSelection")
        .on("mouseover",null)
        .on("mouseout",null)
        .on("click",null)
        .transition().duration(1000).attr("x",function()
        {
            return xscale(7)
        })
        .attr("y",function()
        {
            return yscale(1.2)
        })

    setTimeout(function()
    {
        d3.selectAll("#PreviousSelection").on("click",function()
        {
            if (playersTurn == true)
            {
                ShowPreviousSelection();
            }
        })
    },1100)

    if (AInum == 0)
    {
        d3.selectAll("#NotSelected")
            .attr("id","Removed")
            .on("mouseover",null)
            .on('mouseout',null)
            .on("click",null)
            .transition().duration(1000)
            .attr("x",xscale(7))
            .attr("y",yscale(5.6))
    }
    backdrop.selectAll("#CardBorders").remove();
    CardsSelected = [];
    d3.selectAll("#CardZoom").transition().style("opacity",0).transition().delay(200).remove()

}

//This will reindex a JSON object to a different key.  For example if JSON object is of form {code: name}, giving
//it the key name will return {name: code}
function JSONReindex(key)
{


    var CardLookup = {}
    for (i in cardpoolJSON) {
        var val = {}
        for (j in cardpoolJSON[i]) {
            val[j] = cardpoolJSON[i][j]
        }

        CardLookup[cardpoolJSON[i][key]] = val
    }
    return CardLookup
}



