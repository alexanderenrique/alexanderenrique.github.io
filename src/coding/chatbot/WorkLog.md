---
layout: page
title: "Work Log Bot"
categories: [coding, chatbot]
tags: [ai, work-log, automation]
---

# Nano Chatbot

## Project Overview

## Current Tasks
- Creating a new repo, pushing my project there
- Setting up the interactive interpreter window
- Looking into the chunking, embedding, retrieval. How useful are metadata tags really?
- 



## Up Next

-

## To-do


- adding a query classification that classifies the query more broadly, pulls key words, etc
- retrieval: using the improved query classification to retrieve a bunch of docs
  - Hybrid search maybe
  - using cohere to compare what really matters for the query
- THEN with the cohere filtered results send that out for LLM

- Is there a way of just doing key word search? 
- does it make sense to first re-word the prompt?
- Might need PGvector scale? for hybrid search? Cohere?
- Cohere makes sure that what you have retrieved is relevant
- Starting smaller, looking at it one doc, one chunk at a time
    - Did it retrieve the metadata properly, did it classify the query?
    - Start with simple, vector search related questions, or simple metadata questions
    - Really see what it did each step of the way
- Need to analyze each step of the process
- using pydantic to enfore types. Make base model class, each one is a string, makes 100% sure that we never deviate - see Today-I-Learned for pydantic learnings
- Moving all this to a super computer, off the local computer
- whever you added openAI calls, add the logfire call
- might not need such fine grained metadata, if you have good query classification and bring back a ton of docs. Then you only have to worry about broader conepts like document type
- Once we start holding things in memory, we're better able to chat back and forth, massive context window
- We can release something when we really have something to give
- Inerface where people can drag and drop stuff and have it be classified and ingested 


## Progress Log

### 08/07/2025
- so what I'm hearing from Sam is that I should just build whatever I want with the stuff she provided. I'm going to clone this into my own repo and just go hard on it, I'll push it into the other repo periodically, but I want to be on my own main branch and do what I want if this is going to be my project
### 07/22/2025
- further broadend the metadata, removed the Operating instruction tag and am just calling thinfgs "guides" there is too much overlap in the documents - related to NEMO Merger metadata work
- Also not sure about "Procedure" vs "Guide", 
- Added document logging so we can see what we've processed so far
- Proccessed 47 documents from local doc to vectorization and metadata, and it went way way faster than it has in the past. Took like 3-4 hours where in the past it took all night to only do half. Not sure if that is becasue of the upgrade to pydantic V2 or maybe doclin g got better. I don't remember explicitly upgrading anything so I'm not sure why this changed
  


### 07/21/2025
- Updated the metadate fields to be broader, more applicable to other groups
- implemented a hybrid pydantic/yaml approach so you only need to choose the metadata values in the yaml file
- For the metadata validation, moved to a case normalization/fuzzy matching method. I don't want to have to write similar or approximate names anywhere
- did work removing the metadata fields that were hard coded into a lot of file. It's only driven by the yaml file now.
- absolutely battled how pydantic treats its /env variables. I think I upgraded to pydantic V2 accidentally or something
- re-wrote a lot of the settings files to get the .env to work right with pydantic

## How does this thing work?

### Docling Conversion:


### Meta Data Processing:


#### 1. **Metadata Field Definitions (YAML)**
- `metadata_fields.yaml`: Defines metadata field names, types, and descriptions.
- `standardized_values.yaml`: Lists allowed values and other field constraints.

#### 2. **Document Sent to LLM**
- Raw document text is passed to a Large Language Model (e.g., OpenAI).
- Prompt instructs the LLM to extract metadata based on the YAML schema.

#### 3. **LLM Returns Raw Metadata**
- LLM outputs a dictionary of extracted metadata.
- These values may be inconsistent or messy.

#### 4. **Standardization**
- Each metadata value is:
  - Normalized (lowercased, trimmed, punctuation removed).
  - Fuzzy matched against allowed YAML values.
- If a close match is found, it’s replaced with the canonical value.
- Otherwise, the value is set to `None` or left unchanged based on logic.

#### 5. **Pydantic Validation**
- A Pydantic model is dynamically generated from the YAML schema.
- Enforces:
  - Correct field names.
  - Correct types.
  - Valid values (for constrained fields).
- Invalid entries raise an error.

#### 6. **Result**
- Output is a clean, validated, and standardized metadata dictionary.
- Ready for storage**, search, or display.

---

#### Summary

| Component        | Role                                                |
|------------------|-----------------------------------------------------|
| **YAML**         | Source of truth for fields, types, and constraints  |
| **LLM**          | Extracts metadata from raw text                     |
| **Standardizer** | Cleans and corrects extracted values                |
| **Pydantic**     | Enforces types and constraints for final validation |

---




## Accomplishments
- changing the metadata tags so that they are more broad, can be applied to more labs
- enforcing the metadata tags more smartly with a hybrid yaml/pydantic model
- cleaned it up so that the meta data info is just in the yaml files
- Making a logging file so that docling doesn't re-process things


## Known Issues
- 

