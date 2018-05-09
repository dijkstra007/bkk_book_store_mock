import React from "react";
import { connect } from "react-redux";
import database from "../firebase/firebase";
import PreviewProduct from "./PreviewProduct";
import Nineti9pickSlide from "./Nineti9pickSlide";
import ProductListItem from "./ProductListItem";
import { addToCart } from "../actions/cart";
import * as API from "../constants/apiURL";

const Carousel = require("react-responsive-carousel").Carousel;

const OFF_SET_TRANSLATE_VALUE = 33.3333;
const product_mock = [
  {
      "_id": "5a716fd00c48af1e87c3633a",
      "productID": "148",
      "sku": "3052503261713",
      "productName": "Bourjois Rouge Edition Velvet #17 Cool Brown",
      "thumbnailImage": "https://s3-ap-southeast-1.amazonaws.com/nineti9/products/f7a13c85-77aa-4212-b693-a0da0a5addd5.jpeg",
      "image0": "https://s3-ap-southeast-1.amazonaws.com/nineti9/products/88d0b04b-6e5d-4038-9320-7dbb3b143448.jpeg",
      "image1": "https://s3-ap-southeast-1.amazonaws.com/nineti9ecommerce/17back.jpg",
      "color": "#A35241",
      "productType": "blogger1",
      "tag": [],
      "__v": 2,
      "image2": null,
      "image3": null,
      "image4": null,
      "featureOn": null,
      "colorName": "Cool Brown",
      "location": "AA231",
      "brand": "15",
      "colorNumber": 17,
      "createdAt": "2018-03-13T09:44:59.151Z",
      "dateModified": "2018-03-30T12:12:56.046Z",
      "colorList": [
          {
              "color": "#BA0712",
              "colorName": "Hot Pepper",
              "colorNumber": 3,
              "sku": "3052503260310"
          },
          {
              "color": "#F38B80",
              "colorName": "Peach Club",
              "colorNumber": 4,
              "sku": "3052503260419"
          },
          {
              "color": "#E13D5A",
              "colorName": "Ole Flamingo",
              "colorNumber": 5,
              "sku": "3052503260518"
          },
          {
              "color": "#E6396F",
              "colorName": "Pink Pong",
              "colorNumber": 6,
              "sku": "3052503260617"
          },
          {
              "color": "#E8A19F",
              "colorName": "Nude-ist",
              "colorNumber": 7,
              "sku": "3052503260716"
          },
          {
              "color": "#5B1726",
              "colorName": "Grand Cru",
              "colorNumber": 8,
              "sku": "3052503260815"
          },
          {
              "color": "#AF636F",
              "colorName": "Don't Pink of it",
              "colorNumber": 10,
              "sku": "3052503261010"
          },
          {
              "color": "#BD4A69",
              "colorName": "So Hap' Pink",
              "colorNumber": 11,
              "sku": "3052503261119"
          },
          {
              "color": "#903A3F",
              "colorName": "Beau Brun",
              "colorNumber": 12,
              "sku": "3052503261218"
          },
          {
              "color": "#810005",
              "colorName": "Red-volution",
              "colorNumber": 15,
              "sku": "3052503261515"
          },
          {
              "color": "#D76F58",
              "colorName": "Honey Mood",
              "colorNumber": 16,
              "sku": "3052503261614"
          },
          {
              "color": "#A35241",
              "colorName": "Cool Brown",
              "colorNumber": 17,
              "sku": "3052503261713"
          },
          {
              "color": "#A9070C",
              "colorName": "it's Redding Men",
              "colorNumber": 18,
              "sku": "3052503261812"
          }
      ],
      "public": true,
      "concernTag": [
          ""
      ],
      "hashTag": [],
      "star": [],
      "size": [],
      "shortDescription": "ลิควิดลิปสติกเนื้อกำมะหยี่, สวยคมชัดติดทนนาน, ไม่ทำให้ปากเป็นคราบ แห้ง ลอกหรือเป็นขุย ไม่ตกร่อง, แปรงหัวตัดในตัว ช่วยเกลี่ยเนื้อลิปให้เรียบเนียนทั่วริมฝีปาก",
      "price": 439,
      "salesPrice": 0,
      "regularPrice": 439,
      "inStock": 11,
      "quantity": 1000000,
      "onSale": false,
      "description": "<p>ลิควิดลิปสติกเนื้อกำมะหยี่นุ่มลื่น เมื่อแห้งจะเปลี่ยนเป็นเนื้อแมทที่สวยคมชัดติดทนนาน ไม่ทำให้ปากเป็นคราบ แห้ง ลอกหรือเป็นขุย ไม่ตกร่อง ใช้งานง่ายด้วยแปรงหัวตัดในตัว ช่วยเกลี่ยเนื้อลิปให้เรียบเนียนทั่วริมฝีปาก แท่งเล็กกะทัดรัดพกพาสะดวก</P>\n",
      "categoryID": [
          "28"
      ]
  },
  {
      "_id": "5a716fd30c48af1e87c363e5",
      "productID": "525",
      "sku": "8857124490215",
      "productName": "RAN Cover Matte Oil Control Powder SPF30+ #21",
      "thumbnailImage": "https://s3-ap-southeast-1.amazonaws.com/nineti9/products/89869e90-06d3-4e80-a0ef-778a102e869c.jpeg",
      "image0": "https://s3-ap-southeast-1.amazonaws.com/nineti9/products/350667b2-ca31-4822-8492-e58a75109729.jpeg",
      "image1": "https://s3-ap-southeast-1.amazonaws.com/nineti9/products/93568f28-2235-4e3c-b037-4ef61102a7c5.jpeg",
      "image2": "https://s3-ap-southeast-1.amazonaws.com/nineti9/products/4d79b18b-7581-4a4a-a9c3-0d112560db7e.jpeg",
      "productType": "blogger1",
      "tag": [],
      "__v": 2,
      "image3": null,
      "image4": null,
      "featureOn": null,
      "color": "#eec1a1",
      "colorName": "",
      "brand": "78",
      "location": "AA743",
      "createdAt": "2018-03-13T05:01:53.736Z",
      "dateModified": "2018-03-30T11:27:47.457Z",
      "colorList": [
          {
              "color": "#ecbb99",
              "colorName": "",
              "colorNumber": null,
              "sku": "8857124490024"
          },
          {
              "color": "#eab793",
              "colorName": "",
              "colorNumber": null,
              "sku": "8857124490031"
          },
          {
              "color": "#f8ddc7",
              "colorName": "",
              "colorNumber": null,
              "sku": "8857124490017"
          },
          {
              "color": "#eec1a1",
              "colorName": "",
              "colorNumber": null,
              "sku": "8857124490215"
          }
      ],
      "public": true,
      "concernTag": [
          ""
      ],
      "hashTag": [],
      "star": [],
      "size": [
          "14g"
      ],
      "shortDescription": "แป้งผสมรองพื้นเนื้อแมทเนียนละเอียดเบอร์ 21, ช่วยปกปิดให้ผิวดูเรียบเนียนเป็นธรรมชาติ, ควบคุมความมัน กันน้ำ กันเหงื่อ ติดทนนาน 16 ชั่วโมง, ป้องกันการเกิดริ้วรอยได้อย่างมีประสิทธิภาพ",
      "price": 779,
      "salesPrice": 779,
      "regularPrice": 790,
      "inStock": 3,
      "quantity": 1000000,
      "onSale": true,
      "description": "<p><span style=\"display: inline !important; float: none; background-color: #ffffff; color: #000000; cursor: text; font-family: arial,sans,sans-serif; font-size: 13px; font-style: normal; font-variant: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-decoration: none; text-indent: 0px; text-transform: none; -webkit-text-stroke-width: 0px; white-space: pre-wrap; word-spacing: 0px; word-wrap: break-word;\">\"แป้งน้องฉัตร\" แป้งผสมรองพื้นเนื้อแมทเนียนละเอียด ช่วยปกปิดให้ผิวดูเรียบเนียนอย่างเป็นธรรมชาติตลอดวัน พร้อมคุณสมบัติในการควบคุมความมัน กันน้ำ กันเหงื่อ ติดทนนาน 16 ชั่วโมง&nbsp;</span></p>\n<p><span style=\"display: inline !important; float: none; background-color: #ffffff; color: #000000; cursor: text; font-family: arial,sans,sans-serif; font-size: 13px; font-style: normal; font-variant: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-decoration: none; text-indent: 0px; text-transform: none; -webkit-text-stroke-width: 0px; white-space: pre-wrap; word-spacing: 0px; word-wrap: break-word;\">ตอบโจทย์ทุกสภาพผิว และบำรุงให้ความชุ่มชื้น ป้องกันการเกิดริ้วรอยได้อย่างมีประสิทธิภาพ ด้วยสารสกัดจากดอกกล้วยไม้ เนรมิตผิวสวยใสราวผ่านมือเมคอัพอาร์ทติสท์มืออาชีพด้วยตัวคุณเอง</span></p>\n\n\n",
      "categoryID": [
          "7"
      ]
  },
  {
      "_id": "5a716fd30c48af1e87c363ec",
      "productID": "502",
      "sku": "8858910606971",
      "productName": "Odbo 12 Color Eyeshadow Palette #01",
      "thumbnailImage": "https://s3-ap-southeast-1.amazonaws.com/nineti9/products/19fce693-7645-423f-9975-bc80426be5f3.jpeg",
      "image0": "https://s3-ap-southeast-1.amazonaws.com/nineti9/products/6c00aa7e-7ef3-4b88-ad45-077f05e248de.jpeg",
      "image1": "https://s3-ap-southeast-1.amazonaws.com/nineti9/products/ee881825-6cf7-4e0c-803a-82f4230f1418.jpeg",
      "image2": "https://s3-ap-southeast-1.amazonaws.com/nineti9/products/636769bf-0170-402f-8692-d73b25611654.jpeg",
      "image3": "",
      "image4": "",
      "productType": "blogger1",
      "tag": [],
      "__v": 2,
      "featureOn": null,
      "color": null,
      "colorName": "",
      "brand": "70",
      "location": "AA731",
      "createdAt": "2018-03-12T07:05:57.470Z",
      "dateModified": "2018-03-29T02:45:15.237Z",
      "colorList": [],
      "public": true,
      "concernTag": [
          ""
      ],
      "hashTag": [],
      "star": [],
      "size": [
          "ul"
      ],
      "shortDescription": " อายแชโดว์ 12 เฉดสี ที่คุมโทนสีในแต่ละพาเลท, แต่งง่ายด้วยประกายกลิตเตอร์,  เนื้อเนียนเกลี่ยง่าย",
      "price": 119,
      "salesPrice": 0,
      "regularPrice": 119,
      "inStock": 24,
      "quantity": 1000000,
      "onSale": false,
      "description": "<p> อายแชโดว์ทั้ง 12 เฉดสี ที่มีมาแบบคุมโทนสีในแต่ละพาเลท แต่งง่ายด้วยประกายกลิตเตอร์ที่แวววาว เนื้อเนียนเกลี่ยง่าย สร้างปรากฏการณ์ใหม่แห่งความระยิบระยับบนเปลือกตาคู่สวยของคุณ</P> <p><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://trello-attachments.s3.amazonaws.com/5a0922dcb6bc6b50090f62c8/5a437f0367de7180bf8525ba/f63c95aefb7a72cc2367273ef29388f3/review-16.jpg\" alt=\"\" width=\"600\" height=\"400\" /></p>\n<p><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://trello-attachments.s3.amazonaws.com/5a0922dcb6bc6b50090f62c8/5a437f0367de7180bf8525ba/f2fea77642cf16919e3e13152d1f50af/review-14.jpg\" alt=\"\" width=\"600\" height=\"400\" /></p>\n",
      "categoryID": [
          "14"
      ]
  },
  {
      "_id": "5a716fd40c48af1e87c3640c",
      "productID": "564",
      "sku": "8858994481273",
      "productName": "Sivanna Ultra Professional Palette #01",
      "thumbnailImage": "https://s3-ap-southeast-1.amazonaws.com/nineti9/products/717771da-06dd-4650-bda7-5afc0c952ccf.jpeg",
      "image0": "https://s3-ap-southeast-1.amazonaws.com/nineti9/products/6107bbff-0045-4886-bebf-be9163eea9d7.jpeg",
      "image1": "",
      "image2": "",
      "image3": "",
      "image4": "",
      "productType": "blogger1",
      "tag": [],
      "__v": 2,
      "featureOn": null,
      "color": null,
      "colorName": "",
      "brand": "84",
      "location": "AA722",
      "createdAt": "2018-03-12T06:32:44.576Z",
      "dateModified": "2018-03-29T08:01:54.233Z",
      "colorList": [],
      "public": true,
      "concernTag": [
          ""
      ],
      "hashTag": [],
      "star": [],
      "size": [
          "22g"
      ],
      "shortDescription": "ช่วยให้รูปหน้าสวยมีทั้งเฉดดิ้งไฮไลท์,ช่วยสร้างมิติให้กับใบหน้า",
      "price": 169,
      "salesPrice": 0,
      "regularPrice": 169,
      "inStock": 22,
      "quantity": 1000000,
      "onSale": false,
      "description": "<p>พาเลตที่ช่วยให้รูปหน้าสวยครบจบในพาเลตเดียว มีทั้งเฉดดิ้ง ไฮไลท์ ช่วยสร้างมิติให้กับใบหน้าของคุณ</P>\n\n<p style=\"text-align: center;\"><img src=\"https://s3-ap-southeast-1.amazonaws.com/nineti9ecommerce/Review/review-6.png\" alt=\"\" width=\"500\" /></p>\n\n<p><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://s3-ap-southeast-1.amazonaws.com/nineti9ecommerce/Review/review-5.png\" width=\"500\" /></p>\n\n\n<p><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://s3-ap-southeast-1.amazonaws.com/nineti9ecommerce/Review/review-4.png\" width=\"500\" /></p>",
      "categoryID": [
          "12"
      ]
  },
  {
      "_id": "5aa7a2e73564c3456b3fd3ba",
      "productID": "640",
      "sku": "8858842054048",
      "productName": "Easy Drawing Browsticker 12 Browit #05",
      "brand": "109",
      "thumbnailImage": "https://s3-ap-southeast-1.amazonaws.com/nineti9/products/767582d2-0e7e-4e3c-a9d4-027cd01ff532.jpeg",
      "image0": "https://s3-ap-southeast-1.amazonaws.com/nineti9/products/d828859b-8928-4e58-8b1b-c0d81e54a2f9.jpeg",
      "color": "#000010",
      "colorNumber": 5,
      "location": "AA741",
      "__v": 0,
      "image1": "https://s3-ap-southeast-1.amazonaws.com/nineti9/products/45db21cb-56cf-47ae-bdf2-8c1f8e670563.jpeg",
      "productType": "blogger1",
      "createdAt": "2018-03-13T10:07:35.780Z",
      "dateModified": "2018-03-30T11:25:02.979Z",
      "colorList": [
          {
              "color": "#000003",
              "colorName": "01",
              "colorNumber": null,
              "sku": "8858842054000"
          },
          {
              "color": "#000002",
              "colorName": null,
              "colorNumber": 3,
              "sku": "8858842054024"
          },
          {
              "color": "#000001",
              "colorName": null,
              "colorNumber": 4,
              "sku": "8858842054031"
          },
          {
              "color": "#000010",
              "colorName": null,
              "colorNumber": 5,
              "sku": "8858842054048"
          },
          {
              "color": "#000020",
              "colorName": null,
              "colorNumber": 6,
              "sku": "8858842054055"
          },
          {
              "color": "#000100",
              "colorName": null,
              "colorNumber": 7,
              "sku": "8858842054239"
          },
          {
              "color": "#000000",
              "colorName": null,
              "colorNumber": 8,
              "sku": "8858842054246\t"
          }
      ],
      "public": true,
      "concernTag": [
          ""
      ],
      "hashTag": [],
      "star": [],
      "size": [],
      "shortDescription": "สติ๊กเกอร์โครงคิ้วเป๊ะปังเบอร์05 Korean Eyebrows,ทั้งหมด 8 ทรงให้เลือกใช้ตามความต้องการ,ใช้งานง่าย สะดวก รวดเร็ว",
      "price": 149,
      "salesPrice": 0,
      "regularPrice": 149,
      "inStock": 5,
      "quantity": 0,
      "onSale": false,
      "description": "อยากคิ้วสวยเหมือนน้องฉัตรมาเขียนให้  มีโครงคิ้วเป๊ะปัง ทำให้คิ้วสวยดูเป็นธรรมชาติ สติ๊กเกอร์โครงคิ้วทั้งหมด 8 ทรง ใช้งานง่าย สะดวก รวดเร็ว พร้อมทั้งสามารถนำไปใช้เป็นโครงเพื่อกันขนคิ้วได้อีกด้วย",
      "categoryID": [
          "112"
      ]
  },
  {
      "_id": "5aa9ddcf19b47b0fcf313fc8",
      "productID": "752",
      "thumbnailImage": "https://s3-ap-southeast-1.amazonaws.com/nineti9/products/13e70b79-ebc4-40bd-b58b-5272fef86ca5.png",
      "image0": "https://s3-ap-southeast-1.amazonaws.com/nineti9/products/04adccb1-3836-4e92-a678-c98b2090fb48.png",
      "sku": "96126394",
      "productName": "Sleek I-Divine Eyeshadow Palette  #447 A New Day",
      "brand": "85",
      "color": "#AC7257",
      "colorNumber": 430,
      "location": "AA432",
      "__v": 0,
      "productType": "blogger1",
      "createdAt": "2018-03-15T02:43:27.150Z",
      "dateModified": "2018-03-30T10:33:47.768Z",
      "colorList": [
          {
              "color": "#5A3E4A",
              "colorName": null,
              "colorNumber": 141,
              "sku": "96094075"
          },
          {
              "color": "#D5A88B",
              "colorName": "All Night Long",
              "colorNumber": 429,
              "sku": "96126363"
          },
          {
              "color": "#AC7257",
              "colorName": null,
              "colorNumber": 430,
              "sku": "96126394"
          },
          {
              "color": "#CCA296",
              "colorName": null,
              "colorNumber": 578,
              "sku": "50130269"
          },
          {
              "color": "#7E674F",
              "colorName": null,
              "colorNumber": 594,
              "sku": "50089246"
          },
          {
              "color": "#655258",
              "colorName": "Au Naturel",
              "colorNumber": 601,
              "sku": "96017791"
          },
          {
              "color": "#DE948D",
              "colorName": null,
              "colorNumber": 658,
              "sku": "96022511"
          }
      ],
      "public": true,
      "concernTag": [
          ""
      ],
      "hashTag": [],
      "star": [],
      "size": [
          "13.2g"
      ],
      "shortDescription": "Eyeshadow 12 เฉดสีใน 1 พาเลต,เม็ดสีเข้มคมชัด,เนื้อเนียนละเอียดเกลี่ยง่าย,ติดทนนานมีทั้งเเมทและชิมเมอร์",
      "price": 549,
      "salesPrice": 549,
      "regularPrice": 549,
      "inStock": 5,
      "quantity": 0,
      "onSale": false,
      "description": "Eyeshadow 12 พาเลต มีพิกเม้นท์สีเข้มเหมาะกับทุกสีผิว เนื้อสีมีความละเอียดเรียบเนียนติดทนใน 1พาเลต มีทั้งเนื้อแมทกับเนื้อชิมเมอร์ ผสมกันอยู่เพื่อสร้างมิติให้ดวงตาคู่สวยแก่สาวๆ",
      "categoryID": [
          "14"
      ]
  },
  {
      "_id": "5ab0b6568b658f05389b4720",
      "productID": "818",
      "thumbnailImage": "https://s3-ap-southeast-1.amazonaws.com/nineti9/products/29642d54-38b4-42fb-a522-4c1f56e8289a.jpeg",
      "image0": "https://s3-ap-southeast-1.amazonaws.com/nineti9/products/080db381-6898-40ad-812a-20dc14a6aa46.jpeg",
      "image1": "https://s3-ap-southeast-1.amazonaws.com/nineti9/products/9e83e37f-20a9-4cf9-b819-8b5582f084a7.jpeg",
      "image2": "https://s3-ap-southeast-1.amazonaws.com/nineti9/products/78d9b048-0f5f-45c6-a43f-638ece3f4047.jpeg",
      "image3": "https://s3-ap-southeast-1.amazonaws.com/nineti9/products/bcd920b7-55ff-435a-9dfc-916e840d26d5.jpeg",
      "image4": "https://s3-ap-southeast-1.amazonaws.com/nineti9/products/5bfd3d49-07df-4da6-a72b-45039abb2708.jpeg",
      "sku": "8859141301840",
      "productName": "Mille 3IN1 Professional Finishing Brow #Deep Brown",
      "brand": "59",
      "location": "AD233",
      "colorName": "Deep Brown",
      "color": "#855844",
      "__v": 0,
      "productType": "blogger1",
      "createdAt": "2018-03-20T07:20:54.021Z",
      "dateModified": "2018-04-06T08:10:49.519Z",
      "colorList": [
          {
              "color": "#826054",
              "colorName": "Light Brown",
              "colorNumber": null,
              "sku": "8859141301833"
          },
          {
              "color": "#855844",
              "colorName": "Deep Brown",
              "colorNumber": null,
              "sku": "8859141301840"
          }
      ],
      "public": true,
      "concernTag": [
          ""
      ],
      "hashTag": [],
      "star": [],
      "size": [],
      "shortDescription": "ดินสอเขียนคิ้วที่รวม 3 ขั้นตอนในแท่งเดียว, ตัวช่วยให้คุณเนรมิตคิ้วเรียวสวยได้รูปราวกับมืออาชีพ,เนื้อดินสอเนียนนุ่ม เม็ดสีแน่น สวยคมชัด มาในรูปทรงหยดน้ำ ใช้งานง่าย ",
      "price": 329,
      "salesPrice": 329,
      "regularPrice": 699,
      "inStock": 12,
      "quantity": 0,
      "onSale": true,
      "description": "<p>ดินสอเขียนคิ้วที่รวม 3 ขั้นตอนในแท่งเดียว ตัวช่วยให้คุณเนรมิตคิ้วเรียวสวยได้รูปราวกับมืออาชีพ เนื้อดินสอเนียนนุ่ม เม็ดสีแน่น สวยคมชัด มาในรูปทรงหยดน้ำ ใช้งานง่าย ช่วยเนรมิตให้คิ้วของคุณสวยโดดเด่นติดทนยาวนานตลอดวันกับสูตร Waterproof กันน้ำ กันเหงื่อ ให้คุณสวยได้โดยไม่ต้องกลัวฝน มาพร้อมกับหัวฟองน้ำและแปรงมาสคาร่าปัดคิ้ว</p>\n<ul>\n<li>หัวดินสอ วาดเส้นโครงสร้างคิ้ว ให้ได้ทรงตามต้องการ</li>\n<li>หัวฟองน้ำคุชชั่น เติมเต็มช่องวางของคิ้ว เกลี่ยง่ายได้รูปอย่างเป็นธรรมชาติ</li>\n<li>หัวแปรงมาสคาร่า ด้วยหัวแปรงที่ออกแบบพิเศษให้มีความถี่ละเอียด ช่วยจัดเก็บทรงคิ้วและเคลือบสีคิ้วไปพร้อมๆกัน</li>\n</ul>",
      "categoryID": [
          "17"
      ]
  },
  {
      "_id": "5ab22919a90369078b916082",
      "productID": "850",
      "sku": "8856153159339",
      "productName": "Beauty Buffet Multi-Use Color# 3 SweetCoral",
      "colorName": "Sweet Coral",
      "colorNumber": 3,
      "color": "#f64245",
      "location": "AC151",
      "brand": "6",
      "thumbnailImage": "https://s3-ap-southeast-1.amazonaws.com/nineti9/products/56ad2587-1da3-4ca2-bd8b-8ac205dab7e2.jpeg",
      "image0": "https://s3-ap-southeast-1.amazonaws.com/nineti9/products/7c0118bf-da58-4c27-b6b4-1dfb8b49ffb3.jpeg",
      "image1": "",
      "image2": "https://s3-ap-southeast-1.amazonaws.com/nineti9/products/30a89cf9-5bcf-4fc4-84a2-8b232d183154.jpeg",
      "__v": 0,
      "productType": "blogger1",
      "createdAt": "2018-03-21T09:42:49.346Z",
      "dateModified": "2018-04-09T04:42:20.933Z",
      "colorList": [
          {
              "color": "#F16F81",
              "colorName": "Pink Nude",
              "colorNumber": 1,
              "sku": "8856153159315"
          },
          {
              "color": "#eb536c",
              "colorName": "True Pink",
              "colorNumber": 2,
              "sku": "8856153159322"
          },
          {
              "color": "#f64245",
              "colorName": "Sweet Coral",
              "colorNumber": 3,
              "sku": "8856153159339"
          }
      ],
      "public": true,
      "concernTag": [
          ""
      ],
      "hashTag": [],
      "star": [],
      "size": [
          "5g"
      ],
      "shortDescription": "จีโน่ แม็คเครย์ เดอะ โปรเฟสชั่นนอล เมคอัพ แมทท์ มัลติ ยูส คัลเลอร์  ผลิตภัณฑ์ตกแต่งแก้มและริมฝีปากเนื้อครีมชนิดแท่ง ",
      "price": 249,
      "salesPrice": 249,
      "regularPrice": 269,
      "inStock": 3,
      "quantity": 0,
      "onSale": true,
      "description": "ผลิตภัณฑ์ตกแต่งแก้มและริมฝีปาก เนื้อครีมชนิดแท่ง รวมสองคุณประโยชน์ในหนึ่งเดียว ด้วยเนื้อครีมเนียนละเอียดนุ่มนวล จึงช่วยให้เกลี่ยง่าย สีสวยติดทนนาน มอบพวงแก้ม, ริมฝีปาก แลดูเปล่งปลั่ง สามารถนำไปผสมกับลิปสติกแท่งโปรดของคุณเพื่อให้ได้สีที่สวยไม่เหมือนใคร",
      "categoryID": [
          "8"
      ]
  }
]
class RecommendNineti9 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      showProducts: [],
      slideCount: 1,
      translateValue: 0,
      showLeftArrow: false,
      showRightArrow: true,
    };
  }
  componentDidMount() {
        
  }
  componentWillReceiveProps(nextProps) {
    console.log("recieve");
    const showProducts = this.getNextShowProduct(product_mock, 0, 3);
    this.setState({ products: product_mock, showProducts: showProducts })
  }

  getChunckedProducts = (products, perPage) => {
    return _.chunk(products, perPage);
  };

  onNextClick = () => {
    const limit = this.state.products.length -2;
    const slideCount = this.state.slideCount;
    // console.log('products length', this.state.products.length)
    // console.log(slideCount+1,limit,slideCount + 1 < limit )
    if (slideCount + 1 < limit) {
      this.setState({
        slideCount: slideCount + 1,
        translateValue: this.state.translateValue - OFF_SET_TRANSLATE_VALUE,
        showLeftArrow: true,
      });
    }
    else if (slideCount + 1 === limit) {
      this.setState({
        slideCount: slideCount + 1,
        translateValue: this.state.translateValue - OFF_SET_TRANSLATE_VALUE,
        showRightArrow: false,
        showLeftArrow: true,
      });
    } 
    else {
      this.setState({
        showRightArrow: false,
      })
    }
  };
  
  onPrevClick = () => {
    const slideCount = this.state.slideCount;
    if (slideCount - 1 > 1) {
      this.setState({
        slideCount: slideCount - 1,
        translateValue: this.state.translateValue + OFF_SET_TRANSLATE_VALUE,
        showRightArrow: true,
      });
    } 
    else if (slideCount - 1 === 1) {
      this.setState({
        slideCount: slideCount - 1,
        translateValue: this.state.translateValue + OFF_SET_TRANSLATE_VALUE,
        showRightArrow: true,
        showLeftArrow: false
      });
    }
    else {
      this.setState({showLeftArrow: false})
    }
  };

  getNextShowProduct = (products, start, end) => {
    const arr = products;
    console.log("arr",arr);
    if (start < end) {
      return arr.filter((x, idx) => {
        return idx >= start && idx <= end;
      });
    } else {
      let arr1 = arr.filter((x, idx) => {
        return idx >= start;
      });
      let arr2 = arr.filter((x, idx) => {
        return idx <= end;
      });
      return arr1.concat(arr2);
    }
  };
  render() {
    const title = this.props.title;
    const subTitle = this.props.subTitle;
    const adsImg = this.props.adsImg;
    const products = product_mock;
    console.log("products recommend",products);
    const previewSize = { height: 210, width: 210 };
    const translateValue = this.state.translateValue;
    const showLeftArrow = this.state.showLeftArrow
    const showRightArrow = this.state.showRightArrow

    return (
      <div className="article-nearby">
      <div className="article-nearby-title">
        <img height="40px" src="https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/NINETI9+PICKS-min.png" style={{margin:"0px 10px"}}/>
        บทความที่ใกล้เคียง
      </div>
      <div className="article-nearby-data">
        <div className="article-nearby-all">
        <button
          className="hightlight-prev-button"
          onClick={this.onPrevClick}
        >
          <div style={{width:"47px"}}>
            <img
              width="47px"
              src={showLeftArrow?"https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/prev-min.png":""}
            />
          </div>
        </button>

          <Nineti9pickSlide
            products={products}
            translateValue={translateValue}
          />
          {/* </div> */}
          <button
            className="hightlight-next-button"
            onClick={this.onNextClick}
          >
            <div style={{width:"47px"}}>
              <img
                width="47px"
                src={showRightArrow?"https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/next-min.png":""}
              />
            </div>
          </button>
        </div>
      </div>
    </div>
      
    );
  }
}

export default RecommendNineti9;
