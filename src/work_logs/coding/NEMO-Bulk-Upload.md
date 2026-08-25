---
layout: page
title: "NEMO Bulk Upload"
categories: [coding]
tags:
  - nemo
  - bulk-upload
  - lab-management
  - api
---

## Project Overview
The idea behind this product is that the API is scary, and ease of use is the whole point of this bulk upload project.

Admins don't like using it because:
- It doesn't have any error checking
- If you upload something invalid, you get a very computer science error and that's it
- It looks like a big JSON
- It only accepts ID numbers as opposed to familiar names

## Up next:
- Checking how permissions work

## Work Log

### 08/16/2026 
**Main Task:** Permission checking

**Notes:**
- Learned that there was already a "use bulk upload" permission
- This must be assigned, it's automatically assigned to all admins, but 

### 08/15/2026 
**Main Task:** Uploading to PyPi

**Notes:**
- Ran tests seems to work real nice?


### 08/14/2026 
**Main Task:** Project inception, chatting with admins

**Notes:**
- I learned that the admins are manually uploading like 10-15 usage events every week and it takes them a long time, and that's just silly
- Simialrly, it's almost fiscal rate season and we'll have to upload like 1500 rates (500 tools x 3 rates a tool)
- NEMO already has a bulk upload in the API, but it takes a JSON and it is hard to use. Hell I don't even use it
- Fired up the old cursor and got to work
