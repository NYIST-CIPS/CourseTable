function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document) {
  //alert("导入注意事项（重要！！！）：\n👉如果导入失败\n👉请确认通过统一认证登录(用户名：学号；默认密码：身份证后六位)\n👉请确认看到页面中出现课表\n👉再点击右下角导入\n（暂不支持获取老师姓名）")
  var r = confirm("导入注意事项（重要！！！）：\n👉如果导入失败\n👉请确认通过统一认证登录(用户名：学号；默认密码：身份证后六位)\n👉请确认看到页面中出现课表\n👉再点击右下角导入\n（暂不支持获取老师姓名）\n👉按确认继续！")
  if (r == true) {
    return dom.getElementsByClassName('course-wrap')[0].innerHTML;
  }
  throw "cancel"
}