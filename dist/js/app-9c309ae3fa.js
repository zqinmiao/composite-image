"use strict";!function(){var e=navigator.userAgent;e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);(e.indexOf("Android")>-1||e.indexOf("Adr")>-1)&&document.getElementById("upload-img").setAttribute("capture","camera");var t,a,n,o=0,i=!1,l={scale:1,offsetX:0,offsetY:0,orientation:0,regX:0,regY:0},s=1,c=0,d=/^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i,g=document.getElementById("myCanvas"),m=g.width,r=g.height,f=new createjs.Stage("myCanvas"),u=new createjs.Shape;u.graphics.beginFill("#dccbad").drawRect(0,0,500,707),u.x=u.y=0,f.addChild(u),t=new createjs.Bitmap(bgList[o]),i=/data:image\/png;/.test(bgList[o]),t.x=t.y=0,f.addChild(t),createjs.Ticker.setFPS(5),createjs.Ticker.addEventListener("tick",function(){f.update()}),document.getElementsByClassName("change-bg")[0].onclick=function(){f.removeChild(t),++o>2&&(o=0),t=bgList[o]?new createjs.Bitmap(bgList[o]):new createjs.Bitmap(""),i=/data:image\/png;/.test(bgList[o]),f.addChild(t,a),i&&f.swapChildren(t,a),f.update()},document.getElementById("upload-img").onchange=function(){var e=document.getElementById("upload-img").files[0];if(0!==document.getElementById("upload-img").files.length)if(d.test(e.type)){EXIF.getData(e,function(){n=EXIF.getTag(this,"Orientation")});var o=new FileReader;o.onloadstart=function(){console.log("开始"),document.getElementsByClassName("loading-toast")[0].style.display="block"},o.onload=function(o){f.removeChild(a);var c=new Image;c.src=o.target.result,o.target.result,c.onload=function(){if(e.size>204800){console.log("压缩");var d=function(e){var t=document.createElement("canvas"),a=t.getContext("2d");t.width=e.width,t.height=e.height,a.drawImage(e,0,0);return t.toDataURL("image/jpeg",.2)}(c);a=new createjs.Bitmap(d)}else console.log("不压缩"),a=new createjs.Bitmap(o.target.result);console.log("stardraw");var g=c.width,u=c.height,p=500/g;if(s=p,l.scale=p,l.offsetX=(m-g*p)/2,l.offsetY=(r-u*p)/2,void 0!==n)switch(n){case 1:l.orientation=0;break;case 3:l.orientation=180;break;case 6:l.orientation=90,s=p=500/u,l.scale=p,l.offsetX=(r-u*p)/2,l.offsetY=(r-g*p)/2;break;case 8:l.orientation=-90,s=p=500/u,l.scale=p,l.offsetX=(r-u*p)/2,l.offsetY=(r-g*p)/2}else l.orientation=0;a.scaleX=p,a.scaleY=p,a.x=l.offsetX,a.y=l.offsetY,a.rotation=l.orientation,document.getElementsByClassName("loading-toast")[0].style.display="none",f.addChild(a),i&&f.swapChildren(t,a),console.log("draw end")}},o.readAsDataURL(e)}else alert("You must select a valid image file!")};var p=document.getElementById("gesture-area");interact(p).gesturable({onstart:function(e){console.log("star")},onmove:function(e){if(console.log(e),void 0!==a){s*=1+e.ds,c+=e.da;var t=(parseFloat(l.offsetX)||0)+e.dx,n=(parseFloat(l.offsetY)||0)+e.dy;l.offsetX=t,l.offsetY=n,l.scale=s,a.x=l.offsetX,a.y=l.offsetY,a.scaleX=l.scale,a.scaleY=l.scale,a.rotation=l.orientation+c,f.update()}},onend:function(e){console.log("end")}}).draggable({onmove:function(e){if(void 0!==a){console.log("dragMove");var t=(parseFloat(l.offsetX)||0)+e.dx,n=(parseFloat(l.offsetY)||0)+e.dy;parseFloat(l.scale);a.scaleX=l.scale,a.scaleY=l.scale,a.x=l.offsetX,a.y=l.offsetY,l.offsetX=t,l.offsetY=n,f.update()}}}),document.getElementById("upload").onclick=function(){var e=g.getContext("2d"),t=document.getElementById("input-name").value,a=document.getElementById("input-score").value,n=document.getElementById("upload-img").value;if(""!=t&&""!=n&&""!=a){var o={text:"",x:250,y:580},l={text:"$:",x:250,y:620};i||(o.text="通缉：",o.y=500,l.text="悬赏金额：",l.y=540),e.beginPath(),e.font="36px 微软雅黑 bold",e.textAlign="center",e.textBaseline="middle",e.fillStyle="#333",e.fillText(o.text+t,250,o.y,400),e.closePath(),e.beginPath(),e.font="36px 微软雅黑",e.textAlign="center",e.textBaseline="middle",e.fillStyle="#333",e.fillText(l.text+a,250,l.y,400),e.closePath(),document.getElementById("content1").style.display="none",document.getElementById("content2").style.display="block";var s=g.toDataURL().replace("image/png","image/octet-stream");document.getElementById("show").src=s}else alert("请上传照片，并填上姓名和悬赏金额！")},document.getElementsByClassName("replay")[0].onclick=function(){setTimeout(function(){document.getElementById("content1").style.display="block",document.getElementById("content2").style.display="none"},300)}}();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJ1c2VyQWdlbnQiLCJuYXZpZ2F0b3IiLCJtYXRjaCIsImluZGV4T2YiLCJpc0FuZHJvaWQiLCJzZXRBdHRyaWJ1dGUiLCJiZyIsInRhcmdldEltZyIsIk9yaWVudGF0aW9uIiwiaXNQbmciLCJpbWdQcm9wcyIsInNjYWxlIiwib2Zmc2V0WCIsIm9mZnNldFkiLCJvcmllbnRhdGlvbiIsInJlZ1kiLCJyRmlsdGVyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImNhbnZhc1dpZHRoIiwibXlDYW52YXMiLCJ3aWR0aCIsImNhbnZhc0hlaWdodCIsImhlaWdodCIsIm1heEltZ1NpemUiLCJjcmVhdGVqcyIsIlN0YWdlIiwiU2hhcGUiLCJyZWN0IiwiZ3JhcGhpY3MiLCJiZWdpbkZpbGwiLCJkcmF3UmVjdCIsIngiLCJ5Iiwic3RhZ2UiLCJCaXRtYXAiLCJiZ0xpc3QiLCJiZ0luZGV4IiwidGVzdCIsIlRpY2tlciIsInNldEZQUyIsImFkZEV2ZW50TGlzdGVuZXIiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwib25jbGljayIsImFkZENoaWxkIiwidXBkYXRlIiwib25jaGFuZ2UiLCJvRmlsZSIsImZpbGVzIiwibGVuZ3RoIiwidHlwZSIsIkVYSUYiLCJ0aGlzIiwib0ZSZWFkZXIiLCJvbmxvYWRzdGFydCIsImNvbnNvbGUiLCJsb2ciLCJzdHlsZSIsImRpc3BsYXkiLCJvbmxvYWQiLCJvRlJFdmVudCIsInJlbW92ZUNoaWxkIiwiaW1hZ2UiLCJJbWFnZSIsInNyYyIsInRhcmdldCIsInJlc3VsdCIsInNpemUiLCJkYXRhIiwiaW1nIiwic2V0VGltZW91dCIsImdldENvbnRleHQiLCJjdHgiLCJkcmF3SW1hZ2UiLCJjb21wcmVzc0ltZyIsImltZ1dpZHRoIiwic2l6ZXNjYWxlIiwiaW1nSGVpZ2h0Iiwicm90YXRpb24iLCJzY2FsZVgiLCJyZWFkQXNEYXRhVVJMIiwiYWxlcnQiLCJnZXN0dXJlQXJlYSIsInN3YXBDaGlsZHJlbiIsIm9uc3RhcnQiLCJldmVudCIsIm9ubW92ZSIsImRzIiwiaW50ZXJhY3QiLCJnZXN0dXJhYmxlIiwiZHgiLCJwYXJzZUZsb2F0IiwiZHkiLCJhbmdsZSIsImRyYWdnYWJsZSIsInNjYWxlWSIsInZhbHVlIiwiaW5wdXRTY29yZSIsImlucHV0TmFtZSIsInVwbG9hZEltZyIsIm5hbWUiLCJjb250ZXh0IiwidGV4dCIsImZvbnQiLCJ0ZXh0QWxpZ24iLCJ0ZXh0QmFzZWxpbmUiLCJiZWdpblBhdGgiLCJzY29yZSIsImZpbGxTdHlsZSIsImNsb3NlUGF0aCIsInRvRGF0YVVSTCIsInJlcGxhY2UiLCJpbWdEYXRhZGFoZSJdLCJtYXBwaW5ncyI6ImNBQUEsV0FLSSxJQUFJQSxFQUFZQyxVQUFVRCxVQUNaQSxFQUFVRSxNQUFNLGtDQURkRCxFQUFVRCxRQUFBQSxZQUExQixHQUFBQSxFQUFBRyxRQUFBLFFBQUEsSUFFSUMsU0FBQUEsZUFBc0JELGNBQVFFLGFBQW1CTCxVQUFVRyxVQVMvRCxJQUFJRyxFQU1BQyxFQURBQyxFQUxBRixFQUFKLEVBQ0lHLEdBQUEsRUFXQUMsR0FMQUMsTUFBQSxFQVBKQyxRQUFBLEVBZVFDLFFBQVMsRUFOYkMsWUFBQSxFQUNBTixLQVZKLEVBa0JRTyxLQUFNLEdBTE5KLEVBRE8sRUFHUEUsRUFBQUEsRUFmUkcsRUFBQSwwWEFxQklMLEVBckJKTSxTQUFBQyxlQUFBLFlBK0JJQyxFQUFjQyxFQUFTQyxNQVR2QkMsRUFBQUYsRUFBQUcsT0FHQUMsRUFBQUEsSUFBYUMsU0F6QmpCQyxNQUFBLFlBMkJJVixFQUFBQSxJQUFVUyxTQUFBRSxNQVlkQyxFQUFLQyxTQUFTQyxVQUFVLFdBQVdDLFNBQVMsRUFBRyxFQUFHLElBQUssS0FWdkRILEVBQUFJLEVBQUFKLEVBQUFLLEVBQUEsRUFDQUMsRUFBSWQsU0FBV0gsR0FjZlgsRUFBSyxJQUFJbUIsU0FBU1UsT0FBT0MsT0FBT0MsSUFUaEM1QixFQUFBLG1CQUFBNkIsS0FBQUYsT0FBQUMsSUFDQS9CLEVBQUEwQixFQUFJRSxF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QUFDLFFBQUEsT0FZQXpDLFNBQVNDLGVBQWUsWUFBWXVDLE1BQU1DLFFBQVUsUUFScEQyQyxJQUFBQSxFQUFlakYsRUFBZjBGLFlBQUFDLFFBQUEsWUFBQSxzQkFFQVYsU0FBUUksZUFBZSxRQUF2QnpDLElBQUFnRCxPQUdBWCxNQUFBQSxzQkFNQXBGLFNBQUF5Qix1QkFBa0J0QixVQUFTMEYsR0FBVG5FLFFBQTZCLFdBQy9DMkIsV0FBQSxXQUNBckQsU0FBU0MsZUFBZSxZQUF4QnVDLE1BQXNDdUQsUUFBdEMsUUEzQ0ovRixTQTZDT0MsZUFBQSxZQUFBdUMsTUFBQUMsUUFBQSxRQUNIdUIsTUFyVVoiLCJmaWxlIjoiYXBwLTljMzA5YWUzZmEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKCkge1xuXG4gICAgLypcbiAgICAqIOWIpOaWreaJi+acuuezu+e7n++8jOS4uuWuieWNk+ezu+e7n+S4i+eahGlucHV05re75YqgJ2NhcHR1cmUnLCdjYW1lcmEn5bGe5oCnXG4gICAgKiAqL1xuICAgIHZhciB1c2VyQWdlbnQgPSBuYXZpZ2F0b3IudXNlckFnZW50O1xuICAgIHZhciBpc0lPUyA9ICEhdXNlckFnZW50Lm1hdGNoKC9cXChpW147XSs7KCBVOyk/IENQVS4rTWFjIE9TIFgvKTtcbiAgICB2YXIgaXNBbmRyb2lkID0gdXNlckFnZW50LmluZGV4T2YoJ0FuZHJvaWQnKSA+IC0xIHx8IHVzZXJBZ2VudC5pbmRleE9mKCdBZHInKSA+IC0xO1xuICAgIGlmIChpc0FuZHJvaWQpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VwbG9hZC1pbWcnKS5zZXRBdHRyaWJ1dGUoJ2NhcHR1cmUnLCAnY2FtZXJhJylcbiAgICB9XG5cbiAgICAvKlxuICAgICogQHN5bm9wc2lzIOWPmOmHj1xuICAgICogKi9cbiAgICAvL+iDjOaZr+WbvlxuICAgIHZhciBiZyxcbiAgICAgICAgLy/og4zmma/lm77kuIvmoIdcbiAgICAgICAgYmdJbmRleCA9IDAsXG4gICAgICAgIC8v6IOM5pmv5Zu+54mH5piv5ZCm5pivUE5H5qC85byPXG4gICAgICAgIGlzUG5nID0gZmFsc2UsXG4gICAgICAgIC8v5LiK5Lyg55qE5Zu+54mHXG4gICAgICAgIHRhcmdldEltZyxcbiAgICAgICAgLy/kuIrkvKDlm77niYfnmoRiYXNlNjTnvJbnoIFcbiAgICAgICAgaW1nRGF0YSxcbiAgICAgICAgLy/kuIrkvKDlm77niYfnmoTml4vovazlj4LmlbDvvIxbMOW6pj0x77yM6aG65pe26ZKIOTDluqY9Nu+8jOmAhuaXtumSiDkw5bqmPTjvvIwxODDluqY9M11cbiAgICAgICAgT3JpZW50YXRpb24sXG4gICAgICAgIC8v5LiK5Lyg55qE5Zu+54mH55qE5Yid5aeL5bGe5oCn77ya5L2N572u44CB57yp5pS+5q+U5L6L44CB5peL6L2s6KeS5bqmXG4gICAgICAgIGltZ1Byb3BzID0ge1xuICAgICAgICAgICAgc2NhbGU6IDEsXG4gICAgICAgICAgICBvZmZzZXRYOiAwLFxuICAgICAgICAgICAgb2Zmc2V0WTogMCxcbiAgICAgICAgICAgIG9yaWVudGF0aW9uOiAwLFxuICAgICAgICAgICAgcmVnWDogMCxcbiAgICAgICAgICAgIHJlZ1k6IDBcbiAgICAgICAgfSxcbiAgICAgICAgLy/nvKnmlL7mr5TkvotcbiAgICAgICAgc2NhbGUgPSAxLFxuICAgICAgICAvL+aJi+aMh+aXi+i9rOaXtueahOinkuW6plxuICAgICAgICBhbmdsZSA9IDAsXG4gICAgICAgIC8v5Zu+54mH5pyA5aSn5aSn5bCP77yIMjA0ODAwPTIwMCoxMDI077yJXG4gICAgICAgIG1heEltZ1NpemUgPSAyMDQ4MDA7XG4gICAgLy/ov4fmu6Tmlofku7bnsbvlnotcbiAgICB2YXIgckZpbHRlciA9IC9eKD86aW1hZ2VcXC9ibXB8aW1hZ2VcXC9jaXNcXC1jb2R8aW1hZ2VcXC9naWZ8aW1hZ2VcXC9pZWZ8aW1hZ2VcXC9qcGVnfGltYWdlXFwvanBlZ3xpbWFnZVxcL2pwZWd8aW1hZ2VcXC9waXBlZ3xpbWFnZVxcL3BuZ3xpbWFnZVxcL3N2Z1xcK3htbHxpbWFnZVxcL3RpZmZ8aW1hZ2VcXC94XFwtY211XFwtcmFzdGVyfGltYWdlXFwveFxcLWNteHxpbWFnZVxcL3hcXC1pY29ufGltYWdlXFwveFxcLXBvcnRhYmxlXFwtYW55bWFwfGltYWdlXFwveFxcLXBvcnRhYmxlXFwtYml0bWFwfGltYWdlXFwveFxcLXBvcnRhYmxlXFwtZ3JheW1hcHxpbWFnZVxcL3hcXC1wb3J0YWJsZVxcLXBpeG1hcHxpbWFnZVxcL3hcXC1yZ2J8aW1hZ2VcXC94XFwteGJpdG1hcHxpbWFnZVxcL3hcXC14cGl4bWFwfGltYWdlXFwveFxcLXh3aW5kb3dkdW1wKSQvaTtcblxuICAgIC8vY2FudmFz5bGe5oCnXG4gICAgdmFyIG15Q2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ215Q2FudmFzJyksXG4gICAgICAgIGNhbnZhc1dpZHRoID0gbXlDYW52YXMud2lkdGgsXG4gICAgICAgIGNhbnZhc0hlaWdodCA9IG15Q2FudmFzLmhlaWdodDtcblxuICAgIC8q5Yib5bu6Y2FudmFz55S75biDKi9cbiAgICAvL+WIm+W7uuiInuWPsFxuICAgIHZhciBzdGFnZSA9IG5ldyBjcmVhdGVqcy5TdGFnZShcIm15Q2FudmFzXCIpO1xuICAgIC8v5Yib5bu66IOM5pmv6aKc6ImyXG4gICAgdmFyIHJlY3QgPSBuZXcgY3JlYXRlanMuU2hhcGUoKTtcbiAgICByZWN0LmdyYXBoaWNzLmJlZ2luRmlsbChcIiNkY2NiYWRcIikuZHJhd1JlY3QoMCwgMCwgNTAwLCA3MDcpO1xuICAgIHJlY3QueCA9IHJlY3QueSA9IDA7XG4gICAgc3RhZ2UuYWRkQ2hpbGQocmVjdCk7XG5cbiAgICAvL+WIm+W7uuiDjOaZr+WbvlxuICAgIGJnID0gbmV3IGNyZWF0ZWpzLkJpdG1hcChiZ0xpc3RbYmdJbmRleF0pO1xuICAgIC8v5Yik5pat5piv5ZCm5pivUE5H5qC85byPXG4gICAgaXNQbmcgPSAvZGF0YTppbWFnZVxcL3BuZzsvLnRlc3QoYmdMaXN0W2JnSW5kZXhdKTtcbiAgICBiZy54ID0gYmcueSA9IDA7XG5cbiAgICAvL+a3u+WKoOiDjOaZr+WbvuWIsOiInuWPsFxuICAgIHN0YWdlLmFkZENoaWxkKGJnKTtcblxuICAgIC8v5pu05paw55S75biDXG4gICAgY3JlYXRlanMuVGlja2VyLnNldEZQUyg1KTtcbiAgICBjcmVhdGVqcy5UaWNrZXIuYWRkRXZlbnRMaXN0ZW5lcihcInRpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBzdGFnZS51cGRhdGUoKTtcbiAgICB9KTtcblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioq5pu05pS56IOM5pmv5Zu+KioqKioqKioqKioqKioqKioqKioqKi9cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjaGFuZ2UtYmcnKVswXS5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvL+enu+mZpOWOn+adpeeahOiDjOaZr+WbvlxuICAgICAgICBzdGFnZS5yZW1vdmVDaGlsZChiZyk7XG4gICAgICAgIC8v5pu05paw6IOM5pmv5Zu+5LiL5qCH5bm25Yik5patXG4gICAgICAgIGJnSW5kZXgrKztcbiAgICAgICAgaWYgKGJnSW5kZXggPiAyKSB7XG4gICAgICAgICAgICBiZ0luZGV4ID0gMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWJnTGlzdFtiZ0luZGV4XSkge1xuICAgICAgICAgICAgYmcgPSBuZXcgY3JlYXRlanMuQml0bWFwKCcnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJnID0gbmV3IGNyZWF0ZWpzLkJpdG1hcChiZ0xpc3RbYmdJbmRleF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy/liKTmlq3mmK/lkKbmmK9QTkfmoLzlvI9cbiAgICAgICAgaXNQbmcgPSAvZGF0YTppbWFnZVxcL3BuZzsvLnRlc3QoYmdMaXN0W2JnSW5kZXhdKTtcblxuICAgICAgICBzdGFnZS5hZGRDaGlsZChiZywgdGFyZ2V0SW1nKTtcbiAgICAgICAgaWYgKGlzUG5nKSB7XG4gICAgICAgICAgICBzdGFnZS5zd2FwQ2hpbGRyZW4oYmcsIHRhcmdldEltZyk7XG4gICAgICAgIH1cbiAgICAgICAgc3RhZ2UudXBkYXRlKCk7XG4gICAgfTtcblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioq5LiK5Lyg5Zu+54mHKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXBsb2FkLWltZycpLm9uY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvL+iOt+WPluWbvueJh+S/oeaBr+WvueixoVxuICAgICAgICB2YXIgb0ZpbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXBsb2FkLWltZycpLmZpbGVzWzBdO1xuICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VwbG9hZC1pbWcnKS5maWxlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghckZpbHRlci50ZXN0KG9GaWxlLnR5cGUpKSB7XG4gICAgICAgICAgICBhbGVydChcIllvdSBtdXN0IHNlbGVjdCBhIHZhbGlkIGltYWdlIGZpbGUhXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy/ojrflj5blm77niYfml4vovazlj4LmlbBcbiAgICAgICAgRVhJRi5nZXREYXRhKG9GaWxlLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBPcmllbnRhdGlvbiA9IEVYSUYuZ2V0VGFnKHRoaXMsICdPcmllbnRhdGlvbicpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvL0ZpbGVSZWFkZXLlrp7kvovlr7nosaFcbiAgICAgICAgdmFyIG9GUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblxuICAgICAgICAvL+aWh+S7tuW8gOWni+ivu+WPllxuICAgICAgICBvRlJlYWRlci5vbmxvYWRzdGFydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCflvIDlp4snKVxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbG9hZGluZy10b2FzdCcpWzBdLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8v5paH5Lu26K+75Y+W5a6M5oiQXG4gICAgICAgIG9GUmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uIChvRlJFdmVudCkge1xuICAgICAgICAgICAgc3RhZ2UucmVtb3ZlQ2hpbGQodGFyZ2V0SW1nKTtcbiAgICAgICAgICAgIC8v5Yib5bu6aW1hZ2VcbiAgICAgICAgICAgIHZhciBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgaW1hZ2Uuc3JjID0gb0ZSRXZlbnQudGFyZ2V0LnJlc3VsdDtcbiAgICAgICAgICAgIGltZ0RhdGEgPSBvRlJFdmVudC50YXJnZXQucmVzdWx0O1xuXG4gICAgICAgICAgICAvL+WbvueJh+WKoOi9veWujOaIkFxuICAgICAgICAgICAgaW1hZ2Uub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChvRmlsZS5zaXplID4gbWF4SW1nU2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5Y6L57ypJylcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBjb21wcmVzc0ltZyhpbWFnZSk7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldEltZyA9IG5ldyBjcmVhdGVqcy5CaXRtYXAoZGF0YSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+S4jeWOi+e8qScpXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldEltZyA9IG5ldyBjcmVhdGVqcy5CaXRtYXAob0ZSRXZlbnQudGFyZ2V0LnJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzdGFyZHJhdycpO1xuICAgICAgICAgICAgICAgIHZhciBpbWdXaWR0aCA9IGltYWdlLndpZHRoO1xuICAgICAgICAgICAgICAgIHZhciBpbWdIZWlnaHQgPSBpbWFnZS5oZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgICog5Zu+54mH57yp5pS+5q+U5L6LOls1MDA65Y+W55qEY2FudmFz55qE5a695bqmXVxuICAgICAgICAgICAgICAgICogY2FudmFz55qE5a696Zmk5Lul5Zu+54mH55qE5a695b6X5Ye657yp5pS+5q+U5L6L5YC8XG4gICAgICAgICAgICAgICAgKiAqL1xuICAgICAgICAgICAgICAgIHZhciBzaXplc2NhbGUgPSA1MDAgLyBpbWdXaWR0aDtcbiAgICAgICAgICAgICAgICBzY2FsZSA9IHNpemVzY2FsZTtcbiAgICAgICAgICAgICAgICBpbWdQcm9wcy5zY2FsZSA9IHNpemVzY2FsZTtcblxuICAgICAgICAgICAgICAgIC8v5Zu+54mH55qEWC9Z6L205YGP56e76YePOuWcqGNhbnZhc+S4remXtOS9jee9rlxuICAgICAgICAgICAgICAgIGltZ1Byb3BzLm9mZnNldFggPSAoY2FudmFzV2lkdGggLSBpbWdXaWR0aCAqIHNpemVzY2FsZSkgLyAyO1xuICAgICAgICAgICAgICAgIGltZ1Byb3BzLm9mZnNldFkgPSAoY2FudmFzSGVpZ2h0IC0gaW1nSGVpZ2h0ICogc2l6ZXNjYWxlKSAvIDI7XG5cbiAgICAgICAgICAgICAgICAvL+agueaNruaXi+i9rOWPguaVsOWIpOaWreaXi+i9rOinkuW6plxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgT3JpZW50YXRpb24gIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChPcmllbnRhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltZ1Byb3BzLm9yaWVudGF0aW9uID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWdQcm9wcy5vcmllbnRhdGlvbiA9IDE4MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICogSU9T57O757uf5LiL77yM56uW552A5ouN54WnLOeFp+eJh+S8muWHuueOsOmAhuaXtumSiOaXi+i9rDkw5bqm55qE5oOF5Ya1XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKiDmiYDku6Xov5nml7bopoHlsIblm77niYfpobrml7bpkojml4vovazvvIzmgaLlpI3mraPnoa5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIOatpOaXtuimgemHjeaWsOiuvue9ruS4i1gvWei9tOeahOWumuS9je+8mlvlj5blgLzliIbliKvlkozkuYvliY3nmoRYL1novbTnmoTlrprkvY3nm7jlj43lubbkuZjku6Uy5YCNXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICogKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWdQcm9wcy5vcmllbnRhdGlvbiA9IDkwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpemVzY2FsZSA9IDUwMCAvIGltZ0hlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FsZSA9IHNpemVzY2FsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWdQcm9wcy5zY2FsZSA9IHNpemVzY2FsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWdQcm9wcy5vZmZzZXRYID0gKGNhbnZhc0hlaWdodCAtIGltZ0hlaWdodCAqIHNpemVzY2FsZSkgLyAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltZ1Byb3BzLm9mZnNldFkgPSAoY2FudmFzSGVpZ2h0IC0gaW1nV2lkdGggKiBzaXplc2NhbGUpIC8gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICogSU9T57O757uf5LiL77yM5bCG5omL5py65YCS552A56uW552A5ouN54WnLOeFp+eJh+S8muWHuueOsOmhuuaXtumSiOaXi+i9rDkw5bqm55qE5oOF5Ya1XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltZ1Byb3BzLm9yaWVudGF0aW9uID0gLTkwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpemVzY2FsZSA9IDUwMCAvIGltZ0hlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FsZSA9IHNpemVzY2FsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWdQcm9wcy5zY2FsZSA9IHNpemVzY2FsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWdQcm9wcy5vZmZzZXRYID0gKGNhbnZhc0hlaWdodCAtIGltZ0hlaWdodCAqIHNpemVzY2FsZSkgLyAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltZ1Byb3BzLm9mZnNldFkgPSAoY2FudmFzSGVpZ2h0IC0gaW1nV2lkdGggKiBzaXplc2NhbGUpIC8gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGltZ1Byb3BzLm9yaWVudGF0aW9uID0gMDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvL+iuvue9ruS4iuS8oOWQjuWbvueJh+WxnuaAp1xuICAgICAgICAgICAgICAgIHRhcmdldEltZy5zY2FsZVggPSBzaXplc2NhbGU7XG4gICAgICAgICAgICAgICAgdGFyZ2V0SW1nLnNjYWxlWSA9IHNpemVzY2FsZTtcbiAgICAgICAgICAgICAgICB0YXJnZXRJbWcueCA9IGltZ1Byb3BzLm9mZnNldFg7XG4gICAgICAgICAgICAgICAgdGFyZ2V0SW1nLnkgPSBpbWdQcm9wcy5vZmZzZXRZO1xuICAgICAgICAgICAgICAgIHRhcmdldEltZy5yb3RhdGlvbiA9IGltZ1Byb3BzLm9yaWVudGF0aW9uO1xuXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbG9hZGluZy10b2FzdCcpWzBdLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cbiAgICAgICAgICAgICAgICAvL+Wwhuebruagh+WbvueJh+a3u+WKoOWIsOiInuWPsFxuICAgICAgICAgICAgICAgIHN0YWdlLmFkZENoaWxkKHRhcmdldEltZyk7XG4gICAgICAgICAgICAgICAgaWYgKGlzUG5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YWdlLnN3YXBDaGlsZHJlbihiZywgdGFyZ2V0SW1nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2RyYXcgZW5kJyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICBvRlJlYWRlci5yZWFkQXNEYXRhVVJMKG9GaWxlKTtcbiAgICB9O1xuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKuiwg+aVtOWbvueJh+S9jee9rioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgICAgIC8v5omL5Yq/5Yy65Z+fXG4gICAgdmFyIGdlc3R1cmVBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dlc3R1cmUtYXJlYScpO1xuICAgIGludGVyYWN0KGdlc3R1cmVBcmVhKS5nZXN0dXJhYmxlKHtcbiAgICAgICAgb25zdGFydDogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnc3RhcicpXG4gICAgICAgIH0sXG4gICAgICAgIG9ubW92ZTogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhldmVudClcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0SW1nID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2NhbGUgPSBzY2FsZSAqICgxICsgZXZlbnQuZHMpO1xuICAgICAgICAgICAgYW5nbGUgKz0gZXZlbnQuZGE7XG4gICAgICAgICAgICB2YXIgeCA9IChwYXJzZUZsb2F0KGltZ1Byb3BzLm9mZnNldFgpIHx8IDApICsgZXZlbnQuZHgsXG4gICAgICAgICAgICAgICAgeSA9IChwYXJzZUZsb2F0KGltZ1Byb3BzLm9mZnNldFkpIHx8IDApICsgZXZlbnQuZHk7XG5cbiAgICAgICAgICAgIGltZ1Byb3BzLm9mZnNldFggPSB4O1xuICAgICAgICAgICAgaW1nUHJvcHMub2Zmc2V0WSA9IHk7XG4gICAgICAgICAgICBpbWdQcm9wcy5zY2FsZSA9IHNjYWxlO1xuXG4gICAgICAgICAgICB0YXJnZXRJbWcueCA9IGltZ1Byb3BzLm9mZnNldFg7XG4gICAgICAgICAgICB0YXJnZXRJbWcueSA9IGltZ1Byb3BzLm9mZnNldFk7XG4gICAgICAgICAgICB0YXJnZXRJbWcuc2NhbGVYID0gaW1nUHJvcHMuc2NhbGU7XG4gICAgICAgICAgICB0YXJnZXRJbWcuc2NhbGVZID0gaW1nUHJvcHMuc2NhbGU7XG4gICAgICAgICAgICB0YXJnZXRJbWcucm90YXRpb24gPSBpbWdQcm9wcy5vcmllbnRhdGlvbiArIGFuZ2xlO1xuXG4gICAgICAgICAgICBzdGFnZS51cGRhdGUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25lbmQ6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2VuZCcpXG4gICAgICAgIH1cbiAgICB9KS5kcmFnZ2FibGUoe1xuICAgICAgICBvbm1vdmU6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXRJbWcgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkcmFnTW92ZScpXG4gICAgICAgICAgICB2YXIgeCA9IChwYXJzZUZsb2F0KGltZ1Byb3BzLm9mZnNldFgpIHx8IDApICsgZXZlbnQuZHgsXG4gICAgICAgICAgICAgICAgeSA9IChwYXJzZUZsb2F0KGltZ1Byb3BzLm9mZnNldFkpIHx8IDApICsgZXZlbnQuZHksXG4gICAgICAgICAgICAgICAgcyA9IChwYXJzZUZsb2F0KGltZ1Byb3BzLnNjYWxlKSB8fCAxKTtcblxuICAgICAgICAgICAgdGFyZ2V0SW1nLnNjYWxlWCA9IGltZ1Byb3BzLnNjYWxlO1xuICAgICAgICAgICAgdGFyZ2V0SW1nLnNjYWxlWSA9IGltZ1Byb3BzLnNjYWxlO1xuICAgICAgICAgICAgdGFyZ2V0SW1nLnggPSBpbWdQcm9wcy5vZmZzZXRYO1xuICAgICAgICAgICAgdGFyZ2V0SW1nLnkgPSBpbWdQcm9wcy5vZmZzZXRZO1xuXG4gICAgICAgICAgICBpbWdQcm9wcy5vZmZzZXRYID0geDtcbiAgICAgICAgICAgIGltZ1Byb3BzLm9mZnNldFkgPSB5O1xuICAgICAgICAgICAgc3RhZ2UudXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioq55Sf5oiQ5Zu+54mHKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXBsb2FkJykub25jbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBteUNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICB2YXIgaW5wdXROYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lucHV0LW5hbWUnKS52YWx1ZTtcbiAgICAgICAgdmFyIGlucHV0U2NvcmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5wdXQtc2NvcmUnKS52YWx1ZTtcbiAgICAgICAgdmFyIHVwbG9hZEltZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cGxvYWQtaW1nJykudmFsdWU7XG5cbiAgICAgICAgLy/liKTmlq3mmK/lkKbkuIrkvKDnhafniYfjgIHloavlpb3kv6Hmga9cbiAgICAgICAgaWYgKGlucHV0TmFtZSAhPSAnJyAmJiB1cGxvYWRJbWcgIT0gJycgJiYgaW5wdXRTY29yZSAhPSAnJykge1xuXG4gICAgICAgICAgICAvL+iuvue9ruWnk+WQjeWSjOmHkemineeahOS9jee9ruWPiuWGheWuuVxuICAgICAgICAgICAgdmFyIG5hbWUgPSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICcnLFxuICAgICAgICAgICAgICAgICAgICB4OiAyNTAsXG4gICAgICAgICAgICAgICAgICAgIHk6IDU4MFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2NvcmUgPSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICckOicsXG4gICAgICAgICAgICAgICAgICAgIHg6IDI1MCxcbiAgICAgICAgICAgICAgICAgICAgeTogNjIwXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmICghaXNQbmcpIHtcbiAgICAgICAgICAgICAgICBuYW1lLnRleHQgPSAn6YCa57yJ77yaJztcbiAgICAgICAgICAgICAgICBuYW1lLnkgPSA1MDA7XG4gICAgICAgICAgICAgICAgc2NvcmUudGV4dCA9ICfmgqzotY/ph5Hpop3vvJonO1xuICAgICAgICAgICAgICAgIHNjb3JlLnkgPSA1NDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL+e7mOWItuWQjeWtl1xuICAgICAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIGNvbnRleHQuZm9udCA9ICczNnB4IOW+rui9r+mbhem7kSBib2xkJztcbiAgICAgICAgICAgIGNvbnRleHQudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgICAgICAgICBjb250ZXh0LnRleHRCYXNlbGluZSA9ICdtaWRkbGUnO1xuICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSAnIzMzMyc7XG4gICAgICAgICAgICBjb250ZXh0LmZpbGxUZXh0KG5hbWUudGV4dCArIGlucHV0TmFtZSwgMjUwLCBuYW1lLnksIDQwMCk7XG4gICAgICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuXG4gICAgICAgICAgICAvL+e7mOWItumHkeminVxuICAgICAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIGNvbnRleHQuZm9udCA9ICczNnB4IOW+rui9r+mbhem7kSc7XG4gICAgICAgICAgICBjb250ZXh0LnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICAgICAgY29udGV4dC50ZXh0QmFzZWxpbmUgPSAnbWlkZGxlJztcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJyMzMzMnO1xuICAgICAgICAgICAgY29udGV4dC5maWxsVGV4dChzY29yZS50ZXh0ICsgaW5wdXRTY29yZSwgMjUwLCBzY29yZS55LCA0MDApO1xuICAgICAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcblxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnQxJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50MicpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXG4gICAgICAgICAgICAvL+iOt+WPlmN2YXZhc+eahGRhdGHkv6Hmga/vvIzlubbovazmjaLlm77niYdiYXNlNjTnmoTmoLzlvI9cbiAgICAgICAgICAgIHZhciBpbWdEYXRhZGFoZSA9IG15Q2FudmFzLnRvRGF0YVVSTCgpLnJlcGxhY2UoXCJpbWFnZS9wbmdcIiwgXCJpbWFnZS9vY3RldC1zdHJlYW1cIik7XG4gICAgICAgICAgICAvL+eUn+aIkOWQiOaIkOeahOWbvueJh1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Nob3cnKS5zcmMgPSBpbWdEYXRhZGFoZTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWxlcnQoJ+ivt+S4iuS8oOeFp+eJh++8jOW5tuWhq+S4iuWnk+WQjeWSjOaCrOi1j+mHkemine+8gScpO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioq57un57ut55Sf5oiQKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncmVwbGF5JylbMF0ub25jbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudDEnKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50MicpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH0sIDMwMCk7XG4gICAgfTtcblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioq5Y6L57yp5Zu+54mHKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICBmdW5jdGlvbiBjb21wcmVzc0ltZyhpbWcpIHtcbiAgICAgICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICAgIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgY2FudmFzLndpZHRoID0gaW1nLndpZHRoO1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gaW1nLmhlaWdodDtcblxuICAgICAgICAvL+WwhuWbvueJh+e7mOWItuWIsGNhbnZhc+mHjFxuICAgICAgICBjdHguZHJhd0ltYWdlKGltZywgMCwgMCk7XG4gICAgICAgIC8v5bCG5Y6f5p2l5Zu+54mH55qE6LSo6YeP5Y6L57yp5Yiw5Y6f5YWI55qEMC405YCNXG4gICAgICAgIHZhciBkYXRhID0gY2FudmFzLnRvRGF0YVVSTCgnaW1hZ2UvanBlZycsIDAuMik7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxufSkoKTsiXX0=
