function toggleMenu() {
    const menu = document.getElementById('mobile-navbar');
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
}

let changedEmail = false;


document.addEventListener("DOMContentLoaded", function () {
    const centralContent = document.querySelector(".content");
    const mailAreas = document.querySelectorAll(".mail_area");
    let changedEmail = false;

    // Detect if the user is on a mobile device
    const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

    if (mailAreas.length > 0) {
        mailAreas.forEach(mailArea => {
            const originalEmail = mailArea.href.replace(/v/g, '').replace('mailto:', '');
            const originalHref = mailArea.href.replace(/v/g, '');

            if (isMobile) {
                // Mobile: Set text to "Tap to Reveal Email"
                mailArea.textContent = "Tap to Reveal Email";
                mailArea.href = "javascript:void(0)"; // Prevents immediate linking

                // On tap, reveal the email
                mailArea.addEventListener("click", function () {
                    if (!changedEmail) {
                        mailArea.textContent = originalEmail;
                        mailArea.href = `mailto:${originalEmail}`;
                        changedEmail = true;
                    }
                });
            } else {
                // Desktop: Reveal email on hover
                if (centralContent) {
                    centralContent.addEventListener("mouseover", function () {
                        if (!changedEmail) {
                            mailAreas.forEach(area => {
                                area.textContent = originalEmail;
                                area.href = `mailto:${originalEmail}`;
                            });
                            changedEmail = true;
                        }
                    });
                }
            }
        });
    }
});
