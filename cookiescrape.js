/*Cookie scrape 
**should scrape current tab or selected tabs for all cookies stored for this session 
**should have function to render data in lists. 
**should have functions to modify cookie state(blocked or modified), and info
**should have functions to clear the current session list 
**should have function to delete all cookies


*/

var curTab = 0;
var IncomingRequests = [];
var matchedCookies = [];
var filteredDomains = [];
chrome.webRequest.onBeforeRequest.addListener(function(details) {
    IncomingRequests.push(details);
    /*if(details.tabId == curTab){
    	console.log(details);
    }*/
    return null;
}, { urls: ["<all_urls>"] })


chrome.browserAction.onClicked.addListener(function(tab) {
    curTab = tab.id;
    console.log("tabs: ", chrome.tabs);
    console.log("current tab: ", tab);
    // getAllCookiesFromTabs(tab)
    console.log("filtered requests", filterRequestsByTabID(IncomingRequests, curTab));
    filteredDomains = getInitiatorDomains(filterRequestsByTabID(IncomingRequests, curTab))
    for (var iii = 0; iii < filteredDomains.length; iii++) {
        console.log("filtered cookies (",filteredDomains[iii],") :");
        chrome.cookies.getAll({domain:filteredDomains[iii]}, function(cookies) {
            console.log(cookies);
        });
    }

});


function getAllCookiesFromTabs(tabs) {
    chrome.cookies.getAll({}, function(cookies) {
        console.log(cookies);
    });
}

function filterRequestsByTabID(requests, tabID) {
    return requests.filter(function(el) {
        return el.tabId == tabID;
    });
}

function getInitiatorDomains(requests) {
    var domains = [];
    for (var iii = 0; iii < requests.length; iii++) {
        if (typeof requests[iii].initiator == "string" && requests[iii].initiator.trim().length > 0 && domains.indexOf(cleanDomain(requests[iii].initiator)) < 0) {
            domains.push(cleanDomain(requests[iii].initiator));
        }
    }
    return domains;

}

function cleanDomain(domain) {
    //extracts the parts of the url that aren't needed in domain string eg:(http, https, :, /, etc.)
    var domainInfo = typeof domain=="string"?domain.match(/(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/g)[0]:"";
    //splits into an array based on the parts of the url 
    domainInfo = domainInfo.split(".");
    //extracts only the primary domain if it is greater than 2 parts
    if(domainInfo.length > 2){
        domainInfo = domainInfo.slice(Math.max(domainInfo.length - 2, 0));
    }
    domainInfo = domainInfo.join(".");
    return domainInfo;
}