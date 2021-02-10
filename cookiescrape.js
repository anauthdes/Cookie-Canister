/*Cookie scrape 
**should scrape current tab or selected tabs for all cookies stored for this session 
**should have function to render data in lists. 
**should have functions to modify cookie state(blocked or modified), and info
**should have functions to clear the current session list 
**should have function to delete all cookies


*/

chrome.browserAction.onClicked.addListener(function(tab) { 
	console.log("tabs: ",chrome.tabs);
	console.log("current tab: ",tab);
	getAllCookiesFromTabs(tab)
});


function getAllCookiesFromTabs(tabs){
	chrome.cookies.getAll({},function(cookies){
		console.log(cookies);
	});
}