.loader{transform:translate(-50%,-50%);border:4px solid #f3f;border-top:4px solid #3498db;border-radius:50%;width:30px;height:30px;animation:1s linear infinite spin}@keyframes spin{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}.confetti{position:absolute;width:10px;height:10px;background-color:transparent;opacity:0;animation:1s forwards confetti-animation}@keyframes confetti-animation{0%{opacity:1;transform:translate(0,0) rotate(0) scale(1)}100%{opacity:0;transform:translate(var(--x),var(--y)) rotate(var(--angle)) scale(.1)}}