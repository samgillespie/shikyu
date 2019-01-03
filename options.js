/**
 * Created by sgillespie on 25/05/15.
 */


//Step1 = Select whether to use Stimhack Standard Cube, or use a user defined Cube.
//Step2 = Choose Traditional Draft or Grid Draft
//Step3 = Cards In Pack / Number of Packs
//Step4 = AI Options
StimhackCorp = "43419"
StimhackRunner = "43415"

function ClearOptions()
{
    d3.selectAll("#SelectSide").transition().duration(2000).attr("y",yscale(-10))
        .transition().delay(2000).remove();

    d3.selectAll("#optionstext").transition().style("opacity",0).transition().delay(1000).remove();


    d3.selectAll("#customcubeid").remove();
    d3.selectAll("#customcubeforward").remove();

    d3.selectAll("#draftSelect").transition().style("opacity",0).transition().delay(1000).remove();
    d3.selectAll("#CardsInPack").transition().style("opacity",0).transition().delay(1000).remove();
    d3.selectAll("#Packs").transition().style("opacity",0).transition().delay(1000).remove()
    d3.selectAll("#PacksText").remove();
    d3.selectAll("#PackSizeText").remove();
    d3.selectAll("#customcubeforward").transition().style("opacity",0).transition().delay(1000).remove()
    d3.selectAll("#AIs").transition().style("opacity",0).transition().delay(1000).remove()
    d3.selectAll("#selectAI").transition().style("opacity",0).transition().delay(1000).remove()
}

function OptionsMenuStep1()
{
    ClearOptions();

    OptionsText("Welcome to the Shi-Kyû Netrunner Draft Simulation.",xscale(1),yscale(1),40,"optionsHeader");
    OptionsText("Choose: Would you like to run the latest Stimhack.com Cube, or run your own custom cube",xscale(1),yscale(3),26,"optionstext");
    OptionsText("(Note: Custom Cubes need to be uploaded to Netrunnerdb.com)",xscale(1),yscale(3.5),26,"optionstext");

    svg.append("image").attr("xlink:href","menuimages/stimhack.png")
        .attr("x",xscale(1)).attr("y",yscale(5))
        .attr("id","optionstext")
        .attr("width",xscale(4))
        .attr("height",yscale(2.5))
        .on("click",function()
        {

            svg.selectAll("#optionstext").transition().style("opacity",0.2)

            svg.append("image").attr("xlink:href","menuimages/corpcardback.png")
                .attr("x",xscale(1))
                .attr("y",yscale(-10))
                .attr("height",yscale(8))
                .attr("width",xscale(3.2))
                .attr("id","SelectSide")
                .on("click",function(){SelectedSide(StimhackCorp)})
                .transition().duration(2000).attr("y",yscale(1))

            svg.append("image").attr("xlink:href","menuimages/runnercardback.png")
                .attr("x",xscale(5))
                .attr("y",yscale(-10))
                .attr("height",yscale(8))
                .attr("width",xscale(3.2))
                .attr("id","SelectSide")
                .on("click",function(){SelectedSide(StimhackRunner)})
                .transition().duration(2000).attr("y",yscale(1))

            svg.append("image").attr("xlink:href","menuimages/back.png")
                .attr("x",xscale(-10))
                .attr("y",yscale(1))
                .attr("height",yscale(1))
                .attr("width",xscale(1))
                .attr("id","SelectSide")
                .on("click",function()
                {
                    d3.selectAll("#SelectSide").transition().duration(2000).attr("y",yscale(-10))
                        .transition().delay(2000).remove();

                    setTimeout(function(){OptionsMenuStep1()},2000);
                })
                .transition().delay(1000).duration(1000).attr("x",xscale(0))


        })




    svg.append("image").attr("xlink:href","menuimages/CustomCube.png")
        .attr("x",xscale(5)).attr("y",yscale(4))
        .attr("id","optionstext")
        .attr("width",xscale(4))
        .attr("height",yscale(4))
        .on("click",function()
        {
            OptionsMenuCustomCube();
        })

    svg.append("image").attr("xlink:href","menuimages/help.png")
        .attr("x",xscale(12))
        .attr("y",yscale(0.5))
        .attr("height",yscale(2))
        .attr("width",xscale(2))
        .attr("id","SelectSide")
        .on("click",function()
        {
            window.location.href = "about.html"
        })
        .transition().delay(0).duration(1000).attr("x",xscale(8))
    OptionsText("Stimhack Cube",xscale(2.3),yscale(8.2),40,"optionstext");
    OptionsText("Custom Cube",xscale(6.6),yscale(8.2),40,"optionstext");

}

function OptionsMenuCustomCube()
{

    d3.selectAll("#optionstext").transition().style("opacity",0).transition().delay(200).remove()

    OptionsText("Please specify your custom cube netrunnerdb decklist id",xscale(1),yscale(2),30,"optionstext")
    OptionsText("(You will need to publish your cube decklist.  Your id will be in the address bar:",xscale(1),yscale(3),30,"optionstext")
    OptionsText(" http://netrunnerdb.com/en/decklist/[id]",xscale(1),yscale(4),30,"optionstext")

    document.onkeydown=function()
    {
        if (window.event.keyCode == 13)
        {
            var cubeid = d3.select("#customcubeid")[0][0].children[0].value
            SelectedSide(cubeid)
        }
    }

    svg.append("foreignObject")

        .attr("x",xscale(2)).attr("y",yscale(7)).attr("height",yscale(2)).attr("width",400)
        .attr('id',"customcubeid")
        .html("<input type=text id=fname width=600 height = 200 placeholder=CubeID>");


    svg.append("image").attr("xlink:href","menuimages/back.png")
        .attr("x",xscale(-10))
        .attr("y",yscale(1))
        .attr("height",yscale(1))
        .attr("width",xscale(1))
        .attr("id","optionstext")
        .on("click",function()
        {
            d3.selectAll("#SelectSide").transition().duration(2000).attr("x",xscale(-10))
                .transition().delay(2000).remove();

            setTimeout(function(){OptionsMenuStep1()},200);
        })
        .transition().duration(1000).attr("x",xscale(0))

    svg.append("image")
        .attr("x",xscale(7))
        .attr("y",yscale(7))
        .attr("width",xscale(1))
        .attr('height',yscale(1))
        .attr("xlink:href","menuimages/forward.png")
        .attr("id","customcubeforward")
        .on("click",function()
        {
            var cubeid = d3.select("#customcubeid")[0][0].children[0].value
            SelectedSide(cubeid)
        })
}



function OptionsMenuStep2(cardListRequest)
{
    var cubereq = cardListRequest;
    var cubeJSONdata = cubereq.data;

    var Cards = cubeJSONdata[0].cards;
    draftname = cubeJSONdata[0].name

    ClearOptions()

    OptionsText("Welcome to the Shi-Kyû Netrunner Draft Simulation.",xscale(1),yscale(1),40,"optionstext")
    OptionsText("Please Select Your Draft Style - Traditional or 1v1 Grid",xscale(1),yscale(3),26,"optionstext")

    svg.append("image").attr("xlink:href","menuimages/GridExample.png")
        .attr("x",xscale(5))
        .attr('y',yscale(4))
        .attr("height",yscale(4))
        .attr("width",xscale(2))
        .attr("id","draftSelect")
        .on("mouseover", function()
        {
            d3.select(this).attr("xlink:href", "menuimages/GridExample2.png");
        })
        .on('mouseout',function()
        {
            d3.select(this).attr("xlink:href", "menuimages/GridExample.png");
        })
        .on("click",function()
        {
            draftType = "Grid"
            OptionsMenuStep3(draftType,cardListRequest)
        })


    svg.append("image").attr("xlink:href","menuimages/TraditionalDraft.png")
        .attr("x",xscale(2))
        .attr('y',yscale(4.5))
        .attr("height",yscale(3))
        .attr("width",xscale(2))
        .attr("id","draftSelect")
        .on("mouseover", function()
        {
            d3.select(this).attr("xlink:href", "menuimages/TraditionalDraft2.png");
        })
        .on('mouseout',function()
        {
            d3.select(this).attr("xlink:href", "menuimages/TraditionalDraft.png");
        })
        .on("click",function()
        {
            draftType = "Traditional"
            OptionsMenuStep3(draftType,cardListRequest);
        })

    svg.append("image").attr("xlink:href","menuimages/back.png")
        .attr("x",xscale(-10))
        .attr("y",yscale(1))
        .attr("height",yscale(1))
        .attr("width",xscale(1))
        .attr("id","optionstext")
        .on("click",function()
        {
            d3.selectAll("#SelectSide").transition().duration(2000).attr("x",xscale(-10))
                .transition().delay(2000).remove();

            setTimeout(function(){OptionsMenuStep1()},200);
        })
        .transition().duration(1000).attr("x",xscale(0))


    OptionsText("Draft Name: "+draftname,xscale(1),yscale(2),40,"optionstext2")
    d3.selectAll("#optionstext2").style("fill","#900000").attr("id","optionstext")

}

function OptionsMenuStep3(draftType,cardListRequest)
{

    cardsinpack = null;
    numberofpacks = null;
    ClearOptions();

    d3.selectAll("#optionstext").transition().style("opacity",0).transition().delay(1000).remove();
    d3.selectAll("#draftSelect").transition().style("opacity",0).transition().delay(1500).remove();


    svg.append("image").attr("xlink:href","menuimages/back.png")
        .attr("x",xscale(-10))
        .attr("y",yscale(1))
        .attr("height",yscale(1))
        .attr("width",xscale(1))
        .attr("id","optionstext")
        .on("click",function()
        {
            d3.selectAll("#SelectSide").transition().duration(2000).attr("x",xscale(-10))
                .transition().delay(2000).remove();

            setTimeout(function(){OptionsMenuStep2(cardListRequest)},200);
        })
        .transition().duration(1000).attr("x",xscale(0))

    //Traditional: Select Cards in Pack
    if ((draftType) == "Traditional") {


        OptionsText("Select number of cards in each pack.  Default = 10 cards", xscale(1.3), yscale(2), 30, "optionstext")

        svg.append("text")
            .text("10 Cards")
            .attr("x", xscale(8))
            .attr("y", yscale(2.5))
            .attr("id", "PackSizeText")
            .style("font-family", "monkirta_pursuit_ncregular")
            .style("font-size", "30px")
            .style("fill", "white")
            .style("opacity", 0)

        svg.selectAll("CardsInPack").data([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
            .enter()
            .append("image")
            .attr("x", function (d) {
                return (xscale(d / 3 * 2))
            })
            .attr("y", yscale(2))
            .attr("height", yscale(3))
            .attr("width", xscale(0.6))
            .attr("id", "CardsInPack")
            .attr("cardnumber", function (d) {
                return (d)
            })
            .attr("xlink:href", function () {
                return ("menuimages/corpcardbackBW.png")
            })
            .on("mouseover", function (d) {
                var selected_d = parseInt(d);
                d3.selectAll("#PackSizeText").text(selected_d+" Cards").transition().style("opacity",1);

                d3.selectAll("#CardsInPack").attr("xlink:href", function (d) {

                    if (d <= selected_d) {
                        return ("menuimages/corpcardback.png")
                    }
                    else {
                        return ("menuimages/corpcardbackBW.png")
                    }
                })
            })
            .on("mouseout", function () {
                d3.selectAll("#PackSizeText").transition().style("opacity",0);
                d3.selectAll("#CardsInPack").attr("xlink:href", function () {
                    return ("menuimages/corpcardbackBW.png");
                })
            })
            .on("click", function(d)
            {
                d3.selectAll("#CardsInPack").on("mouseover",null).on("mouseout",null)
                cardsinpack = d;
                if (numberofpacks != null)
                {
                    optionsMenuStep4(cardsinpack,numberofpacks,draftType,cardListRequest)
                }
            })
            .style("opacity",0).transition().style("opacity",1);


        //Both: Select Number of Packs
        OptionsText("Select Final Cardpool Size. Each Pack = 5 Cards.  Default = 40 Cards", xscale(1.3), yscale(5.5), 30, "optionstext")


        svg.append("text")
            .text("40 Cards")
            .attr("x", xscale(8))
            .attr("y", yscale(5.5))
            .attr("id", "PacksText")
            .style("font-family", "monkirta_pursuit_ncregular")
            .style("font-size", "30px")
            .style("fill", "white")
            .style("opacity", 0)

        svg.selectAll("NumberofPacks").data([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19])
            .enter()
            .append("image")
            .attr("x",function(d)
            {
                return xscale((d%10)/3*2+1)
            })
            .attr("y",function(d)
            {
                return yscale(6+parseInt(d/10)*1.3)
            })
            .attr("height",yscale(1.2))
            .attr('width',xscale(0.6))
            .attr("id","Packs")
            .attr("xlink:href", function () {
                return ("menuimages/cardpackBW.png")
            })
            .on("mouseover", function (d) {
                var selected_d = parseInt(d);
                d3.selectAll("#PacksText").text(((selected_d+1)*5)+" Cards").transition().style("opacity",1);

                d3.selectAll("#Packs").attr("xlink:href", function (d) {

                    if (d <= selected_d) {
                        return ("menuimages/cardpack.png")
                    }
                    else {
                        return ("menuimages/cardpackBW.png")
                    }
                })
            })
            .on("mouseout", function () {
                d3.selectAll("#PacksText").transition().style("opacity",0);
                d3.selectAll("#Packs").attr("xlink:href", function () {
                    return ("menuimages/cardpackBW.png");
                })
            })
            .on("click", function(d)
            {
                d3.selectAll("#Packs").on("mouseover",null).on("mouseout",null)
                numberofpacks = (d+1)*5;
                if (cardsinpack != null)
                {
                    optionsMenuStep4(cardsinpack,numberofpacks,draftType,cardListRequest)
                }
            })
            .style("opacity",0).transition().style("opacity",1);

    }
    else
    {
        OptionsText("Select Number of Packs", xscale(1.3), yscale(3), 30, "optionstext")

        svg.append("text")
            .text("10 Packs")
            .attr("x", xscale(8))
            .attr("y", yscale(3.5))
            .attr("id", "PacksText")
            .style("font-family", "monkirta_pursuit_ncregular")
            .style("font-size", "30px")
            .style("fill", "white")
            .style("opacity", 0)

        cardsinpack = 9;
        svg.selectAll("NumberofPacks").data([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19])
            .enter()
            .append("image")
            .attr("x",function(d)
            {
                return xscale((d%10)/3*2+1)
            })
            .attr("y",function(d)
            {
                return yscale(4+parseInt(d/10)*1.3)
            })
            .attr("height",yscale(1.2))
            .attr('width',xscale(0.6))
            .attr("id","Packs")
            .attr("xlink:href", function () {
                return ("menuimages/cardpackBW.png")
            })
            .on("mouseover", function (d) {
                var selected_d = parseInt(d);
                d3.selectAll("#PacksText").text(selected_d+1+" Packs").transition().style("opacity",1);

                d3.selectAll("#Packs").attr("xlink:href", function (d) {

                    if (d <= selected_d) {
                        return ("menuimages/cardpack.png")
                    }
                    else {
                        return ("menuimages/cardpackBW.png")
                    }
                })
            })
            .on("mouseout", function () {
                d3.selectAll("#PacksText").transition().style("opacity",0);
                d3.selectAll("#Packs").attr("xlink:href", function () {
                    return ("menuimages/cardpackBW.png");
                })
            })
            .on("click", function(d)
            {
                d3.selectAll("#Packs").on("mouseover",null).on("mouseout",null)
                numberofpacks = d+1;
                if (cardsinpack != null)
                {
                    optionsMenuStep4(cardsinpack,numberofpacks,draftType,cardListRequest)
                }
            })
            .style("opacity",0).transition().style("opacity",1);
    }
}

function optionsMenuStep4(cardsinpack,numberofpacks,draftType,cardListRequest)
{
    ClearOptions()


    svg.append("image").attr("xlink:href","menuimages/back.png")
        .attr("x",xscale(-10))
        .attr("y",yscale(1))
        .attr("height",yscale(1))
        .attr("width",xscale(1))
        .attr("id","optionstext")
        .on("click",function()
        {
            d3.selectAll("#SelectSide").transition().duration(2000).attr("x",xscale(-10))
                .transition().delay(2000).remove();

            setTimeout(function(){OptionsMenuStep3(draftType)},200);
        })
        .transition().duration(1000).attr("x",xscale(0))


    //Select Number of AI players
    if (draftType == "Traditional")
    {

        OptionsText("Would you like to play this grid draft against AI Opponents?",xscale(1),yscale(2),30,"selectAI")
        OptionsText("You will take turns with each AI selecting from the available cards",xscale(1),yscale(2.7),30,"selectAI")

        AInum = 0
        svg.append("text")
            .text("1 Opponents")
            .attr("x", xscale(3))
            .attr("y", yscale(3.5))
            .attr("id", "AIsText")
            .style("font-family", "monkirta_pursuit_ncregular")
            .style("font-size", "30px")
            .style("fill", "white")
            .style("opacity", 0)


        svg.selectAll("NumberofAIS").data([0,1,2,3])
            .enter()
            .append("image")
            .attr("x",function(d)
            {
                return xscale((d%2)*1.5+1)
            })
            .attr("y",function(d)
            {
                return yscale(Math.floor(d/2)*2.5+4)
            })
            .attr("height",yscale(2))
            .attr('width',xscale(2))
            .attr("id","AIs")
            .attr("xlink:href", function () {
                return ("menuimages/crypsisblack.png")
            })
            .on("mouseover", function (d) {
                var selected_d = parseInt(d);
                d3.selectAll("#AIsText").text(selected_d+1+" Opponents").transition().style("opacity",1);

                d3.selectAll("#AIs").attr("xlink:href", function (d) {

                    if (d <= selected_d) {
                        if (d == 0)
                        {
                            return ("menuimages/crypsisblue.png")
                        }
                        else if (d == 1)
                        {
                            return ("menuimages/crypsisred.png")
                        }
                        else if (d == 2)
                        {
                            return ("menuimages/crypsisgreen.png")
                        }
                        else
                        {
                            return ("menuimages/crypsisyellow.png")
                        }
                    }
                    else {
                        return ("menuimages/crypsisblack.png")
                    }
                })
            })
            .on("mouseout", function () {
                d3.selectAll("#AIsText").transition().style("opacity",0);
                d3.selectAll("#AIs").attr("xlink:href", function () {
                    return ("menuimages/crypsisblack.png");
                })
            })
            .on("click", function(d)
            {
                d3.selectAll("#AIs").on("mouseover",null).on("mouseout",null)

                AInum = d+1;
                iterate = 0

                ClearOptions()
                d3.selectAll("#optionsHeader").transition().style("opacity",0).transition().delay(1000).remove()

                d3.selectAll("#selectAI").transition().style("opacity",0).transition().delay(1000).remove()
                d3.selectAll("#AIsText").transition().style("opacity",0).transition().delay(1000).remove()

                d3.selectAll("image").transition().style("opacity",0).transition().delay(1000).remove()
                d3.selectAll("#optionstext").transition().style("opacity",0).transition().delay(1000).remove()

                DraftStartImageLoadCheckTraditional(cardsinpack,numberofpacks,AInum,iterate,cardListRequest)
                setTimeout(function(){ OptionsText("Selected Cards 0/"+numberofpacks,xscale(6.7),yscale(1),40,"DraftTextPlayerCards")},2000)
                if (AInum == 0)
                {
                    setTimeout(function(){ OptionsText("Discarded Cards",xscale(6.7),yscale(5.5),40,"DraftText")},2000)
                }
                else
                {
                    setTimeout(function(){ OptionsText("AI's Cards",xscale(7),yscale(5.5),40,"DraftText")},2000)
                }
            })
            .style("opacity",0).transition().style("opacity",1);

        svg.append("image")
            .attr("x",xscale(5.4))
            .attr("y",yscale(4.4))
            .attr("width",xscale(4))
            .attr('height',yscale(4))
            .attr("xlink:href","menuimages/CrysisOffline.png")
            .attr("id","customcubeforward")
            .on("click",function()
            {
                iterate = 0
                ClearOptions()
                d3.selectAll("#optionsHeader").transition().style("opacity",0).transition().delay(1000).remove()
                d3.selectAll("#selectAI").transition().style("opacity",0).transition().delay(1000).remove()
                d3.selectAll("#AIsText").transition().style("opacity",0).transition().delay(1000).remove()

                d3.selectAll("image").transition().style("opacity",0).transition().delay(1000).remove()
                d3.selectAll("#optionstext").transition().style("opacity",0).transition().delay(1000).remove()

                DraftStartImageLoadCheckTraditional(cardsinpack,numberofpacks,AInum,iterate,cardListRequest)
                setTimeout(function(){ OptionsText("Selected Cards 0/"+numberofpacks,xscale(6.7),yscale(1),40,"DraftTextPlayerCards")},2000)
                if (AInum == 0)
                {
                    setTimeout(function(){ OptionsText("Discarded Cards",xscale(6.7),yscale(5.5),40,"DraftText")},2000)
                }
                else
                {
                    setTimeout(function(){ OptionsText("AI's Cards",xscale(7),yscale(5.5),40,"DraftText")},2000)
                }

            })
        OptionsText("AI ON",xscale(2.5),yscale(9.3),72,"selectAI")
        OptionsText("AI OFF",xscale(7),yscale(9.3),72,"selectAI")
    }
    else
    {
        OptionsText("Would you like to play this grid draft against an AI?",xscale(1),yscale(2),30,"selectAI")
        OptionsText("You will take turns with the AI selecting from the grid",xscale(1),yscale(3),30,"selectAI")
        svg.append("image")
            .attr("xlink:href","menuimages/CrysisOnline.png")
            .attr("x",xscale(2))
            .attr("y",yscale(5))
            .attr("id","selectAI")
            .attr("width",xscale(2))
            .attr("height",yscale(3))
            .on("click",function()
            {
                d3.selectAll("#selectAI").transition().style("opacity",0).transition().delay(1000).remove()
                d3.selectAll("#optionsHeader").transition().style("opacity",0).transition().delay(1000).remove()
                d3.selectAll("#optionstext").transition().style("opacity",0).transition().delay(1000).remove()

                iterate = 0
                AInum = 1

                DraftStartImageLoadCheck(cardsinpack,numberofpacks,AInum,iterate,cardListRequest)

                setTimeout(function(){ OptionsText("Selected Cards",xscale(6.7),yscale(1),40,"DraftText")},2000)
                setTimeout(function(){ OptionsText("Discarded Cards",xscale(6.7),yscale(5.5),40,"DraftText")},2000)
            })
            .attr("opacity",0).transition().style("opacity",1)

        OptionsText("AI On",xscale(2.7),yscale(8.7),40,"selectAI")


        svg.append("image")
            .attr("xlink:href","menuimages/CrysisOffline.png")
            .attr("x",xscale(6))
            .attr("y",yscale(5))
            .attr("id","selectAI")
            .attr("width",xscale(2))
            .attr("height",yscale(3))
            .on("click", function()
            {

                iterate = 0
                AInum = 0
                ClearOptions()
                d3.selectAll("#selectAI").transition().style("opacity",0).transition().delay(1000).remove()
                d3.selectAll("#optionsHeader").transition().style("opacity",0).transition().delay(1000).remove()
                d3.selectAll("#optionstext").transition().style("opacity",0).transition().delay(1000).remove()
                DraftStartImageLoadCheck(cardsinpack,numberofpacks,AInum,iterate,cardListRequest)
                setTimeout(function(){ OptionsText("Selected Cards",xscale(6.7),yscale(1),40,"DraftText")},2000)
                setTimeout(function(){ OptionsText("Discarded Cards",xscale(6.7),yscale(5.5),40,"DraftText")},2000)
            })
            .attr("opacity",0).transition().style("opacity",1)

        OptionsText("AI Off",xscale(6.7),yscale(8.7),40,"selectAI")

    }


}


//iterative function to stall Draft until images are loaded
function DraftStartImageLoadCheck(cardsinpack,numberofpacks,AInum,iterate,cardListRequest)

{
    if (imagesloaded == true)
    {
        UpdateDraftGrid(cardsinpack,numberofpacks,AInum,iterate,cardListRequest)
    }
    else
    {
        setTimeout(function(){DraftStartImageLoadCheck(cardsinpack,numberofpacks,AInum,iterate,cardListRequest)},1000)
    }
}


function DraftStartImageLoadCheckTraditional(cardsinpack,numberofpacks,AInum,iterate,cardListRequest)

{
    if (imagesloaded == true)
    {
        UpdateDraftTraditional(cardsinpack,numberofpacks,AInum,iterate,cardListRequest)
    }
    else
    {
        setTimeout(function(){DraftStartImageLoadCheckTraditional(cardsinpack,numberofpacks,AInum,iterate,cardListRequest)},1000)
    }

}