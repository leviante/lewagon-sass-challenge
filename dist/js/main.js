//Selecting elements from DOM
const followUs = document.querySelector(".follow-us");
const dropdownContent = document.querySelector(".follow-us-content");
const header = document.querySelector("#header");
const info = document.querySelectorAll(".info-element");

//Selecting for popup form
const orderForm = document.querySelector("#order-form");
const orderBtn = document.querySelectorAll(".order-btn");
const formDiv = document.querySelector(".form-div");
const exitBtn = document.querySelector(".exit-form");

//get window height (for content animation)
let viewportHeight = window.innerHeight;

//Dropdown upon click
let stateDropdown = false; //to control the dropdown
followUs.addEventListener("click", showDropdown);

//Black background in header upon scrolling
window.addEventListener("scroll", setHeaderBackground);

//Order form appearance, listen click event
let stateClicked = false;
for (let btn of orderBtn) {
  btn.addEventListener("click", showForm);
}

//exit form click event (using exit button)
exitBtn.addEventListener("click", exitForm);

//listen document to click-close modal form page
document.addEventListener("click", e => {
  if (stateClicked == false) {
    console.log("form is not opened yet.");
  }
  if (stateClicked == true) {
    if (e.target == formDiv) {
      console.log("so closeeeee!!");
      exitForm();
    } else {
      return;
    }
  }
});

//Event listener callbacks

//------------------------------------------------------------------------------//

//Dropdown Box
function showDropdown() {
  if (!stateDropdown) {
    dropdownContent.classList.add("show");
    stateDropdown = true;
  } else {
    dropdownContent.classList.remove("show");
    stateDropdown = false;
  }
}

//Header Background
function setHeaderBackground() {
  //add header background if window is scrolled
  if (window.scrollY != 0) {
    header.classList.add("blk-header");
  } else {
    header.classList.remove("blk-header");
  }

  //compare relative position to viewportHeight, add if less
  info.forEach(infoEle => {
    if (infoEle.getBoundingClientRect().top < viewportHeight) {
      infoEle.classList.add("show");
    } else {
      infoEle.classList.remove("show");
    }
  });
}

//Show Form
function showForm() {
  stateClicked = true;
  formDiv.classList.add("show");
  orderForm.classList.add("show");
  //Cancel scrolling while form is open
  document.getElementsByTagName("body")[0].style.overflow = "hidden";
}

//Exit Form
function exitForm() {
  formDiv.classList.remove("show");
  orderForm.classList.remove("show");
  stateClicked = false;
  //Re-enable scrolling
  document.getElementsByTagName("body")[0].style.overflow = "visible";
}

//isLocalNode
function isLocalNode(node, target) {
  return node.contains(target);
}

//------------------------------------------------------------------------------//

// Vanilla JavaScript Scroll to Anchor
// @ https://perishablepress.com/vanilla-javascript-scroll-anchor/

(function() {
  scrollTo();
})();

function scrollTo() {
  const links = document.querySelectorAll(".next-section");
  links.forEach(each => (each.onclick = scrollAnchors));
}

function scrollAnchors(e, respond = null) {
  const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);
  e.preventDefault();
  var targetID = respond
    ? respond.getAttribute("href")
    : this.getAttribute("href");
  const targetAnchor = document.querySelector(targetID);
  if (!targetAnchor) return;
  const originalTop = distanceToTop(targetAnchor);
  window.scrollBy({ top: originalTop, left: 0, behavior: "smooth" });
  const checkIfDone = setInterval(function() {
    const atBottom =
      window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
    if (distanceToTop(targetAnchor) === 0 || atBottom) {
      targetAnchor.tabIndex = "-1";
      targetAnchor.focus();
      window.history.pushState("", "", targetID);
      clearInterval(checkIfDone);
    }
  }, 100);
}
