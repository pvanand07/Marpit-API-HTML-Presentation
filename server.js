const express = require('express');
const { marpCli } = require('@marp-team/marp-cli');
const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const os = require('os');
const path = require('path');

const app = express();
app.use(express.json());

let browser;

async function initializeBrowser() {
  browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
}

initializeBrowser();

app.post('/convert', async (req, res) => {
  const { markdown, outputFormat, options = [] } = req.body;

  if (!markdown || !outputFormat) {
    return res.status(400).json({ error: 'Missing markdown or outputFormat' });
  }

  try {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'marp-'));
    const inputFile = path.join(tmpDir, 'input.md');
    const outputFile = path.join(tmpDir, `output.${outputFormat}`);

    await fs.writeFile(inputFile, markdown);

    const cliOptions = [
      inputFile,
      '--output', outputFile,
      `--${outputFormat}`,
      '--html',
      '--allow-local-files',
      '--puppeteer-launch-args', '["--no-sandbox", "--disable-setuid-sandbox"]',
      '--puppeteer-browser-executable', await browser.executablePath(),
      ...options
    ];

    if (outputFormat === 'pdf' || outputFormat === 'pptx') {
      cliOptions.push(`--${outputFormat}-notes`);
      cliOptions.push(`--${outputFormat}-delay`, '3000');
    }

    await marpCli(cliOptions);

    const output = await fs.readFile(outputFile);

    await fs.rm(tmpDir, { recursive: true });

    res.contentType(outputFormat);
    res.send(output);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Conversion failed' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Marp API server listening on port ${port}`);
});

process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');
  if (browser) {
    await browser.close();
  }
  process.exit(0);
});
