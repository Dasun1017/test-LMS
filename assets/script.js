const navToggle = document.querySelector("[data-nav-toggle]");
const navLinks = document.querySelector("[data-nav-links]");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

document.querySelectorAll("[data-toggle-group]").forEach((group) => {
  group.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    group.querySelectorAll("button").forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
  });
});

document.querySelectorAll(".faq__button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq__item");
    const isOpen = item.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(isOpen));
  });
});

const pathwayJobs = [
  {
    country: "Japan",
    minAge: 18,
    maxAge: 35,
    genders: ["Female"],
    job: "Caregiver / Nursing Assistant",
    offer: "Caregiver job pathway preparation",
    training: "Japanese Language Program + Caregiver / Nursing Assistant Training",
    support: "JLPT/JFT guidance, workplace Japanese, interview training, and cultural orientation",
    priority: 1,
  },
  {
    country: "Japan",
    minAge: 18,
    maxAge: 30,
    genders: ["Female", "Male"],
    job: "Airport Ground Handling",
    offer: "Airport ground staff pathway preparation",
    training: "Japanese Language Program + Airport Ground Handling Training",
    support: "Passenger handling vocabulary, customer service practice, and interview readiness",
    priority: 2,
  },
  {
    country: "Japan",
    minAge: 20,
    maxAge: 45,
    genders: ["Male"],
    job: "Construction / Masonry",
    offer: "Construction skilled worker pathway preparation",
    training: "Japanese Language Program + Construction & Masonry Training",
    support: "Workplace safety vocabulary, skill exam guidance, and interview preparation",
    priority: 2,
  },
  {
    country: "Japan",
    minAge: 20,
    maxAge: 40,
    genders: ["Female", "Male"],
    job: "Agriculture / Food Processing",
    offer: "Agriculture and food processing pathway preparation",
    training: "Japanese Language Program + Agriculture / Manufacturing Readiness",
    support: "Workplace Japanese, safety orientation, and employer interview coaching",
    priority: 3,
  },
  {
    country: "Japan",
    minAge: 25,
    maxAge: 45,
    genders: ["Male"],
    job: "Commercial Driving",
    offer: "Driving-related overseas pathway preparation",
    training: "Japanese Language Program + Commercial Driving Readiness",
    support: "Workplace communication, safety orientation, and document guidance",
    priority: 3,
  },
  {
    country: "Italy",
    minAge: 18,
    maxAge: 45,
    genders: ["Female", "Male"],
    job: "Hospitality / Hotel Operations",
    offer: "Hospitality and seasonal work pathway preparation",
    training: "Italian Language Program + Hospitality & Hotel Operations Training",
    support: "Workplace Italian, service vocabulary, culture orientation, and interview preparation",
    priority: 1,
  },
  {
    country: "Italy",
    minAge: 18,
    maxAge: 45,
    genders: ["Female", "Male"],
    job: "Agriculture / Seasonal Work",
    offer: "Agriculture and seasonal work pathway preparation",
    training: "Italian Language Program + Agriculture Work Readiness",
    support: "Daily communication, workplace vocabulary, document support, and visa consultation",
    priority: 2,
  },
  {
    country: "Italy",
    minAge: 21,
    maxAge: 45,
    genders: ["Female"],
    job: "Caregiving",
    offer: "Caregiving pathway preparation",
    training: "Italian Language Program + Caregiver Training",
    support: "Care vocabulary, workplace communication, interview preparation, and culture orientation",
    priority: 1,
  },
  {
    country: "Italy",
    minAge: 20,
    maxAge: 45,
    genders: ["Male"],
    job: "Construction",
    offer: "Construction work pathway preparation",
    training: "Italian Language Program + Construction & Masonry Training",
    support: "Safety vocabulary, workplace discipline, and employer interview coaching",
    priority: 2,
  },
  {
    country: "Romania",
    minAge: 18,
    maxAge: 50,
    genders: ["Female", "Male"],
    job: "Factory / Manufacturing Operations",
    offer: "Factory and production work pathway preparation",
    training: "Romanian Language Program + Factory & Manufacturing Readiness",
    support: "Workplace Romanian, safety vocabulary, and employer interview preparation",
    priority: 1,
  },
  {
    country: "Romania",
    minAge: 18,
    maxAge: 50,
    genders: ["Female", "Male"],
    job: "Warehouse Operations",
    offer: "Warehouse work pathway preparation",
    training: "Romanian Language Program + Warehouse Operations Readiness",
    support: "Basic workplace language, safety training, and document guidance",
    priority: 2,
  },
  {
    country: "Romania",
    minAge: 20,
    maxAge: 50,
    genders: ["Male"],
    job: "Construction",
    offer: "Construction work pathway preparation",
    training: "Romanian Language Program + Construction & Masonry Training",
    support: "Safety orientation, workplace discipline, and interview coaching",
    priority: 2,
  },
  {
    country: "Romania",
    minAge: 18,
    maxAge: 45,
    genders: ["Female", "Male"],
    job: "Agriculture",
    offer: "Agriculture work pathway preparation",
    training: "Romanian Language Program + Agriculture Work Readiness",
    support: "Workplace vocabulary, safety basics, and cultural orientation",
    priority: 3,
  },
  {
    country: "Canada",
    minAge: 18,
    maxAge: 40,
    genders: ["Female", "Male"],
    job: "Study Pathway / Student Profile",
    offer: "Canada study pathway consultation",
    training: "Canada Consultation Pathway + Profile & Documentation Preparation",
    support: "Document checklist, CV/profile preparation, interview guidance, and application support",
    priority: 1,
  },
  {
    country: "Canada",
    minAge: 21,
    maxAge: 45,
    genders: ["Female", "Male"],
    job: "Hospitality / Care Support Profile",
    offer: "Canada work profile consultation",
    training: "Canada Consultation Pathway + Hospitality / Caregiver Readiness",
    support: "Profile review, documentation guidance, interview preparation, and visa consultation",
    priority: 2,
  },
  {
    country: "Canada",
    minAge: 21,
    maxAge: 45,
    genders: ["Male"],
    job: "Construction / Skilled Work Profile",
    offer: "Canada skilled work profile consultation",
    training: "Canada Consultation Pathway + Construction Skill Profile Preparation",
    support: "CV preparation, work experience presentation, document checklist, and consultation",
    priority: 2,
  },
];

const programFinder = document.querySelector("[data-program-finder]");
const programResults = document.querySelector("[data-program-results]");

const renderProgramMatches = () => {
  if (!programFinder || !programResults) return;

  const country = programFinder.elements.country.value;
  const gender = programFinder.elements.gender.value;
  const age = Number(programFinder.elements.age.value);

  if (!age) {
    programResults.innerHTML = '<div class="finder-results__empty">Enter your age to see matching job pathways and training courses.</div>';
    return;
  }

  if (country === "Not sure yet") {
    programResults.innerHTML = '<div class="finder-results__empty">Select Japan, Italy, Romania, or Canada to see country-specific job pathways.</div>';
    return;
  }

  const matches = pathwayJobs
    .filter((item) => item.country === country)
    .filter((item) => age >= item.minAge && age <= item.maxAge)
    .filter((item) => item.genders.includes(gender))
    .sort((a, b) => a.priority - b.priority || a.job.localeCompare(b.job));

  if (!matches.length) {
    programResults.innerHTML = `
      <div class="finder-results__empty">
        We do not have an automatic match for ${country}, age ${age}, ${gender.toLowerCase()} at the moment. Please book a free consultation so our counselor can review your profile manually.
      </div>
    `;
    return;
  }

  const primary = matches[0];
  const cards = matches
    .map((item, index) => `
      <article class="job-card${index === 0 ? " is-primary" : ""}">
        ${index === 0 ? '<span class="job-card__badge">Best match</span>' : ""}
        <h3>${item.job}</h3>
        <p class="muted">${item.offer}</p>
        <dl>
          <div><dt>Confiance can offer</dt><dd>${item.training}</dd></div>
          <div><dt>Preparation includes</dt><dd>${item.support}</dd></div>
        </dl>
      </article>
    `)
    .join("");

  programResults.innerHTML = `
    <div class="finder-results__summary">
      For <strong>${country}</strong>, age <strong>${age}</strong>, <strong>${gender}</strong>, the recommended pathway is <strong>${primary.job}</strong>. Confiance can support this with <strong>${primary.training}</strong>.
    </div>
    <div class="finder-results__grid">${cards}</div>
  `;
};

if (programFinder && programResults) {
  programFinder.addEventListener("input", renderProgramMatches);
  programFinder.addEventListener("change", renderProgramMatches);
  programFinder.addEventListener("submit", (event) => {
    event.preventDefault();
    renderProgramMatches();
  });
  renderProgramMatches();
}

document.querySelectorAll("form").forEach((form) => {
  if (form.matches("[data-program-finder]")) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = form.querySelector("[name='name']")?.value || "there";
    alert(`Thank you, ${name}. Confiance will contact you soon.`);
    form.reset();
  });
});

const leadPop = document.querySelector("[data-lead-pop]");
const closeLeadPop = document.querySelector("[data-lead-close]");

if (leadPop) {
  window.setTimeout(() => {
    if (!sessionStorage.getItem("confianceLeadClosed")) {
      leadPop.classList.add("is-visible");
    }
  }, 2400);
}

if (closeLeadPop) {
  closeLeadPop.addEventListener("click", () => {
    leadPop.classList.remove("is-visible");
    sessionStorage.setItem("confianceLeadClosed", "true");
  });
}
