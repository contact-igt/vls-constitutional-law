// Source of truth: docs/VLS_BOOTCAMP_CONTENT.md. Keep copy in sync with that file.

export const COURSE_ID = "constitutional-law-bootcamp";

export const contact = {
  coursePhone: "+91 95000 25216",
  courseTel: "tel:+919500025216",
  academyPhone: "+91 95002 07811",
  academyTel: "tel:+919500207811",
  whatsappNumber: "919500025216",
  website: "https://www.vlslawacademy.com",
  privacy: "https://www.vlslawacademy.com/privacy-policy",
  terms: "https://www.vlslawacademy.com/terms-and-conditions",
  address:
    "No. 1910, 2nd Floor, H Block, 5th Street, 12th Main Road, Anna Nagar West, Chennai, Tamil Nadu – 600040.",
} as const;

export const whatsappLink = (message: string) =>
  `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const WHATSAPP_DEFAULT_MESSAGE =
  "Hello VLS Law Academy, I would like details about the Constitutional Law & Practice Boot Camp.";

export const hero = {
  eyebrow: "VLS Law Academy | Practical Legal Training",
  title: "Constitutional Law & Practice Boot Camp",
  tagline: "Understand the Constitution. Learn the Remedies. Explore Court Practice.",
  body: [
    "Constitutional law is more than understanding Articles and legal principles. It is about knowing how constitutional rights are protected, how petitions are brought before the courts, and how legal proceedings move through the judicial system.",
    "Join VLS Law Academy's focused boot camp to strengthen your understanding of constitutional remedies, writ proceedings, appellate jurisdiction and important petition procedures before the Supreme Court and High Courts.",
  ],
  primaryCta: "Enquire / Register Now",
  secondaryCta: "Explore the Syllabus",
  highlights: [
    { value: "13", label: "Key topics" },
    { value: "6", label: "Syllabus units" },
    { value: "2", label: "Court systems explored" },
  ],
} as const;

export const problem = {
  heading: "From Constitutional Theory to Courtroom Understanding.",
  intro:
    "Studying Fundamental Rights, constitutional provisions and landmark principles is essential. But understanding how they operate through legal proceedings requires another level of clarity.",
  questions: [
    "When is a writ petition appropriate?",
    "How does a Special Leave Petition differ from an ordinary appeal?",
    "What is the purpose of a review petition?",
    "How do the jurisdiction and powers of the Supreme Court and High Courts differ?",
  ],
  outro:
    "The boot camp is designed to connect constitutional concepts with the petitions, remedies and procedures encountered in legal practice.",
  closing:
    "Knowing the provision is the beginning. Understanding its practical application is the next step.",
} as const;

export const curriculum = {
  heading: "Explore Constitutional Law Through Six Core Learning Areas.",
  units: [
    {
      n: "01",
      title: "Constitutional Foundations",
      body: "Understand Fundamental Rights, Directive Principles of State Policy, Fundamental Duties, constitutional doctrines, Union and State institutions, Centre–State relations, emergency provisions and constitutional amendments.",
    },
    {
      n: "02",
      title: "Writ Jurisdiction & Public Interest Litigation",
      body: "Study writ petitions under Article 226, the Madras High Court Writ Rules, 2021, constitutional writ remedies, writ miscellaneous petitions, filing procedures, categorisation of proceedings and PILs.",
    },
    {
      n: "03",
      title: "Election Petitions",
      body: "Explore the legal framework for election disputes involving legislative bodies and local authorities, including MLA, MLC, Lok Sabha, Rajya Sabha, Panchayat and Municipal elections.",
    },
    {
      n: "04",
      title: "Original Jurisdiction of the Supreme Court",
      body: "Learn about the Supreme Court's original jurisdiction concerning constitutional disputes between the Union and States, or between States.",
    },
    {
      n: "05",
      title: "Special Leave Jurisdiction",
      body: "Understand the purpose and constitutional framework of Special Leave Petitions before the Supreme Court under Article 136.",
    },
    {
      n: "06",
      title: "Appellate Jurisdiction & Constitutional Appeals",
      body: "Explore civil and criminal appeals before the Supreme Court and High Courts, constitutional appellate remedies, and the relationship between different levels of judicial review.",
    },
  ],
} as const;

export const topics = {
  heading: "Constitutional Remedies & Petition Practice.",
  intro:
    "Explore the major constitutional remedies and petition categories referenced in the boot camp, including their purpose, relevant jurisdiction and role in legal proceedings.",
  clusters: [
    {
      id: "writs",
      title: "Writs & Original Remedies",
      items: [
        { name: "Writ Petitions & Writ Appeals", desc: "Constitutional writ remedies and related appellate procedures" },
        { name: "Public Interest Litigations (PILs)", desc: "Proceedings concerning public-interest matters" },
        { name: "Original Petitions", desc: "Original-jurisdiction matters before the appropriate Supreme Court or High Court forum" },
        { name: "Supervisory Petitions", desc: "High Court supervisory jurisdiction under Article 227" },
      ],
    },
    {
      id: "appeals",
      title: "Appeals & Corrective Remedies",
      items: [
        { name: "Special Leave Petitions (SLPs)", desc: "Discretionary special leave jurisdiction of the Supreme Court" },
        { name: "Constitutional Appeals", desc: "Appeals involving constitutional questions and appellate remedies" },
        { name: "Review Petitions", desc: "Applications seeking review of judicial decisions under applicable law and rules" },
        { name: "Curative Petitions", desc: "The exceptional curative jurisdiction of the Supreme Court" },
        { name: "Certificate Petitions", desc: "Constitutional certification relating to appeals under Article 134A" },
      ],
    },
    {
      id: "special",
      title: "Special Constitutional Proceedings",
      items: [
        { name: "Election Petitions", desc: "Statutory challenges involving election disputes" },
        { name: "Advisory Reference", desc: "The Supreme Court's advisory jurisdiction under Article 143" },
        { name: "Transfer Petitions", desc: "Procedures for transferring cases between appropriate courts" },
        { name: "Contempt Petitions", desc: "Proceedings relating to contempt of court" },
      ],
    },
  ],
} as const;

export const takeaways = {
  heading: "Build Clarity Beyond the Bare Act.",
  items: [
    "Understand the constitutional foundations relevant to legal practice.",
    "Distinguish between important petitions and judicial remedies.",
    "Identify the broad jurisdictional differences between the Supreme Court and High Courts.",
    "Become familiar with writ proceedings and the Madras High Court procedural framework.",
    "Recognise the role of appellate and special constitutional jurisdictions.",
    "Connect legal theory with a more structured understanding of proceedings.",
  ],
  support:
    "A stronger conceptual and procedural foundation can help law learners approach constitutional matters with greater clarity.",
} as const;

export const audience = {
  heading: "Who should attend?",
  items: [
    { title: "Law Students", body: "Build early familiarity with constitutional remedies and court proceedings." },
    { title: "Law Graduates", body: "Bridge the gap between academic study and procedural understanding." },
    { title: "Junior Advocates", body: "Strengthen familiarity with writ, appellate and petition practice." },
    { title: "Practising Advocates", body: "Refresh and organise constitutional-law concepts and remedies." },
  ],
} as const;

export const whyVls = {
  heading: "Learn From an Academy That Connects Law With Practice.",
  intro:
    "VLS Law Academy emphasises both conceptual understanding and the application of legal principles in professional contexts.",
  points: [
    { title: "Conceptual clarity", body: "Understand the legal foundations before exploring their practical application." },
    { title: "Practice-oriented perspective", body: "Connect constitutional principles to real judicial remedies and procedures." },
    { title: "An established legal-learning environment", body: "Learn in a setting built around faculty-led classroom teaching." },
  ],
} as const;

export const environment = {
  heading: "Learn With VLS Law Academy.",
  body: "Constitutional practice becomes easier to approach when legal concepts are explained alongside the jurisdiction, remedies and procedural framework of the courts.",
} as const;

export const registration = {
  heading: "Take the Next Step in Understanding Constitutional Practice.",
  body: "Explore constitutional remedies, court jurisdiction and important petition procedures with VLS Law Academy.",
  note: "Our team will contact you with the course schedule, fees and registration details.",
  primaryCta: "Request Course Details",
  secondaryCta: "Enquire on WhatsApp",
  statuses: ["Law student", "Graduate", "Junior advocate", "Practising advocate", "Other"],
} as const;

export const faqs = [
  {
    q: "What does the boot camp cover?",
    a: "Constitutional foundations, writ proceedings, PILs, election petitions, original jurisdiction, SLPs, appeals and additional petition categories listed in the boot camp syllabus.",
  },
  {
    q: "Is this useful for law students?",
    a: "Yes. The subject matter is relevant to students seeking greater familiarity with constitutional remedies and judicial proceedings.",
  },
  {
    q: "Does it include writ petitions?",
    a: "Yes. Writ jurisdiction and the Madras High Court Writ Rules, 2021, are part of the brochure syllabus.",
  },
  {
    q: "Are Supreme Court and High Court procedures covered?",
    a: "Yes, within the constitutional-jurisdiction and petition topics specified in the course materials.",
  },
  {
    q: "Will participants learn about review and curative petitions?",
    a: "Both appear in the boot camp poster's topic list.",
  },
  {
    q: "What are the class dates and fees?",
    a: "Contact VLS Law Academy for the confirmed schedule, fee and registration information.",
  },
  {
    q: "Will there be recordings, materials or certificates?",
    a: "Please confirm these inclusions with the academy before enrolment.",
  },
] as const;

export const finalCta = {
  heading: "Strengthen Your Constitutional Law Foundation.",
  body: "Move beyond memorising provisions. Build a clearer understanding of constitutional remedies, petitions and judicial procedure.",
  cta: "Enquire About the Boot Camp",
} as const;

// Photographs are pending VLS reuse approval (docs/APPROVALS.md). While `src` is null
// the <Photo> component renders a neutral placeholder. Do not label as boot-camp photos.
export const photos = {
  hero: {
    src: null as string | null,
    alt: "Faculty member explaining a point to a classroom of law learners at VLS Law Academy",
  },
  learners: {
    src: null as string | null,
    alt: "Law learners taking notes during a session at VLS Law Academy",
  },
  academy: {
    src: null as string | null,
    alt: "Interior of the VLS Law Academy classroom with VLS branding",
  },
} as const;
