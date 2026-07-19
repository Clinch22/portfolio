const typingTarget = document.querySelector("[data-typing]");
const words = ["Frontend Developer", "ICT Technician", "Graphic Designer", "Problem Solver"];
let wordIndex = 0;
let letterIndex = 0;
let deleting = false;

function typeLoop() {
  if (!typingTarget) return;
  const word = words[wordIndex];
  typingTarget.textContent = word.slice(0, letterIndex);
  if (!deleting && letterIndex < word.length) {
    letterIndex += 1;
    setTimeout(typeLoop, 70);
    return;
  }
  if (!deleting && letterIndex === word.length) {
    deleting = true;
    setTimeout(typeLoop, 1300);
    return;
  }
  if (deleting && letterIndex > 0) {
    letterIndex -= 1;
    setTimeout(typeLoop, 38);
    return;
  }
  deleting = false;
  wordIndex = (wordIndex + 1) % words.length;
  setTimeout(typeLoop, 220);
}
typeLoop();
