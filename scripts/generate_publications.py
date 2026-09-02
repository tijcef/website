from __future__ import annotations

from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Flowable,
    Frame,
    KeepTogether,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)
from reportlab.lib.utils import ImageReader


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
ASSETS = ROOT / "src" / "assets"
PAGE_W, PAGE_H = A4

NAVY = colors.HexColor("#102F42")
GREEN = colors.HexColor("#10613F")
TEAL = colors.HexColor("#168B78")
LIME = colors.HexColor("#B8D432")
INK = colors.HexColor("#17313B")
MUTED = colors.HexColor("#5A6D73")
PALE = colors.HexColor("#EEF6F1")
LIGHT = colors.HexColor("#F6F8F7")
LINE = colors.HexColor("#D7E2DD")
WHITE = colors.white

pdfmetrics.registerFont(TTFont("DejaVu", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
pdfmetrics.registerFont(TTFont("DejaVu-Bold", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"))
pdfmetrics.registerFont(TTFont("DejaVu-Serif", "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf"))
pdfmetrics.registerFont(TTFont("DejaVu-SerifBold", "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf"))


class AccentRule(Flowable):
    def __init__(self, width=26 * mm, height=2.4 * mm, color=LIME):
        super().__init__()
        self.width = width
        self.height = height
        self.color = color

    def draw(self):
        self.canv.setFillColor(self.color)
        self.canv.roundRect(0, 0, self.width, self.height, self.height / 2, fill=1, stroke=0)


def styles():
    base = getSampleStyleSheet()
    return {
        "eyebrow": ParagraphStyle(
            "Eyebrow", parent=base["Normal"], fontName="DejaVu-Bold", fontSize=8.5,
            leading=11, textColor=TEAL, spaceAfter=4 * mm, uppercase=True,
        ),
        "h1": ParagraphStyle(
            "H1", parent=base["Heading1"], fontName="DejaVu-SerifBold", fontSize=29,
            leading=33, textColor=NAVY, spaceAfter=5 * mm,
        ),
        "h2": ParagraphStyle(
            "H2", parent=base["Heading2"], fontName="DejaVu-SerifBold", fontSize=20,
            leading=24, textColor=NAVY, spaceBefore=2 * mm, spaceAfter=4 * mm,
        ),
        "h3": ParagraphStyle(
            "H3", parent=base["Heading3"], fontName="DejaVu-Bold", fontSize=11.5,
            leading=15, textColor=GREEN, spaceAfter=2 * mm,
        ),
        "body": ParagraphStyle(
            "Body", parent=base["BodyText"], fontName="DejaVu", fontSize=9.4,
            leading=14.2, textColor=INK, spaceAfter=3.2 * mm,
        ),
        "small": ParagraphStyle(
            "Small", parent=base["BodyText"], fontName="DejaVu", fontSize=7.8,
            leading=11.2, textColor=MUTED, spaceAfter=2 * mm,
        ),
        "bullet": ParagraphStyle(
            "Bullet", parent=base["BodyText"], fontName="DejaVu", fontSize=9,
            leading=13, textColor=INK, leftIndent=5 * mm, firstLineIndent=-3 * mm,
            bulletIndent=0, spaceAfter=2 * mm,
        ),
        "stat": ParagraphStyle(
            "Stat", parent=base["Normal"], fontName="DejaVu-SerifBold", fontSize=22,
            leading=24, textColor=GREEN, alignment=TA_CENTER,
        ),
        "statlabel": ParagraphStyle(
            "StatLabel", parent=base["Normal"], fontName="DejaVu-Bold", fontSize=7.3,
            leading=10, textColor=MUTED, alignment=TA_CENTER,
        ),
        "white_h1": ParagraphStyle(
            "WhiteH1", parent=base["Heading1"], fontName="DejaVu-SerifBold", fontSize=33,
            leading=37, textColor=WHITE, alignment=TA_LEFT, spaceAfter=5 * mm,
        ),
        "white_body": ParagraphStyle(
            "WhiteBody", parent=base["BodyText"], fontName="DejaVu", fontSize=11,
            leading=16, textColor=colors.HexColor("#EAF3EF"),
        ),
        "white_small": ParagraphStyle(
            "WhiteSmall", parent=base["BodyText"], fontName="DejaVu-Bold", fontSize=8,
            leading=11, textColor=LIME,
        ),
        "quote": ParagraphStyle(
            "Quote", parent=base["BodyText"], fontName="DejaVu-Serif", fontSize=13,
            leading=19, textColor=NAVY, leftIndent=7 * mm, borderColor=LIME,
            borderWidth=0, borderPadding=0, spaceAfter=4 * mm,
        ),
    }


S = styles()


def draw_cover_image(canvas, image_path: Path):
    reader = ImageReader(str(image_path))
    img_w, img_h = reader.getSize()
    scale = max(PAGE_W / img_w, PAGE_H / img_h)
    width, height = img_w * scale, img_h * scale
    canvas.drawImage(reader, (PAGE_W - width) / 2, (PAGE_H - height) / 2, width, height, mask="auto")


def draw_logo(canvas, x, y, width=42 * mm):
    reader = ImageReader(str(ASSETS / "tijcef-logo.webp"))
    w, h = reader.getSize()
    canvas.drawImage(reader, x, y, width, width * h / w, mask="auto")


def standard_page(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(NAVY)
    canvas.rect(0, PAGE_H - 13 * mm, PAGE_W, 13 * mm, fill=1, stroke=0)
    draw_logo(canvas, 18 * mm, PAGE_H - 11.2 * mm, 25 * mm)
    canvas.setFont("DejaVu-Bold", 7.4)
    canvas.setFillColor(colors.HexColor("#D9E8E0"))
    canvas.drawRightString(PAGE_W - 18 * mm, PAGE_H - 8.2 * mm, doc.report_label.upper())
    canvas.setStrokeColor(LINE)
    canvas.line(18 * mm, 15 * mm, PAGE_W - 18 * mm, 15 * mm)
    canvas.setFont("DejaVu", 7)
    canvas.setFillColor(MUTED)
    canvas.drawString(18 * mm, 10 * mm, "www.tijcef.org  |  info@tijcef.org  |  @tijcef")
    canvas.drawRightString(PAGE_W - 18 * mm, 10 * mm, f"{canvas.getPageNumber():02d}")
    canvas.restoreState()


class BrandedDocument(BaseDocTemplate):
    def __init__(self, filename: str, report_label: str):
        super().__init__(
            filename,
            pagesize=A4,
            rightMargin=18 * mm,
            leftMargin=18 * mm,
            topMargin=23 * mm,
            bottomMargin=20 * mm,
            title=report_label,
            author="Tijwun Care and Empowerment Foundation",
            subject="TIJCEF public accountability and partner information",
        )
        self.report_label = report_label
        frame = Frame(self.leftMargin, self.bottomMargin, self.width, self.height, id="body")
        self.addPageTemplates(PageTemplate(id="standard", frames=frame, onPage=standard_page))


def section(eyebrow: str, title: str, intro: str | None = None):
    items = [Paragraph(eyebrow.upper(), S["eyebrow"]), Paragraph(title, S["h1"]), AccentRule(), Spacer(1, 5 * mm)]
    if intro:
        items.append(Paragraph(intro, S["body"]))
    return items


def bullet(text: str):
    return Paragraph(f"•&nbsp;&nbsp;{text}", S["bullet"])


def callout(title: str, body: str, color=PALE):
    table = Table([[Paragraph(title, S["h3"]), Paragraph(body, S["body"])]], colWidths=[43 * mm, 118 * mm])
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), color),
        ("BOX", (0, 0), (-1, -1), 0.6, LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 5 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5 * mm),
        ("TOPPADDING", (0, 0), (-1, -1), 4 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2 * mm),
    ]))
    return table


def stats_table():
    data = [
        [Paragraph("3,500+", S["stat"]), Paragraph("1,200+", S["stat"]), Paragraph("4", S["stat"]), Paragraph("3", S["stat"])],
        [Paragraph("CUMULATIVE PEOPLE REACHED", S["statlabel"]), Paragraph("PEOPLE REACHED IN 2026", S["statlabel"]), Paragraph("PROGRAMME AREAS", S["statlabel"]), Paragraph("STATES WITH RECORDED ACTIVITIES", S["statlabel"])],
    ]
    table = Table(data, colWidths=[40.25 * mm] * 4, rowHeights=[14 * mm, 13 * mm])
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), PALE),
        ("BOX", (0, 0), (-1, -1), 0.7, LINE),
        ("INNERGRID", (0, 0), (-1, -1), 0.5, LINE),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 3 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 3 * mm),
    ]))
    return table


def cover_page(canvas, title: str, subtitle: str, edition: str, image_path: Path):
    draw_cover_image(canvas, image_path)
    canvas.setFillColor(colors.Color(0.035, 0.15, 0.20, alpha=0.83))
    canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    canvas.setFillColor(GREEN)
    canvas.rect(0, 0, 7 * mm, PAGE_H, fill=1, stroke=0)
    draw_logo(canvas, 20 * mm, PAGE_H - 43 * mm, 50 * mm)
    frame = Frame(20 * mm, 35 * mm, 158 * mm, 118 * mm, showBoundary=0)
    story = [
        Paragraph("TIJWUN CARE AND EMPOWERMENT FOUNDATION", S["white_small"]),
        Spacer(1, 5 * mm),
        Paragraph(title, S["white_h1"]),
        AccentRule(35 * mm, 2.8 * mm, LIME),
        Spacer(1, 7 * mm),
        Paragraph(subtitle, S["white_body"]),
        Spacer(1, 13 * mm),
        Paragraph(edition, S["white_small"]),
    ]
    frame.addFromList(story, canvas)


def build_annual_report():
    output = PUBLIC / "TIJCEF_ANNUAL_REPORT_2025.pdf"
    doc = BrandedDocument(str(output), "TIJCEF Annual Report 2025 — Corrected Edition")
    story = []
    story.extend(section(
        "Executive overview",
        "A credible record of community delivery",
        "TIJCEF works with women, adolescent girls and young people through four connected programme areas. This corrected edition aligns the report with the organisation's approved public figures and current programme framework.",
    ))
    story.append(stats_table())
    story.append(Spacer(1, 7 * mm))
    story.append(callout(
        "Correction notice",
        "An earlier edition contained an unreconciled cumulative reach figure and retired programme labels. Those claims have been withdrawn. The approved organisation-wide public figures as at August 2026 are 3,500+ cumulative people reached and 1,200+ people reached in 2026. The latter is a post-reporting-period update and is not presented as a 2025 result.",
        colors.HexColor("#FFF7E5"),
    ))
    story.append(Spacer(1, 6 * mm))
    story.append(Paragraph("Purpose and reporting boundary", S["h2"]))
    story.append(Paragraph(
        "This is a public narrative report. It describes TIJCEF's direction, accountability approach and evidence available for partner assessment. It does not substitute for project-specific monitoring records, partner reports or audited financial statements. Eligible funders may request proportionate due-diligence materials directly from TIJCEF.",
        S["body"],
    ))
    story.append(Paragraph("Our mission", S["h2"]))
    story.append(Paragraph(
        "To advance the health, knowledge, leadership and resilience of underserved women and young people through community-led programmes, practical partnerships and evidence-informed advocacy.",
        S["quote"],
    ))
    story.append(PageBreak())

    story.extend(section(
        "Programme framework",
        "Four values. Four clear areas of work.",
        "Dignity, Agency, Resilience and Evidence remain TIJCEF's organising pillars. Each is now paired with a plain-language programme area so communities, donors and implementation partners can understand the work without interpretation.",
    ))
    rows = [
        [Paragraph("PILLAR", S["statlabel"]), Paragraph("PROGRAMME AREA", S["statlabel"]), Paragraph("WHAT TIJCEF DOES", S["statlabel"])],
        [Paragraph("Dignity", S["h3"]), Paragraph("Health, Menstrual Dignity & WASH", S["h3"]), Paragraph("Menstrual health education, dignity support, health awareness, school and community WASH engagement.", S["body"])],
        [Paragraph("Agency", S["h3"]), Paragraph("Education, Skills & Leadership", S["h3"]), Paragraph("Youth and women leadership, entrepreneurship, mentoring, school engagement and volunteer development.", S["body"])],
        [Paragraph("Resilience", S["h3"]), Paragraph("Climate Action & Stronger Communities", S["h3"]), Paragraph("Community sanitation, environmental awareness, local climate action and practical resilience building.", S["body"])],
        [Paragraph("Evidence", S["h3"]), Paragraph("Research, Learning & Advocacy", S["h3"]), Paragraph("Needs assessment, monitoring, learning products, responsible public reporting and evidence-informed advocacy.", S["body"])],
    ]
    table = Table(rows, colWidths=[25 * mm, 54 * mm, 82 * mm], repeatRows=1)
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), NAVY),
        ("TEXTCOLOR", (0, 0), (-1, 0), WHITE),
        ("BACKGROUND", (0, 1), (-1, -1), LIGHT),
        ("GRID", (0, 0), (-1, -1), 0.6, LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 4 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 4 * mm),
        ("TOPPADDING", (0, 0), (-1, -1), 4 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3 * mm),
    ]))
    story.append(table)
    story.append(Spacer(1, 7 * mm))
    story.append(callout(
        "Geographic scope",
        "TIJCEF is based in Jalingo, Taraba State, and has recorded programme activity in Adamawa, Katsina and Taraba States. Public language distinguishes this documented footprint from claims of nationwide delivery.",
    ))
    story.append(PageBreak())

    story.extend(section(
        "Delivery evidence",
        "Verified programme snapshots from 2026",
        "The following activities are included because TIJCEF has confirmed their location, timing and participation figures through programme or partner records. Counts describe recorded engagement; they are not automatically equivalent to sustained outcomes.",
    ))
    activities = [
        ("Government Girls College, Yola", "February 2026", "Approximately 400 girls", "Menstrual health education and dignity support through school-based outreach."),
        ("Adroit International Academy, Yola", "2026", "200 girls", "Menstrual empowerment delivered with Lead the Girl Foundation."),
        ("Youth Empowerment Seminar, Girei LGA", "2026", "50 young people", "Entrepreneurship, self-reliance and leadership sessions at Zion Centre."),
        ("Women’s Leadership Empowerment, Taraba", "2026", "45 women", "Leadership, participation and agency-focused engagement."),
        ("Volunteer Training, Yola", "April 2026", "Attendance record held", "Preparation for responsible delivery, community engagement and safeguarding."),
        ("School Takeover", "Twice-yearly model", "Programme records by cycle", "A full-day school engagement led by TIJCEF staff and volunteers."),
    ]
    data = [[Paragraph("ACTIVITY", S["statlabel"]), Paragraph("TIME", S["statlabel"]), Paragraph("REPORTED REACH", S["statlabel"]), Paragraph("DELIVERY", S["statlabel"])]]
    for name, timing, reach, delivery in activities:
        data.append([Paragraph(name, S["h3"]), Paragraph(timing, S["small"]), Paragraph(reach, S["small"]), Paragraph(delivery, S["small"])])
    table = Table(data, colWidths=[47 * mm, 25 * mm, 34 * mm, 55 * mm], repeatRows=1)
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), GREEN),
        ("TEXTCOLOR", (0, 0), (-1, 0), WHITE),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [WHITE, LIGHT]),
        ("GRID", (0, 0), (-1, -1), 0.5, LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 3.2 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 3.2 * mm),
        ("TOPPADDING", (0, 0), (-1, -1), 3.2 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3.2 * mm),
    ]))
    story.append(table)
    story.append(Spacer(1, 6 * mm))
    story.append(Paragraph("Earlier confirmed activity", S["h2"]))
    story.append(Paragraph(
        "In 2023, TIJCEF's Executive Director visited an orphanage in Katsina and donated gifts to children. The activity is retained as a documented historical programme snapshot, without adding an unsupported beneficiary count.",
        S["body"],
    ))
    story.append(PageBreak())

    story.extend(section(
        "Evidence and learning",
        "How TIJCEF moves from activity to outcome",
        "TIJCEF uses a proportionate results chain. Each project should define indicators before delivery, collect only necessary data, review quality and use findings to improve the next cycle.",
    ))
    chain = [
        ("1. Inputs", "People, partner contributions, approved budgets and materials."),
        ("2. Activities", "Sessions, outreach, training, service days and research tasks."),
        ("3. Outputs", "Attendance, completion, materials distributed and evidence produced."),
        ("4. Outcomes", "Changes in knowledge, confidence, practice or capacity, measured where feasible."),
    ]
    cards = []
    for title, body in chain:
        cards.append([Paragraph(title, S["h3"]), Paragraph(body, S["body"])])
    table = Table(cards, colWidths=[34 * mm, 127 * mm])
    table.setStyle(TableStyle([
        ("ROWBACKGROUNDS", (0, 0), (-1, -1), [PALE, LIGHT]),
        ("GRID", (0, 0), (-1, -1), 0.5, LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 5 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5 * mm),
        ("TOPPADDING", (0, 0), (-1, -1), 4 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2 * mm),
    ]))
    story.append(table)
    story.append(Spacer(1, 7 * mm))
    story.append(Paragraph("Public reporting standards", S["h2"]))
    for item in [
        "Separate cumulative reach, annual reach, activity attendance and longer-term outcome measures.",
        "State the source and reporting period for every headline figure.",
        "Avoid double-counting repeat participants where individual-level deduplication is not available.",
        "Protect children and vulnerable people through consent, safe imagery and data minimisation.",
        "Correct public inconsistencies openly rather than carrying them into future proposals.",
    ]:
        story.append(bullet(item))
    story.append(PageBreak())

    story.extend(section(
        "Accountability",
        "Governance, safeguarding and stewardship",
        "Credibility is demonstrated through systems, not slogans. TIJCEF's public commitments define the minimum controls expected across programmes and partnerships.",
    ))
    accountability = [
        ("Governance", "Named leadership and programme responsibilities; documented approvals; conflict-of-interest disclosure; proportionate partner due diligence."),
        ("Safeguarding & PSEA", "Code of conduct, safe recruitment and induction, consent, confidential reporting and survivor-centred response pathways."),
        ("Financial stewardship", "Approved budgets, supporting documentation, restricted-fund tracking, reconciliations and donor reporting tied to grant conditions."),
        ("Feedback & complaints", "Accessible channels for communities, volunteers, partners and donors, with confidentiality and non-retaliation commitments."),
        ("Responsible communications", "No invented impact, no unsupported partnerships and no use of vulnerable people's stories without appropriate consent."),
    ]
    for title, body in accountability:
        story.append(KeepTogether([Paragraph(title, S["h3"]), Paragraph(body, S["body"]), Spacer(1, 1 * mm)]))
    story.append(callout(
        "Financial disclosure",
        "This public narrative report does not present audited financial statements. Detailed budgets, banking confirmation, registration evidence, policies and supporting records may be shared directly with eligible partners under proportionate due-diligence and confidentiality arrangements.",
        colors.HexColor("#FFF7E5"),
    ))
    story.append(PageBreak())

    story.extend(section(
        "Partnership priorities",
        "Where aligned support can add value",
        "TIJCEF welcomes funders and technical partners whose objectives align with documented community needs and who value safeguarding, learning and transparent reporting.",
    ))
    priorities = [
        ("Health, dignity and WASH", "School and community menstrual health, dignity support and practical WASH engagement."),
        ("Education and leadership", "Structured youth and women's leadership, entrepreneurship, mentoring and school-based programmes."),
        ("Community resilience", "Locally led sanitation, environmental awareness and climate resilience initiatives."),
        ("Evidence systems", "Baseline tools, monitoring systems, outcome measurement, learning products and responsible advocacy."),
        ("Institutional strengthening", "Safeguarding, governance, finance, volunteer management and digital evidence infrastructure."),
    ]
    for title, body in priorities:
        story.append(callout(title, body))
        story.append(Spacer(1, 3 * mm))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph("Partner next step", S["h2"]))
    story.append(Paragraph(
        "Prospective partners can begin at www.tijcef.org/transparency, then contact info@tijcef.org to request a programme concept, budget, due-diligence pack or safeguarding discussion relevant to the proposed collaboration.",
        S["body"],
    ))
    story.append(PageBreak())

    story.extend(section(
        "Reference",
        "Organisational information",
        "Tijwun Care and Empowerment Foundation (TIJCEF) is a Nigerian nonprofit organisation led by Founder and Executive Director Emmanuel Sunday Tijwun.",
    ))
    contact_rows = [
        [Paragraph("Website", S["h3"]), Paragraph("www.tijcef.org", S["body"])],
        [Paragraph("Email", S["h3"]), Paragraph("info@tijcef.org", S["body"])],
        [Paragraph("Telephone", S["h3"]), Paragraph("+234 704 931 4372", S["body"])],
        [Paragraph("Address", S["h3"]), Paragraph("No. 1, Opposite Coca-Cola Junction, Jalingo, Taraba State, Nigeria", S["body"])],
        [Paragraph("Social media", S["h3"]), Paragraph("@tijcef across platforms", S["body"])],
    ]
    table = Table(contact_rows, colWidths=[40 * mm, 121 * mm])
    table.setStyle(TableStyle([
        ("ROWBACKGROUNDS", (0, 0), (-1, -1), [LIGHT, PALE]),
        ("GRID", (0, 0), (-1, -1), 0.5, LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 5 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5 * mm),
        ("TOPPADDING", (0, 0), (-1, -1), 4 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2 * mm),
    ]))
    story.append(table)
    story.append(Spacer(1, 9 * mm))
    story.append(Paragraph("Evidence base used for this edition", S["h2"]))
    for item in [
        "TIJCEF approved programme framework and public impact figures, reviewed August 2026.",
        "Confirmed 2023 and 2026 activity records supplied for public website reporting.",
        "TIJCEF public governance, safeguarding, complaints, donation and privacy commitments.",
        "Verified external media links and the United Nations SDG partnership listing included in the TIJCEF media tracker.",
    ]:
        story.append(bullet(item))
    story.append(Spacer(1, 8 * mm))
    story.append(callout(
        "Document control",
        "Corrected edition issued 2 September 2026. Supersedes the earlier public PDF. Future editions should retain a version date, evidence owner and approval record before publication.",
    ))

    def first_page(canvas, _doc):
        cover_page(
            canvas,
            "Annual Report 2025",
            "Corrected public edition · accountable reporting, clear programme architecture and verified reach",
            "ISSUED 2 SEPTEMBER 2026",
            ASSETS / "hero-woman.jpg",
        )

    cover_frame = Frame(0, 0, PAGE_W, PAGE_H, leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0, id="cover-frame")
    doc.addPageTemplates(PageTemplate(id="cover", frames=[cover_frame], onPage=first_page, autoNextPageTemplate="standard"))
    doc._firstPageTemplateIndex = 1
    doc.build([PageBreak()] + story)
    return output


def build_press_kit():
    output = PUBLIC / "TIJCEF_PRESS_KIT.pdf"
    doc = BrandedDocument(str(output), "TIJCEF Press Kit 2026")
    story = []
    story.extend(section(
        "At a glance",
        "TIJCEF in one minute",
        "Tijwun Care and Empowerment Foundation is a Nigerian nonprofit working with women, adolescent girls and young people through practical community programmes and evidence-informed advocacy.",
    ))
    story.append(stats_table())
    story.append(Spacer(1, 7 * mm))
    story.append(Paragraph("Approved description", S["h2"]))
    story.append(Paragraph(
        "TIJCEF delivers programmes in health, menstrual dignity and WASH; education, skills and leadership; climate action and community resilience; and research, learning and advocacy. It is based in Jalingo and has recorded activity in Adamawa, Katsina and Taraba States.",
        S["quote"],
    ))
    story.append(Paragraph("Leadership", S["h2"]))
    story.append(Paragraph(
        "Founder and Executive Director: <b>Emmanuel Sunday Tijwun</b>. Media requests should be sent to info@tijcef.org with the publication, topic, deadline and interview format.",
        S["body"],
    ))
    story.append(callout(
        "Accuracy note",
        "Use 3,500+ cumulative people reached, 1,200+ people reached in 2026, four programme areas and three states with recorded activities. Do not reuse figures or retired product/programme names from superseded materials.",
        colors.HexColor("#FFF7E5"),
    ))
    story.append(PageBreak())

    story.extend(section(
        "Programme language",
        "How to describe the work accurately",
        "The short pillar names are values. In interviews and articles, pair them with the programme descriptors below so audiences understand the actual work.",
    ))
    programme_rows = [
        [Paragraph("DIGNITY", S["statlabel"]), Paragraph("Health, Menstrual Dignity & WASH", S["h3"]), Paragraph("School and community menstrual health, dignity support, health awareness and WASH engagement.", S["body"])],
        [Paragraph("AGENCY", S["statlabel"]), Paragraph("Education, Skills & Leadership", S["h3"]), Paragraph("Leadership, entrepreneurship, mentoring, education and volunteer development for women and youth.", S["body"])],
        [Paragraph("RESILIENCE", S["statlabel"]), Paragraph("Climate Action & Stronger Communities", S["h3"]), Paragraph("Community sanitation, environmental awareness and locally led resilience action.", S["body"])],
        [Paragraph("EVIDENCE", S["statlabel"]), Paragraph("Research, Learning & Advocacy", S["h3"]), Paragraph("Monitoring, needs assessment, learning products, responsible reporting and evidence-informed advocacy.", S["body"])],
    ]
    table = Table(programme_rows, colWidths=[30 * mm, 55 * mm, 76 * mm])
    table.setStyle(TableStyle([
        ("ROWBACKGROUNDS", (0, 0), (-1, -1), [PALE, LIGHT]),
        ("GRID", (0, 0), (-1, -1), 0.5, LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 4 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 4 * mm),
        ("TOPPADDING", (0, 0), (-1, -1), 4 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2 * mm),
    ]))
    story.append(table)
    story.append(Spacer(1, 7 * mm))
    story.append(Paragraph("Verified story leads", S["h2"]))
    for item in [
        "Approximately 400 girls engaged through menstrual health and dignity outreach at Government Girls College, Yola, in February 2026.",
        "200 girls engaged at Adroit International Academy, Yola, with Lead the Girl Foundation.",
        "50 young people trained in entrepreneurship, self-reliance and leadership at Zion Centre, Girei LGA.",
        "45 women engaged through a leadership empowerment programme in Taraba State.",
        "TIJCEF's twice-yearly School Takeover model brings staff and volunteers into a school for a full day of structured engagement.",
    ]:
        story.append(bullet(item))
    story.append(PageBreak())

    story.extend(section(
        "Media resources",
        "Interviews, attribution and verified coverage",
        "TIJCEF maintains an editor-reviewed publication tracker at www.tijcef.org/media-coverage. Automated discoveries are saved as drafts and appear publicly only after the original source is checked.",
    ))
    story.append(Paragraph("Use in publication", S["h2"]))
    for item in [
        "First reference: Tijwun Care and Empowerment Foundation (TIJCEF).",
        "Subsequent reference: TIJCEF.",
        "Social handle: @tijcef across platforms.",
        "Website: www.tijcef.org.",
        "Logo: use the official blue-and-green TIJCEF mark without alteration.",
        "Impact wording: describe figures as reported reach unless a specific outcome study is cited.",
    ]:
        story.append(bullet(item))
    story.append(Spacer(1, 5 * mm))
    story.append(Paragraph("Verified external references", S["h2"]))
    references = [
        ("Vanguard", "Coverage indexed in February 2026"),
        ("The Sun Nigeria", "Coverage published 6 February 2026"),
        ("Independent Newspaper Nigeria", "Organisation coverage indexed by TIJCEF"),
        ("United Nations SDG Partnerships Platform", "Public partnership listing"),
    ]
    for publisher, note in references:
        story.append(callout(publisher, note))
        story.append(Spacer(1, 2.5 * mm))
    story.append(Spacer(1, 5 * mm))
    story.append(callout(
        "Media contact",
        "Email info@tijcef.org · Call +234 704 931 4372 · No. 1, Opposite Coca-Cola Junction, Jalingo, Taraba State, Nigeria",
    ))

    def first_page(canvas, _doc):
        cover_page(
            canvas,
            "Press & Media Kit",
            "Approved facts, programme language, story leads and media contact information",
            "2026 EDITION · UPDATED 2 SEPTEMBER 2026",
            ASSETS / "girls-education.jpg",
        )

    cover_frame = Frame(0, 0, PAGE_W, PAGE_H, leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0, id="cover-frame")
    doc.addPageTemplates(PageTemplate(id="cover", frames=[cover_frame], onPage=first_page, autoNextPageTemplate="standard"))
    doc._firstPageTemplateIndex = 1
    doc.build([PageBreak()] + story)
    return output


if __name__ == "__main__":
    annual = build_annual_report()
    press = build_press_kit()
    print(annual)
    print(press)
