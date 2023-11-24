const puppeteer = require("puppeteer"); // local
const fs = require("fs");

async function generatePDFFromHTML(htmlContent, outputPath, header) {
  const browser = await puppeteer.launch({ headless: "new" }); // local
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
