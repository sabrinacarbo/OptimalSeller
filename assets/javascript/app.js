$("#secondBox").hide();

//====================== GLOBAL VARIABLES =============================
var titles =[];
var titlesB;
var titlesC;
var titlesD=[];
var titlesE;
var titlesF;
var u;
var lists=[];
var api_key = "c9xve9dj721yyt16e7ksofgu";
var q;
var r;
var s;
// var etsyURL = "https://openapi.etsy.com/v2/listings/active.js?keywords=" + terms + "&limit=12&includes=Images:1&api_key=" + api_key;
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
    $("#searchTerms").text("\""+terms + "\"");


}

function renderImages(image) {
    
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
       var mainTitle = image[i].title ;
       console.log(mainTitle);
       var cardContent = $("<div class='card-content'>");
       var p = $("<p>" + mainTitle + "</p>")
       cardContent.append(p);
       cardClass.append(cardContent);
        
    }


}

function renderTitle(name) {
    for (var i = 0; i < name.length; i++) {
        var mainTitle = name[i].title;
        titles.push(mainTitle)

        
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
        $('#thirdBox').delay(5000).show(2000);
        
        var terms = $('#search').val();
        var etsyURL = "https://openapi.etsy.com/v2/listings/active.js?keywords=" +
            terms + "&limit=12&includes=Images:1&api_key=" + api_key;
        console.log(terms);
        $.ajax({
            url: etsyURL,
            dataType: 'jsonp',
            success: function (data) {
       
                var cat = data.results;
                console.log(cat);

                renderImages(cat);
                renderTitle(cat);
                

                
                
                console.log(titles);
                titlesB = titles.join();
                console.log("joined titles", titlesB)
                titlesC = titlesB.split(' ')
                console.log("joined titles", titlesC)
                for (q=0; q<titlesC.length; q++){
                    if(titlesC[q].length>2 && titlesC[q] !="and" && titlesC[q] != "but" && titlesC[q] != "the"){
                       titlesD.push(titlesC[q].toUpperCase())
                    }
                }
                console.log(titlesD)
                //var numberCount=0
                //for (var r=0; r<titlesD.length;r){
                //    for (var s=r+1; s<titlesD.length; s++){
                //        if (titlesD[r]=titlesD[s]){
                //            numberCount++;
                //            s--;
                //            titlesD.splice(s,1);
                //        }
                //    }     
                //    var lists=[]                      
                //    lists.push([titlesD[r],numberCount]);
                //    titlesD.splice(r,1);
                //}
        var wordCount = {};
        titlesD.forEach(function ( word ) {
  if ( !wordCount[word] ) {
    wordCount[word] = 1;
  } else {
    wordCount[word]++;
  }

  var wordCountArray = [];
Object.keys(wordCount).forEach(function ( word ) {
  wordCountArray.push([ word, wordCount[word]*10 ]);
});
console.log( wordCountArray );


WordCloud(document.getElementById("my_canvas"), 
{ list: wordCountArray, gridsize
}
)
});

//var wordCountArray = [];
//Object.keys(wordCount).forEach(function ( word ) {
//  wordCountArray.push([ word, wordCount[word] ]);
},},)
                
                
  //              console.log(lists)
                //New array in list format, via for loop of the count of said words
               return data;
            
            
            
            

            
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