// const chromium = require('chrome-aws-lambda');
const puppeteer = require("puppeteer");
const path = require("path")
const ShortUniqueId = require('short-unique-id');

export default async function handler(req ,res ){
  console.log("------------------------------------------------")
  const uid = new ShortUniqueId();
  const pdfPath = path.join(__dirname , "../../../../src/public/pdf" , `employee-schedule${uid()}.pdf`);
  try {
    const browser = await puppeteer.launch({ headless: true    });
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