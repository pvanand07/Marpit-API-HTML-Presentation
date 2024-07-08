const express = require('express');
const { marpCli } = require('@marp-team/marp-cli');
const fs = require('fs').promises;
const path = require('path');

const app = express();
app.use(express.json());

// Use the dedicated temporary directory
const tmpDir = '/tmp/marp-work';

app.post('/convert', async (req, res) => {
  const { markdown, outputFormat, options = [] } = req.body;

  if (!markdown || !outputFormat) {
    return res.status(400).json({ error: 'Missing markdown or outputFormat' });
  }

  try {
    const inputFile = path.join(tmpDir, `input_${Date.now()}.md`);
    const outputFile = path.join(tmpDir, `output_${Date.now()}.${outputFormat}`);

    await fs.writeFile(inputFile, markdown);

    const cliOptions = [
      inputFile,
      '--output', outputFile,
      `--${outputFormat}`,
      '--html',  // Added --html flag for all conversions
      ...options
    ];

    // Add options for PDF and PPTX conversion
    if (outputFormat === 'pdf' || outputFormat === 'pptx') {
      cliOptions.push('--allow-local-files');
      cliOptions.push(`--${outputFormat}-notes`);
      cliOptions.push(`--${outputFormat}-delay`, '3000');  // 3 seconds delay
    }

    await marpCli(cliOptions);

    const output = await fs.readFile(outputFile);

    // Clean up temporary files
    await fs.unlink(inputFile);
    await fs.unlink(outputFile);

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