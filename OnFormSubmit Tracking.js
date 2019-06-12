// Get the score sheets & row info
var alphaGame = SpreadsheetApp.openById(/*YourScoresheetSpreadsheetID*/);
var scoreSheet = alphaGame.getSheetByName(/*SheetForTallying*/);
var pointChart = alphaGame.getSheetByName(/*SheetWithPointLimits*/);
var lastAGRow = scoreSheet.getLastRow();
var currentRow;

// ||||| EVENT TOGGLE ||||| //
// Change to toggle special event bonuses off/on
var eventTime = "YES"; 

// Get max tallies allowed for this stat
var maxAllowed = pointChart.getRange(2, 4).getValue(); 

// Column number for this tracked stat's tally
var counterColumn = 3;
// Column for this tracked stat's event bonus tally
var eventColumn = 5;

// Convert email (for organizations with two email/account domains)
var user = email.split(/@/);
var userFixed = tester[0]+"@"+/*DomainYouWantToUse*/;
userFixed = String.toLowerCase(userFixed);

// Get list of testers from sheet
var users = scoreSheet.getRange(2,1,lastAGRow,1);
var userList = users.getValues();
var counters = scoreSheet.getRange(2,counterColumn,lastAGRow,counterColumn);
var counterList = counters.getValues();  

// Search for tester
for (var at = 0; at < userList.length; at++){  
    currentRow = at + 2;
    if (userList[at][0]==userFixed){
    // Make sure tally limit isn't passed
      if (counterList[at][0] < maxAllowed){
        var currentCount = scoreSheet.getRange(currentRow, counterColumn).getValue();
        scoreSheet.getRange(currentRow, counterColumn).setValue(currentCount + 1);
        // Add event tally if applicable
        if (eventTime == "YES"){
          var currentEventCount = scoreSheet.getRange(currentRow, eventColumn).getValue();
          scoreSheet.getRange(currentRow, eventColumn).setValue(currentEventCount + 1);
        }
        break;
      }
      else {
        break;
      }
    }
}