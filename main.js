const scrollers = document.querySelectorAll(".scroller");

// If a user hasn't opted in for recuded motion, then we add the animation
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation();
}

function addAnimation() {
  scrollers.forEach((scroller) => {
    // add data-animated="true" to every `.scroller` on the page
    scroller.setAttribute("data-animated", true);

    // Make an array from the elements within `.scroller-inner`
    const scrollerInner = scroller.querySelector(".scroller__inner");
    const scrollerContent = Array.from(scrollerInner.children);

    // For each item in the array, clone it
    // add aria-hidden to it
    // add it into the `.scroller-inner`
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}


async function contactUs(){
  const name = document.querySelector("#name").value
  const phone = document.querySelector("#phone").value
  const email = document.querySelector("#email").value
  const subject = document.querySelector("#subject").value
  const message = document.querySelector("#message").value
  const loadingBtn = document.querySelector("#loadingBtn")
  const msgBtn = document.querySelector("#msgBtn")

  if(!document.querySelector("#supportCheckbox").checked){
    Swal.fire({
      icon: "error",
      text: "Please agree to our terms and support",
    });
    return
  }

  console.log({name:name, email:email, phone:phone, subject:subject, message:message});

  loadingBtn.style.display = "block"
  msgBtn.style.display = "none"

  const res = await fetch(`https://nder-agency.onrender.com/api/v1/create-user`,{
    method:"POST",
    headers: {
      "Content-Type":"application/json"
    },
    body: JSON.stringify({name:name, email:email, phone:phone, subject:subject, message:message})
  })
  const data = await res.json()

  if(res){
    loadingBtn.style.display = "none"
    msgBtn.style.display = "block"
  }

  if(!res.ok){
    Swal.fire({
      icon: "error",
      text: data.msg,
    });
  }

  if(res.ok){
    Swal.fire({
      text: `We have received your message, we would get back to you in the next 24 hours. Thank you and have a wonderful day.😊`,
      icon: "success"
    });
    document.querySelector("#name").value = ""
    document.querySelector("#phone").value = ""
    document.querySelector("#email").value = ""
    document.querySelector("#subject").value = ""
    document.querySelector("#message").value = ""
    document.querySelector("#supportCheckbox").checked = false
  }
  console.log(res, data);
}