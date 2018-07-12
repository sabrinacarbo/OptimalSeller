$("#secondBox").hide();

//====================== GLOBAL VARIABLES =============================
var titles = [];
var titlesB;
var titlesC;
var titlesD = [];
var titlesE;
var titlesF;
var u;
var lists = [];
var api_key = "c9xve9dj721yyt16e7ksofgu";
var q;
var r;
var s;
// var etsyURL = "https://openapi.etsy.com/v2/listings/active.js?keywords=" + terms + "&limit=1000&includes=Images:1&api_key=" + api_key;
// console.log(terms);

$("#searchForm").on("submit", function () {
    event.preventDefault();
});
function renderCategories(categories) {

    var dupedCategories = [];
    var deDupedCategories = [];


    
    for (var i = 0; i < categories.length; i++) {
        dupedCategories = dupedCategories.concat(categories[i].category_path);
    }

    for (var j = 0; j < dupedCategories.length; j++) {
        if (!deDupedCategories.includes(dupedCategories[j])) {
            deDupedCategories.push(dupedCategories[j]);
        }
    }

    var rightSide = deDupedCategories.splice(0, Math.floor(deDupedCategories.length / 2));
    console.log(rightSide);
    console.log(deDupedCategories);

    for (var k = 0; k < deDupedCategories.length; k++) {
        var ptag = $("<p>");
        var label = $("<label>");
        var input = $("<input type='checkbox'>");
        var span = $("<span>").text(deDupedCategories[k]);

        label.append(input);
        label.append(span);
        ptag.append(label);
        $("#catContainer").append(ptag);
    }

    for (var l = 0; l < rightSide.length; l++) {
        var ptag = $("<p>");
        var label = $("<label>");
        var input = $("<input type='checkbox'>");
        var span = $("<span>").text(rightSide[l]);

        label.append(input);
        label.append(span);
        ptag.append(label);
        $("#catContainerTwo").append(ptag);
    }
    var terms = $('#search').val();
    $("#searchTerms").text("\"" + terms + "\"");


}

var terms = $('#search').val();
$("#searchTerms").text("\"" + terms + "\"");

function renderLast(image) {
    for (var i = 0; i < image.length; i++) {
        var imageUrl = image[i].Images[0].url_570xN
        console.log(imageUrl);
        var link = image[i].url
        var cardClass = $("<div class='card'>");
        var cardImage = $("<div class='card-image'>");
        var img = $("<img src=" + imageUrl + ">");
        var ref = $("<a target='_blank' href=" + link + ">")
        ref.append(img);
        cardImage.append(ref);
        cardClass.append(cardImage);
        $("#cardBox").append(cardClass);
        var mainTitle = image[i].title;
        console.log(mainTitle);
        titles.push (mainTitle)
        var cardContent = $("<div class='card-content'>");
        var p = $("<p>" + mainTitle + "</p>")
        cardContent.append(p);
        cardClass.append(cardContent);
    }
    var dupedCategories = [];
    var deDupedCategories = [];

    for (var i = 0; i < image.length; i++) {
        dupedCategories = dupedCategories.concat(image[i].category_path);
    }
    

    for (var j = 0; j < dupedCategories.length; j++) {
        if (!deDupedCategories.includes(dupedCategories[j])) {
            deDupedCategories.push(dupedCategories[j]);
        }
    }
    console.log(deDupedCategories);
    for (var k = 0; k < 5; k++) {
        var listItem = $("<li>" + deDupedCategories[k] + "</li>")
        $("#list").append(listItem);
    }
}
    



$(document).ready(function () {

    //Uses API to search for categories returned for user text input
    $('#buttonOne').on('click', function () {


        if ($("#search").val() == "") {
            return false
        } else {
            var terms = $('#search').val();
            var etsyURL = "https://openapi.etsy.com/v2/listings/active.js?keywords=" +
                terms + "&limit=12&includes=Images:1&api_key=" + api_key;
            console.log(terms);
            $.ajax({
                url: etsyURL,
                dataType: 'jsonp',
                success: function (data) {
                    console.log("DATA IS", data);

                    $("#catContainer").empty();
                    $("#catContainer2").empty();

                    var cat = data.results;
                    console.log(cat);

                    renderCategories(cat);
                    
              
                    console.log(data);
                    return (data);
                }
                
            });
        };
    });
    $("#buttonTwo").on('click', function () {
        $('.progress2').show(0).delay(5000).hide(0);
        $('#lastBox').delay(5000).show("slow");
        $('#thirdBox').delay(5000).show("slow");


        var terms = $('#search').val();
        var etsyURL = "https://openapi.etsy.com/v2/listings/active.js?keywords=" +
            terms + "&limit=1000&includes=Images:1&api_key=" + api_key;
        console.log(terms);
        $.ajax({
            url: etsyURL,
            dataType: 'jsonp',
            success: function (data) {

                var cat = data.results;
                console.log(cat);

                renderLast(cat);
                       
                var priceArray = [];
                

                for (i = 0; i < cat.length; i++) {
                    console.log(Number(cat[i].price), (cat[i].price));
                    if (isNaN(cat[i].price) == false) {
                        var price = Number(cat[i].price);
                        priceArray.push(price);
                    }
                };

                console.log("prices ", priceArray);

                var priceArraySum = 0;
                for (j = 0; j < priceArray.length; j++) {
                    priceArraySum += Number(priceArray[j])
                };
                console.log("sum", priceArraySum);
                var priceArrayAvg = priceArraySum / priceArray.length;
                console.log("avg", priceArrayAvg);

                var priceArraySTD = math.std(priceArray);
                console.log("std", priceArraySTD);

                var whatever = priceArraySTD / 10;
                console.log("1/10 std", whatever);

                function bubbleSort(arr) {
                    var sorted = false;

                    while (!sorted) {
                        sorted = true;
                        for (var i = 0; i < arr.length; i++) {
                            if (parseFloat(arr[i]) > parseFloat(arr[i + 1])) {
                                sorted = false;
                                var temp = arr[i];
                                arr[i] = arr[i + 1];
                                arr[i + 1] = temp;
                            }
                        }
                    }
                    return arr;
                };
                
                var priceArraySorted = bubbleSort(priceArray);
                console.log(priceArraySorted + priceArray);

                zs = Math.floor(priceArrayAvg/whatever);
                console.log(zs)
                
                var zz = []

                for (var i = zs; i > -1; i--) {
                    zz[zs-i] = [priceArrayAvg-whatever*(i+1)];
                    for (var j = 0; j< priceArray.length; j++) {
                        console.log(priceArray[j], (priceArrayAvg-(whatever*i)), (priceArrayAvg-(whatever*(i+1))));
                        console.log($.isNumeric(priceArray[j]), $.isNumeric((priceArrayAvg+(whatever*i))), $.isNumeric((priceArrayAvg+(whatever*(i+1)))));
                        if(priceArray[j] > (priceArrayAvg-(whatever*(i+1)))){ 
                            console.log("yes...", priceArray[j]);
                            if(priceArray[j]<(priceArrayAvg-(whatever*i))){
                            console.log("maybe...", priceArray[j])
                            zz[zs-i].push(priceArray[j]);
                        }}
                //console.log(priceArray[j], j)    
                }
                }
                for (var i = 0; i < zs; i++) {
                    zz[i+zs] = [priceArrayAvg+(whatever*i)];
                    for (var j = 0; j< priceArray.length; j++) {
                        console.log(priceArray[j], (priceArrayAvg+(whatever*i)), (priceArrayAvg+(whatever*(i+1))));
                        console.log($.isNumeric(priceArray[j]), $.isNumeric((priceArrayAvg+(whatever*i))), $.isNumeric((priceArrayAvg+(whatever*(i+1)))));
                        if(priceArray[j]*1>(priceArrayAvg+(whatever*i))){
                            console.log("yes...", priceArray[j])
                            if(priceArray[j]<(priceArrayAvg+(whatever*(i+1)))){
                            console.log("maybe...", priceArray[j])
                            zz[i+zs].push(priceArray[j]);
                        }}console.log(zz);
                }}
                for (var i = 0; i < zz.length; ++i) {
                    console.log(zz[i])
                    zz[i].splice(0,1);

            
            }
                
                xs = [];
                for(i=0;i<zz.length;i++){
                    xs.push("$"+(parseInt(100*(i*whatever))/100))
                }
                ys = [];
                for(i=0;i<zz.length;i++){
                    ys.push(zz[i].length)
                }

                console.log(zz)
                console.log(xs, priceArrayAvg, whatever)
                console.log(ys)
                var trace = [{
                    x: xs,
                    y: ys,
                    "type": "scatter",
                }];

                Plotly.plot("plotly-div", trace);

                $("#msrp").text("Our Suggested Optimal Price $"+Math.floor(100*priceArrayAvg+2.5*whatever)/100);



                titlesB = titles.join();
                titlesC = titlesB.split(' ')
                for (q = 0; q < titlesC.length; q++) {
                    if (titlesC[q].length > 2 && titlesC[q] != "and" && titlesC[q] != "but" && titlesC[q] != "the" && terms.includes(titlesC[q]) != true) {
                        titlesD.push(titlesC[q].toUpperCase())
                    }
                }
                
            var wordCount = {};
                titlesD.forEach(function (word) {
                    if (!wordCount[word]) {
                        wordCount[word] = 1;
                    } else {
                        wordCount[word]++;
                    }
                    var wordCountArray = [];
                    Object.keys(wordCount).forEach(function (word) {
                        if(wordCount[word]>1){
                        wordCountArray.push([word, 10*wordCount[word]])};
                    });
                    WordCloud(document.getElementById("my_canvas"),
                        {
                            list:  wordCountArray
                            
                        }
                    );
                    });

                //var wordCountArray = [];
                //Object.keys(wordCount).forEach(function ( word ) {
                //  wordCountArray.push([ word, wordCount[word] ]);
                return data;},
        }, )


        //              console.log(lists)
        //New array in list format, via for loop of the count of said words
        






    });





    //Uses categories or category chosen by user to return only items that fit the criteria ==== IN PROCESS ====
    // $('#buttonTwo').on('click', function () {

    //     $.ajax({

    //         //URL will be different per request
    //         url: etsyURL,
    //         dataType: 'jsonp',
    //         success: function (data) {
    //             console.log("DATA IS", data);

    //             $("#catContainer").empty();

    //             var cat = data.results;
    //             console.log(cat);

    //             for (var i = 0; i < cat.length; i++) {

    //                 var results = cat[i].category_path;

    //                 for (var j = 0; j < results.length; j++) {
    //                     var ptag = $("<p>");
    //                     var label = $("<label>");
    //                     var input = $("<input type='checkbox'>");
    //                     var span = $("<span>").text(results[j]);

    //                     label.append(input);
    //                     label.append(span);
    //                     ptag.append(label);
    //                     $("#catContainer").append(ptag);
    //                 };
    //             }
    //             console.log(data);
    //             return (data);
    //         }
    //     });
    // });



















});