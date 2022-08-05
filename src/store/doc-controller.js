import axios from "axios";
import { createStore } from "vuex";
import { reactive } from "@vue/reactivity";
import { nextTick } from "@vue/runtime-core";
import VuexPersistence from 'vuex-persist'

// this is for persistent data
const vuexLocal = new VuexPersistence({
    storage: window.localStorage
  })

 const documentController =  new createStore({
        state: {
            docs: [],
            partitions: [],
            /*[
                    {
                        "title": "ARTICLE 1 - RECOGNITION",
                        "bboxes": [
                            {
                                "x0": 167.56,
                                "y0": 1072.36,
                                "x1": 1447.85,
                                "y1": 2087.43,
                                "width": 1220.29,
                                "height": 1015.07,
                                "page_width": 1749,
                                "page_height": 2238,
                                "page": 1
                            }
                        ],
                        "sections": [
                            {
                                "x0": 216.82,
                                "y0": 1135.97,
                                "x1": 1437.11,
                                "y1": 1450.67,
                                "width": 1220.29,
                                "height": 314.7,
                                "page_width": 1749,
                                "page_height": 2238,
                                "text": "1.01  It Is understood and agreed by the Employer and Local 527 that, for construction work other than the Industrial, Commercial and Institutional (LC.I. Sector), the Employer recognizes local 527 as the exclusive bargaining agent for all construction labourers performing work in all sectors of the construction industry, inclusive of the residential sector, save and except the LC.I. sector of the construction industry in the Regional Municipality of OttawaCarleton and the County of Russell, the Counties of Lanark, Leeds and Grenville, Dundas, Stormont, Glengarry and the Counties of Renfrew and Prescott, save and except non-working forepersons and persons above the rank of non-working foreperson.",
                                "page": 1,
                                "section_ref_id": 1
                            },
                            {
                                "x0": 218.15,
                                "y0": 1493.39,
                                "x1": 1436.9,
                                "y1": 1593.41,
                                "width": 1218.75,
                                "height": 100.02,
                                "page_width": 1749,
                                "page_height": 2238,
                                "text": "1.02  Without limiting the generality of the foregoing, the Employer recognizes that this collective agreement covers the performance of all work covered by Schedule \"E\" of the Provincial Collective Agreement referred to in Article 2.",
                                "page": 1,
                                "section_ref_id": 2
                            },
                            {
                                "x0": 197.56,
                                "y0": 1638.76,
                                "x1": 1324.23,
                                "y1": 2067.43,
                                "width": 1126.67,
                                "height": 428.67,
                                "page_width": 1749,
                                "page_height": 2238,
                                "text": "1.03  The Employer acknowledges that it is bound by: (a)  the Provincial Agreement referred to in Article 2; and (b)  the Collective Agreement between the National Capital Road Builders Association and the Union (Labourers' Schedule). Pn1c:c I of$ Non-IC! Agn.-cmcnt inclusive of :ill Residential Construction Elli:ctiw Mny I\" 2019 to April 301 \\ 2022-Oomn Cuntmctors Ltd.",
                                "page": 1,
                                "section_ref_id": 3
                            }
                        ]
                    },
                    {
                        "title": "ARTICLE 2 - PROVINCIAL AGREEMENT",
                        "bboxes": [
                            {
                                "x0": 175.15,
                                "y0": 198.76,
                                "x1": 1454.85,
                                "y1": 530.35,
                                "width": 1219.7,
                                "height": 331.59,
                                "page_width": 1723,
                                "page_height": 2216,
                                "page": 2
                            }
                        ],
                        "sections": [
                            {
                                "x0": 205.15,
                                "y0": 263.57,
                                "x1": 1424.85,
                                "y1": 401.39,
                                "width": 1219.7,
                                "height": 137.82,
                                "page_width": 1723,
                                "page_height": 2216,
                                "text": "2.01  The terms and conditions of the Provincial Collective Agreement between the Employer Bargaining Agency -Labourers' and the Labourers' International Union of North America and the Labourers' International Union of North America Ontario Provincial District Council binding upon Local 527, effective from May 1 '.",
                                "page": 2,
                                "section_ref_id": 4
                            },
                            {
                                "x0": 298.39,
                                "y0": 408.05,
                                "x1": 1518.09,
                                "y1": 510.35,
                                "width": 1219.7,
                                "height": 102.3,
                                "page_width": 1723,
                                "page_height": 2216,
                                "text": "2019 until April 30, 2022 including the Local Union Schedules for Local 527 - Ottawa are incorporated into and form part of this Agreement and shall apply to all work covered by this Agreement subject to the provisions set out below.",
                                "page": 2,
                                "section_ref_id": 5
                            }
                        ]
                    },
                    {
                        "title": "ARTICLE 3 -RESIDENTIAL CONSTRUCTION",
                        "bboxes": [
                            {
                                "x0": 175.37,
                                "y0": 564.12,
                                "x1": 1263.62,
                                "y1": 892.2,
                                "width": 1028.25,
                                "height": 328.08,
                                "page_width": 1723,
                                "page_height": 2216,
                                "page": 2
                            }
                        ],
                        "sections": [
                            {
                                "x0": 206.57,
                                "y0": 627.57,
                                "x1": 1234.82,
                                "y1": 872.2,
                                "width": 1028.25,
                                "height": 244.63,
                                "page_width": 1723,
                                "page_height": 2216,
                                "text": "3.01  Residential construction shall consist of: (i)  Housing Construction consisting of single family and attached wood frame row housing dwellings; or (ii)  High Rise Residential Construction consisting of all residential construction not included in Article 3.01 (i) above.",
                                "page": 2,
                                "section_ref_id": 6
                            }
                        ]
                    },
                    {
                        "title": "ARTICLE 4 -HOUSING CONSTRUCTION The following applies to Housing Construction only as defined in Article 3:",
                        "bboxes": [
                            {
                                "x0": 176.71,
                                "y0": 926.79,
                                "x1": 1457.34,
                                "y1": 1869.05,
                                "width": 1220.63,
                                "height": 942.26,
                                "page_width": 1723,
                                "page_height": 2216,
                                "page": 2
                            }
                        ],
                        "sections": [
                            {
                                "x0": 207.82,
                                "y0": 1060.9,
                                "x1": 1427.02,
                                "y1": 1162.35,
                                "width": 1219.2,
                                "height": 101.45,
                                "page_width": 1723,
                                "page_height": 2216,
                                "text": "4.01  The terms and conditions of the Provincial Collective Agreement as incorporated into this Agreement pursuant to Article 2 shall be applicable, save and except Article 2.05 relating to contracting and subcontracting.",
                                "page": 2,
                                "section_ref_id": 7
                            },
                            {
                                "x0": 209.15,
                                "y0": 1204.87,
                                "x1": 1429.78,
                                "y1": 1269.05,
                                "width": 1220.63,
                                "height": 64.18,
                                "page_width": 1723,
                                "page_height": 2216,
                                "text": "4.02  The regular hours of work are Forty-Two and one-half (42 ) per week.  The regular hours of work shall be scheduled on Monday to Friday, inclusive, from",
                                "page": 2,
                                "section_ref_id": 8
                            },
                            {
                                "x0": 303.48,
                                "y0": 1274.69,
                                "x1": 1524.11,
                                "y1": 1342.38,
                                "width": 1220.63,
                                "height": 67.69,
                                "page_width": 1723,
                                "page_height": 2216,
                                "text": "7:00 a.m. until 4:30 p.m.  Starting time may be varied upon written agreement between the Employer and the Union.",
                                "page": 2,
                                "section_ref_id": 9
                            },
                            {
                                "x0": 210.49,
                                "y0": 1383.54,
                                "x1": 1429.19,
                                "y1": 1481.02,
                                "width": 1218.7,
                                "height": 97.48,
                                "page_width": 1723,
                                "page_height": 2216,
                                "text": "4.03  Hours worked in excess of forty-two and one-half (42 ) hours In any week shall be paid at one and one-half (1 ) times the regular rate. Al1 work performed on Sundays and Statutory Holidays shall be paid at double the regular rate of pay.",
                                "page": 2,
                                "section_ref_id": 10
                            },
                            {
                                "x0": 213.15,
                                "y0": 1526.21,
                                "x1": 1433.76,
                                "y1": 1702.35,
                                "width": 1220.61,
                                "height": 176.14,
                                "page_width": 1723,
                                "page_height": 2216,
                                "text": "4.04  In the event that forty-two and one-half (42 ) hours are not worked between Monday 7:00 a.m. and Friday 4:30 p.m. of each week, make up time may be worked on Saturday of the current work week at the regular rate of pay to a maximum of forty-two and oneMhalf (42 ) hours between 7:00 a.m. and 4:30 p.m. by agreement of the parties.",
                                "page": 2,
                                "section_ref_id": 11
                            },
                            {
                                "x0": 214.49,
                                "y0": 1742.21,
                                "x1": 1434.85,
                                "y1": 1849.05,
                                "width": 1220.36,
                                "height": 106.84,
                                "page_width": 1723,
                                "page_height": 2216,
                                "text": "4.05  The rates of wages shall be as per Schedule \"A\" of this Agreement; Benefits, Pension and Administration Contributions shall be as per Schedule \"B\" of this Agreement.",
                                "page": 2,
                                "section_ref_id": 12
                            }
                        ]
                    },
                    {
                        "title": "ARTICLE 5 -HIGH RISE RESIDENTIAL P.1gc 2 of5 Non-JC) Agreement inclusive of 1111 Rcsilhmtial Constmctiou litli:ctiw Mny 11, 2019 Lo April 301h. 2022-Donm Contmctors l.td.",
                        "bboxes": [
                            {
                                "x0": 167.48,
                                "y0": 1934.78,
                                "x1": 872.8,
                                "y1": 2084.06,
                                "width": 645.32,
                                "height": 149.28,
                                "page_width": 1723,
                                "page_height": 2216,
                                "page": 2
                            },
                            {
                                "x0": 199,
                                "y0": 230.99,
                                "x1": 1477.79,
                                "y1": 960.99,
                                "width": 1218.79,
                                "height": 730,
                                "page_width": 1756,
                                "page_height": 2244,
                                "page": 3
                            }
                        ],
                        "sections": [
                            {
                                "x0": 229.03,
                                "y0": 221.99,
                                "x1": 1447.82,
                                "y1": 467.63,
                                "width": 1218.79,
                                "height": 245.64,
                                "page_width": 1756,
                                "page_height": 2244,
                                "text": "5.01  The following applies to High Rise Residential Construction as defined in Article 3.  The terms  and  conditions of the  Provincial Collective Agreement as incorporated into this Agreement pursuant to Article 2 shall be applicable, including Article 2.05 relating to contracting and subcontracting, which shall be modified and shall not apply to the following work: glazing (window installation), carpet laying, linoleum flooring, drywall, interior painting, acoustic ceiling (ceiling tiles) and plumbing, cabinet installer.",
                                "page": 3,
                                "section_ref_id": 13
                            },
                            {
                                "x0": 229,
                                "y0": 512.96,
                                "x1": 1447.39,
                                "y1": 722.3,
                                "width": 1218.39,
                                "height": 209.34,
                                "page_width": 1756,
                                "page_height": 2244,
                                "text": "5.02  Without limiting the generality of the foregoing, for the purposes of clarity, the subcontractor clause 2.05 of the Provincial Collective Agreement applies in full to all work in connection with site preparation, sewer, water main and drainage installations, utilities, concrete forming (installation and removal of forms), pouring and finishing of concrete, masonry and stone installations, tile and terrazzo, parking lots and parking garages.",
                                "page": 3,
                                "section_ref_id": 14
                            },
                            {
                                "x0": 229,
                                "y0": 767.63,
                                "x1": 1400.82,
                                "y1": 796.63,
                                "width": 1171.82,
                                "height": 29,
                                "page_width": 1756,
                                "page_height": 2244,
                                "text": "5.03  The hours of work shall be as provided in the Provincial Collective Agreement.",
                                "page": 3,
                                "section_ref_id": 15
                            },
                            {
                                "x0": 230.33,
                                "y0": 839.63,
                                "x1": 1448.24,
                                "y1": 940.99,
                                "width": 1217.91,
                                "height": 101.36,
                                "page_width": 1756,
                                "page_height": 2244,
                                "text": "5.04  The rates of wages shall as per Schedule \"A\" of this Agreement; Benefits, Pension and Administration contributions shall be as per Schedule \"B\" of this Agreement.",
                                "page": 3,
                                "section_ref_id": 16
                            }
                        ]
                    },
                    {
                        "title": "ARTICLE 6 -PRECAST WORK",
                        "bboxes": [
                            {
                                "x0": 200.33,
                                "y0": 996.06,
                                "x1": 1479.33,
                                "y1": 1176.96,
                                "width": 1219,
                                "height": 180.9,
                                "page_width": 1756,
                                "page_height": 2244,
                                "page": 3
                            }
                        ],
                        "sections": [
                            {
                                "x0": 230.33,
                                "y0": 1056.66,
                                "x1": 1449.33,
                                "y1": 1156.96,
                                "width": 1219,
                                "height": 100.3,
                                "page_width": 1756,
                                "page_height": 2244,
                                "text": "6.01  Precast workers -The rates of wages and benefits will be as per the Ontario Precast Erection  Provincial  Agreement  for  Precast  Erector,  Welder  and Installation which are incorporated into and form part of this Agreement.",
                                "page": 3,
                                "section_ref_id": 17
                            }
                        ]
                    },
                    {
                        "title": "ARTICLE 7  DURATION",
                        "bboxes": [
                            {
                                "x0": 192.53,
                                "y0": 1213.39,
                                "x1": 1475.98,
                                "y1": 2080.15,
                                "width": 1223.45,
                                "height": 866.76,
                                "page_width": 1756,
                                "page_height": 2244,
                                "page": 3
                            },
                            {
                                "x0": 177.93,
                                "y0": 192.93,
                                "x1": 779.49,
                                "y1": 633.57,
                                "width": 541.56,
                                "height": 440.64,
                                "page_width": 1727,
                                "page_height": 2220,
                                "page": 4
                            }
                        ],
                        "sections": [
                            {
                                "x0": 232.94,
                                "y0": 1270.66,
                                "x1": 1456.39,
                                "y1": 1299.66,
                                "width": 1223.45,
                                "height": 29,
                                "page_width": 1756,
                                "page_height": 2244,
                                "text": "7.01  This Agreement shall become effective the 1st day of May, 2019 and shall",
                                "page": 3,
                                "section_ref_id": 18
                            },
                            {
                                "x0": 326.33,
                                "y0": 1306.63,
                                "x1": 1549.78,
                                "y1": 1335.63,
                                "width": 1223.45,
                                "height": 29,
                                "page_width": 1756,
                                "page_height": 2244,
                                "text": "continue to remain in effect until the 30th of April, 2022 and shall be renewed",
                                "page": 3,
                                "section_ref_id": 19
                            },
                            {
                                "x0": 222.53,
                                "y0": 1342.63,
                                "x1": 1445.98,
                                "y1": 2060.15,
                                "width": 1223.45,
                                "height": 717.52,
                                "page_width": 1756,
                                "page_height": 2244,
                                "text": "triennially thereafter unless either party shall furnish the other with notice of termination, or proposed revision of this Agreement within a period of no more than sixty (60) days before the 30th day of April, 2022 or in a like period in each triennially renewal thereafter. The parties shall convene a meeting within fifteen (15) days to bargain in good faith and make all reasonable efforts to reach an agreement. Dated at Ottawa, Ontario this  / b  day of ~~I.J/i1-'( ' . .,,, I ~ tZo  I LABOlJRRS' INTER~ NAL UNION OF NORTH AMERICA, LOCAL 527 Page 3 of5 Non-IC! Agreement inclusive of :ill Rcsidcntiol Construction Ef!i:ctivc May I\". 2019 to April 30th 2022-Onmn C\"ontmclon. Ltd.",
                                "page": 3,
                                "section_ref_id": 20
                            },
                            {
                                "x0": 207.93,
                                "y0": 405.32,
                                "x1": 749.49,
                                "y1": 613.57,
                                "width": 541.56,
                                "height": 208.25,
                                "page_width": 1727,
                                "page_height": 2220,
                                "text": "2020 2022 Wood frame housing construction four stories and under 80% of the I.C.I. Local 527 wage rates",
                                "page": 4,
                                "section_ref_id": 21
                            }
                        ]
                    },
                    {
                        "title": "All other Classifications",
                        "bboxes": [
                            {
                                "x0": 170.15,
                                "y0": 701.57,
                                "x1": 894.75,
                                "y1": 2078.88,
                                "width": 664.6,
                                "height": 1377.31,
                                "page_width": 1727,
                                "page_height": 2220,
                                "page": 4
                            }
                        ],
                        "sections": []
                    },
                    {
                        "title": "WELFARE, VACATION PAY, ADMINISTRATION, AND UNION DUES, PENSION ' HEAL TH AND SAFETY AND TRI-FUND",
                        "bboxes": [
                            {
                                "x0": 204.14,
                                "y0": 311.01,
                                "x1": 1417.28,
                                "y1": 1164.47,
                                "width": 1153.14,
                                "height": 853.46,
                                "page_width": 1766,
                                "page_height": 2251,
                                "page": 5
                            }
                        ],
                        "sections": [
                            {
                                "x0": 234.14,
                                "y0": 445.85,
                                "x1": 1199.16,
                                "y1": 768.42,
                                "width": 965.02,
                                "height": 322.57,
                                "page_width": 1766,
                                "page_height": 2251,
                                "text": "12.01  The Employer agrees to contribute to the following Funds: CONTRIBUTIONS TO THE May 1, 2018 May 1, 2019  May 1, 2020 May 1, 2021 BENEFIT FUND L.I.U.N.A. Local 527 Labourers Benefit Health and Safety Trust Fund 1.64 1.74  1.84 1.94 L.I.U.N.A. Local 527 Admin. Fund 1.04 1.08  1.08 1.08 L.I.U.N.A. Local 527 Leaal Fund 0.05",
                                "page": 5,
                                "section_ref_id": 22
                            },
                            {
                                "x0": 256.85,
                                "y0": 740.72,
                                "x1": 875.4,
                                "y1": 821.76,
                                "width": 618.55,
                                "height": 81.04,
                                "page_width": 1766,
                                "page_height": 2251,
                                "text": "0.03  0.03 0.03 L.I.U.N.A. Local 527 Scholarship Fund  0.05",
                                "page": 5,
                                "section_ref_id": 23
                            },
                            {
                                "x0": 255.93,
                                "y0": 794.09,
                                "x1": 874.48,
                                "y1": 1035.12,
                                "width": 618.55,
                                "height": 241.03,
                                "page_width": 1766,
                                "page_height": 2251,
                                "text": "0.03  0.03 0.03 L.1.U.N.A. Local 527 Tri-Fund (consisting of L.I.U.N.A. Local 527 LECET Fund, l.l.U.N.A. Local 527 Health and Safety Fund and the l.l.U.N.A. local 527 Tralnina Fund 0.27 0.27  0.27 0.27 Total Contributions to Benefit Plan",
                                "page": 5,
                                "section_ref_id": 24
                            }
                        ]
                    },
                    {
                        "title": "3.289  3.397 3.181",
                        "bboxes": [
                            {
                                "x0": 226.82,
                                "y0": 1126.11,
                                "x1": 705.34,
                                "y1": 1406.14,
                                "width": 418.52,
                                "height": 280.03,
                                "page_width": 1766,
                                "page_height": 2251,
                                "page": 5
                            }
                        ],
                        "sections": [
                            {
                                "x0": 256.82,
                                "y0": 1117.11,
                                "x1": 675.34,
                                "y1": 1303.16,
                                "width": 418.52,
                                "height": 186.05,
                                "page_width": 1766,
                                "page_height": 2251,
                                "text": "3.506 6.32 6.92 Pension Fund 6.52  6.72 0.05  0.05 Canadian Tri-Fund 0.05 0.05 L.I.U.N.A. Ontario Provincial District",
                                "page": 5,
                                "section_ref_id": 25
                            },
                            {
                                "x0": 257.04,
                                "y0": 1303.5,
                                "x1": 675.56,
                                "y1": 1386.14,
                                "width": 418.52,
                                "height": 82.64,
                                "page_width": 1766,
                                "page_height": 2251,
                                "text": "0.40  0.40 0.40 Council 0.40 7.37",
                                "page": 5,
                                "section_ref_id": 26
                            }
                        ]
                    },
                    {
                        "title": "6.97  7.17 Total Contributions to Pension Fund  6.77",
                        "bboxes": [
                            {
                                "x0": 184.86,
                                "y0": 1367.51,
                                "x1": 886.53,
                                "y1": 2056.75,
                                "width": 641.67,
                                "height": 689.24,
                                "page_width": 1766,
                                "page_height": 2251,
                                "page": 5
                            }
                        ],
                        "sections": [
                            {
                                "x0": 214.86,
                                "y0": 1575.84,
                                "x1": 856.53,
                                "y1": 2036.75,
                                "width": 641.67,
                                "height": 460.91,
                                "page_width": 1766,
                                "page_height": 2251,
                                "text": "0.113  0.113 Total Contributions to Industry Fund  0.102 Pngc5 of5 Non-IC! Agrccm.:ut inclusive of all Rcsidcntinl C'1mK11uc1ion",
                                "page": 5,
                                "section_ref_id": 27
                            }
                        ]
                    }
            ]*/
            annotations: [],
            extractTableData: [],
            batchDocsType: "",
            documentUploadingStatus: 'false',
            InViewDocumentId:"",
            partitionPageNumber: "",
            documentInUpload: [

            ],
            currentDocumentTableId: "",
            documentInUploadCount: 0,
            readyDocument: [],
            docData:[],
            uploadingItemsCheck:[],
            uploadNew: false,
            generalDocType: "Agreements",
            openUploadType:0,
            docNavUseCaseEvents:[
                {
                    name: "injestDocument",
                    status: "",
                    step: "",
                    option: "",
                },
                {
                    name: "login",
                    status: "",
                    step: "",
                    option: "",
                },
                {
                    name: "viewDocument",
                    status: "",
                    step: "",
                    option: "",
                }

            ],
        },
        mutations: {
            setDocReady(state, data){

            },
            setDocReadyDoc(state, data){
                state.readyDocument[data.index].doc = data.doc;
            },
            addDocsReady(state, data){
                state.readyDocument = data;
            },
            addUploadDocument(state, data){
                state.documentInUpload.push(data);
                state.documentInUploadCount = state.documentInUploadCount + 1;
            },
            addDocs(state, data){
               state.docs = null;

               state.docs = [...data]

            },
            editDocsScheme(state, data){
                state.docs[data.uuid].uploadId = data.data.id;
                state.docs[data.uuid].uploaded = true;
                state.docs[data.uuid].data = data.data;
            },
            updateDocsClassification(state, data){
                state.docs.forEach(function(el, index){

                    if(el.id == data.id){
                        state.docs[index].data.document_type = data.document_type;
                    }
                });

                //console.log()
                //state.docs[data.id].data.document_type = data.document_type;
                //state.docs[data.uuid].uploaded = true;
                //state.docs[data.uuid].data = data.data;
            },
            updateDocClassification(state, data){
                state.docs.forEach(function(el, index){

                    if(el.id == data.id){
                        state.docs[index].data.document_type = data.document_type;
                    }
                });

                //console.log()
                //state.docs[data.id].data.document_type = data.document_type;
                //state.docs[data.uuid].uploaded = true;
                //state.docs[data.uuid].data = data.data;
            },
            clearDoc(state){
                state.docs = [];
            },
            addExtractedTableData(state, data){
                state.extractTableData = []
                //state.extractTableData = data;
                state.extractTableData.push({...data})

            },
            clearExtractedTableData(state){
                state.extractTableData = [];
            },
            addDocMetaData(state, data){
                state.docs.forEach(function(el, index){
                 //alert("work2")
                    if(el.uploadId == data.uploadId){
                      // alert(data.metadata)
                     //console.log(data.metadata)
                        state.docs[index].metadata = data.metadata;
                    }
                });
            },
            addAnnotations(state, data){
                state.annotations = data;
            },
            pushNewAnnotation(state, data){
                state.annotations.push(data);
            },
            editAnnotations(state, data){
                //state.annotations = data;
                state.annotations.forEach(function(el, index){

                    if(el.id == data.id){
                        state.annotations[index].value = data.value;
                    }
                });
            },
            removeAnnotation(state, data){

                state.annotations.forEach(function(el, index){

                    if(el.id == data.id){

                        state.annotations.splice(index, 1);
                    }
                });
            },
            clearAnnotations(state){
                state.annotations = [];
            },
            changeCurrentTableDocumentId(state, data){
                state.currentDocumentTableId = data;
            },
            resetCurrentTableDocumentId(state, data){
                state.currentDocumentTableId = "";
            },
            changePartitionSectionText(state, data){
                // state.partitions = [];
                //state.partitions[data.partition].sections[data.section][data.prop] = data.value;
                state.partitions.forEach(function(el, index){
                    if(index == data.partition){
                        el.sections.forEach(function(secEl, secIndex){
                            if(secIndex == data.section){
                                secEl[data.prop] = data.value
                            }
                        })
                    }
                })
               // alert(state.partitions[data.partition].sections[data.section][data.prop])
             },
            addPartition(state, data){
               // state.partitions = [];
                state.partitions = [...data];
            },
            pushNewPartition(state, data){
                state.partitions.push(data);
            },
            removePartition(state, data){

                state.partitions.forEach(function(el, index){

                    if(el.id == data.itemId){

                        state.partitions.splice(index, 1);
                    }
                });
            },
            clearPartition(state){
                state.partitions = [];
            },
            /*changePartitionSectionText(state, data){

                state.partitions.forEach(function(el, index){
                    if(el.id == data.bbox){
                      el.sections.filter(function(secEl, secIndex){
                        if(secEl.section_ref_id == data.sectionId){
                            state.partitions[index].sections[secIndex].text = data.value;
                           // vuecomp.setPartitionText(data.bbox);
                           // console.log(  vuecomp.$store.state.partitions[index].id)
                            //alert("okay yes")
                            return;
                        }
                      })
                    }
                })
            },*/
            setPartitionText(state, partitionId){
                state.partitions.forEach(function(el, index){
                    if(el.id == partitionId){
                        state.partitions[index].text = "";
                      el.sections.forEach(function(secEl, secIndex){
                        state.partitions[index].text += secEl.text+"\r\n";
                      })
                      return;
                    }

                })

            },
            changeBatchDocsType(state, data){
                state.batchDocsType = data;
            },
            removereadyDocFromUploading(state, data){
                state.documentInUpload.forEach(function(el, index){

                    if(el.id == data){
                        state.documentInUpload.splice(index, 1);
                    }
                });

            },
            removereadyDocsFromUploading(state){

            },
            resetAddUploadDocument(state, data){
                state.documentInUpload = [];
            },
            setDocumentUploadingStatus(state, data){
                state.documentUploadingStatus = data;
            },
            setInViewDocumentId(state, data){

                state.InViewDocumentId =data;

            },
            clearInViewDocumentId(state){

                state.InViewDocumentId ="";
            },
            setPartitionPageNumber(state, data){

                state.partitionPageNumber =data;

            },
            clearPartitionPageNumber(state){

                state.partitionPageNumber ="";
            },
            setDocNavUseCaseEvents(state, data){
                state.docNavUseCaseEvents.forEach(function(el, index){
                    if(el.name == data.useCase){
                        state.docNavUseCaseEvents[index].step = data.step;
                        state.docNavUseCaseEvents[index].option = data.option;
                    }
                })
            }
        },
    getters: {
        getReadyDocById: (state) => (id) => {

            return state.readyDocument.filter(function(el){
                    return el.id == id;
                });
        },
    },
    actions: {
        removeAddUploadDocuments({commit }){
            commit("removeAddUploadDocuments");
        },
        setDocReadyDoc({commit}, data){
            commit("setDocReadyDoc", data);
        },
        removereadyDocsFromUploading({commit}){
            commit("removereadyDocsFromUploading");
        },
        removereadyDocFromUploading({commit}, data){
            commit("removereadyDocFromUploading", data);
        },
        setInViewDocumentId({commit}, data){
            commit("setInViewDocumentId", data);
        },
        clearInViewDocumentId({commit}){
            commit("setInViewDocumentId");
        },
        addDocs({commit}, data){
            commit("addDocs", data);
        },
        editDocsScheme({commit}, data){
            commit("editDocsScheme", data);
        },
        clearDoc({commit}){
            commit("clearDoc");
        },
        updateDocsClassification({commit},data){
            commit("updateDocsClassification", data);
        },
        updateDocClassification({commit},data){
            commit("updateDocsClassification", data);
        },
        addPartition({commit},data){
            commit("addPartition", data);
        },
        pushNewPartition({commit},data){
            commit("pushNewPartition", data);
        },
        clearPartition({commit},data){
            commit("clearPartition", data);
        },
        removePartition({commit},data){
            commit("removePartition", data);
        },
        /*changePartitionSectionText({commit},data){
            commit("changePartitionSectionText", data);
        },*/
        setPartitionText({commit},data){
            commit("setPartitionText", data);
        },
        changeBatchDocsType({commit},data){
            commit("changeBatchDocsType", data);
        },
        addDocMetaData({commit},data){
            commit("addDocMetaData", data);
        },
        setPartitionPageNumber({commit},data){

            commit("setPartitionPageNumber", data);

        },
        clearPartitionPageNumber({commit}){

            commit("clearPartitionPageNumber");
        },
        changePartitionSectionText({commit}, data){

            commit("changePartitionSectionText", data);
        },
        addAnnotations({commit},data){
            commit("addAnnotations", data);
        },
        pushNewAnnotation({commit},data){
            commit("pushNewAnnotation", data);
        },
        clearAnnotations({commit}){
            commit("clearAnnotations");
        },
        removeAnnotation({commit},data){
            commit("removeAnnotation", data);
        },
        editAnnotations({commit},data){
            commit("editAnnotations", data);
        },
        addExtractedTableData({commit},data){
            commit("addExtractedTableData", data);
        },
        clearExtractedTableData({commit}){
            commit("clearExtractedTableData");
        },
        changeCurrentTableDocumentId({commit}, data){
            commit("changeCurrentTableDocumentId", data);
        },
    },
    plugins: [vuexLocal.plugin]
});
export default  documentController;
