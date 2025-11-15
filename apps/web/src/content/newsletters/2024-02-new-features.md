---
title: "opensox newsletter demo - full formatting test"
date: "2025-06-10"
excerpt: "a stress test markdown file to validate rendering, spacing, images, lists, code, tables, and odd content."
readTime: "7 min read"
---

# full formatting test

welcome to the **opensox formatting demo**.  
this file tests every tricky markdown case that your newsletter system might hit.

## headings

### h3 heading  
#### h4 heading  
##### h5 heading  

---

## paragraphs and breaks

this is a normal paragraph to test spacing and line height.

here is another paragraph to see if margins are correct.

this is a line with  
a manual line break  
to test `<br>` handling.

---

## bold, italics, links

this is **bold text**.  
this is *italic text*.  
this is **bold and *nested italic***.  
this is a [link to opensox](https://opensox.ai).

---

## images

![sample image](https://images.unsplash.com/photo-1522199710521-72d69614c702?w=900)

<img src="https://i.ytimg.com/vi/8muPjPCnbcU/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDhR3st81xBzrAww9Ua2eYbq7Iimg" alt="kitten" />

both of these should render cleanly.

---

## lists

### unordered list

- item one
- item two
  - sub item a
  - sub item b
    - deep sub item

### ordered list

1. first
2. second
3. third
   1. nested a
   2. nested b

---

## blockquote

> this is a quote block.  
> it should have left padding and a border.

---

## code blocks

### inline code

here is some inline code: `npm install opensox`.

### fenced code

```ts
export function example() {
  console.log("hello from opensox");
  return { ok: true };
}
````

### long code block

```json
{
  "project": "opensox-ai",
  "features": [
    "ai search",
    "project tags",
    "user onboarding"
  ],
  "version": "1.0.0"
}
```

---

## table

| feature     | status   | notes                     |
| ----------- | -------- | ------------------------- |
| ai matching | live     | powered by smart scoring  |
| onboarding  | improved | new user flows added      |
| news feed   | coming   | planned for march release |

---

## inline html test

<div style="padding: 12px; border: 1px solid #ddd; font-size: 14px;">
this is inline html.  
your renderer should not break when it sees light html.
</div>

---

## horizontal rules

---

another section after hr.

---

## weird characters test

quotes: "hello", 'hi'
symbols: © ® ™ ∞ ≈ ± ÷
punctuation: … · • ° ¶ §

(no em-dashes used, only hyphens)

---

## long paragraph stress test

this is a deliberately long paragraph that exists only to test line wrapping, max width constraints, and readability under a large continuous block of text without breaks. your ui should not collapse, overflow horizontally, or produce awkward spacing when the text becomes extremely long. this type of paragraph commonly appears in newsletter intros, community messages, and deep write ups. verifying its behavior now will save you from unexpected layout issues later in production environments where user generated content appears.

---

## links with titles

[opensox homepage](https://opensox.ai "opensox official site")

---

## ending message

thanks for reading this giant formatting demo.
you can delete it after testing.

**the opensox team**

