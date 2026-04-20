# Mini Sentiment Widget

A small React frontend application built for gathering survey feedback for sentiment analysis. Link to the application hosted on AWS: http://awstrialver-sentimentanalysis-s3.s3-website-ap-southeast-2.amazonaws.com/


## "frontend only"

This application does not require a backend server, database, or API.

Everything can be handled in the browser using React state:

- store the selected rating
- store the current comment text
- store the submitted feedback entries in memory
- compute summary values like total submissions and average rating on the client side

Because submissions are stored only in React state, they will reset when the page is refreshed. That matches the assessment requirement.

## Tech stack

- React 18
- Vite
- Functional components and hooks

## Run locally
Clone or download this repository to your machine.
1. Install dependencies:

```bash
npm install
```

2. cd into the folder which contains all files from this repository:

```bash
npm run dev
```

3. Start the development server:

```bash
npm run dev
```

4. Open the local URL shown in your terminal.

## Build for production

```bash
npm run build
```

The production files will be generated in the `dist/` folder.

## Suggested architecture

- `App.jsx` manages state and submission logic
- `RatingChips` handles rating selection
- `CommentBox` renders the textarea
- `SubmitButton` handles form submission
- `SummaryPanel` shows total submissions, average rating, and recent comments

## Design notes

- The widget uses simple local state because no backend is required
- Submission is disabled for 3 seconds after each submit to simulate spam prevention
- Empty comments are allowed, but only non-empty comments appear in the recent comments section
