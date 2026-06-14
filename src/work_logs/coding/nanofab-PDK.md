---
layout: page
title: "Nanofab PDK"
categories: [coding]
tags:
  - nanofab
  - pdk
  - knowledge-graph
  - snf
  - fastapi
  - postgres
  - crawler
  - ontology
  - lab-management
---

## Project Overview

An open, searchable knowledge graph of university nanofabrication capabilities. The idea is that SNF (and eventually other fabs) have tool info scattered across the lab user guide, Google Docs, SOPs, and PDFs — and right now the answer to "which tool can etch GaN at 250°C?" is basically tribal knowledge or Ctrl+F through a dozen pages.

Primary source of truth is structured data in a canonical ontology. Answers come from graph queries, not document retrieval.


### High Level Architecture
{% mermaid %}
graph LR
    A["SNF Lab User Guide"] --> B(("Crawler"))
    B --> C[("Content-hashed cache<br/>data/raw/snf/")]
    C --> D(("Table Parser"))
    C --> E(("AI Enrichment<br/>SOPs + detail pages"))
    D --> F[("Postgres<br/>facts + provenance")]
    E --> F
    G["Vocabulary YAML"] --> F
    F --> H(("FastAPI"))
    H --> I["Tool Browser UI"]
    H --> J["NL Query Translator"]
{% endmermaid %}

## Up Next
- Run full enrichment pass on all crawled SOPs
- Verify extracted facts against a handful of known tools manually
- Figure out how to keep the graph fresh when SNF updates the guide
- Maybe expose this through NEMO somehow?

## Work Log

### 06/13/2026
**Task:** Enrichment pipeline, tests, Tool Browser UI

**Notes:**
- Spent today tightening up the ingestion side — the deterministic table parser gets you a long way, but the real gold is in the SOPs and detail pages
- Built out the OpenAI enrichment path: it reads cached document bundles per tool, runs process-specific processors first, then does structured extraction for manufacturer/model/capabilities
- Every fact lands in Postgres as an append-only edge with provenance and confidence, which feels like the right model — you can always trace where something came from
- Added an audit command to see enrichment coverage gaps before burning API credits on a full run
- Wrote tests for the crawler, core graph loading, and extraction schemas — all 17 passing
- Built a simple static Tool Browser UI — structured filters only, no AI in the browse path. Processing technique, etches/accepts/deposits, contamination class, max temp. Feels good to have something you can actually click through
- NL query endpoint exists too — translates natural language to filter objects, with a rule-based fallback for common patterns like "ALD" or "etch oxide"

### 06/12/2026
**Task:** Greenfield scaffold — ontology, crawler, CLI, first SNF crawl

**Notes:**
- Started from scratch on this one. Python package (`nanofab-pdk`), Postgres in Docker, Alembic migrations, Typer CLI
- Defined the canonical ontology first: Tool, Process, Material, Film, Gas, Capability, Recipe, Document, TrainingRequirement, ContaminationClass, and the predicates that connect them (performs, accepts, etches, deposits, requires_training, etc.)
- Seeded vocabulary from YAML — processes, materials, films, gases, contamination classes, technique→material mappings
- Built the SNF crawler with polite rate limiting and content-hashed caching. It follows equipment table links, tool detail pages, operating instructions, embedded Google Docs/Slides, and PDFs
- Ran the first real crawl and cached ~2,300 resources into `data/raw/snf/` — way more pages than I expected, lots of nested Google Doc links off the equipment table
- Table parser pulls structured rows from the equipment page: NEMO ID, training requirements, techniques, cleanliness class, location. Deterministic, no AI needed for that layer
- `snf-capabilities` ingest applies the technique→material mappings from the vocab seed
- Got the FastAPI server running with structured search, tool detail endpoints, and vocab listing
- The whole pipeline is: `crawl snf` → `ingest snf-table` → `ingest snf-capabilities` → `ingest snf-enrich` → `serve`
- This is the project I've been wanting to build for a while — basically a PDK-style capability graph for the nanofab instead of a pile of disconnected docs
