var designWidth = 640, rem2px = 100;
var d = window.document.createElement('div');
d.style.width = '1rem';
d.style.display = "none";
var head = window.document.getElementsByTagName('head')[0];
head.appendChild(d);
var defaultFontSize = parseFloat(window.getComputedStyle(d, null).getPropertyValue('width'));
d.remove();
document.documentElement.style.fontSize =
window.innerWidth / designWidth * rem2px / defaultFontSize * 100 + '%';
