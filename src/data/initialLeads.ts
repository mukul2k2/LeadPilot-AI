import { Lead } from '@/types/lead';

// Helper to generate dates relative to today
const getRelativeDateStr = (offsetDays: number): string => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
};

export const INITIAL_LEADS: Lead[] = [
  // 1. OVERDUE & HOT
  {
    id: 'lead-01',
    name: 'Rajesh Sharma',
    company: 'Apex Agro Foods Pvt Ltd',
    phone: '+91 98201 44321',
    assignedRep: 'Arun Verma',
    source: 'Indiamart',
    equipmentInterest: 'Automatic Multihead Weigher Pouch Filler (1kg)',
    lastContactDate: getRelativeDateStr(-3),
    nextFollowUpDate: getRelativeDateStr(-1), // OVERDUE by 1 day
    aiTag: 'Hot',
    aiReason: 'Client requested revised commercial quotation with 50% advance terms by yesterday; high purchase readiness.',
    aiDraftMessage: 'Hi Rajesh ji, apologies for the slight delay! I have the revised quotation ready for the 1kg Multihead Pouch Filler with the updated 50% advance terms. Can I send the PDF over WhatsApp now?',
    aiLastEvaluatedAt: new Date().toISOString(),
    isFollowUpSent: false,
    chats: [
      { id: 'c1-1', sender: 'buyer', text: 'Hi Arun, we need a 10-head multihead weigher for our namkeen packaging line. Target speed 50 packs/min.', timestamp: '10:15 AM' },
      { id: 'c1-2', sender: 'rep', text: 'Namaste Rajesh ji! Our AF-10M model is running in 12 snacks factories across Gujarat. It easily does 55-60 bpm with 0.5g accuracy.', timestamp: '10:22 AM' },
      { id: 'c1-3', sender: 'buyer', text: 'Good. Send technical catalogue and pricing. Need delivery within 3 weeks.', timestamp: '11:05 AM' },
      { id: 'c1-4', sender: 'rep', text: 'Shared the catalogue. Base price is ₹14.5 Lakhs + GST with nitrogen flushing kit.', timestamp: '12:30 PM' },
      { id: 'c1-5', sender: 'buyer', text: 'Price is slightly above budget. If you can do ₹13.8L with 50% advance and immediate dispatch, we can issue the PO by Friday. Please confirm.', timestamp: '4:45 PM' }
    ]
  },

  // 2. DUE TODAY & HOT
  {
    id: 'lead-02',
    name: 'Priya Nair',
    company: 'BioHerbs Wellness Care',
    phone: '+91 94471 22890',
    assignedRep: 'Neha Patil',
    source: 'Website Inquiry',
    equipmentInterest: 'High-Speed Induction Cap Sealer for Bottles',
    lastContactDate: getRelativeDateStr(-1),
    nextFollowUpDate: getRelativeDateStr(0), // DUE TODAY
    aiTag: 'Hot',
    aiReason: 'Buyer needs video demonstration before their internal management review at 3 PM today.',
    aiDraftMessage: 'Hi Priya, hope your day is going well! I have recorded the video demo showing the induction cap sealer running 80mm HDPE bottles. Sharing the link now so you can present it in your 3 PM meeting.',
    aiLastEvaluatedAt: new Date().toISOString(),
    isFollowUpSent: false,
    chats: [
      { id: 'c2-1', sender: 'buyer', text: 'Hello, do you have continuous induction cap sealers for 80mm HDPE protein powder bottles?', timestamp: '2:10 PM' },
      { id: 'c2-2', sender: 'rep', text: 'Hi Priya! Yes, our UltraSeal-120 handles 20mm to 90mm closures seamlessly at up to 100 bottles/min.', timestamp: '2:18 PM' },
      { id: 'c2-3', sender: 'buyer', text: 'Can you show a video demo of 80mm bottles? Our management has an investment review today at 3 PM.', timestamp: '4:40 PM' },
      { id: 'c2-4', sender: 'rep', text: 'Certainly! I will share the video and test run report first thing tomorrow morning.', timestamp: '5:02 PM' }
    ]
  },

  // 3. OVERDUE & WARM
  {
    id: 'lead-03',
    name: 'Vikrant Deshmukh',
    company: 'Siddhi Vinayak Plastics',
    phone: '+91 98220 91823',
    assignedRep: 'Vikram Singh',
    source: 'PackEx Expo 2026',
    equipmentInterest: 'High-Speed Stretch Pallet Wrapper (2000kg)',
    lastContactDate: getRelativeDateStr(-4),
    nextFollowUpDate: getRelativeDateStr(-2), // OVERDUE by 2 days
    aiTag: 'Warm',
    aiReason: 'Met at PackEx; waiting on plant civil drawings before finalizing turntable dimensions.',
    aiDraftMessage: 'Namaste Vikrant ji, following up on our conversation at PackEx regarding the Pallet Wrapper. Did your project engineer finalize the floor layout space for the turntable ramp?',
    aiLastEvaluatedAt: new Date().toISOString(),
    isFollowUpSent: false,
    chats: [
      { id: 'c3-1', sender: 'rep', text: 'Dear Vikrant ji, great meeting you at the PackEx stall! Following up on your requirement for the automatic pallet stretch wrapper.', timestamp: '11:00 AM' },
      { id: 'c3-2', sender: 'buyer', text: 'Thanks Vikram. We are expanding the dispatch bay. Turntable capacity needs to be minimum 2000kg.', timestamp: '2:15 PM' },
      { id: 'c3-3', sender: 'rep', text: 'Our model SPW-2000 has pre-stretch ratio up to 300%, saving 40% on stretch film consumption. Sent the specs.', timestamp: '3:00 PM' },
      { id: 'c3-4', sender: 'buyer', text: 'Looks good. Let me confirm civil clearances with our factory architect by Wednesday.', timestamp: '5:30 PM' }
    ]
  },

  // 4. DUE TODAY & WARM
  {
    id: 'lead-04',
    name: 'Ananya Sen',
    company: 'Bengal Tea Estate Co.',
    phone: '+91 98310 55432',
    assignedRep: 'Sneha Rao',
    source: 'Client Referral',
    equipmentInterest: 'Continuous Nitrogen Flushing Band Sealer',
    lastContactDate: getRelativeDateStr(-2),
    nextFollowUpDate: getRelativeDateStr(0), // DUE TODAY
    aiTag: 'Warm',
    aiReason: 'Waiting for sample pouch seal-integrity test results sent to our testing lab.',
    aiDraftMessage: 'Hi Ananya, good news! The vacuum & leak test for your foil tea pouches on our Nitrogen Band Sealer came out with zero leakage at 0.8 bar. Can I share the lab certificate with you today?',
    aiLastEvaluatedAt: new Date().toISOString(),
    isFollowUpSent: false,
    chats: [
      { id: 'c4-1', sender: 'buyer', text: 'Hi Sneha, Mr. Bose from Sterling Spices suggested your band sealers. We need oxygen-free nitrogen flushing for 250g tea pouches.', timestamp: '10:00 AM' },
      { id: 'c4-2', sender: 'rep', text: 'Pleasure connecting Ananya! Yes, our CBS-900N has dual gas flush nozzles guaranteeing <1% residual oxygen.', timestamp: '10:45 AM' },
      { id: 'c4-3', sender: 'buyer', text: 'Couriered 10 sample pouches to your Pune facility yesterday. Please run test seals.', timestamp: '1:15 PM' },
      { id: 'c4-4', sender: 'rep', text: 'Received! Our technician is running the seal test today and will share the report.', timestamp: '2:00 PM' }
    ]
  },

  // 5. COLD - FOLLOW UP DUE LATER
  {
    id: 'lead-05',
    name: 'Suresh Menon',
    company: 'Cochin Marine Exporters',
    phone: '+91 98460 77123',
    assignedRep: 'Karan Mehta',
    source: 'Cold Outreach',
    equipmentInterest: 'Double Chamber Vacuum Packaging Machine',
    lastContactDate: getRelativeDateStr(-6),
    nextFollowUpDate: getRelativeDateStr(14),
    aiTag: 'Cold',
    aiReason: 'Current seafood processing season ending; plant modernization postponed to Q2 next year.',
    aiDraftMessage: 'Hi Suresh ji, hope you had a successful season close. Just archiving our notes on the Double Chamber Vacuum Machine and checking in before Q2 budgeting begins.',
    aiLastEvaluatedAt: new Date().toISOString(),
    isFollowUpSent: false,
    chats: [
      { id: 'c5-1', sender: 'rep', text: 'Hello Suresh ji, Karan here from LeadPilot Machinery. We supply SS304 grade vacuum sealers for frozen shrimp exporters.', timestamp: '11:30 AM' },
      { id: 'c5-2', sender: 'buyer', text: 'Hi Karan. Not right now. Our fishing ban starts soon and exports are down. We might expand in May next year.', timestamp: '12:10 PM' },
      { id: 'c5-3', sender: 'rep', text: 'Understood completely. May I reconnect in April with our new heavy duty pump series?', timestamp: '12:15 PM' },
      { id: 'c5-4', sender: 'buyer', text: 'Yes, ping me after 4-5 months.', timestamp: '1:00 PM' }
    ]
  },

  // 6. DUE TODAY & HOT
  {
    id: 'lead-06',
    name: 'Kavita Reddy',
    company: 'Deccan Dairy Products',
    phone: '+91 97010 33881',
    assignedRep: 'Arun Verma',
    source: 'Website Inquiry',
    equipmentInterest: 'Automatic FFS Liquid Milk Pouch Machine (500ml)',
    lastContactDate: getRelativeDateStr(-1),
    nextFollowUpDate: getRelativeDateStr(0), // DUE TODAY
    aiTag: 'Hot',
    aiReason: 'Existing packing machine broken down; urgent requirement for ready-stock mechanical replacement.',
    aiDraftMessage: 'Namaste Kavita ji! Regarding your urgent requirement for the FFS Liquid Pouch Machine to replace the breakdown unit, our technical team can dispatch an ex-stock machine within 48 hours. Can we do a quick 5-min call to finalize the electrical phase specs?',
    aiLastEvaluatedAt: new Date().toISOString(),
    isFollowUpSent: false,
    chats: [
      { id: 'c6-1', sender: 'buyer', text: 'Urgent: Our milk sachet machine sealing jaw cracked. Do you have ready stock of 2000 pouches/hr liquid pouch machine in Hyderabad or Bangalore?', timestamp: '9:15 AM' },
      { id: 'c6-2', sender: 'rep', text: 'Namaste Kavita ji! Yes, we have 1 unit of FFS-2000L in our Bangalore depot ready for immediate dispatch with UV sterilization lamp.', timestamp: '9:25 AM' },
      { id: 'c6-3', sender: 'buyer', text: 'Fantastic. Send machine serial number, invoice proforma, and technician availability for installation.', timestamp: '10:00 AM' }
    ]
  },

  // 7. OVERDUE & HOT
  {
    id: 'lead-07',
    name: 'Mohit Agarwal',
    company: 'Prime Pharma Formulation Ltd',
    phone: '+91 98110 44901',
    assignedRep: 'Neha Patil',
    source: 'Indiamart',
    equipmentInterest: 'Automatic Blister Packaging Machine (cGMP Model)',
    lastContactDate: getRelativeDateStr(-3),
    nextFollowUpDate: getRelativeDateStr(-1), // OVERDUE
    aiTag: 'Hot',
    aiReason: 'Buyer requested DQ/IQ/OQ validation protocol documentation for USFDA audit compliance.',
    aiDraftMessage: 'Dear Mohit ji, following up with the cGMP DQ/IQ/OQ qualification documents for the ALU-ALU Blister Packing machine. Would you like our validation engineer to join a call with your QA head?',
    aiLastEvaluatedAt: new Date().toISOString(),
    isFollowUpSent: false,
    chats: [
      { id: 'c7-1', sender: 'buyer', text: 'Hi Neha, is your blister machine compliant with Schedule M and 21 CFR Part 11 for batch printing audit trails?', timestamp: '3:20 PM' },
      { id: 'c7-2', sender: 'rep', text: 'Yes Mohit ji, our model BP-240 is 100% SS316 contact parts with Allen-Bradley PLC and FDA compliant audit trails.', timestamp: '3:45 PM' },
      { id: 'c7-3', sender: 'buyer', text: 'Share the standard DQ/IQ protocol draft by Tuesday. Our QA team will approve before signing contract.', timestamp: '4:10 PM' }
    ]
  },

  // 8. DUE TODAY & WARM
  {
    id: 'lead-08',
    name: 'Gaurav Bansal',
    company: 'Bansal Agro Seeds',
    phone: '+91 98720 11456',
    assignedRep: 'Karan Mehta',
    source: 'Direct WhatsApp',
    equipmentInterest: 'Auger Screw Powder Filling Machine (5kg Bags)',
    lastContactDate: getRelativeDateStr(-2),
    nextFollowUpDate: getRelativeDateStr(0), // DUE TODAY
    aiTag: 'Warm',
    aiReason: 'Needs confirmation on bag clamping mechanism for dusty pesticide powder packaging.',
    aiDraftMessage: 'Hi Gaurav, following up on the Auger Filling system for your 5kg seed & pesticide bags. I verified with our engineering team: the dust-extraction hood and pneumatic bag clamp are included in the quote.',
    aiLastEvaluatedAt: new Date().toISOString(),
    isFollowUpSent: false,
    chats: [
      { id: 'c8-1', sender: 'buyer', text: 'Karan, do you have auger filler suitable for wettable powder? Normal machines get jammed due to dust.', timestamp: '11:15 AM' },
      { id: 'c8-2', sender: 'rep', text: 'Hi Gaurav! Our auger features a totally enclosed servo-driven screw with dual bag clamping and suction port for dust collection.', timestamp: '11:40 AM' },
      { id: 'c8-3', sender: 'buyer', text: 'Confirm whether the clamp handles laminated woven sacks without tearing.', timestamp: '2:15 PM' }
    ]
  },

  // 9. COLD
  {
    id: 'lead-09',
    name: 'Deepak Chhabra',
    company: 'Punjab Confectioneries',
    phone: '+91 98140 88291',
    assignedRep: 'Vikram Singh',
    source: 'Indiamart',
    equipmentInterest: 'Horizontal Flow Wrap Machine (Biscuits)',
    lastContactDate: getRelativeDateStr(-8),
    nextFollowUpDate: getRelativeDateStr(20),
    aiTag: 'Cold',
    aiReason: 'Purchased second-hand machine from a local workshop due to immediate budget constraints.',
    aiDraftMessage: 'Hi Deepak ji, hope your confectionery production is running smoothly. Keeping your file active for any spare parts or future line additions whenever needed!',
    aiLastEvaluatedAt: new Date().toISOString(),
    isFollowUpSent: false,
    chats: [
      { id: 'c9-1', sender: 'buyer', text: 'Inquired for biscuit flow wrapper 150 packs/min.', timestamp: '10:00 AM' },
      { id: 'c9-2', sender: 'rep', text: 'Shared quotation for Servo Flow-300 at ₹8.5 Lakhs.', timestamp: '11:00 AM' },
      { id: 'c9-3', sender: 'buyer', text: 'Sorry Vikram, bought an old used machine locally for half price to manage festival rush.', timestamp: '1:30 PM' },
      { id: 'c9-4', sender: 'rep', text: 'No problem Deepak ji, wishing you best for festival sales! Reach out if you ever need spares.', timestamp: '2:00 PM' }
    ]
  },

  // 10. DUE TODAY & HOT
  {
    id: 'lead-10',
    name: 'Sunil Rao',
    company: 'Karnataka Edible Oils',
    phone: '+91 94480 66321',
    assignedRep: 'Sneha Rao',
    source: 'Website Inquiry',
    equipmentInterest: 'Automatic 4-Head Piston Liquid Filling Machine (1L - 5L)',
    lastContactDate: getRelativeDateStr(-1),
    nextFollowUpDate: getRelativeDateStr(0), // DUE TODAY
    aiTag: 'Hot',
    aiReason: 'Promised factory visit and trial with sunflower oil samples scheduled for tomorrow.',
    aiDraftMessage: 'Good morning Sunil ji! Confirming our appointment tomorrow at 11 AM at our experience center for the Sunflower Oil trial on the 4-Head Piston Filler. Should I arrange transport from the airport?',
    aiLastEvaluatedAt: new Date().toISOString(),
    isFollowUpSent: false,
    chats: [
      { id: 'c10-1', sender: 'buyer', text: 'Sneha, we need a 4-nozzle servo piston filler for 1L and 5L sunflower oil cans with anti-drip nozzles.', timestamp: '10:30 AM' },
      { id: 'c10-2', sender: 'rep', text: 'Hello Sunil ji! Our ServoFill-4P has anti-drip diving nozzles designed specifically for viscous oils, eliminating bottle neck stains.', timestamp: '11:05 AM' },
      { id: 'c10-3', sender: 'buyer', text: 'I am in Mumbai this Thursday. Can I bring 10 cans of our oil and see live filling accuracy?', timestamp: '3:00 PM' },
      { id: 'c10-4', sender: 'rep', text: 'Most welcome! Our demo bay is ready. Let us schedule 11 AM Thursday.', timestamp: '3:45 PM' }
    ]
  },

  // 11. WARM - FUTURE DUE
  {
    id: 'lead-11',
    name: 'Meenakshi Iyer',
    company: 'Chettinad Spices & Masala',
    phone: '+91 94440 12895',
    assignedRep: 'Arun Verma',
    source: 'Client Referral',
    equipmentInterest: 'Tamper-Evident Shrink Sleeve Applicator for Jars',
    lastContactDate: getRelativeDateStr(-2),
    nextFollowUpDate: getRelativeDateStr(3),
    aiTag: 'Warm',
    aiReason: 'Waiting for custom PVC shrink sleeve roll samples from their label printer.',
    aiDraftMessage: 'Hi Meenakshi, checking in to see if your label supplier has dispatched the sample printed shrink rolls for the masala jar tests?',
    aiLastEvaluatedAt: new Date().toISOString(),
    isFollowUpSent: false,
    chats: [
      { id: 'c11-1', sender: 'buyer', text: 'Looking for automatic neck sleeve applicator with electric shrink steam tunnel for 100g glass jars.', timestamp: '2:15 PM' },
      { id: 'c11-2', sender: 'rep', text: 'Hi Meenakshi, our SSL-150 with steam tunnel gives wrinkle-free finish on glass contours without heating product inside.', timestamp: '2:40 PM' }
    ]
  },

  // 12. OVERDUE & WARM
  {
    id: 'lead-12',
    name: 'Tariq Ansari',
    company: 'Al-Madina Meat Processors',
    phone: '+91 98230 45712',
    assignedRep: 'Karan Mehta',
    source: 'Indiamart',
    equipmentInterest: 'Heavy-Duty Thermoforming Vacuum Packaging Machine',
    lastContactDate: getRelativeDateStr(-5),
    nextFollowUpDate: getRelativeDateStr(-1), // OVERDUE
    aiTag: 'Warm',
    aiReason: 'Quotation sent for export-grade skin pack machine; buyer had asked for financing options.',
    aiDraftMessage: 'Salam Tariq Bhai, following up regarding the Thermoforming Vacuum machine. We have tied up with SIDBI for equipment leasing with low initial capex. Would you like me to share the scheme brochure?',
    aiLastEvaluatedAt: new Date().toISOString(),
    isFollowUpSent: false,
    chats: [
      { id: 'c12-1', sender: 'buyer', text: 'We need vacuum skin packaging for chilled mutton cuts for Middle East export.', timestamp: '12:00 PM' },
      { id: 'c12-2', sender: 'rep', text: 'Shared technical specs for TF-400 with Busch vacuum pump and modified atmosphere packaging (MAP).', timestamp: '1:15 PM' },
      { id: 'c12-3', sender: 'buyer', text: 'Machinery is top class but ₹28 Lakhs is heavy capex. Do you provide machinery loan or EMI tie-up?', timestamp: '4:20 PM' }
    ]
  },

  // 13. COLD
  {
    id: 'lead-13',
    name: 'Naveen Jindal',
    company: 'Haryana Fasteners & Hardware',
    phone: '+91 98120 77654',
    assignedRep: 'Vikram Singh',
    source: 'Cold Outreach',
    equipmentInterest: 'Heavy Duty Box Strapping Machine (PP/PET)',
    lastContactDate: getRelativeDateStr(-10),
    nextFollowUpDate: getRelativeDateStr(25),
    aiTag: 'Cold',
    aiReason: 'Unresponsive after three WhatsApp follow-ups; manual strapping currently deemed sufficient.',
    aiDraftMessage: 'Hi Naveen ji, touching base from LeadPilot Packaging. If you ever look to automate box strapping for your hardware export cartons, feel free to ping us!',
    aiLastEvaluatedAt: new Date().toISOString(),
    isFollowUpSent: false,
    chats: [
      { id: 'c13-1', sender: 'rep', text: 'Hi Naveen ji, sharing brochure for our semi-automatic table strapping machine for heavy carton packing.', timestamp: '10:00 AM' },
      { id: 'c13-2', sender: 'rep', text: 'Gentle check-in Naveen ji, did you get a chance to review the strapping video?', timestamp: '3:00 PM' }
    ]
  },

  // 14. DUE TODAY & HOT
  {
    id: 'lead-14',
    name: 'Simran Kaur',
    company: 'Doaba Organic Honey',
    phone: '+91 98760 33219',
    assignedRep: 'Neha Patil',
    source: 'Website Inquiry',
    equipmentInterest: 'Automatic Rotary Honey Jar Capping & Labeling Machine',
    lastContactDate: getRelativeDateStr(-1),
    nextFollowUpDate: getRelativeDateStr(0), // DUE TODAY
    aiTag: 'Hot',
    aiReason: 'Expanding plant for upcoming export harvest; requested immediate final contract draft.',
    aiDraftMessage: 'Sat Sri Akal Simran ji! I have finalized the commercial agreement for the Rotary Honey Jar Capper & Sticker Labeler, including the free onsite commissioning. Sending the draft contract for your signature now.',
    aiLastEvaluatedAt: new Date().toISOString(),
    isFollowUpSent: false,
    chats: [
      { id: 'c14-1', sender: 'buyer', text: 'Hello Neha, need automatic rotary capper for hexagonal 500g honey jars and self-adhesive sticker labeler.', timestamp: '11:00 AM' },
      { id: 'c14-2', sender: 'rep', text: 'Sat Sri Akal Simran ji! Our combo line handles hexagonal glass jars with zero scuffing on pre-printed metallic caps.', timestamp: '11:30 AM' },
      { id: 'c14-3', sender: 'buyer', text: 'Loved the video demo. Send final contract draft with 1-year comprehensive warranty and onsite training.', timestamp: '5:15 PM' }
    ]
  },

  // 15. WARM - FUTURE DUE
  {
    id: 'lead-15',
    name: 'Amitabh Sen',
    company: 'Kolkata Chemical Specialties',
    phone: '+91 98300 88123',
    assignedRep: 'Sneha Rao',
    source: 'PackEx Expo 2026',
    equipmentInterest: 'Flameproof Semi-Automatic Drum Filler (200L)',
    lastContactDate: getRelativeDateStr(-3),
    nextFollowUpDate: getRelativeDateStr(4),
    aiTag: 'Warm',
    aiReason: 'Waiting for PESO safety clearance certificate from client plant safety officer.',
    aiDraftMessage: 'Hi Amitabh, hope you are well. Did your safety officer approve the ATEX/PESO flameproof motor certificates we sent for the drum filling station?',
    aiLastEvaluatedAt: new Date().toISOString(),
    isFollowUpSent: false,
    chats: [
      { id: 'c15-1', sender: 'buyer', text: 'Sneha, we need 200L drum filling for solvent chemicals. Motor and solenoid valves must be PESO certified flameproof Zone 1.', timestamp: '4:00 PM' },
      { id: 'c15-2', sender: 'rep', text: 'Yes Amitabh ji, all electricals on our DF-200 are Ex-d certified with CIMFR/PESO test certificates attached.', timestamp: '4:45 PM' }
    ]
  },

  // 16. WARM - FUTURE DUE
  {
    id: 'lead-16',
    name: 'Bhavin Patel',
    company: 'Surat Diamond Polishing Supplies',
    phone: '+91 98250 99412',
    assignedRep: 'Vikram Singh',
    source: 'Indiamart',
    equipmentInterest: 'Continuous Band Sealer with Embossing Coder',
    lastContactDate: getRelativeDateStr(-2),
    nextFollowUpDate: getRelativeDateStr(2),
    aiTag: 'Warm',
    aiReason: 'Comparing our horizontal band sealer with an imported Taiwan model.',
    aiDraftMessage: 'Hi Bhavin bhai, just checking if you compared the heating block metallurgy between our copper-alloy blocks and the Taiwan machine? Ours comes with 24-hr replacement support in Surat.',
    aiLastEvaluatedAt: new Date().toISOString(),
    isFollowUpSent: false,
    chats: [
      { id: 'c16-1', sender: 'buyer', text: 'Bhavin here from Surat. Need 3 units of horizontal band sealer with date coder for abrasive tool bags.', timestamp: '1:30 PM' },
      { id: 'c16-2', sender: 'rep', text: 'Namaste Bhavin bhai! Our CBS-1000 has solid state temperature controllers with heavy copper sealing jaws.', timestamp: '2:00 PM' }
    ]
  },

  // 17. OVERDUE & WARM
  {
    id: 'lead-17',
    name: 'Farhan Sheikh',
    company: 'Deccan Bakeries & Rusks',
    phone: '+91 98490 22176',
    assignedRep: 'Arun Verma',
    source: 'Direct WhatsApp',
    equipmentInterest: 'Automatic L-Sealer and Heat Shrink Tunnel',
    lastContactDate: getRelativeDateStr(-4),
    nextFollowUpDate: getRelativeDateStr(-1), // OVERDUE
    aiTag: 'Warm',
    aiReason: 'Buyer wanted to check if machine can handle both individual rusk packs and bulk family trays.',
    aiDraftMessage: 'Hi Farhan, following up on the L-Sealer and Shrink Tunnel. I checked with our design team: the sealing frame width of 600mm easily fits both your single packs and the family mega-trays without changeover tools.',
    aiLastEvaluatedAt: new Date().toISOString(),
    isFollowUpSent: false,
    chats: [
      { id: 'c17-1', sender: 'buyer', text: 'Arun bhai, does your shrink machine handle POF film without burning plastic smell?', timestamp: '3:10 PM' },
      { id: 'c17-2', sender: 'rep', text: 'Yes Farhan, we use Teflon coated Nichrome blade with PID micro-temperature regulation. Zero fume, crystal clear shrink.', timestamp: '3:30 PM' }
    ]
  },

  // 18. COLD
  {
    id: 'lead-18',
    name: 'Rameshwar Lal',
    company: 'Marwar Salt Refineries',
    phone: '+91 94140 55198',
    assignedRep: 'Karan Mehta',
    source: 'Indiamart',
    equipmentInterest: 'Heavy-Duty FFS Salt Packaging Machine (Corrosion Resistant)',
    lastContactDate: getRelativeDateStr(-12),
    nextFollowUpDate: getRelativeDateStr(28),
    aiTag: 'Cold',
    aiReason: 'Project stalled due to delays in new factory land allotment in Didwana.',
    aiDraftMessage: 'Namaste Rameshwar ji, hope all is well. Reaching out to see if the state industrial land possession for the new refinery has moved forward?',
    aiLastEvaluatedAt: new Date().toISOString(),
    isFollowUpSent: false,
    chats: [
      { id: 'c18-1', sender: 'buyer', text: 'Need salt packing machine with SS316 contact parts to prevent rusting.', timestamp: '10:00 AM' },
      { id: 'c18-2', sender: 'rep', text: 'Shared quotation for Salt-Pack 1000 with polymer coating and SS316 chute.', timestamp: '11:15 AM' },
      { id: 'c18-3', sender: 'buyer', text: 'Govt land allotment has court dispute. Factory construction on hold for 6 months.', timestamp: '4:00 PM' }
    ]
  },

  // 19. DUE TODAY & HOT
  {
    id: 'lead-19',
    name: 'Zoya Khan',
    company: 'Zoya Cosmetics & Fragrances',
    phone: '+91 99200 44102',
    assignedRep: 'Neha Patil',
    source: 'Website Inquiry',
    equipmentInterest: 'Semi-Automatic Perfume Crimping and Collar Fitting Machine',
    lastContactDate: getRelativeDateStr(-1),
    nextFollowUpDate: getRelativeDateStr(0), // DUE TODAY
    aiTag: 'Hot',
    aiReason: 'New luxury perfume line launching next month; needs machine delivered within 10 days.',
    aiDraftMessage: 'Hi Zoya! Just confirming our factory manager has expedited the Pneumatic Perfume Crimper order. If we confirm the collar size (15mm vs 20mm) by noon, we can ship by this Friday.',
    aiLastEvaluatedAt: new Date().toISOString(),
    isFollowUpSent: false,
    chats: [
      { id: 'c19-1', sender: 'buyer', text: 'Hi Neha! Need pneumatic crimping machine for FEA 15 perfume spray pumps and collar ring press.', timestamp: '12:00 PM' },
      { id: 'c19-2', sender: 'rep', text: 'Hi Zoya! Our benchtop crimper gives scratch-free, hermetic crimping with adjustable pressure gauge up to 8 bar.', timestamp: '12:30 PM' },
      { id: 'c19-3', sender: 'buyer', text: 'Perfect. We have a product launch in 4 weeks so delivery deadline is non-negotiable. Can you deliver in 10 days?', timestamp: '4:15 PM' },
      { id: 'c19-4', sender: 'rep', text: 'Yes, if order is placed today, we can dispatch our ready test-bench unit by Friday.', timestamp: '5:00 PM' }
    ]
  },

  // 20. WARM - FUTURE DUE
  {
    id: 'lead-20',
    name: 'Harish Chandra',
    company: 'Kashi Ayurvedic Pharmacy',
    phone: '+91 94500 77124',
    assignedRep: 'Sneha Rao',
    source: 'Client Referral',
    equipmentInterest: 'Automatic Carton Box Taping and Strapping Combo Line',
    lastContactDate: getRelativeDateStr(-2),
    nextFollowUpDate: getRelativeDateStr(5),
    aiTag: 'Warm',
    aiReason: 'Client is conducting internal time-study on their dispatch packing bottlenecks.',
    aiDraftMessage: 'Pranam Harish ji, hope your dispatch operations are going smoothly. Did your warehouse supervisor finish the time-study on daily carton throughput?',
    aiLastEvaluatedAt: new Date().toISOString(),
    isFollowUpSent: false,
    chats: [
      { id: 'c20-1', sender: 'buyer', text: 'Pranam Sneha ji. We currently pack 800 cartons daily with manual tape dispensers. Looking for automatic top & bottom taper.', timestamp: '11:00 AM' },
      { id: 'c20-2', sender: 'rep', text: 'Pranam Harish ji! Our FXJ-6050 automatically folds flaps and applies top-bottom BOPP tape in under 3 seconds per carton.', timestamp: '11:45 AM' }
    ]
  }
];

export const SALES_REPS = [
  'All Reps',
  'Arun Verma',
  'Neha Patil',
  'Karan Mehta',
  'Vikram Singh',
  'Sneha Rao'
];
