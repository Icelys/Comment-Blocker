// ==UserScript==
// @name        Comment Blocker
// @namespace   icelys.github.io
// @description Blockes unwanted comments on your profile
// @match       https://scratch.mit.edu/users/*
// @version     1
// @grant       none
// ==/UserScript==

var comments=document.getElementsByClassName("content");
var save=[];

var adRegex=/(\w{3,})+ (you) *(\w)* *(check *out|look *at)/ig;
var followRegex=/f(|ollow) *(4|for|me) *(f(|ollow))*/ig;
    
function modify(num){
  save.push(comments[num].innerHTML);
  if(comments[num].innerHTML.match(adRegex)!=null){
    comments[num].innerHTML="[Advertisement]";
  } else if(comments[num].innerHTML.match(followRegex)!=null){
    comments[num].innerHTML="[Folow For Follow]";
  }
}

function run(){
  
  var target = document.getElementById("comments-enabled-box");
  var button = document.createElement("button");
  button.id="showAds-ext";
  button.type = "button";
  button.innerHTML= "Show Hidden Comments";
  button.onclick=showAll;
  target.appendChild(button);

  for(i=0;i<comments.length;i++){
   setTimeout(modify(i),50);
  }
}

function reset(num){
  comments[num].innerHTML=save[num];
}

function showAll(){
  for(i=0;i<comments.length;i++){
   setTimeout(reset(i),50);
  }
}

window.onload = run;
