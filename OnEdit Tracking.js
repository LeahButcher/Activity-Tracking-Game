// Get score sheet and row info
var alphaGame = SpreadsheetApp.openById(/*YourScoresheetID*/);
var scoreSheet = alphaGame.getSheetByName(/*ScoresheetName*/);
var pointChart = alphaGame.getSheetByName(/*PointSheetName*/);
var lastAGRow = scoreSheet.getLastRow();
var currentRow;

// Get max tallies allowed
var maxAllowed = pointChart.getRange(6, 4).getValue(); 

// Column that this tally is in on your score sheet
var counterColumn = 7;

// Get the user
user = Session.getActiveUser().getEmail();
user = String.toLowerCase(user);

// Get users and counters from score sheet
var users = scoreSheet.getRange(2,1,lastAGRow,1);
var userList = users.getValues();
var counters = scoreSheet.getRange(2,counterColumn,lastAGRow,counterColumn);
var counterList = counters.getValues();  

// Locate user
for (var at = 0; at < userList.length; at++){  
  currentRow = at + 2;
  if (userList[at][0]==user){
  // Tally if less than max allowed
    if (counterList[at][0] < maxAllowed){
      var currentCount = scoreSheet.getRange(currentRow, counterColumn).getValue();
      scoreSheet.getRange(currentRow, counterColumn).setValue(currentCount + 1);
      break;
    }
    else {
      break;
    }
  }
}