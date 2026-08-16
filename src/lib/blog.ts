import gKnee from "@/assets/treat-knee.jpg";
import gShoulder from "@/assets/treat-shoulder.jpg";
import gAnkle from "@/assets/treat-ankle.jpg";
import gArthro from "@/assets/treat-arthroscopy.jpg";
import gPhysio from "@/assets/treat-physio.jpg";
import gXray from "@/assets/treat-xray.jpg";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  category: string;
  image: string;
  body: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "acl-tear-recovery-timeline",
    title: "ACL Tear: What Recovery Really Looks Like, Week by Week",
    excerpt:
      "A realistic timeline after ACL reconstruction — from the first swelling-control days to a supervised return to sport at 9–12 months.",
    date: "2026-06-12",
    readingTime: "6 min read",
    category: "Knee & Sports Injury",
    image: gKnee,
    body: [
      "An ACL tear is one of the most common sports injuries seen in the clinic, especially among footballers, cricketers and recreational runners. The ligament rarely heals on its own once completely torn, which is why arthroscopic reconstruction is advised for active patients or anyone whose knee keeps giving way.",
      "Weeks 0–2 focus entirely on calming the knee down: swelling control, full passive extension, quadriceps activation and safe walking with support. Getting the knee fully straight in this phase matters more than bending it far.",
      "Weeks 2–6 restore range of motion and normal gait. Most patients walk without support by the third or fourth week and return to desk work early. Stationary cycling usually begins around week four.",
      "Months 2–5 build strength — closed-chain squats, step-ups, hamstring work and single-leg balance. Running on flat ground is introduced only when strength and control benchmarks are met, not simply because a date has passed.",
      "Months 6–12 cover agility, cutting, plyometrics and sport-specific drills. Return to competitive sport is cleared at 9–12 months after strength testing, because returning too early is the single biggest cause of re-tear.",
      "Every plan is individual. Age, graft choice, associated meniscus injury and how disciplined the rehab is all change the timeline.",
    ],
  },
  {
    slug: "shoulder-pain-when-to-see-a-surgeon",
    title: "Shoulder Pain: When It's Rotator Cuff and When to See a Surgeon",
    excerpt:
      "Night pain, weakness lifting overhead and a painful arc are the signs that separate simple stiffness from a rotator cuff tear.",
    date: "2026-05-28",
    readingTime: "5 min read",
    category: "Shoulder",
    image: gShoulder,
    body: [
      "Most shoulder pain settles with rest, activity modification and physiotherapy. The pattern that should not be ignored is pain that wakes you at night, difficulty lifting the arm overhead, and weakness when the arm is tested against resistance.",
      "Frozen shoulder causes stiffness in every direction — even when someone else moves your arm. A rotator cuff tear typically leaves passive movement possible but active lifting weak. That distinction guides the entire treatment plan.",
      "Ultrasound or MRI confirms the diagnosis. Small, partial tears frequently respond to a structured programme of scapular stabilisation and cuff strengthening over 8–12 weeks.",
      "Arthroscopic repair is considered for full-thickness tears, traumatic tears in younger patients, and pain that persists despite good conservative treatment. Key-hole repair means smaller incisions, less pain and an earlier start to rehabilitation.",
      "Recurrent dislocation is a separate problem — each additional dislocation damages more of the labrum and bone, so early surgical stabilisation is often the safer path for young athletes.",
    ],
  },
  {
    slug: "knee-replacement-myths",
    title: "Five Myths About Knee Replacement Surgery",
    excerpt:
      "Modern implants, day-of-surgery walking and 15–20 year longevity — separating fact from what patients hear in waiting rooms.",
    date: "2026-05-04",
    readingTime: "5 min read",
    category: "Joint Replacement",
    image: gXray,
    body: [
      "Myth 1: You must wait until the pain is unbearable. Waiting too long causes muscle wasting and deformity, which makes both surgery and recovery harder. The right time is when pain limits daily walking despite medication and physiotherapy.",
      "Myth 2: You will be bedridden for months. Most patients stand and walk with support on the same or next day, and manage stairs before discharge.",
      "Myth 3: An implant lasts only ten years. Contemporary implants and alignment techniques give 15–20 years or more of function in the majority of patients.",
      "Myth 4: You cannot kneel or sit cross-legged again. High-flexion designs and careful soft-tissue balancing allow far more Indian-lifestyle movement than older implants, though comfort varies between individuals.",
      "Myth 5: Both knees must be done together. That decision depends on age, cardiac fitness and home support — it is planned case by case, never routinely.",
    ],
  },
  {
    slug: "prp-ortho-biologics-explained",
    title: "PRP and Ortho Biologics: Who Actually Benefits?",
    excerpt:
      "Platelet-rich plasma and viscosupplementation help specific patients at specific stages — here is where the evidence stands.",
    date: "2026-04-19",
    readingTime: "4 min read",
    category: "Ortho Biologics",
    image: gPhysio,
    body: [
      "Platelet-rich plasma concentrates your own growth factors and is injected into the joint or tendon to support healing and reduce inflammation. It is not a cure for advanced arthritis.",
      "The best responders are patients with early to moderate knee osteoarthritis, chronic tennis elbow, plantar fasciitis and some partial tendon tears that have not settled with physiotherapy.",
      "Viscosupplementation (hyaluronic acid) improves lubrication and can give several months of relief in mild to moderate arthritis, often used alongside a strengthening programme.",
      "Biologics work best as part of a plan — weight management, strengthening, activity modification and footwear correction. Used alone, results are short-lived.",
      "If the joint space has already collapsed on X-ray, an honest conversation about joint replacement serves the patient far better than repeated injections.",
    ],
  },
  {
    slug: "ankle-sprain-not-just-a-sprain",
    title: "That Ankle Sprain May Not Be Just a Sprain",
    excerpt:
      "Persistent swelling, repeated twisting and pain on the outer ankle after six weeks warrant proper assessment.",
    date: "2026-03-30",
    readingTime: "4 min read",
    category: "Foot & Ankle",
    image: gAnkle,
    body: [
      "Ankle sprains are dismissed too easily. Around one in five leaves behind ligament laxity, cartilage damage or a missed small fracture that keeps causing trouble months later.",
      "Warning signs: swelling that does not settle in six weeks, a feeling of the ankle giving way on uneven ground, and tenderness over bone rather than soft tissue.",
      "Assessment includes stress testing of the lateral ligaments, weight-bearing X-rays and, when needed, MRI to look for osteochondral lesions of the talus.",
      "Most cases respond to a proprioception-led rehabilitation programme with bracing. Arthroscopic or ligament reconstruction surgery is reserved for genuine chronic instability.",
    ],
  },
  {
    slug: "arthroscopy-key-hole-surgery-guide",
    title: "Key-Hole Surgery: A Patient's Guide to Arthroscopy",
    excerpt:
      "What happens on the day, how long you stay, and why smaller incisions mean faster rehabilitation.",
    date: "2026-03-08",
    readingTime: "5 min read",
    category: "Arthroscopy",
    image: gArthro,
    body: [
      "Arthroscopy uses a pencil-thin camera inserted through incisions the size of a buttonhole, letting the surgeon see inside the joint magnified and treat the problem through a second small portal.",
      "It is used for meniscus tears, ligament reconstruction, rotator cuff repair, shoulder stabilisation, cartilage procedures and removal of loose bodies.",
      "Most procedures are day-care or single-overnight stays. Anaesthesia is usually regional, and patients are up and moving within hours.",
      "Because muscle and capsule are not cut open, pain is lower, infection risk is reduced and physiotherapy can start almost immediately — which is what ultimately determines the outcome.",
      "Bring your recent scans, list your medications, and follow the fasting instructions given at the pre-operative visit.",
    ],
  },
];

export function getPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function formatPostDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
