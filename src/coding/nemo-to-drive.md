---
layout: page
title: "NEMO to Drive"
categories: [coding]
tags: 
  - automation
  - file-transfer
  - google-drive
  - nemo
  - python
  - api
  - sync
  - backup
  - lab-management
  - #nemo
  - #lab-management
  - #automation
---

## Project Overview
- Script to automatically transfer files from NEMO to Google Drive. It started with just billing data to be ingested into Tableu, but I am also adding post usage questions data. Currently, staff memebrs don't have an easy way to see the post usage questions data. [**GitHub Repo**](https://github.com/SNF-Root/NEMO-VM)

## Process Flow
{% mermaid %}
graph LR
    A["Runs main function<br><small><i>(Every Hour)</i></small>"]
  A --> B["Fetches current month's data<br><small><i>(from 1st of month to now)</i></small>"]
  B --> C["Uploads monthly CSV on Google Drive<br><small><i>(Overwrites existing file)</i></small>"]
  C --> D["Updates master CSV on Google Drive<br><small><i>(Appends new data to existing file)</i></small>"]
  D --> E["Cleans up local files<br><small><i>(Deletes old files)</i></small>"]
  C --> F["Creates New Month file on 1st of the month"]
{% endmermaid %}





## Up Next
- Finish automating the post usage question data download and clean up
- Why are there duplicate septemeber and October, both ending on the second of the month?
- Setting up Google VM for all the scripts

## Work Log

### 10/10/2025
- Turns our Eli has made progress on the Tableu side, so I need to make sure the data is there for him
- My Daemon on the collector has been working this whole time which is pretty cool I hadn't checked on it in forever. 
- Slight bug where it made a new monthly report for the first two days of the month and then made a seperate report correctly with the entire month
- Worked fixing that bug, and generating an annual report with ALL the years data

### 08/07/2025
- The billing seems to be working nicely which is cool
- Started working on getting the post usage question data out and onto the drive, that seems to be working well. Just a lot of data processing steps
- Need to move it to the collector and then it'll be sorted
- My tool/user list is static as well so if i wanted it to be really robust I'd also have it update the tool and user lists

### 08/6/2025
- Haha you thought! Changed everything over to run on the shared drive using a service account. You must use a shared Google drive if you are going to use a Service account bot buddy
- I clobbered the old instance on the collector and pulled a new version down once I figured out the whole new authentication scheme
- Also cleaned up the repo, It's be cool to share it some time

### 08/5/2025
- never really done am I? The .env was not being correctly loaded in the cron job because there were spaces between the variable names and the actual key, so it wasn't working
- My scheduling was also whack and it was running at 8 minutes and 20 minutes past the hour, which I never remember setting. maybe I though 8am and 20:00=8pm? Anyways I changed it to run every hour cause why not
- I'm wondering if I should put a bit more work into this to make it something other people can implement in other labs. That said, the whole google auth thing is a bit of a pain so it isn't for the faint of heart

### 08/04/2025
- made modifiactions to the bash script that does the master upload, seems to be working
- had to add steps to it compies the files to the nemo_automation folder, it also creates a venv automatically now, in later versions of the set up script
- I guess this project is done for now, until it breaks or we need new functionality

### 07/28/2025
- Modified the existing script so that it can be run on a VM (or on the collector)
- I deleted the token and reauthenticated, and now things work OK.

## Back Burner
- Making it publishable?
