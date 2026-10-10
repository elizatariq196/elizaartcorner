
/* ============================================================
   ELIZA ART CORNER
============================================================ */

const SITE = {
    name: "Eliza Art Corner",
    whatsapp: "923074067716",
    email: "elizatariq196@gmail.com",
    instagramUrl: "https://www.instagram.com/elizaartcorner",
    beehiivUrl: "https://eliza-art-corner.kit.com/3f972b5497"
};

/* ============================================================
   PAINTINGS
============================================================ */

const paintings = [
    {
        title: "A Little Further",
        image: "a-little-further.jpg",
        size: "18 × 24 in",
        medium: "Acrylic",
        price: "$420",
        status: "Available"
    },
    {
        title: "The Long Evening",
        image: "the-long-evening.jpg",
        size: "18 × 24 in",
        medium: "Acrylic",
        price: "$380",
        status: "Available"
    },
    {
        title: "The Man Outside",
        image: "the-man-outside.jpg",
        size: "12 × 12 in",
        medium: "Acrylic",
        price: "$120",
        status: "Available"
    },
    {
        title: "The Last Refuge",
        image: "the-last-refuge.jpg",
        size: "18 × 24 in",
        medium: "Acrylic",
        price: "$300",
        status: "Sold"
    },
    {
        title: "The Quiet House",
        image: "the.quiet.house.jpg",
        size: "12 × 12 in",
        medium: "Acrylic",
        price: "$120",
        status: "Sold"
    },
    {
        title: "Still Awake",
        image: "still-awake.jpg",
        size: "12 × 12 in",
        medium: "Acrylic",
        price: "$120",
        status: "Available"
    },
    {
        title: "Long Way Back",
        image: "long-way-back.jpg",
        size: "8 × 8 in",
        medium: "Acrylic",
        price: "$100",
        status: "Available"
    }
];

/* ============================================================
   ELEMENTS
============================================================ */

const paintingsGrid = document.getElementById("paintingsGrid");
const paintingModal = document.getElementById("paintingModal");
const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalSize = document.getElementById("modalSize");
const modalMedium = document.getElementById("modalMedium");
const modalPrice = document.getElementById("modalPrice");
const modalStatus = document.getElementById("modalStatus");
const modalContactLinks = document.getElementById("modalContactLinks");

/* ============================================================
   CONTACT LINKS
============================================================ */

function whatsappUrl(painting) {
    let message;

    if (painting.status.toLowerCase() === "sold") {
        message = `Hi Eliza! I'm interested in "${painting.title}". I saw that this painting has been sold, but I'd love to know if you could recreate it for me. Could you please share the details?`;
    } else {
        message = `Hi Eliza! I'm interested in the painting "${painting.title}". Could you please share more details?`;
    }

    return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

function emailUrl(painting) {
    let subject;
    let body;

    if (painting.status.toLowerCase() === "sold") {
        subject = `Commission enquiry: ${painting.title}`;
        body = `Hi Eliza,

I'm interested in your painting "${painting.title}". I noticed it has been sold, but I'd love to know if you would be open to recreating it for me.

Could you please share the details?

Thank you!`;
    } else {
        subject = `Enquiry about ${painting.title}`;
        body = `Hi Eliza,

I'm interested in the painting "${painting.title}". Could you please share more details?

Thank you!`;
    }

    return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function contactLinksMarkup(painting) {
    return `
        <div class="painting-enquiry">
            <p class="enquiry-label">Enquire about this painting</p>
            <div class="enquiry-links">
                <a
                    class="enquiry-link whatsapp-link"
                    href="${whatsappUrl(painting)}"
                    target="_blank"
                    rel="noopener"
                    aria-label="Ask about ${painting.title} on WhatsApp"
                >WhatsApp</a>

                <a
                    class="enquiry-link instagram-link"
                    href="${SITE.instagramUrl}"
                    target="_blank"
                    rel="noopener"
                    aria-label="Contact Eliza about ${painting.title} on Instagram"
                >Instagram</a>

                <a
                    class="enquiry-link email-link"
                    href="${emailUrl(painting)}"
                    aria-label="Email about ${painting.title}"
                >Email</a>
            </div>
        </div>
    `;
}

/* ============================================================
   DISPLAY PAINTINGS
============================================================ */

function renderPaintings() {
    if (!paintingsGrid) return;

    paintingsGrid.innerHTML = "";

    paintings.forEach((painting, index) => {
        const card = document.createElement("article");
        card.className = "painting-card";

        const isSold = painting.status.toLowerCase() === "sold";
        const statusClass = isSold ? "sold" : "";

        card.innerHTML = `
            <div
                class="painting-image-wrap"
                data-open-painting="${index}"
                role="button"
                tabindex="0"
                aria-label="View details for ${painting.title}"
            >
                <img
                    src="${painting.image}"
                    alt="${painting.title}"
                    class="painting-image"
                    loading="lazy"
                >
                <div class="painting-overlay">
                    <span>View Painting</span>
                </div>
            </div>

            <div class="painting-meta">
                <div>
                    <h3 class="painting-title">${painting.title}</h3>
                    <p class="painting-size">${painting.size}</p>
                    <p class="painting-medium">${painting.medium}</p>
                    <p class="painting-status ${statusClass}">${painting.status}</p>
                </div>

                <div class="painting-price">${painting.price}</div>
            </div>

            ${contactLinksMarkup(painting)}
        `;

        const image = card.querySelector(".painting-image");

        image.addEventListener("error", () => {
            image.style.display = "none";
            image.parentElement.classList.add("image-placeholder");
        });

        const imageWrap = card.querySelector(".painting-image-wrap");

        imageWrap.addEventListener("click", () => {
            openPainting(index);
        });

        imageWrap.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openPainting(index);
            }
        });

        // Keep enquiry links separate from the painting popup.
        card.querySelectorAll(".enquiry-link").forEach(link => {
            link.addEventListener("click", event => {
                event.stopPropagation();
            });
        });

        paintingsGrid.appendChild(card);
    });
}

/* ============================================================
   PAINTING POPUP
============================================================ */

function openPainting(index) {
    const painting = paintings[index];

    if (!painting || !paintingModal) return;

    // Record the painting viewed in the visitor's journey.
    trackJourney(`Viewed: ${painting.title}`);

    const isSold = painting.status.toLowerCase() === "sold";

    modalImage.style.visibility = "visible";
    modalImage.src = painting.image;
    modalImage.alt = painting.title;

    modalImage.onerror = () => {
        modalImage.style.visibility = "hidden";
        modalImage.parentElement.classList.add("image-placeholder");
    };

    modalImage.onload = () => {
        modalImage.style.visibility = "visible";
        modalImage.parentElement.classList.remove("image-placeholder");
    };

    modalTitle.textContent = painting.title;
    modalSize.textContent = painting.size;
    modalMedium.textContent = painting.medium;
    modalPrice.textContent = painting.price;

    // Sold paintings can still be requested as commissions.
    modalStatus.textContent = isSold
        ? "Open for commission"
        : "Available";

    const whatsappLink = modalContactLinks.querySelector(".whatsapp-link");
    const instagramLink = modalContactLinks.querySelector(".instagram-link");
    const emailLink = modalContactLinks.querySelector(".email-link");

    whatsappLink.href = whatsappUrl(painting);
    instagramLink.href = SITE.instagramUrl;
    emailLink.href = emailUrl(painting);

    paintingModal.classList.add("active");
    paintingModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closePainting() {
    if (!paintingModal) return;

    paintingModal.classList.remove("active");
    paintingModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

if (modalClose) {
    modalClose.addEventListener("click", closePainting);
}

if (modalOverlay) {
    modalOverlay.addEventListener("click", closePainting);
}

document.addEventListener("keydown", event => {
    if (
        event.key === "Escape" &&
        paintingModal?.classList.contains("active")
    ) {
        closePainting();
    }
});

/* ============================================================
   MOBILE NAVIGATION
============================================================ */

const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");

if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
        const isOpen = siteNav.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    siteNav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            siteNav.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}

/* ============================================================
   CONTACT INFORMATION
============================================================ */

const emailLink = document.getElementById("emailLink");
const emailText = document.getElementById("emailText");

if (emailLink) {
    emailLink.href = `mailto:${SITE.email}`;
}

if (emailText) {
    emailText.textContent = SITE.email;
}

const instagramLink = document.getElementById("instagramLink");

if (instagramLink) {
    instagramLink.href = SITE.instagramUrl;
}

const contactWhatsApp = document.getElementById("contactWhatsApp");

if (contactWhatsApp) {
    const message = "Hi Eliza! I'd like to enquire about your paintings.";

    contactWhatsApp.href =
        `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

/* ============================================================
   NEWSLETTER — KIT
============================================================ */

const newsletterButton = document.getElementById("newsletterButton");

if (newsletterButton) {
    if (SITE.beehiivUrl) {
        newsletterButton.href = SITE.beehiivUrl;
        newsletterButton.target = "_blank";
        newsletterButton.rel = "noopener";
    } else {
        newsletterButton.addEventListener("click", event => {
            event.preventDefault();
            alert("The mailing list will be available soon.");
        });
    }
}

/* ============================================================
   PUSHBIRD — VISITOR TRACKING
============================================================ */

// IMPORTANT: Replace this placeholder with Eliza's own webhook URL.
const PUSHBIRD_WEBHOOK = "https://pushbird.app/pb_hiqj2w24r58ojri4a9rwwprc";

function sendPushbird(title, message) {
    if (!PUSHBIRD_WEBHOOK.startsWith("https://")) return;
    if (PUSHBIRD_WEBHOOK.includes("PASTE_ELIZA")) return;

    const url =
        PUSHBIRD_WEBHOOK +
        "?title=" + encodeURIComponent(title) +
        "&message=" + encodeURIComponent(message);

    const img = new Image();
    img.src = url;
}

function trackJourney(action) {
    let journey = sessionStorage.getItem("visitorJourney") || "Gallery";

    // Avoid repeating the same action consecutively.
    if (!journey.endsWith(` → ${action}`)) {
        journey += ` → ${action}`;
    }

    // Keep the journey from growing indefinitely.
    const parts = journey.split(" → ");

    if (parts.length > 20) {
        parts.splice(1, parts.length - 20);
    }

    journey = parts.join(" → ");
    sessionStorage.setItem("visitorJourney", journey);
}

function sendJourneyUpdate() {
    const journey = sessionStorage.getItem("visitorJourney");
    const visitorId = localStorage.getItem("visitorId");
    const visitCount = localStorage.getItem("visitorVisitCount");

    if (!journey || !visitorId) return;

    // Send only when the journey has changed.
    if (sessionStorage.getItem("visitorJourneySent") === journey) {
        return;
    }

    sendPushbird(
        "Visitor activity",
        `${visitorId} - Visit #${visitCount} - ${journey}`
    );

    sessionStorage.setItem("visitorJourneySent", journey);
}

function sendVisitorLeft() {
    if (sessionStorage.getItem("visitorLeftNotificationSent")) return;

    const journey = sessionStorage.getItem("visitorJourney");
    const visitorId = localStorage.getItem("visitorId");
    const visitCount = localStorage.getItem("visitorVisitCount");

    if (!journey || !visitorId) return;

    sendPushbird(
        "Visitor left",
        `${visitorId} - Visit #${visitCount} - ${journey} - Left`
    );

    sessionStorage.setItem("visitorLeftNotificationSent", "1");
}

function notifyVisitor() {
    if (sessionStorage.getItem("visitorNotificationSent")) return;

    // Create an anonymous browser ID.
    let visitorId = localStorage.getItem("visitorId");

    if (!visitorId) {
        visitorId = Math.random()
            .toString(36)
            .substring(2, 7)
            .toUpperCase();

        localStorage.setItem("visitorId", visitorId);
    }

    // Count visits from this browser.
    let visitCount = parseInt(
        localStorage.getItem("visitorVisitCount") || "0",
        10
    );

    visitCount++;

    localStorage.setItem("visitorVisitCount", visitCount);

    const isReturning = visitCount > 1;
    const referrer = document.referrer;

    let source = "Direct";

    if (referrer) {
        try {
            const host = new URL(referrer).hostname.toLowerCase();

            if (host.includes("reddit")) source = "Reddit";
            else if (host.includes("google")) source = "Google";
            else if (host.includes("instagram")) source = "Instagram";
            else if (host.includes("facebook")) source = "Facebook";
            else if (host.includes("pinterest")) source = "Pinterest";
            else if (host.includes("bing")) source = "Bing";
            else source = host.replace("www.", "");
        } catch {}
    }

    const ua = navigator.userAgent.toLowerCase();

    let device = "Desktop";

    if (ua.includes("iphone")) device = "iPhone";
    else if (ua.includes("ipad")) device = "iPad";
    else if (ua.includes("android")) device = "Android";
    else if (ua.includes("mac")) device = "Mac";
    else if (ua.includes("windows")) device = "Windows";

    // Start a fresh journey for this visit.
    sessionStorage.setItem("visitorJourney", "Gallery");
    sessionStorage.removeItem("visitorJourneySent");
    sessionStorage.removeItem("visitorLeftNotificationSent");

    const title = isReturning ? "Returning visitor" : "New visitor";

    const message =
        `${isReturning ? "Returning" : "New"} visitor - ` +
        `${visitorId} - Visit #${visitCount} - ` +
        `${source} - ${device} - Gallery`;

    sendPushbird(title, message);

    sessionStorage.setItem("visitorNotificationSent", "1");
}

/* ============================================================
   TRACK ENQUIRIES, NAVIGATION AND MAILING LIST
============================================================ */

document.addEventListener("click", event => {
    const target = event.target;

    if (!(target instanceof Element)) return;

    // Track WhatsApp, Instagram and email enquiries,
    // both under paintings and inside the popup.
    const enquiryLink = target.closest(
        ".enquiry-link, .whatsapp-link, .instagram-link, .email-link"
    );

    if (enquiryLink) {
        const card = enquiryLink.closest(".painting-card");

        const title =
            card?.querySelector(".painting-title")?.textContent?.trim() ||
            modalTitle?.textContent?.trim() ||
            "Painting";

        let channel = "Enquiry";

        if (enquiryLink.classList.contains("whatsapp-link")) {
            channel = "WhatsApp";
        } else if (enquiryLink.classList.contains("instagram-link")) {
            channel = "Instagram";
        } else if (enquiryLink.classList.contains("email-link")) {
            channel = "Email";
        }

        trackJourney(`${channel}: ${title}`);
        return;
    }

    // Track navigation through page sections.
    const anchor = target.closest('a[href^="#"]');

    if (anchor) {
        const section = anchor.getAttribute("href").slice(1);

        if (section) {
            trackJourney(`Navigation: ${section}`);
        }
    }

    // Track the mailing-list button.
    if (target.closest("#newsletterButton")) {
        trackJourney("Mailing list");
    }
});

/* ============================================================
   PERIODIC JOURNEY UPDATES
============================================================ */

// Send changed activity every 30 seconds.
setInterval(sendJourneyUpdate, 30000);

/* ============================================================
   VISITOR EXIT
============================================================ */

// Try to send the final journey when the page is left.
// Browsers may not always complete a request during page exit.
window.addEventListener("pagehide", sendVisitorLeft);

/* ============================================================
   CURRENT YEAR AND INITIAL DISPLAY
============================================================ */

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// Render the paintings and start visitor tracking.
renderPaintings();
notifyVisitor();
