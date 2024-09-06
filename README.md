# Marp API

This project provides an API for converting Markdown to various presentation formats using Marp.

## Features

- Convert Markdown to PDF, PPTX (slides as static images), or HTML
- Customizable output options
- Dockerized for easy deployment

## Installation

Choose one of the following installation methods:

<details>
<summary><strong>Option 1: Docker</strong></summary>

1. Make sure you have Docker installed on your system.
2. Clone this repository:
   ```
   git clone https://github.com/pvanand07/Marpit-API-HTML-Presentation.git
   cd marp-api
   ```
3. Build and run the Docker container:
   ```
   docker build -t marp-api .
   docker run -p 3000:3000 marp-api
   ```
</details>

<details>
<summary><strong>Option 2: Docker Compose</strong></summary>

1. Ensure you have Docker and Docker Compose installed.
2. Clone this repository:
   ```
   git clone https://github.com/pvanand07/Marpit-API-HTML-Presentation.git
   cd marp-api
   ```
3. Run the application using Docker Compose:
   ```
   docker-compose up
   ```
</details>

<details>
<summary><strong>Option 3: NPM</strong></summary>

1. Make sure you have Node.js (version 16 or later) and npm installed.
2. Clone this repository:
   ```
   git clone https://github.com/pvanand07/Marpit-API-HTML-Presentation.git
   cd marp-api
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the server:
   ```
   npm start
   ```
</details>

## Usage

Send a POST request to the `/convert` endpoint with the following JSON payload:

```json
{
  "markdown": "Your Markdown content here",
  "outputFormat": "pdf",
  "options": ["--theme", "gaia"]
}
```

- `markdown`: The Markdown content to convert
- `outputFormat`: The desired output format (`pdf`, `pptx`, or `html`)
- `options`: An array of additional Marp CLI options (optional)

Example using cURL:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"markdown": "# Hello World", "outputFormat": "pdf"}' http://localhost:3000/convert > output.pdf
```

## API Endpoints

- `POST /convert`: Convert Markdown to the specified output format

## Configuration

The server listens on port 3000 by default. You can change this by setting the `PORT` environment variable.

## Dependencies

- Express.js
- @marp-team/marp-cli
- Puppeteer

## Docker

The included Dockerfile sets up the environment with Node.js, Chrome, and necessary fonts for rendering various character sets.

## License

[MIT License](LICENSE)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

[IMP] If you are deploying on HF🤗 spaces, keep only the below section in Readme.md (required for spaces to recognize docker)
 ```
---
title: Marpit Backend
emoji: 👁
colorFrom: pink
colorTo: purple
sdk: docker
pinned: false
---
```

## Documentation from official [Marpit repo](https://github.com/marp-team/marpit)
<div align="center">

### [🗒 Documentation](https://marpit.marp.app/) | [⚙ API](https://marpit-api.marp.app/)

</div>

---

**Marpit** /mɑːrpɪt/ is the skinny framework for creating slide deck from Markdown. It can transform Markdown and CSS theme(s) to slide deck composed of static HTML and CSS and create a web page convertible into slide PDF by printing.

Marpit is designed to _output minimum assets for the slide deck_. You can use the bare assets as a logicless slide deck, but mainly we expect to integrate output with other tools and applications.

In fact, this framework is created for using as the base of [a core converter][marp-core] in [Marp ecosystem][marp].

[marp]: https://github.com/marp-team/marp/
[marp-core]: https://github.com/marp-team/marp-core/

## Features

### [:pencil: **Marpit Markdown**](https://marpit.marp.app/markdown)

We have extended several features into [markdown-it](https://github.com/markdown-it/markdown-it) parser to support writing awesome slides, such as [_Directives_](https://marpit.marp.app/directives) and [_Slide backgrounds_](https://marpit.marp.app/image-syntax?id=slide-backgrounds). Additional syntaxes place importance on a compatibility with general Markdown documents.

### [:art: **Theme CSS by clean markup**](https://marpit.marp.app/theme-css)

Marpit has the CSS theming system that can design slides everything. Unlike other slide frameworks, there are not any predefined classes and mixins. You have only to focus styling HTML elements by pure CSS. Marpit would take care of the selected theme's necessary conversion.

### [:triangular_ruler: **Inline SVG slide**](https://marpit.marp.app/inline-svg) _(Experimental)_

Optionally `<svg>` element can use as the container of each slide page. It can be realized the pixel-perfect scaling of the slide only by CSS, so handling slides in integrated apps become simplified. The isolated layer made by `<foreignObject>` can provide [_advanced backgrounds_](https://marpit.marp.app/image-syntax?id=advanced-backgrounds) for the slide with keeping the original Markdown DOM structure.

> We not provide any themes because Marpit is just a framework. You can use [@marp-team/marp-core][marp-core] if you want. It has the official themes, and practical features extended from Marpit.

## Getting started

See [the documentation of Marpit](https://marpit.marp.app/?id=getting-started) to get started.

- **[Documentation](https://marpit.marp.app/)**
- [API (JSDoc)](https://marpit-api.marp.app/)

## License

This framework releases under the [MIT License](LICENSE).
