const puppeteerCore = require("puppeteer-core"); // server
// const puppeteer = require("puppeteer"); // local
const fs = require("fs");

async function generatePDFFromHTML(htmlContent, outputPath, header) {
  process.env.PUPPETEER_EXECUTABLE_PATH = "/usr/bin/google-chrome-stable";

  const browser = await puppeteerCore.launch({
    headless: "new",
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
    args: ["--no-sandbox"],
  }); // server
  // const browser = await puppeteer.launch({ headless: "new" }); // local
  const page = await browser.newPage();

  await page.setContent(htmlContent, { waitUntil: "load" });

  await page.pdf({
    path: outputPath,
    format: "A4",
    scale: 1.0,
    margin: {
      top: "15mm",
      bottom: "15mm",
      left: "10mm",
      right: "10mm",
    },
    displayHeaderFooter: true,
    headerTemplate: header,
    footerTemplate: `<p></p>`,
  });

  await browser.close();
  console.log(`PDF generated successfully at ${outputPath}`);
}

module.exports = generatePDFFromHTML;
