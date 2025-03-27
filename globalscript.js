function toggleMenu() {
  const menu = document.getElementById("mobile-menu");
  menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

let changedEmail = false;
let animationEnabled = true;

document.addEventListener("DOMContentLoaded", function () {
  const mailAreas = document.querySelectorAll(".email");


  // Detect if the user is on a mobile device
  const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

  if (mailAreas.length > 0) {
    if (isMobile) {
      document.body.addEventListener("touchstart", revealEmails, { passive: true });
    }

    document.body.addEventListener("mouseover", function () {
      if (!changedEmail) {
        revealEmails();
      }
    });
  }

  if (animationEnabled) {
    // Select all elements with the class 'animated'
    const animElements = document.querySelectorAll(".animated");
    const animParents = document.querySelectorAll(".animated-children");

    // Set up the Intersection Observer
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add the 'visible' class to trigger the animation
            entry.target.classList.add("visible");
            // Optionally, stop observing after the element is in view
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    ); // 30% of the element should be in view

    const observerParent = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Add a delay based on the item's index
            entry.target.style.animationDelay = `${index * 0.1}s`; // Adjust delay as needed

            // Add the 'visible' class to trigger the animation
            entry.target.classList.add("visible");

            // Optionally, stop observing after the element is in view
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    // Start observing each element
    animElements.forEach((element) => {
      element.style.opacity = 0;
      observer.observe(element);
    });
    animParents.forEach((ap) => {
      const children = ap.children;
      Array.from(children).forEach((child, index) => {
        if (!Array.from(animElements).includes(child)) {
          child.style.opacity = 0;
          observerParent.observe(child);
        }
      });
    });
  }
});

function revealEmails() {
  if (!changedEmail) {
    changedEmail = true;
    const mailAreas = document.querySelectorAll(".email");
    mailAreas.forEach((mailArea) => {
      const originalEmail = mailArea.href.replace(/v/g, "").replace("mailto:", "");

      mailArea.textContent = originalEmail;
      mailArea.href = `mailto:${originalEmail}`;
    });
  }
}
