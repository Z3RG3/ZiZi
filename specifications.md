# Intuitive Goal Grid Tracker

A motivation tracker, not a strict tracker app by definition. Helps with starting the task, thus helping with avoidance and similar dilemmas that delay our every days by our minds foolishness.  
If you're tired of strict time manegment workflows, that emphasize the feeling of being offtrack/late thus enducing anxiety about your progress.
Try this unrestricted tracker

Track target hours for projects/studying/reading using this interactive tracker by setting your desired slices of Pomodoro cubes ex. 25 mins sessions and total hours to complete each subject.

Here :

[![Live Demo](https://img.shields.io/badge/demo-live%20on%20Vercel-black?style=for-the-badge&logo=vercel)](https://zizi-mu.vercel.app/)

---

## 1. Main Working Area (The Grid)

- **Visual Concept:** A clean, rectangular grid styled like tinted graph paper. Each square represents a fixed measure of time ($x$ minutes), and the total number of squares represents the overall goal for the week/project.
- **Grid Mechanics:** Clicking or painting squares fills them in with selected colors from the legend.
- **Responsiveness:** Built with fluid layout containers (CSS Grid/Flexbox) so the grid scales smoothly across different screen sizes and monitor resolutions without requiring custom canvas zoom controls.

### Logic & Auto-Fit Calculator
Instead of manual row/column configuration, the grid geometry is generated dynamically:

1. **User Inputs:**
   - **Total Goal:** e.g., $10\text{ hours}$ ($600\text{ minutes}$)
   - **Unit Size ($x$):** e.g., $5\text{ mins}$, $10\text{ mins}$, or $15\text{ mins}$ per square
   - **Target Aspect Ratio / Layout Preference:** e.g., Standard ($4:3$), Wide Banner ($16:9$), or Compact
2. **Calculations:**
   $$\text{Total Squares } (N) = \frac{\text{Total Goal (minutes)}}{\text{Unit Size } (x \text{ minutes})}$$
3. **Grid Dimensions:**
   - Programmatically determines columns ($X$) and rows ($Y$) such that:
     $$X \times Y = N$$
   - *Example:* A 10-hour goal ($600\text{ mins}$) with $x = 5\text{ mins/square}$ yields $N = 120\text{ squares}$.
     - Layout option 1: $15 \text{ columns} \times 8 \text{ rows}$
     - Layout option 2: $20 \text{ columns} \times 6 \text{ rows}$

---

## 2. Color Legend (Tasks / Days)

- **Position:** Placed above the main working area/rectangle.
- **Color Picker:** Palette of selectable color labels (5–7 preset swatches + custom color pickers).
- **Categorization Twist:** Can map colors either to specific days of the week or to different project tasks/categories.
- **Selection State:** Active color choice determines the fill color for any clicked or highlighted grid squares.

---

## 3. Title & Header Info

- **Title:** Project or weekly sprint title (e.g., *"Week 42: Data Pipeline Refactor"* or *"Q4 Design Sprint"*).
- **Summary Metrics:** Quick indicators showing total completed blocks vs. total remaining blocks.

---

## 4. MVP Roadmap & Future Features

### MVP (Phase 1)
- Auto-Fit Grid generation calculator.
- Color palette picker (tasks/days).
- Interactive fill/unfill grid tiles.
- Responsive container layout for desktop usage.
- Local browser state persistence (`localStorage`).

### Backlog / Future Enhancements
- **Strict Mode:** Optional validation enforcing adjacency/weaving rules for consecutive days.
- **Batch Session Logging:** Quick-add modal to log $N$ minutes directly instead of clicking individual tiles.
- **Weekly Archives & History:** Ability to review past completed grids like a GitHub commit graph.
- **Export options:** PNG/SVG snap-shot export.
