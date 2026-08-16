export type SpecialtyExtra = {
  steps: { title: string; body: string }[];
  rehabParagraphs: string[];
  milestones: string[];
  faqs: { q: string; a: string }[];
};

const consult = {
  title: "Consultation & examination",
  body: "A detailed history and hands-on clinical examination to identify the exact structure causing pain, instability or stiffness.",
};
const imaging = {
  title: "Imaging & diagnosis",
  body: "X-rays, and where needed an MRI or CT scan, to confirm the diagnosis and plan treatment precisely.",
};

export const SPECIALTY_EXTRAS: Record<string, SpecialtyExtra> = {
  "knee-arthroscopy": {
    steps: [
      consult,
      imaging,
      {
        title: "Non-surgical trial where suitable",
        body: "Activity modification, bracing and a targeted physiotherapy programme are tried first for many meniscus and cartilage problems.",
      },
      {
        title: "Key-hole procedure",
        body: "Two or three small portals allow the camera and instruments into the joint — the ligament is reconstructed or the meniscus repaired the same day.",
      },
      {
        title: "Guided recovery",
        body: "Physiotherapy begins within 24–48 hours and progresses through range, strength, agility and sport-specific phases.",
      },
    ],
    rehabParagraphs: [
      "Most knee arthroscopies are day-care procedures. You walk with support on the same or next day, and the small portals heal within two weeks.",
      "After ACL reconstruction the graft needs time to biologically integrate. Rehabilitation is therefore staged and criteria-based rather than fixed to the calendar — you progress when strength and control targets are met.",
      "Returning to pivoting sport too early is the commonest reason for re-injury, which is why formal testing is done before clearance.",
    ],
    milestones: [
      "Week 1–2: full extension, swelling control, quadriceps activation",
      "Week 3–6: full range of motion, walking without support",
      "Month 3–4: running in a straight line",
      "Month 6+: agility and pivoting drills",
      "Month 9–12: return to competitive sport after clearance testing",
    ],
    faqs: [
      { q: "Will I need a plaster cast after ACL surgery?", a: "No. A brace may be used briefly for comfort, but early controlled movement gives better results than immobilisation." },
      { q: "Is the graft taken from my own body?", a: "Usually yes — most commonly the hamstring tendons, which regenerate and do not weaken the leg long term." },
      { q: "Can a meniscus tear be left alone?", a: "Small stable tears in low-demand knees can settle with physiotherapy. Tears that lock or repeatedly catch the knee need arthroscopic treatment." },
      { q: "When can I drive?", a: "Typically two to four weeks for a right knee, earlier for the left, once you can brake with confidence." },
    ],
  },
  "shoulder-arthroscopy": {
    steps: [
      consult,
      imaging,
      {
        title: "Injection or physiotherapy trial",
        body: "Impingement and frozen shoulder often respond to a guided injection combined with a structured stretching programme.",
      },
      {
        title: "Arthroscopic repair",
        body: "The cuff tendon is re-anchored to bone, or the labrum repaired, through key-hole portals under regional anaesthesia.",
      },
      {
        title: "Milestone-based rehabilitation",
        body: "A sling for protection, then passive movement, active movement and finally strengthening as healing allows.",
      },
    ],
    rehabParagraphs: [
      "Shoulder tendon healing to bone is slower than skin healing, so the first six weeks protect the repair while a therapist moves the joint for you.",
      "Active movement is introduced once the repair is secure, and strengthening only after full passive range is regained. Rushing this sequence is the main cause of re-tear.",
      "Recurrent dislocation surgery follows a similar staged path, with contact sport deferred until the stabilised shoulder is strong in end-range positions.",
    ],
    milestones: [
      "Week 0–4: sling, passive range, elbow and hand exercises",
      "Week 4–8: active-assisted then active movement",
      "Week 8–12: strengthening begins",
      "Month 4–6: overhead loading and sport-specific work",
    ],
    faqs: [
      { q: "Can I sleep on the operated side?", a: "Not for the first six weeks. Most patients sleep semi-reclined with a pillow supporting the elbow." },
      { q: "Does frozen shoulder always need surgery?", a: "No. The large majority resolve with injection and a persistent stretching programme; surgery is reserved for stubborn cases." },
      { q: "How soon can I use a computer?", a: "Light desk work with the arm supported is usually possible within a week or two." },
      { q: "Will the dislocation come back?", a: "Recurrence after a well-performed arthroscopic stabilisation is uncommon, provided rehabilitation is completed." },
    ],
  },
  "foot-and-ankle": {
    steps: [
      consult,
      imaging,
      {
        title: "Bracing and rehabilitation",
        body: "Most sprains, Achilles problems and plantar fasciitis improve with bracing, load management, orthoses and targeted physiotherapy.",
      },
      {
        title: "Ankle arthroscopy or ligament repair",
        body: "Persistent instability, impingement or cartilage lesions are treated arthroscopically; torn ligaments are repaired or reconstructed.",
      },
      {
        title: "Progressive weight-bearing",
        body: "A boot or brace protects the repair while walking is gradually restored under supervision.",
      },
    ],
    rehabParagraphs: [
      "The ankle tolerates early movement well but needs protection from twisting while ligaments heal. A walker boot allows walking without stressing the repair.",
      "Balance retraining is essential — the joint's position sense is disturbed after every significant sprain, and untreated it leads to repeat injury.",
      "Deformity correction and Achilles reconstruction follow longer timelines, with the plan explained clearly before surgery.",
    ],
    milestones: [
      "Week 0–2: swelling control, protected weight-bearing",
      "Week 2–6: brace or boot, range of motion work",
      "Week 6–12: strength and proprioception training",
      "Month 3–6: running and sport-specific drills",
    ],
    faqs: [
      { q: "My ankle keeps rolling over — is that normal after a sprain?", a: "No. Repeated giving way suggests ligament laxity or a cartilage lesion and should be assessed." },
      { q: "Do I need surgery for plantar fasciitis?", a: "Rarely. Stretching, heel cushioning, orthoses and occasionally injections resolve most cases." },
      { q: "How long is the boot worn after Achilles repair?", a: "Usually six to eight weeks, with the heel wedge reduced in stages." },
      { q: "Can flat feet be corrected?", a: "Flexible flat feet are managed with orthoses and strengthening; rigid, painful deformity may need surgical correction." },
    ],
  },
  "joint-replacement": {
    steps: [
      consult,
      imaging,
      {
        title: "Pre-operative optimisation",
        body: "Blood sugar, blood pressure, dental and skin checks plus pre-habilitation exercises reduce complications and speed recovery.",
      },
      {
        title: "Total or partial replacement",
        body: "Worn surfaces are resurfaced with implants sized and aligned to your anatomy; partial replacement is chosen where only one compartment is affected.",
      },
      {
        title: "Rapid recovery protocol",
        body: "Modern pain control allows standing and walking with support on the day of surgery, with discharge typically in two to three days.",
      },
    ],
    rehabParagraphs: [
      "Joint replacement is a quality-of-life operation. The aim is a pain-free joint that lets you walk, climb stairs, sit comfortably and sleep through the night.",
      "Walking begins on the day of surgery under supervision. Most patients use a walker for two weeks, a stick for another two, and then walk independently.",
      "Strength and range continue to improve for up to a year. Modern implants commonly last 15–20 years or more with sensible activity.",
    ],
    milestones: [
      "Day 0: standing and a few assisted steps",
      "Day 2–3: discharge home, stairs practice",
      "Week 2: stitches out, walker to stick",
      "Week 6: independent walking, driving for most",
      "Month 3–6: full daily activity and low-impact sport",
    ],
    faqs: [
      { q: "How long does a knee replacement last?", a: "Most modern implants last 15–20 years or longer; longevity depends on weight, activity and bone quality." },
      { q: "Can both knees be done together?", a: "In selected, medically fit patients yes — this is discussed case by case." },
      { q: "Will I be able to sit cross-legged?", a: "Many patients regain deep flexion, but it is not guaranteed and should not be forced in the early months." },
      { q: "Is it covered by insurance?", a: "Most health insurance policies and government schemes cover joint replacement; the clinic team helps with documentation." },
    ],
  },
  "trauma-and-fractures": {
    steps: [
      { title: "Emergency assessment", body: "Rapid evaluation of the injury, associated injuries and circulation, with immediate splinting and pain relief." },
      imaging,
      {
        title: "Fixation or conservative care",
        body: "Stable fractures are treated in a cast or brace; displaced and unstable fractures are fixed with plates, nails or screws.",
      },
      {
        title: "Early mobilisation",
        body: "Secure fixation allows joints to be moved early, which prevents stiffness and speeds functional recovery.",
      },
      {
        title: "Union monitoring",
        body: "Serial X-rays track healing; non-union and malunion are addressed with bone grafting or corrective surgery when needed.",
      },
    ],
    rehabParagraphs: [
      "Fracture care is about more than bone healing — the goal is a limb that works. Fixation is chosen to allow the nearby joints to move as early as it is safe to do so.",
      "Nutrition, vitamin D, smoking cessation and diabetes control all influence how quickly a fracture unites.",
      "For injuries treated elsewhere that have not healed or have healed crookedly, a second opinion with fresh imaging clarifies whether corrective surgery will help.",
    ],
    milestones: [
      "Week 0–2: swelling and pain control, wound care",
      "Week 2–6: protected movement of adjacent joints",
      "Week 6–12: progressive weight-bearing as union appears",
      "Month 3–6: strengthening and return to work or sport",
    ],
    faqs: [
      { q: "Do plates and screws need to be removed?", a: "Usually not. Removal is considered only if the implant causes irritation or in young patients after full union." },
      { q: "How long does a fracture take to heal?", a: "Most unite in six to twelve weeks, though larger bones and poorer bone quality take longer." },
      { q: "What is a stress fracture?", a: "A hairline break from repetitive overload, common in runners and recruits; it usually heals with rest and load correction." },
      { q: "Can I get a second opinion on an old fracture?", a: "Yes. Bring all previous X-rays, reports and operation notes to the consultation." },
    ],
  },
  "sports-medicine-rehab": {
    steps: [
      consult,
      { title: "Movement and load assessment", body: "Strength, flexibility, landing mechanics and training load are analysed to find why the injury occurred." },
      { title: "Treatment plan", body: "Injections, biologics, bracing or surgery are combined with a written, progressive rehabilitation programme." },
      { title: "Return-to-play testing", body: "Objective strength and hop or throw testing before clearance, so you return only when the limb is ready." },
    ],
    rehabParagraphs: [
      "Athletes need more than pain relief — they need to return to their sport at the level they left it, without a repeat injury.",
      "Every programme is criteria-based: you progress when you pass the milestone, not when the calendar says so. Sessions are structured around your training week.",
      "Injury prevention work — hamstring and calf strength, hip control, landing technique and sensible load progression — continues after clearance.",
    ],
    milestones: [
      "Phase 1: pain and swelling control, restore range",
      "Phase 2: strength symmetry within 10% of the other side",
      "Phase 3: running, agility and change of direction",
      "Phase 4: sport-specific drills and full training",
      "Phase 5: cleared for competition",
    ],
    faqs: [
      { q: "Do you treat non-professional athletes?", a: "Yes — recreational runners, gym-goers and weekend players make up most of the clinic's sports practice." },
      { q: "Is PRP useful for tendon problems?", a: "It can help selected tendon and early cartilage conditions when combined with a proper loading programme." },
      { q: "How often will I need physiotherapy?", a: "Typically two to three supervised sessions a week early on, with daily home exercises." },
      { q: "Can I keep training while injured?", a: "Almost always — training is modified rather than stopped, to maintain fitness safely." },
    ],
  },
  "ortho-biologics": {
    steps: [
      consult,
      imaging,
      { title: "Suitability assessment", body: "Biologics work best in early to moderate joint wear and selected tendon conditions; advanced arthritis is better served by other options." },
      { title: "The injection", body: "PRP is prepared from your own blood in the clinic and injected into the joint or tendon; Hylast (hyaluronic acid) is given as a lubricating injection." },
      { title: "Loading programme", body: "A guided exercise plan after injection is what turns a biological stimulus into lasting improvement." },
    ],
    rehabParagraphs: [
      "Ortho-biologics are non-surgical treatments that use your body's own healing signals, or a joint lubricant, to reduce pain and improve function.",
      "Mild soreness for two to three days after injection is normal. Benefit usually builds over three to six weeks rather than immediately.",
      "Results vary between individuals. Biologics are offered honestly, as one option among several, with realistic expectations set beforehand.",
    ],
    milestones: [
      "Day 0–3: relative rest, ice, avoid anti-inflammatory tablets after PRP",
      "Week 1–2: gentle range and isometric strengthening",
      "Week 3–6: progressive loading, benefit becomes apparent",
      "Month 3: review and decision on further injections",
    ],
    faqs: [
      { q: "Is PRP painful?", a: "It involves a blood draw and an injection; discomfort is brief and local anaesthetic is used where appropriate." },
      { q: "How many injections will I need?", a: "Often one to three, spaced a few weeks apart, depending on response." },
      { q: "Will it cure my arthritis?", a: "No treatment reverses arthritis. Biologics can reduce pain and delay the need for surgery in suitable patients." },
      { q: "Can I return to work the same day?", a: "Yes, for desk work. Heavy physical work should wait two to three days." },
    ],
  },
};
