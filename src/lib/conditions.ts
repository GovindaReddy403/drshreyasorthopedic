import kneeImg from "@/assets/treat-knee.jpg";
import shoulderImg from "@/assets/treat-shoulder.jpg";
import ankleImg from "@/assets/treat-ankle.jpg";
import arthroImg from "@/assets/treat-arthroscopy.jpg";
import physioImg from "@/assets/treat-physio.jpg";

export type Condition = {
  slug: string;
  title: string;
  short: string;
  intro: string;
  image: string;
  symptoms: string[];
  redFlags: string[];
  causes: { name: string; body: string }[];
  ladder: { stage: string; title: string; body: string }[];
  faqs: { q: string; a: string }[];
  relatedSpecialty: string;
};

export const CONDITIONS: Condition[] = [
  {
    slug: "knee-pain-and-lower-leg",
    title: "Knee Pain & Lower Leg",
    short:
      "Arthritis, ACL and meniscus tears, kneecap pain and shin problems — assessed and treated in a stepwise way.",
    intro:
      "The knee carries several times your body weight with every step, so pain here quickly limits walking, stairs and sport. Knee pain in Mysuru patients most often comes from osteoarthritis, a meniscus tear, an ACL injury or patellofemoral (kneecap) overload. Each has a very different treatment path, so an accurate diagnosis matters more than a generic painkiller prescription.",
    image: kneeImg,
    symptoms: [
      "Pain on stairs, squatting or getting up from a chair",
      "Swelling that returns after activity",
      "Locking, catching or a feeling the knee will give way",
      "Grinding or clicking with movement",
      "Morning stiffness that eases after a few minutes",
      "Difficulty fully straightening or bending the knee",
    ],
    redFlags: [
      "The knee gave way with a pop during sport",
      "You cannot bear weight or fully straighten the leg",
      "Rapid swelling within a few hours of an injury",
      "Fever with a hot, swollen joint",
      "Pain that wakes you at night or persists beyond six weeks",
    ],
    causes: [
      {
        name: "Osteoarthritis",
        body: "Gradual cartilage wear, usually after 45, causing stiffness, deformity and pain that worsens through the day.",
      },
      {
        name: "Meniscus tear",
        body: "A twisting injury or degenerative wear of the shock-absorbing cartilage, producing locking and joint-line pain.",
      },
      {
        name: "ACL / PCL injury",
        body: "A ligament rupture during pivoting sport leading to instability and repeated episodes of giving way.",
      },
      {
        name: "Patellofemoral pain",
        body: "Kneecap overload from muscle imbalance, flat feet or sudden increases in running load.",
      },
      {
        name: "Shin and calf overload",
        body: "Shin splints, stress reactions and calf strains from training errors or poor footwear.",
      },
    ],
    ladder: [
      {
        stage: "Step 1",
        title: "Self-care and activity modification",
        body: "Relative rest, ice, weight optimisation, supportive footwear and avoiding deep squatting settle most early knee pain within two to three weeks.",
      },
      {
        stage: "Step 2",
        title: "Physiotherapy and medication",
        body: "A guided quadriceps and hip strengthening programme, bracing where needed, and a short course of anti-inflammatory medication.",
      },
      {
        stage: "Step 3",
        title: "Injections and ortho biologics",
        body: "Hyaluronic acid (Hylast) or PRP injections for early-to-moderate arthritis, and image-guided injections for stubborn inflammation.",
      },
      {
        stage: "Step 4",
        title: "Key-hole (arthroscopic) surgery",
        body: "Meniscus repair, cartilage procedures or ACL reconstruction through two or three small portals, usually as day-care surgery.",
      },
      {
        stage: "Step 5",
        title: "Partial or total knee replacement",
        body: "For advanced arthritis that no longer responds to conservative care — with rapid-recovery protocols and walking on the same or next day.",
      },
    ],
    faqs: [
      {
        q: "Do all meniscus tears need surgery?",
        a: "No. Small degenerative tears often settle with physiotherapy and load management. Surgery is advised when the knee locks, when a repairable tear is confirmed on MRI, or when symptoms persist despite six to eight weeks of structured rehabilitation.",
      },
      {
        q: "Can I avoid knee replacement if I already have arthritis?",
        a: "In early and moderate arthritis, weight reduction, strengthening and injections can postpone surgery for years. Replacement is considered only when pain limits walking, sleep or daily life despite these measures.",
      },
      {
        q: "How soon can I return to sport after ACL reconstruction?",
        a: "Return to pivoting sport is criteria-based and typically takes nine to twelve months, after strength and control testing rather than a fixed calendar date.",
      },
    ],
    relatedSpecialty: "knee-arthroscopy",
  },
  {
    slug: "shoulder-pain",
    title: "Shoulder Pain",
    short:
      "Rotator cuff tears, frozen shoulder, recurrent dislocation and impingement — diagnosed accurately, treated in stages.",
    intro:
      "The shoulder trades stability for movement, which is why it is the most commonly dislocated joint in the body and why cuff problems are so frequent after 40. Pain reaching overhead, difficulty sleeping on one side, or a shoulder that slips out during sport all point to distinct diagnoses that respond to very different treatments.",
    image: shoulderImg,
    symptoms: [
      "Pain lifting the arm overhead or reaching behind the back",
      "Night pain, especially lying on the affected side",
      "Weakness lifting or carrying objects",
      "A shoulder that feels loose or slips out",
      "Progressive stiffness in all directions",
      "Clicking or catching with rotation",
    ],
    redFlags: [
      "Sudden weakness after a fall — a possible acute cuff tear",
      "The shoulder has dislocated more than once",
      "Total loss of rotation with severe night pain",
      "Numbness or tingling down the arm",
      "Pain persisting beyond six weeks of physiotherapy",
    ],
    causes: [
      {
        name: "Rotator cuff tendinopathy or tear",
        body: "Wear or a traumatic tear of the tendons that lift and rotate the arm — the commonest cause of shoulder pain after 40.",
      },
      {
        name: "Frozen shoulder (adhesive capsulitis)",
        body: "Inflammation and contracture of the joint capsule, more common in diabetics, causing painful global stiffness.",
      },
      {
        name: "Recurrent instability",
        body: "Bankart or SLAP lesions after a first dislocation, leaving the shoulder prone to slipping out again.",
      },
      {
        name: "Subacromial impingement",
        body: "Pinching of the cuff beneath the acromion during overhead activity, aggravated by poor scapular control.",
      },
      {
        name: "Shoulder arthritis",
        body: "Cartilage wear producing deep aching pain, grinding and loss of rotation.",
      },
    ],
    ladder: [
      {
        stage: "Step 1",
        title: "Self-care",
        body: "Avoid painful overhead loading, apply heat before stretching, and correct desk and sleeping posture.",
      },
      {
        stage: "Step 2",
        title: "Physiotherapy",
        body: "Cuff and scapular strengthening with a graded stretching programme — the mainstay for impingement and frozen shoulder.",
      },
      {
        stage: "Step 3",
        title: "Injections and PRP",
        body: "A guided subacromial or intra-articular injection to break the pain cycle, or PRP in selected tendinopathy.",
      },
      {
        stage: "Step 4",
        title: "Arthroscopic surgery",
        body: "Key-hole rotator cuff repair, Bankart / SLAP repair for instability, or capsular release for a resistant frozen shoulder.",
      },
      {
        stage: "Step 5",
        title: "Shoulder replacement",
        body: "Reserved for advanced arthritis or irreparable cuff tears with significant functional loss.",
      },
    ],
    faqs: [
      {
        q: "Will a frozen shoulder resolve on its own?",
        a: "Many do, but recovery can take 18 to 30 months. Physiotherapy, a well-placed injection and good diabetes control shorten this considerably; arthroscopic release is offered when stiffness persists despite months of therapy.",
      },
      {
        q: "Is cuff repair done by key-hole surgery?",
        a: "Yes. Rotator cuff repair is performed arthroscopically through small portals, usually as day-care surgery, with a sling for four to six weeks and staged rehabilitation.",
      },
      {
        q: "After one dislocation, will my shoulder dislocate again?",
        a: "In patients under 25 who play contact sport the risk is high. Arthroscopic stabilisation after a first dislocation is often recommended in that group; older patients frequently do well with rehabilitation alone.",
      },
    ],
    relatedSpecialty: "shoulder-arthroscopy",
  },
  {
    slug: "neck-and-back-pain",
    title: "Neck & Back Pain",
    short:
      "Disc problems, posture-related pain and spine injury — conservative care first, surgical referral only when clearly indicated.",
    intro:
      "Most neck and back pain is mechanical and settles with the right movement, not with bed rest. Long desk hours, two-wheeler commuting and poor core strength are the common drivers in Mysuru. A small proportion, however, involves nerve compression or injury that needs prompt assessment — the aim of the consultation is to tell those apart quickly.",
    image: physioImg,
    symptoms: [
      "Aching pain after prolonged sitting or driving",
      "Stiffness in the morning that eases with movement",
      "Pain radiating into the arm or leg",
      "Pins and needles, numbness or a heavy limb",
      "Pain aggravated by coughing or sneezing",
      "Muscle spasm across the neck or lower back",
    ],
    redFlags: [
      "Weakness in the arm, hand, foot or leg",
      "Loss of bladder or bowel control — seek care immediately",
      "Numbness around the inner thighs or saddle area",
      "Pain following a fall or road traffic accident",
      "Unexplained weight loss or fever with back pain",
    ],
    causes: [
      {
        name: "Disc prolapse",
        body: "A bulging or herniated disc pressing on a nerve root, producing sciatica or arm pain.",
      },
      {
        name: "Postural and mechanical strain",
        body: "Sustained flexed posture, weak core muscles and poor workstation setup.",
      },
      {
        name: "Spondylosis",
        body: "Age-related degenerative change of discs and facet joints causing stiffness and episodic pain.",
      },
      {
        name: "Spine injury",
        body: "Vertebral fractures after a fall or accident, requiring urgent imaging and stabilisation.",
      },
      {
        name: "Osteoporotic collapse",
        body: "Low-trauma vertebral fractures in older adults with reduced bone density.",
      },
    ],
    ladder: [
      {
        stage: "Step 1",
        title: "Self-care and posture correction",
        body: "Stay active, adjust desk and screen height, avoid prolonged sitting, and use heat for spasm.",
      },
      {
        stage: "Step 2",
        title: "Physiotherapy and core rehabilitation",
        body: "Graded mobility work, core and postural strengthening, plus ergonomic advice for work and commuting.",
      },
      {
        stage: "Step 3",
        title: "Medication and injections",
        body: "Short-term anti-inflammatories or muscle relaxants; selected patients benefit from an image-guided nerve root injection.",
      },
      {
        stage: "Step 4",
        title: "Imaging and specialist referral",
        body: "MRI when symptoms persist or nerve signs appear, followed by a combined decision on surgical options.",
      },
      {
        stage: "Step 5",
        title: "Surgical care for spine injury",
        body: "Fracture stabilisation or decompression where there is instability, progressive weakness or an unstable injury.",
      },
    ],
    faqs: [
      {
        q: "Does a disc prolapse always need surgery?",
        a: "No. Around eight in ten disc prolapses improve within six to twelve weeks with physiotherapy and medication. Surgery is considered for progressive weakness, unmanageable pain or bladder involvement.",
      },
      {
        q: "Should I rest completely when my back hurts?",
        a: "Prolonged bed rest slows recovery. Gentle continued activity within comfort, along with a structured exercise programme, gives faster and more durable relief.",
      },
      {
        q: "When do I need an MRI?",
        a: "An MRI is useful when there are nerve symptoms, after significant trauma, or when pain has not improved after six weeks of appropriate treatment. It is rarely needed for a fresh, uncomplicated episode.",
      },
    ],
    relatedSpecialty: "trauma-and-fractures",
  },
  {
    slug: "foot-and-ankle-pain",
    title: "Foot & Ankle Pain",
    short:
      "Sprains, Achilles problems, plantar fasciitis and instability — treated with a graded rehabilitation-first approach.",
    intro:
      "Ankle sprains are the most common sporting injury and the most commonly under-treated one. Heel pain from plantar fasciitis and Achilles overload are equally frequent in people who stand or walk long hours. Correct early management prevents the chronic instability and stiffness that bring patients back years later.",
    image: ankleImg,
    symptoms: [
      "Pain and swelling around the outer ankle after twisting",
      "First-step heel pain in the morning",
      "Pain and thickening at the back of the heel",
      "Repeated giving way on uneven ground",
      "Difficulty pushing off or standing on tiptoe",
      "Deformity, bunion pain or altered footwear wear pattern",
    ],
    redFlags: [
      "Unable to take four steps after an injury",
      "Bony tenderness over the malleoli — a possible fracture",
      "A sudden painful snap in the calf with weakness (possible Achilles rupture)",
      "Numbness, coldness or discolouration of the foot",
      "Persistent swelling beyond six weeks",
    ],
    causes: [
      {
        name: "Lateral ligament sprain",
        body: "Inversion injury damaging the ATFL and CFL, leading to instability if rehabilitation is incomplete.",
      },
      {
        name: "Plantar fasciitis",
        body: "Overload of the plantar fascia at the heel, causing classic first-step pain in the morning.",
      },
      {
        name: "Achilles tendinopathy or rupture",
        body: "Degeneration or a sudden tear of the tendon during a push-off movement.",
      },
      {
        name: "Ankle impingement and cartilage lesions",
        body: "Bone spurs or osteochondral defects producing catching, deep pain and reduced dorsiflexion.",
      },
      {
        name: "Deformity",
        body: "Flat foot, bunion or acquired deformity altering load distribution across the foot.",
      },
    ],
    ladder: [
      {
        stage: "Step 1",
        title: "Self-care",
        body: "Relative rest, ice, compression, elevation and supportive footwear or heel cushioning.",
      },
      {
        stage: "Step 2",
        title: "Physiotherapy and orthotics",
        body: "Balance and proprioception retraining, calf eccentric loading, plus custom insoles where mechanics need correction.",
      },
      {
        stage: "Step 3",
        title: "Injections and PRP",
        body: "Selected injections or PRP for stubborn plantar fascia and tendon problems that resist loading programmes.",
      },
      {
        stage: "Step 4",
        title: "Ankle arthroscopy",
        body: "Key-hole clearance of impingement, cartilage procedures and ligament repair for chronic instability.",
      },
      {
        stage: "Step 5",
        title: "Reconstructive surgery",
        body: "Ligament reconstruction, Achilles repair or deformity correction when structural change is established.",
      },
    ],
    faqs: [
      {
        q: "How long does an ankle sprain take to heal?",
        a: "A mild sprain settles in two to three weeks, a moderate one in six to eight. Balance retraining is essential — without it, roughly one in three patients develops recurrent instability.",
      },
      {
        q: "What actually helps plantar fasciitis?",
        a: "Calf and fascia stretching, cushioned supportive footwear, load reduction and night splints help most patients within three months. Injections and PRP are reserved for resistant cases.",
      },
      {
        q: "Can a torn Achilles heal without surgery?",
        a: "Some ruptures are managed in a functional boot with a strict protocol. Surgery is often preferred for active patients or delayed presentations; the decision depends on the gap, age and activity level.",
      },
    ],
    relatedSpecialty: "foot-and-ankle",
  },
  {
    slug: "elbow-and-wrist-pain",
    title: "Elbow & Wrist Pain",
    short:
      "Tennis and golfer's elbow, ligament injuries, wrist sprains and nerve compression — from load management to key-hole repair.",
    intro:
      "Elbow and wrist pain usually reflects overload rather than a single injury — repetitive gripping, computer work, racquet sport or manual labour. Tennis elbow, golfer's elbow, wrist ligament strains and carpal tunnel syndrome respond well to a structured programme, provided the underlying load is addressed rather than just the pain.",
    image: arthroImg,
    symptoms: [
      "Pain on the outer elbow when gripping or lifting",
      "Pain on the inner elbow with wrist flexion",
      "Weak grip or dropping objects",
      "Wrist pain on twisting a key or opening a jar",
      "Night tingling in the thumb, index and middle fingers",
      "Clicking, swelling or restricted rotation of the forearm",
    ],
    redFlags: [
      "Elbow or wrist deformity after a fall",
      "Persistent numbness or wasting of the hand muscles",
      "Locking of the elbow or an inability to straighten it",
      "Sudden loss of grip strength",
      "Pain unchanged after eight weeks of therapy",
    ],
    causes: [
      {
        name: "Lateral epicondylitis (tennis elbow)",
        body: "Degenerative overload of the common extensor origin from repetitive gripping.",
      },
      {
        name: "Medial epicondylitis (golfer's elbow)",
        body: "The same process on the inner side, aggravated by repeated wrist flexion and pronation.",
      },
      {
        name: "Ligament injuries",
        body: "Ulnar collateral or wrist ligament strains after a fall on an outstretched hand or throwing loads.",
      },
      {
        name: "TFCC and scaphoid injuries",
        body: "Wrist-side pain and clicking after trauma; a missed scaphoid fracture can lead to non-union.",
      },
      {
        name: "Nerve compression",
        body: "Carpal tunnel or cubital tunnel syndrome causing tingling, night pain and grip weakness.",
      },
    ],
    ladder: [
      {
        stage: "Step 1",
        title: "Load management and self-care",
        body: "Modify gripping tasks, review racquet or tool ergonomics, use a counterforce brace or wrist splint.",
      },
      {
        stage: "Step 2",
        title: "Physiotherapy",
        body: "Eccentric loading of the forearm muscles, nerve gliding exercises and progressive grip strengthening.",
      },
      {
        stage: "Step 3",
        title: "Injections and PRP",
        body: "PRP for resistant tendinopathy and a guided steroid injection for confirmed nerve compression or bursitis.",
      },
      {
        stage: "Step 4",
        title: "Key-hole and small-incision surgery",
        body: "Arthroscopic debridement, tendon release, ligament repair or nerve decompression when symptoms persist.",
      },
      {
        stage: "Step 5",
        title: "Reconstruction and fracture fixation",
        body: "Ligament reconstruction, scaphoid fixation or non-union surgery for structural injuries.",
      },
    ],
    faqs: [
      {
        q: "Why has my tennis elbow lasted for months?",
        a: "Tennis elbow is a degenerative tendon problem, not simple inflammation, so rest alone rarely cures it. A progressive eccentric loading programme over eight to twelve weeks is what changes the tendon.",
      },
      {
        q: "Do steroid injections cure tennis elbow?",
        a: "They give short-term relief but can worsen outcomes at one year if repeated. PRP and structured loading give more durable results in resistant cases.",
      },
      {
        q: "Is wrist pain after a fall always a sprain?",
        a: "Not always. Scaphoid fractures often look like a sprain on the first X-ray. If tenderness persists at the base of the thumb, repeat imaging is essential to avoid a missed fracture.",
      },
    ],
    relatedSpecialty: "sports-medicine-rehab",
  },
];

export function getCondition(slug: string) {
  return CONDITIONS.find((c) => c.slug === slug);
}
