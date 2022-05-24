var txt;
function start(){
  txt = new Text("press anything", "30pt Arial");
  txt.setPosition(getWidth()/2 - txt.getWidth(), getHeight()/2);
  txt.setColor(Color.black);
  add(txt);
  keyDownMethod(press);
}
function press(e){
  txt.setText(e.keyCode);
}