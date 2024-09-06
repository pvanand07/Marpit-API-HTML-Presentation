
# Marp API

The Marp API is a Node.js Express application that allows you to convert Markdown files to various formats using the Marp CLI tool.

## Features

- Convert Markdown files to PDF or HTML
- Supports custom Marp CLI options
- Runs in a Docker container for easy deployment

## Prerequisites

- Node.js (version 16 or later)
- Docker (optional, if using Docker for deployment)

## Installation

There are three ways to install and run the Marp API:

<details>
  <summary><h3>1. Docker</h3></summary>

  1. Clone the repository:
     ```
     git clone https://github.com/yourusername/marp-api.git
     cd marp-api
     ```

  2. Build the Docker image:
     ```
     docker build -t marp-api .
     ```

  3. Run the Docker container:
     ```
     docker run -p 3000:3000 marp-api
     ```
</details>

<details>
  <summary><h3>2. Docker Compose</h3></summary>

  1. Clone the repository:
     ```
     git clone https://github.com/yourusername/marp-api.git
     cd marp-api
     ```

  2. Run the Docker Compose command:
     ```
     docker-compose up
     ```
</details>

<details>
  <summary><h3>3. npm</h3></summary>

  1. Clone the repository:
     ```
     git clone https://github.com/yourusername/marp-api.git
     cd marp-api
     ```

  2. Install dependencies:
     ```
     npm install
     ```

  3. Start the server:
     ```
     npm start
     ```
</details>

## Usage

<h3>API Endpoint</h3>

<ul>
  <li>URL: <code>POST /convert</code></li>
  <li>Request Body:
    <pre>
```json
{
  "markdown": "# Your Markdown content here",
  "outputFormat": "pdf",
  "options": [
    "--theme-set", "path/to/your/theme.css"
  ]
}
```
    </pre>
    <ul>
      <li><code>markdown</code> (required): The Markdown content to be converted.</li>
      <li><code>outputFormat</code> (required): The desired output format. Supported values: <code>pdf</code>, <code>html</code>.</li>
      <li><code>options</code> (optional): An array of additional Marp CLI options.</li>
    </ul>
  </li>
</ul>

<h3>Example Request</h3>

<pre>
```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "markdown": "# Hello, Marp!",
  "outputFormat": "pdf"
}' http://localhost:3000/convert
```
</pre>


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
