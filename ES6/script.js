//This loads the first custom script after SP loads internal scripts
_spBodyOnLoadFunctionNames.push("getAllQuotes");

const quoteArray = [];

//This get a random quote from array
function getFriendlyQuote() {
    //console.log(quoteArray);
    var randomMsg = quoteArray[Math.floor(Math.random() * quoteArray.length)];
    document.getElementsByClassName("quote")[0].innerHTML = randomMsg;

}

//This gets All the quotes from the SP list.
function getAllQuotes() {
    let list = "('Quotes')/Items/?$select=Title&$top=1000";
    fetch(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle" + list, {
            method: "GET",
            headers: {
                "Accept": "application/json; odata=verbose"
            }
        })
        .then(response => response.json()) //this parses the response to json type
        .then(data => {
            let items = data.d.results;
            items.map(function (item) {
                quoteArray.push(item.Title);//this pushes the data into the quotes array
            });
        })
        .catch(err => console.log(err)); //this catches any error thrown
}