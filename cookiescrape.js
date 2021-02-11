/*Cookie scrape 
**should scrape current tab or selected tabs for all cookies stored for this session 
**should have function to render data in lists. 
**should have functions to modify cookie state(blocked or modified), and info
**should have functions to clear the current session list 
**should have function to delete all cookies


*/

var curTab = 0;
var IncomingRequests = [];

chrome.webRequest.onBeforeRequest.addListener(function(details){
	IncomingRequests.push(details);
	/*if(details.tabId == curTab){
		console.log(details);
	}*/
	return null;
},{urls: ["<all_urls>"]})


chrome.browserAction.onClicked.addListener(function(tab) { 
	curTab = tab.id;
	console.log("tabs: ",chrome.tabs);
	console.log("current tab: ",tab);
	getAllCookiesFromTabs(tab)
	console.log(filterRequestsByTabID(IncomingRequests,curTab));



});


function getAllCookiesFromTabs(tabs){
	chrome.cookies.getAll({},function(cookies){
		console.log(cookies);
	});
}

function filterRequestsByTabID(requests, tabID){
	return requests.filter(function (el) {
  return el.tabId == tabID;
});
}