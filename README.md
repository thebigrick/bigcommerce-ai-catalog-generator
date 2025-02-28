# BigCommerce Catalog Generator

This tool automatically generates and uploads product catalogs to BigCommerce stores using AI content generation. It
leverages OpenAI for text content and The Hive AI for product images.

## Features

- Create complete product catalogs with AI-generated descriptions and images
- Configure multiple catalog projects for different types of e-commerce stores
- Upload generated catalogs directly to your BigCommerce store
- Customizable project templates

## Prerequisites

- Node.js (v20 or higher)
- BigCommerce store with API access
- OpenAI API key
- The Hive AI API key

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/thebigrick/bigcommerce-ai-catalog-generator.git
   cd bigcommerce-ai-catalog-generator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   OPENAI_API_KEY=your_openai_api_key
   BIGCOMMERCE_ACCESS_TOKEN=your_bigcommerce_access_token
   BIGCOMMERCE_STORE_HASH=your_bigcommerce_store_hash
   THE_HIVE_AI_API_KEY=your_hive_ai_api_key
   ```

## Setup

After installation, you need to build the OpenAI assistant that powers the catalog generation:

```bash
npm run assistant:build
```

This command will return an assistant ID. Add this ID to your `.env.local` file:

```
OPENAI_ASSISTANT_ID=the_returned_assistant_id
```

## Usage

### Existing Projects

The tool comes with pre-configured project templates in the `projects` directory. You can use these as-is or modify them
to suit your needs.

### Creating a New Project

To create a new project, create a new folder in the `projects` directory with your project configuration files. See the
existing projects for reference on required structure and parameters.

### Generating a Catalog

To generate and upload a catalog based on a project template:

```bash
npm run catalog:generate <projectName>
```

Replace `<projectName>` with the name of the project folder in the `projects` directory.

The tool will:

1. Generate product descriptions using OpenAI
2. Create product images using The Hive AI
3. Upload the complete catalog to your configured BigCommerce store

## Best Practices

- **Start with an empty catalog**: For optimal results, start with a fresh BigCommerce store or remove existing products
  before generation.
- **Review project templates**: Customize the existing project templates to match your specific e-commerce needs.
- **API rate limits**: Be mindful of API rate limits for both OpenAI and The Hive AI when generating large catalogs.

## Project Structure

```
bigcommerce-ai-catalog-generator/
├── projects/                  # Project templates
│   ├── project1.json          # Sample project
│   ├── project2.json          # Sample project
│   └── ...
├── src/                       # Source code
├── .env.local                 # Environment variables
├── package.json
└── README.md
```

## Troubleshooting

- **API Key Issues**: Ensure all API keys in your `.env.local` file are correct and have the necessary permissions.
- **Generation Failures**: Check the logs for specific error messages from OpenAI or The Hive AI.
- **Upload Errors**: Verify your BigCommerce API credentials and store hash.

## License

[MIT License](LICENSE)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.