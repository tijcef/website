=== TIJCEF Core ===
Contributors: tijcef
Requires at least: 6.4
Requires PHP: 7.4
Stable tag: 2.2.0

Headless content services for the TIJCEF website.

== Installation ==

1. Upload tijcef-core.zip under WordPress Plugins > Add New Plugin.
2. Activate TIJCEF Core.
3. Open Settings > Permalinks and click Save Changes.
4. Open Appearance > Menus and edit the automatically created "TIJCEF Primary" menu.
5. Publish Grant Hub opportunities under the new Grant Hub admin menu.

The public frontend reads the menu hierarchy from:

https://studio.tijcef.org/wp-json/tijcef/v1/navigation

The plugin creates the complete backend-controlled menu, content categories,
Grant Hub opportunity types and public website services.
