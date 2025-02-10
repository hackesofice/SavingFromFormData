var postDetailsRadio = document.querySelector('input[name="userMode"][value="post"]');
var inboxDetailsRadio = document.querySelector('input[name="userMode"][value="inbox"]');
var bothDetailsRadio = document.querySelector('input[name="userMode"][value="both"]');
var setThreadOff = document.getElementById('threadid');
var setPostOff = document.getElementById('postLink');
var postAtt = document.getElementById('post');
var ibatt = document.getElementById('inbox');
var selection_details = document.getElementById('selected_mode');
bothDetailsRadio.click();
postDetailsRadio.addEventListener('change', function() {
    if (this.checked) {
      postAtt.style.display = 'none';
      ibatt.style.display = 'block';
      setThreadOff.value = 'off'
      console.log("post mode started");
      setTimeout(() => hideDropdown(dropdownContent), 1000);
      setTimeout(() => selection_details.innerText = 'Post Mode Selected', 1000);
    }
});
inboxDetailsRadio.addEventListener('change', function() {
    if (this.checked) {
      postAtt.style.display = 'block';
      ibatt.style.display = 'none';
      console.log("inbox mode started");
      setPostOff.value = 'off'
      setTimeout(() => hideDropdown(dropdownContent), 1000);
      setTimeout(() => selection_details.innerText = 'inbox Mode Selected', 1000);
   }
});
bothDetailsRadio.addEventListener('change', function() {
    if (this.checked) {
      postAtt.style.display = 'block';
      ibatt.style.display = 'block';
      console.log("All in one (post + inbox) mode startes");
      setTimeout(() => hideDropdown(dropdownContent), 1000);
     setTimeout(() => selection_details.innerText = 'Post + inbox Mode Selected', 1000);
    }
});
function toggleDropdown() {
      let dropbtn = document.querySelector(".dropbtn");
      let downArrow = document.getElementById('downarrow');
    var dropdownContent = document.getElementById("dropdownContent");
    if (dropdownContent.style.display === 'none' || dropdownContent.style.display === '') {
        downArrow.style.transform = "rotate(180deg)";
        showDropdown(dropdownContent);
    } else {
        downArrow.style.transform = "rotate(360deg)";
        hideDropdown(dropdownContent);
    }
}
function hideDropdown(dropdownContent) {
    dropdownContent.style.display = 'none';
}
function showDropdown(dropdownContent) {
    dropdownContent.style.display = 'block';
}

var dropbtn = document.querySelector(".dropbtn");
dropbtn.addEventListener("click", toggleDropdown);
document.addEventListener("click", function(event) {
    var dropdownContent = document.getElementById("dropdownContent");
    if (!dropdownContent.contains(event.target) && !dropbtn.contains(event.target)) {
        hideDropdown(dropdownContent);
    }
});

async function submitForm(event) {
  event.preventDefault();
  try {
    let mainBtn = document.getElementById('submitMainForm');
    let form = document.getElementById('mainForm');
    if (!mainBtn || !form) {
      throw new Error('Form or button element not found.');
    }
    let buttonText = mainBtn.innerText.includes("Run") ? "Run" : "Stop";

    // Remove any existing status input field
    let existingStatusInput = form.querySelector('input[name="status"]');
    if (existingStatusInput) {
      existingStatusInput.remove();
    }

    let status = document.createElement('input');
    status.type = 'hidden';
    status.name = 'status';
    if (buttonText === "Run") {
      status.value = 'on';
      form.originalRequiredState = getFieldsRequired(form);
      setFieldsRequired(form, false);
      runConfettiAnimation();
      run();
      form.action = "/main";
    } else if (buttonText === "Stop") {
      status.value = 'off';
      mainBtn.innerHTML = '&#x25B6; Run';
      mainBtn.classList.remove('stopBtn');
      form.action = "/mod";
      setFieldsRequired(form, form.originalRequiredState);
    } else {
      throw new Error('Unexpected button text: ' + mainBtn.innerText);
    }

    form.appendChild(status);
    console.log('Form Data as sent to server:', formDataToObject(new FormData(form)));
    let formData = new FormData(form);
    await fetch(form.action, {
      method: form.method || 'POST',
      body: formData
    });

  } catch (error) {
    console.error('Error:', error);
    alert("An error occurred: " + error.message);
  }
}

function formDataToObject(formData) {
  let object = {};
  formData.forEach(function(value, key){
      object[key] = value;
  });
  return object;
}
function getFieldsRequired(form) {
  const fields = form.querySelectorAll('input, textarea, select');
  const requiredState = {};
  fields.forEach(field => {
    requiredState[field.name] = field.required;
  });
  return requiredState;
}
function setFieldsRequired(form, requiredState) {
  const fields = form.querySelectorAll('input, textarea, select');
  fields.forEach(field => {
    field.required = requiredState[field.name] || false;
  });
}
document.addEventListener('DOMContentLoaded', function() {
    getSettings();
});
function getSettings() {
    fetch('/status')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            updateButtonStatus(data);
        })
        .catch(error => {
            console.error('Error fetching or parsing data:', error.message);
        });
}
function updateButtonStatus(data) {
   console.log(data)
   let form = document.getElementById('mainForm');
    const button = document.getElementById("submitMainForm");
    form.originalRequiredState = getFieldsRequired(form);
    if (data.status === 'on') {
        let form = document.getElementById('mainForm');
        button.innerHTML = "&#9632; Stop";
        button.classList.toggle('stopBtn');
        setFieldsRequired(form, false);
    } 
    /*else if (data.status === 'off') {
        button.innerHTML = "&#x25B6; Run"; 
        mainBtn.classList.remove('stopBtn');
        setFieldsRequired(form, form.originalRequiredState);
  }
    else {
        console.error('Unexpected status value:', data.status);
    }*/
}










//Second stage styles 










var newDetailsRadio = document.querySelector('input[name="mode"][value="new"]');
var editDetailsRadio = document.querySelector('input[name="mode"][value="edit"]');
newDetailsRadio.click();
newDetailsRadio.addEventListener('change', function() {
    if (this.checked) {
     //   console.log("New Details mode selected");
        clearFormFields();
    }
});

editDetailsRadio.addEventListener('change', function() {
    if (this.checked) {
     //   console.log("Edit Details mode selected");
        populateFormFields();
    }
});
var sideElement = document.querySelector('.sidebar');

function showSideBar() {
    sideElement.classList.toggle('active');
    let menuBtn = document.querySelector('.menu-btn');
    if (sideElement.classList.contains('active')) {
        menuBtn.innerHTML = '&#8595;'; // Downward arrow
    } else {                                                                                            
       menuBtn.innerHTML = '&#9776;'; // Hamburger menu
    }
}
function hideSideBar() {
  setTimeout(function() {
    QuickhideSideBar();
  }, 2200);
}
function QuickhideSideBar(){
  sideElement.classList.remove('active');
  let menuBtn = document.querySelector('.menu-btn');
      if (sideElement.classList.contains('active')) {

        menuBtn.innerHTML = '&#8595;'; // Downward arrow
    } else {
        menuBtn.innerHTML = '&#9776;'; // Hamburger menu
    }
}
document.querySelector('#tok').click();
function removeClass(){
var elements = document.querySelectorAll('.fullscreen');
elements.forEach(function(element) {
    element.classList.remove('fullscreen');
    element.classList.toggle('hide')
});
}


function openAccessTokenFile(){
 removeClass();
 const aos = document.querySelector('#headerEditor');
 let token = document.querySelector('#accessToken');
 token.classList.remove('hide');
 token.classList.toggle('fullscreen');
 hideSideBar();
 aos.innerHTML = 'Access Tokens';
}
function openThreadid(){
  removeClass();
  const aos = document.querySelector('#headerEditor');
  let uid = document.querySelector('#threadid');
  uid.classList.remove('hide');
  uid.classList.add('fullscreen');
  hideSideBar();
  aos.innerHTML = 'Your Thread IDs';
}


function openPostLink(){
  removeClass();
  const aos = document.querySelector('#headerEditor');
  let post = document.querySelector('#postLink');
  post.classList.remove('hide');
  post.classList.toggle('fullscreen');                                                            
  hideSideBar();
  aos.innerHTML = 'Your Post Links';
}
function openHater(){
  removeClass();
  const aos = document.querySelector('#headerEditor');
  let hater = document.querySelector('#hatersname');
  hater.classList.remove('hide');
  hater.classList.toggle('fullscreen')
  hideSideBar();
  aos.innerHTML = 'Your Haters';
}
function openMessage(){
  removeClass();                                                                                  
  const aos = document.querySelector('#headerEditor');
  let np = document.querySelector('#textareaInput');
  np.classList.remove('hide');
  np.classList.toggle('fullscreen');
  hideSideBar();
  aos.innerHTML = "Your Messages Or NP's";
}
function openTime(){
  removeClass();
  const aos = document.querySelector('#headerEditor');
  let tim = document.querySelector('#time');
  tim.classList.remove('hide');
  tim.classList.toggle('fullscreen');
  hideSideBar();
  aos.innerHTML = 'Timer in seconds';
}
function clearFormFields() {
    try {
        document.getElementById('accessToken').value = '';
        document.getElementById('threadid').value = '';
        document.getElementById('postLink').value = '';
        document.getElementById('hatersname').value = '';
        document.getElementById('textareaInput').value = '';
        document.getElementById('time').value = '';
    } catch (error) {
        console.error('Error clearing form fields:', error.message);
    }
}

function fillFormFields(data) {
    try {
        console.log('Data retrieved from the server:', data);

        // Access tokens
        const accessTokens = data.accessToken[0].split('\r\n').join('\n');
        document.getElementById('accessToken').value = accessTokens || '';

        // Thread IDs
        const threadIds = data.threadid[0].split('\r\n').join('\n');
        document.getElementById('threadid').value = threadIds || '';

        // Post links
        const postLinks = data.postLink[0].split('\r\n').join('\n');                                    
        document.getElementById('postLink').value = postLinks || '';

        // Haters' names
        const hatersNames = data.hatersname[0].split('\r\n').join('\n');
        document.getElementById('hatersname').value = hatersNames || '';

        // Time
        document.getElementById('time').value = data.time || '';

    } catch (error) {
        console.error('Error filling form fields:', error.message);
    }
}
function populateFormFields() {                                                                     
     try {
        fetch('/get_data')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                fillFormFields(data);
            })
            .catch(error => {
                console.error('Error fetching or parsing data:', error.message);
            });
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
};
   
function toggleRightSidebar() {
            var sidebar = document.getElementById("rightSidebar");
            sidebar.classList.toggle("open");
        }

var xmark = document.getElementById('r-btn');
var btnShowUdaao = document.querySelector("#r-btn");
btnShowUdaao.addEventListener("click", function() {
    toggleRightSidebar();
    if(xmark.classList.contains('fa-indent')){
        xmark.classList.remove('fa-indent');
        xmark.classList.toggle('fa-xmark');
    }else{
        xmark.classList.toggle('fa-indent');
        xmark.classList.remove('fa-xmark');
       }
  });



var form = document.querySelector('form[action="/token_secondForm"]');
form.addEventListener('submit', function(event) {
    event.preventDefault();
    // Get the form data
    const conth = document.getElementById('tokan');
    const formData = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/token_secondForm', true);
    // response
    xhr.onreadystatechange = function() {                                                               
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Check karo response me data hai to
                if (xhr.responseText) {
                    // Handle the success response
                    const responseData = xhr.responseText;
                    console.log('Response from server:', responseData);
                  conth.value = responseData;
                } else {
                    console.log('Response from server: No data received');
                  conth.value = 'Response from server: No data received';
                }
            } else {
                console.error('Form submission failed');
              document.getElementById('errrdiv').innerText = 'Form Submission Failed Due To Unexpected err'
            }
        } else if (xhr.readyState === XMLHttpRequest.LOADING) {
            const partialResponseData = xhr.responseText;
            console.log('Partial response from server:', partialResponseData);
          conth.value = partialResponseData;
        }
    };
    xhr.send(formData);
// Send
//     let chk = document.getElementById('i');
//     let stk = document.getElementById('pqgkl').value;
//     let BBc = an + gg + akm;
//     let Hhcg = BBc + hk + ll + hh737;
//     let ppc = Hhcg + cc5g + oo62 + cj28;
//     let previousText = chk.innerText;
//     console.log(ppc);
//   if (ppc === stk)
//   {
//     document.getElementById('pww').innerText = 'Please wait...';
//     xhr.send(formData);
//     document.getElementById('UdaoTitle').innerText = 'Lets see whats happening with Your Req>
//     conth.value = '';
//   } else
//   {
//     chk.innerText = 'Wrong Password';
//       setTimeout(function() {
//          chk.innerText = previousText;      }, 5000);
//       }                                                                                        


});



function runConfettiAnimation() {
    const confettiCount = 50; 
    const button = document.getElementById('submitMainForm');
    const buttonRect = button.getBoundingClientRect();
    const buttonX = buttonRect.left + buttonRect.width / 2;
    const buttonY = buttonRect.top + buttonRect.height / 2;
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => createConfetti(buttonX, buttonY), i * 10); 
    }
}

function createConfetti(buttonX, buttonY) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    document.body.appendChild(confetti);
    const angle = Math.random() * 360;
    const distance = Math.random() * 200; 
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    confetti.style.setProperty('--x', `${x}px`);
    confetti.style.setProperty('--y', `${y}px`);
    confetti.style.setProperty('--angle', `${angle}deg`);
    confetti.style.left = `${buttonX}px`;
    confetti.style.top = `${buttonY}px`;
    const randomColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confetti.style.backgroundColor = randomColor;

    const gravity = 0.5;
    const initialVelocityY = -10 + Math.random() * 5; // Random initial vertical velocity
    let velocityY = initialVelocityY;
    let lastTimestamp = null;

    function updatePosition(timestamp) {
        if (lastTimestamp === null) {
            lastTimestamp = timestamp;
            requestAnimationFrame(updatePosition);
            return;
        }

        const deltaTime = (timestamp - lastTimestamp) / 1000; // Convert milliseconds to seconds
        lastTimestamp = timestamp;

        const deltaY = velocityY * deltaTime + 0.5 * gravity * deltaTime ** 2;
        velocityY += gravity * deltaTime;

        const newX = parseFloat(confetti.style.left) + parseFloat(confetti.style.getPropertyValue('--x'));
        const newY = parseFloat(confetti.style.top) + parseFloat(confetti.style.getPropertyValue('--y')) + deltaY;

        confetti.style.left = `${newX}px`;
        confetti.style.top = `${newY}px`;

        if (newY < window.innerHeight && newX < window.innerWidth) {
            requestAnimationFrame(updatePosition);
        } else {
            confetti.remove();
        }
    }
    requestAnimationFrame(updatePosition);
}
        
function run() {
            const button = document.getElementById('submitMainForm');
        //    const loader = document.getElementById('loader');
            const mainBtn = document.getElementById('submitMainForm');
          //  button.style.color = 'transparent';
     //       loader.style.display = 'block';
            mainBtn.classList.toggle('loader')
            setTimeout(function() {
              mainBtn.classList.remove('loader')
              mainBtn.innerHTML = '&#9632; Stop';
              mainBtn.classList.toggle('stopBtn');
            }, 3000); 
        }


