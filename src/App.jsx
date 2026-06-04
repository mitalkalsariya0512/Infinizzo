import React, { useState, useEffect, useMemo } from "react";

// ─── UPDATED DATA FROM LATEST MASTERSHEET ───
const DEFAULT_POST_EDITORS = [
  { name: "Dharmesh", target: 46, achieved: 86, extra: 24, total: 110, regularTarget: 192, dailyTarget: 9, clients: ["Amardeep Aggregates","VIMS","Svarnabhumi","Maximus","Conical","Shreedhaa Festival"], daily: [4,7,9,9,0,3,6,8,9,0,8,0,8,6,1,4,1,8,0,0,6,9,0,4,0,0,0,0,0,0,0] },
  { name: "Pradip", target: 72, achieved: 77, extra: 40, total: 117, regularTarget: 192, dailyTarget: 9, clients: ["Prakash Pump","Aadhar","Lotus Hospital","Sequra India","Vision Power","Secure Invest","Nilkanth","Unique Resort"], daily: [3,10,10,7,0,4,0,2,7,5,8,0,14,6,3,11,4,10,0,2,0,2,9,0,0,0,0,0,0,0,0] },
  { name: "Kushani", target: 82, achieved: 99, extra: 33, total: 132, regularTarget: 192, dailyTarget: 9, clients: ["Ambica","Protolight","Neo Paint","Gwolts","JD Chem/SSC","Efra","Irani"], daily: [7,7,0,4,0,4,8,10,10,8,3,0,7,10,6,1,0,6,0,2,8,8,10,6,7,0,0,0,0,0,0] },
  { name: "Aashlesha", target: 82, achieved: 116, extra: 20, total: 136, regularTarget: 192, dailyTarget: 9, clients: ["Miro Tech","Jayam Chemicals","Jatson","Surya Hospital","Maniratna","KBC","Akshar","INFINIZZO","Astek"], daily: [6,1,13,12,0,7,11,0,9,8,2,0,9,6,0,5,3,8,0,5,4,13,0,4,13,0,0,0,0,0,0] }
];

const DEFAULT_VIDEO_EDITORS = [
  { name: "Keyur", target: 28, achieved: 23, extra: 9, total: 32, clients: ["Iranis Dental","Sagwan"], daily: [0,0,0,5,0,1,3,0,0,0,2,0,2,0,0,4,4,3,0,2,4,0,2,0,0,0,0,0,0,0,0] },
  { name: "Kaushik", target: 28, achieved: 3, extra: 2, total: 5, clients: ["Amardeep","VIMS","Jayam Chemical","Maximus","Dr. Sanjeev Desai","KBC"], daily: [0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,2,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0] },
  { name: "Kinjal", target: 50, achieved: 36, extra: 8, total: 44, clients: ["Sunny Parekh","Lotus Hospital","Shreedhaa","Nilkanth","Conical Gaufres","Svarnabhumi"], daily: [2,7,5,0,0,0,3,2,3,0,0,0,1,0,3,0,3,3,0,1,2,3,1,3,2,0,0,0,0,0,0] },
  { name: "Mandar", target: 56, achieved: 32, extra: 4, total: 36, clients: ["Maniratna","Kairavee","Sagwan Furniture","Ambica","Vision Power","Jatson Power","Sequra India","Surya Hospital"], daily: [5,1,0,1,0,2,0,1,3,1,0,0,4,5,1,2,2,1,0,2,1,2,1,0,1,0,0,0,0,0,0] },
  { name: "Ronit", target: 24, achieved: 36, extra: 10, total: 46, clients: ["Secure Invest","Akshar Dental","Unique Resort","Miro Tech"], daily: [7,0,0,3,0,2,2,2,4,3,2,0,0,3,2,0,3,4,0,1,3,3,2,0,0,0,0,0,0,0,0] }
];

const DEFAULT_STOCK_DATA = [
  { client:"Akshar Dental", postRemaining:9, videoRemaining:6, totalApproved:25, totalUploaded:10, totalTarget:12, totalRemaining:15, priority:"SAFE", toProduce:0 },
  { client:"Shreedhaa", postRemaining:6, videoRemaining:0, totalApproved:8, totalUploaded:2, totalTarget:12, totalRemaining:6, priority:"SAFE", toProduce:4 },
  { client:"VIMS", postRemaining:6, videoRemaining:0, totalApproved:15, totalUploaded:9, totalTarget:12, totalRemaining:6, priority:"SAFE", toProduce:0 },
  { client:"Sequra India", postRemaining:0, videoRemaining:0, totalApproved:4, totalUploaded:4, totalTarget:16, totalRemaining:0, priority:"URGENT", toProduce:12 },
  { client:"Conical Gaufres", postRemaining:6, videoRemaining:2, totalApproved:28, totalUploaded:20, totalTarget:22, totalRemaining:8, priority:"SAFE", toProduce:0 },
  { client:"Secure Invest", postRemaining:0, videoRemaining:1, totalApproved:3, totalUploaded:2, totalTarget:6, totalRemaining:1, priority:"URGENT", toProduce:3 },
  { client:"Miro Tech", postRemaining:6, videoRemaining:1, totalApproved:15, totalUploaded:8, totalTarget:12, totalRemaining:7, priority:"SAFE", toProduce:0 },
  { client:"Jayam Chemical", postRemaining:17, videoRemaining:0, totalApproved:31, totalUploaded:13, totalTarget:16, totalRemaining:18, priority:"SAFE", toProduce:0 },
  { client:"Dr. Sanjeev Desai", postRemaining:0, videoRemaining:5, totalApproved:8, totalUploaded:3, totalTarget:6, totalRemaining:5, priority:"SAFE", toProduce:0 },
  { client:"Astek", postRemaining:8, videoRemaining:0, totalApproved:22, totalUploaded:14, totalTarget:16, totalRemaining:8, priority:"SAFE", toProduce:0 },
  { client:"Maniratna Ornaments", postRemaining:10, videoRemaining:2, totalApproved:27, totalUploaded:15, totalTarget:14, totalRemaining:12, priority:"SAFE", toProduce:0 },
  { client:"Infinizzo", postRemaining:0, videoRemaining:0, totalApproved:5, totalUploaded:4, totalTarget:6, totalRemaining:1, priority:"URGENT", toProduce:1 },
  { client:"Amardeep Aggregates", postRemaining:1, videoRemaining:0, totalApproved:7, totalUploaded:6, totalTarget:12, totalRemaining:1, priority:"URGENT", toProduce:5 },
  { client:"Nilkanth", postRemaining:6, videoRemaining:6, totalApproved:25, totalUploaded:13, totalTarget:14, totalRemaining:12, priority:"SAFE", toProduce:0 },
  { client:"Unique Resort", postRemaining:14, videoRemaining:3, totalApproved:31, totalUploaded:14, totalTarget:14, totalRemaining:17, priority:"SAFE", toProduce:0 },
  { client:"Sunny Parekh", postRemaining:1, videoRemaining:4, totalApproved:19, totalUploaded:14, totalTarget:16, totalRemaining:5, priority:"SAFE", toProduce:0 },
  { client:"Jatson Power", postRemaining:0, videoRemaining:0, totalApproved:10, totalUploaded:10, totalTarget:14, totalRemaining:0, priority:"URGENT", toProduce:4 },
  { client:"Swarnabhumi", postRemaining:10, videoRemaining:0, totalApproved:18, totalUploaded:8, totalTarget:16, totalRemaining:10, priority:"SAFE", toProduce:0 },
  { client:"KBC", postRemaining:1, videoRemaining:2, totalApproved:12, totalUploaded:9, totalTarget:13, totalRemaining:3, priority:"LOW", toProduce:1 },
  { client:"Lotus Hospital", postRemaining:7, videoRemaining:1, totalApproved:21, totalUploaded:13, totalTarget:14, totalRemaining:8, priority:"SAFE", toProduce:0 },
  { client:"Aadhar", postRemaining:0, videoRemaining:2, totalApproved:13, totalUploaded:11, totalTarget:10, totalRemaining:2, priority:"LOW", toProduce:0 },
  { client:"Prakash Pumps", postRemaining:8, videoRemaining:1, totalApproved:19, totalUploaded:10, totalTarget:12, totalRemaining:9, priority:"SAFE", toProduce:0 },
  { client:"Vision Power", postRemaining:5, videoRemaining:-1, totalApproved:14, totalUploaded:10, totalTarget:14, totalRemaining:4, priority:"SAFE", toProduce:0 },
  { client:"Protolight", postRemaining:7, videoRemaining:5, totalApproved:20, totalUploaded:8, totalTarget:10, totalRemaining:12, priority:"SAFE", toProduce:0 },
  { client:"Ambica Elastic", postRemaining:4, videoRemaining:1, totalApproved:17, totalUploaded:12, totalTarget:14, totalRemaining:5, priority:"SAFE", toProduce:0 },
  { client:"Neo Paints", postRemaining:14, videoRemaining:0, totalApproved:22, totalUploaded:8, totalTarget:10, totalRemaining:14, priority:"SAFE", toProduce:0 },
  { client:"Gwolts", postRemaining:10, videoRemaining:0, totalApproved:22, totalUploaded:12, totalTarget:16, totalRemaining:10, priority:"SAFE", toProduce:0 },
  { client:"JD Chem/SSE", postRemaining:11, videoRemaining:0, totalApproved:6, totalUploaded:0, totalTarget:16, totalRemaining:6, priority:"SAFE", toProduce:10 },
  { client:"Surya Hospital", postRemaining:0, videoRemaining:1, totalApproved:10, totalUploaded:9, totalTarget:12, totalRemaining:1, priority:"URGENT", toProduce:2 },
  { client:"Iranis", postRemaining:1, videoRemaining:2, totalApproved:19, totalUploaded:16, totalTarget:16, totalRemaining:3, priority:"LOW", toProduce:0 },
  { client:"Efra", postRemaining:3, videoRemaining:1, totalApproved:15, totalUploaded:11, totalTarget:10, totalRemaining:4, priority:"SAFE", toProduce:0 },
  { client:"Kairavee", postRemaining:2, videoRemaining:0, totalApproved:11, totalUploaded:9, totalTarget:12, totalRemaining:2, priority:"LOW", toProduce:1 },
  { client:"Maximus Storage", postRemaining:1, videoRemaining:3, totalApproved:16, totalUploaded:12, totalTarget:12, totalRemaining:4, priority:"SAFE", toProduce:0 },
  { client:"Sagwan Furniture", postRemaining:0, videoRemaining:0, totalApproved:7, totalUploaded:7, totalTarget:12, totalRemaining:0, priority:"URGENT", toProduce:5 },
];

const DEFAULT_SHOOT_SCHEDULE = [
  { client: "Kairavee", date: "Apr 3", type: "Site Shoot", status: "Completed", person: "Kaushik" },
  { client: "Lotus Hospital", date: "Mar 4", type: "Speech", status: "Completed", person: "Kaushik" },
  { client: "Maniratna", date: "Jul 30", type: "Product", status: "Completed", person: "Kaushik" },
  { client: "Nilkanth", date: "Sep 22", type: "Speech", status: "Completed", person: "Ronit" },
  { client: "Sagwan Furniture", date: "Apr 14", type: "Product", status: "Completed", person: "Keyur" },
  { client: "Sunny Parekh", date: "Aug 1", type: "General", status: "Completed", person: "Keyur" },
  { client: "Sequra India", date: "May 17", type: "Product, Scripted", status: "Completed", person: "Kaushik" },
  { client: "VIMS", date: "Jun 23", type: "Speech", status: "Completed", person: "Keyur" },
  { client: "Jayam Chemicals", date: "18th", type: "Product", status: "TBD", person: "Kaushik" },
  { client: "Shreedhaa", date: "6-7th", type: "General", status: "Cancelled", person: "Kaushik" }
];

const DEFAULT_CLIENT_REPORT = [
  { client:"Akshar Dental", person:"Aashlesha / Ronit", smm:"Mital", posts:0, videos:11, target:12, total:11, status:"Achieved", pending:0 },
  { client:"Shreedhaa", person:"Kinjal/Dharmesh", smm:"Mital", posts:0, videos:2, target:12, total:2, status:"Behind", pending:12 },
  { client:"Sequra India", person:"Pradip/Mandar", smm:"Mital", posts:0, videos:5, target:12, total:5, status:"Behind", pending:5 },
  { client:"VIMS", person:"Dharmesh/Kaushik", smm:"Mital", posts:6, videos:4, target:12, total:10, status:"Achieved", pending:0 },
  { client:"Conical Gaufres", person:"Dharmesh/Kinjal", smm:"Mital", posts:14, videos:6, target:22, total:20, status:"Achieved", pending:0 },
  { client:"Secure Invest", person:"Pradip/Ronit", smm:"Mital", posts:1, videos:6, target:10, total:7, status:"Achieved", pending:0 },
  { client:"Miro Tech", person:"Aashlesha/Ronit", smm:"Mital", posts:7, videos:3, target:12, total:10, status:"Achieved", pending:0 },
  { client:"Astek Electricals", person:"Aashlesha", smm:"Mital", posts:13, videos:1, target:16, total:14, status:"Achieved", pending:0 },
  { client:"Jayam Chemical", person:"Aashlesha/Kaushik", smm:"Mital", posts:14, videos:0, target:16, total:14, status:"Achieved", pending:0 },
  { client:"Dr. Sanjeev Desai", person:"Aashlesha/Kaushik", smm:"Mital", posts:0, videos:5, target:6, total:5, status:"Achieved", pending:0 },
  { client:"Maniratna Ornaments", person:"Kaushik/Aashlesha", smm:"Mital", posts:14, videos:1, target:16, total:15, status:"Achieved", pending:0 },
  { client:"Infinizzo", person:"Aashlesha/Mandar", smm:"Mital", posts:5, videos:0, target:6, total:5, status:"Achieved", pending:0 },
  { client:"Amardeep Aggregates", person:"Dharmesh/Kaushik", smm:"Dipen", posts:6, videos:0, target:12, total:6, status:"Behind", pending:4 },
  { client:"Nilkanth", person:"Pradip/Kinjal", smm:"Dipen", posts:12, videos:2, target:14, total:14, status:"Achieved", pending:0 },
  { client:"Unique Resort", person:"Pradip/Ronit", smm:"Dipen", posts:13, videos:2, target:14, total:15, status:"Achieved", pending:0 },
  { client:"Sunny Parekh", person:"Kinjal", smm:"Dipen", posts:3, videos:13, target:16, total:16, status:"Achieved", pending:0 },
  { client:"Jatson Power", person:"Aashlesha/Mandar", smm:"Dipen", posts:9, videos:2, target:10, total:11, status:"Achieved", pending:0 },
  { client:"Swarnabhumi", person:"Dharmesh/Kinjal", smm:"Dipen", posts:7, videos:1, target:16, total:8, status:"Behind", pending:6 },
  { client:"KBC", person:"Dharmesh/Kaushik", smm:"Dipen", posts:8, videos:2, target:13, total:10, status:"Achieved", pending:0 },
  { client:"Lotus Hospital", person:"Pradip/Kinjal", smm:"Dipen", posts:7, videos:7, target:14, total:14, status:"Achieved", pending:0 },
  { client:"Aadhar", person:"Pradip/Kaushik", smm:"Dipen", posts:11, videos:0, target:12, total:11, status:"Achieved", pending:0 },
  { client:"Prakash Pumps", person:"Pradip", smm:"Dipen", posts:10, videos:0, target:12, total:10, status:"Achieved", pending:0 },
  { client:"Vision Power", person:"Pradip/Mandar", smm:"Dipen", posts:10, videos:2, target:14, total:12, status:"Achieved", pending:0 },
  { client:"Protolight", person:"Kushani/Kaushik", smm:"Dipen", posts:10, videos:0, target:10, total:10, status:"Achieved", pending:0 },
  { client:"Ambica Elastic", person:"Kushani/Mandar", smm:"Dipen", posts:9, videos:3, target:14, total:12, status:"Achieved", pending:0 },
  { client:"Neo Paints", person:"Kushani", smm:"Dipen", posts:9, videos:0, target:10, total:9, status:"Achieved", pending:0 },
  { client:"Gwolts", person:"Kushani", smm:"Dipen", posts:15, videos:0, target:16, total:15, status:"Achieved", pending:0 },
  { client:"JD Chem/SSE", person:"Kushani", smm:"Dipen", posts:7, videos:0, target:8, total:7, status:"Achieved", pending:0 },
  { client:"Surya Hospital", person:"Aashlesha/Mandar", smm:"Dipen", posts:9, videos:1, target:12, total:10, status:"Achieved", pending:0 },
  { client:"Iranis", person:"Kushani/Keyur", smm:"Dipen", posts:5, videos:12, target:16, total:17, status:"Achieved", pending:0 },
  { client:"Efra", person:"Kushani/Kaushik", smm:"Dipen", posts:9, videos:1, target:12, total:10, status:"Achieved", pending:0 },
  { client:"Kairavee", person:"Mandar/Kaushik", smm:"Dipen", posts:1, videos:9, target:12, total:10, status:"Achieved", pending:0 },
  { client:"Maximus Storage", person:"Dharmesh/Mandar", smm:"Dipen", posts:12, videos:0, target:14, total:12, status:"Achieved", pending:0 },
  { client:"Sagwan Furniture", person:"Keyur/Kaushik", smm:"Dipen", posts:0, videos:8, target:12, total:8, status:"Behind", pending:2 },
];

const DEFAULT_SOCIAL_MEDIA = [
  { client:"Akshar Dental", smm:"Mital", postTarget:0, postApproved:0, postUploaded:0, videoTarget:12, videoApproved:11, videoUploaded:11, totalTarget:12, totalUploaded:11 },
  { client:"VIMS", smm:"Mital", postTarget:6, postApproved:6, postUploaded:6, videoTarget:6, videoApproved:4, videoUploaded:4, totalTarget:12, totalUploaded:10 },
  { client:"Sequra India", smm:"Mital", postTarget:4, postApproved:0, postUploaded:0, videoTarget:12, videoApproved:5, videoUploaded:5, totalTarget:16, totalUploaded:5 },
  { client:"Conical Gaufres", smm:"Mital", postTarget:12, postApproved:14, postUploaded:14, videoTarget:10, videoApproved:6, videoUploaded:6, totalTarget:22, totalUploaded:20 },
  { client:"Secure Invest", smm:"Mital", postTarget:6, postApproved:1, postUploaded:1, videoTarget:6, videoApproved:6, videoUploaded:6, totalTarget:12, totalUploaded:7 },
  { client:"Miro Tech", smm:"Mital", postTarget:8, postApproved:7, postUploaded:7, videoTarget:4, videoApproved:3, videoUploaded:3, totalTarget:12, totalUploaded:10 },
  { client:"Shreedhaa", smm:"Mital", postTarget:0, postApproved:0, postUploaded:0, videoTarget:12, videoApproved:2, videoUploaded:2, totalTarget:12, totalUploaded:2 },
  { client:"Jayam Chemical", smm:"Mital", postTarget:12, postApproved:14, postUploaded:14, videoTarget:4, videoApproved:0, videoUploaded:0, totalTarget:16, totalUploaded:14 },
  { client:"Astek Electricals", smm:"Mital", postTarget:12, postApproved:13, postUploaded:13, videoTarget:4, videoApproved:1, videoUploaded:1, totalTarget:16, totalUploaded:14 },
  { client:"Dr. Sanjeev Desai", smm:"Mital", postTarget:0, postApproved:0, postUploaded:0, videoTarget:6, videoApproved:5, videoUploaded:5, totalTarget:6, totalUploaded:5 },
  { client:"Maniratna Ornaments", smm:"Mital", postTarget:10, postApproved:14, postUploaded:14, videoTarget:4, videoApproved:1, videoUploaded:1, totalTarget:14, totalUploaded:15 },
  { client:"Infinizzo", smm:"Mital", postTarget:0, postApproved:0, postUploaded:0, videoTarget:6, videoApproved:5, videoUploaded:5, totalTarget:6, totalUploaded:5 },
  { client:"Amardeep Aggregates", smm:"Dipen", postTarget:8, postApproved:6, postUploaded:6, videoTarget:4, videoApproved:0, videoUploaded:0, totalTarget:12, totalUploaded:6 },
  { client:"Nilkanth", smm:"Dipen", postTarget:8, postApproved:17, postUploaded:12, videoTarget:6, videoApproved:0, videoUploaded:2, totalTarget:14, totalUploaded:14 },
  { client:"Unique Resort", smm:"Dipen", postTarget:10, postApproved:13, postUploaded:13, videoTarget:4, videoApproved:4, videoUploaded:2, totalTarget:14, totalUploaded:15 },
  { client:"Sunny Parekh", smm:"Dipen", postTarget:0, postApproved:3, postUploaded:3, videoTarget:16, videoApproved:13, videoUploaded:13, totalTarget:16, totalUploaded:16 },
  { client:"Jatson Power", smm:"Dipen", postTarget:6, postApproved:9, postUploaded:9, videoTarget:4, videoApproved:2, videoUploaded:2, totalTarget:10, totalUploaded:11 },
  { client:"Swarnabhumi", smm:"Dipen", postTarget:10, postApproved:12, postUploaded:7, videoTarget:6, videoApproved:1, videoUploaded:1, totalTarget:16, totalUploaded:8 },
  { client:"KBC", smm:"Dipen", postTarget:8, postApproved:8, postUploaded:8, videoTarget:5, videoApproved:3, videoUploaded:2, totalTarget:13, totalUploaded:10 },
  { client:"Lotus Hospital", smm:"Dipen", postTarget:10, postApproved:7, postUploaded:7, videoTarget:8, videoApproved:7, videoUploaded:7, totalTarget:18, totalUploaded:14 },
  { client:"Aadhar", smm:"Dipen", postTarget:10, postApproved:11, postUploaded:11, videoTarget:0, videoApproved:0, videoUploaded:0, totalTarget:10, totalUploaded:11 },
  { client:"Prakash Pumps", smm:"Dipen", postTarget:12, postApproved:10, postUploaded:10, videoTarget:0, videoApproved:0, videoUploaded:0, totalTarget:12, totalUploaded:10 },
  { client:"Vision Power", smm:"Dipen", postTarget:10, postApproved:10, postUploaded:10, videoTarget:4, videoApproved:2, videoUploaded:2, totalTarget:14, totalUploaded:12 },
  { client:"Protolight", smm:"Dipen", postTarget:10, postApproved:10, postUploaded:10, videoTarget:0, videoApproved:0, videoUploaded:0, totalTarget:10, totalUploaded:10 },
  { client:"Ambica Elastic", smm:"Dipen", postTarget:10, postApproved:9, postUploaded:9, videoTarget:4, videoApproved:3, videoUploaded:3, totalTarget:14, totalUploaded:12 },
  { client:"Neo Paints", smm:"Dipen", postTarget:10, postApproved:9, postUploaded:9, videoTarget:0, videoApproved:0, videoUploaded:0, totalTarget:10, totalUploaded:9 },
  { client:"Gwolts", smm:"Dipen", postTarget:16, postApproved:15, postUploaded:15, videoTarget:0, videoApproved:0, videoUploaded:0, totalTarget:16, totalUploaded:15 },
  { client:"JD Chem/SSE", smm:"Dipen", postTarget:16, postApproved:7, postUploaded:7, videoTarget:0, videoApproved:0, videoUploaded:0, totalTarget:16, totalUploaded:7 },
  { client:"Surya Hospital", smm:"Dipen", postTarget:8, postApproved:9, postUploaded:9, videoTarget:4, videoApproved:1, videoUploaded:1, totalTarget:12, totalUploaded:10 },
  { client:"Iranis", smm:"Dipen", postTarget:6, postApproved:0, postUploaded:5, videoTarget:10, videoApproved:12, videoUploaded:12, totalTarget:16, totalUploaded:17 },
  { client:"Efra", smm:"Dipen", postTarget:10, postApproved:9, postUploaded:9, videoTarget:2, videoApproved:1, videoUploaded:1, totalTarget:12, totalUploaded:10 },
  { client:"Kairavee", smm:"Dipen", postTarget:0, postApproved:3, postUploaded:1, videoTarget:12, videoApproved:9, videoUploaded:9, totalTarget:12, totalUploaded:10 },
  { client:"Maximus Storage", smm:"Dipen", postTarget:10, postApproved:12, postUploaded:12, videoTarget:2, videoApproved:0, videoUploaded:0, totalTarget:12, totalUploaded:12 },
  { client:"Sagwan Furniture", smm:"Dipen", postTarget:0, postApproved:0, postUploaded:0, videoTarget:12, videoApproved:8, videoUploaded:8, totalTarget:12, totalUploaded:8 },
];

// ─── GOOGLE SHEETS JSON API ───
// Uses /gviz/tq?tqx=out:json&sheet=TAB_NAME — most reliable method
const fetchSheetJSON = async (sheetId, tabName) => {
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(tabName)}`;
  try {
    const res = await fetch(url);
    if (!res.ok) { console.log(`[CRM] ✗ Fetch failed for "${tabName}": ${res.status}`); return null; }
    let text = await res.text();
    // Google wraps JSON in: google.visualization.Query.setResponse({...})
    const match = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);?$/);
    if (match) text = match[1];
    const json = JSON.parse(text);
    if (!json.table || !json.table.rows) { console.log(`[CRM] ✗ No table data for "${tabName}"`); return null; }
    
    // Extract headers from cols
    const headers = (json.table.cols || []).map(c => (c.label || '').trim());
    // Extract rows
    const rows = json.table.rows.map(r => {
      return (r.c || []).map(cell => {
        if (!cell) return '';
        return cell.v !== null && cell.v !== undefined ? cell.v : (cell.f || '');
      });
    });
    
    console.log(`[CRM] ✓ "${tabName}": ${rows.length} rows, ${headers.length} cols`);
    return { headers, rows };
  } catch(e) {
    console.error(`[CRM] ✗ Error fetching "${tabName}":`, e.message);
    return null;
  }
};

const toNum = (v) => { const n = parseFloat(v); return isNaN(n) ? 0 : n; };
const toStr = (v) => (v && v !== 'undefined' && v !== 'null' && v !== 'None') ? String(v).trim() : '';

// ─── SHEET PARSERS (from JSON rows) ───
const parseEditorFromJSON = (data) => {
  if (!data) return [];
  const { rows } = data;
  const knownEditors = ['dharmesh','pradip','kushani','aashlesha','keyur','kaushik','kinjal','mandar','ronit','krushang'];
  let currentEditor = null;
  const editorsMap = {};
  
  for (const row of rows) {
    const col0 = toStr(row[0]);
    const col1 = toStr(row[1]);
    const col0Lower = col0.toLowerCase();
    const col1Lower = col1.toLowerCase();
    
    // Skip remark/extra rows
    if (col1Lower === 'remark' || col1Lower === 'extra') continue;
    
    // TOTAL ROW — only source for daily values
    if (col1Lower === 'total' && currentEditor && editorsMap[currentEditor]) {
      editorsMap[currentEditor].target = toNum(row[2]);
      const daily = [];
      let total = 0;
      for (let d = 0; d < 31; d++) { const val = toNum(row[3 + d]); daily.push(val); total += val; }
      editorsMap[currentEditor].daily = daily;
      editorsMap[currentEditor].total = total;
      editorsMap[currentEditor].achieved = total;
      continue;
    }
    
    // Skip empty rows and day headers
    if (col0 === '' && col1 === '') continue;
    
    // Editor name detection
    const isEditor = col0 !== '' && (
      knownEditors.some(e => col0Lower.includes(e)) ||
      (col0Lower !== 'editor' && col0Lower !== 'daily report' && col0Lower !== 'total' &&
       col0.length > 2 && col0.length < 30 && isNaN(Number(col0)) &&
       !col0.includes('Target') && !col0.includes('Cumulative'))
    );
    
    if (isEditor) {
      currentEditor = col0;
      if (!editorsMap[currentEditor]) {
        editorsMap[currentEditor] = { name: currentEditor, clients: [], daily: Array(31).fill(0), total: 0, target: 0, achieved: 0, extra: 0, regularTarget: 192 };
      }
      if (col1 && col1Lower !== 'total' && col1Lower !== 'remark' && col1Lower !== 'extra') {
        editorsMap[currentEditor].clients.push(col1);
      }
      continue;
    }
    
    // Client row — name only
    if (currentEditor && col1 && col1.length < 50 && !['total','remark','extra','monthly summary'].includes(col1Lower) && !col1.includes('Target')) {
      editorsMap[currentEditor].clients.push(col1);
    }
  }
  return Object.values(editorsMap);
};

const parseClientFromJSON = (data) => {
  if (!data) return [];
  const { rows } = data;
  const results = [];
  for (const row of rows) {
    const client = toStr(row[3]) || toStr(row[2]) || toStr(row[1]);
    if (!client || client.toLowerCase() === 'total' || client.toLowerCase() === 'client') continue;
    results.push({
      client, person: toStr(row[1]) || "Unassigned", smm: toStr(row[2]) || "Unassigned",
      posts: toNum(row[6]), videos: toNum(row[7]), target: toNum(row[8]),
      total: toNum(row[9]), status: toStr(row[10]) || "Pending",
      remark: toStr(row[11]), pending: toNum(row[12]),
    });
  }
  return results;
};

const parseStockFromJSON = (data) => {
  if (!data) return [];
  const { rows } = data;
  const results = [];
  for (const row of rows) {
    const client = toStr(row[3]) || toStr(row[2]);
    if (!client || client.toLowerCase() === 'total' || client.toLowerCase() === 'client') continue;
    let priority = toStr(row[22]) || "SAFE";
    priority = priority.replace(/[🟢🔴🟡\s]/g, '').trim() || "SAFE";
    results.push({
      client, postRemaining: toNum(row[9]), videoRemaining: toNum(row[16]),
      totalApproved: toNum(row[19]), totalUploaded: toNum(row[20]),
      totalTarget: toNum(row[18]), totalRemaining: toNum(row[21]),
      priority, toProduce: toNum(row[23]),
    });
  }
  return results;
};

const parseShootFromJSON = (data) => {
  if (!data) return [];
  const { rows } = data;
  const results = [];
  for (const row of rows) {
    const client = toStr(row[1]) || toStr(row[0]);
    if (!client || client.toLowerCase() === 'client') continue;
    results.push({
      client, date: toStr(row[2]) || "TBD",
      person: toStr(row[5]) || "Unassigned", type: toStr(row[6]) || "-",
      status: toStr(row[7]) || "Pending",
    });
  }
  return results;
};

const parseSMMFromJSON = (data) => {
  if (!data) return [];
  const { rows } = data;
  const results = [];
  for (const row of rows) {
    const client = toStr(row[2]) || toStr(row[1]);
    if (!client || client.toLowerCase() === 'total' || client.toLowerCase() === 'client') continue;
    results.push({
      editor: toStr(row[0]) || "Unassigned", client, smm: toStr(row[1]) || "Unassigned",
      postTarget: toNum(row[3]), postApproved: toNum(row[4]), postUploaded: toNum(row[5]),
      postPending: toNum(row[6]), videoTarget: toNum(row[7]), videoApproved: toNum(row[8]),
      videoUploaded: toNum(row[9]), videoPending: toNum(row[10]),
      totalTarget: toNum(row[11]), totalUploaded: toNum(row[12]),
    });
  }
  return results;
};

const parseCalendarFromJSON = (data) => {
  if (!data) return [];
  const { rows } = data;
  const results = [];
  for (const row of rows) {
    const client = toStr(row[0]);
    if (!client || client.toLowerCase() === 'client') continue;
    results.push({
      client, target: toNum(row[1]),
      days: Array.from({length:31}, (_,i) => { const v = toStr(row[2+i]); return v || null; }),
    });
  }
  return results;
};

// ─── HELPER COMPONENTS ───
function DonutChart({ value, max, size = 80, color = "#DC2626", label, isDark }) {
  const pct = Math.min((value / max) * 100, 100);
  const r = (size - 10) / 2; const c = 2 * Math.PI * r; const offset = c - (pct / 100) * c;
  return (<div className="flex flex-col items-center"><svg width={size} height={size} className="-rotate-90"><circle cx={size/2} cy={size/2} r={r} fill="none" stroke={isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)"} strokeWidth="6" /><circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="6" strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round" className="transition-all duration-700" /></svg><span className="text-xs mt-1 opacity-60">{label}</span></div>);
}

function MiniBar({ value, max, color = "#DC2626" }) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  return (<div className="w-full h-2 rounded-full overflow-hidden bg-slate-200 dark:bg-white/10"><div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: color }} /></div>);
}

function KPICard({ label, value, sub, icon, accent = false }) {
  return (<div className={`rounded-xl p-4 border ${accent ? 'border-red-200 bg-red-50 dark:border-red-500/30 dark:bg-red-500/5' : 'border-slate-200 bg-white shadow-sm dark:shadow-none dark:border-white/5 dark:bg-white/[0.02]'}`}><div className="flex items-center justify-between mb-2"><span className="text-xs uppercase tracking-widest text-slate-500 dark:text-zinc-400">{label}</span><span className="text-lg opacity-80">{icon}</span></div><div className={`text-2xl font-bold ${accent ? 'text-red-600 dark:text-red-400' : 'text-slate-900 dark:text-white'}`}>{value}</div>{sub && <div className="text-xs mt-1 text-slate-500 dark:text-zinc-500">{sub}</div>}</div>);
}

function StatusBadge({ status }) {
  const s = status ? status.toString().trim() : "";
  if (s.includes("Achieved") || s.includes("Completed") || s.includes("SAFE")) return <span className="text-[10px] px-2 py-0.5 rounded-full border bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30">{s}</span>;
  if (s.includes("Behind") || s.includes("URGENT")) return <span className="text-[10px] px-2 py-0.5 rounded-full border bg-red-100 text-red-700 border-red-200 dark:bg-red-500/20 dark:text-red-400 dark:border-red-500/30">{s}</span>;
  if (s.includes("Cancelled")) return <span className="text-[10px] px-2 py-0.5 rounded-full border bg-slate-100 text-slate-700 border-slate-200 dark:bg-zinc-500/20 dark:text-zinc-400 dark:border-zinc-500/30">{s}</span>;
  return <span className="text-[10px] px-2 py-0.5 rounded-full border bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/30">{s || "Pending"}</span>;
}

const NAV = [
  { id: "overview", label: "Overview", icon: "◎" },
  { id: "employees", label: "Team Performance", icon: "◆" },
  { id: "tasks", label: "Task Management", icon: "▦" },
  { id: "content", label: "Content Production", icon: "▶" },
  { id: "social", label: "Social Media", icon: "◈" },
  { id: "stock", label: "Stock / Assets", icon: "▣" },
  { id: "shoots", label: "Shoot Schedule", icon: "◉" },
  { id: "clients", label: "Client Reports", icon: "◇" },
  { id: "calendar", label: "Upload Calendar", icon: "▤" },
  { id: "sync", label: "Month Manager", icon: "📅" },
];

// ─── MAIN DASHBOARD ───
export default function App() {
  const [activeSection, setActiveSection] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDark, setIsDark] = useState(true);
  const [data, setData] = useState({ clients: DEFAULT_CLIENT_REPORT, shoots: DEFAULT_SHOOT_SCHEDULE, postEditors: DEFAULT_POST_EDITORS, videoEditors: DEFAULT_VIDEO_EDITORS, stock: DEFAULT_STOCK_DATA, uploadCalendar: [], contentPlanner: [], socialMedia: DEFAULT_SOCIAL_MEDIA });

  // ─── MONTH CONFIGURATION SYSTEM ───
  const DEFAULT_MONTHS = [
    {
      id: "apr2026",
      label: "April 2026",
      sheetId: "1VatxpyfzKj-UujrInEx3-iWUdTK_PeVUa57ZKTOupZ4",
      tabs: {
        postTeam: "Daily Report - Post Team",
        videoTeam: "Daily Report - Video Team",
        stockData: "Stock",
        socialMedia: "Social Media Team Report",
        shootSchedule: "Shoot Schedule",
        clientReport: "Client Report.",
        uploadCalendar: "Uploading Calender",
        contentPlanner: "Content Planner_Post",
      }
    }
  ];

  const [months, setMonths] = useState(() => {
    try {
      const saved = localStorage.getItem('INFINIZZO_months_v2');
      if (saved) { const parsed = JSON.parse(saved); if (parsed.length > 0) return parsed; }
    } catch(e) {}
    return DEFAULT_MONTHS;
  });

  const [activeMonthId, setActiveMonthId] = useState(() => {
    try {
      const saved = localStorage.getItem('INFINIZZO_active_month');
      if (saved) return saved;
    } catch(e) {}
    return DEFAULT_MONTHS[DEFAULT_MONTHS.length - 1].id;
  });

  const [newMonth, setNewMonth] = useState({ label: "", sheetId: "", tabs: { postTeam:"Daily Report - Post Team", videoTeam:"Daily Report - Video Team", stockData:"Stock", socialMedia:"Social Media Team Report", shootSchedule:"Shoot Schedule", clientReport:"Client Report.", uploadCalendar:"Uploading Calender", contentPlanner:"Content Planner_Post" } });

  const activeMonth = months.find(m => m.id === activeMonthId) || months[0];

  // Full sync function using JSON API
  const doFullSync = async (month) => {
    const sid = month.sheetId;
    const tabs = month.tabs;
    const newData = { ...data };
    let anySuccess = false;
    console.log(`[CRM] Starting JSON sync for ${month.label}...`);

    const clientData = await fetchSheetJSON(sid, tabs.clientReport);
    if (clientData) { const r = parseClientFromJSON(clientData); if (r.length > 0) { newData.clients = r; anySuccess = true; } }

    const stockData = await fetchSheetJSON(sid, tabs.stockData);
    if (stockData) { const r = parseStockFromJSON(stockData); if (r.length > 0) { newData.stock = r; anySuccess = true; } }

    const shootData = await fetchSheetJSON(sid, tabs.shootSchedule);
    if (shootData) { const r = parseShootFromJSON(shootData); if (r.length > 0) { newData.shoots = r; anySuccess = true; } }

    const postData = await fetchSheetJSON(sid, tabs.postTeam);
    if (postData) { const r = parseEditorFromJSON(postData); if (r.length > 0) { newData.postEditors = r; anySuccess = true; } }

    const videoData = await fetchSheetJSON(sid, tabs.videoTeam);
    if (videoData) { const r = parseEditorFromJSON(videoData); if (r.length > 0) { newData.videoEditors = r; anySuccess = true; } }

    const calData = await fetchSheetJSON(sid, tabs.uploadCalendar);
    if (calData) { const r = parseCalendarFromJSON(calData); if (r.length > 0) { newData.uploadCalendar = r; anySuccess = true; } }

    const planData = await fetchSheetJSON(sid, tabs.contentPlanner);
    if (planData) { const r = parseEditorFromJSON(planData); if (r.length > 0) { newData.contentPlanner = r; anySuccess = true; } }

    const smmData = await fetchSheetJSON(sid, tabs.socialMedia);
    if (smmData) { const r = parseSMMFromJSON(smmData); if (r.length > 0) { newData.socialMedia = r; anySuccess = true; } }

    setData(newData);
    if (anySuccess) setLastSynced(new Date());
    console.log(`[CRM] Sync done. Success: ${anySuccess} | Clients: ${newData.clients.length} | Stock: ${newData.stock.length} | PostEditors: ${newData.postEditors.length}`);
    return anySuccess;
  };

  const switchMonth = (monthId) => {
    const month = months.find(m => m.id === monthId);
    if (!month) return;
    setActiveMonthId(monthId);
    localStorage.setItem('INFINIZZO_active_month', monthId);
    setSyncStatus({ loading: true, message: `Loading ${month.label}...`, error: false });
    doFullSync(month).then(success => {
      setSyncStatus({ loading: false, message: success ? `Live — ${month.label}` : "Using saved data", error: !success });
    });
  };

  const addMonth = () => {
    if (!newMonth.label || !newMonth.sheetId) return;
    const id = newMonth.label.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
    const updated = [...months, { id, label: newMonth.label, sheetId: newMonth.sheetId, tabs: newMonth.tabs }];
    setMonths(updated);
    localStorage.setItem('INFINIZZO_months_v2', JSON.stringify(updated));
    setNewMonth({ label: "", sheetId: "", tabs: { postTeam:"Daily Report - Post Team", videoTeam:"Daily Report - Video Team", stockData:"Stock", socialMedia:"Social Media Team Report", shootSchedule:"Shoot Schedule", clientReport:"Client Report.", uploadCalendar:"Uploading Calender", contentPlanner:"Content Planner_Post" } });
  };

  const deleteMonth = (monthId) => {
    if (months.length <= 1) return;
    const updated = months.filter(m => m.id !== monthId);
    setMonths(updated);
    localStorage.setItem('INFINIZZO_months_v2', JSON.stringify(updated));
    if (activeMonthId === monthId) switchMonth(updated[0].id);
  };

  // Auto-sync on mount
  useEffect(() => {
    setSyncStatus({ loading: true, message: "Connecting to Google Sheets...", error: false });
    doFullSync(activeMonth).then(success => {
      setSyncStatus({ loading: false, message: success ? `Live — ${activeMonth.label}` : "Using saved data", error: false });
    }).catch(err => {
      console.error("[CRM] Auto-sync error:", err);
      setSyncStatus({ loading: false, message: "Using saved data", error: false });
    });
  }, []);

  const syncData = async () => {
    setSyncStatus({ loading: true, message: "Fetching live data...", error: false });
    const success = await doFullSync(activeMonth);
    setSyncStatus({ loading: false, message: success ? "Sync successful!" : "Sync failed — check console", error: !success });
    if (success) setTimeout(() => setSyncStatus({ loading: false, message: `Live — ${activeMonth.label}`, error: false }), 3000);
  };
  const [syncStatus, setSyncStatus] = useState({ loading: false, message: "Using saved data", error: false });
  const [initialSyncDone, setInitialSyncDone] = useState(false);
  const [lastSynced, setLastSynced] = useState(null);

  // Full sync function
  // ─── THEME ───
  const t = isDark ? {
    bg: '#0A0A0C', card: '#14141A', cardBorder: 'rgba(255,255,255,0.05)', text: '#E8E8EC', textMuted: '#71717A', textDim: '#52525B',
    sidebar: '#0E0E12', headerBg: 'rgba(10,10,12,0.9)', hoverBg: 'rgba(255,255,255,0.05)',
    inputBg: 'rgba(0,0,0,0.3)', inputBorder: 'rgba(255,255,255,0.1)',
    redBg: 'rgba(220,38,38,0.05)', redBorder: 'rgba(220,38,38,0.3)', greenBg: 'rgba(16,185,129,0.05)', greenBorder: 'rgba(16,185,129,0.3)',
    amberBg: 'rgba(245,158,11,0.05)', amberBorder: 'rgba(245,158,11,0.2)', slateBg: 'rgba(113,113,122,0.05)', slateBorder: 'rgba(113,113,122,0.2)',
    barEmpty: 'rgba(255,255,255,0.1)', barTrack: 'rgba(255,255,255,0.04)',
    activeNavBg: 'rgba(220,38,38,0.1)', activeNavText: '#F87171', navText: '#A1A1AA',
    badgeGreen: 'rgba(16,185,129,0.2)', badgeGreenText: '#34D399', badgeRed: 'rgba(220,38,38,0.2)', badgeRedText: '#F87171',
    badgeAmber: 'rgba(245,158,11,0.2)', badgeAmberText: '#FBBF24', badgeSlate: 'rgba(113,113,122,0.2)', badgeSlateText: '#A1A1AA',
    shadow: 'none', kanbanCard: 'rgba(0,0,0,0.3)',
  } : {
    bg: '#F8FAFC', card: '#FFFFFF', cardBorder: '#E2E8F0', text: '#0F172A', textMuted: '#64748B', textDim: '#94A3B8',
    sidebar: '#FFFFFF', headerBg: 'rgba(255,255,255,0.9)', hoverBg: '#F1F5F9',
    inputBg: '#F1F5F9', inputBorder: '#CBD5E1',
    redBg: '#FEF2F2', redBorder: '#FECACA', greenBg: '#F0FDF4', greenBorder: '#BBF7D0',
    amberBg: '#FFFBEB', amberBorder: '#FDE68A', slateBg: '#F8FAFC', slateBorder: '#E2E8F0',
    barEmpty: '#E2E8F0', barTrack: 'rgba(0,0,0,0.05)',
    activeNavBg: '#FEF2F2', activeNavText: '#DC2626', navText: '#64748B',
    badgeGreen: '#DCFCE7', badgeGreenText: '#15803D', badgeRed: '#FEE2E2', badgeRedText: '#B91C1C',
    badgeAmber: '#FEF3C7', badgeAmberText: '#B45309', badgeSlate: '#F1F5F9', badgeSlateText: '#64748B',
    shadow: '0 1px 3px rgba(0,0,0,0.08)', kanbanCard: '#FFFFFF',
  };

  // ─── THEMED COMPONENTS ───
  const TCard = ({children, style={}}) => <div style={{background:t.card,border:`1px solid ${t.cardBorder}`,borderRadius:12,padding:'16px 20px',boxShadow:t.shadow,...style}}>{children}</div>;
  const TBadge = ({status}) => {
    const s = status ? status.toString().trim() : "";
    let bg=t.badgeAmber, fg=t.badgeAmberText;
    if(s.includes("Achieved")||s.includes("Completed")||s.includes("SAFE")){bg=t.badgeGreen;fg=t.badgeGreenText;}
    else if(s.includes("Behind")||s.includes("URGENT")){bg=t.badgeRed;fg=t.badgeRedText;}
    else if(s.includes("Cancelled")){bg=t.badgeSlate;fg=t.badgeSlateText;}
    return <span style={{fontSize:10,fontWeight:700,padding:'2px 8px',borderRadius:20,background:bg,color:fg,whiteSpace:'nowrap'}}>{s||"Pending"}</span>;
  };
  const TBar = ({value, max, color="#DC2626"}) => {
    const pct=max>0?Math.min((value/max)*100,100):0;
    return <div style={{width:'100%',height:8,borderRadius:8,overflow:'hidden',background:t.barEmpty}}><div style={{height:'100%',borderRadius:8,width:`${pct}%`,background:color,transition:'width 0.5s'}}/></div>;
  };
  const TKPI = ({label,value,sub,icon,accent}) => (
    <div style={{borderRadius:12,padding:'14px 16px',border:`1px solid ${accent?t.redBorder:t.cardBorder}`,background:accent?t.redBg:t.card,boxShadow:t.shadow}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}><span style={{fontSize:10,textTransform:'uppercase',letterSpacing:1.5,color:t.textMuted}}>{label}</span><span style={{fontSize:16,opacity:0.7}}>{icon}</span></div>
      <div style={{fontSize:24,fontWeight:700,color:accent?'#DC2626':t.text}}>{value}</div>
      {sub&&<div style={{fontSize:11,color:t.textDim,marginTop:4}}>{sub}</div>}
    </div>
  );

  const refreshData = syncData;

  const totalPostOutput = data.postEditors.reduce((s, e) => s + e.total, 0);
  const totalVideoOutput = data.videoEditors.reduce((s, e) => s + e.total, 0);
  const totalOutput = totalPostOutput + totalVideoOutput;
  const totalClients = data.clients.length;
  const totalEmployees = new Set([...data.postEditors.map(e => e.name), ...data.videoEditors.map(e => e.name)]).size;
  const achievedClients = data.clients.filter(c => c.status === "Achieved").length;
  const behindClients = data.clients.filter(c => c.status === "Behind").length;
  const urgentStock = data.stock.filter(s => s.priority === "URGENT").length;
  const safeStock = data.stock.filter(s => s.priority === "SAFE").length;
  const totalSMTarget = data.socialMedia.reduce((s, c) => s + (c.totalTarget || 0), 0);
  const totalSMUploaded = data.socialMedia.reduce((s, c) => s + (c.totalUploaded || 0), 0);
  const ALL_EDITORS = [...data.postEditors.map(e => ({ ...e, dept: 'Post' })), ...data.videoEditors.map(e => ({ ...e, dept: 'Video' }))];

  return (
    <div style={{display:'flex',height:'100vh',width:'100%',overflow:'hidden',background:t.bg,color:t.text,fontFamily:"'DM Sans','Segoe UI',system-ui,sans-serif",transition:'all 0.3s'}}>
      {/* SIDEBAR */}
      <aside style={{width:sidebarOpen?220:64,flexShrink:0,transition:'width 0.3s',display:'flex',flexDirection:'column',background:t.sidebar,borderRight:`1px solid ${t.cardBorder}`}}>
        <div style={{padding:'16px',display:'flex',alignItems:'center',gap:10,borderBottom:`1px solid ${t.cardBorder}`}}>
          <div style={{width:32,height:32,borderRadius:8,background:'#DC2626',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:900,fontSize:14}}>I</div>
          {sidebarOpen && <span style={{fontWeight:700,fontSize:13,letterSpacing:1}}>INFINIZZO</span>}
        </div>
        <nav style={{flex:1,padding:'8px 0',overflowY:'auto'}}>
          {NAV.map(item => (
            <button key={item.id} onClick={() => setActiveSection(item.id)}
              style={{width:'100%',display:'flex',alignItems:'center',gap:10,padding:'9px 16px',border:'none',borderRight:activeSection===item.id?'2px solid #DC2626':'2px solid transparent',background:activeSection===item.id?t.activeNavBg:'transparent',color:activeSection===item.id?t.activeNavText:t.navText,fontSize:13,cursor:'pointer',textAlign:'left',transition:'all 0.15s'}}>
              <span style={{fontSize:15}}>{item.icon}</span>
              {sidebarOpen && <span style={{overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{item.label}</span>}
            </button>
          ))}
        </nav>
        {/* REFRESH BUTTON */}
        {sidebarOpen && (
          <div style={{padding:'0 12px'}}>
            <button onClick={refreshData} disabled={syncStatus.loading}
              style={{width:'100%',margin:'4px 0',padding:'10px',border:'none',borderRadius:10,background:'#DC2626',color:'#fff',fontSize:12,fontWeight:700,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:6,opacity:syncStatus.loading?0.6:1,transition:'all 0.2s'}}>
              {syncStatus.loading ? '↻ Syncing...' : '🔄 Refresh data'}
            </button>
            {lastSynced && (
              <div style={{fontSize:9,color:t.textDim,textAlign:'center',marginTop:4,lineHeight:1.4}}>
                Last updated:<br/>
                <span style={{fontWeight:600,color:t.textMuted}}>
                  {lastSynced.toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'})} · {lastSynced.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:true})}
                </span>
              </div>
            )}
          </div>
        )}
        {!sidebarOpen && (
          <button onClick={refreshData} disabled={syncStatus.loading}
            style={{margin:'8px',padding:'8px',border:'none',borderRadius:8,background:'#DC2626',color:'#fff',fontSize:14,cursor:'pointer',opacity:syncStatus.loading?0.6:1}}>
            🔄
          </button>
        )}
        {/* CREDIT */}
        {sidebarOpen && (
          <div style={{padding:'10px 14px',borderTop:`1px solid ${t.cardBorder}`,fontSize:9,color:t.textDim,lineHeight:1.5}}>
            <div style={{fontWeight:600,color:t.textMuted,fontSize:10,marginBottom:2}}>Created by</div>
            <div style={{fontSize:11,fontWeight:700,color:'#DC2626'}}>Mital Kalsariya</div>
            <div style={{marginTop:2,opacity:0.6}}>INFINIZZO Digital Solutions</div>
          </div>
        )}
        <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{padding:10,borderTop:`1px solid ${t.cardBorder}`,background:'transparent',border:'none',borderTop:`1px solid ${t.cardBorder}`,color:t.textMuted,fontSize:11,cursor:'pointer'}}>
          {sidebarOpen ? '◂ Collapse' : '▸'}
        </button>
      </aside>

      {/* MAIN */}
      <main style={{flex:1,overflowY:'auto',position:'relative'}}>
        <header style={{position:'sticky',top:0,zIndex:10,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 24px',borderBottom:`1px solid ${t.cardBorder}`,background:t.headerBg,backdropFilter:'blur(12px)'}}>
          <div>
            <h1 style={{fontSize:17,fontWeight:700,margin:0}}>{NAV.find(n => n.id === activeSection)?.label}</h1>
            <p style={{fontSize:11,color:t.textMuted,margin:'2px 0 0'}}>{activeMonth.label} · INFINIZZO CRM Dashboard</p>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:14}}>
            {/* MONTH SELECTOR */}
            <select value={activeMonthId} onChange={(e) => switchMonth(e.target.value)}
              style={{padding:'5px 10px',fontSize:11,fontWeight:600,borderRadius:8,border:`1px solid ${t.cardBorder}`,background:t.card,color:'#DC2626',cursor:'pointer',minWidth:120}}>
              {months.map(m => <option key={m.id} value={m.id}>{m.label}</option>)}
            </select>
            <button onClick={() => setIsDark(!isDark)} style={{padding:'5px 12px',fontSize:11,fontWeight:700,borderRadius:8,border:`1px solid ${t.cardBorder}`,background:t.card,color:t.text,cursor:'pointer',display:'flex',alignItems:'center',gap:4}}>
              {isDark ? "☀ Light" : "☾ Dark"}
            </button>
            <div style={{display:'flex',alignItems:'center',gap:6,fontSize:11}}>
              <span style={{width:7,height:7,borderRadius:'50%',background:syncStatus.loading?'#F59E0B':syncStatus.error?'#DC2626':'#10B981',animation:syncStatus.loading?'':'none'}} />
              <span style={{color:t.textMuted}}>
                {syncStatus.loading ? 'Syncing...' : syncStatus.message || 'Live'}
                {lastSynced && !syncStatus.loading && <span style={{opacity:0.5,marginLeft:4}}>· {lastSynced.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit',hour12:true})}</span>}
              </span>
            </div>
            <div style={{width:30,height:30,borderRadius:'50%',background:'#DC2626',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:11,fontWeight:700}}>A</div>
          </div>
        </header>

        <div style={{padding:24}}>

            {/* ═══ DATA SYNC ═══ */}
            {activeSection === "sync" && (
              <div className="max-w-3xl mx-auto space-y-6">
                {/* CURRENT MONTH */}
                <div className="rounded-xl p-6 border border-slate-200 bg-white shadow-sm dark:shadow-none dark:border-white/5 dark:bg-white/[0.02]">
                  <h2 className="text-xl font-bold mb-1">📅 Month Manager</h2>
                  <p className="text-sm opacity-70 mb-6">Switch between months or add new monthly sheets. Each month connects to its own Google Sheet.</p>

                  <div className="space-y-3 mb-6">
                    {months.map(m => (
                      <div key={m.id} style={{display:'flex',alignItems:'center',gap:12,padding:'12px 16px',borderRadius:10,background:m.id===activeMonthId?'rgba(220,38,38,0.05)':'transparent',border:`1px solid ${m.id===activeMonthId?'rgba(220,38,38,0.2)':'rgba(0,0,0,0.05)'}`}}>
                        <div style={{width:10,height:10,borderRadius:'50%',background:m.id===activeMonthId?'#DC2626':'#D1D5DB',flexShrink:0}}/>
                        <div style={{flex:1}}>
                          <div style={{fontWeight:600,fontSize:14,color:m.id===activeMonthId?'#DC2626':undefined}}>{m.label}</div>
                          <div style={{fontSize:10,opacity:0.5,fontFamily:'monospace',marginTop:2}}>Sheet: {m.sheetId.substring(0,20)}...</div>
                        </div>
                        <button onClick={() => switchMonth(m.id)} style={{padding:'5px 14px',borderRadius:6,border:'1px solid #DC2626',background:m.id===activeMonthId?'#DC2626':'transparent',color:m.id===activeMonthId?'#fff':'#DC2626',fontSize:11,fontWeight:600,cursor:'pointer'}}>{m.id===activeMonthId?'✓ Active':'Switch'}</button>
                        {months.length > 1 && <button onClick={() => deleteMonth(m.id)} style={{padding:'5px 10px',borderRadius:6,border:'1px solid rgba(0,0,0,0.1)',background:'transparent',color:'#999',fontSize:11,cursor:'pointer'}}>✕</button>}
                      </div>
                    ))}
                  </div>

                  {/* SYNC BUTTON */}
                  <div className="flex items-center gap-4 mb-4">
                    <button onClick={syncData} disabled={syncStatus.loading} className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">{syncStatus.loading ? "↻ Syncing..." : `🔄 Sync ${activeMonth.label}`}</button>
                    {syncStatus.message && <span className={`text-sm font-bold bg-slate-50 dark:bg-black/30 px-4 py-2 rounded-lg ${syncStatus.error ? 'text-red-500' : 'text-emerald-600 dark:text-emerald-400'}`}>{syncStatus.message}</span>}
                  </div>
                </div>

                {/* ADD NEW MONTH */}
                <div className="rounded-xl p-6 border border-slate-200 bg-white shadow-sm dark:shadow-none dark:border-white/5 dark:bg-white/[0.02]">
                  <h3 className="text-lg font-bold mb-1">➕ Add new month</h3>
                  <p className="text-sm opacity-70 mb-4">Create a new Google Sheet with the same tab structure, share it as "Anyone with the link", then paste the details below.</p>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider mb-1 text-red-600">Month name</label>
                      <input type="text" value={newMonth.label} onChange={e => setNewMonth({...newMonth, label: e.target.value})} placeholder="May 2026" className="w-full bg-slate-100 dark:bg-black/30 border border-slate-300 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-red-500" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider mb-1 text-red-600">Google Sheet ID</label>
                      <input type="text" value={newMonth.sheetId} onChange={e => setNewMonth({...newMonth, sheetId: e.target.value})} placeholder="Paste the ID from the URL: docs.google.com/spreadsheets/d/THIS_PART/edit" className="w-full bg-slate-100 dark:bg-black/30 border border-slate-300 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-red-500" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        {key:"postTeam",label:"Post Team Tab Name"},
                        {key:"videoTeam",label:"Video Team Tab Name"},
                        {key:"stockData",label:"Stock Tab Name"},
                        {key:"socialMedia",label:"Social Media Tab Name"},
                        {key:"shootSchedule",label:"Shoot Schedule Tab Name"},
                        {key:"clientReport",label:"Client Report Tab Name"},
                        {key:"uploadCalendar",label:"Upload Calendar Tab Name"},
                        {key:"contentPlanner",label:"Content Planner Tab Name"},
                      ].map(f => (
                        <div key={f.key}>
                          <label className="block text-[10px] font-bold uppercase tracking-wider mb-1 text-slate-500">{f.label}</label>
                          <input type="text" value={newMonth.tabs[f.key]} onChange={e => setNewMonth({...newMonth, tabs: {...newMonth.tabs, [f.key]: e.target.value}})} placeholder={f.label} className="w-full bg-slate-100 dark:bg-black/30 border border-slate-300 dark:border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500" />
                        </div>
                      ))}
                    </div>
                    <button onClick={addMonth} style={{width:'100%',padding:'12px',borderRadius:10,border:'none',background:'#DC2626',color:'#fff',fontSize:13,fontWeight:700,cursor:'pointer',marginTop:8}}>Add month to dashboard</button>
                  </div>
                </div>

                {/* INSTRUCTIONS */}
                <div className="rounded-xl p-5 border border-amber-200 bg-amber-50 dark:border-amber-500/20 dark:bg-amber-500/5 text-sm text-amber-800 dark:text-amber-400">
                  <h4 className="font-bold mb-2">How to add a new month:</h4>
                  <div style={{lineHeight:1.8}}>
                    1. Duplicate your mastersheet for the new month (keep same tab names)<br/>
                    2. Share it: <strong>Share → Anyone with the link → Viewer</strong><br/>
                    3. Copy the Sheet ID from the URL (between /d/ and /edit)<br/>
                    4. Tab names are pre-filled — only change if your tabs are named differently<br/>
                    5. Fill in the form above and click "Add month"
                  </div>
                </div>
              </div>
            )}

            {/* ═══ OVERVIEW ═══ */}
            {activeSection === "overview" && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                  <KPICard label="Team Members" value={totalEmployees} sub="Post + Video teams" icon="◆" />
                  <KPICard label="Total Clients" value={totalClients} sub={`${achievedClients} on target`} icon="◇" />
                  <KPICard label="Total Output" value={totalOutput} sub={`${totalPostOutput} posts · ${totalVideoOutput} videos`} icon="▶" accent />
                  <KPICard label="Behind Schedule" value={behindClients} sub={`of ${totalClients} clients`} icon="▲" />
                  <KPICard label="Urgent Stock" value={urgentStock} sub={`${safeStock} clients safe`} icon="▣" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="rounded-xl p-5 border border-slate-200 bg-white shadow-sm dark:shadow-none dark:border-white/5 dark:bg-white/[0.02]">
                    <h3 className="text-sm font-semibold mb-4 opacity-70">Content split</h3>
                    <div className="flex items-center justify-center gap-8">
                      <DonutChart value={totalPostOutput} max={totalOutput} size={100} color="#DC2626" label={`Posts: ${totalPostOutput}`} isDark={isDark} />
                      <DonutChart value={totalVideoOutput} max={totalOutput} size={100} color="#F97316" label={`Videos: ${totalVideoOutput}`} isDark={isDark} />
                    </div>
                    <div className="mt-4 text-center text-xs opacity-40">Posts dominate at {totalOutput > 0 ? Math.round(totalPostOutput/totalOutput*100) : 0}% of total output</div>
                  </div>
                  <div className="rounded-xl p-5 border border-slate-200 bg-white shadow-sm dark:shadow-none dark:border-white/5 dark:bg-white/[0.02]">
                    <h3 className="text-sm font-semibold mb-4 opacity-70">Client status breakdown</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3"><span className="text-xs w-16 text-right opacity-50">Achieved</span><MiniBar value={achievedClients} max={totalClients} color="#10B981" /><span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{achievedClients}</span></div>
                      <div className="flex items-center gap-3"><span className="text-xs w-16 text-right opacity-50">Behind</span><MiniBar value={behindClients} max={totalClients} color="#DC2626" /><span className="text-sm font-bold text-red-600 dark:text-red-400">{behindClients}</span></div>
                    </div>
                    <div className="mt-4 p-3 rounded-lg bg-red-50 border-red-100 text-red-700 dark:bg-red-500/5 dark:border-red-500/10 text-xs dark:text-red-300">⚠ {totalClients > 0 ? Math.round(behindClients/totalClients*100) : 0}% clients are behind schedule</div>
                  </div>
                  <div className="rounded-xl p-5 border border-slate-200 bg-white shadow-sm dark:shadow-none dark:border-white/5 dark:bg-white/[0.02]">
                    <h3 className="text-sm font-semibold mb-4 opacity-70">Stock health</h3>
                    <div className="space-y-3">
                      {[{ label: "Safe", count: safeStock, color: "#10B981" },{ label: "Urgent", count: urgentStock, color: "#DC2626" },{ label: "Low Stock", count: data.stock.filter(s => s.priority === "LOW").length, color: "#F59E0B" }].map(item => (
                        <div key={item.label} className="flex items-center gap-3"><span className="text-xs w-16 text-right opacity-50">{item.label}</span><MiniBar value={item.count} max={data.stock.length} color={item.color} /><span className="text-sm font-bold" style={{ color: item.color }}>{item.count}</span></div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="rounded-xl p-5 border border-slate-200 bg-white shadow-sm dark:shadow-none dark:border-white/5 dark:bg-white/[0.02]">
                  <h3 className="text-sm font-semibold mb-4 opacity-70">Daily output trend (post team — April)</h3>
                  <div className="flex items-end gap-1 h-32">
                    {Array.from({length: 22}, (_, i) => { const dayTotal = data.postEditors.reduce((s, e) => s + (e.daily[i] || 0), 0); const h = Math.max(4, (dayTotal / 40) * 100);
                      return (<div key={i} className="flex-1 flex flex-col items-center gap-1 group"><span className="text-[9px] opacity-0 group-hover:opacity-100 text-red-600 dark:text-red-400 transition-opacity">{dayTotal}</span><div className="w-full rounded-t transition-all duration-300 group-hover:opacity-100 opacity-70" style={{ height: `${h}%`, background: dayTotal === 0 ? (isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)') : `linear-gradient(to top, #DC2626, #EF4444)` }} /><span className="text-[8px] opacity-30">{i + 1}</span></div>);
                    })}
                  </div>
                </div>
                <div className="rounded-xl p-5 border border-amber-200 bg-amber-50 dark:border-amber-500/20 dark:bg-amber-500/5">
                  <h3 className="text-sm font-semibold mb-3 text-amber-700 dark:text-amber-400">AI insights and recommendations</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-white shadow-sm dark:shadow-none dark:bg-black/30 text-slate-700 dark:text-[#E8E8EC]"><span className="text-red-600 dark:text-red-400 font-semibold">Bottleneck:</span> Kaushik (Video) has low outputs compared to targets — severely underperforming or overloaded with shoots</div>
                    <div className="p-3 rounded-lg bg-white shadow-sm dark:shadow-none dark:bg-black/30 text-slate-700 dark:text-[#E8E8EC]"><span className="text-amber-600 dark:text-amber-400 font-semibold">Risk:</span> {urgentStock} clients have URGENT stock status and need immediate content production</div>
                    <div className="p-3 rounded-lg bg-white shadow-sm dark:shadow-none dark:bg-black/30 text-slate-700 dark:text-[#E8E8EC]"><span className="text-emerald-600 dark:text-emerald-400 font-semibold">Top performer:</span> Aashlesha and Kushani lead post production output, exceeding client targets consistently</div>
                    <div className="p-3 rounded-lg bg-white shadow-sm dark:shadow-none dark:bg-black/30 text-slate-700 dark:text-[#E8E8EC]"><span className="text-blue-600 dark:text-blue-400 font-semibold">Pattern:</span> Output drops significantly on weekends and Sundays — consider redistributing weekly targets</div>
                  </div>
                </div>
              </div>
            )}

            {/* ═══ EMPLOYEES ═══ */}
            {activeSection === "employees" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {[{title:"Post team leaderboard",editors:data.postEditors,maxTarget:192,color1:"#10B981",color2:"#DC2626"},{title:"Video team leaderboard",editors:data.videoEditors,maxTarget:96,color1:"#F97316",color2:"#DC2626"}].map(team=>(
                    <div key={team.title} className="rounded-xl p-5 border border-slate-200 bg-white shadow-sm dark:shadow-none dark:border-white/5 dark:bg-white/[0.02]">
                      <h3 className="text-sm font-semibold mb-4 opacity-70">{team.title}</h3>
                      <div className="space-y-3">
                        {[...team.editors].sort((a, b) => b.total - a.total).map((e, i) => { const pct = Math.round((e.total / (e.target||team.maxTarget)) * 100); return (
                          <div key={e.name} className="flex items-center gap-3">
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-amber-500 text-white dark:text-black' : i === 1 ? 'bg-slate-400 text-white dark:bg-zinc-400 dark:text-black' : 'bg-slate-200 text-slate-600 dark:bg-zinc-700 dark:text-zinc-300'}`}>{i + 1}</span>
                            <div className="flex-1"><div className="flex justify-between items-center mb-1"><span className="text-sm font-medium">{e.name}</span><span className="text-xs opacity-50">{e.total}/{e.target||team.maxTarget} ({pct}%)</span></div><MiniBar value={e.total} max={e.target||team.maxTarget} color={pct > 50 ? team.color1 : team.color2} /></div>
                          </div>); })}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl p-5 border border-slate-200 bg-white shadow-sm dark:shadow-none dark:border-white/5 dark:bg-white/[0.02] overflow-x-auto">
                  <h3 className="text-sm font-semibold mb-4 opacity-70">Day-wise activity heatmap (post team)</h3>
                  <div className="min-w-[600px]">
                    {data.postEditors.map(e => (<div key={e.name} className="flex items-center gap-2 mb-1"><span className="text-xs w-20 text-right opacity-50 flex-shrink-0">{e.name}</span><div className="flex gap-[2px] flex-1">{e.daily.slice(0, 31).map((v, d) => (<div key={d} className="flex-1 h-5 rounded-sm transition-all" title={`Day ${d+1}: ${v}`} style={{ background: v === 0 ? (isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.05)') : `rgba(220,38,38,${Math.min(v / 14, 1)})` }} />))}</div></div>))}
                    <div className="flex items-center gap-2 mt-2"><span className="text-xs w-20 text-right opacity-30">Days →</span><div className="flex gap-[2px] flex-1">{Array.from({length: 31}, (_, i) => (<div key={i} className="flex-1 text-center text-[8px] opacity-30">{i+1}</div>))}</div></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {data.postEditors.map(e => (<div key={e.name} className="rounded-xl p-4 border border-slate-200 bg-white shadow-sm dark:shadow-none dark:border-white/5 dark:bg-white/[0.02]"><div className="text-sm font-semibold mb-2">{e.name}</div><div className="grid grid-cols-2 gap-2 text-xs"><div><span className="opacity-40">Target</span><div className="font-bold">{e.target||e.regularTarget||0}</div></div><div><span className="opacity-40">Achieved</span><div className="font-bold text-emerald-600 dark:text-emerald-400">{e.achieved}</div></div><div><span className="opacity-40">Extra</span><div className="font-bold text-amber-600 dark:text-amber-400">{e.extra}</div></div><div><span className="opacity-40">Clients</span><div className="font-bold">{e.clients.length}</div></div></div></div>))}
                </div>
                <div className="rounded-xl p-5 border border-slate-200 bg-white shadow-sm dark:shadow-none dark:border-white/5 dark:bg-white/[0.02] overflow-x-auto mt-8">
                  <h3 className="text-lg font-bold mb-4">Detailed employee work report</h3>
                  <table className="w-full text-sm text-left whitespace-nowrap">
                    <thead><tr className="border-b border-slate-200 dark:border-white/10"><th className="py-3 px-4 opacity-70 font-semibold">Editor</th><th className="py-3 px-4 opacity-70 font-semibold">Dept</th><th className="py-3 px-4 opacity-70 font-semibold text-center">Assigned clients</th><th className="py-3 px-4 opacity-70 font-semibold text-center">Target</th><th className="py-3 px-4 opacity-70 font-semibold text-center">Achieved</th><th className="py-3 px-4 opacity-70 font-semibold text-center">Extra</th><th className="py-3 px-4 opacity-70 font-semibold text-center">Total delivered</th><th className="py-3 px-4 opacity-70 font-semibold text-center">Progress</th></tr></thead>
                    <tbody>{ALL_EDITORS.sort((a,b) => b.total - a.total).map(e => { const target = e.target||e.regularTarget||96; const pct = Math.min(Math.round((e.total/target)*100),100); return (
                      <tr key={e.name} className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"><td className="py-3 px-4 font-bold">{e.name}</td><td className="py-3 px-4"><span className={`text-[10px] px-2 py-1 rounded-full font-bold ${e.dept==='Post' ? 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400' : 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400'}`}>{e.dept}</span></td><td className="py-3 px-4 text-xs opacity-70 text-center"><div className="max-w-[200px] truncate mx-auto" title={e.clients.join(", ")}>{e.clients.length>0?e.clients.join(", "):"None"}</div></td><td className="py-3 px-4 text-center">{target}</td><td className="py-3 px-4 text-center text-emerald-600 dark:text-emerald-400 font-medium">{e.achieved}</td><td className="py-3 px-4 text-center text-amber-600 dark:text-amber-400 font-medium">{e.extra}</td><td className="py-3 px-4 text-center font-bold text-lg">{e.total}</td><td className="py-3 px-4 w-40"><div className="flex items-center gap-3"><MiniBar value={e.total} max={target} color={e.total>=target?"#10B981":"#F59E0B"}/><span className="text-[10px] opacity-60 font-bold">{pct}%</span></div></td></tr>);})}</tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ═══ TASKS ═══ */}
            {activeSection === "tasks" && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  <KPICard label="Total Target" value={data.clients.reduce((a,b)=>a+(b.target||0),0)} sub="All clients combined" icon="▦" />
                  <KPICard label="Delivered" value={data.clients.reduce((a,b)=>a+(b.total||0),0)} sub="Completion progress" icon="✓" />
                  <KPICard label="Pending" value={data.clients.reduce((a,b)=>a+(b.pending||0),0)} sub="Need immediate action" icon="◷" accent />
                  <KPICard label="On Track" value={`${achievedClients}/${totalClients}`} sub="Clients at target" icon="◎" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 dark:border-emerald-500/20 dark:bg-emerald-500/5 p-4"><h3 className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 mb-3">✓ Achieved ({data.clients.filter(c=>c.status==="Achieved").length})</h3><div className="space-y-2">{data.clients.filter(c=>c.status==="Achieved").map(c=>(<div key={c.client} className="p-3 rounded-lg bg-white border border-emerald-100 shadow-sm dark:shadow-none dark:bg-black/30 dark:border-emerald-500/10 text-slate-800 dark:text-[#E8E8EC]"><div className="text-sm font-medium">{c.client}</div><div className="text-xs opacity-60 mt-1">{c.person} · {c.total}/{c.target}</div></div>))}</div></div>
                  <div className="rounded-xl border border-amber-200 bg-amber-50 dark:border-amber-500/20 dark:bg-amber-500/5 p-4"><h3 className="text-sm font-semibold text-amber-700 dark:text-amber-400 mb-3">◷ Close to target ({data.clients.filter(c=>c.status==="Behind"&&c.pending<=3).length})</h3><div className="space-y-2 max-h-96 overflow-y-auto pr-1">{data.clients.filter(c=>c.status==="Behind"&&c.pending<=3).map(c=>(<div key={c.client} className="p-3 rounded-lg bg-white border border-amber-100 shadow-sm dark:shadow-none dark:bg-black/30 dark:border-amber-500/10 text-slate-800 dark:text-[#E8E8EC]"><div className="text-sm font-medium">{c.client}</div><div className="text-xs opacity-60 mt-1">{c.person} · {c.total}/{c.target} · <span className="text-amber-600 dark:text-amber-400 font-bold">{c.pending} pending</span></div></div>))}</div></div>
                  <div className="rounded-xl border border-red-200 bg-red-50 dark:border-red-500/20 dark:bg-red-500/5 p-4"><h3 className="text-sm font-semibold text-red-700 dark:text-red-400 mb-3">▲ Needs attention ({data.clients.filter(c=>c.status==="Behind"&&c.pending>3).length})</h3><div className="space-y-2 max-h-96 overflow-y-auto pr-1">{data.clients.filter(c=>c.status==="Behind"&&c.pending>3).sort((a,b)=>b.pending-a.pending).map(c=>(<div key={c.client} className="p-3 rounded-lg bg-white border border-red-100 shadow-sm dark:shadow-none dark:bg-black/30 dark:border-red-500/10 text-slate-800 dark:text-[#E8E8EC]"><div className="text-sm font-medium">{c.client}</div><div className="text-xs opacity-60 mt-1">{c.person} · {c.total}/{c.target} · <span className="text-red-600 dark:text-red-400 font-bold">{c.pending} pending</span></div></div>))}</div></div>
                </div>
                <div className="rounded-xl p-5 border border-slate-200 bg-white shadow-sm dark:shadow-none dark:border-white/5 dark:bg-white/[0.02]">
                  <h3 className="text-sm font-semibold mb-4 opacity-70">Delivery progress by client</h3>
                  <div className="space-y-2 max-h-80 overflow-y-auto pr-2">{data.clients.sort((a,b)=>(a.total/a.target)-(b.total/b.target)).map(c=>(<div key={c.client} className="flex items-center gap-3"><span className="text-xs w-36 text-right opacity-50 truncate flex-shrink-0">{c.client}</span><div className="flex-1"><MiniBar value={c.total} max={c.target} color={c.status==="Achieved"?"#10B981":c.total/c.target>0.7?"#F59E0B":"#DC2626"}/></div><span className="text-xs w-12 text-right opacity-70 font-bold">{c.target>0?Math.round(c.total/c.target*100):0}%</span><StatusBadge status={c.status}/></div>))}</div>
                </div>
              </div>
            )}

            {/* ═══ CONTENT ═══ */}
            {activeSection === "content" && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  <KPICard label="Posts Created" value={totalPostOutput} sub="4 editors" icon="◇" accent />
                  <KPICard label="Videos Created" value={totalVideoOutput} sub="5 editors" icon="▶" />
                  <KPICard label="Post Target" value={data.postEditors.reduce((s,e)=>s+(e.target||e.regularTarget||192),0)} sub="Across clients" icon="▦" />
                  <KPICard label="Video Target" value={data.videoEditors.reduce((s,e)=>s+(e.target||96),0)} sub="Across clients" icon="◎" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {[{title:"Daily post output by editor",editors:data.postEditors,color:"220,38,38"},{title:"Daily video output by editor",editors:data.videoEditors,color:"249,115,22"}].map(team=>(
                    <div key={team.title} className="rounded-xl p-5 border border-slate-200 bg-white shadow-sm dark:shadow-none dark:border-white/5 dark:bg-white/[0.02]">
                      <h3 className="text-sm font-semibold mb-4 opacity-70">{team.title}</h3>
                      <div className="space-y-3">{team.editors.map(e=>(<div key={e.name}><div className="flex justify-between text-xs mb-1"><span>{e.name}</span><span className="opacity-50">{e.total}</span></div><div className="flex gap-[1px]">{e.daily.slice(0,22).map((v,i)=>(<div key={i} className="flex-1 h-3 rounded-sm" style={{background:v===0?(isDark?'rgba(255,255,255,0.03)':'rgba(0,0,0,0.05)'):`rgba(${team.color},${Math.min(0.3+v/14,1)})`}} title={`Day ${i+1}: ${v}`}/>))}</div></div>))}</div>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl p-5 border border-slate-200 bg-white shadow-sm dark:shadow-none dark:border-white/5 dark:bg-white/[0.02] overflow-x-auto">
                  <h3 className="text-sm font-semibold mb-4 opacity-70">Client-wise content distribution</h3>
                  <div className="min-w-[600px] space-y-1.5">{data.clients.sort((a,b)=>b.total-a.total).slice(0,15).map(c=>(<div key={c.client} className="flex items-center gap-2"><span className="text-xs w-32 text-right opacity-50 truncate flex-shrink-0">{c.client}</span><div className="flex-1 flex gap-[1px]"><div className="h-4 rounded-l" style={{width:`${c.target>0?(c.posts/c.target)*100:0}%`,background:'#DC2626'}}/><div className="h-4 rounded-r" style={{width:`${c.target>0?(c.videos/c.target)*100:0}%`,background:'#F97316'}}/></div><span className="text-[10px] opacity-40 w-20 flex-shrink-0">{c.posts}p + {c.videos}v = {c.total}</span></div>))}</div>
                  <div className="flex gap-4 mt-3 text-xs opacity-40"><span><span className="inline-block w-3 h-2 rounded bg-red-600 mr-1"/>Posts</span><span><span className="inline-block w-3 h-2 rounded bg-orange-500 mr-1"/>Videos</span></div>
                </div>
              </div>
            )}

            {/* ═══ SOCIAL MEDIA ═══ */}
            {activeSection === "social" && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  <KPICard label="SMM: Mital" value={data.socialMedia.filter(c=>c.smm==="Mital").length} sub="Clients managed" icon="◈" accent />
                  <KPICard label="SMM: Dipen" value={data.socialMedia.filter(c=>c.smm==="Dipen").length} sub="Clients managed" icon="◈" />
                  <KPICard label="Total Uploaded" value={totalSMUploaded} sub={`of ${totalSMTarget} target`} icon="▲" />
                  <KPICard label="Upload Rate" value={`${totalSMTarget>0?Math.round(totalSMUploaded/totalSMTarget*100):0}%`} sub="Across all clients" icon="◎" />
                </div>
                <div className="rounded-xl p-5 border border-slate-200 bg-white shadow-sm dark:shadow-none dark:border-white/5 dark:bg-white/[0.02] overflow-x-auto">
                  <h3 className="text-sm font-semibold mb-4 opacity-70">Social media upload report</h3>
                  <table className="w-full text-xs"><thead><tr className="border-b border-slate-200 dark:border-white/10 text-left"><th className="py-2 px-2 opacity-40">Client</th><th className="py-2 px-2 opacity-40">SMM</th><th className="py-2 px-2 opacity-40 text-center">Post target</th><th className="py-2 px-2 opacity-40 text-center">Post uploaded</th><th className="py-2 px-2 opacity-40 text-center">Video target</th><th className="py-2 px-2 opacity-40 text-center">Video uploaded</th><th className="py-2 px-2 opacity-40 text-center">Total target</th><th className="py-2 px-2 opacity-40 text-center">Total uploaded</th><th className="py-2 px-2 opacity-40">Progress</th></tr></thead>
                    <tbody>{data.socialMedia.map((c,i)=>(<tr key={i} className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"><td className="py-2 px-2 font-medium">{c.client}</td><td className="py-2 px-2 opacity-60">{c.smm}</td><td className="py-2 px-2 text-center">{c.postTarget||'-'}</td><td className="py-2 px-2 text-center">{c.postUploaded||'-'}</td><td className="py-2 px-2 text-center">{c.videoTarget||'-'}</td><td className="py-2 px-2 text-center">{c.videoUploaded||'-'}</td><td className="py-2 px-2 text-center font-bold">{c.totalTarget}</td><td className="py-2 px-2 text-center text-emerald-600 dark:text-emerald-400 font-bold">{c.totalUploaded}</td><td className="py-2 px-2 w-32"><div className="flex items-center gap-2"><MiniBar value={c.totalUploaded} max={c.totalTarget} color={c.totalUploaded>=c.totalTarget?"#10B981":"#DC2626"}/><span className="text-[10px] opacity-60">{c.totalTarget>0?Math.round((c.totalUploaded/c.totalTarget)*100):0}%</span></div></td></tr>))}</tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ═══ STOCK ═══ */}
            {activeSection === "stock" && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                  <KPICard label="Total Target" value={data.stock.reduce((a,b)=>a+(b.totalTarget||0),0)} sub="Posts + Videos" icon="▣"/>
                  <KPICard label="Total Approved" value={data.stock.reduce((a,b)=>a+(b.totalApproved||0),0)} sub="Approval progress" icon="✓"/>
                  <KPICard label="Uploaded" value={data.stock.reduce((a,b)=>a+(b.totalUploaded||0),0)} sub="Total uploads" icon="▲"/>
                  <KPICard label="Remaining" value={data.stock.reduce((a,b)=>a+(b.totalRemaining||0),0)} sub="To be delivered" icon="◷" accent/>
                  <KPICard label="To Produce" value={data.stock.reduce((a,b)=>a+(b.toProduce||0),0)} sub="New content needed" icon="◆"/>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="rounded-xl border border-red-200 bg-red-50 dark:border-red-500/20 dark:bg-red-500/5 p-4"><h3 className="text-sm font-semibold text-red-700 dark:text-red-400 mb-3">URGENT ({data.stock.filter(s=>s.priority==="URGENT").length})</h3><div className="space-y-2">{data.stock.filter(s=>s.priority==="URGENT").map(s=>(<div key={s.client} className="p-3 rounded-lg bg-white border border-red-100 shadow-sm dark:shadow-none dark:bg-black/30 dark:border-red-500/10 text-slate-800 dark:text-[#E8E8EC]"><div className="text-sm font-medium">{s.client}</div><div className="text-xs opacity-60 mt-1">Need to produce: <span className="text-red-600 dark:text-red-400 font-bold">{s.toProduce}</span></div><MiniBar value={s.totalUploaded} max={s.totalTarget} color="#DC2626"/></div>))}</div></div>
                  <div className="rounded-xl border border-amber-200 bg-amber-50 dark:border-amber-500/20 dark:bg-amber-500/5 p-4"><h3 className="text-sm font-semibold text-amber-700 dark:text-amber-400 mb-3">LOW STOCK ({data.stock.filter(s=>s.priority==="LOW"||s.priority==="LOW STOCK").length})</h3><div className="space-y-2">{data.stock.filter(s=>s.priority==="LOW"||s.priority==="LOW STOCK").map(s=>(<div key={s.client} className="p-3 rounded-lg bg-white border border-amber-100 shadow-sm dark:shadow-none dark:bg-black/30 dark:border-amber-500/10 text-slate-800 dark:text-[#E8E8EC]"><div className="text-sm font-medium">{s.client}</div><div className="text-xs opacity-60 mt-1">Remaining: {s.totalRemaining} · Produce: {s.toProduce}</div><MiniBar value={s.totalUploaded} max={s.totalTarget} color="#F59E0B"/></div>))}</div></div>
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 dark:border-emerald-500/20 dark:bg-emerald-500/5 p-4"><h3 className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 mb-3">SAFE ({data.stock.filter(s=>s.priority==="SAFE").length})</h3><div className="space-y-1 max-h-64 overflow-y-auto">{data.stock.filter(s=>s.priority==="SAFE").map(s=>(<div key={s.client} className="flex items-center justify-between py-1 text-xs border-b border-emerald-100 dark:border-white/5"><span className="opacity-70 font-medium">{s.client}</span><span className="text-emerald-600 dark:text-emerald-400 font-bold">{s.totalRemaining} remaining</span></div>))}</div></div>
                </div>
                <div className="rounded-xl p-5 border border-slate-200 bg-white shadow-sm dark:shadow-none dark:border-white/5 dark:bg-white/[0.02] overflow-x-auto">
                  <h3 className="text-sm font-semibold mb-4 opacity-70">Complete stock inventory</h3>
                  <table className="w-full text-[11px]"><thead><tr className="border-b border-slate-200 dark:border-white/10 text-left"><th className="py-2 px-1 opacity-40">Client</th><th className="py-2 px-1 opacity-40 text-center">Post stock</th><th className="py-2 px-1 opacity-40 text-center">Video stock</th><th className="py-2 px-1 opacity-40 text-center">Total approved</th><th className="py-2 px-1 opacity-40 text-center">Uploaded</th><th className="py-2 px-1 opacity-40 text-center">Remaining</th><th className="py-2 px-1 opacity-40">Status</th></tr></thead>
                    <tbody>{data.stock.map(s=>(<tr key={s.client} className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"><td className="py-1.5 px-1 font-medium">{s.client}</td><td className="py-1.5 px-1 text-center">{s.postRemaining}</td><td className="py-1.5 px-1 text-center">{s.videoRemaining}</td><td className="py-1.5 px-1 text-center">{s.totalApproved}</td><td className="py-1.5 px-1 text-center">{s.totalUploaded}</td><td className="py-1.5 px-1 text-center font-bold">{s.totalRemaining}</td><td className="py-1.5 px-1"><StatusBadge status={s.priority}/></td></tr>))}</tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ═══ SHOOTS ═══ */}
            {activeSection === "shoots" && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  <KPICard label="Completed" value={data.shoots.filter(s=>s.status==="Completed").length} sub="Shoots done" icon="✓"/>
                  <KPICard label="Cancelled" value={data.shoots.filter(s=>s.status==="Cancelled").length} sub="Need rescheduling" icon="✕"/>
                  <KPICard label="TBD" value={data.shoots.filter(s=>s.status==="TBD").length} sub="Pending confirmation" icon="◷" accent/>
                  <KPICard label="Not Required" value="16" sub="Clients with no shoots" icon="—"/>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {[{title:"✓ Completed",filter:s=>s.status==="Completed",border:"emerald"},{title:"◷ TBD / Pending",filter:s=>s.status!=="Completed"&&s.status!=="Cancelled",border:"amber"},{title:"✕ Cancelled",filter:s=>s.status==="Cancelled",border:"slate"}].map(col=>(
                    <div key={col.title} className={`rounded-xl border p-4 ${col.border==='emerald'?'border-emerald-200 bg-emerald-50 dark:border-emerald-500/20 dark:bg-emerald-500/5':col.border==='amber'?'border-amber-200 bg-amber-50 dark:border-amber-500/20 dark:bg-amber-500/5':'border-slate-200 bg-slate-50 dark:border-zinc-500/20 dark:bg-zinc-500/5'}`}>
                      <h3 className={`text-sm font-semibold mb-3 ${col.border==='emerald'?'text-emerald-700 dark:text-emerald-400':col.border==='amber'?'text-amber-700 dark:text-amber-400':'text-slate-700 dark:text-zinc-400'}`}>{col.title}</h3>
                      <div className="space-y-2">{data.shoots.filter(col.filter).map((s,i)=>(<div key={i} className={`p-3 rounded-lg bg-white shadow-sm dark:shadow-none dark:bg-black/30 text-slate-800 dark:text-[#E8E8EC] border ${col.border==='emerald'?'border-emerald-100 dark:border-emerald-500/10':col.border==='amber'?'border-amber-100 dark:border-amber-500/10':'border-slate-200 dark:border-zinc-500/10'}`}><div className="flex justify-between items-start"><div className="text-sm font-medium">{s.client}</div><span className="text-[10px] opacity-60">{s.date}</span></div><div className="text-xs opacity-60 mt-1">{s.type} · {s.person||'Unassigned'}</div></div>))}</div>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl p-5 border border-slate-200 bg-white shadow-sm dark:shadow-none dark:border-white/5 dark:bg-white/[0.02]">
                  <h3 className="text-sm font-semibold mb-4 opacity-70">Shoots by assigned person</h3>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">{["Kaushik","Keyur","Ronit","Krushang"].map(person=>{const shoots=data.shoots.filter(s=>s.person===person);return(<div key={person} className="p-3 rounded-lg border border-slate-200 bg-slate-50 dark:border-white/5 dark:bg-white/[0.02]"><div className="text-sm font-semibold mb-2">{person}</div><div className="text-2xl font-bold text-red-600 dark:text-red-400">{shoots.length}</div><div className="text-xs opacity-60 mt-1">{shoots.filter(s=>s.status==="Completed").length} completed</div></div>);})}</div>
                </div>
              </div>
            )}

            {/* ═══ CLIENTS ═══ */}
            {activeSection === "clients" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {["Mital","Dipen"].map(smm=>{const clients=data.clients.filter(c=>c.smm===smm);const totalD=clients.reduce((s,c)=>s+c.total,0);const totalT=clients.reduce((s,c)=>s+c.target,0);return(
                    <div key={smm} className="rounded-xl p-5 border border-slate-200 bg-white shadow-sm dark:shadow-none dark:border-white/5 dark:bg-white/[0.02]"><div className="flex justify-between items-center mb-4"><h3 className="text-sm font-semibold opacity-70">SMM: {smm}</h3><span className="text-xs opacity-60 font-bold">{clients.length} clients · {totalD}/{totalT}</span></div><div className="space-y-2">{clients.map(c=>(<div key={c.client} className="flex items-center gap-2"><span className="text-xs w-28 text-right opacity-60 truncate flex-shrink-0">{c.client}</span><MiniBar value={c.total} max={c.target} color={c.status==="Achieved"?"#10B981":"#DC2626"}/><span className="text-[10px] w-10 text-right opacity-60 font-bold">{c.total}/{c.target}</span><StatusBadge status={c.status}/></div>))}</div></div>);})}
                </div>
                <div className="rounded-xl p-5 border border-slate-200 bg-white shadow-sm dark:shadow-none dark:border-white/5 dark:bg-white/[0.02] overflow-x-auto">
                  <h3 className="text-sm font-semibold mb-4 opacity-70">Full client report</h3>
                  <table className="w-full text-xs"><thead><tr className="border-b border-slate-200 dark:border-white/10 text-left"><th className="py-2 px-2 opacity-40">#</th><th className="py-2 px-2 opacity-40">Client</th><th className="py-2 px-2 opacity-40">Person</th><th className="py-2 px-2 opacity-40">SMM</th><th className="py-2 px-2 opacity-40 text-center">Posts</th><th className="py-2 px-2 opacity-40 text-center">Videos</th><th className="py-2 px-2 opacity-40 text-center">Target</th><th className="py-2 px-2 opacity-40 text-center">Delivered</th><th className="py-2 px-2 opacity-40 text-center">Pending</th><th className="py-2 px-2 opacity-40">Status</th></tr></thead>
                    <tbody>{data.clients.map((c,i)=>(<tr key={c.client} className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"><td className="py-1.5 px-2 opacity-40">{i+1}</td><td className="py-1.5 px-2 font-medium">{c.client}</td><td className="py-1.5 px-2 opacity-70">{c.person}</td><td className="py-1.5 px-2 opacity-70">{c.smm}</td><td className="py-1.5 px-2 text-center">{c.posts||'-'}</td><td className="py-1.5 px-2 text-center">{c.videos||'-'}</td><td className="py-1.5 px-2 text-center font-bold">{c.target}</td><td className="py-1.5 px-2 text-center">{c.total}</td><td className="py-1.5 px-2 text-center"><span className={c.pending>0?'text-red-600 dark:text-red-400 font-bold':'text-emerald-600 dark:text-emerald-400'}>{c.pending}</span></td><td className="py-1.5 px-2"><StatusBadge status={c.status}/></td></tr>))}</tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ═══ CALENDAR ═══ */}
            {activeSection === "calendar" && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  <KPICard label="Total Clients" value={totalClients} sub="In upload calendar" icon="▤"/>
                  <KPICard label="Total Target" value={data.clients.reduce((a,b)=>a+(b.target||0),0)} sub="Monthly uploads" icon="▦" accent/>
                  <KPICard label="Total Uploaded" value={data.clients.reduce((a,b)=>a+(b.total||0),0)} sub="Completion metric" icon="✓"/>
                  <KPICard label="Pending Uploads" value={data.clients.reduce((a,b)=>a+(b.pending||0),0)} sub="Need scheduling" icon="◷"/>
                </div>
                <div className="rounded-xl p-5 border border-slate-200 bg-white shadow-sm dark:shadow-none dark:border-white/5 dark:bg-white/[0.02] overflow-x-auto">
                  <h3 className="text-sm font-semibold mb-4 opacity-70">April 2026 upload calendar</h3>
                  {data.uploadCalendar.length > 0 ? (
                    <div className="min-w-[700px]">
                      <div className="flex gap-[2px] mb-2"><div className="w-28 flex-shrink-0"/><div className="w-8 flex-shrink-0 text-[9px] text-center opacity-40">Tgt</div>{Array.from({length:31},(_,i)=>(<div key={i} className="flex-1 text-center text-[8px] opacity-40">{i+1}</div>))}</div>
                      {data.uploadCalendar.map((row,i)=>(<div key={i} className="flex gap-[2px] mb-[2px]"><div className="w-28 text-[9px] truncate opacity-60 font-medium flex-shrink-0 py-0.5" title={row.client}>{row.client}</div><div className="w-8 flex-shrink-0 text-[9px] text-center font-bold opacity-60">{row.target}</div>{row.days.slice(0,31).map((val,d)=>(<div key={d} className="flex-1 h-4 rounded-sm flex items-center justify-center text-[8px] text-white transition-all" style={{background:val?'rgba(220,38,38,0.7)':(isDark?'rgba(255,255,255,0.03)':'rgba(0,0,0,0.04)')}}>{val?'✓':''}</div>))}</div>))}
                    </div>
                  ) : (
                    <div className="text-center py-16 opacity-50 bg-slate-50 dark:bg-black/20 rounded-xl border border-dashed border-slate-200 dark:border-white/10"><div className="text-4xl mb-3 opacity-50">▤</div><p className="font-bold">No upload calendar data synced.</p><p className="text-sm">Please connect the URL in the Data Sync tab.</p></div>
                  )}
                </div>
                <div className="rounded-xl p-5 border border-slate-200 bg-white shadow-sm dark:shadow-none dark:border-white/5 dark:bg-white/[0.02]">
                  <h3 className="text-sm font-semibold mb-4 opacity-70">Planned vs actual uploads (top clients)</h3>
                  <div className="space-y-3">{data.clients.sort((a,b)=>b.target-a.target).slice(0,10).map(c=>(<div key={c.client} className="flex items-center gap-3"><span className="text-xs w-32 text-right opacity-60 truncate flex-shrink-0">{c.client}</span><div className="flex-1 relative"><div className="h-5 rounded-full overflow-hidden" style={{background:isDark?'rgba(255,255,255,0.04)':'rgba(0,0,0,0.05)'}}><div className="h-full rounded-full transition-all" style={{width:`${c.target>0?Math.min((c.total/c.target)*100,100):0}%`,background:c.total>=c.target?'linear-gradient(90deg, #10B981, #059669)':'linear-gradient(90deg, #DC2626, #B91C1C)'}}/></div></div><span className="text-xs w-16 text-right font-bold opacity-80">{c.total}/{c.target}</span></div>))}</div>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
  );
}
