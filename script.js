const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
menuToggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
}));
document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("contactForm");
form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const cfg = window.NOVA_CONFIG || {};
  const recipient = cfg.contactEmail || "";
  if (!recipient || recipient.includes("YOUR_BUSINESS_EMAIL")) {
    document.getElementById("formNote").textContent =
      "Before publishing, open config.js and replace YOUR_BUSINESS_EMAIL@example.com with an email address you control.";
    return;
  }
  const data = new FormData(form);
  const subject = encodeURIComponent("NOVA Digital project enquiry — " + data.get("project"));
  const body = encodeURIComponent(
    "Name: " + data.get("name") + "\n" +
    "Email: " + data.get("email") + "\n" +
    "Project type: " + data.get("project") + "\n\n" +
    "Project details:\n" + data.get("details")
  );
  window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
});
