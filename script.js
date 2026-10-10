/* ============================================================
   ELIZA ART CORNER
============================================================ */

const SITE = {
    name: "Eliza Art Corner",
    whatsapp: "923074067716",
    email: "elizatariq196@gmail.com",
    instagramUrl: "https://www.instagram.com/elizaartcorner",
    kitUrl: "https://eliza-art-corner.kit.com/3f972b5497"
};

/* ============================================================
   PAINTINGS
   Upload every painting image directly to the main repository.
   Filenames here must match the uploaded files exactly.
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
   NEWSLETTER
   Add Eliza's Beehiiv signup URL when available.
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
   CURRENT YEAR AND INITIAL DISPLAY
============================================================ */

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// Pushbird code remains blank in index.html until configured.

renderPaintings();
