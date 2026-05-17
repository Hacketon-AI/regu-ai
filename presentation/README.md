# ReguAI Presentation

This directory contains the professional presentation for the ReguAI project.

## Files

- `project-presentation.md` - Markdown source with Marp formatting (editable)
- `generate_presentation.py` - Python script for PowerPoint generation (requires python-pptx)
- `README.md` - This file

## Viewing the Presentation

### Option 1: Marp (Recommended)

Marp is a markdown presentation ecosystem that creates beautiful slides.

**Install Marp CLI:**

```bash
npm install -g @marp-team/marp-cli
```

**Generate PDF:**

```bash
marp project-presentation.md --pdf --allow-local-files
```

**Generate PowerPoint:**

```bash
marp project-presentation.md --pptx --allow-local-files
```

**Generate HTML:**

```bash
marp project-presentation.md --html --allow-local-files
```

**Preview in browser:**

```bash
marp project-presentation.md --preview
```

### Option 2: VS Code Extension

1. Install "Marp for VS Code" extension
2. Open `project-presentation.md`
3. Click "Open Preview" button
4. Export to PDF/PPTX from preview

### Option 3: Pandoc

**Install Pandoc:**

- Download from https://pandoc.org/installing.html

**Generate PowerPoint:**

```bash
pandoc project-presentation.md -o project-presentation.pptx
```

**Generate PDF (requires LaTeX):**

```bash
pandoc project-presentation.md -o project-presentation.pdf --pdf-engine=xelatex
```

### Option 4: reveal.js (Web Presentation)

**Install reveal-md:**

```bash
npm install -g reveal-md
```

**View presentation:**

```bash
reveal-md project-presentation.md
```

**Export to PDF:**

```bash
reveal-md project-presentation.md --print project-presentation.pdf
```

### Option 5: Python Script (PowerPoint)

**Install dependencies:**

```bash
pip install python-pptx
```

**Generate PowerPoint:**

```bash
python generate_presentation.py
```

This creates `project-presentation.pptx` in the presentation directory.

## Presentation Structure

The presentation includes 20+ slides covering:

1. **Cover Slide** - Project title and tagline
2. **Problem Statement** - Pain points and challenges
3. **Solution Overview** - How ReguAI solves the problem
4. **Core Features** - Key functionality breakdown
5. **System Architecture** - Technical architecture overview
6. **Technical Stack** - Technologies used
7. **Authentication & Security** - Security implementation
8. **Database Schema** - Data models and relationships
9. **API Architecture** - API design and endpoints
10. **Report Generation** - Automated report system
11. **Challenges & Solutions** - Technical challenges overcome
12. **Key Improvements** - Major enhancements implemented
13. **Product Demo Flow** - User journey walkthrough
14. **Scalability & Future** - Roadmap and scaling strategy
15. **Demo Script** - Step-by-step demo guide
16. **Built with IBM Bob** - AI assistance acknowledgment
17. **Thank You** - Closing slide
18. **Appendix** - Technical details, enums, security, documentation

## Customization

The markdown file uses Marp directives for styling:

- `<!-- _class: lead -->` - Center-aligned title slides
- `<!-- _backgroundColor: #2563eb -->` - Blue background
- `<!-- _color: white -->` - White text
- Grid layouts for two-column content

Edit `project-presentation.md` to customize content, colors, or layout.

## Quick Start

**Fastest way to view:**

1. Install Marp CLI: `npm install -g @marp-team/marp-cli`
2. Generate PDF: `marp project-presentation.md --pdf`
3. Open `project-presentation.pdf`

**For editing:**

1. Install VS Code extension "Marp for VS Code"
2. Open `project-presentation.md` in VS Code
3. Click preview button
4. Edit and see live updates

## Demo Credentials

When presenting the live demo:

- **URL:** http://localhost:3000
- **Email:** demo@reguai.local
- **Password:** demo-password

## Notes

- The presentation is optimized for 16:9 aspect ratio
- All content is based on actual codebase analysis
- Includes technical details suitable for hackathon judges
- Professional design suitable for investor presentations
- Comprehensive appendix for technical deep-dives

## Support

For issues with:

- **Marp:** https://marp.app/
- **Pandoc:** https://pandoc.org/
- **reveal.js:** https://revealjs.com/

---

**Made with Bob** 🤖
