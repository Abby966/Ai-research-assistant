import re
from pypdf import PdfReader


def load_pdf(file_path):
    reader = PdfReader(file_path)

    text = ""

    for page in reader.pages:
        page_text = page.extract_text()

        if page_text:
            text += page_text + "\n"

    return text


def clean_text(text):
    # Fix common PDF extraction problems
    text = text.replace("\u2022", "•")
    text = text.replace("❖", "❖")

    # Normalize spaces
    text = re.sub(r"[ \t]+", " ", text)

    # Remove excessive blank lines
    text = re.sub(r"\n\s*\n+", "\n\n", text)

    return text.strip()


def create_chunk(text, section, topic=None):
    return {
        "text": text.strip(),
        "source": "cv.pdf",
        "document_type": "CV",
        "section": section,
        "topic": topic
    }


def chunk_cv(text):
    text = clean_text(text)

    chunks = []

    # -------------------------
    # PROFILE
    # -------------------------
    profile_match = re.search(
        r"Motivated and resourceful.*?(?=-Languages & Frameworks:)",
        text,
        re.DOTALL
    )

    if profile_match:
        chunks.append(
            create_chunk(
                profile_match.group(0),
                "Profile",
                "professional background"
            )
        )

    # -------------------------
    # SKILLS
    # -------------------------
    skills_match = re.search(
        r"-Languages & Frameworks:.*?(?=Technical solution engineer)",
        text,
        re.DOTALL
    )

    if skills_match:
        chunks.append(
            create_chunk(
                skills_match.group(0),
                "Skills",
                "technical skills"
            )
        )

    # -------------------------
    # EXPERIENCE
    # -------------------------
    experience_pattern = (
        r"(Technical solution engineer.*?)(?="
        r"Coding Instructor-Yenetta|"
        r"AI Developer – Meftinity|"
        r"Full Stack Developer Intern Afronex|"
        r"WAAW Foundation)"
    )

    match = re.search(experience_pattern, text, re.DOTALL)

    if match:
        chunks.append(
            create_chunk(
                match.group(1),
                "Experience",
                "technical solution engineering"
            )
        )

    experience_sections = [
        (
            r"Coding Instructor-Yenetta.*?(?=AI Developer – Meftinity)",
            "coding instruction"
        ),
        (
            r"AI Developer – Meftinity.*?(?=Full Stack Developer Intern Afronex)",
            "AI development"
        ),
        (
            r"Full Stack Developer Intern Afronex.*?(?=WAAW Foundation)",
            "full-stack development"
        ),
        (
            r"WAAW Foundation.*?(?=BSc in Computer Science)",
            "STEM leadership"
        )
    ]

    for pattern, topic in experience_sections:
        match = re.search(pattern, text, re.DOTALL)

        if match:
            section = "Leadership" if "WAAW" in match.group(0) else "Experience"

            chunks.append(
                create_chunk(
                    match.group(0),
                    section,
                    topic
                )
            )

    # -------------------------
    # EDUCATION
    # -------------------------
    education_match = re.search(
        r"BSc in Computer Science.*?(?=Laptop Sentinel System)",
        text,
        re.DOTALL
    )

    if education_match:
        chunks.append(
            create_chunk(
                education_match.group(0),
                "Education",
                "computer science degree"
            )
        )

    # -------------------------
    # PROJECTS
    # -------------------------
    project_sections = [
        (
            r"Laptop Sentinel System.*?(?=Asegedech Old Age Home Website Enhancement)",
            "security system"
        ),
        (
            r"Asegedech Old Age Home Website Enhancement.*?(?=Discover Dire Dawa)",
            "web development"
        ),
        (
            r"Discover Dire Dawa.*?(?=Fundmate)",
            "web development"
        ),
        (
            r"Fundmate.*?(?=RecallX)",
            "entrepreneur-investor platform"
        ),
        (
            r"RecallX.*?(?=ADDITIONAL INFORMA TION)",
            "RAG and artificial intelligence"
        )
    ]

    for pattern, topic in project_sections:
        match = re.search(pattern, text, re.DOTALL)

        if match:
            chunks.append(
                create_chunk(
                    match.group(0),
                    "Projects",
                    topic
                )
            )

    # -------------------------
    # LANGUAGES
    # -------------------------
    language_match = re.search(
        r"Languages\s+-English.*?(?=Publications)",
        text,
        re.DOTALL
    )

    if language_match:
        chunks.append(
            create_chunk(
                language_match.group(0),
                "Additional Information",
                "languages"
            )
        )

    # -------------------------
    # PUBLICATIONS
    # -------------------------

    publication_1 = re.search(
        r"1\. Chanyalew, Abegail\..*?(?=2\. Chanyalew, Abegail\.)",
        text,
        re.DOTALL
    )

    if publication_1:
        chunks.append(
            create_chunk(
                publication_1.group(0),
                "Publications",
                "dam overflow prediction"
            )
        )

    publication_2 = re.search(
        r"2\. Chanyalew, Abegail\..*?$",
        text,
        re.DOTALL
    )

    if publication_2:
        chunks.append(
            create_chunk(
                publication_2.group(0),
                "Publications",
                "human-centered AI"
            )
        )

    return chunks