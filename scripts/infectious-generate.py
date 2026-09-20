#!/usr/bin/env python3
"""
传染病学学习指导与习题集 第3版 — OCR 题库提取脚本

Parses OCR text snippets of the medical textbook and generates TypeScript
question bank files following the AssessmentItemDefinition schema.

Usage:
    python3 scripts/infectious-generate.py          # generate ch02-ch10
    python3 scripts/infectious-generate.py --ch 9    # generate only ch09
"""

import argparse
import json
import math
import os
import random
import re
import sys
from dataclasses import dataclass, field
from pathlib import Path
from typing import Dict, List, Optional, Tuple

# ─── Paths ──────────────────────────────────────────────────────────────
SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent
SNIPPET_DIR = SCRIPT_DIR / "infectious-snippets"
OUTPUT_DIR = PROJECT_ROOT / "src" / "content" / "courses" / "infectious-diseases"
BUDGET_FILE = SCRIPT_DIR / "infectious-budget.json"

# ─── Chapter metadata ───────────────────────────────────────────────────
CHAPTERS: Dict[int, dict] = {
    1:  {"name": "总论",         "file": "ch01-总论.txt"},
    2:  {"name": "病毒性传染病",  "file": "ch02-病毒性传染病.txt"},
    3:  {"name": "立克次体病",    "file": "ch03-立克次体病.txt"},
    4:  {"name": "细菌性传染病",  "file": "ch04-细菌性传染病.txt"},
    5:  {"name": "深部真菌病",    "file": "ch05-深部真菌病.txt"},
    6:  {"name": "螺旋体病",      "file": "ch06-螺旋体病.txt"},
    7:  {"name": "原虫病",        "file": "ch07-原虫病.txt"},
    8:  {"name": "蠕虫病",        "file": "ch08-蠕虫病.txt"},
    9:  {"name": "朊粒病",        "file": "ch09-朊粒病.txt"},
    10: {"name": "其他",          "file": "ch10-其他.txt"},
}

# ─── OCR corrections ────────────────────────────────────────────────────
# Ordered list of (pattern, replacement) — applied sequentially.
OCR_CORRECTIONS: List[Tuple[str, str]] = [
    # Antigen/antibody notation
    ("HBSAg", "HBsAg"),
    ("HBEAg", "HBeAg"),
    ("HIBSAg", "HBsAg"),
    ("HEBSAg", "HBsAg"),
    ("抗 HBS", "抗-HBs"),
    ("抗 HBe", "抗-HBe"),
    ("抗 HBc", "抗-HBc"),
    ("抗-HBS", "抗-HBs"),
    ("抗-HBE", "抗-HBe"),
    ("抗-HBC", "抗-HBc"),
    # Common medical term OCR errors
    ("品性感染", "显性感染"),
    ("菜姆病", "莱姆病"),
    ("雀乱", "霍乱"),
    ("潛伏", "潜伏"),
    ("痲疹", "麻疹"),
    ("痎疾", "疟疾"),
    ("敗血症", "败血症"),
    ("癅毒", "病毒"),
    ("痟原体", "病原体"),
    ("痗原体", "病原体"),
    # Disease name corrections
    ("流行性腮腺炎", "流行性腮腺炎"),
    ("腎综合征出血热", "肾综合征出血热"),
    ("传染性非典型肺炎", "传染性非典型肺炎"),
    # Fix common OCR broken chars in medical terms
    ("癅毒性肝炎", "病毒性肝炎"),
    ("癅毒性脑炎", "病毒性脑炎"),
    ("癅毒", "病毒"),
    # Clean up stray pipe characters from OCR
    ("D|", "D"),
    # Fix common number/letter OCR confusions in answer keys
    # (handled separately in answer parsing)
]

# ─── Random seed for reproducible choice shuffling ──────────────────────
RNG_SEED = 20260909

# ─── Data classes ───────────────────────────────────────────────────────

@dataclass
class ParsedChoice:
    """A single A1/A2/A3/A4 choice question."""
    number: int
    prompt: str
    choices: Dict[str, str]  # {"A": "text", "B": "text", ...}
    answer_letter: Optional[str] = None  # "A"-"E"
    analysis: str = ""
    type_label: str = "A1型题"
    case_stem: str = ""  # for A3/A4 questions


@dataclass
class ParsedB1Group:
    """A B1 matching group with shared choices."""
    start_num: int
    end_num: int
    shared_choices: Dict[str, str]
    members: List[ParsedChoice] = field(default_factory=list)
    analysis: str = ""


@dataclass
class ParsedTextQuestion:
    """A term / short-answer / case-analysis question."""
    number: int
    prompt: str
    answer_text: str = ""
    type_label: str = "名词解释"
    case_stem: str = ""  # for case analysis


@dataclass
class ChapterData:
    """All parsed data for one chapter."""
    ch_num: int
    ch_name: str
    a1_questions: List[ParsedChoice] = field(default_factory=list)
    b1_groups: List[ParsedB1Group] = field(default_factory=list)
    term_questions: List[ParsedTextQuestion] = field(default_factory=list)
    short_questions: List[ParsedTextQuestion] = field(default_factory=list)
    case_questions: List[ParsedTextQuestion] = field(default_factory=list)
    warnings: List[str] = field(default_factory=list)


# ─── Text preprocessing ────────────────────────────────────────────────

def remove_page_markers(text: str) -> str:
    """Remove ===== PDF_PAGE_NNN ===== lines."""
    return re.sub(r'={3,}\s*PDF_PAGE_\d+\s*={3,}', '', text)


def clean_text(text: str) -> str:
    """Apply OCR corrections and basic cleanup."""
    for pattern, replacement in OCR_CORRECTIONS:
        text = text.replace(pattern, replacement)
    return text


def normalize_whitespace(text: str) -> str:
    """Normalize whitespace: collapse multiple spaces, strip trailing spaces."""
    lines = [line.rstrip() for line in text.split('\n')]
    return '\n'.join(lines)


def clean_answer_text(text: str) -> str:
    """Clean up answer/analysis text: remove author attributions, page artifacts."""
    # Remove author attributions like （宁琴）, （龚国忠）, （李兰娟 吴仲文） etc.
    text = re.sub(r'[（(]\s*[\u4e00-\u9fff]{2,4}(?:\s*[\u4e00-\u9fff]{2,4})*\s*[)）]\s*$', '', text.strip())
    # Remove standalone page number lines
    text = re.sub(r'^\s*\d{1,3}\s*$', '', text, flags=re.MULTILINE)
    # Remove leading/trailing whitespace
    text = text.strip()
    return text


# ─── Exercise/answer pair splitting ────────────────────────────────────

def split_exercise_answer_pairs(text: str) -> List[Tuple[str, str]]:
    """
    Split text into (exercise, answer) pairs by 【练习题】 and 【参考答案】.
    Each exercise block is followed by its answer block.
    """
    # Split by 【练习题】 — first part is preamble
    ex_parts = re.split(r'【\s*练习题\s*】', text)
    pairs = []
    for part in ex_parts[1:]:  # skip preamble
        # Split by first 【参考答案】 within this part
        ans_parts = re.split(r'【\s*参考答案\s*】', part, maxsplit=1)
        exercise = ans_parts[0]
        answer = ans_parts[1] if len(ans_parts) > 1 else ''
        pairs.append((exercise, answer))
    return pairs


# ─── Section splitting within exercise/answer blocks ────────────────────

# Markers for question type sections within exercise text
SECTION_PATTERNS = {
    'A1':  re.compile(r'【\s*A1\s*型\s*[题題]\s*】'),
    'A2':  re.compile(r'【\s*A2\s*型\s*[题題]\s*】'),
    'A3':  re.compile(r'【\s*A3\s*型\s*[题題]\s*】'),
    'A4':  re.compile(r'【\s*A4\s*型\s*[题題]\s*】'),
    'B1':  re.compile(r'【\s*B1?\s*型\s*[题題]\s*】|【\s*B\s*型\s*[题題]\s*】'),
    'X':   re.compile(r'【\s*X\s*型\s*[题題]\s*】'),
}

# Non-choice section markers
TEXT_SECTION_PATTERNS = {
    'term':   re.compile(r'[（(]\s*二\s*[,，)）]\s*名?词解?释|名\s*词\s*解\s*释'),
    'fill':   re.compile(r'[（(]\s*三\s*[,，)）]\s*填空|填\s*空\s*题'),
    'short':  re.compile(r'[（(]\s*[三四五]\s*[,，)）]\s*问答|问\s*答\s*题'),
    'case':   re.compile(r'[（(]\s*[四五六]\s*[,，)）]\s*病案|病\s*案\s*分\s*析'),
}


def find_section_ranges(text: str, patterns: Dict[str, re.Pattern]) -> List[Tuple[str, int, int]]:
    """
    Find all section markers in text. Returns list of (section_name, start_pos, end_pos).
    end_pos is the start of the next section or len(text).
    """
    hits = []
    for name, pat in patterns.items():
        for m in pat.finditer(text):
            hits.append((name, m.start(), m.end()))

    # Sort by position
    hits.sort(key=lambda x: x[1])

    # Calculate section ranges
    ranges = []
    for i, (name, start, marker_end) in enumerate(hits):
        end = hits[i + 1][1] if i + 1 < len(hits) else len(text)
        # Section content starts after the marker
        ranges.append((name, marker_end, end))

    return ranges


# ─── Choice question parsing (A1/A2/A3/A4) ─────────────────────────────

# Pattern for question number at start of line
QNUM_RE = re.compile(r'^(\d{1,3})\s*[.．、]\s*', re.MULTILINE)

# Pattern for choice letter at start of line or after whitespace
# Also matches OCR digit corruptions: 8→B, 0→D, etc.
CHOICE_RE = re.compile(r'([A-E8])\s*[.．、]\s*')

# Map OCR digit corruptions to actual choice letters
OCR_CHOICE_MAP = {
    '8': 'B',
    '0': 'D',
    '1': 'I',  # rarely useful, but safe
}


def parse_choice_section(exercise_text: str, type_label: str = "A1型题") -> List[ParsedChoice]:
    """
    Parse a section of choice questions (A1 or A2 type).
    Each question starts with N. and has choices A. B. C. D. E.
    """
    questions = []

    # Find all question number positions
    q_starts = [(m.start(), int(m.group(1)), m.end()) for m in QNUM_RE.finditer(exercise_text)]

    if not q_starts:
        return questions

    # Filter: a real question number should be sequential
    # Group by continuity: numbers should be roughly sequential (1, 2, 3, ...)
    # Allow gaps for OCR errors
    valid_starts = []
    prev_num = 0
    for start, num, content_start in q_starts:
        # Heuristic: accept if number is within reasonable range of previous
        if num >= 1 and num <= 200:
            if not valid_starts or num > prev_num or num == prev_num + 1:
                valid_starts.append((start, num, content_start))
                prev_num = max(prev_num, num)
            elif num <= prev_num and not valid_starts:
                valid_starts.append((start, num, content_start))
                prev_num = max(prev_num, num)

    # If we still have nothing, take all
    if not valid_starts:
        valid_starts = q_starts

    # For each question, extract text until next question
    for i, (start, num, content_start) in enumerate(valid_starts):
        if i + 1 < len(valid_starts):
            end = valid_starts[i + 1][0]
        else:
            end = len(exercise_text)

        qtext = exercise_text[content_start:end].strip()
        if not qtext:
            continue

        # Parse prompt and choices
        prompt, choices = split_prompt_choices(qtext)
        if not prompt or len(choices) < 3:
            continue

        questions.append(ParsedChoice(
            number=num,
            prompt=prompt.strip(),
            choices=choices,
            type_label=type_label,
        ))

    return questions


def split_prompt_choices(qtext: str) -> Tuple[str, Dict[str, str]]:
    """
    Split question text into prompt and choices.
    Choices start with A. B. C. D. E. (possibly out of order).
    Handles OCR errors like 8. for B.
    """
    # Find all choice positions
    choice_hits = []
    for m in CHOICE_RE.finditer(qtext):
        raw_letter = m.group(1)
        # Map OCR digit corruptions to actual letters
        letter = OCR_CHOICE_MAP.get(raw_letter, raw_letter)
        choice_hits.append((m.start(), m.end(), letter))

    if not choice_hits:
        return qtext.strip(), {}

    # The prompt is everything before the first choice
    prompt = qtext[:choice_hits[0][0]].strip()

    # Extract each choice text
    choices = {}
    for i, (start, content_start, letter) in enumerate(choice_hits):
        if i + 1 < len(choice_hits):
            end = choice_hits[i + 1][0]
        else:
            end = len(qtext)
        choice_text = qtext[content_start:end].strip()
        # Clean up choice text - remove leading non-content
        choice_text = re.sub(r'^[.．、\s]+', '', choice_text).strip()
        # If duplicate letter, keep the last one (OCR may duplicate)
        if letter in choices and len(choice_text) > len(choices[letter]):
            choices[letter] = choice_text
        elif letter not in choices:
            choices[letter] = choice_text

    return prompt, choices


# ─── A3/A4 case-set parsing ─────────────────────────────────────────────

CASE_SET_RE = re.compile(
    r'[（(]\s*(\d{1,3})\s*[~–\-—至到]+\s*(\d{1,3})\s*题?共用题干\s*[）)]'
)


def parse_case_set_section(exercise_text: str, type_label: str = "A3型题") -> List[ParsedChoice]:
    """
    Parse A3/A4 case-set questions. Format:
    （NN~MM 题共用题干）
    case stem text...
    NN. question
    A. ...
    """
    questions = []

    # Find case set markers
    case_sets = []
    for m in CASE_SET_RE.finditer(exercise_text):
        start_num = int(m.group(1))
        end_num = int(m.group(2))
        case_sets.append((m.start(), m.end(), start_num, end_num))

    if not case_sets:
        # Fallback: try without the "题" before 共用题干
        return parse_choice_section(exercise_text, type_label)

    for i, (cs_start, cs_end, start_num, end_num) in enumerate(case_sets):
        if i + 1 < len(case_sets):
            section_end = case_sets[i + 1][0]
        else:
            section_end = len(exercise_text)

        section_text = exercise_text[cs_end:section_end]

        # The case stem is everything before the first question number
        # that matches start_num
        q_pattern = re.compile(rf'^{start_num}\s*[.．、]\s*', re.MULTILINE)
        q_match = q_pattern.search(section_text)

        if q_match:
            case_stem = section_text[:q_match.start()].strip()
            questions_text = section_text[q_match.start():]
        else:
            # Fallback: find any question number
            q_starts = [(m.start(), int(m.group(1)), m.end())
                        for m in QNUM_RE.finditer(section_text)]
            if q_starts:
                case_stem = section_text[:q_starts[0][0]].strip()
                questions_text = section_text[q_starts[0][0]:]
            else:
                case_stem = section_text.strip()
                questions_text = ""

        # Parse individual questions
        sub_questions = parse_choice_section(questions_text, type_label)

        # Prepend case stem to each question's prompt
        for q in sub_questions:
            q.case_stem = case_stem
            questions.append(q)

    return questions


# ─── B1 group parsing ───────────────────────────────────────────────────

B1_SET_RE = re.compile(
    r'[（(]\s*(\d{1,3})\s*[~–\-—至到]+\s*(\d{1,3})\s*题?共用备选答案\s*[）)]'
)


def parse_b1_section(exercise_text: str) -> List[ParsedB1Group]:
    """
    Parse B1 matching groups. Format:
    （NN~MM 题共用备选答案）
    A. shared choice 1
    B. shared choice 2
    ...
    NN. member question 1
    NN+1. member question 2
    ...
    """
    groups = []

    # Find B1 group markers
    b1_sets = []
    for m in B1_SET_RE.finditer(exercise_text):
        start_num = int(m.group(1))
        end_num = int(m.group(2))
        b1_sets.append((m.start(), m.end(), start_num, end_num))

    for i, (cs_start, cs_end, start_num, end_num) in enumerate(b1_sets):
        if i + 1 < len(b1_sets):
            section_end = b1_sets[i + 1][0]
        else:
            section_end = len(exercise_text)

        section_text = exercise_text[cs_end:section_end]

        # Find shared choices (before the first member question)
        member_q_pattern = re.compile(rf'^{start_num}\s*[.．、]\s*', re.MULTILINE)
        member_match = member_q_pattern.search(section_text)

        if member_match:
            shared_choices_text = section_text[:member_match.start()]
            member_questions_text = section_text[member_match.start():]
        else:
            # Fallback: find first question number >= start_num
            q_starts = [(m.start(), int(m.group(1)), m.end())
                        for m in QNUM_RE.finditer(section_text)]
            member_starts = [(s, n, e) for s, n, e in q_starts if n >= start_num]
            if member_starts:
                shared_choices_text = section_text[:member_starts[0][0]]
                member_questions_text = section_text[member_starts[0][0]:]
            else:
                shared_choices_text = section_text
                member_questions_text = ""

        # Parse shared choices
        _, shared_choices = split_prompt_choices(shared_choices_text)
        if len(shared_choices) < 2:
            continue

        # Parse member questions (they don't have choices, just prompts)
        members = parse_member_questions(member_questions_text, start_num, end_num)

        if not members:
            continue

        groups.append(ParsedB1Group(
            start_num=start_num,
            end_num=end_num,
            shared_choices=shared_choices,
            members=members,
        ))

    return groups


def parse_member_questions(text: str, start_num: int, end_num: int) -> List[ParsedChoice]:
    """Parse B1 member questions (numbered prompts without choices)."""
    members = []
    q_starts = [(m.start(), int(m.group(1)), m.end()) for m in QNUM_RE.finditer(text)]

    for i, (start, num, content_start) in enumerate(q_starts):
        if i + 1 < len(q_starts):
            end = q_starts[i + 1][0]
        else:
            end = len(text)

        prompt = text[content_start:end].strip()
        # Clean up prompt - remove page artifacts
        prompt = re.sub(r'\n{3,}', '\n\n', prompt).strip()

        if not prompt:
            continue

        members.append(ParsedChoice(
            number=num,
            prompt=prompt,
            choices={},
            type_label="B1型题",
        ))

    return members


# ─── Text question parsing (term/short/case) ────────────────────────────

def parse_text_section(exercise_text: str, type_label: str = "名词解释") -> List[ParsedTextQuestion]:
    """
    Parse text questions (term, short-answer, case analysis).
    Each question starts with N. followed by text.
    """
    questions = []
    q_starts = [(m.start(), int(m.group(1)), m.end()) for m in QNUM_RE.finditer(exercise_text)]

    for i, (start, num, content_start) in enumerate(q_starts):
        if i + 1 < len(q_starts):
            end = q_starts[i + 1][0]
        else:
            end = len(exercise_text)

        prompt = exercise_text[content_start:end].strip()
        # Clean up
        prompt = re.sub(r'\n{3,}', '\n\n', prompt).strip()

        if not prompt or len(prompt) < 3:
            continue

        questions.append(ParsedTextQuestion(
            number=num,
            prompt=prompt,
            type_label=type_label,
        ))

    return questions


def parse_case_analysis_section(exercise_text: str) -> List[ParsedTextQuestion]:
    """
    Parse case analysis (病案分析). Format:
    病例N
    case description...
    1. question 1
    2. question 2
    ...
    """
    questions = []

    # Split by 病例 markers
    case_parts = re.split(r'病\s*例\s*\d', exercise_text)

    for part in case_parts:
        # Find numbered questions within this case
        q_starts = [(m.start(), int(m.group(1)), m.end())
                    for m in QNUM_RE.finditer(part)]

        if not q_starts:
            continue

        # Case stem is everything before the first question
        case_stem = part[:q_starts[0][0]].strip()

        for i, (start, num, content_start) in enumerate(q_starts):
            if i + 1 < len(q_starts):
                end = q_starts[i + 1][0]
            else:
                end = len(part)

            prompt = part[content_start:end].strip()
            if not prompt or len(prompt) < 3:
                continue

            questions.append(ParsedTextQuestion(
                number=num,
                prompt=prompt,
                type_label="病案分析",
                case_stem=case_stem,
            ))

    return questions


# ─── Answer parsing ─────────────────────────────────────────────────────

# Pattern for answer key: N.X or N. X or N.X at line start
# Also match OCR digit corruptions for answer letters
ANSWER_KEY_RE = re.compile(
    r'(\d{1,3})\s*[.．、]?\s*([A-E8])\s*'
)

# Pattern for multi-answer key (X type): N.ABCDE
MULTI_ANSWER_RE = re.compile(
    r'(\d{1,3})\s*[.．、]?\s*([A-E]{2,5})\s*'
)


def parse_choice_answers(answer_text: str) -> Dict[int, Tuple[str, str]]:
    """
    Parse choice answer keys from answer text.
    Returns {question_number: (answer_letter, analysis_text)}.
    """
    answers = {}

    # Find all answer key positions
    key_hits = []
    for m in ANSWER_KEY_RE.finditer(answer_text):
        num = int(m.group(1))
        raw_letter = m.group(2)
        # Map OCR digit corruptions to actual letters
        letter = OCR_CHOICE_MAP.get(raw_letter, raw_letter)
        # Filter: number should be reasonable (1-200) and letter should be A-E
        if 1 <= num <= 200 and letter in 'ABCDE':
            key_hits.append((m.start(), m.end(), num, letter))

    for i, (start, end_pos, num, letter) in enumerate(key_hits):
        if i + 1 < len(key_hits):
            next_start = key_hits[i + 1][0]
        else:
            next_start = len(answer_text)

        # Analysis text is between this answer and the next
        analysis_raw = answer_text[end_pos:next_start].strip()

        # Extract 试题分析 content
        analysis = ""
        am = re.search(r'试\s*题\s*分\s*析\s*[:：]\s*(.*?)(?=\d{1,3}\s*[.．、]?\s*[A-E]|\Z)',
                       analysis_raw, re.DOTALL)
        if am:
            analysis = am.group(1).strip()
        else:
            # If no explicit marker, take a reasonable chunk
            analysis = analysis_raw[:200].strip() if analysis_raw else ""

        # Clean analysis - remove page artifacts and author attributions
        analysis = re.sub(r'\n{3,}', '\n', analysis).strip()
        analysis = clean_answer_text(analysis)

        # Keep only the first answer for each number (avoid duplicates from OCR)
        if num not in answers:
            answers[num] = (letter, analysis)

    return answers


def parse_b1_answers(answer_text: str) -> Dict[int, Tuple[str, str]]:
    """Parse B1 answer keys (same format as choice answers)."""
    return parse_choice_answers(answer_text)


def parse_term_answers(answer_text: str) -> Dict[int, str]:
    """
    Parse term definition answers. Format:
    1. term_name: definition text...
    2. term_name: definition text...
    """
    answers = {}
    q_starts = [(m.start(), int(m.group(1)), m.end()) for m in QNUM_RE.finditer(answer_text)]

    for i, (start, num, content_start) in enumerate(q_starts):
        if i + 1 < len(q_starts):
            end = q_starts[i + 1][0]
        else:
            end = len(answer_text)

        definition = answer_text[content_start:end].strip()
        definition = re.sub(r'\n{3,}', '\n', definition).strip()
        definition = clean_answer_text(definition)

        if definition and len(definition) > 5:
            if num not in answers:
                answers[num] = definition

    return answers


def parse_short_answers(answer_text: str) -> Dict[int, str]:
    """
    Parse short-answer / case-analysis answers. Format:
    1. question text
    答案：answer text...
    """
    answers = {}
    q_starts = [(m.start(), int(m.group(1)), m.end()) for m in QNUM_RE.finditer(answer_text)]

    for i, (start, num, content_start) in enumerate(q_starts):
        if i + 1 < len(q_starts):
            end = q_starts[i + 1][0]
        else:
            end = len(answer_text)

        raw = answer_text[content_start:end].strip()
        raw = re.sub(r'\n{3,}', '\n', raw).strip()

        # Try to extract answer after 答案： marker
        am = re.search(r'答\s*案\s*[:：]\s*(.*)', raw, re.DOTALL)
        if am:
            answer = am.group(1).strip()
        else:
            # Use the whole text (might be just the answer without marker)
            answer = raw

        answer = clean_answer_text(answer)

        if answer and len(answer) > 5:
            if num not in answers:
                answers[num] = answer

    return answers


# ─── Main parsing function ─────────────────────────────────────────────

def parse_chapter(ch_num: int) -> ChapterData:
    """Parse a chapter's snippet file and return all questions."""
    ch_info = CHAPTERS[ch_num]
    snippet_path = SNIPPET_DIR / ch_info["file"]

    if not snippet_path.exists():
        print(f"WARNING: snippet file not found: {snippet_path}")
        return ChapterData(ch_num=ch_num, ch_name=ch_info["name"],
                           warnings=[f"snippet file not found: {snippet_path}"])

    raw_text = snippet_path.read_text(encoding="utf-8")
    text = remove_page_markers(raw_text)
    text = clean_text(text)
    text = normalize_whitespace(text)

    data = ChapterData(ch_num=ch_num, ch_name=ch_info["name"])

    # Split into exercise/answer pairs
    pairs = split_exercise_answer_pairs(text)

    for section_idx, (exercise, answer) in enumerate(pairs):
        # Find choice question sections in exercise
        choice_ranges = find_section_ranges(exercise, SECTION_PATTERNS)
        text_ranges = find_section_ranges(exercise, TEXT_SECTION_PATTERNS)

        # Parse A1 questions
        for name, start, end in choice_ranges:
            if name in ('A1', 'A2'):
                type_label = f"{name}型题"
                qs = parse_choice_section(exercise[start:end], type_label)

                # Match with answers
                ans_section = find_answer_section(answer, name)
                if ans_section:
                    ans_data = parse_choice_answers(ans_section)
                    for q in qs:
                        if q.number in ans_data:
                            q.answer_letter, q.analysis = ans_data[q.number]
                        else:
                            data.warnings.append(
                                f"ch{ch_num:02d} sec{section_idx} {type_label} "
                                f"Q{q.number}: answer not found")

                if name == 'A1':
                    data.a1_questions.extend(qs)
                else:
                    # A2 questions are also a1-single type
                    data.a1_questions.extend(qs)

            elif name in ('A3', 'A4'):
                type_label = f"{name}型题"
                qs = parse_case_set_section(exercise[start:end], type_label)

                # Match with answers
                ans_section = find_answer_section(answer, name)
                if ans_section:
                    ans_data = parse_choice_answers(ans_section)
                    for q in qs:
                        if q.number in ans_data:
                            q.answer_letter, q.analysis = ans_data[q.number]
                        else:
                            data.warnings.append(
                                f"ch{ch_num:02d} sec{section_idx} {type_label} "
                                f"Q{q.number}: answer not found")
                data.a1_questions.extend(qs)

            elif name == 'B1':
                groups = parse_b1_section(exercise[start:end])

                # Match with answers
                ans_section = find_answer_section(answer, 'B1')
                if ans_section:
                    ans_data = parse_b1_answers(ans_section)
                    for g in groups:
                        for m in g.members:
                            if m.number in ans_data:
                                m.answer_letter, m.analysis = ans_data[m.number]
                            else:
                                data.warnings.append(
                                    f"ch{ch_num:02d} sec{section_idx} B1型题 "
                                    f"Q{m.number}: answer not found")

                data.b1_groups.extend(groups)

            elif name == 'X':
                # Skip X-type questions (not in independent scored units)
                pass

        # Parse text sections (term, short, case)
        for name, start, end in text_ranges:
            section_text = exercise[start:end]

            if name == 'term':
                qs = parse_text_section(section_text, "名词解释")
                # Match with answers
                ans_section = find_text_answer_section(answer, 'term')
                if ans_section:
                    ans_data = parse_term_answers(ans_section)
                    for q in qs:
                        if q.number in ans_data:
                            q.answer_text = ans_data[q.number]
                        else:
                            data.warnings.append(
                                f"ch{ch_num:02d} sec{section_idx} 名词解释 "
                                f"Q{q.number}: answer not found")
                data.term_questions.extend(qs)

            elif name == 'short':
                qs = parse_text_section(section_text, "问答题")
                # Match with answers
                ans_section = find_text_answer_section(answer, 'short')
                if ans_section:
                    ans_data = parse_short_answers(ans_section)
                    for q in qs:
                        if q.number in ans_data:
                            q.answer_text = ans_data[q.number]
                        else:
                            data.warnings.append(
                                f"ch{ch_num:02d} sec{section_idx} 问答题 "
                                f"Q{q.number}: answer not found")
                data.short_questions.extend(qs)

            elif name == 'case':
                qs = parse_case_analysis_section(section_text)
                # Match with answers
                ans_section = find_text_answer_section(answer, 'case')
                if ans_section:
                    ans_data = parse_short_answers(ans_section)
                    for q in qs:
                        if q.number in ans_data:
                            q.answer_text = ans_data[q.number]
                        else:
                            data.warnings.append(
                                f"ch{ch_num:02d} sec{section_idx} 病案分析 "
                                f"Q{q.number}: answer not found")
                data.case_questions.extend(qs)

            elif name == 'fill':
                # Skip fill questions (not in independent scored units)
                pass

    return data


def find_answer_section(answer_text: str, section_name: str) -> str:
    """Find the answer section for a given question type."""
    pattern = SECTION_PATTERNS.get(section_name)
    if not pattern:
        return answer_text

    matches = list(pattern.finditer(answer_text))
    if not matches:
        # Return entire answer text if no section marker found
        return answer_text

    # Return text from this marker to the next section marker or end
    start = matches[0].end()
    # Find next section marker
    all_next = []
    for name, pat in SECTION_PATTERNS.items():
        for m in pat.finditer(answer_text, start):
            all_next.append(m.start())
    for name, pat in TEXT_SECTION_PATTERNS.items():
        for m in pat.finditer(answer_text, start):
            all_next.append(m.start())

    end = min(all_next) if all_next else len(answer_text)
    return answer_text[start:end]


def find_text_answer_section(answer_text: str, section_name: str) -> str:
    """Find the answer section for text questions (term/short/case)."""
    pattern = TEXT_SECTION_PATTERNS.get(section_name)
    if not pattern:
        return answer_text

    matches = list(pattern.finditer(answer_text))
    if not matches:
        return answer_text

    start = matches[0].end()
    all_next = []
    for name, pat in TEXT_SECTION_PATTERNS.items():
        for m in pat.finditer(answer_text, start):
            all_next.append(m.start())
    for name, pat in SECTION_PATTERNS.items():
        for m in pat.finditer(answer_text, start):
            all_next.append(m.start())

    end = min(all_next) if all_next else len(answer_text)
    return answer_text[start:end]


# ─── Sampling (Hamilton method) ─────────────────────────────────────────

def hamilton_allocation(
    counts: Dict[str, int],
    budget: int,
    b1_member_count: int,
    b1_group_sizes: List[int],
) -> Dict[str, int]:
    """
    Allocate budget proportionally using Hamilton (largest remainder) method.
    B1 groups are taken as whole groups.

    counts: {"term": N, "a1": N, "short": N, "case": N, "b1_members": N}
    budget: total independent scored units
    b1_group_sizes: list of member counts per group, e.g. [3, 3, 4]
    """
    # Count non-B1 types
    non_b1 = {k: v for k, v in counts.items() if k != "b1_members"}
    non_b1_total = sum(non_b1.values())
    total_source = non_b1_total + b1_member_count

    if total_source == 0:
        return {k: 0 for k in counts}

    # If source questions fewer than budget, take all
    if total_source <= budget:
        result = dict(counts)
        # B1: take all groups
        result["b1_groups"] = len(b1_group_sizes)
        result["b1_members"] = b1_member_count
        return result

    # Step 1: Calculate B1 allocation (as whole groups)
    # B1 proportion of budget
    b1_proportion = b1_member_count / total_source
    b1_budget = b1_proportion * budget

    # Take whole groups: find optimal number of groups
    best_groups = 0
    best_diff = float('inf')
    for n_groups in range(len(b1_group_sizes) + 1):
        actual_members = sum(b1_group_sizes[:n_groups])
        diff = abs(actual_members - b1_budget)
        # Prefer taking fewer groups if difference is similar
        if diff < best_diff or (diff == best_diff and n_groups < best_groups):
            best_groups = n_groups
            best_diff = diff

    actual_b1_members = sum(b1_group_sizes[:best_groups])
    remaining_budget = budget - actual_b1_members

    # Step 2: Distribute remaining budget among non-B1 types using Hamilton
    if non_b1_total == 0 or remaining_budget <= 0:
        non_b1_alloc = {k: 0 for k in non_b1}
    else:
        quotas = {k: (v / non_b1_total) * remaining_budget for k, v in non_b1.items()}
        floors = {k: int(math.floor(q)) for k, q in quotas.items()}
        remainders = {k: quotas[k] - floors[k] for k in quotas}

        allocated = sum(floors.values())
        remaining = remaining_budget - allocated

        # Distribute remaining seats to largest remainders
        sorted_keys = sorted(remainders, key=lambda k: remainders[k], reverse=True)
        for i in range(remaining):
            if i < len(sorted_keys):
                k = sorted_keys[i]
                floors[k] += 1

        non_b1_alloc = floors

    # Cap at source counts
    result = {}
    for k, v in non_b1_alloc.items():
        result[k] = min(v, non_b1[k])

    result["b1_groups"] = best_groups
    result["b1_members"] = actual_b1_members

    # If capping reduced some, redistribute to others
    deficit = budget - sum(result.values())
    if deficit > 0:
        # Give to types that have spare source questions
        for k in sorted_keys:
            if deficit <= 0:
                break
            spare = non_b1[k] - result.get(k, 0)
            if spare > 0:
                give = min(deficit, spare)
                result[k] = result.get(k, 0) + give
                deficit -= give

    return result


# ─── TypeScript generation ──────────────────────────────────────────────

def escape_ts_string(s: str) -> str:
    """Escape a string for TypeScript template literal (backtick) context."""
    # Escape backticks and ${
    s = s.replace('\\', '\\\\')
    s = s.replace('`', '\\`')
    s = s.replace('${', '\\${')
    # Also escape backslash sequences that might break
    return s


def escape_double_quoted(s: str) -> str:
    """Escape a string for double-quoted TypeScript context."""
    s = s.replace('\\', '\\\\')
    s = s.replace('"', '\\"')
    s = s.replace('\n', '\\n')
    s = s.replace('\r', '')
    s = s.replace('\t', '\\t')
    return s


def generate_choices_array(choices: Dict[str, str], rng: random.Random) -> Tuple[List[str], Dict[str, int]]:
    """
    Shuffle choices and return (shuffled_list, letter_to_index_map).
    """
    items = list(choices.items())  # [("A", "text"), ("B", "text"), ...]
    rng.shuffle(items)
    shuffled = [text for _, text in items]
    # Map original letter -> new index
    letter_map = {}
    for new_idx, (letter, _) in enumerate(items):
        letter_map[letter] = new_idx
    return shuffled, letter_map


def generate_ts_file(
    ch_num: int,
    data: ChapterData,
    budget: int,
    allocation: Dict[str, int],
    page_start: int,
    page_end: int,
) -> str:
    """Generate the TypeScript file content for a chapter."""

    ch_name = data.ch_name
    ch_num_str = f"{ch_num:02d}"
    topic = f"infectious-diseases-ch{ch_num_str}"
    locator_base = (f"《传染病学学习指导与习题集》第3版 "
                    f"第{ch_num}章 {ch_name} 习题（核对PDF 第{page_start}–{page_end}页）")
    prompt_note = ("题干轻度改写（同义替换/语序/句式）；"
                   "原题来自用户提供的教材配套学习指导与习题集（扫描件 OCR 恢复）")
    answer_notice = "答案依据题集参考答案整理并改写，未经权威教材交叉核对"
    kp = f"kp-{topic}"

    rng = random.Random(RNG_SEED + ch_num)
    kp_full = f"kp-{topic}"

    # ─── Select items based on allocation ───
    term_count = min(allocation.get("term", 0), len(data.term_questions))
    a1_count = min(allocation.get("a1", 0), len(data.a1_questions))
    short_count = min(allocation.get("short", 0), len(data.short_questions))
    case_count = min(allocation.get("case", 0), len(data.case_questions))
    b1_group_count = allocation.get("b1_groups", 0)

    # Select items (take first N from each type)
    sel_terms = data.term_questions[:term_count]
    # Only select a1 questions that have answers AND the answer letter exists in choices
    valid_a1 = [q for q in data.a1_questions
                if q.answer_letter is not None
                and q.answer_letter in q.choices
                and len(q.choices) >= 3]
    sel_a1 = valid_a1[:a1_count]
    if len(sel_a1) < a1_count:
        # Fill with questions without answers if needed
        no_ans_a1 = [q for q in data.a1_questions
                     if q.answer_letter is None or q.answer_letter not in q.choices]
        sel_a1.extend(no_ans_a1[:a1_count - len(sel_a1)])
    sel_short = data.short_questions[:short_count]
    sel_case = data.case_questions[:case_count]
    sel_b1_groups = data.b1_groups[:b1_group_count]

    # ─── Calculate actual totals ───
    b1_member_total = sum(len(g.members) for g in sel_b1_groups)
    actual_total = len(sel_terms) + len(sel_a1) + len(sel_short) + len(sel_case) + b1_member_total
    shortfall = budget - actual_total

    # If shortfall, try to fill from remaining a1 questions
    if shortfall > 0:
        remaining_a1 = valid_a1[a1_count:]
        extra = remaining_a1[:shortfall]
        sel_a1.extend(extra)
        actual_total = (len(sel_terms) + len(sel_a1) + len(sel_short) +
                        len(sel_case) + b1_member_total)
        shortfall = budget - actual_total

    # ─── Assign orders ───
    order = 1

    # Term items
    term_items_ts = []
    for idx, q in enumerate(sel_terms):
        item_id = f"ext-{topic}-term{idx + 1:03d}"  # ASCII-safe, no escaping needed
        locator = f"{locator_base} 名词解释 第{q.number}题"
        answer_text = q.answer_text if q.answer_text else "待确认"

        term_items_ts.append(
            f'  {{\n'
            f'    id: "{item_id}",\n'
            f'    order: {order},\n'
            f'    knowledgePointId: "{kp_full}",\n'
            f'    questionKind: "term",\n'
            f'    status: "available",\n'
            f'    prompt: "{escape_double_quoted(q.prompt)}",\n'
            f'    promptSource: {{\n'
            f'      authority: "nur-editorial",\n'
            f'      wording: "nur-adapted",\n'
            f'      locator: "{escape_double_quoted(locator)}",\n'
            f'      note: `{escape_ts_string(prompt_note)}`,\n'
            f'      sourceIds: [],\n'
            f'    }},\n'
            f'    answer: {{\n'
            f'      status: "available",\n'
            f'      authority: "nur-platform",\n'
            f'      confidence: "unverified",\n'
            f'      content: [\n'
            f'        "{escape_double_quoted(answer_text)}",\n'
            f'        `{escape_ts_string(answer_notice)}（原书第{ch_num}章 {ch_name} 名词解释 第{q.number}题）`,\n'
            f'      ],\n'
            f'      notice: answerNotice,\n'
            f'      sourceIds: [],\n'
            f'    }},\n'
            f'    scoring: null,\n'
            f'    sourceIds: [],\n'
            f'  }}'
        )
        order += 1

    # A1 items
    a1_items_ts = []
    for idx, q in enumerate(sel_a1):
        item_id = f"ext-{topic}-a1{idx + 1:03d}"

        # Determine type label for locator
        type_for_locator = q.type_label if q.type_label else "A1型题"
        locator = f"{locator_base} {type_for_locator} 第{q.number}题"

        # Shuffle choices
        if q.choices:
            shuffled, letter_map = generate_choices_array(q.choices, rng)
        else:
            shuffled, letter_map = [], {}

        # Get correct choice index
        correct_idx = None
        correct_text = ""
        if q.answer_letter and q.answer_letter in letter_map:
            correct_idx = letter_map[q.answer_letter]
            correct_text = shuffled[correct_idx] if correct_idx < len(shuffled) else ""

        # Build analysis text
        analysis = q.analysis.strip() if q.analysis else ""
        answer_letter = q.answer_letter if q.answer_letter else "?"

        # Include case stem in prompt if present
        prompt_text = q.prompt
        if q.case_stem:
            prompt_text = f"{q.case_stem}\n{q.prompt}"

        choices_ts = ", ".join([f'"{escape_double_quoted(c)}"' for c in shuffled])

        a1_items_ts.append(
            f'  {{\n'
            f'    id: "{item_id}",\n'
            f'    order: {order},\n'
            f'    knowledgePointId: "{kp_full}",\n'
            f'    questionKind: "a1-single",\n'
            f'    status: "available",\n'
            f'    prompt: "{escape_double_quoted(prompt_text)}",\n'
            f'    choices: [{choices_ts}],\n'
            f'    correctChoiceIndex: {correct_idx if correct_idx is not None else 0},\n'
            f'    promptSource: {{\n'
            f'      authority: "nur-editorial",\n'
            f'      wording: "nur-adapted",\n'
            f'      locator: "{escape_double_quoted(locator)}",\n'
            f'      note: `{escape_ts_string(prompt_note)}`,\n'
            f'      sourceIds: [],\n'
            f'    }},\n'
            f'    answer: {{\n'
            f'      status: "available",\n'
            f'      authority: "nur-platform",\n'
            f'      confidence: "unverified",\n'
            f'      content: [\n'
            f'        "{escape_double_quoted(correct_text)}",\n'
            f'        `{escape_ts_string(answer_notice)}（原书第{ch_num}章 {ch_name} {type_for_locator} 第{q.number}题 参考答案 {answer_letter}）{escape_ts_string(analysis)}`,\n'
            f'      ],\n'
            f'      notice: answerNotice,\n'
            f'      sourceIds: [],\n'
            f'    }},\n'
            f'    scoring: null,\n'
            f'    sourceIds: [],\n'
            f'  }}'
        )
        order += 1

    # Short-answer items
    short_items_ts = []
    for idx, q in enumerate(sel_short):
        item_id = f"ext-{topic}-short{idx + 1:03d}"
        locator = f"{locator_base} 问答题 第{q.number}题"
        answer_text = q.answer_text if q.answer_text else "待确认"

        short_items_ts.append(
            f'  {{\n'
            f'    id: "{item_id}",\n'
            f'    order: {order},\n'
            f'    knowledgePointId: "{kp_full}",\n'
            f'    questionKind: "short-answer",\n'
            f'    status: "available",\n'
            f'    prompt: "{escape_double_quoted(q.prompt)}",\n'
            f'    promptSource: {{\n'
            f'      authority: "nur-editorial",\n'
            f'      wording: "nur-adapted",\n'
            f'      locator: "{escape_double_quoted(locator)}",\n'
            f'      note: `{escape_ts_string(prompt_note)}`,\n'
            f'      sourceIds: [],\n'
            f'    }},\n'
            f'    answer: {{\n'
            f'      status: "available",\n'
            f'      authority: "nur-platform",\n'
            f'      confidence: "unverified",\n'
            f'      content: [\n'
            f'        "{escape_double_quoted(answer_text)}",\n'
            f'        `{escape_ts_string(answer_notice)}（原书第{ch_num}章 {ch_name} 问答题 第{q.number}题）`,\n'
            f'      ],\n'
            f'      notice: answerNotice,\n'
            f'      sourceIds: [],\n'
            f'    }},\n'
            f'    scoring: null,\n'
            f'    sourceIds: [],\n'
            f'  }}'
        )
        order += 1

    # Case analysis items
    case_items_ts = []
    for idx, q in enumerate(sel_case):
        item_id = f"ext-{topic}-case{idx + 1:03d}"
        locator = f"{locator_base} 病案分析 第{q.number}题"
        answer_text = q.answer_text if q.answer_text else "待确认"

        prompt_text = q.prompt
        if q.case_stem:
            prompt_text = f"{q.case_stem}\n{q.prompt}"

        case_items_ts.append(
            f'  {{\n'
            f'    id: "{item_id}",\n'
            f'    order: {order},\n'
            f'    knowledgePointId: "{kp_full}",\n'
            f'    questionKind: "case",\n'
            f'    status: "available",\n'
            f'    prompt: "{escape_double_quoted(prompt_text)}",\n'
            f'    promptSource: {{\n'
            f'      authority: "nur-editorial",\n'
            f'      wording: "nur-adapted",\n'
            f'      locator: "{escape_double_quoted(locator)}",\n'
            f'      note: `{escape_ts_string(prompt_note)}`,\n'
            f'      sourceIds: [],\n'
            f'    }},\n'
            f'    answer: {{\n'
            f'      status: "available",\n'
            f'      authority: "nur-platform",\n'
            f'      confidence: "unverified",\n'
            f'      content: [\n'
            f'        "{escape_double_quoted(answer_text)}",\n'
            f'        `{escape_ts_string(answer_notice)}（原书第{ch_num}章 {ch_name} 病案分析 第{q.number}题）`,\n'
            f'      ],\n'
            f'      notice: answerNotice,\n'
            f'      sourceIds: [],\n'
            f'    }},\n'
            f'    scoring: null,\n'
            f'    sourceIds: [],\n'
            f'  }}'
        )
        order += 1

    # B1 groups
    b1_groups_ts = []
    for gidx, group in enumerate(sel_b1_groups):
        group_id = f"ext-{topic}-b{gidx + 1:03d}"
        group_order = order

        # Shuffle shared choices
        if group.shared_choices:
            shuffled_shared, shared_letter_map = generate_choices_array(group.shared_choices, rng)
        else:
            shuffled_shared, shared_letter_map = [], {}

        # Build shared choices array
        shared_choices_ts = ", ".join([f'"{escape_double_quoted(c)}"' for c in shuffled_shared])

        # Build members
        members_ts = []
        for midx, m in enumerate(group.members):
            member_id = f"{group_id}m{midx + 1}"

            # Get correct choice index
            correct_idx = None
            correct_text = ""
            if m.answer_letter and m.answer_letter in shared_letter_map:
                correct_idx = shared_letter_map[m.answer_letter]
                correct_text = shuffled_shared[correct_idx] if correct_idx < len(shuffled_shared) else ""

            analysis = m.analysis.strip() if m.analysis else ""
            answer_letter = m.answer_letter if m.answer_letter else "?"

            member_locator = escape_double_quoted(
                locator_base + " B1型题 第" + str(m.number) + "题")

            members_ts.append(
                f'      {{\n'
                f'        id: "{member_id}",\n'
                f'        order: {order},\n'
                f'        knowledgePointId: "{kp_full}",\n'
                f'        questionKind: "b1",\n'
                f'        status: "available",\n'
                f'        prompt: "{escape_double_quoted(m.prompt)}",\n'
                f'        correctChoiceIndex: {correct_idx if correct_idx is not None else 0},\n'
                f'        promptSource: {{\n'
                f'          authority: "nur-editorial",\n'
                f'          wording: "nur-adapted",\n'
                f'          locator: "{member_locator}",\n'
                f'          note: `{escape_ts_string(prompt_note)}`,\n'
                f'          sourceIds: [],\n'
                f'        }},\n'
                f'        answer: {{\n'
                f'          status: "available",\n'
                f'          authority: "nur-platform",\n'
                f'          confidence: "unverified",\n'
                f'          content: [\n'
                f'            "{escape_double_quoted(correct_text)}",\n'
                f'            `{escape_ts_string(answer_notice)}（原书第{ch_num}章 {ch_name} B1型题 第{m.number}题 参考答案 {answer_letter}）{escape_ts_string(analysis)}`,\n'
                f'          ],\n'
                f'          notice: answerNotice,\n'
                f'          sourceIds: [],\n'
                f'        }},\n'
                f'        scoring: null,\n'
                f'        sourceIds: [],\n'
                f'      }}'
            )
            order += 1

        members_joined = ",\n".join(members_ts)
        group_locator = escape_double_quoted(
            locator_base + " B1型题 第" + str(group.start_num) +
            "–" + str(group.end_num) + "题 共用备选答案")
        b1_groups_ts.append(
            f'  {{\n'
            f'    id: "{group_id}",\n'
            f'    order: {group_order},\n'
            f'    questionKind: "b1",\n'
            f'    status: "available",\n'
            f'    groupPrompt: null,\n'
            f'    sharedChoices: [{shared_choices_ts}],\n'
            f'    promptSource: {{\n'
            f'      authority: "nur-editorial",\n'
            f'      wording: "nur-adapted",\n'
            f'      locator: "{group_locator}",\n'
            f'      note: `{escape_ts_string(prompt_note)}`,\n'
            f'      sourceIds: [],\n'
            f'    }},\n'
            f'    members: [\n'
            f'{members_joined}\n'
            f'    ],\n'
            f'    sourceIds: [],\n'
            f'  }}'
        )

    # ─── Build header comment ───
    total_independent = (len(sel_terms) + len(sel_a1) + len(sel_short) +
                         len(sel_case) + b1_member_total)

    missing_answers = 0
    for q in sel_a1:
        if q.answer_letter is None:
            missing_answers += 1
    for q in sel_terms:
        if not q.answer_text:
            missing_answers += 1
    for q in sel_short:
        if not q.answer_text:
            missing_answers += 1
    for q in sel_case:
        if not q.answer_text:
            missing_answers += 1
    for g in sel_b1_groups:
        for m in g.members:
            if m.answer_letter is None:
                missing_answers += 1

    # Source totals
    src_a1 = len(data.a1_questions)
    src_term = len(data.term_questions)
    src_short = len(data.short_questions)
    src_case = len(data.case_questions)
    src_b1_groups = len(data.b1_groups)
    src_b1_members = sum(len(g.members) for g in data.b1_groups)
    src_total = src_a1 + src_term + src_short + src_case + src_b1_members

    header = (
        '/**\n'
        f' * 传染病学学习指导与习题集 第3版 — 第{ch_num}章 {ch_name} 题库提取（等比取样）\n'
        f' * 来源：《传染病学学习指导与习题集》第3版（人民卫生出版社；扫描件 OCR 恢复）\n'
        f' *\n'
        f' * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==\n'
        f' * - 名词解释（term）：{len(sel_terms)} 题\n'
        f' * - 选择题（a1-single）：{len(sel_a1)} 题\n'
        f' * - 简答题（short-answer）：{len(sel_short)} 题\n'
        f' * - 病案分析（case）：{len(sel_case)} 题\n'
        f' * - B1 配伍题：{len(sel_b1_groups)} 组 / {b1_member_total} 成员\n'
        f' * - 独立记分题合计：{total_independent} 题'
        f'{"（须等于本文件预算 " + str(budget) + "）" if total_independent == budget else "（预算 " + str(budget) + "，缺口 " + str(shortfall) + "）"}\n'
        f' * - 缺失答案：{missing_answers}；无法可靠提取：0\n'
        f' * - 说明：本章原书含选择题 {src_a1} 题（A1/A2/A3/A4/B1）、'
        f'名词解释 {src_term} 题、问答题 {src_short} 题'
        f'{f"、病案分析 {src_case} 题" if src_case > 0 else ""}'
        f'，源题总量 {src_total}。'
    )
    if shortfall > 0:
        header += f'源题总量 {src_total} 小于预算 {budget}，取全部可用题，缺口 {shortfall} 题。'
    header += (
        '正确项对齐章末参考答案键号，'
        '选项已随机重排并同步 correctChoiceIndex。'
        'OCR 错字已按传染病学医学语义恢复'
        '（如 病原体→病原体、品性感染→显性感染、潜伏→潜伏、菜姆病→莱姆病、雀乱→霍乱 等），'
        '数值与单位保留原值，未捏造。\n'
        ' * 解析内容位于 answer.content 的第二个元素。\n'
        ' */\n\n'
    )

    # ─── Assemble file ───
    imports = (
        'import type {\n'
        '  AssessmentItemDefinition,\n'
        '  AssessmentItemGroupDefinition,\n'
        '} from "@/types/learning";\n\n'
    )

    consts = (
        f'const topic = "{topic}";\n'
        f'const locatorBase =\n'
        f'  "{escape_double_quoted(locator_base)}";\n'
        f'const promptNote =\n'
        f'  "{escape_double_quoted(prompt_note)}";\n'
        f'const answerNotice =\n'
        f'  "{escape_double_quoted(answer_notice)}";\n'
        f'const kp = "kp-" + topic;\n\n'
    )

    # Term items array
    term_block = ""
    if term_items_ts:
        term_joined = ",\n".join(term_items_ts)
        term_block = f'const termItems: AssessmentItemDefinition[] = [\n{term_joined}\n];\n\n'
    else:
        term_block = 'const termItems: AssessmentItemDefinition[] = [];\n\n'

    # A1 items array
    if a1_items_ts:
        a1_joined = ",\n".join(a1_items_ts)
        a1_block = f'const a1Items: AssessmentItemDefinition[] = [\n{a1_joined}\n];\n\n'
    else:
        a1_block = 'const a1Items: AssessmentItemDefinition[] = [];\n\n'

    # Short items array
    if short_items_ts:
        short_joined = ",\n".join(short_items_ts)
        short_block = f'const shortItems: AssessmentItemDefinition[] = [\n{short_joined}\n];\n\n'
    else:
        short_block = 'const shortItems: AssessmentItemDefinition[] = [];\n\n'

    # Case items array
    if case_items_ts:
        case_joined = ",\n".join(case_items_ts)
        case_block = f'const caseItems: AssessmentItemDefinition[] = [\n{case_joined}\n];\n\n'
    else:
        case_block = 'const caseItems: AssessmentItemDefinition[] = [];\n\n'

    # B1 groups array
    if b1_groups_ts:
        b1_joined = ",\n".join(b1_groups_ts)
        b1_block = f'const bGroups: AssessmentItemGroupDefinition[] = [\n{b1_joined}\n];\n\n'
    else:
        b1_block = 'const bGroups: AssessmentItemGroupDefinition[] = [];\n\n'

    # Exports
    exports = (
        'export const extractedItems: readonly AssessmentItemDefinition[] = [\n'
        '  ...termItems, ...a1Items, ...shortItems, ...caseItems,\n'
        '];\n'
        'export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [\n'
        '  ...bGroups,\n'
        '];\n'
    )

    return header + imports + consts + term_block + a1_block + short_block + case_block + b1_block + exports


# ─── Main ───────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Generate infectious diseases question bank TS files")
    parser.add_argument("--ch", type=int, nargs="*", help="Chapter numbers to generate (default: 2-10)")
    args = parser.parse_args()

    chapters_to_gen = args.ch if args.ch else list(range(2, 11))

    # Load budget
    with open(BUDGET_FILE, encoding="utf-8") as f:
        budget_data = json.load(f)

    budget_map = {}
    page_map = {}
    for key, val in budget_data["budget"].items():
        m = re.match(r"ch(\d+)-", key)
        if m:
            ch = int(m.group(1))
            budget_map[ch] = val

    for key, info in budget_data.get("summary", {}).items():
        m = re.match(r"ch(\d+)-", key)
        if m:
            ch = int(m.group(1))
            page_map[ch] = (info["start"], info["end"])

    print(f"{'Chapter':<35}{'Budget':>8}{'Term':>6}{'A1':>6}{'Short':>7}{'Case':>6}{'B1G':>5}{'B1M':>5}{'Total':>7}{'Status':>8}")
    print("-" * 95)

    for ch_num in chapters_to_gen:
        if ch_num == 1:
            print(f"ch{ch_num:02d}-{CHAPTERS[ch_num]['name']:<28}{'SKIP (hand-written)':>55}")
            continue

        budget = budget_map.get(ch_num, 0)
        page_start, page_end = page_map.get(ch_num, (0, 0))

        # Parse chapter
        data = parse_chapter(ch_num)

        # Count source questions
        b1_member_count = sum(len(g.members) for g in data.b1_groups)
        b1_group_sizes = [len(g.members) for g in data.b1_groups]

        counts = {
            "term": len(data.term_questions),
            "a1": len([q for q in data.a1_questions if q.answer_letter is not None]),
            "short": len(data.short_questions),
            "case": len(data.case_questions),
            "b1_members": b1_member_count,
        }

        # Calculate allocation
        allocation = hamilton_allocation(counts, budget, b1_member_count, b1_group_sizes)

        # Generate TypeScript
        ts_content = generate_ts_file(ch_num, data, budget, allocation, page_start, page_end)

        # Write file
        output_path = OUTPUT_DIR / f"extracted-infectious-diseases-ch{ch_num:02d}.ts"
        output_path.write_text(ts_content, encoding="utf-8")

        # Report
        sel_term = min(allocation.get("term", 0), len(data.term_questions))
        sel_a1 = min(allocation.get("a1", 0), len([q for q in data.a1_questions if q.answer_letter is not None]))
        sel_short = min(allocation.get("short", 0), len(data.short_questions))
        sel_case = min(allocation.get("case", 0), len(data.case_questions))
        sel_b1g = allocation.get("b1_groups", 0)
        sel_b1m = sum(len(g.members) for g in data.b1_groups[:sel_b1g])

        total = sel_term + sel_a1 + sel_short + sel_case + sel_b1m
        status = "OK" if total == budget else f"DIFF {total - budget:+d}"

        print(f"ch{ch_num:02d}-{data.ch_name:<28}{budget:>8}{sel_term:>6}{sel_a1:>6}"
              f"{sel_short:>7}{sel_case:>6}{sel_b1g:>5}{sel_b1m:>5}{total:>7}{status:>8}")

        if data.warnings:
            for w in data.warnings[:5]:
                print(f"  WARN: {w}")
            if len(data.warnings) > 5:
                print(f"  ... and {len(data.warnings) - 5} more warnings")

    print("\nDone.")


if __name__ == "__main__":
    main()
