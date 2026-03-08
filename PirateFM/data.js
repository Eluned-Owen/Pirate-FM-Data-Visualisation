//We first get the year from activeYear, the active year is then going through getData() which copmares activeYear to the tableDict through yearKey({1990: ...}), if its in there push it into the displayingTable. We then turn the data from tableDict from objects to string and push it to allTogether(). AllTogether() should have the activeYear in string form ready to display, where it will update the display div in sketchjs

let allTogether = []
let year1990, year1991, year1992, year1993, year1994, year1995, year1996, year1997, year1998, year1999, year2000
let freq1990, freq1991, freq1992, freq1993, freq1994, freq1995, freq1996, freq1997, freq1998, freq1999, freq2000
let displayingTable
let tableDict

function preload(){
  radioBackground = loadImage('data/radioBG2.png');
  //I would love to make all of these loadTables() into a loop but I don't think it's possible since the file directory is quite strict and doesn't allow for concatination
  year1990 = loadTable("data/dfs_by_year_1990", "csv", "header")
  year1991 = loadTable("data/dfs_by_year_1991", "csv", "header")
  year1992 = loadTable("data/dfs_by_year_1992", "csv", "header")
  year1993 = loadTable("data/dfs_by_year_1993", "csv", "header")
  year1994 = loadTable("data/dfs_by_year_1994", "csv", "header")
  year1995 = loadTable("data/dfs_by_year_1995", "csv", "header")
  year1996 = loadTable("data/dfs_by_year_1996", "csv", "header")
  year1997 = loadTable("data/dfs_by_year_1997", "csv", "header")
  year1998 = loadTable("data/dfs_by_year_1998", "csv", "header")
  year1999 = loadTable("data/dfs_by_year_1999", "csv", "header")
  year2000 = loadTable("data/dfs_by_year_2000", "csv", "header")

  freq1990 = loadTable("data/dfs_by_frequency_1990", "csv", "header")
  freq1991 = loadTable("data/dfs_by_frequency_1991", "csv", "header")
  freq1992 = loadTable("data/dfs_by_frequency_1992", "csv", "header")
  freq1993 = loadTable("data/dfs_by_frequency_1993", "csv", "header")
  freq1994 = loadTable("data/dfs_by_frequency_1994", "csv", "header")
  freq1995 = loadTable("data/dfs_by_frequency_1995", "csv", "header")
  freq1996 = loadTable("data/dfs_by_frequency_1996", "csv", "header")
  freq1997 = loadTable("data/dfs_by_frequency_1997", "csv", "header")
  freq1998 = loadTable("data/dfs_by_frequency_1998", "csv", "header")
  freq1999 = loadTable("data/dfs_by_frequency_1999", "csv", "header")
  freq2000 = loadTable("data/dfs_by_frequency_2000", "csv", "header")

}

function getData(activeYear) { 
  allTogether = [];
  //checking for the frequency filter state
  if (frequencyFilter === false){
    tableDict = [
    {"1990" : year1990},
    {"1991" : year1991},
    {"1992" : year1992},
    {"1993" : year1993},
    {"1994" : year1994},
    {"1995" : year1995},  
    {"1996" : year1996},
    {"1997" : year1997},
    {"1998" : year1998},
    {"1999" : year1999},
    {"2000" : year2000}];}
    else{
    tableDict = [
    {"1990" : freq1990},
    {"1991" : freq1991},
    {"1992" : freq1992},
    {"1993" : freq1993},
    {"1994" : freq1994},
    {"1995" : freq1995},  
    {"1996" : freq1996},
    {"1997" : freq1997},
    {"1998" : freq1998},
    {"1999" : freq1999},
    {"2000" : freq2000}]
  }


  //creating a system to switch the table used 
  for (let i = 0; i < tableDict.length; i++) {
    //console.log(tableDict)
    let obj = tableDict[i];
    //console.log(obj)
    //getting the "year" key object from the dictionary
    let yearKey = Object.keys(obj)[0];
    //console.log(yearKey)

    //if fakeYear is in yearKey, make table the yearKey
    if (activeYear === yearKey) {
      //console.log(activeYear + " is in yearKey");
      displayingTable = obj[yearKey];
    } else {
      //console.log(activeYear + " is NOT in yearKey");
    }
    
  }

  //Getting the tabular data and turning them from objects to strings so they will be able to display in the canvas
   for (let r = 0; r < displayingTable.getRowCount(); r++) {
      for (let c = 0; c < displayingTable.getColumnCount(); c++) {
        let value = displayingTable.getString(r, c);
        allTogether.push(value);
    
        // If this is the "Dates On Air" column, add a newline
        if (displayingTable.columns[c] === "Dates On Air") {
          allTogether.push("<br />"); 
        }
      }
    } 
   

} 
