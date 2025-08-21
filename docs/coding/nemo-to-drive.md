# NEMO to Drive Work Log

## Project Overview
- Script to automatically transfer files from NEMO to Google Drive

## Current Tasks
- Getting a basic billing NEMO to drive set up on the VM

## Up Next
- 

## Work Log

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
