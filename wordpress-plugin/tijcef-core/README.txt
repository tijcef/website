=== TIJCEF Core ===
Contributors: tijcef
Requires at least: 6.4
Requires PHP: 7.4
Stable tag: 3.0.0

Headless content, grant verification, donation recording and publication-monitoring services for the TIJCEF website.

== Installation ==

1. Upload tijcef-core.zip under WordPress Plugins > Add New Plugin.
2. Activate TIJCEF Core.
3. Open Settings > Permalinks and click Save Changes.
4. Open Appearance > Menus and edit the automatically created "TIJCEF Primary" menu.
5. Publish Grant Hub opportunities only after verifying the official source URL.
6. Review daily publication discoveries under Media Tracker. Confirm the original source, tick the verification box and publish only genuine TIJCEF mentions.

The public frontend reads the menu hierarchy from:

https://studio.tijcef.org/wp-json/tijcef/v1/navigation

The plugin creates the backend-controlled menu, content categories, Grant Hub,
private submissions and an editor-reviewed Media Tracker. The tracker scans
Google News RSS daily for the exact organisation names, stores discoveries as
drafts and emails the WordPress administrator. It never auto-publishes.

Verified media records are available at:

https://studio.tijcef.org/wp-json/tijcef/v1/coverage

Successful Paystack verifications are stored once, by reference, as private
donation submissions. Keep TIJCEF_PAYSTACK_SECRET_KEY in wp-config.php only.
