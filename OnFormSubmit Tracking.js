// Get the score sheets & row info
var alphaGame = SpreadsheetApp.openById(/*YourScoresheetSpreadsheetID*/);
var scoreSheet = alphaGame.getSheetByName(/*SheetForTallying*/);
var pointChart = alphaGame.getSheetByName(/*SheetWithPointLimits*/);
var lastAGRow = scoreSheet.getLastRow();
var currentRow;

// ||||| EVENT TOGGLE ||||| //
var eventTime = "YES"; 

// Get max tallies allowed for this stat
var maxAllowed = pointChart.getRange(2, 4).getValue(); 
var counterColumn = 3;
var eventColumn = 5;

// Convert email (for organizations with two email/account domains)
var tester = email.split(/@/);
var testerFixed = tester[0]+"@"+/*DomainYouWantToUse*/;
testerFixed = String.toLowerCase(testerFixed);

// Get list of testers from sheet
var testers = scoreSheet.getRange(2,1,lastAGRow,1);
var testerList = testers.getValues();
var counters = scoreSheet.getRange(2,counterColumn,lastAGRow,counterColumn);
var counterList = counters.getValues();  

// Search for tester
for (var at = 0; at < testerList.length; at++){  
    currentRow = at + 2;
    if (testerList[at][0]==testerFixed){
    // Make sure tally limit isn't passed
      if (counterList[at][0] < maxAllowed){
        var currentCount = scoreSheet.getRange(currentRow, counterColumn).getValue();
        scoreSheet.getRange(currentRow, counterColumn).setValue(currentCount + 1);
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