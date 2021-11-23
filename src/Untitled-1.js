
console.log(dateConversion("2000-10-10T15:02:00.000Z"));
function dateConversion(date){
    let newDate = "";
    for(i=0;i<16;i++)
    {
        newDate = newDate + date[i];
    }
    // 2001-02-10T22:25
    //2000-10-10T15:02:00.000Z
    return newDate;
  }