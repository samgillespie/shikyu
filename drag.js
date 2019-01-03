/**
 * Created by Enigma on 20/05/2015.
 */
function dragmove(d) {
    if (true) {
        dragrect
            .attr("x", d.x = Math.max(0, Math.min(w - width, d3.event.x)))
            .attr("y", d.y = Math.max(0, Math.min(h - height, d3.event.y)))
    }
}

function ldragresize(d) {
    if (true) {
        var oldx = d.x;
        //Max x on the right is x + width - dragbarw
        //Max x on the left is 0 - (dragbarw/2)
        d.x = Math.max(0, Math.min(d.x + width - (dragbarw / 2), d3.event.x));
        width = width + (oldx - d.x);
        dragbarleft
            .attr("x", function(d) { return d.x - (dragbarw / 2); });

        dragrect
            .attr("x", function(d) { return d.x; })
            .attr("width", width);

        dragbartop
            .attr("x", function(d) { return d.x + (dragbarw/2); })
            .attr("width", width - dragbarw)
        dragbarbottom
            .attr("x", function(d) { return d.x + (dragbarw/2); })
            .attr("width", width - dragbarw)
    }
}

function rdragresize(d) {
    if (true) {
        //Max x on the left is x - width
        //Max x on the right is width of screen + (dragbarw/2)
        var dragx = Math.max(d.x + (dragbarw/2), Math.min(w, d.x + width + d3.event.dx));

        //recalculate width
        width = dragx - d.x;

        //move the right drag handle
        dragbarright
            .attr("x", function(d) { return dragx - (dragbarw/2) });

        //resize the drag rectangle
        //as we are only resizing from the right, the x coordinate does not need to change
        dragrect
            .attr("width", width);
        dragbartop
            .attr("width", width - dragbarw)
        dragbarbottom
            .attr("width", width - dragbarw)
    }
}

function tdragresize(d) {

    if (true) {
        var oldy = d.y;
        //Max x on the right is x + width - dragbarw
        //Max x on the left is 0 - (dragbarw/2)
        d.y = Math.max(0, Math.min(d.y + height - (dragbarw / 2), d3.event.y));
        height = height + (oldy - d.y);
        dragbartop
            .attr("y", function(d) { return d.y - (dragbarw / 2); });

        dragrect
            .attr("y", function(d) { return d.y; })
            .attr("height", height);

        dragbarleft
            .attr("y", function(d) { return d.y + (dragbarw/2); })
            .attr("height", height - dragbarw);
        dragbarright
            .attr("y", function(d) { return d.y + (dragbarw/2); })
            .attr("height", height - dragbarw);
    }
}

function bdragresize(d) {
    if (true) {
        //Max x on the left is x - width
        //Max x on the right is width of screen + (dragbarw/2)
        var dragy = Math.max(d.y + (dragbarw/2), Math.min(h, d.y + height + d3.event.dy));

        //recalculate width
        height = dragy - d.y;

        //move the right drag handle
        dragbarbottom
            .attr("y", function(d) { return dragy - (dragbarw/2) });

        //resize the drag rectangle
        //as we are only resizing from the right, the x coordinate does not need to change
        dragrect
            .attr("height", height);
        dragbarleft
            .attr("height", height - dragbarw);
        dragbarright
            .attr("height", height - dragbarw);
    }
}

