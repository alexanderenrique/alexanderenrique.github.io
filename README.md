# bits_and_bolts
Alex's Blog where he talks about cars, code, microelectronics, and sometimes using code to program microelectronics for his car. It's a cross disciplinary adventure.

## Automatic Deployment

This site is automatically built and deployed using GitHub Actions. When you push changes to the `main` branch:

1. **GitHub Actions** automatically triggers a build
2. **MkDocs** builds your site from the `docs/` directory
3. **GitHub Pages** deploys the built site to `https://alexanderenrique.github.io/bits_and_bolts/`

### Local Development

To test changes locally before pushing:

```bash
# Install dependencies
pip install -r requirements.txt

# Serve locally
mkdocs serve

# Build locally
mkdocs build
```

### Manual Deployment

You can also manually trigger a deployment from the GitHub Actions tab in your repository.