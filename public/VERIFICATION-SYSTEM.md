# TIJCEF Official Document Verification

## What was added
- Public verification page: `/verify`
- WordPress plugin: `wordpress-plugin/tijcef-document-verification/`
- Verification by visible Document ID or a random 32-character token.
- Public results expose only: document ID, type, recipient/holder, issue date and status.

## Install the WordPress side
1. Zip the folder `wordpress-plugin/tijcef-document-verification`.
2. In the WordPress admin at `studio.tijcef.org`, go to Plugins > Add New > Upload Plugin.
3. Upload and activate it.
4. A new **Document Verification** menu appears.
5. Register each document, complete its fields, and Publish it.
6. Save once; the plugin creates a secure verification token and shows the permanent verification URL.

## Put QR codes on documents
Encode the generated URL shown in WordPress, e.g.:
`https://tijcef.org/verify?token=<secure-token>`

Keep the human-readable ID printed beside it, e.g. `TIJCEF/CV/2026/001`.

Recommended footer: `Document ID: TIJCEF/CV/2026/001 | Scan QR to verify authenticity | tijcef.org`

## Numbering convention
CV Volunteer Certificate; SID Staff ID; VID Volunteer ID; AP Appointment Letter; CT Training Certificate; PL Partnership Letter; OL Official Letter; EMP Employment Letter; RL Recommendation Letter; AL Appreciation Letter; AW Award; CP Participation Certificate; IC Internship Certificate; SC Service/Experience Certificate; MOU Memorandum/MOU; AU Authorization Letter; MC Membership Certificate; PD Project/Programme Document.

## Security notes
- Do not put private HR, address, phone, salary, identification numbers, or confidential letter content in public verification fields.
- If a record is no longer valid, change its Status to Revoked/Expired/Superseded rather than deleting it.
- Use the secure token in QR codes; keep the readable document ID for manual lookup.
