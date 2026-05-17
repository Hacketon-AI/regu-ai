# Presentation Conversion Guide

This guide explains how to convert the ReguAI presentation to PDF format.

## Quick Start - HTML to PDF (Easiest)

### Method 1: Browser Print to PDF (Recommended)

1. Open `project-presentation.html` in your browser
2. Press `Ctrl+P` (Windows/Linux) or `Cmd+P` (Mac)
3. Select "Save as PDF" as the printer
4. Configure settings:
   - **Layout:** Portrait
   - **Paper size:** A4 or Letter
   - **Margins:** None or Minimal
   - **Background graphics:** Enabled
5. Click "Save" and name it `project-presentation.pdf`

**Result:** Professional PDF with all slides, ready for presentation!

### Method 2: Chrome Headless (Command Line)

```bash
# Windows PowerShell
$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
& $chrome --headless --disable-gpu --print-to-pdf="presentation/project-presentation.pdf" "presentation/project-presentation.html"

# Mac/Linux
google-chrome --headless --disable-gpu --print-to-pdf=presentation/project-presentation.pdf presentation/project-presentation.html
```

## Markdown to PDF/PPTX

### Using Marp CLI (Professional)

**Install:**

```bash
npm install -g @marp-team/marp-cli
```

**Generate PDF:**

```bash
cd presentation
marp project-presentation.md --pdf --allow-local-files
```

**Generate PowerPoint:**

```bash
cd presentation
marp project-presentation.md --pptx --allow-local-files
```

**Generate HTML:**

```bash
cd presentation
marp project-presentation.md --html --allow-local-files
```

### Using Pandoc

**Install Pandoc:**

- Windows: Download from https://pandoc.org/installing.html
- Mac: `brew install pandoc`
- Linux: `sudo apt-get install pandoc`

**Generate PowerPoint:**

```bash
cd presentation
pandoc project-presentation.md -o project-presentation.pptx
```

**Generate PDF (requires LaTeX):**

```bash
cd presentation
pandoc project-presentation.md -o project-presentation.pdf --pdf-engine=xelatex
```

### Using reveal-md (Web Presentation)

**Install:**

```bash
npm install -g reveal-md
```

**View in browser:**

```bash
cd presentation
reveal-md project-presentation.md
```

**Export to PDF:**

```bash
cd presentation
reveal-md project-presentation.md --print project-presentation.pdf
```

## Python Script (PowerPoint)

**Install dependencies:**

```bash
pip install python-pptx
```

**Generate:**

```bash
cd presentation
python generate_presentation.py
```

This creates `project-presentation.pptx` with 16 slides.

## VS Code Extension

1. Install "Marp for VS Code" extension
2. Open `project-presentation.md`
3. Click "Open Preview" button (top right)
4. Click "Export Slide Deck" button
5. Choose PDF or PPTX format

## Online Converters

If you can't install software:

1. **Markdown to PDF:**
   - https://www.markdowntopdf.com/
   - Upload `project-presentation.md`
   - Download PDF

2. **HTML to PDF:**
   - https://www.web2pdfconvert.com/
   - Upload `project-presentation.html`
   - Download PDF

## Troubleshooting

### PowerShell Execution Policy Error

If you get "running scripts is disabled" error:

```powershell
# Run PowerShell as Administrator
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### npm Command Not Found

Use Node.js directly:

```bash
node node_modules/@marp-team/marp-cli/marp-cli.js project-presentation.md --pdf
```

### Python Module Not Found

Ensure pip is installing to the correct Python:

```bash
python -m pip install python-pptx
python generate_presentation.py
```

### Chrome Not Found

Update the Chrome path in the command:

```powershell
# Find Chrome location
Get-Command chrome
# Or manually locate: C:\Program Files\Google\Chrome\Application\chrome.exe
```

## Recommended Workflow

**For immediate use:**

1. Open `project-presentation.html` in browser
2. Print to PDF (Ctrl+P → Save as PDF)
3. Done! ✅

**For editing:**

1. Edit `project-presentation.md` in VS Code
2. Install Marp extension
3. Preview changes live
4. Export to PDF/PPTX when ready

**For PowerPoint:**

1. Use Marp CLI: `marp project-presentation.md --pptx`
2. Or use Python script: `python generate_presentation.py`
3. Open in PowerPoint for final edits

## File Outputs

After conversion, you should have:

- ✅ `project-presentation.pdf` - PDF version
- ✅ `project-presentation.pptx` - PowerPoint version (optional)
- ✅ `project-presentation.html` - HTML version (already created)
- ✅ `project-presentation.md` - Markdown source (already created)

## Quality Tips

### For Best PDF Quality:

1. Use Chrome/Edge browser (better rendering)
2. Enable background graphics
3. Set margins to "None"
4. Use A4 or Letter paper size
5. Ensure all fonts load properly

### For Best PowerPoint Quality:

1. Use Marp CLI (better formatting)
2. Or use Python script (custom styling)
3. Review slides after generation
4. Adjust fonts/colors if needed

## Next Steps

1. Generate PDF using your preferred method
2. Review all slides for formatting
3. Test presentation flow
4. Share with team or judges
5. Keep markdown source for future edits

---

**Need help?** Check the main README.md for more details.

**Made with Bob** 🤖
