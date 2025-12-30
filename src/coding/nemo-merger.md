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

## Example uploadflow:
{% mermaid %}
graph LR
    A["Download rate types"] --> B["Generate a rate matching scheme<br>that associates a rate type<br>with a NEMO ID"]
    B --> C["Download existing accounts"]
    C --> D["Map SNSF spreadsheet columns<br>to NEMO fields"]
    D --> E["Check against existing accounts"]
    E --> F["Upload New accounts"]
{% endmermaid %}


## Up Next:
- Adding onboardgin phases to lab members
  - adding onboarding if they are also qualified on the "SNF safety training" tool
  - ~~If they have a "last sign in" then they must have been an SNF user~~
  - ~~If they are in the SNSF spreadsheets, they will get the SNSF onboarding phase~~
- Writing a script that does the door charges automatically from the linel data. 
  - Waiting on sample linel data.
- Creating a sheet for everything lab members need to check
- Everything Staff needs to check
- List of things to upload over break
  - When can I get the last user and qualification lists?
- Updating the knowledge bases for staff and lab members
- Adding the Kiosk Issue to gitlab


## Notes for Launch day:
- Enable interlocks
- Moving Allen tools to the Allen folder
- Make consumables visible in NEMO
- Final upload
- rates, 

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

Figuring out Onboarding Phases, currently:
SNSF count: 1361/1919
SNF count: 348/1919
neither count: 208/1919
both count: 2/1919

(# for adding SNF onboarding phase)
Total lab members processed: 1919
Lab members successfully updated: 568
Lab members skipped: 1351
Lab members with failed updates: 0

✓ 568 lab member(s) had phase 1 added to their onboarding phases

## Work Log

### 12/2/2025
**Main Task:** Adding consumables 

**Notes:**
- Added consumables 
- Added consumable rates
- Worked with admins to figure out eh whole door access and billing thing. 

### 11/21/2025
**Main Task:** Adding NEMO launch resource to tools, making tools visible

**Notes:**
- Added the NEMO launch resource as a dependency to the tools
- Scheduled a resource outage to end on December 31st at midnight
- Made the tools visible in NEMO, mingling with the old Allen tools. 

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

## Done:
- ~~adding consumables~~
- ~~adding consumable rates~~
- ~~Adding PTA expiration dates~~
- ~~Fixing existing lab members, making sure they have the PTAs they need~~
- ~~Adding Core facilities to tools for billing purposes~~
  - ~~Email Carsen, can't be done via api, needs to be done manually~~
- ~~Adding tool qualifications~~
  - ~~only adding active user qualifications~~
- ~~Assigning interlocks to tools~~
- ~~Making sure staff cannot modify tool names (can't be done)~~
- ~~Adding Dependencies to SNSF tools~~
- ~~removing that dependency~~
- ~~Making SNSF tools visible in NEMO~~
- ~~Wendy and different lab member priveledges~~
  - ~~Decided to give lab members staff priveledges on the tools they are super users on.~~
- ~~Adding IDs to lab members for door charges~~