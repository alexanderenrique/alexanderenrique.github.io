---
layout: page
title: "NEMO Merger Work Log"
categories: [coding]
tags: 
  - lab-management
  - automation
  - merger
  - nemo
  - snf
  - snsf
  - database
  - migration
  - tools
  - users
  - area-access
  - consumables
  - rates
  - project-management
  - #ai
  - #work-log
---
## Project Overview
- SNF and SNSF are merging and we need to have a unified lab management system, here we go.

## Example standard process flow:
{% mermaid %}
graph LR
    A["Download rate types"] --> B["Generate a rate matching scheme<br>that associates a rate type<br>with a NEMO ID"]
    B --> C["Download existing accounts"]
    C --> D["Map SNSF spreadsheet columns<br>to NEMO fields"]
    D --> E["Check against existing accounts"]
    E --> F["Upload New accounts"]
{% endmermaid %}

Dependency tree:

Rate types -> Accounts -> PTAs -> Projects -> Lab members

Lab members have: Projects, user types, qualifications, projects

## Up Next:
- Adding PTA expiration dates
- Making sure staff cannot modify tool names
- Adding Dependencies to SNSF tools
- removing that dependency
- Making SNSF tools visible in NEMO

## Done:
- Uploading and testing interlocks cards/interlocks in SNSF buildings (Grant)

Questions:
- When Adding the external lab members, should I include the expiration date of their SUNet ID?
  - I could add this to the "Active access expiration date" field

## Notes for Launch day:
- Make tools visible
- Enable interlocks
- Moving Allen tools to the Allen folder


## Procedure for Future Alex
- Downloading the current SNF users and adding the area access to Allen they need
- Adding accounts
- Downloading the accounts so you can then map those to the projects you're going to upload
- Upload the tools (anytime, I might want to organize them in NEMO-Plan, then move that hierarchy to live NEMO)

## Stats:
- Accounts: 317->590
- Projects: 882-> 1311
- Lab Members: 1120 -> 1778 (internal only) -> 1904 (internal and external)
- Interlocks Cards: 144 -> 247
- Interlocks: 172 -> 269
- Tools: 200 -> 421

Total accounts: 590
Accounts with projects: 525
Accounts without projects: 65

37 PTAs are duplicated
99 projects use these duplicate PTAs

## Work Log

11/17/2025:
**Main Task:** Uploading Interlocks Cards, starting interlocks

**Notes:**
- Uploaded interlock cards, did a test push to nemo-plan which was a good ide
- 

11/10/2025:
**Main Task:** Uploading Tools, Uploading Internal lab members

**Notes:**
- Downloaded the tool from NEMO-Plan, which had the hierarchy that grant wanted
- Uploaded them to NEMO, making them invisible until we're ready to launch
- Uploaded the internal lab members. It was tricky because there was also a column that had multiple PTAs, so I had to do a look up for that field as well
- 

11/9/2025:
**Main Task:** Uploading PTAs

**Notes:**
- Uploaded the PTAs, went pretty well
- PTAs must each have a unique name, so I wasn't able to upload the duplicate TSMC - SNSF PTA, currently have a RFI out to the admins
- For the external users, the username is the SUNet ID, but the email can be whatever username they want.
- 

11/8/2025:
**Main Task:** Un-Fucking the accounts

**Notes:**
- Ok so I jumped the gun and added too many accounts, here are some specs just to remember:
- Total PIs in Excel: 361
Duplicate accounts (already exist): 113
New accounts to create: 248
Successfully created: 242
Failed to create: 6
Success rate: 97.6%
(venv) (base) adenton@SOE-FVFHW06VQ05F NEMO-Merger % /Users/adenton/Desktop
/NEMO-Merger/venv/bin/python /Users/adenton/Desktop/NEMO-Merger/download_ac
counts.py
Starting account download from NEMO API...
API Endpoint: https://nemo.stanford.edu/api/accounts/
- here's how I'm going to un-fuck it: I'm going to upload all the new accounts, and the associated PTAs. 
- THEN is an accoount doesn't have a PTA, I will mark is as inactive
- HAHA!
- Also compared the dirty list I uploaded and the clean list and then deleted the dirty ones that I may have uploaded by mistake.
- Edited the project upload to work from the new clean excel file.

### 11/7/2025
**Main Task:** Update

**Notes:**
- The SNSF admins decided they needed to clean the PTAs before I upload them, so waiting on that.
- Badger does not correlate SUNet IDs to users, so there are some SNSF users that have multiple accounts. 
  - We're trying to figure out a way to merge these accounts on their SUNet ID, but we don't know everyones sunet.
- Added location to the batch tool upload
- I also realixed I have the interlock information here as well.
  - Is there a way to upload all the interlock information without actually triggering it?
  - Yes there is


### 11/6/2025
**Main Task:** Refreshing my knowledge, uploading Accounts

**Notes:**
- The "reate projects" function was relying on the API to give a 409 error and check for duplicates but I don't trust that
- Created a new function that downlaods all the PTAs and check the excel file against it before uploading
- By default, the "name" and "account" fields should match in nemo, the PTA should only be in the PTA field.
- Accounts are a mandatory field when creating a project, do I need to push a bunch of accounts first?
  - In the user account excel file, the "piemail" field is the account name, I may need to first push all of these
- Today I successfully created the accounts, keeping in mind that each one has a rate category associated with it, so that required a look up table. 

### 08/21/2025
- My "add allen prefix" went a bit wild and added the prefix to the wrong things so I corrected it and moved the Shriram/Spilker all that to the right category

### 08/12/2025
- the staff charges and tool training charges were previously set to be global, so only one staff chaarge and one staff training charge could exist
  - Seems to be some kind of bug, can't make staff charges tool by tool
- Changed the tool hierarchy so everything in the SNF is now under Allen
- Up Next is adding the access areas like Grant and I talked about

### 08/11/2025
- Started working on the gap analysis, honestly too hard to think of all the gaps
- Started coding instead, uploaded all the tools under the category SNSF
- I'm slowly finding the roots of things
- for example I'd like to upload users, but first I thought to Upload PTAs, but to upload those you need a to upload accounts
- So far I've uploaded all the tools, added Allen to our lab members, 
- Mapping for new area access: 
  - SMF = 
  - SNC = 
  - SNL

## September 1st Goals:
-Minimum:
    - Gap analysis (consolidating thoughts)
    - All Tools Into Merged NEMO, everyone has access
- Order of operations:
  - Meet up with Grant/Carsen, figure out the access areas
  - Do a skeleton framework for tools
  - Education sessions with tool owners so they can configure their tools
  - SNSF review everything! I did my best to translate what I saw to NEMO language but it must be perfect on Jan 1st
  - Creating Billing documents to share with admin team (what do we already have?)

## Thinking
- What's the order of operations for getting all the new users into NEMO?
  - People are complicated, maybe I'll start with the tools

- What do people need to do versus what can I code?

- Migration:
  - Getting tools, users, PTAs, everything into SNF NEMO
- Configuration
  - Tool owners setting up their tools
  - Areas
- Education
  - Billing
  - Staff education

### Timeline
- Phase 1 (Date):
- Phase 2 (Date):
- Phase 3 (Date):

### Known Issues/Challenges
1. 
2. 
3. 

## Grant Questions:
- do you actually want SNL or whatever in the tool name?
  - NO want to purge any instances of SNL, SNC, SMF
- How are the area access going to work, what tool goes where?
  - Reconviene and understand how area access if going to work, what do the characterization people want? Each tool can be different, does each tool need to be its own area or is there another way?
- list of consumables to upload?
  - in the inventory.txt file
- How do we want to organize the consumables so people know where they are?
  - Add TEM supplies, more under AFM supplies, SMF supplies, XPS supplies (software licencse?)
- For the rates, is there ever a difference between the other academic and local category?
  - No, one in the same
- Do you specify any SBIR rates?
  - No, we might not either pretty soon LOL
- Send me interlock i.p address list!