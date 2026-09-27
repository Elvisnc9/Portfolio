# Design reference — Elves OS portfolio

These are the approved mockups from the design canvas. Use them as the visual source of truth.
They are NOT production code: they use a design-tool format (`<x-dc>`, `{{c.xxx}}` placeholders,
`<sc-for>` loops). Read them for layout, sizes, spacing, colors and copy — then rebuild properly in Astro.

## Pages (desktop 1440px · iPad 834px · mobile 390px)
| File | Page |
|---|---|
| pages/Main.dc.html | Home — desktop |
| pages/Tablet.dc.html | Home — iPad |
| pages/Mobile.dc.html | Home — mobile |
| pages/MobileMenu.dc.html | Mobile full-screen menu |
| pages/About.dc.html · MobileAbout.dc.html | About (desktop · mobile) |
| pages/Notes.dc.html · MobileNotes.dc.html | Notes (desktop · mobile) |
| pages/Contact.dc.html · MobileContact.dc.html | Contact (desktop · mobile) |
| pages/Case.dc.html · MobileCase.dc.html | Case study template, Genspark AI (desktop · mobile) |

## Color placeholders used in Home files (light theme only)
{{c.bg}} #F4F2ED · {{c.surf}} #FFFFFF · {{c.surf2}} #EEEBE4 · {{c.line}} #DCD8CF
{{c.text}} #111110 · {{c.muted}} #5C5954 · {{c.grid}} rgba(17,17,16,.05) · grain opacity ~0.48, multiply

## Image references
The mockups load images as `/_blob/<id>`. Map them to these files:
| /_blob id | file |
|---|---|
| 0dbbe3cda8c8da6c8ddd5cabf0dba481 | images/portrait.webp (About page only, CSS grayscale) |
| d7b9e6b8c78c0082f8403afbd5cba156 | images/genspark1.webp |
| 964cc60930b489dc91e3a9d0e0b2386c | images/genspark2.webp |
| 8f3d75cadc09b4edb9ed4e1ee9bceeb2 | images/wealthfolio.webp |
| cfcb392e96c07de44c66fa13bd889cee | images/bitwyre.webp |
| b9818b78e90f0f23faa5f1e960e77dbd | images/kidemis.webp |
| 35e7d52a43fb654d72e79bb9a93e3822 | images/articos.webp |
| 1ec153793d3d10e277c25d259818c476 | images/matrimony.webp |
| fc079bc4fb638828c8a01a1800e5d184 | images/grain.png (tiled noise, 140px) |

## Placeholders still to fill (in brackets in the mockups)
Case study: [Your role], [Duration], [Team size], "What I did", one result, Genspark PM [Name].
Certificates: Learn KTS certificate name + year. Degree year (2025 vs 2026) to confirm.
