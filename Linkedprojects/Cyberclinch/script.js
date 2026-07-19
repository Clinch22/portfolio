const services = {
  typing: {
    title: "Document Typing & Editing",
    options: [
      ["type.jpg","Professional Typing","KES 100/page"],
      ["format.jpeg","Formatting","KES 50/page"],
      ["cv.jpg","CVs","KES 250"],
      ["plans.jpeg","Business Plans","KES 300"],
      ["report.jpeg","Reports","KES 150/page"]
    ]
  },
  online: {
    title: "Online Applications",
    options: [
      ["helb.png","HELB Application","KES 300"],
      ["poster.png","Poster Design","KES 300"]
    ]
  },
  kra: {
    title: "KRA & Government",
    options: [
      ["kra.jpeg","KRA PIN","KES 200"],
      ["returns.png","KRA Returns","KES 100"],
      ["ecitizen.png","eCitizen","KES 100"],
      ["ntsa.png","NTSA","KES 200"]
    ]
  },
  email: {
    title: "Email Setup",
    options: [
      ["mail.jpeg","Email Creation","KES 50"],
      ["google.png","Google Account","KES 100"]
    ]
  },
  it: {
    title: "Website & IT Support",
    options: [
      ["web.png","Website Creation","From KES 500"],
      ["sw.jpg","Software Install","KES 500"]
    ]
  },
  games: {
    title: "PC Games",
    options: [
      ["creed.jpeg","Assassin’s Creed IV","KES 50"],
      ["gta.jpeg","GTA IV","KES 150"],
      ["et.jpeg","Euro Truck","KES 50"]
    ]
  }
};

let currentService="";

function openModal(key){
  currentService=key;
  document.getElementById("modalTitle").innerText=services[key].title;
  const box=document.getElementById("optionsContainer");
  box.innerHTML="";
  services[key].options.forEach(o=>{
    box.innerHTML+=`
      <label class="option">
        <input type="checkbox" value="${o[1]} - ${o[2]}">
        <img src="assets/services/${o[0]}">
        <div><b>${o[1]}</b><br>${o[2]}</div>
      </label>`;
  });
  document.getElementById("serviceModal").style.display="flex";
}

function closeModal(){
  document.getElementById("serviceModal").style.display="none";
}

function sendToWhatsApp(){
  const name=customerName.value;
  const phone=customerPhone.value;
  const selected=[...document.querySelectorAll("input[type=checkbox]:checked")];
  if(!name||!phone||!selected.length){ alert("Fill all fields"); return; }

  let msg=`Name: ${name}\nPhone: ${phone}\nService: ${services[currentService].title}\n`;
  selected.forEach(s=>msg+=`• ${s.value}\n`);
  if(otherOption.value) msg+=`Other: ${otherOption.value}`;

  window.open(`https://wa.me/254743247039?text=${encodeURIComponent(msg)}`);
}
