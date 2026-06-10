import { useState, useMemo, useCallback } from "react";

// ── Shared column definitions ─────────────────────────────────
const M6=[
  {u:"H6wa9WFIfAh",l:"M 0-28d"},{u:"zer9kq2Ikbd",l:"M 29d-11m"},
  {u:"x2VEikCCa4Z",l:"M 12-59m"},{u:"u3lCAM5PAiK",l:"M 5-9y"},
  {u:"KtE9QoI9y1M",l:"M 10-19y"},{u:"RxBP8yn7YI6",l:"M ≥20y"},
  {u:"hwjLwMGe4xw",l:"F 0-28d"},{u:"SosO6bX1nNK",l:"F 29d-11m"},
  {u:"RbKofv9kDqg",l:"F 12-59m"},{u:"tYstTYOf3Q7",l:"F 5-9y"},
  {u:"BdD1atQV7yi",l:"F 10-19y"},{u:"PmRdxt1EJl4",l:"F ≥20y"},
];
const MF=[{u:"f5lnU6hVD7Z",l:"Male"},{u:"CxemxeUsBoz",l:"Female"}];
const T=[{u:"HllvX50cXC0",l:"Total"}];
const ML=[{u:"g23AbnbTHxK",l:"<5 yrs"},{u:"BejwJjDyM0G",l:"≥5 yrs"},{u:"PltojeBkEef",l:"Preg. Women"}];
const IMMU=[{u:"RCLbmQf297r",l:"<1yr Fixed"},{u:"NcdZeYPcp4c",l:"<1yr Outreach"},{u:"T5xczyLMecj",l:">1yr Fixed"},{u:"QLZUSAFmD0C",l:">1yr Outreach"}];
const TD=[{u:"bYdKO7y1xtl",l:"TD1"},{u:"EbgzkRR6BQz",l:"TD2"},{u:"HUbOiPN3yVs",l:"TD3"},{u:"h8nDQgWTF0T",l:"TD4"},{u:"oa2EgBaCj2M",l:"TD5"}];
const HEPB=[{u:"lv3zynWMSql",l:"M 10-19"},{u:"x7d27XjNT4b",l:"M ≥20"},{u:"Xgy6ODpF8pn",l:"F 10-19"},{u:"jDuyuvNky8Z",l:"F ≥20"}];
const GBV=[{u:"Z7WCwWmZkHQ",l:"M <20"},{u:"tsbstyOySyv",l:"M ≥20"},{u:"M2Ry39vEX90",l:"F <20"},{u:"bdkjYsEFwXT",l:"F ≥20"}];
const FIS=[{u:"HUt7whSnbrI",l:"VVF 10-19"},{u:"lQN5PE4wJMu",l:"VVF ≥20"},{u:"uO3F2gVsFid",l:"RVF 10-19"},{u:"Ldq7Gsm4nE9",l:"RVF ≥20"},{u:"lU3zykSgnrB",l:"VVF&RVF 10-19"},{u:"xnZazVkqHzs",l:"VVF&RVF ≥20"}];

// ── All sections with rows ────────────────────────────────────
const SECTIONS = [
  { id:"S01", title:"Health Facility Attendance", cols:M6, rows:[
    {n:1,u:"TPL5RGRgzPH",l:"General Attendance"},
    {n:2,u:"k3BuWAntiQH",l:"Out-patient Attendance"},
  ]},
  { id:"S02", title:"Inpatient Care (IPC)", cols:M6, rows:[
    {n:3,u:"ZdG3zLIvUdx",l:"Patients admitted"},
    {n:4,u:"l9LrAzeXfuE",l:"Inpatient discharges",cols:T},
  ]},
  { id:"S03", title:"Mortality (Deaths)", cols:M6, rows:[
    {n:5,u:"jTX8h6u4R0X",l:"Deaths among individuals (disaggregated by age)"},
  ]},
  { id:"S04", title:"Maternal Mortality & Causes of Deaths", cols:T, rows:[
    {n:6,u:"aveFczHJAoj",l:"Deaths of women related to pregnancy",cols:[{u:"oCv1TaNTsSB",l:"10-19 yrs"},{u:"Q2hwu7rdKhV",l:"≥20 yrs"}]},
    {n:7,u:"T3yEuMxA3u2",l:"Confirmed maternal deaths due to:",cols:[{u:"kZierbQdQPY",l:"PPH"},{u:"DZVj95PpKXw",l:"Sepsis"},{u:"htftF6BONaM",l:"Obstructed Labour"},{u:"rCe456mRsss",l:"Abortion"},{u:"LW6EkfTgevt",l:"Malaria"},{u:"UL23aESR2Hb",l:"Anaemia"},{u:"GvJMgBkrVh7",l:"HIV"},{u:"dWCKocnOYqv",l:"Other"}]},
    {n:8,u:"U2QIuMLqRXa",l:"Confirmed neonatal deaths due to:",cols:[{u:"aujIqxZkepd",l:"Prematurity"},{u:"bBVMQzQOn2l",l:"Neonatal Tetanus"},{u:"xDQbsDmWMnP",l:"Congenital Malformation"},{u:"yy1ozoKMnPf",l:"Other"}]},
    {n:9,u:"uJnEts8U8OS",l:"Confirmed under-5 deaths due to:",cols:[{u:"QSWfjLFJnFN",l:"Malaria"},{u:"dOat1c5Q6Im",l:"Pneumonia"},{u:"CjqivJfYBz5",l:"Malnutrition"},{u:"cXfu6byDNnY",l:"Other"}]},
  ]},
  { id:"S05", title:"Maternal Health — Ante-Natal Care (ANC)", cols:T, rows:[
    {n:10,u:"oGsoXawMvwY",l:"Antenatal attendance by pregnant women",cols:[{u:"FK8eH0VoLcD",l:"10-14 yrs"},{u:"Atwj2IMCJMZ",l:"15-19 yrs"},{u:"I3o9B001I60",l:"20-34 yrs"},{u:"yY1C0KuHCrG",l:"35-49 yrs"},{u:"TgluJRTPsIy",l:"≥50 yrs"}]},
    {n:11,u:"o18dulQcUMf",l:"Antenatal attendance – first visit",cols:[{u:"QoqBzU0IBbh",l:"GA < 20wks"},{u:"ECNIgLSfzS8",l:"GA ≥ 20wks"}]},
    {n:12,u:"VezZfwYFNg3",l:"ANC 4th visit"},{n:13,u:"g8wmRh44SrQ",l:"ANC 8th visit"},
    {n:14,u:"V83q2a03itE",l:"Counselled on FGM"},{n:15,u:"KATOJ0IB3qL",l:"Counselled on Family Planning"},
    {n:16,u:"w4UzDA75OAh",l:"Counselled on Maternal Nutrition"},
    {n:17,u:"pWtBYnVYqL4",l:"ANC syphilis test done"},{n:18,u:"JAD3KtkflGZ",l:"ANC syphilis positive"},{n:19,u:"SedL2iidxAX",l:"ANC syphilis treated"},
    {n:20,u:"vvvhM1zUDKM",l:"ANC Hepatitis B done"},{n:21,u:"Ml82QKWfpp7",l:"ANC Hepatitis B positive"},{n:22,u:"pJj6ATnBhic",l:"ANC Hepatitis B referred"},
    {n:23,u:"ocqmIjFaPPb",l:"ANC Hepatitis C done"},{n:24,u:"KteIflYWCB7",l:"ANC Hepatitis C positive"},{n:25,u:"BEh5fkSwuN9",l:"ANC Hepatitis C referred"},
    {n:26,u:"COyom0PPpvk",l:"Malaria IPT 1st dose (IPT1)"},{n:27,u:"nEAaEDKhRyR",l:"Malaria IPT 2nd dose (IPT2)"},
    {n:28,u:"RNvqT7Vy375",l:"Malaria IPT 3rd dose (IPT3)"},{n:29,u:"j0TzyRQ5vfP",l:"Malaria IPT ≥4th dose"},
    {n:30,u:"HrRSbqSKCcV",l:"Received LLIN"},{n:31,u:"jeFCvxf1XyJ",l:"Received Iron & Folic Acid"},
    {n:32,u:"uOQeG5u3FnF",l:"Severe anaemia"},{n:33,u:"xDkL44Uf2jv",l:"Proteinuria"},
  ]},
  { id:"S06", title:"Maternal Health — Labour & Delivery", cols:T, rows:[
    {n:34,u:"BuW69tmvtxn",l:"Decision in seeking care < 24 hours"},
    {n:35,u:"IL8oKlGX37r",l:"Transportation in"},
    {n:36,u:"vzKQsdmjPfE",l:"Deliveries",cols:[{u:"fTY1oQOIdnT",l:"SVD"},{u:"XwKpIrIurEi",l:"Assisted"},{u:"X449fWyaazy",l:"C-Section"}]},
    {n:37,u:"kgui2czIPBu",l:"Preterm births (before 37 weeks)"},{n:38,u:"SEysfopCehg",l:"Deliveries with complications"},
    {n:39,u:"QVRWBNLd6W3",l:"Deliveries by adolescent mother (10-19 yrs)"},
    {n:40,u:"eYWNa5jg4w0",l:"Deliveries monitored with partograph"},
    {n:41,u:"GPNa8gnOFmS",l:"Deliveries by SBA"},
    {n:42,u:"TCdefdOFrqE",l:"Received Uterotonics",cols:[{u:"yi3zjIZlIjN",l:"Oxytocin"},{u:"sW5gUJIFEoK",l:"Misoprostol"}]},
    {n:43,u:"Ugk7gmb4ZHH",l:"Eclampsia received MgSO4"},
    {n:44,u:"Q9ZEWH5gCSh",l:"Abortions",cols:[{u:"bPf2y6btDt3",l:"Induced"},{u:"Lbp6ZjTIjg0",l:"Spontaneous"}]},
    {n:45,u:"A1uKZiKhHRM",l:"Post Abortion Care received"},{n:46,u:"jNGZ7pGF8YM",l:"Admitted for unsafe abortion"},
  ]},
  { id:"S07", title:"Post-Natal Care (PNC)", cols:[{u:"k2YKDTDB9DB",l:"Mother 1d"},{u:"zo2qqR166Dn",l:"Mother 2-3d"},{u:"tW4bZ7ZmLXc",l:"Mother 4-7d"},{u:"kycwQnScCYI",l:"Mother >7d"},{u:"QwHMyx9sTN7",l:"NB 1d"},{u:"J5Olf738ugw",l:"NB 2-3d"},{u:"pFtU7LHg285",l:"NB 4-7d"},{u:"l61ouQ1AneZ",l:"NB >7d"}], rows:[
    {n:47,u:"jNGq7plF001",l:"Postnatal clinic visits"},
  ]},
  { id:"S08", title:"Newborn Health — Outcome of Pregnancy", cols:[{u:"i1CkNv5rrDj",l:"M <2.5kg"},{u:"UnT7tuR97k2",l:"M ≥2.5kg"},{u:"eFupNxJgEFB",l:"F <2.5kg"},{u:"sZKLBF4hvUa",l:"F ≥2.5kg"}], rows:[
    {n:48,u:"jNGq7plF002",l:"Live Births"},
    {n:49,u:"jNGq7plF003",l:"Live Births – HIV positive mothers"},
    {n:50,u:"jNGq7plF004",l:"Still Births",cols:[{u:"UpHqJD3fd8I",l:"Macerated (MSB)"},{u:"xARceUXtn4r",l:"Fresh (FSB)"}]},
  ]},
  { id:"S09", title:"Newborn Health — Immediate Care & Complications", cols:MF, rows:[
    {n:51,u:"jNGq7plF005",l:"Cord clamped after 1 minute of birth"},
    {n:52,u:"jNGq7plF006",l:"4% CHX applied to cord at birth"},
    {n:53,u:"jNGq7plF007",l:"Put to breast within 1 hour"},
    {n:54,u:"jNGq7plF008",l:"Temperature taken at 1 hour"},
    {n:55,u:"jNGq7plF009",l:"Not breathing at birth"},
    {n:56,u:"jNGq7plF010",l:"Successfully resuscitated"},
    {n:57,u:"jNGq7plF011",l:"Newborns with danger signs"},
    {n:58,u:"jNGq7plF012",l:"Danger signs — given antibiotics & referred"},
    {n:59,u:"jNGq7plF013",l:"Neonatal tetanus"},{n:60,u:"jNGq7plF014",l:"Neonatal jaundice"},
    {n:61,u:"jNGq7plF015",l:"Low birth weight admitted KMC"},
    {n:62,u:"jNGq7plF016",l:"Low birth weight discharged KMC"},
  ]},
  { id:"S10", title:"Immunization — TD Vaccines", cols:TD, rows:[
    {n:63,u:"jNGq7plF017",l:"Pregnant women given TD vaccine"},
    {n:64,u:"jNGq7plF018",l:"Non-pregnant women given TD vaccine"},
  ]},
  { id:"S11", title:"Immunization — Antigens Received", cols:IMMU, rows:[
    {n:65,u:"jNGq7plF019",l:"OPV 0 (Birth)"},{n:66,u:"jNGq7plF020",l:"Hep. B 0 (Birth)"},
    {n:67,u:"jNGq7plF021",l:"BCG"},{n:68,u:"jNGq7plF022",l:"OPV 1"},
    {n:69,u:"jNGq7plF023",l:"Penta. 1"},{n:70,u:"jNGq7plF024",l:"PCV 1"},
    {n:71,u:"jNGq7plF025",l:"Rota 1"},{n:72,u:"jNGq7plF026",l:"OPV 2"},
    {n:73,u:"jNGq7plF027",l:"Penta. 2"},{n:74,u:"jNGq7plF028",l:"PCV 2"},
    {n:75,u:"jNGq7plF029",l:"Rota 2"},{n:76,u:"jNGq7plF030",l:"OPV 3"},
    {n:77,u:"jNGq7plF031",l:"Penta. 3"},{n:78,u:"jNGq7plF032",l:"PCV 3"},
    {n:79,u:"jNGq7plF033",l:"Rota 3"},{n:80,u:"jNGq7plF034",l:"IPV 1"},
    {n:81,u:"jNGq7plF035",l:"Vitamin A"},{n:82,u:"jNGq7plF036",l:"Measles 1"},
    {n:83,u:"jNGq7plF037",l:"Fully Immunized <1 year"},{n:84,u:"jNGq7plF038",l:"Yellow Fever"},
    {n:85,u:"jNGq7plF039",l:"Measles 2"},{n:86,u:"jNGq7plF040",l:"Men A"},{n:87,u:"jNGq7plF041",l:"IPV 2"},
  ]},
  { id:"S12", title:"Immunization — AEFI & RI Operations", cols:T, rows:[
    {n:88,u:"jNGq7plF042",l:"AEFI cases reported",cols:[{u:"DMyoRuaLyVj",l:"Non-Serious"},{u:"WL2uRZI9hIw",l:"Serious"}]},
    {n:89,u:"jNGq7plF043",l:"Serious AEFI cases investigated"},
    {n:90,u:"jNGq7plF044",l:"Outcome of serious AEFI",cols:[{u:"OsUJDvVxLi0",l:"Alive"},{u:"RfWNrvgNQHl",l:"Dead"}]},
    {n:91,u:"jNGq7plF046",l:"RI fixed sessions",cols:[{u:"JatwHHqEq3A",l:"Planned"},{u:"S2pJcMIJ7Cf",l:"Conducted"}],yesno:true},
    {n:92,u:"jNGq7plF047",l:"RI outreach sessions",cols:[{u:"JatwHHqEq3A",l:"Planned"},{u:"S2pJcMIJ7Cf",l:"Conducted"}]},
    {n:93,u:"jNGq7plF049",l:"Supervisory visits",cols:[{u:"HWUpn6M9Eyg",l:"National"},{u:"OxOnYflKBAd",l:"State"},{u:"mYyK4ZUVPly",l:"LGA"}]},
    {n:94,u:"jNGq7plF050",l:"RI funds received (Naira)",yesno:true},
  ]},
  { id:"S13", title:"Birth Registration", cols:MF, rows:[
    {n:95,u:"jNGq7plF052",l:"Children under 1 year registered"},
    {n:96,u:"jNGq7plF053",l:"Birth certificate issued"},
    {n:97,u:"jNGq7plF054",l:"Birth certificate collected",yesno:true},
  ]},
  { id:"S14", title:"Nutrition & Growth Monitoring (0-59 months)", cols:T, rows:[
    {n:98,u:"jNGq7plF055",l:"Children 0-59 months GMP",cols:[{u:"HzffxAxaf0t",l:"M New 0-5m"},{u:"sBgZtz7UJCN",l:"M New 6-23m"},{u:"Vol9mR6G9Hn",l:"M New 24-59m"},{u:"NiriGXjdyw5",l:"M Revisit 0-5m"},{u:"a7SJXZxgPPQ",l:"M Revisit 6-23m"},{u:"Gxj8xzyaU76",l:"M Revisit 24-59m"},{u:"odVADGPXvp7",l:"F New 0-5m"},{u:"ykCI1XLeryc",l:"F New 6-23m"},{u:"Y68o0jYMET8",l:"F New 24-59m"},{u:"SOfY5Ccmab4",l:"F Revisit 0-5m"},{u:"hNMtxfCD5wR",l:"F Revisit 6-23m"},{u:"eUPuDmmeXWu",l:"F Revisit 24-59m"}]},
    {n:99,u:"jNGq7plF056",l:"Children growing well",cols:MF},
    {n:100,u:"jNGq7plF057",l:"Children 0-6m exclusive breastfeeding",cols:MF},
    {n:101,u:"jNGq7plF058",l:"Clients counselled on IYCN"},
    {n:102,u:"jNGq7plF059",l:"Children 6-59m Vitamin A",cols:[{u:"JprACHpnjKl",l:"M 6-11m"},{u:"nZ1zYnSSSEp",l:"M 12-59m"},{u:"yFfLfrpkE91",l:"F 6-11m"},{u:"Y9O2v8Nt5WD",l:"F 12-59m"}]},
    {n:103,u:"jNGq7plF060",l:"Children 6-23m Micronutrient Powder",cols:MF},
    {n:104,u:"jNGq7plF061",l:"Children 12-59m Deworming",cols:MF},
  ]},
  { id:"S15", title:"Severe Acute Malnutrition (SAM)", cols:[{u:"Gl4XMwCjT3M",l:"M New"},{u:"HjqvwXVq9uX",l:"M Trans. in"},{u:"hb5BrKF8eGx",l:"F New"},{u:"EtNh3HjKTpf",l:"F Trans. in"}], rows:[
    {n:105,u:"jNGq7plF062",l:"Children <5 admitted for SAM"},
    {n:106,u:"jNGq7plF063",l:"SAM treatment outcomes",cols:[{u:"nQR6aDf0Uxv",l:"M Recovered"},{u:"brTdwY4cD21",l:"M Defaulted"},{u:"HRfYzmw4BL0",l:"M Dead"},{u:"MxjPABKjKwD",l:"M Trans. out"},{u:"mlKJRmg5b1m",l:"F Recovered"},{u:"FlfkEzdjAvl",l:"F Defaulted"},{u:"OzcrbB9e2nx",l:"F Dead"},{u:"nxANbvg6WAC",l:"F Trans. out"}]},
  ]},
  { id:"S16", title:"Child Health & IMCI", cols:MF, rows:[
    {n:107,u:"jNGq7plF064",l:"Diarrhoea new cases <5 years"},
    {n:108,u:"jNGq7plF065",l:"Diarrhoea <5 yrs — given ORS & zinc"},
    {n:109,u:"jNGq7plF066",l:"Pneumonia new cases <5 years"},
    {n:110,u:"jNGq7plF067",l:"Pneumonia <5 yrs — given antibiotics"},
    {n:111,u:"jNGq7plF068",l:"Measles new cases <5 years"},
  ]},
  { id:"S17", title:"Family Planning", cols:T, rows:[
    {n:112,u:"jNGq7plF069",l:"FP clients counselled",cols:MF},
    {n:113,u:"jNGq7plF070",l:"New FP acceptors",cols:MF},
    {n:114,u:"jNGq7plF071",l:"Females using modern contraception",cols:[{u:"zOj62DlILjP",l:"10-14y"},{u:"KOvLlTRvMp2",l:"15-19y"},{u:"DzoGFPrFWLX",l:"20-24y"},{u:"sVKN5rtRUrf",l:"25-49y"},{u:"G7ePMg90lyr",l:"≥50y"}]},
    {n:115,u:"jNGq7plF072",l:"Clients given oral pills"},
    {n:116,u:"jNGq7plF073",l:"Oral pills (sachets) dispensed"},
    {n:117,u:"jNGq7plF074",l:"Emergency contraceptive pills"},
    {n:118,u:"jNGq7plF075",l:"Injectables given",cols:[{u:"zQGNCzMRF8x",l:"Noristerat"},{u:"nMxC4LJCkyh",l:"DMPA-IM"},{u:"qvOGth8yfG5",l:"DMPA-SC (Prov)"},{u:"UjDoabKxk1I",l:"DMPA-SC (Self)"}]},
    {n:119,u:"jNGq7plF076",l:"IUD inserted",cols:[{u:"BYhNo6ms9nc",l:"CuT 380A"},{u:"t26rP0PfcBK",l:"LNG IUS"}]},
    {n:120,u:"jNGq7plF077",l:"Implants inserted",cols:[{u:"iR6sKKyKmoA",l:"Implanon NXT"},{u:"mQdSjc9o64K",l:"Jadelle"}]},
    {n:121,u:"jNGq7plF078",l:"Voluntary sterilization",cols:MF},
    {n:122,u:"jNGq7plF079",l:"Clients received condoms",cols:MF},
    {n:123,u:"jNGq7plF080",l:"Condoms distributed",cols:MF},
    {n:124,u:"jNGq7plF081",l:"Referred for FP from PMTCT/HCT/PAC"},
    {n:125,u:"jNGq7plF082",l:"Counselled on postpartum FP"},
    {n:126,u:"jNGq7plF083",l:"Post-partum Implanon NXT inserted"},
    {n:127,u:"jNGq7plF084",l:"Post-partum Jadelle inserted"},
    {n:128,u:"jNGq7plF085",l:"Post-partum IUD inserted"},
  ]},
  { id:"S18", title:"Referrals", cols:T, rows:[
    {n:129,u:"jNGq7plF086",l:"All out-going referrals"},
    {n:130,u:"jNGq7plF087",l:"Malaria cases referred for treatment"},
    {n:131,u:"jNGq7plF088",l:"Malaria cases referred for ADR"},
    {n:132,u:"jNGq7plF089",l:"Pregnancy complications referred out"},
    {n:133,u:"jNGq7plF090",l:"Obstetric fistula referred"},
  ]},
  { id:"S19", title:"Non-Communicable Diseases (NCDs)", cols:MF, rows:[
    {n:134,u:"jNGq7plF091",l:"Diabetes Mellitus — new suspected cases"},
    {n:135,u:"jNGq7plF092",l:"Gestational Diabetes — suspected"},
    {n:136,u:"jNGq7plF093",l:"Hypertension — new suspected cases"},
    {n:137,u:"jNGq7plF094",l:"Arthritis — new suspected cases"},
    {n:138,u:"jNGq7plF095",l:"Sickle Cell disease — new cases"},
    {n:139,u:"jNGq7plF096",l:"Asthma — new suspected cases"},
    {n:140,u:"jNGq7plF097",l:"Depression — new suspected cases"},
    {n:141,u:"jNGq7plF098",l:"Breast Cancer — new suspected cases"},
    {n:142,u:"jNGq7plF099",l:"Cervical Cancer — new suspected cases"},
  ]},
  { id:"S20", title:"Malaria — Prevention, Testing, Cases & Treatment", cols:ML, rows:[
    {n:143,u:"jNGq7plF100",l:"Children <5 yrs received LLIN",cols:T},
    {n:144,u:"jNGq7plF101",l:"Persons presenting with fever"},
    {n:145,u:"jNGq7plF102",l:"Tested by RDT"},
    {n:146,u:"jNGq7plF103",l:"Positive by RDT"},
    {n:147,u:"jNGq7plF104",l:"Tested by Microscopy"},
    {n:148,u:"jNGq7plF105",l:"Positive by Microscopy"},
    {n:149,u:"jNGq7plF106",l:"Clinically diagnosed Malaria"},
    {n:150,u:"jNGq7plF107",l:"Confirmed uncomplicated Malaria"},
    {n:151,u:"jNGq7plF108",l:"Severe Malaria cases"},
    {n:152,u:"jNGq7plF109",l:"Confirmed Malaria — treated with ACT"},
    {n:153,u:"jNGq7plF110",l:"Clinical Malaria — treated with ACT"},
    {n:154,u:"jNGq7plF111",l:"Confirmed Malaria — other antimalarials"},
    {n:155,u:"jNGq7plF112",l:"Severe Malaria — pre-referral treatment"},
    {n:156,u:"jNGq7plF113",l:"Severe Malaria — Artesunate injection"},
    {n:157,u:"jNGq7plF114",l:"Severe Malaria — other pre-referral"},
  ]},
  { id:"S21", title:"Tuberculosis Screening", cols:MF, rows:[
    {n:158,u:"jNGq7plF115",l:"Persons screened for TB"},
    {n:159,u:"jNGq7plF116",l:"Persons with 1 score"},
    {n:160,u:"jNGq7plF117",l:"Persons with 1 score — referred to TB services"},
  ]},
  { id:"S22", title:"Hepatitis B & C Services", cols:HEPB, rows:[
    {n:161,u:"jNGq7plF118",l:"Tested for Hepatitis B"},{n:162,u:"jNGq7plF119",l:"Hepatitis B positive"},
    {n:163,u:"jNGq7plF120",l:"Treated for Hepatitis B"},{n:164,u:"jNGq7plF121",l:"Hepatitis B referred"},
    {n:165,u:"jNGq7plF122",l:"Tested for Hepatitis C"},{n:166,u:"jNGq7plF123",l:"Hepatitis C positive"},
    {n:167,u:"jNGq7plF124",l:"Treated for Hepatitis C"},{n:168,u:"jNGq7plF125",l:"Hepatitis C referred"},
  ]},
  { id:"S23", title:"Gender Based Violence (GBV)", cols:GBV, rows:[
    {n:169,u:"jNGq7plF126",l:"GBV cases seen"},
    {n:170,u:"jNGq7plF127",l:"GBV — received post-GBV care"},
    {n:171,u:"jNGq7plF128",l:"GBV — referred for further treatment"},
  ]},
  { id:"S24", title:"Obstetric Fistula, Snake Bites, Elephantiasis & Yaws", cols:FIS, rows:[
    {n:172,u:"jNGq7plF129",l:"Women with leaking urine/faeces — new cases"},
    {n:173,u:"jNGq7plF130",l:"Admitted with fistula"},
    {n:174,u:"jNGq7plF131",l:"Surgery for fistula repair"},
    {n:175,u:"jNGq7plF132",l:"First repair"},{n:176,u:"jNGq7plF133",l:"Second repair"},
    {n:177,u:"jNGq7plF134",l:"Discharged after fistula surgery"},
    {n:178,u:"jNGq7plF135",l:"Closed & dry fistula at discharge"},
    {n:179,u:"jNGq7plF136",l:"Snake bites — new cases",cols:MF},
    {n:180,u:"jNGq7plF137",l:"Elephantiasis — new cases",cols:MF},
    {n:181,u:"jNGq7plF138",l:"Yaws — new cases",cols:MF},
  ]},
  { id:"S25", title:"Pharmacovigilance / ADR", cols:T, rows:[
    {n:182,u:"jNGq7plF139",l:"ADRs reported following use of antimalarials"},
  ]},
];


const FACILITIES = [
  {name:"PHC Garki",state:"FCT",lga:"Abuja Municipal"},
  {name:"PHC Wuse",state:"FCT",lga:"Abuja Municipal"},
  {name:"PHC Kubwa",state:"FCT",lga:"Bwari"},
  {name:"PHC Nyanya",state:"FCT",lga:"Abuja Municipal"},
  {name:"PHC Karu",state:"FCT",lga:"Karu"},
  {name:"PHC Gwagwalada",state:"FCT",lga:"Gwagwalada"},
  {name:"PHC Zuba",state:"FCT",lga:"Gwagwalada"},
  {name:"PHC Lugbe",state:"FCT",lga:"Abuja Municipal"},
  {name:"General Hospital Maitama",state:"FCT",lga:"Abuja Municipal"},
  {name:"General Hospital Wuse",state:"FCT",lga:"Abuja Municipal"},
  {name:"PHC Kano Road",state:"Kano",lga:"Kano Municipal"},
  {name:"PHC Fagge",state:"Kano",lga:"Fagge"},
  {name:"PHC Dala",state:"Kano",lga:"Dala"},
  {name:"General Hospital Kano",state:"Kano",lga:"Kano Municipal"},
  {name:"PHC Kaduna North",state:"Kaduna",lga:"Kaduna North"},
  {name:"PHC Kaduna South",state:"Kaduna",lga:"Kaduna South"},
  {name:"PHC Rigasa",state:"Kaduna",lga:"Igabi"},
  {name:"General Hospital Kaduna",state:"Kaduna",lga:"Kaduna North"},
  {name:"PHC Enugu North",state:"Enugu",lga:"Enugu North"},
  {name:"PHC Enugu South",state:"Enugu",lga:"Enugu South"},
  {name:"PHC Agbani",state:"Enugu",lga:"Nkanu West"},
  {name:"General Hospital Enugu",state:"Enugu",lga:"Enugu North"},
  {name:"PHC Ibadan North",state:"Oyo",lga:"Ibadan North"},
  {name:"PHC Ibadan South",state:"Oyo",lga:"Ibadan South West"},
  {name:"PHC Egbeda",state:"Oyo",lga:"Egbeda"},
  {name:"General Hospital Adeoyo",state:"Oyo",lga:"Ibadan North"},
  {name:"PHC Lagos Island",state:"Lagos",lga:"Lagos Island"},
  {name:"PHC Surulere",state:"Lagos",lga:"Surulere"},
  {name:"PHC Alimosho",state:"Lagos",lga:"Alimosho"},
  {name:"PHC Ikeja",state:"Lagos",lga:"Ikeja"},
  {name:"PHC Oshodi",state:"Lagos",lga:"Oshodi-Isolo"},
  {name:"General Hospital Lagos Island",state:"Lagos",lga:"Lagos Island"},
  {name:"PHC Abeokuta North",state:"Ogun",lga:"Abeokuta North"},
  {name:"PHC Sagamu",state:"Ogun",lga:"Sagamu"},
  {name:"PHC Benin City",state:"Edo",lga:"Oredo"},
  {name:"PHC Egor",state:"Edo",lga:"Egor"},
  {name:"General Hospital Benin",state:"Edo",lga:"Oredo"},
  {name:"PHC Port Harcourt",state:"Rivers",lga:"Port Harcourt"},
  {name:"PHC Obio-Akpor",state:"Rivers",lga:"Obio-Akpor"},
  {name:"General Hospital Port Harcourt",state:"Rivers",lga:"Port Harcourt"},
  {name:"PHC Warri",state:"Delta",lga:"Warri South"},
  {name:"PHC Asaba",state:"Delta",lga:"Oshimili South"},
  {name:"PHC Onitsha",state:"Anambra",lga:"Onitsha North"},
  {name:"PHC Awka",state:"Anambra",lga:"Awka South"},
  {name:"PHC Owerri",state:"Imo",lga:"Owerri Municipal"},
  {name:"PHC Orlu",state:"Imo",lga:"Orlu"},
  {name:"PHC Umuahia",state:"Abia",lga:"Umuahia North"},
  {name:"PHC Aba",state:"Abia",lga:"Aba North"},
  {name:"PHC Maiduguri",state:"Borno",lga:"Maiduguri"},
  {name:"PHC Konduga",state:"Borno",lga:"Konduga"},
];
const MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"];
const k=(de,oc)=>de+"||"+oc;
const getCols=(sec,row)=>row.cols||sec.cols;

export default function App(){
  const [values,setValues]=useState({});
  const [meta,setMeta]=useState({facility:"",state:"",lga:"",month:"",year:String(new Date().getFullYear())});
  const [aiOpen,setAiOpen]=useState(false);
  const [aiLoading,setAiLoading]=useState(false);
  const [aiResults,setAiResults]=useState(null);
  const [flagged,setFlagged]=useState({});
  const [exported,setExported]=useState(false);
  const [facSearch,setFacSearch]=useState("");
  const [showFacDrop,setShowFacDrop]=useState(false);
  const [autoPlaying,setAutoPlaying]=useState(false);
  const [autoProgress,setAutoProgress]=useState(0);
  const [autoTotal,setAutoTotal]=useState(0);
  const [showAutoModal,setShowAutoModal]=useState(false);
  const [pendingAutoPlay,setPendingAutoPlay]=useState(null);
  const [exportModal,setExportModal]=useState(null); // {json, fname}

  const val=(de,oc)=>values[k(de,oc)]??"";
  const set=(de,oc,v)=>setValues(p=>({...p,[k(de,oc)]:v}));

  const {total,filled}=useMemo(()=>{
    let t=0,f=0;
    SECTIONS.forEach(s=>s.rows.forEach(r=>getCols(s,r).forEach(c=>{t++;if(val(r.u,c.u)!=="")f++;})));
    return{total:t,filled:f};
  },[values]);
  const pct=Math.round((filled/total)*100);

  const rowTotal=(sec,row)=>{
    const cols=getCols(sec,row);
    if(cols.length<2)return null;
    let s=0,any=false;
    cols.forEach(c=>{const n=parseFloat(val(row.u,c.u));if(!isNaN(n)){s+=n;any=true;}});
    return any?s:null;
  };

  const triggerUpload=useCallback(()=>{
    const inp=document.createElement("input");
    inp.type="file"; inp.accept=".json";
    document.body.appendChild(inp);
    inp.onchange=e=>{
      const file=e.target.files[0];
      if(!file){document.body.removeChild(inp);return;}
      const reader=new FileReader();
      reader.onload=ev=>{
        try{
          const json=JSON.parse(ev.target.result);
          if(json.facility)setMeta(p=>({...p,...json.facility}));
          if(Array.isArray(json.dataValues)){
            const nv={};
            json.dataValues.forEach(({dataElement:de,categoryOptionCombo:oc,value:v})=>{
              if(de&&oc&&v!==undefined)nv[k(de,oc)]=String(v);
            });
            setAiResults(null);setFlagged({});
            setPendingAutoPlay(nv);
            setShowAutoModal(true);
          }
        }catch(err){alert("Could not read file: "+err.message);}
        document.body.removeChild(inp);
      };
      reader.readAsText(file);
    };
    inp.click();
  },[]);

  const buildSummary=useCallback(()=>{
    const lines=[];
    SECTIONS.forEach(s=>{
      const rows=s.rows.map(r=>{
        const cols=getCols(s,r);
        const entries=cols.map(c=>{const v=val(r.u,c.u);return v!==""?c.l+":"+v:null;}).filter(Boolean);
        return entries.length?"Row "+r.n+" ["+r.l+"]: "+entries.join(", "):null;
      }).filter(Boolean);
      if(rows.length)lines.push("["+s.title+"]\n"+rows.join("\n"));
    });
    return lines.join("\n\n");
  },[values]);

  const runAI=useCallback(async()=>{
    setAiLoading(true);setAiOpen(true);setAiResults(null);
    const rawSummary=buildSummary();
    if(!rawSummary.trim()){
      setAiResults({summary:"No data entered yet.",anomalies:[],totalIssues:0});
      setAiLoading(false);return;
    }
    // Strip non-ASCII using charCodeAt - no regex, no unicode literals
    let summary="";
    for(let i=0;i<rawSummary.length;i++){
      const c=rawSummary.charCodeAt(i);
      if(c<=127) summary+=rawSummary[i];
      else if(c===8212||c===8211) summary+="-";
      else if(c===8805) summary+=">=";
      else if(c===8804) summary+="<=";
      else if(c===183) summary+=".";
    }
    const rowLookup={};
    SECTIONS.forEach(s=>s.rows.forEach(r=>{rowLookup[r.n]=r.l;}));
    const sysPrompt=
      "You are a Nigerian HMIS data quality validator. "+
      "Find: impossible values, IPT sequence errors (IPT2>IPT1), treated>confirmed. "+
      "Return ONLY valid JSON, plain ASCII, no markdown. "+
      "IMPORTANT: Keep issue and suggestion fields under 60 characters each. "+
      "Format: {\"summary\":\"brief summary\",\"totalIssues\":0,\"anomalies\":[{\"rowNumber\":0,\"severity\":\"high\",\"issue\":\"short\",\"suggestion\":\"short\"}]}";
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:2048,
          system:sysPrompt,
          messages:[{role:"user",content:"Validate "+meta.month+" "+meta.year+" report for "+(meta.facility||"facility")+":\n\n"+summary.slice(0,2800)}]
        })
      });
      if(!res.ok) throw new Error("HTTP "+res.status);
      const data=await res.json();
      if(data.error) throw new Error(data.error.message||"API error");
      rawText=((data.content)||[]).map(b=>b.text||"").join("").trim();
      if(!rawText) throw new Error("Empty AI response");
      let parsed=null;
      const tries=[
        rawText,
        rawText.split("```json").join("").split("```").join("").trim(),
        (rawText.match(/\{[\s\S]*\}/)||[""])[0],
      ];
      for(const t of tries){try{parsed=JSON.parse(t);break;}catch{}}
      if(!parsed) throw new Error("Parse failed. Response: "+rawText.slice(0,150));
      if(!Array.isArray(parsed.anomalies)) parsed.anomalies=[];
      parsed.anomalies=parsed.anomalies.map(a=>({
        ...a,indicator:rowLookup[a.rowNumber]||("Row "+a.rowNumber)
      }));
      if(typeof parsed.totalIssues!=="number") parsed.totalIssues=parsed.anomalies.length;
      setAiResults(parsed);
      const fl={};
      parsed.anomalies.forEach(a=>SECTIONS.forEach(s=>s.rows.forEach(r=>{if(r.n===a.rowNumber)fl[r.u]=a.severity;})));
      setFlagged(fl);
    }catch(err){
      setAiResults({summary:"Error: "+err.message,rawResponse:rawText.slice(0,300)||"(none)",anomalies:[],totalIssues:0,error:true});
    }
    setAiLoading(false);
  },[values,meta,buildSummary]);

  const getFilename=()=>"HMIS_"+(meta.facility||"Facility").replace(/\s+/g,"_")+"_"+(meta.month||"")+(meta.year||"")+".json";
  const buildPayload=()=>{
    // Build complete list of ALL fields - empty cells exported as 0
    const allValues=[];
    SECTIONS.forEach(sec=>{
      sec.rows.forEach(row=>{
        const cols=getCols(sec,row);
        cols.forEach(col=>{
          const v=values[k(row.u,col.u)];
          allValues.push({
            dataElement:row.u,
            categoryOptionCombo:col.u,
            value:(v!==undefined&&v!=="")?v:"0"
          });
        });
      });
    });
    return {
      facility:meta,
      reportDate:new Date().toISOString(),
      totalFields:allValues.length,
      dataValues:allValues
    };
  };
  const exportJSON=()=>{
    const json=JSON.stringify(buildPayload(),null,2);
    const fname=getFilename();
    const blob=new Blob([json],{type:"application/octet-stream"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url;
    a.download=fname;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setExported(true);
    setTimeout(()=>setExported(false),3000);
  };
  const closeExportModal=()=>setExportModal(null);


  // ── Auto-fill playback: fills values one by one ──────────────
  const startAutoPlay=useCallback((uploadedValues)=>{
    const entries=Object.entries(uploadedValues);
    if(!entries.length) return;
    setAutoPlaying(true);
    setAutoProgress(0);
    setAutoTotal(entries.length);
    setValues({});
    let i=0;
    const tick=()=>{
      if(i>=entries.length){setAutoPlaying(false);return;}
      const [key,val]=entries[i];
      setValues(p=>({...p,[key]:val}));
      setAutoProgress(i+1);
      i++;
      setTimeout(tick, 40); // 40ms per field = ~20 seconds for 500 fields
    };
    tick();
  },[]);

  const sevColor=s=>s==="high"?"#ef4444":s==="medium"?"#f59e0b":"#22c55e";

  return(
    <div style={{fontFamily:"'Segoe UI',sans-serif",background:"#f0f4f8",minHeight:"100vh"}}>
      <style>{"\n        *{box-sizing:border-box;margin:0;padding:0;}\n        ::-webkit-scrollbar{width:5px;height:5px;}\n        ::-webkit-scrollbar-thumb{background:#c0ccd8;border-radius:3px;}\n        .ni{font-family:monospace;width:64px;padding:4px 2px;border:1.5px solid #d4dde8;border-radius:5px;text-align:center;font-size:12px;outline:none;transition:.15s;}\n        .ni:focus{border-color:#1a5eff;box-shadow:0 0 0 3px rgba(26,94,255,.12);}\n        .ni.ok{border-color:#0aab6d;background:#f0fdf7;color:#0a6641;}\n        .de-row{border-bottom:1px solid #e8edf5;}\n        .de-row:hover{background:#f0f5ff!important;}\n        .de-row:nth-child(even){background:#f8fafc;}\n        .fl-high{background:#fff1f1!important;outline:2px solid #ef4444;outline-offset:-2px;}\n        .fl-medium{background:#fffbeb!important;outline:2px solid #f59e0b;outline-offset:-2px;}\n        .fl-low{background:#f0fdf4!important;outline:2px solid #22c55e;outline-offset:-2px;}\n        .mi{border:1.5px solid #d0dae8;border-radius:8px;padding:7px 11px;font-size:13px;font-family:inherit;outline:none;color:#1a2035;background:#fff;width:100%;}\n        .mi:focus{border-color:#1a5eff;}\n        .spin{animation:spin 1s linear infinite;display:inline-block;}\n        @keyframes spin{to{transform:rotate(360deg);}}\n      "}</style>

      {/* Export Modal */}
      {exportModal&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.65)",zIndex:600,display:"flex",alignItems:"center",justifyContent:"center",padding:12}}>
          <div style={{background:"#fff",borderRadius:14,padding:20,width:"100%",maxWidth:460,maxHeight:"92vh",display:"flex",flexDirection:"column",gap:12}}>
            {/* Header */}
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div>
                <div style={{fontWeight:700,fontSize:15,color:"#1e3a6e",marginBottom:6}}>Export Data</div>
                <div style={{fontSize:11,color:"#64748b",marginBottom:2}}>Facility</div>
                <div style={{fontWeight:600,fontSize:13,color:"#1a2035"}}>{meta.facility||"(no facility selected)"}</div>
                <div style={{fontSize:11,color:"#64748b",marginTop:4,marginBottom:2}}>Period</div>
                <div style={{fontWeight:600,fontSize:13,color:"#1a2035"}}>{(meta.month||"(no month)")+" "+(meta.year||"")}</div>
                <div style={{fontSize:11,color:"#64748b",marginTop:4,marginBottom:2}}>File name</div>
                <div style={{fontFamily:"monospace",fontSize:11,background:"#f1f5f9",padding:"3px 8px",borderRadius:4,color:"#334155"}}>{exportModal.fname}</div>
              </div>
              <button onClick={()=>setExportModal(null)} style={{background:"#f1f5f9",border:"none",borderRadius:6,width:28,height:28,cursor:"pointer",fontSize:14,color:"#64748b",flexShrink:0,marginLeft:8}}>x</button>
            </div>
            {/* Instructions */}
            <div style={{fontSize:12,color:"#475569",lineHeight:1.7,background:"#eff6ff",borderRadius:8,padding:"10px 12px",border:"1px solid #bfdbfe"}}>
              Tap <strong>Select All + Copy</strong> then paste into a text editor and save as <strong>.json</strong>
            </div>
            {/* JSON textarea */}
            <textarea id="export-ta" readOnly value={exportModal.json}
              style={{flex:1,minHeight:150,fontFamily:"monospace",fontSize:10.5,border:"1px solid #e2e8f0",borderRadius:8,padding:10,resize:"none",background:"#0f172a",color:"#e2e8f0"}}
            />
            {/* Buttons */}
            <div style={{display:"flex",gap:8}}>
              <button id="copy-btn" onClick={()=>{
                const ta=document.getElementById("export-ta");
                ta.select();
                ta.setSelectionRange(0,99999);
                let ok=false;
                try{ok=document.execCommand("copy");}catch{}
                if(!ok){try{navigator.clipboard.writeText(exportModal.json);}catch{}}
                const btn=document.getElementById("copy-btn");
                if(btn){btn.textContent="Copied!";btn.style.background="#16a34a";}
                setTimeout(()=>{if(btn){btn.textContent="Select All + Copy";btn.style.background="#1e3a6e";}},2500);
              }} style={{flex:1,padding:"11px",background:"#1e3a6e",color:"#fff",border:"none",borderRadius:8,fontWeight:600,fontSize:13,cursor:"pointer"}}>
                Select All + Copy
              </button>
              <button onClick={()=>setExportModal(null)}
                style={{padding:"11px 16px",background:"#f1f5f9",color:"#64748b",border:"none",borderRadius:8,fontSize:13,cursor:"pointer"}}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Auto-fill modal */}
      {showAutoModal&&pendingAutoPlay&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
          <div style={{background:"#fff",borderRadius:12,padding:24,maxWidth:360,width:"100%",boxShadow:"0 8px 32px rgba(0,0,0,.2)"}}>
            <div style={{fontWeight:700,fontSize:16,color:"#1e3a6e",marginBottom:8}}>File Loaded</div>
            <div style={{fontSize:13,color:"#475569",lineHeight:1.6,marginBottom:20}}>
              {Object.keys(pendingAutoPlay).length} values ready. How would you like to load them?
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <button onClick={()=>{setShowAutoModal(false);startAutoPlay(pendingAutoPlay);setPendingAutoPlay(null);}}
                style={{padding:"11px 16px",background:"#7c3aed",color:"#fff",border:"none",borderRadius:8,fontWeight:600,fontSize:13,cursor:"pointer",textAlign:"left"}}>
                Auto-fill (watch each field fill one by one)
              </button>
              <button onClick={()=>{setValues(pendingAutoPlay);setShowAutoModal(false);setPendingAutoPlay(null);}}
                style={{padding:"11px 16px",background:"#1e3a6e",color:"#fff",border:"none",borderRadius:8,fontWeight:600,fontSize:13,cursor:"pointer",textAlign:"left"}}>
                Load instantly (all fields at once)
              </button>
              <button onClick={()=>{setShowAutoModal(false);setPendingAutoPlay(null);}}
                style={{padding:"9px 16px",background:"#f1f5f9",color:"#64748b",border:"none",borderRadius:8,fontSize:13,cursor:"pointer"}}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Panel */}
      <div style={{position:"fixed",top:0,right:0,width:360,height:"100vh",background:"#fff",boxShadow:"-4px 0 20px rgba(0,0,0,.15)",zIndex:200,transform:aiOpen?"translateX(0)":"translateX(100%)",transition:"transform .25s",display:"flex",flexDirection:"column"}}>
        <div style={{background:"#7c3aed",color:"#fff",padding:"14px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
          <div>
            <div style={{fontWeight:700,fontSize:14}}>AI Data Validation</div>
            <div style={{fontSize:11,opacity:.7}}>Anomaly detection</div>
          </div>
          <button onClick={()=>setAiOpen(false)} style={{background:"rgba(255,255,255,.2)",border:"none",color:"#fff",width:28,height:28,borderRadius:6,cursor:"pointer",fontSize:14}}>x</button>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:14}}>
          {aiLoading&&<div style={{textAlign:"center",padding:"40px 16px",color:"#7c3aed"}}><div style={{fontSize:28}} className="spin">...</div><div style={{marginTop:10,fontWeight:600}}>Analysing data...</div><div style={{fontSize:12,color:"#94a3b8",marginTop:4}}>Reviewing 182 indicators</div></div>}
          {!aiLoading&&aiResults&&(
            <>
              <div style={{background:aiResults.error?"#fff1f1":aiResults.totalIssues===0?"#f0fdf4":"#fefce8",border:"1.5px solid "+(aiResults.error?"#ef4444":aiResults.totalIssues===0?"#22c55e":"#f59e0b"),borderRadius:8,padding:"12px 14px",marginBottom:12}}>
                <div style={{fontWeight:700,fontSize:13,color:aiResults.error?"#b91c1c":aiResults.totalIssues===0?"#166534":"#92400e",marginBottom:4}}>
                  {aiResults.error?"Error":aiResults.totalIssues===0?"Data Looks Clean":""+aiResults.totalIssues+" Issue"+(aiResults.totalIssues>1?"s":"")+" Found"}
                </div>
                <div style={{fontSize:12.5,color:"#475569",lineHeight:1.5}}>{aiResults.summary}</div>
                {aiResults.error&&aiResults.rawResponse&&(
                  <div style={{marginTop:8,padding:"8px",background:"#fee2e2",borderRadius:6,fontSize:11,fontFamily:"monospace",color:"#7f1d1d",wordBreak:"break-all"}}>
                    <strong>Raw response:</strong> {aiResults.rawResponse}
                  </div>
                )}
              </div>
              {(aiResults.anomalies||[]).map((a,i)=>(
                <div key={i} style={{background:"#fff",border:"1.5px solid #e2e8f0",borderRadius:8,padding:"10px 12px",marginBottom:8,borderLeft:"4px solid "+sevColor(a.severity)}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                    <span style={{fontWeight:700,fontSize:12}}>Row {a.rowNumber}{" - "}{a.indicator}</span>
                    <span style={{background:sevColor(a.severity)+"22",color:sevColor(a.severity),borderRadius:10,padding:"1px 7px",fontSize:10,fontWeight:700}}>{a.severity}</span>
                  </div>
                  <div style={{fontSize:12,color:"#374151",lineHeight:1.5,marginBottom:4}}>{"[!] "}{a.issue}</div>
                  <div style={{fontSize:11.5,color:"#64748b",lineHeight:1.5}}>{"[?] "}{a.suggestion}</div>
                </div>
              ))}
              <button onClick={runAI} style={{marginTop:12,width:"100%",padding:"9px",background:"#7c3aed",color:"#fff",border:"none",borderRadius:7,fontWeight:600,fontSize:13,cursor:"pointer"}}>Re-run Validation</button>
            </>
          )}
        </div>
      </div>

      {/* Top bar */}
      <div style={{background:"#1e3a6e",color:"#fff",padding:"8px 16px",position:"sticky",top:0,zIndex:100,boxShadow:"0 2px 10px rgba(0,0,0,.25)"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
        <div style={{display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
          <span style={{fontSize:20}}>[+]</span>
          <div>
            <div style={{fontWeight:700,fontSize:14}}>Health Facility Monthly Report</div>
            <div style={{fontSize:10,opacity:.6}}>HMIS | 182 indicators</div>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
          <div style={{textAlign:"right",display:"flex",flexDirection:"column",alignItems:"flex-end"}}>
            <div style={{fontSize:10,opacity:.5}}>COMPLETION</div>
            <div style={{fontFamily:"monospace",fontWeight:700,fontSize:14,color:pct===100?"#4ade80":"#fbbf24"}}>{pct}%</div>
          </div>
          <div style={{width:50,height:4,background:"rgba(255,255,255,.2)",borderRadius:2,overflow:"hidden"}}>
            <div style={{width:pct+"%",height:"100%",background:pct===100?"#4ade80":"#fbbf24",transition:"width .4s"}}/>
          </div>
          <button onClick={triggerUpload} style={{padding:"7px 12px",background:"rgba(255,255,255,.12)",border:"1px solid rgba(255,255,255,.25)",borderRadius:7,color:"#fff",fontWeight:600,fontSize:12,cursor:"pointer"}}>Upload</button>
          <button onClick={runAI} disabled={aiLoading} style={{padding:"7px 12px",background:aiLoading?"#5b21b6":"#7c3aed",border:"none",borderRadius:7,color:"#fff",fontWeight:600,fontSize:12,cursor:"pointer"}}>
            {aiLoading?<><span className="spin">...</span> ...</>:"AI Validate"}
          </button>
          <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start",gap:2}}>
            <div style={{fontSize:9,color:"rgba(255,255,255,.45)",fontFamily:"monospace",maxWidth:170,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{getFilename()}</div>
              <div style={{display:"flex",gap:4}}>
              <button onClick={()=>{
                const json=JSON.stringify(buildPayload(),null,2);
                const blob=new Blob([json],{type:"application/octet-stream"});
                const url=URL.createObjectURL(blob);
                const a=document.createElement("a");
                a.href=url;
                a.download=getFilename();
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              }} style={{padding:"6px 12px",background:"#1a5eff",border:"none",borderRadius:7,color:"#fff",fontWeight:700,fontSize:12,cursor:"pointer"}}>
                Download
              </button>
              <button onClick={()=>setExportModal({json:JSON.stringify(buildPayload(),null,2),fname:getFilename()})}
                style={{padding:"6px 10px",background:"rgba(255,255,255,.15)",border:"1px solid rgba(255,255,255,.3)",borderRadius:7,color:"#fff",fontSize:11,cursor:"pointer"}}>
                Copy
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Metadata bar */}
      <div style={{background:"#fff",borderBottom:"2px solid #e0e8f4",padding:"10px 16px",display:"flex",gap:10,flexWrap:"wrap",alignItems:"flex-end"}}>
        {/* Facility search */}
        <div style={{position:"relative"}}>
          <div style={{fontSize:10,fontWeight:700,color:"#64748b",textTransform:"uppercase",letterSpacing:".06em",marginBottom:3}}>Facility</div>
          <input className="mi" style={{width:220}} placeholder="Search facility..."
            value={facSearch||meta.facility}
            onFocus={()=>setShowFacDrop(true)}
            onChange={e=>{setFacSearch(e.target.value);setShowFacDrop(true);}}
          />
          {showFacDrop&&(
            <div style={{position:"absolute",top:"100%",left:0,width:280,maxHeight:200,overflowY:"auto",background:"#fff",border:"1px solid #d0dae8",borderRadius:8,boxShadow:"0 4px 16px rgba(0,0,0,.12)",zIndex:300}}>
              {FACILITIES.filter(f=>
                !facSearch||(f.name+f.state+f.lga).toLowerCase().includes(facSearch.toLowerCase())
              ).map((f,i)=>(
                <div key={i} onClick={()=>{
                  setMeta(p=>({...p,facility:f.name,state:f.state,lga:f.lga}));
                  setFacSearch("");setShowFacDrop(false);
                }} style={{padding:"8px 12px",cursor:"pointer",borderBottom:"1px solid #f1f5f9",fontSize:13}}
                  onMouseEnter={e=>e.currentTarget.style.background="#f0f5ff"}
                  onMouseLeave={e=>e.currentTarget.style.background="#fff"}>
                  <div style={{fontWeight:600,color:"#1a2035"}}>{f.name}</div>
                  <div style={{fontSize:11,color:"#94a3b8"}}>{f.lga} | {f.state}</div>
                </div>
              ))}
              {FACILITIES.filter(f=>!facSearch||(f.name+f.state+f.lga).toLowerCase().includes(facSearch.toLowerCase())).length===0&&(
                <div style={{padding:"10px 12px",fontSize:12,color:"#94a3b8"}}>No facility found</div>
              )}
            </div>
          )}
        </div>
        {/* State and LGA (auto-filled but editable) */}
        <div>
          <div style={{fontSize:10,fontWeight:700,color:"#64748b",textTransform:"uppercase",letterSpacing:".06em",marginBottom:3}}>State</div>
          <input className="mi" style={{width:110}} placeholder="State" value={meta.state} onChange={e=>setMeta(p=>({...p,state:e.target.value}))}/>
        </div>
        <div>
          <div style={{fontSize:10,fontWeight:700,color:"#64748b",textTransform:"uppercase",letterSpacing:".06em",marginBottom:3}}>LGA</div>
          <input className="mi" style={{width:130}} placeholder="LGA" value={meta.lga} onChange={e=>setMeta(p=>({...p,lga:e.target.value}))}/>
        </div>
        <div>
          <div style={{fontSize:10,fontWeight:700,color:"#64748b",textTransform:"uppercase",letterSpacing:".06em",marginBottom:3}}>Month</div>
          <select className="mi" style={{width:120}} value={meta.month} onChange={e=>setMeta(p=>({...p,month:e.target.value}))}>
            <option value="">Select...</option>
            {MONTHS.map(m=><option key={m}>{m}</option>)}
          </select>
        </div>
        <div>
          <div style={{fontSize:10,fontWeight:700,color:"#64748b",textTransform:"uppercase",letterSpacing:".06em",marginBottom:3}}>Year</div>
          <input className="mi" style={{width:68}} placeholder="Year" value={meta.year} onChange={e=>setMeta(p=>({...p,year:e.target.value}))}/>
        </div>
        {/* Auto-play progress bar */}
        {autoPlaying&&(
          <div style={{flex:1,minWidth:160}}>
            <div style={{fontSize:10,fontWeight:700,color:"#7c3aed",textTransform:"uppercase",marginBottom:3}}>Auto-filling... {autoProgress}/{autoTotal}</div>
            <div style={{height:6,background:"#e9d5ff",borderRadius:3,overflow:"hidden"}}>
              <div style={{height:"100%",background:"#7c3aed",borderRadius:3,transition:"width .05s",width:(autoProgress/autoTotal*100)+"%"}}/>
            </div>
          </div>
        )}
      </div>

      {/* Form body */}
      <div style={{padding:"12px 12px 40px",maxWidth:1400,margin:"0 auto"}}>
        {SECTIONS.map(sec=>{
          const secCols=sec.cols;
          const hasGroups=secCols.some(c=>c.g);
          return(
            <div key={sec.id} style={{marginBottom:4,borderRadius:4,overflow:"hidden",boxShadow:"0 1px 5px rgba(0,0,0,.06)"}}>
              <div style={{overflowX:"auto",WebkitOverflowScrolling:"touch"}}>
              <table style={{width:"100%",borderCollapse:"collapse",background:"#fff",tableLayout:"auto"}}>
                <thead>
                  <tr style={{background:"#1e3a6e",color:"#fff"}}>
                    <td colSpan={secCols.length+3} style={{padding:"8px 12px",fontWeight:700,fontSize:12.5,textTransform:"uppercase",letterSpacing:".03em"}}>{sec.title}</td>
                  </tr>
                  <tr style={{background:"#dce6f1",fontSize:10.5,fontWeight:700,color:"#1a2035",textAlign:"center"}}>
                    <th style={{width:32,padding:"5px 4px"}}>#</th>
                    <th style={{textAlign:"left",padding:"5px 10px",minWidth:220}}>Indicator</th>
                    {secCols.map(c=><th key={c.u} style={{padding:"5px 4px",borderLeft:"1px solid #c8d8e8",whiteSpace:"nowrap"}}>{c.l}</th>)}
                    <th style={{padding:"5px 7px",borderLeft:"1px solid #c8d8e8",color:"#0a6641"}}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {sec.rows.map((row,ri)=>{
                    const rCols=getCols(sec,row);
                    const rt=rowTotal(sec,row);
                    const flCls=flagged[row.u]?" fl-"+flagged[row.u]:"";
                    const isCustom=row.cols&&row.cols!==sec.cols;
                    const isYesNo=row.yesno===true;
                    return(
                      <tr key={row.u} className={"de-row"+flCls}>
                        <td style={{padding:"5px 4px",textAlign:"center",fontSize:11,color:"#64748b",fontFamily:"monospace",fontWeight:600,width:32}}>{row.n}</td>
                        <td style={{padding:"5px 10px",fontSize:12.5,color:"#1a2035",lineHeight:1.4}}>
                          <div style={{display:"flex",alignItems:"center",gap:5}}>
                            {flagged[row.u]&&<span onClick={()=>setAiOpen(true)} style={{cursor:"pointer",fontSize:12}}>{flagged[row.u]==="high"?"🔴":flagged[row.u]==="medium"?"🟡":"🟢"}</span>}
                            {row.l}
                          </div>
                        </td>
                        {isCustom?(
                          <td colSpan={secCols.length+1} style={{padding:"5px 8px"}}>
                            <div style={{display:"flex",flexWrap:"wrap",gap:6,alignItems:"flex-end"}}>
                              {rCols.map(c=>(
                                <div key={c.u} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
                                  <span style={{fontSize:9.5,color:"#64748b",fontWeight:600,whiteSpace:"nowrap",maxWidth:68,overflow:"hidden",textOverflow:"ellipsis"}}>{c.l}</span>
                                  <input type="number" min="0" className={"ni"+(val(row.u,c.u)!==""?" ok":"")} value={val(row.u,c.u)} onChange={e=>set(row.u,c.u,e.target.value)} placeholder="—"/>
                                </div>
                              ))}
                              {rCols.length>1&&rt!==null&&<div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,marginLeft:6}}><span style={{fontSize:9.5,color:"#0a6641",fontWeight:700}}>TOTAL</span><span style={{fontFamily:"monospace",fontWeight:700,color:"#0aab6d",fontSize:13,paddingTop:4}}>{rt}</span></div>}
                            </div>
                          </td>
                        ):(
                          <>
                            {secCols.map(c=>(
                              <td key={c.u} style={{padding:"4px 3px",textAlign:"center",borderLeft:"1px solid #f0f4f8"}}>
                                {isYesNo?(
                                  <select className={"ni"+(val(row.u,c.u)!==""?" ok":"")} style={{width:70,fontSize:11}} value={val(row.u,c.u)} onChange={e=>set(row.u,c.u,e.target.value)}>
                                    <option value="">-</option>
                                    <option value="1">Yes</option>
                                    <option value="0">No</option>
                                  </select>
                                ):(
                                  <input type="number" min="0" className={"ni"+(val(row.u,c.u)!==""?" ok":"")} value={val(row.u,c.u)} onChange={e=>set(row.u,c.u,e.target.value)} placeholder="--"/>
                                )}
                              </td>
                            ))}
                            <td style={{padding:"4px 7px",textAlign:"center",borderLeft:"2px solid #e0ece6"}}>
                              <span style={{fontFamily:"monospace",fontWeight:700,color:"#0aab6d",fontSize:13}}>{rt!==null?rt:"—"}</span>
                            </td>
                          </>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              </div>
            </div>
          );
        })}
        <div style={{textAlign:"center",marginTop:20,fontSize:12,color:"#94a3b8"}}>{filled} of {total} fields {" | "} {meta.facility||"-"} {" | "} {meta.month||"-"} {meta.year}</div>
      </div>
    </div>
  );
}
