var messageText;
function myFunction() {
  var messageText2=document.getElementById("msg").value;
   document.getElementById("demo2").innerHTML = "You entered: "+messageText2;
  sheetLoaded();
  messageText=messageText2.toLowerCase()
}

function sheetLoaded() {
const headerEl = document.querySelector('.header');
const preFix = `https://spreadsheets.google.com/feeds/list/`;
const sheetID = `1AayGN7wrdAcWCmCefRNqs4amuS42zDKQ7tSFJKNJl0I`;
const postFix = `/1/public/values?alt=json`;

const spreadsheet = preFix + sheetID + postFix;

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function(err, res, body) { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
	{
            callback(xmlHttp.responseText);
	var bot_script_obj = JSON.parse(xmlHttp.responseText);
        var all_bot_scripts = bot_script_obj.feed.entry;
        var len = all_bot_scripts.length;
	var count=0,r=0,w=0,k=3;

	for (var i = 0; i < len; i++) {
        if (messageText.includes(bot_script_obj.feed.entry[i].gsx$incoming.$t,-1)){
          var disease=bot_script_obj.feed.entry[i].gsx$incoming.$t;
        var outtext = bot_script_obj.feed.entry[i].gsx$outgoing.$t;
        let response;

          response="Treatment for "+disease+" ==> "+outtext;


          if(count>0 && bot_script_obj.feed.entry[i].gsx$incoming.$t===problem && r==0){
            r=r+1;
	    document.getElementById("demo"+k).innerHTML=response;
		k++;
          }
          else if(r==0 && w==0){
              document.getElementById("demo"+k).innerHTML=response;
		k++;
            w=w+1;
          }
          else{
		document.getElementById("demo"+k).innerHTML=response;
		k++;
          }
          var problem=disease;
          count++; 
        }
        
if ( len===len && i===len-1 && count===0) {
  let response="Sorry for the inconvenience, your problem currently has no solution... but you can find it on our website"
 document.getElementById("demo"+k).innerHTML=response;
k++;
        }
              }

if(r!=0)
{
 let response2= "Apply any one treatment for "+problem
 document.getElementById("demo"+k).innerHTML=response2;
k++;
}

let response3= "If you have any other ailment then click refresh page and type again, Thank You"
 document.getElementById("demo"+k).innerHTML=response3;	

	}
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}
httpGetAsync(spreadsheet, res => console.log(JSON.parse(res)))
// document.getElementById("demo").innerHTML = "thank you for contacting";
}