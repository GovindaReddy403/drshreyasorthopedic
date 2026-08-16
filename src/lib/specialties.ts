import gKnee from "@/assets/treat-knee.jpg";
import gShoulder from "@/assets/treat-shoulder.jpg";
import gAnkle from "@/assets/treat-ankle.jpg";
import gArthro from "@/assets/treat-arthroscopy.jpg";
import gPhysio from "@/assets/treat-physio.jpg";
import gXray from "@/assets/treat-xray.jpg";

export type Specialty = {
  slug: string;
  title: string;
  short: string;
  image: string;
  intro: string;
  conditions: string[];
  procedures: { name: string; body: string }[];
  recovery: string[];
};

export const SPECIALTIES: Specialty[] = [
  {
    slug: "knee-arthroscopy",
    title: "Knee Arthroscopy & Ligament Surgery",
    short:
      "ACL & PCL reconstruction, meniscus repair and cartilage procedures through key-hole surgery.",
    image: gKnee,
    intro:
      "Knee injuries are the most common reason patients visit the clinic — from sports-related ligament tears to age-related cartilage wear. Arthroscopic (key-hole) surgery allows the joint to be examined and repaired through small incisions, which means less pain, less blood loss and a far quicker return to daily activity.",
    conditions: [
      "ACL and PCL tears",
      "Meniscus (cartilage) tears",
      "Recurrent knee locking or giving way",
      "Cartilage defects and early arthritis",
      "Patellar (knee cap) instability",
      "Sports overuse injuries",
    ],
    procedures: [
      {
        name: "ACL reconstruction",
        body: "The torn ligament is replaced with a graft placed arthroscopically, restoring rotational stability for sport and daily life.",
      },
      {
        name: "Meniscus repair / trimming",
        body: "Repair is preferred wherever the tear pattern allows, preserving the cushion that protects the knee from arthritis.",
      },
      {
        name: "Cartilage procedures",
        body: "Microfracture and chondroplasty to treat localised cartilage damage in younger, active patients.",
      },
    ],
    recovery: [
      "Most arthroscopies are day-care procedures",
      "Walking with support usually begins the same or next day",
      "Structured physiotherapy from week one",
      "Return to sport typically 6–9 months after ACL reconstruction",
    ],
  },
  {
    slug: "shoulder-arthroscopy",
    title: "Shoulder Arthroscopy & Sports Injury",
    short:
      "Rotator cuff repair, recurrent dislocation surgery, frozen shoulder and impingement care.",
    image: gShoulder,
    intro:
      "Shoulder pain limits sleep, work and sport long before it limits movement. A detailed clinical examination combined with imaging identifies whether the problem is the rotator cuff, the labrum, the joint capsule or the bone — and treatment is planned accordingly, with surgery reserved for cases that need it.",
    conditions: [
      "Rotator cuff tears and tendinitis",
      "Recurrent shoulder dislocation",
      "SLAP and Bankart lesions",
      "Frozen shoulder (adhesive capsulitis)",
      "Shoulder impingement",
      "AC joint injuries",
    ],
    procedures: [
      {
        name: "Arthroscopic rotator cuff repair",
        body: "The torn tendon is re-attached to bone with anchors through key-hole portals, protecting the surrounding muscle.",
      },
      {
        name: "Bankart repair / Latarjet",
        body: "Stabilisation surgery for recurrent dislocation, chosen based on the amount of bone loss.",
      },
      {
        name: "Capsular release",
        body: "For stiff, resistant frozen shoulder that has not responded to physiotherapy and injections.",
      },
    ],
    recovery: [
      "Sling protection for 3–6 weeks after cuff repair",
      "Guided passive movement starts early to prevent stiffness",
      "Strengthening from around week six",
      "Overhead sport usually resumes at 4–6 months",
    ],
  },
  {
    slug: "foot-and-ankle",
    title: "Foot & Ankle Care",
    short:
      "Ankle ligament injuries, ankle arthroscopy, sprains, tendon problems and deformity correction.",
    image: gAnkle,
    intro:
      "The ankle carries several times your body weight with every step, so even a 'simple' sprain can leave lasting instability if it is not treated properly. Care ranges from bracing and rehabilitation to arthroscopic and reconstructive surgery.",
    conditions: [
      "Recurrent ankle sprains and instability",
      "Achilles tendon injuries",
      "Ankle fractures",
      "Plantar fasciitis and heel pain",
      "Flat foot and deformities",
      "Diabetic foot problems",
    ],
    procedures: [
      {
        name: "Ankle arthroscopy",
        body: "Key-hole treatment of impingement, loose bodies and cartilage lesions inside the ankle joint.",
      },
      {
        name: "Ligament reconstruction",
        body: "Restores stability for patients whose ankle repeatedly gives way despite rehabilitation.",
      },
      {
        name: "Fracture fixation",
        body: "Anatomical reduction and fixation to restore the joint surface and prevent early arthritis.",
      },
    ],
    recovery: [
      "Protected weight bearing in a boot where required",
      "Balance and proprioception training is essential",
      "Most patients walk unaided within 4–8 weeks",
      "Sport-specific drills before full return",
    ],
  },
  {
    slug: "joint-replacement",
    title: "Joint Replacement Surgery",
    short:
      "Total and partial knee replacement and hip replacement with modern implants and rapid recovery.",
    image: gArthro,
    intro:
      "When arthritis has worn away the joint surface and medication, injections and physiotherapy no longer help, joint replacement reliably relieves pain and restores movement. Implant choice, alignment and rehabilitation are planned individually for each patient.",
    conditions: [
      "Advanced osteoarthritis of the knee or hip",
      "Rheumatoid and inflammatory arthritis",
      "Avascular necrosis of the hip",
      "Post-traumatic arthritis",
      "Severe bow-leg or knock-knee deformity",
      "Failed previous joint surgery",
    ],
    procedures: [
      {
        name: "Total knee replacement",
        body: "Resurfacing of the worn knee joint with a modern implant, correcting deformity and restoring alignment.",
      },
      {
        name: "Partial (uni) knee replacement",
        body: "Only the damaged compartment is replaced, preserving healthy bone and ligaments in suitable patients.",
      },
      {
        name: "Total hip replacement",
        body: "Restores painless hip motion with a durable bearing chosen for the patient's age and activity level.",
      },
    ],
    recovery: [
      "Standing and walking usually on the day of surgery",
      "Hospital stay of 2–4 days in most cases",
      "Stairs and independent walking within 2–3 weeks",
      "Lifelong follow-up at planned intervals",
    ],
  },
  {
    slug: "trauma-and-fractures",
    title: "Trauma & Fracture Care",
    short:
      "Complex fracture fixation, poly-trauma management, non-union treatment and second opinions.",
    image: gXray,
    intro:
      "Fractures heal best when they are reduced accurately and stabilised appropriately. Training as Senior Resident at the Sanjay Gandhi Institute of Trauma & Orthopaedics brings high-volume trauma experience to every case — from simple wrist fractures to complex multi-limb injuries.",
    conditions: [
      "Simple and complex fractures",
      "Poly-trauma injuries",
      "Non-union and malunion",
      "Sports fractures and stress fractures",
      "Spine injury assessment",
      "Post-operative complications and revisions",
    ],
    procedures: [
      {
        name: "Plate and nail fixation",
        body: "Stable internal fixation that allows early movement and prevents joint stiffness.",
      },
      {
        name: "Minimally invasive fixation",
        body: "Soft-tissue-friendly techniques that reduce infection risk and speed up recovery.",
      },
      {
        name: "Non-union surgery",
        body: "Bone grafting and re-fixation for fractures that have failed to heal.",
      },
    ],
    recovery: [
      "Rehabilitation planned from day one",
      "Regular X-ray review to confirm healing",
      "Graded weight bearing based on fracture pattern",
      "Return-to-work planning with the patient",
    ],
  },
  {
    slug: "sports-medicine-rehab",
    title: "Sports Medicine & Rehabilitation",
    short:
      "Return-to-sport planning, injury prevention, PRP injections and structured post-operative rehab.",
    image: gPhysio,
    intro:
      "Surgery is only half of the recovery. A clear, measurable rehabilitation plan — with defined milestones for strength, balance and sport-specific movement — is what gets athletes and active patients safely back to what they love.",
    conditions: [
      "Muscle and tendon strains",
      "Overuse and repetitive stress injuries",
      "Tennis and golfer's elbow",
      "Post-operative deconditioning",
      "Early osteoarthritis in active adults",
      "Return-to-play clearance",
    ],
    procedures: [
      {
        name: "PRP and biologic injections",
        body: "Targeted injections for tendon and early cartilage problems where appropriate.",
      },
      {
        name: "Guided physiotherapy programme",
        body: "Phase-based rehabilitation supervised alongside your physiotherapist.",
      },
      {
        name: "Injury prevention screening",
        body: "Movement assessment to identify and correct the patterns that cause repeated injury.",
      },
    ],
    recovery: [
      "Milestone-based rather than time-based progression",
      "Strength testing before return to sport",
      "Load management guidance for training",
      "Ongoing review during the competitive season",
    ],
  },
];

export function getSpecialty(slug: string) {
  return SPECIALTIES.find((s) => s.slug === slug);
}
