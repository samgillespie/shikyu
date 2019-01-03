/**
 * Created by Enigma on 22/05/2015.
 */
function checkDuplicates(draftid)
{
    var duplicates = 0;
    var poplist = [];
    for (i in draft)
    {
        if (draft[i] == draftid)
        {
            duplicates = duplicates+1;
            poplist.push(i);
        }
    }
    poplist.reverse()
    for (i in poplist)
    {
        draft.splice(poplist[i],1)
    }
    return duplicates
}

function CreateDeck()
{
    //Present option to download card list, or to use online builder
    ToastPopup("Draft Completed")
    d3.selectAll("image").transition().style("opacity",0).transition().delay(1000).remove()
    d3.selectAll("#DraftText").transition().style("opacity",0).transition().delay(1000).remove()

    //Check if Corp or Runner
    var codeLookup =  JSONReindex("code")
    var titleLookup = JSONReindex("title")


    var Side = codeLookup[draft[0]]["side_code"]
    if (Side == "runner")
    {

        events =[];
        hardware = [];
        resource =[];
        program = [];

        var nameDraft = []
        for (i in draft)
        {
            nameDraft.push(codeLookup[draft[i]].title)
        }

        nameDraft.sort()

        draft = []
        for (i in nameDraft)
        {
            draft.push(titleLookup[nameDraft[i]]["code"])
        }

        var eventslength = 0;
        var hardwarelength = 0;
        var resourcelength = 0;
        var programlength = 0;


        while (draft.length > 0)
        {
            var type = codeLookup[draft[0]].type_code;
            if (type == "event")
            {
                events.push([codeLookup[draft[0]]["title"],checkDuplicates(draft[0])])
                eventslength++;
            }
            else if (type == "hardware")
            {
                hardware.push([codeLookup[draft[0]]["title"],checkDuplicates(draft[0])])
                hardwarelength++
            }
            else if (type == "resource")
            {
                resource.push([codeLookup[draft[0]]["title"],checkDuplicates(draft[0])])
                resourcelength++
            }
            else
            {
                program.push([codeLookup[draft[0]]["title"],checkDuplicates(draft[0])])
                programlength++
            }
        }

        var text = ""
        text = text + "Draft Type: "+draftType+"\n"
        text = text + "Number of Cards in Pack: "+cardsinpack+"\n"
        text = text + "Number of Packs: "+numberofpacks+"\n"


        if (events.length > 0)
        {
            text = text + "Event ("+eventslength+")\n"
            for (i in events)
            {
                text = text+events[i][1]+"x "+events[i][0]+"\n"
            }
            text = text+"\n"
        }

        if (hardware.length > 0)
        {
            text = text + "Hardware ("+hardwarelength+")\n"
            for (i in hardware)
            {
                text = text+hardware[i][1]+"x "+hardware[i][0]+"\n"
            }
            text = text+"\n"
        }

        if (resource.length > 0)
        {
            text = text + "Resource ("+resourcelength+")\n"
            for (i in resource)
            {
                text = text+resource[i][1]+"x "+resource[i][0]+"\n"
            }
            text = text+"\n"
        }

        if (program.length > 0)
        {
            text = text + "Program ("+programlength+")\n"
            for (i in program)
            {
                text = text+program[i][1]+"x "+program[i][0]+"\n"
            }
            text = text+"\n"
        }

        text = text+'\n'

        var textToWrite = text;
        var textFileAsBlob = new Blob([textToWrite], {type:'text/plain', endings: 'native'});
        var fileNameToSaveAs = "Shi-Kyu Output.txt";

        var downloadLink = document.createElement("a");
        downloadLink.download = fileNameToSaveAs;
        downloadLink.innerHTML = "Download File";
        if (window.webkitURL != null)
        {
            // Chrome allows the link to be clicked
            // without actually adding it to the DOM.
            downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
        }
        else
        {
            function destroyClickedElement(event)
            {
                document.body.removeChild(event.target);
            }
            // Firefox requires the link to be added to the DOM
            // before it can be clicked.
            downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
         //   downloadLink.onclick = destroyClickedElement;
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);
        }


    }

    else
    {
        agenda =[];
        asset = [];
        upgrade =[];
        operation = [];
        barrier = [];
        codegate = [];
        sentry = [];
        other = [];

        var nameDraft = []
        for (i in draft)
        {
            nameDraft.push(codeLookup[draft[i]].title)
        }

        nameDraft.sort()

        draft = []
        for (i in nameDraft)
        {
            draft.push(titleLookup[nameDraft[i]]["code"])
        }

        var agendalength = 0;
        var assetlength = 0;
        var upgradelength = 0;
        var operationlength = 0;
        var barrierlength = 0;
        var codegatelength = 0;
        var sentrylength = 0;
        var otherlength = 0;



        while (draft.length > 0)
        {
            var type = codeLookup[draft[0]].type_code;
            var subtype = codeLookup[draft[0]].keywords;

            if (type == "agenda")
            {
                agenda.push([codeLookup[draft[0]]["title"],checkDuplicates(draft[0])])
                agendalength++
            }
            else if (type == "asset")
            {
                asset.push([codeLookup[draft[0]]["title"],checkDuplicates(draft[0])])
                assetlength++
            }
            else if (type == "upgrade")
            {
                upgrade.push([codeLookup[draft[0]]["title"],checkDuplicates(draft[0])])
                upgradelength++
            }
            else if (type == "operation")
            {
                operation.push([codeLookup[draft[0]]["title"],checkDuplicates(draft[0])])
                operationlength++
            }
            else if (type == "ice")
            {
                if (subtype.substr(0,7) == "Barrier")
                {
                    barrier.push([codeLookup[draft[0]]["title"],checkDuplicates(draft[0])])
                    barrierlength++
                }
                else if (subtype.substr(0,9) == "Code Gate")
                {
                    codegate.push([codeLookup[draft[0]]["title"],checkDuplicates(draft[0])])
                    codegatelength++
                }
                else if (subtype.substr(0,6) == "Sentry")
                {
                    sentry.push([codeLookup[draft[0]]["title"],checkDuplicates(draft[0])])
                    sentrylength++
                }
                else
                {
                    other.push([codeLookup[draft[0]]["title"],checkDuplicates(draft[0])])
                    otherlength++
                }
            }
            else
            {
                console.log(codeLookup[draft[0]]);
            }
        }

        var text = ""
        text = text + "Draft Type: "+draftType+"\n"
        text = text + "Number of Cards in Pack: "+cardsinpack+"\n"
        text = text + "Number of Packs: "+(numberofpacks)+"\n"

        if (draftType == "Grid")
        {
            if (AInum == 0)
            {
                text = text+"No AI Present\n\n"
            }
            else
            {
                text = text+"AI Present\n\n"
            }
        }

        if (draftType == "Traditional")
        {
            if (AInum == 0)
            {
                text = text+"No AI Present\n\n"
            }
            else
            {
                text = text + AInum+" AI Opponents Present\n\n"
            }

        }

        if (agenda.length > 0)
        {
            text = text + "Agenda ("+agendalength+")\n"
            for (i in agenda)
            {
                text = text+agenda[i][1]+"x "+agenda[i][0]+"\n"
            }
            text = text+"\n"
        }

        if (asset.length > 0)
        {
            text = text + "Asset ("+assetlength+")\n"
            for (i in asset)
            {
                text = text+asset[i][1]+"x "+asset[i][0]+"\n"
            }
            text = text+"\n"
        }

        if (upgrade.length > 0)
        {
            text = text + "Upgrade ("+upgradelength+")\n"
            for (i in upgrade)
            {
                text = text+upgrade[i][1]+"x "+upgrade[i][0]+"\n"
            }
            text = text+"\n"
        }

        if (operation.length > 0)
        {
            text = text + "Operation ("+operationlength+")\n"
            for (i in operation)
            {
                text = text+operation[i][1]+"x "+operation[i][0]+"\n"
            }
            text = text+"\n"
        }

        if (barrier.length > 0)
        {
            text = text + "ICE: Barrier ("+barrierlength+")\n"
            for (i in barrier)
            {
                text = text+barrier[i][1]+"x "+barrier[i][0]+"\n"
            }
            text = text+"\n"
        }

        if (codegate.length > 0)
        {
            text = text + "ICE: Code Gate ("+codegatelength+")\n"
            for (i in codegate)
            {
                text = text+codegate[i][1]+"x "+codegate[i][0]+"\n"
            }
            text = text+"\n"
        }

        if (sentry.length > 0)
        {
            text = text + "ICE: Sentry ("+sentrylength+")\n"
            for (i in sentry)
            {
                text = text+sentry[i][1]+"x "+sentry[i][0]+"\n"
            }
            text = text+"\n"
        }

        if (other.length > 0)
        {
            text = text + "ICE: Other ("+otherlength+")\n"
            for (i in other)
            {
                text = text+other[i][1]+"x "+other[i][0]+"\n"
            }
            text = text+"\n"
        }

        text = text+'\n'

        var textToWrite = text;
        var textFileAsBlob = new Blob([textToWrite], {type:'text/plain', endings: 'native'});
        var fileNameToSaveAs = "Shi-Kyu Output.txt";

        var downloadLink = document.createElement("a");
        downloadLink.download = fileNameToSaveAs;
        downloadLink.innerHTML = "Download File";
        if (window.webkitURL != null)
        {
            // Chrome allows the link to be clicked
            // without actually adding it to the DOM.
            downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
        }
        else
        {
            function destroyClickedElement(event)
            {
                document.body.removeChild(event.target);
            }

            // Firefox requires the link to be added to the DOM
            // before it can be clicked.
            downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
            //downloadLink.onclick = destroyClickedElement;
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);
        }
    }

    svg.append("image")
        .attr("xlink:href","menuimages/text-plain.png")
        .attr("x",xscale(6.2))
        .attr("y",yscale(4))
        .attr("height",yscale(2))
        .attr("width",xscale(1))
        .style("opacity",0)
        .on("click",function()
        {
            downloadLink.click();
        })
        .transition().style("opacity",1)

    OptionsText("Download as Text File",xscale(5.9),yscale(6.5),36,"optionstext")

    svg.append("image")
        .attr("xlink:href","menuimages/back.png")
        .attr("x",xscale(2))
        .attr("y",yscale(4))
        .attr("height",yscale(2))
        .attr("width",xscale(1))
        .style("opacity",0)
        .on("click",function()
        {
            d3.selectAll("image").transition().style("opacity",0).transition().delay(1000).remove()
            d3.selectAll("#optionstext").transition().style("opacity",0).transition().delay(1000).remove()
            draft = [];
            CardsSelected = [];
            delete availableCards;
            OptionsMenuStep1();
        })
        .transition().style("opacity",1)

    OptionsText("Return to Main Menu",xscale(1.6),yscale(6.5),36,"optionstext")

}
