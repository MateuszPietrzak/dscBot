const Discord = require("discord.js");
const Canvas = require("canvas");



module.exports = async function(msg, tokens){
const canvas = Canvas.createCanvas(100,100);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0,0,100,100);

  let r = Math.floor(Math.random()*6)+1;
  //console.log(r);
  //console.log(Math.random());
  //let r = 6;
  ctx.fillStyle = "#000000";

  switch(r){
    case 1:
      //circle(50,50);
      ctx.beginPath();
      ctx.fill();
      ctx.arc(50,50,12,0,2*Math.PI,true);
      ctx.fill();
      ctx.closePath();
      break;
    case 2:
      ctx.beginPath();
      ctx.arc(25,75,12,0,2*Math.PI,true);
      ctx.arc(75,25,12,0,2*Math.PI,true);
      ctx.fill();
      ctx.closePath();
      break;
    case 3:
      ctx.beginPath();
      ctx.arc(25,75,12,0,2*Math.PI,true);
      ctx.arc(75,25,12,0,2*Math.PI,true);
      ctx.arc(50,50,12,0,2*Math.PI,true);
      ctx.fill();
      ctx.closePath();
      break;
    case 4:
      ctx.beginPath();
      ctx.arc(30,70,12,0,2*Math.PI,true);
      ctx.arc(30,30,12,0,2*Math.PI,true);
      ctx.fill();
      ctx.closePath();
      ctx.beginPath();
      ctx.arc(70,30,12,0,2*Math.PI,true);
      ctx.arc(70,70,12,0,2*Math.PI,true);
      ctx.fill();
      ctx.closePath();
      break;
    case 5:
      ctx.beginPath();
      ctx.arc(25,75,12,0,2*Math.PI,true);
      ctx.arc(75,25,12,0,2*Math.PI,true);
      ctx.fill();
      ctx.closePath();
      ctx.beginPath();
      ctx.arc(25,25,12,0,2*Math.PI,true);
      ctx.arc(75,75,12,0,2*Math.PI,true);
      ctx.fill();
      ctx.closePath();
      ctx.beginPath();
      ctx.arc(50,50,12,0,2*Math.PI,true);
      ctx.fill();
      ctx.closePath();
      break;
    case 6:
      ctx.beginPath();
      ctx.arc(30,80,12,0,2*Math.PI,true);
      ctx.arc(30,20,12,0,2*Math.PI,true);
      ctx.fill();
      ctx.closePath();
      ctx.beginPath();
      ctx.arc(30,50,12,0,2*Math.PI,true);
      ctx.arc(70,50,12,0,2*Math.PI,true);
      ctx.fill();
      ctx.closePath();
      ctx.beginPath();
      ctx.arc(70,20,12,0,2*Math.PI,true);
      ctx.arc(70,80,12,0,2*Math.PI,true);
      ctx.fill();
      ctx.closePath();
      break;
  }



  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

   msg.channel.send(attachment);
}
