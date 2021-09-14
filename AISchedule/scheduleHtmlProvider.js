function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document) {
  var u="";
  for(let i =0;i<dom.getElementsByClassName('course-content').length;i++){
    u += dom.getElementsByClassName('course-content')[i].outerHTML;
  }
  return u
  console.log(u)
}