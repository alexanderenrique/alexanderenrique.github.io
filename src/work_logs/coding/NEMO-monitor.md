---
layout: page
title: "NEMO Tool Monitor"
categories: [coding]
tags:
  - nemo
  - lab-management
  - tool-status
  - monitoring
---

## Project Overview
Work log for the NEMO tool monitor. Currently, the lab uses a million different spreadsheets in a million different places and it's just ugly. My goal is to have a centralized place for this. We can also monitor gas weights and 

## Future Improvements
- 

## Work Log

### 05/22/2026
**Main Task:** We're in production baby

**Notes:**
- Added NEMO-monitors to the nemo and nemo-dev git lab, with Mathieu's blessing I restarted both instances and it is working! How good is that
- I've started building out my ALD monitors, to show people what is possible

### 05/22/2026
**Main Task:** Pushing PyPi and NEMO-Dev

**Notes:**
- Exciting day, pushed 1.0.0 to PyPi!
- Made some small readme changes and cleaning up dead code and then pushed 1.0.1
- Got it installed into NEMO-Dev, it went really smoothly!
- Weirdly enough I didn't even need to run the make migrations, I guess that command was baked into something else?

### 05/20/2026
**Main Task:** Cleaning Up control limits

**Notes:**
- The legends were getting very cluttered with all the different lines indicated
  - Seems like for this reason some of the 2 in 1 monitors will need to be broken up, like the samco etch monitors that have two different etch modes or whatever, that can definitely be two monitors

### 05/19/2026
**Main Task:** Moving from tool monitors to everything monitors, control limits

**Notes:**
- I was sitting in the shop with Mike Dickey thinking about how he keeps track of gas cylinders and stuff like that, and I thought, my plugin is almost what he needs for this
- Ran it by a few staffers, they suggested adding control limits which is a pretty good idea (shout out Swaroop)
- Started adding control limits, trying to make the charting cleaner

### 05/18/2026
**Main Task:** Tuning

**Notes:**
- spent another couple hours on it, just removing unused fields, making sure the axis makes sense, testing CSV loading, which works now
- Date range was kinda funky and not doing quite what I want either, working on that

### 05/15/2026
**Main Task:** Tuning

**Notes:**
- Man it is so much easier to write software only stuff, Cursor just kills it with the edits
- MQTT was so, so much harder. 
- I know the 80/20 rule, but this should be done in a month at most, still a few things to test and tweak but it generally works really well.

### 05/14/2026
**Main Task:** Project inception

**Notes:**
- Pulled down the sensor plugin, and re-purposed that 
- It is kind of just a slow massaging process trying to get the plugin to match what is in my mind
- It is coming together pretty fast, the initial sprint is always very satisfying and then it's the grind of iteration
- I'm adding multi column support, so that when making a monitor people can define the columns that they need
- Already feels way easier than MQTT, that shit was so hard to write

