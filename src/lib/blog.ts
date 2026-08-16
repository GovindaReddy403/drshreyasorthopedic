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
    slug: "bone-health-after-40",
    title: "Bone Health After 40: Keeping Your Skeleton Strong",
    excerpt:
      "Calcium, vitamin D, resistance training and early screening — the simple habits that prevent fragility fractures later in life.",
    date: "2026-07-20",
    readingTime: "5 min read",
    category: "Bone Health",
    image: gXray,
    body: [
      "Bone is living tissue that is constantly remodelled. After the age of 40, breakdown gradually outpaces formation, and in women this accelerates sharply after menopause. The result is osteopenia and, if unchecked, osteoporosis — bone that fractures from a fall no higher than standing height.",
      "Most people have no symptoms until the first fracture. Wrist, hip and spine fractures are the classic presentations, and a spine fracture may show up only as gradual height loss or a stooped posture.",
      "Aim for 1,000–1,200 mg of calcium daily from milk, curd, paneer, ragi, sesame and leafy greens, and correct vitamin D with sunlight and supplementation where a blood test shows deficiency. Protein intake matters as much as calcium.",
      "Weight-bearing and resistance exercise is the strongest non-drug stimulus for bone. Brisk walking, stair climbing and two sessions of strength training a week measurably slow bone loss and improve balance, which prevents falls in the first place.",
      "A DEXA scan is worth doing for women after menopause, men over 65, anyone on long-term steroids, and anyone who has already had a low-trauma fracture. Where bone density is low, medication can substantially reduce future fracture risk.",
    ],
  },
  {
    slug: "knee-replacement-and-diabetes",
    title: "Knee Replacement and Diabetes: What Patients Need to Know",
    excerpt:
      "Good sugar control before surgery lowers infection risk and speeds healing — here is how diabetic patients should prepare.",
    date: "2026-07-06",
    readingTime: "5 min read",
    category: "Joint Replacement",
    image: gKnee,
    body: [
      "Diabetes does not rule out knee replacement. It simply means the preparation has to be more thorough, because uncontrolled blood sugar raises the risk of wound infection, delayed healing and stiffness after surgery.",
      "Before surgery we aim for an HbA1c below 7.5%, ideally under 7%. If it is higher, elective surgery is postponed while your physician adjusts treatment — a delay of a few weeks is far better than a deep implant infection.",
      "A pre-operative check includes kidney function, a cardiac assessment, a foot and skin examination for diabetic ulcers, and a dental review, since infections anywhere can seed a new joint.",
      "On the day of surgery, sugars are monitored closely and insulin is adjusted. Antibiotic cover, meticulous sterile technique and early mobilisation all reduce complication rates.",
      "Diabetic patients often need a slightly longer, more patient rehabilitation programme, particularly if neuropathy affects balance. With good control, long-term outcomes and implant survival are comparable to non-diabetic patients.",
    ],
  },
  {
    slug: "preventing-common-sports-injuries",
    title: "Preventing the Most Common Sports Injuries",
    excerpt:
      "Warm-ups, load management, strength work and the right footwear prevent most of the knee, shoulder and ankle injuries we treat.",
    date: "2026-06-24",
    readingTime: "5 min read",
    category: "Sports Medicine",
    image: gPhysio,
    body: [
      "The injuries we see most often — ACL tears, ankle sprains, hamstring strains, rotator cuff pain and runner's knee — share the same underlying causes: sudden increases in training load, weak hip and core muscles, poor landing technique and inadequate recovery.",
      "Warm up properly. Five to ten minutes of light cardio followed by dynamic movements prepares muscles and tendons far better than static stretching alone, which is best kept for after the session.",
      "Increase training volume gradually. A rough rule is no more than a 10% weekly increase in distance or intensity; most overuse injuries follow a sudden jump after a break.",
      "Strengthen the hips, glutes and core. Neuromuscular programmes that teach controlled landing and cutting have been shown to cut ACL injury rates significantly in field-sport athletes.",
      "Use footwear appropriate to the surface, replace worn shoes, tape or brace a previously sprained ankle, and respect pain — training through sharp joint pain is what converts a minor problem into a season-ending one.",
      "If swelling, instability or pain persists beyond a few days, get it assessed. Early diagnosis of a meniscus or ligament injury protects the joint from long-term cartilage damage.",
    ],
  },
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

export const HOME_BLOG_SLUGS = [
  "bone-health-after-40",
  "knee-replacement-and-diabetes",
  "preventing-common-sports-injuries",
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
