# Mini Sentiment Widget

A small React frontend application built for the WOGAA Engineering frontend technical assessment.

## "frontend only"

This assessment does not require a backend server, database, or API.

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

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the local URL shown in your terminal.

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

## AWS deployment options

### Option 1: AWS Amplify Hosting

This is the easiest option for a React assessment project.

1. Push this project to GitHub
2. Go to AWS Amplify
3. Create a new app and connect your GitHub repository
4. Amplify will detect the Vite app
5. Use:
   - Build command: `npm run build`
   - Output directory: `dist`
6. Deploy and use the public Amplify URL in your submission

### Option 2: S3 + CloudFront

You can also host the built static files on AWS S3:

1. Run `npm run build`
2. Create an S3 bucket
3. Upload the contents of `dist/`
4. Enable static website hosting
5. Optionally place CloudFront in front of S3 for a cleaner production setup

For an interview assessment, AWS Amplify is usually faster and easier.

## Design notes

- The widget uses simple local state because no backend is required
- Submission is disabled for 3 seconds after each submit to simulate spam prevention
- Empty comments are allowed, but only non-empty comments appear in the recent comments section