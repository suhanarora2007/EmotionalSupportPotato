# Emotional Support Potato

A small potato-shaped therapist. Tell it what's wrong. It will not understand, but it will respond with warm, confidently unhelpful therapy-speak anyway — because that's what potatoes do.

Built for GCSRM Recruitment 2026 — Technical Track (Web Development), Option A: Build a Web Toy.

## Live Demo
https://emotional-support-potato.netlify.app

## What it does

- Type anything and hit "Tell potato" — the potato visibly "listens" (a little wiggle), then replies with a random, unrelated, comically generic piece of advice
- A mood meter for the potato shifts randomly after every message, completely unrelated to what you actually said, with the potato's face changing expression to match
- An "End session" button resets the conversation and keeps a running count of how many sessions you've had, saved across visits

## Tech stack

- HTML — the structure of the page
- CSS — styling and animations
- JavaScript — makes the potato respond, change mood, and remember sessions

## How to run

Just open `index.html` in a browser. No installation needed.

## Project structure

```
├── index.html      # page structure
├── style.css       # potato character design + layout
├── script.js       # response logic, mood shifts, session storage
└── README.md
```

## Interactions (meets the 3+ requirement)

1. **Submit a message** — potato animates ("listens"), then reveals a random therapy-speak response after a short delay
2. **Mood meter shifts** — after every message, the potato's mood bar and expression change randomly, independent of the input
3. **End session** — resets the conversation and increments a persistent session counter shown on screen
- Persistent session counter via `localStorage`
- Enter-key support for sending messages
