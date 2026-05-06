const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove', e=>{mx=e.clientX;my=e.clientY;});
(function a(){rx+=(mx-rx)*0.15;ry+=(my-ry)*0.15;cursor.style.left=mx-5+'px';cursor.style.top=my-5+'px';ring.style.left=rx-18+'px';ring.style.top=ry-18+'px';requestAnimationFrame(a);})();
