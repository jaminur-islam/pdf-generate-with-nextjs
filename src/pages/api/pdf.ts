// const chromium = require('chrome-aws-lambda');
// const puppeteer = require("puppeteer");
const path = require("path")
const ShortUniqueId = require('short-unique-id');
// import chromium from 'chrome-aws-lambda';
import chrome from 'chrome-aws-lambda';
import puppeteer from 'puppeteer-core';

export default async function handler(req ,res ){
  console.log("------------------------------------------------")
  const uid = new ShortUniqueId();
  const pdfPath = path.join(__dirname , "../../../../src/public/pdf" , `employee-schedule${uid()}.pdf`);
  try {
    // const browser = await puppeteer.launch({ headless: true    });
    const options = process.env.AWS_REGION
    ? {
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless
      }
    : {
        args: [],
        executablePath:
          process.platform === 'win32'
            ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
            : process.platform === 'linux'
            ? '/usr/bin/google-chrome'
            : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
      };
    /* const browser = await chromium.puppeteer.launch({
      args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    }) */
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    // await page.goto("http://localhost:3500")
    // const content = await compiler("index", data);
    await page.setContent(`<h1> sagor is the power full man </h1>`);
    await page.setViewport({
      width: 595,
      height: 842,
      deviceScaleFactor: 1,
    });
    await page.addStyleTag({ content: "@page { size: A4 landscape; }" });
    await page.pdf({
      path: pdfPath,
      format: "A4",
      printBackground: true,
      margin: {
        top: "40px",
        right: "30px",
        bottom: "0px",
        left: "30px",
      },
    });
    await browser.close();
    // stop all execution after this line
    // process.exit();
  } catch (err) {
    console.log(err);
  }finally{
    res.send("good")
  }
} 