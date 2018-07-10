$("#secondBox").hide();

//====================== GLOBAL VARIABLES =============================

var api_key = "c9xve9dj721yyt16e7ksofgu";
// var etsyURL = "https://openapi.etsy.com/v2/listings/active.js?keywords=" + terms + "&limit=12&includes=Images:1&api_key=" + api_key;
// console.log(terms);

//Form Validation - ================= NEEDS TO BE COMPLETED ======================
function validateForm() {
    var x = document.forms["myForm"]["fname"].value;
    if (x == "") {
        alert("Name must be filled out");
        return false;
    }
}






function renderCategories(categories) {

    var dupedCategories = [];
    var deDupedCategories = [];

    for (var i = 0; i < categories.length; i++) {
        dupedCategories = dupedCategories.concat( categories[i].category_path );
    }
    
    for (var j = 0; j < dupedCategories.length; j++ ) {
        if ( !deDupedCategories.includes( dupedCategories[j] ) ) {
            deDupedCategories.push( dupedCategories[j] );
        }
    }

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

}


$(document).ready(function () {

    //Uses API to search for categories returned for user text input
    $('#buttonOne').on('click', function () {

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

                var cat = data.results;
                console.log(cat);

                renderCategories(cat);

                console.log(data);
                return (data);
            }
        });
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