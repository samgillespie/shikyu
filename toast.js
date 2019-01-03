/**
 * Created by Enigma on 22/05/2015.
 */


//

function ToastPopup(message,centre)
{
    if (typeof(centre) == "undefined"){centre = false}
    ToastClear()
    var toastObj = svg.append("g")
    toastObj.append("rect")
        .attr("x",xscale(3))
        .attr("y",yscale(12))
        .attr("id","toast")
        .attr('height',yscale(1))
        .attr("width",xscale(4))
        .attr("fill","silver")
        .style("opacity",0.95)
        .style("stroke","#000000")
        .style("stroke-width","2px")
        .on("click",function(){ToastClear()})
        .transition().duration(1000)
        .attr("y",yscale(8))


    text = toastObj.append("text")
        .attr("y",yscale(12.5))
        .style("font-family","monkirta_pursuit_ncregular")
        .attr("id","toast")
        .style("font-size","40px")
        .text(message)
        .transition().duration(1000)
        .attr("y",function()
        {
            if (centre == false)
            {
                return yscale(8.6)
            }
            else
            {
                return yscale(5)
            }
        })

    var bbox = text.node().getBBox();
    text.attr("x",xscale(5)-bbox["width"]/2)

    setTimeout(function(){ToastClear()},3000)
}





function ToastClear()
{
    d3.selectAll("#toast").transition().duration(1000)
        .attr("y",yscale(12)).transition().delay(1500).remove()

}