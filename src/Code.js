/**
* Get the URL for the Google Apps Script running as a WebApp.
*/
function getScriptUrl() {
  var url = ScriptApp.getService().getUrl();
  return url;
}

function doGet(e) {
  Logger.log( Utilities.jsonStringify(e) );
  if (!e.parameter.page) {
    // When no specific page requested, return "home page"
    return HtmlService.createTemplateFromFile('Tutee').evaluate().setTitle("Tutee");
  }
  // else, use page parameter to pick an html file from the script
  return HtmlService.createTemplateFromFile(e.parameter['page']).evaluate().setTitle(e.parameter['page']);
}



//function doGet() {
//  return template = HtmlService
//  .createTemplateFromFile('Old Jquery').evaluate()
//}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
  .getContent();
}

function subToGoogle(sheetName, name, email, mphone, hphone, hmrm, datearr, subjarr){
  try{
    Logger.log("....")
    Logger.log(" ssheetName: "+sheetName+" name: "+name+" email: "+email+" mphone: "+mphone+" hphone: "+hphone+"hmrm: "+hmrm+" datearr: "+datearr+" subjarr: "+subjarr)
    //  var backupss = SpreadsheetApp.openById("1tz2qm3XHTLISzE624YZx7-Ts2Bhs5rLIHDZWOiyR1K4").getSheetByName("Sheet1")
    //  backupss.appendRow([eventnum, msg])
    var spread = SpreadsheetApp.openById("1fnf7KzIPLe1ep7dHjtyeof4I2Hu4jP0fc6ZiroSxypc")
    spread.getSheetByName("Backup").appendRow(["Added "+sheetName, name, email, mphone, hphone, hmrm, datearr, subjarr])
    var ss = spread.getSheetByName(sheetName)
    var alpha=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
    
    
    var data = ss.getDataRange().getValues();
    Logger.log(data)
    //  Logger.log(data.length-1)
    if(1==data.length-1){
      //Nothing in Form
      Logger.log("Nothing in Spread")
      if(sheetName == "Tutee"){
        subjarr = JSON.parse(subjarr)
        for(var q in subjarr){
          ss.appendRow([name, email, mphone, hphone, hmrm, JSON.stringify([subjarr[q]]), datearr])
        }
      }else{
        ss.appendRow([name, email, mphone, hphone, hmrm, subjarr, datearr])
      }
      return "Perfect"
    }
    for(var i=2; i<=data.length-1; i++){
      Logger.log(i)
      if(data[i][0].toLowerCase()==name){
        Logger.log("Exists in Sheet")
        //TD Let them edit it?
        return "You Already Are Part of the Library Tutoring Program. Please See the Librarian If You Would Like To Change Times, etc"
      }
      if(i==data.length-1){
        Logger.log("New Member")
        if(sheetName == "Tutee"){
          subjarr = JSON.parse(subjarr)
          for(var q in subjarr){
//            ss.appendRow([name, email, mphone, hphone, hmrm, JSON.stringify([subjarr[q]]), datearr, '=if(OR(ISERROR(VLOOKUP(concat(indirect(ADDRESS(row(),1)), indirect(ADDRESS(row(),6))),'+"'Tutee Done'"+'!$H$1:$H$195,1,false)), indirect(ADDRESS(row(),1)) = ""), "", "Done")','=and(REGEXMATCH(indirect(ADDRESS(row(),6)),"^\\[(\\""[^\\""]+\\""\\s?,\\s?)*\\""[^\\""]+\\""\\]$"),REGEXMATCH(indirect(ADDRESS(row(),7)),"^\\[(\\""[^\\""]+\\""\\s?,\\s?)*\\""[^\\""]+\\""\\]$"))'])
                        ss.appendRow([name, email, mphone, hphone, hmrm, JSON.stringify([subjarr[q]]), datearr, '=if(OR(ISERROR(VLOOKUP(concat(indirect(ADDRESS(row(),1)), indirect(ADDRESS(row(),6))),'+"'Tutee Done'"+'!$H$1:$H$195,1,false)), indirect(ADDRESS(row(),1)) = ""), "", "Done")',''])
          }
        }else{
          //is new tutor
//          ss.appendRow([name, email, mphone, hphone, hmrm, subjarr, datearr, '=and(REGEXMATCH(indirect(ADDRESS(row(),6)),"^\\[(\\""[^\\""]+\\""\\s?,\\s?)*\\""[^\\""]+\\""\\]$"),REGEXMATCH(indirect(ADDRESS(row(),7)),"^\\[(\\""[^\\""]+\\""\\s?,\\s?)*\\""[^\\""]+\\""\\]$"))'])
          ss.appendRow([name, email, mphone, hphone, hmrm, subjarr, datearr, ''])
        }
        return "Perfect"
      }
    }
  }catch(e){
    MailApp.sendEmail("jonahmail1@gmail.com", "Problem with librarytutor subtoGoogle", e)
  }
}

function getHmrmAndSubj(){
  try{
    
    var ss = SpreadsheetApp.openById("1fnf7KzIPLe1ep7dHjtyeof4I2Hu4jP0fc6ZiroSxypc").getSheetByName("Subjects and Hmrm")
    var data = ss.getRange("A1:C300").getValues()
    var subjArr = []
    var hrmArr = []
    for(var i in data){
      if(data[i][0] != ""){
        subjArr.push(data[i][0])
      }
      if(data[i][2] != ""){
        hrmArr.push(data[i][2])
      }
    }
    Logger.log([subjArr, hrmArr])
    return [subjArr, hrmArr.sort()]
  }catch(e){
    MailApp.sendEmail("jonahmail1@gmail.com", "Problem with librarytutor getHrmAndSubj", e)
  }
}
//function getSubj() {
//  
//  var ss = SpreadsheetApp.openById("1fnf7KzIPLe1ep7dHjtyeof4I2Hu4jP0fc6ZiroSxypc").getSheetByName("Subjects")
//  var data = ss.getRange("A1:A300").getValues()
//  rightarr = []  
//  for(var i in data){
//    if(data[i][0] != "")
//      rightarr.push(data[i][0])
//      }
//  Logger.log(rightarr)
//  return rightarr
//}
//
//function getHmrm() {
//  
//  var ss = SpreadsheetApp.openById("1fnf7KzIPLe1ep7dHjtyeof4I2Hu4jP0fc6ZiroSxypc").getSheetByName("Homeroom Teachers")
//  var data = ss.getRange("A1:A300").getValues()
//  var rightarr = []  
//  for(var i in data){
//    if(data[i][0] != "")
//      rightarr.push(data[i][0])
//      }
//  rightarr.sort()
//  Logger.log(rightarr)
//  return rightarr
//}


function getTutees() {
  try{
    var data = SpreadsheetApp.openById('1fnf7KzIPLe1ep7dHjtyeof4I2Hu4jP0fc6ZiroSxypc').getSheetByName("Tutee").getDataRange().getValues()
    rreturn = "<ul>"
    for (var i = 2; i < data.length; i++) {
      if(data[i][0]!="" && data[i][7]!="Done") {
        //      if(typeof data[i][5] =="object" && typeof data[i][5] =="object"){
        Logger.log(data[i][0] +" in "+data[i][5].replace(/[\[\]"]/g, "")+" during "+data[i][6].replace(/\]\["/g, ""))
        //        rreturn+="<li>"+data[i][0] +" in "+data[i][5].replace(/[\[\]"]/g, "")+" during "+data[i][6].replace(/[\[\]"]/g, "").replace(/,/g, ", ")+"</li>"
        rreturn+="<li>"+data[i][0] +" in "+data[i][5].replace(/[\[\]"]/g, "")+" during "+data[i][6].replace(/[\[\]"]/g, "").replace(/,/g, ", ")+"</li>"
        //      }else{
        //        Logger.log("Not object: "+data[i])
        //      rreturn+= JSON.stringify(data[i])
        //      }
      }
    }
    return rreturn
  }catch(e){
    MailApp.sendEmail("jonahmail1@gmail.com", "Problem with librarytutor getTutees", e)
  }
}

function intersection(arr1, arr2){
  //  Logger.log("arr1"+arr1)
  //  Logger.log("arr2"+arr2)
  var results = [];
  
  for (var i = 0; i < arr1.length; i++) {
    if (arr2.indexOf(arr1[i]) !== -1) {
      results.push(arr1[i]);
    }
  }
  return results
}


function IsJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

function checkAvailability(dataMatched, tutee, tutor, day){
  try{
    for(var i in dataMatched){
      if((dataMatched[i][0] == tutee && JSON.parse(dataMatched[i][3])[0] == day)||(dataMatched[i][1] == tutor && JSON.parse(dataMatched[i][3])[0] == day)){
        Logger.log("Between "+tutee+" (tutee) and "+tutor+" (tutor) have a days conflict")
        return false
      }
    }
    return true
  }catch(e){
    MailApp.sendEmail("jonahmail1@gmail.com", "Problem with librarytutor checkAvailability", e)
  }
}

function isValidClasses(classArr, allClasses){
  for(var i in classArr){
    if(allClasses.indexOf(classArr[i])==-1){
    return false
    }
  }
}

function matchTutee(){
//tdd
//  try{
    rreturn = {}
    errorMsg = ""
    var ss = SpreadsheetApp.openById('1fnf7KzIPLe1ep7dHjtyeof4I2Hu4jP0fc6ZiroSxypc')
    var dataTuteePreValidate= ss.getSheetByName("Tutee").getDataRange().getValues()
    var dataTutee = []
    var dataTutorPreValidate= ss.getSheetByName("Tutor").getDataRange().getValues()
    var dataTutor = []
    var dataMatchedRows = ss.getSheetByName("Tutee Done").getDataRange().getValues().slice(2)
    var tutorMatched = {}
    var dataClasses = ss.getSheetByName("Subjects and Hmrm").getRange("A1:A").getValues()
    var classes = []
    var dataMatched = []
    for(var e in dataClasses){
      if(dataClasses[e]!=""){
      classes.push(dataClasses[e][0])
      }
    }
//    return
    //  var tuteeMatched = {}
    
    //  var lenDataTutor = dataTutor.length
    for(var p=2; p<dataTutorPreValidate.length; p++){
      //Number Tuttoring, date taken(when making guesses)
      if(dataTutorPreValidate[p][0] == ""){
        continue;
      }
//      Logger.log(classes)
//      Logger.log(isValidClasses(JSON.parse(dataTutorPreValidate[2][5]),classes))
//      true
//     Logger.log(dataTutorPreValidate[p][5])
      if(IsJson(dataTutorPreValidate[p][5]) === false){
        Logger.log("INVALID Class JSON for tutor: "+dataTutorPreValidate[p][0])
        errorMsg+="Invalid (check quotes and commas) 'Classes To Be Tutored' for tutor "+dataTutorPreValidate[p][0]+"<br>"
        continue
      }else if(IsJson(dataTutorPreValidate[p][6]) === false){
        Logger.log("INVALID Data Available JSON for tutor: "+dataTutorPreValidate[p][0])
        errorMsg+="Invalid (check quotes and commas) 'Date Available' for tutor "+dataTutorPreValidate[p][0]+"<br>"
        continue
      }else if(isValidClasses(JSON.parse(dataTutorPreValidate[p][5]),classes) === false){
        Logger.log("INVALID Class Available JSON for tutor: "+dataTutorPreValidate[p][0])
        errorMsg+="Don't have class "+JSON.parse(dataTutorPreValidate[p][5])[0]+" for tutor "+dataTutorPreValidate[p][0]+"<br>"        
        continue
      }
//      Logger.log(p)
      tutorMatched[dataTutorPreValidate[p][0]]=[0, []]
//      Logger.log(dataTutorPreValidate[p][0],dataTutorPreValidate[p][1],dataTutorPreValidate[p][2],dataTutorPreValidate[p][3],dataTutorPreValidate[p][4],dataTutorPreValidate[p][5],dataTutorPreValidate[p][6])
      dataTutor.push([dataTutorPreValidate[p][0],dataTutorPreValidate[p][1],dataTutorPreValidate[p][2],dataTutorPreValidate[p][3],dataTutorPreValidate[p][4],JSON.parse(dataTutorPreValidate[p][5]),JSON.parse(dataTutorPreValidate[p][6])])
    }
  
  
    for(var z in dataMatchedRows){
      if(dataMatchedRows[z][0] == ""){
      continue;
      }
      if(IsJson(dataMatchedRows[z][2]) === false){
        Logger.log("INVALID Tutored In JSON for 'Tutee Done' with tutee: "+dataMatchedRows[z][0])
        errorMsg+="Invalid (check quotes and commas) 'Tutored In' for 'Tutee Done' with tutee "+dataMatchedRows[z][0]+"<br>"
        continue
      }else if(IsJson(dataMatchedRows[z][3]) === false){
        Logger.log("INVALID Date JSON for 'Tutee Done' with tutee: "+dataMatchedRows[z][0])
        errorMsg+="Invalid (check quotes and commas)'Date' for 'Tutee Done' with tutee "+dataMatchedRows[z][0]+"<br>"
//        Logger.log(JSON.parse(dataMatched[z][2])[0])
        continue
      }else if(classes.indexOf(JSON.parse(dataMatchedRows[z][2])[0])==-1){
        Logger.log("INVALID Class Available JSON at 'Tutee done' for tutee: "+dataMatchedRows[z][0])
        errorMsg+="Don't have class "+JSON.parse(dataMatched[z][2])[0]+" for tutee/tutor match with tutee "+dataMatchedRows[z][0]+"<br>"        
        continue
      }
      dataMatched.push(dataMatchedRows[z])
      
      if(!(tutorMatched.hasOwnProperty(dataMatchedRows[z][1]))){
        //Number Tuttoring, date taken(when making guesses)
        tutorMatched[dataMatchedRows[z][1]] = [1, []] 
      }else{
        tutorMatched[dataMatchedRows[z][1]][0]++
      }
    }
    
    for(var p =2; p< dataTuteePreValidate.length; p++){
      //    tuteeMatched[dataTutee[p][0]] = []
      if(dataTuteePreValidate[p][0] == "" ){continue;}
            if(IsJson(dataTuteePreValidate[p][5]) === false){
        Logger.log("INVALID Class JSON for tutee: "+dataTuteePreValidate[p][0])
        errorMsg+="Invalid (check quotes and commas) 'Classes To Be Tutored' for tutee "+dataTuteePreValidate[p][0]+"<br>"
        continue
      }else if(IsJson(dataTuteePreValidate[p][6]) === false){
        Logger.log("INVALID Data Available JSON for tutor: "+dataTutorPreValidate[p][0])
        errorMsg+="Invalid (check quotes and commas) 'Date Available' for tutee "+dataTuteePreValidate[p][0]+"<br>"
        continue
      }else if(isValidClasses(JSON.parse(dataTuteePreValidate[p][5]),classes) === false){
        Logger.log("INVALID Class Available JSON for tutee: "+dataTuteePreValidate[p][0])
        errorMsg+="Don't have class "+JSON.parse(dataTuteePreValidate[p][5])[0]+" for tutee "+dataTuteePreValidate[p][0]+"<br>"        
        continue
      }
      
//      Logger.log(JSON.stringify(dataTuteePreValidate[p]))
      
      dataTutee.push([dataTuteePreValidate[p][0],dataTuteePreValidate[p][1],dataTuteePreValidate[p][2],dataTuteePreValidate[p][3],dataTuteePreValidate[p][4],JSON.parse(dataTuteePreValidate[p][5]),JSON.parse(dataTuteePreValidate[p][6]),dataTuteePreValidate[p][7]])
//      Logger.log("isMatched:"+dataTutee[p-2][7])
    }
//  return 
  
    //Put validaion here for json
    Logger.log("Tutor Possibilitties "+JSON.stringify(tutorMatched))
    
    for(var i=0; i<dataTutee.length;i++){
      if(dataTutee[i][7] == "Done"){Logger.log("skipping "+dataTutee[i]+" because already done/matched");continue;}
      
      for(var q=0; q<dataTutor.length;q++){
        Logger.log("tutee: "+i+"="+dataTutee[i][0]+";tutor: "+q+"="+dataTutor[q][0])
        if(tutorMatched[dataTutor[q][0]][0]>=3){
          Logger.log("Skipping "+dataTutor[q][0]+" b/c has 3 or more tutees")
          continue;
        }
        matchedSubj = intersection(dataTutor[q][5],dataTutee[i][5])
        matchedDays = intersection(dataTutor[q][6],dataTutee[i][6])
        //          Logger.log("INTERSECTION"+dataTutee[i][0]+" and "+dataTutor[q][0]+" in "+matchedSubj)
        Logger.log("matched days for "+dataTutor[q][0]+" and "+dataTutee[i][0]+": "+matchedDays)
        Logger.log("matched subj for "+dataTutor[q][0]+" and "+dataTutee[i][0]+": "+matchedSubj)
        //        Logger.log("Avaukablity between "+dataTutee[i][0]+" and "+dataTutor[q][0]+": "+checkAvailability(dataMatched, dataTutee[i][0], dataTutor[q][0], matchedDays[0]))
        if(matchedDays.length>0 && matchedSubj.length>0){
          Logger.log("Has Options for both days and subj")
          for(var c=0; c<matchedDays.length; c++){
            Logger.log("checking days "+c)
//            Logger.log(checkAvailability(dataMatched, dataTutee[i][0], dataTutor[q][0], matchedDays[c]))
            Logger.log(tutorMatched[dataTutor[q][0]][1].indexOf(matchedDays[c])==-1)            
            //            Logger.log(tuteeMatched[dataTutee[i][0]])
            //check availablity only for CURRENT(in matched arr) days for both tutee and tutor
            
            if(checkAvailability(dataMatched, dataTutee[i][0], dataTutor[q][0], matchedDays[c]) == true/** tutorMatched[dataTutor[q][0]][1].indexOf(matchedDays[c])==-1 && tuteeMatched[dataTutee[i][0]].indexOf(matchedDays[c])==-1**/){
              Logger.log("PERFECT between "+dataTutee[i][0]+" and "+dataTutor[q][0]+"has availablity and everythig")
              
              tutorMatched[dataTutor[q][0]][1].push(matchedDays[c])
              //UNCOMMENT BELOW HERE IF WANT TO MAKE FIRST OPTION ALWAYS WORK (A)
              //              tuteeMatched[dataTutee[i][0]].push([matchedSubj[0], matchedDays[c]])
              
              if(rreturn.hasOwnProperty(dataTutee[i][0])){
                rreturn[dataTutee[i][0]].push([dataTutee[i][0], dataTutor[q][0], matchedSubj[0], matchedDays[c]+" ("+(parseInt(tutorMatched[dataTutor[q][0]][0])>1 ?(tutorMatched[dataTutor[q][0]][0]+" tutees already)"):(tutorMatched[dataTutor[q][0]][0]+" tutee already)"))])
                //                tutorMatched[dataTutor[q][0]][0]++
              }else{
                //Assume will pick 1st one, makes sure doesnt have two in the end
                rreturn[dataTutee[i][0]] = [[dataTutee[i][0], dataTutor[q][0], matchedSubj[0], matchedDays[c]+" ("+(parseInt(tutorMatched[dataTutor[q][0]][0])>1 ?(tutorMatched[dataTutor[q][0]][0]+" tutees already)"):(tutorMatched[dataTutor[q][0]][0]+" tutee already)"))]]
                //ONly ++ here bc assume only will choose 1st, others good options b probably wont choose
                //UNCOMMENT BELOW HERE IF WANT TO MAKE FIRST OPTION ALWAYS WORK (B)
                //                tutorMatched[dataTutor[q][0]][0]++
                
              }
              Logger.log("We have a match ON "+matchedDays[0]+" Between "+dataTutee[i][0]+" and "+dataTutor[q][0]+" in "+matchedSubj)
              //break out of matcheddays loop so picks first perfect match, why >> mondays
              break;
            }
          }
        }
        Logger.log("---")
      }
      Logger.log("-------------------------------------------------------------")
      
      
    }
    Logger.log("edning")
    Logger.log([rreturn,errorMsg])
    return [rreturn,errorMsg]
//  }catch(e){
//    MailApp.sendEmail("jonahmail1@gmail.com", "Problem with librarytutor matchTutee", e)
//  }
}

function toTitleCase(str)
{
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function nextSession(date, dayWantedstr) {
  date = new Date(new Date(date).getTime()+432000000)
  dayConvert = {Sunday: 0,
                Monday: 1,
                Tuesday: 2,
                Wednesday: 3,
                Thursday: 4,
                Friday: 5,
                Saturday: 6}
  dayWanted = dayConvert[dayWantedstr]
  var ret = new Date(date||new Date());
  ret.setDate(ret.getDate() + (dayWanted - 1 - ret.getDay() + 7) % 7 + 1);
  return ret;
}


function submitMatches(arrMatches){
  try{
    
    var spread = SpreadsheetApp.openById("1fnf7KzIPLe1ep7dHjtyeof4I2Hu4jP0fc6ZiroSxypc")
    
    Logger.log("start sub")
    var ss = SpreadsheetApp.openById('1fnf7KzIPLe1ep7dHjtyeof4I2Hu4jP0fc6ZiroSxypc')
    var Tuteesheet= ss.getSheetByName("Tutee")
    var Tuteesheetdata= Tuteesheet.getDataRange().getValues()
    var Tutorsheet= ss.getSheetByName("Tutor")
    var Tutorsheetdata= Tutorsheet.getDataRange().getValues()
    var Matchedsheet = ss.getSheetByName("Tutee Done")
    var Matchedsheetdata = Matchedsheet.getDataRange().getValues()
    var Backup = ss.getSheetByName("Backup")
    for(var z in arrMatches){
      spread.getSheetByName("Backup").appendRow(["Matched", "Tutee: "+arrMatches[z][0], "Tutee: "+arrMatches[z][1], "subj: "+arrMatches[z][2]])
    }
    
    var orgDoc = DocumentApp.openById("1jRtSaRR6kUx5fb-fvqiYeEW2_-vQ92MKswvyW0NhTKI")
    var orgDocId = orgDoc.getId()
    var orgDrive = DriveApp.getFileById(orgDocId)
    orgDrive.makeCopy("Tutee Matched for "+orgDrive.getLastUpdated().toDateString(),   DriveApp.getFolderById("0B9p0o3fo9cfwRE1QSVdmWFZQZkU"))
    doc = orgDoc.getBody().clear()
    
    
    
    
    for(var i in arrMatches){
      
      arrMatches[i][3] = arrMatches[i][3].replace(/ \([0-9]+ tutee(s)? already\)/, "")
      //Bevause added (0 tutees already) which was needed for the match, will pass that parenthetical along. Need to remove
      //Find Tutee
      var thisTutorData = []
      for(var w=2; w<Tutorsheetdata.length; w++){
        if(Tutorsheetdata[w][0] == arrMatches[i][1]){
          thisTutorData = Tutorsheetdata[w]
        }
      }
      Logger.log("Tutor: "+JSON.stringify(thisTutorData))
      
      var thisTuteeData = []
      for(var q=2; q<Tuteesheetdata.length; q++){
        if(Tuteesheetdata[q][0] == arrMatches[i][0] && JSON.parse(Tuteesheetdata[q][5])[0] == arrMatches[i][2]){
          thisTuteeData = Tuteesheetdata[q]
          //        Tuteesheet.getRange("H"+(q+1)).setValues([["Done"]])
          //taken up by formula
        }
      }
      Logger.log("Tuteee: "+JSON.stringify([arrMatches[i][0], arrMatches[i][1], JSON.stringify([arrMatches[i][2]]), JSON.stringify([arrMatches[i][3]]), (new Date()).toDateString()]))
      
//      Matchedsheet.appendRow([arrMatches[i][0], arrMatches[i][1], JSON.stringify([arrMatches[i][2]]), JSON.stringify([arrMatches[i][3].replace(/ \([0-9]+ tutee(s)? already\)/, "")]), (new Date()).toDateString(),"",'=and(REGEXMATCH(indirect(ADDRESS(row(),3)),"^\\[(\\""[^\\""]+\\""\\s?,\\s?)*\\""[^\\""]+\\""\\]$"),REGEXMATCH(indirect(ADDRESS(row(),4)),"^\\[(\\""[^\\""]+\\""\\s?,\\s?)*\\""[^\\""]+\\""\\]$"))', "=CONCAT(indirect(ADDRESS(row(),1)), indirect(ADDRESS(row(),3)))"])
      Matchedsheet.appendRow([arrMatches[i][0], arrMatches[i][1], JSON.stringify([arrMatches[i][2]]), JSON.stringify([arrMatches[i][3].replace(/ \([0-9]+ tutee(s)? already\)/, "")]), (new Date()).toDateString(),"",'', "=CONCAT(indirect(ADDRESS(row(),1)), indirect(ADDRESS(row(),3)))"])
      
      
      doc.appendTable([["Sent to:\nTUTEE NAME: "+toTitleCase(arrMatches[i][0])+"\nHOMEROOM TEACHER: "+(thisTuteeData[4])+""+"\nSUBJECT: "+arrMatches[i][2]+"\t\tToday's Date: "+(new Date()).toDateString()]])
      doc.appendParagraph("Please contact your tutor before start date")
      doc.appendParagraph("TUTOR NAME: "+toTitleCase(arrMatches[i][1]))
      doc.appendParagraph("Tutor's HR Teacher: "+thisTutorData[4])
      doc.appendParagraph("Tutor Cell: "+thisTutorData[2]+";  Tutor Home Phone: "+thisTutorData[3])
      doc.appendParagraph("Tutor Email: "+thisTutorData[1])
      doc.appendParagraph("On All "+arrMatches[i][3]+"s (AM - 7:10-7:35   PM - 2:20-3:10)")
      doc.appendParagraph("Start Date: "+nextSession(new Date(), arrMatches[i][3].split(" ")[0]).toDateString())
      doc.appendParagraph("")
      doc.appendParagraph("---------------------")
      doc.appendParagraph("")
      
      doc.appendTable([["Sent to:\nTUTOR NAME: "+toTitleCase(arrMatches[i][1])+"\nHOMEROOM TEACHER: "+(thisTutorData[4])+""+"\nSUBJECT: "+arrMatches[i][2]+"\t\tToday's Date: "+(new Date()).toDateString()]])
      doc.appendParagraph("Please contact your tutee before start date")
      doc.appendParagraph("TUTEE NAME: "+toTitleCase(arrMatches[i][0]))
      //        Logger.log(JSON.parse(thisTuteeData[4])[0])
      doc.appendParagraph("Tutee's HR Teacher: "+thisTuteeData[4])
      doc.appendParagraph("Tutee Cell: "+thisTuteeData[2]+";  Tutor Home Phone: "+thisTuteeData[3])
      doc.appendParagraph("Tutee Email: "+thisTuteeData[1])
      doc.appendParagraph("On All "+arrMatches[i][3]+"s (AM - 7:10-7:35   PM - 2:20-3:10)")
      doc.appendParagraph("Start Date: "+nextSession(new Date(), arrMatches[i][3].split(" ")[0]).toDateString())
      doc.appendParagraph("---------------------")
      doc.appendPageBreak()
      
      //      Tuteesheet.deleteRow(q)
      //        Logger.log(JSON.stringify(Tutorsheetdata[q]))
      
    }
  }catch(e){
    MailApp.sendEmail("jonahmail1@gmail.com", "Problem with librarytutor subtoGoogle", e)
  } 
  return "Perfect"
}



//sendEmail(to, toname, from, fromname, subj, message, htmlortext)
function sendEmail(a,e,f,g,h,b,c){if("string"==typeof a)tos=[{email:a,name:e,type:"to"}];else{tos=[];for(var d in a)tos.push({email:a[d],name:a[d],type:"to"})}a={key:"C0aGPbRA9MmJ8poMQT2ciA",message:{subject:h,from_email:f,from_name:g,to:tos}};Logger.log("htmltext "+c);"html"==c?(a.message.html=b,Logger.log("html")):"text"==c&&(Logger.log("text"),a.message.text=b);b={method:"post",payload:JSON.stringify(a),contentType:"application/json"};UrlFetchApp.fetch("https://mandrillapp.com/api/1.0/messages/send.json",b)};
//

function checkMatches(possibleMatches){
  try{
    //  possibleMatches = [["sara comaromi","shreeyad pant","Biology","Monday PM"],["sara comaromi","elijah boswell","Geometry","Monday PM"],["sam hodgetts","annie brantigan","U.S. Government","Thursday AM"]]
    //TEST FOR MULTIPLE TUTORS TOO MANY(ie kenton)
    //check for tutors with more then 3 or with multiple on same day
    //check tutess for multiple on same day
    
    var tuteeObj = {}
    var tutorObj = {}
    
    var allMatches = []
    var allOutHtml = ""
    
    var ss = SpreadsheetApp.openById('1fnf7KzIPLe1ep7dHjtyeof4I2Hu4jP0fc6ZiroSxypc')
    var Tuteesheet= ss.getSheetByName("Tutee Done").getDataRange().getValues()
    
    var tutorsToBeMatched = [];
    
    for(var q in possibleMatches){
      allMatches.push([[possibleMatches[q][0],possibleMatches[q][1],JSON.stringify([possibleMatches[q][2]]),JSON.stringify([possibleMatches[q][3]])]])
      tutorsToBeMatched.push(possibleMatches[q][1])
    }
    
    
    for(var z =2; z<Tuteesheet.length; z++){
      if(Tuteesheet[z][0] == ""){continue}
      allMatches.push([[Tuteesheet[z][0],Tuteesheet[z][1],Tuteesheet[z][2],Tuteesheet[z][3]]])
    }
    
    
    Logger.log(JSON.stringify(allMatches))
    
    for(var i in allMatches){
      //    Logger.log(allMatches[i][0])
      //    Logger.log(allMatches[i])
      //Tutor, check more then 3 rows, same day
      if(tutorObj.hasOwnProperty(allMatches[i][0][1]) == false){
        //novel tutor for obj
        tutorObj[allMatches[i][0][1]] = [1, [allMatches[i][0][3]]]
      }else{
        //same tutor, check if same
        tutorObj[allMatches[i][0][1]][0]++
          
          if(tutorObj[allMatches[i][0][1]][0] >= 3 && tutorsToBeMatched.indexOf(allMatches[i][0][1]) !=-1){
            allOutHtml+="tutor "+allMatches[i][0][1]+" will have 3 tutees<br>"
            Logger.log("tutor "+allMatches[i][0][1]+" will have 3 tutees")
          }
        if(tutorObj[allMatches[i][0][1]][1].indexOf(allMatches[i][0][3]) !=-1){
          Logger.log("tutor "+allMatches[i][0][1]+" has/will have multiple tutees on "+JSON.parse(allMatches[i][0][3])[0])
          allOutHtml+="tutor "+allMatches[i][0][1]+" has/will have multiple tutees on "+JSON.parse(allMatches[i][0][3])[0]+"<br>"
        }
        tutorObj[allMatches[i][0][1]][1].push(allMatches[i][0][3])
        
      }
      
      if(tuteeObj.hasOwnProperty(allMatches[i][0][0]) == false){
        //novel tutor for obj
        tuteeObj[allMatches[i][0][0]] = [allMatches[i][0][3]]
      }else{
        //same tutor, check if same
        if(tuteeObj[allMatches[i][0][0]].indexOf(allMatches[i][0][3]) !=-1){
          allOutHtml+="tutee "+allMatches[i][0][0]+" has/will have multiple tutees on "+JSON.parse(allMatches[i][0][3])[0]+"<br>"
          Logger.log("tutee "+allMatches[i][0][0]+" has/will have multiple tutees on "+JSON.parse(allMatches[i][0][3])[0])
        }
        tuteeObj[allMatches[i][0][0]].push(allMatches[i][0][3])
        
        
      }
      
      
    }
    Logger.log("__")
    return [allOutHtml, possibleMatches]
  }catch(e){
    MailApp.sendEmail("jonahmail1@gmail.com", "Problem with librarytutor getHrmAndSubj", e)
  }
}

//  for(var i =2; i< allTutee.length; i++){
////    Logger.log(allTutee[i])
//    if(tuteeObj.hasOwnProperty(allTutee[i][0]) == true){
//      //already has property of tutee name, check if already have day
//      if(tuteeObj[allTutee[i][0]].indexOf(JSON.parse(allTutee[i][3])[0]) !=-1){
//        Logger.log("Tutee "+allTutee[i][0]+" has multiple days")
//      }
//      tuteeObj[allTutee[i][0]].push(JSON.parse(allTutee[i][3])[0])
//    }else{
//      tuteeObj[allTutee[i][0]] = [JSON.parse(allTutee[i][3])[0]]
//    }
//    
//    if(tutorObj.hasOwnProperty(allTutee[i][1]) == true){
//      tutorObj[allTutee[i][1]][0]++
//      //already has property of tutee name, check if already have day
//      if(tutorObj[allTutee[i][1]][1].indexOf(JSON.parse(allTutee[i][3])[0]) !=-1){
//        Logger.log("Tutor "+allTutee[i][0]+" has multiple days")
//      }
//      tutorObj[allTutee[i][1]][1].push(JSON.parse(allTutee[i][3])[0])
//    }else{
//      
//      tutorObj[allTutee[i][1]] = [0,[JSON.parse(allTutee[i][3])[0]]]
//    }
//    
////    
////    if(tutorObj.hasOwnProperty(allTutee[i][1]) == true){
////      tutorObj[allTutee[i][1]][0]++
////    }else{
////      tutorObj[allTutee[i][1]] = [1, [JSON.parse(allTutee[i][3])[0]]]
////    }
//  }

//
//  for(var q in tutorObj){
//    if(tutorObj[q][0]>2){
//      Logger.log(q+" has too many")
//    }
//  }
//  

function test(){
  arr = ["a", "c", "d"]
  c =     arr.some(function(a,b){
    if(a.length!=1){
//      Logger.log(a)
      return true
    }
    
  })
  Logger.log(c)
  //  DocumentApp.create("Tutee Matched for "+new Date().toDateString())
  //  ddoc = DriveApp.getFolderById("0B9p0o3fo9cfwSmRzYS1tME04LVU")
  //  DocumentApp.openById(ddoc.getId()).getBody().clear().appendParagraph("Hello World")
  
//  orgDoc = DocumentApp.openById("1jRtSaRR6kUx5fb-fvqiYeEW2_-vQ92MKswvyW0NhTKI")
//  orgDocId = orgDoc.getId()
//  orgDrive = DriveApp.getFileById(orgDocId)
//  orgDrive.makeCopy("Tutee Matched for "+orgDrive.getLastUpdated().toDateString(),   DriveApp.getFolderById("0B9p0o3fo9cfwRE1QSVdmWFZQZkU"))
//  orgDoc.getBody().clear().appendParagraph("HellOOO WORLD")
//  SpreadsheetApp.openById("1fnf7KzIPLe1ep7dHjtyeof4I2Hu4jP0fc6ZiroSxypc").getSheetByName("Tutor").appendRow(['=and(REGEXMATCH(indirect(ADDRESS(row(),6)),"^\\[(\\""[^\\""]+\\""\\s?,\\s?)*\\""[^\\""]+\\""\\]$"),REGEXMATCH(indirect(ADDRESS(row(),7)),"^\\[(\\""[^\\""]+\\""\\s?,\\s?)*\\""[^\\""]+\\""\\]$"))'])
  SpreadsheetApp.openById("1fnf7KzIPLe1ep7dHjtyeof4I2Hu4jP0fc6ZiroSxypc").getSheetByName("Tutor").appendRow([''])
  //  DriveApp.getFolderById(id).setTrashed(true)
  //  
}
//
//function matchOldTutee(){
//  rreturn = {}
//  var ss = SpreadsheetApp.openById('1fnf7KzIPLe1ep7dHjtyeof4I2Hu4jP0fc6ZiroSxypc')
//  var dataTutee= ss.getSheetByName("Tutee").getDataRange().getValues()
//  var dataTutor= ss.getSheetByName("Tutor").getDataRange().getValues()
//  var dataMatched = ss.getSheetByName("Tutee Done").getDataRange().getValues().slice(2)
//  var tutorMatched = {}
//  var tuteeMatched = {}
//  
//  for(var p=2; p<dataTutor.length; p++){
//    tutorMatched[dataTutor[p][0]]=[0, []]
//    //Number Tuttoring, date taken(when making guesses)
//  }
//  
//  
//  for(var z in dataMatched){
//    if(!(tutorMatched.hasOwnProperty(dataMatched[z][1]))){
//      tutorMatched[dataMatched[z][1]] = [1, []] 
//      //Number Tuttoring, date taken(when making guesses)
//    }else{
//      
//      tutorMatched[dataMatched[z][1]][0]++
//    }
//  }
//  Logger.log("Tutor Possibilitties "+JSON.stringify(tutorMatched))
//  
//  for (var i = 2; i < dataTutee.length; i++) {
//    tuteeMatched[dataTutee[i][0]] = []
//    if(IsJson(dataTutee[i][5]) == false||IsJson(dataTutee[i][6]) == false){
//      Logger.log(dataTutee[i][0]+" ISS NOT ALL AN ARRAY")
//      //TD SHOW ON WEBSITE
//    }else{
//      dataTutee[i][5] = JSON.parse(dataTutee[i][5])
//      dataTutee[i][6] = JSON.parse(dataTutee[i][6])
//    }
//    Logger.log("i: "+i+": "+dataTutee[i][0])
//    for(var q=2; q<dataTutor.length;q++){
//      Logger.log("q: "+q+": "+dataTutor[q][0])
//      if(tutorMatched[dataTutor[q][0]][0]>=3){
//        Logger.log("Skipping "+dataTutor[q][0]+" b/c has 2 tutees")
//        continue;
//      }else{
//        if(typeof dataTutor[q][5] == "string"||typeof dataTutor[q][6] == "string"){
//          //ONly First time
//          Logger.log("Hopefully 1st time")
//          if(IsJson(dataTutor[q][5]) == false||IsJson(dataTutor[q][6]) == false){
//            Logger.log(dataTutor[q][0]+" ISSS NOT ALL AN ARRAY")
//            
//            //TD SHOW ON WEBSITE
//            continue;
//          }else{
//            //TD? So assumes will choose first tutor and adds one so 1 tutor doesn't get tons of people
//            dataTutor[q][5] = JSON.parse(dataTutor[q][5])
//            dataTutor[q][6] = JSON.parse(dataTutor[q][6])
//          }
//        }
//        
//        //    Logger.log("Tutee")
//        //    Logger.log(dataTutee[i][5])
//        //    Logger.log("Tutor")
//        //        Logger.log(dataTutor[q][5])
//        matchedSubj = intersection(dataTutor[q][5],dataTutee[i][5])
//        matchedDays = intersection(dataTutor[q][6],dataTutee[i][6])
//        //          Logger.log("INTERSECTION"+dataTutee[i][0]+" and "+dataTutor[q][0]+" in "+matchedSubj)
//        Logger.log("matched days: "+matchedDays)
//        Logger.log("matched subj: "+matchedSubj)
//        Logger.log("Avaukablity between "+dataTutee[i][0]+" and "+dataTutor[q][0]+": "+checkAvailability(dataMatched, dataTutee[i][0], dataTutor[q][0], matchedDays[0]))
//        if(matchedDays.length>0 && matchedSubj.length>0){
//          for(var c=0; c<matchedDays.length; c++){
//            //TD
//            if(checkAvailability(dataMatched, dataTutee[i][0], dataTutor[q][0], matchedDays[c]) == true /**&& tutorMatched[dataTutor[q][0]][1].indexOf(matchedDays[c])==-1 && tuteeMatched[dataTutee[i][0]].indexOf(matchedDays[c])==-1**/){
//              Logger.log("PERFECTbetween "+dataTutee[i][0]+" and "+dataTutor[q][0]+"has availablity and everythig")
//              if(rreturn.hasOwnProperty(dataTutee[i][0])){
//                rreturn[dataTutee[i][0]].push([dataTutee[i][0], dataTutor[q][0], matchedSubj[0], matchedDays[c]])
//                tutorMatched[dataTutor[q][0]][1].push(matchedDays[c])
//                tuteeMatched[dataTutee[i][0]].push(matchedDays[c])
//              }else{
//                //Assume will pick 1st one, makes sure doesnt have two in the end
//                rreturn[dataTutee[i][0]] = [[dataTutee[i][0], dataTutor[q][0], matchedSubj[0], matchedDays[c]]]
//                tutorMatched[dataTutor[q][0]][0]++
//                  tutorMatched[dataTutor[q][0]][1].push(matchedDays[c])
//                  tuteeMatched[dataTutee[i][0]].push(matchedDays[c])
//              }
//              Logger.log("We have a match ON "+matchedDays[0]+" Between "+dataTutee[i][0]+" and "+dataTutor[q][0]+" in "+matchedSubj)
//              
//              break;
//            }
//          }
//        }
//      }
//      //    if(data[i][0]!="") {
//      //      //      if(typeof data[i][5] =="object" && typeof data[i][5] =="object"){
//      //      Logger.log(data[i][0] +" inn "+data[i][5]+" during "+data[i][6])
//      //      rreturn+=data[i][0] +" inn "+data[i][5]+" during "+data[i][6]+"<br>"
//      //      //      }else{
//      //      //        Logger.log("Not object: "+data[i])
//      //      //      rreturn+= JSON.stringify(data[i])
//      //      //      }
//      //    }
//      Logger.log("---")
//    }
//    
//    Logger.log("--------------------------")
//  }
//  Logger.log("returning"+JSON.stringify(rreturn))
//  return rreturn
//}4435588840
function sendSMS(){
  // Get account SID and auth token here:
  //   https://www.twilio.com/user/account
  var accountSid = "AC04bae9b376f88ae4f09770b11d76a450";
  var authToken = "26e5a124aadc5cd447097bf818d606a2";
  var url = "https://api.twilio.com/2010-04-01/Accounts/" + accountSid + "/SMS/Messages.json";
  var options = {
    method: "post",
    headers: {
      Authorization: "Basic " + Utilities.base64Encode(accountSid + ":" + authToken)
    },
    payload: {
      // From is one of your Twilio phone numbers
      From: "+12405471798",
      To: "+14435588840",
      Body: "Test from Google Apps Script"
    }
  };
  var response = UrlFetchApp.fetch(url, options);
  Logger.log(response);
  
}
