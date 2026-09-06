# Feature Inventory by System

## 1. Anime Database  
- **Titles & Synonyms:** All platforms list primary titles (Japanese and English) and alternative names. For example, AniList’s catalog boasts *“rich metadata including titles”* and supports multi-language titles. MyAnimeList (MAL) similarly shows Japanese, English and synonyms. AniDB and Kitsu provide alternate titles too. Anime-Planet and AniList allow searching by various titles.  
- **Descriptions:** Every platform includes a synopsis. AniList and MAL have detailed summaries; AniDB often includes lengthy plot notes. Anime-Planet and Kitsu also provide overview text. These are core features.  
- **Genres, Tags & Themes:** MAL, AniList, Kitsu and Anime-Planet all support assigned genres (e.g. Action, Comedy) and demographic labels (Shounen, Seinen). AniList and Anime-Planet additionally support flexible “tag” or “theme” systems (e.g. time travel, romance). In particular, AniList exposes a large tag system separate from genres. MAL has separate “Themes” and “Demographic” fields. AniDB uses a powerful tag-based filtering engine. Supporting multiple categorization schemas is common; none is entirely unique.  
- **Studios, Producers, Licensors:** MAL and Anime-Planet display production studios. AniList has a **studio directory** in its database. AniList/AniDB include licensors and producers; MAL lists producers and licensors on anime pages. Kitsu shows studio info but typically no license data. Anime-Planet shows studios but not all producers. These are expected fields on a serious database.  
- **Source Material:** All support noting source (Original, Manga, LN, Game, etc). AniList’s metadata explicitly includes *“source”* fields; MAL has a source field. AniDB and Kitsu likewise include source. This is core info (provided by each).  
- **Adaptations & Related Anime:** Each platform tracks relationships. AniList has a rich relation graph (prequels, sequels, side stories) built-in. AniDB provides a *Relation Graph* tool to visualize complex watch orders. MAL’s pages list related works (spin-offs, alternative versions). Anime-Planet includes a “similar anime” section, powered by decades of community recommendations. A unique AniDB feature is its graphical relation chart for series (e.g. Fate, Gundam).  
- **Episodes & Media:** All platforms record episode counts and types. MAL, AniList, Kitsu, AniDB and Anime-Planet all distinguish TV episodes vs specials/OVAs/ONAs/Movies. AniList’s *Media* entries include format (TV, Movie, OVA) with episode count. MAL’s anime pages list “Episodes: X + Y specials.” Kitsu and Anime-Planet likewise list OVA/Special counts. These are baseline features.  
- **Release Dates & Status:** MAL and AniList store start/end air dates (season start, etc.). AniList even has a weekly *AiringSchedule* API for upcoming episodes. MAL shows “Start date” and “End date” on anime pages. Anime-Planet lists the year/season in which each anime debuted. Seasonal classification (Spring, Summer, etc.) is present on AniList and Anime-Planet (Anime-Planet offers a seasonal chart). AniList’s API explicitly supports season/year queries. These are expected for any modern anime catalog.  
- **Rankings & Popularity:** MAL displays both a *Rank* (by score) and *Popularity* rank on each anime. AniList provides similar aggregated popularity metrics (number of users watching/complete) and “trends” via API. Anime-Planet does not provide an overall rank, but shows favorites count. All platforms have some measure of how popular a title is (MAL’s ranked lists, AniList’s “trending” charts).  
- **Statistics:** AniList offers advanced statistics (seasonal rankings, time-series trends) and user-specific stats (genre breakdown, watch time). MAL provides basic site-wide stats (members, favorites) on anime pages. Anime-Planet shows how many users have marked favorites. Any serious competitor should support at least basic popularity/score stats. AniList’s *MediaTrend* API and AniList’s genre breakdowns exemplify rich statistics.  
- **Recommendations:** Anime-Planet excels here: it has a large community-curated “if you liked X, try Y” network developed over 20+ years. AniList provides user-based suggestions via a “recommendation” API, and MAL shows user-submitted recommendations on anime pages. Kitsu’s recommendation system is minimal (no built-in rec engine). AniList/AniDB allow custom filtering to find similar shows (AniDB’s tag search can exclude unwanted genres). In short, Anime-Planet and AniList lead in discovery; MAL’s community recs are simpler, and Kitsu lacks a real rec engine.  
- **External Links & Streaming:** AniList explicitly lists legal streaming links (Crunchyroll, Netflix, Hulu, etc.) via its ExternalLinks collection – for example, AniList entries link to Crunchyroll pages. MAL does not show streaming sites on anime pages; users ask for this feature. Anime-Planet uniquely embeds licensed streams directly (e.g. via Crunchyroll/Hulu) – it *“offers more than 40,000 streaming episodes thanks to partnerships”*. Kitsu includes external database links (MAL, AniList, ANN) but not streaming. Crunchyroll/MyAnimeList integration exists separately, but MAL itself has no built-in “where to watch” info. The ability to show streaming availability (like AniList or Anime-Planet) is a differentiator.  
- **Content Warnings & Ratings:** MAL and Kitsu allow users to see explicit content tags (MAL has a “Content Warning” section on anime pages for violence, nudity, etc., and an official age rating like PG-13/R-17). AniList lets users tag series with similar warnings (e.g. NSFW tags). Anime-Planet shows parental guidance ratings. Content warning features are supported (MAL and AniList show them explicitly) but implementation quality varies. These are nowadays expected (for example, MAL’s content warning labels have been added in recent years).  

**Implementation differences:** AniList’s database and API emphasize flexible tags, external links, and stats. MAL’s pages focus on static info and community comments (character lists, staff, news threads). Kitsu is built on JSON:API and emphasizes user tracking (library entries, reactions). AniDB emphasizes in-depth tagging and relationships. Anime-Planet’s strength is its curated recommendations and streaming partnerships. Almost all features above are core (expected) features of a serious anime database; differences lie in breadth of metadata (AniDB) versus modern UI and external integration (AniList, Anime-Planet).

## 2. People & Industry Database  
- **Characters & Profiles:** AniList provides searchable **character directories** with voice actor (VA) credits. MAL has extensive character pages and VA listings for many shows (some users note MAL’s cast lists are more complete). AniDB also maintains character and seiyuu data. Kitsu and Anime-Planet list main characters and VA credits, though their coverage is usually less extensive. Character relationship info (who is related to whom) is best in AniList and AniDB, but far less in MAL or Kitsu.  
- **Voice Actors & Staff:** AniDB is renowned for detailed staff/VA information. AniList includes staff (directors, writers) in its schema, and has a staff directory. MAL lists key staff (director, writer) and all VAs on anime pages; its depth varies by title. Anime-Planet usually lists only main staff (no full VA credit list). Kitsu includes some staff info for major roles. The most *comprehensive* staff databases are AniDB and AniList; MAL is robust but sometimes incomplete, and anime-centric.  
- **Studios & Production Companies:** AniList’s studio directory is searchable. MAL and Kitsu list producing studios on anime pages. AniDB often names studios but also includes fan-group involvement. Anime-Planet lists studios. Directors and creators are indexed by name on AniList/AniDB, whereas MAL has static mentions.  
- **Character Relationships:** Few platforms fully capture character interrelations. AniList’s GraphQL supports associating characters with multiple roles in different anime, but no visualization. AniDB’s relation graph (mentioned above) can include character cameos as edges. MAL does not show character networks (only cast lists per show). This is an area where third-party wikis fill the gap.  

**Differences:** AniList and AniDB stand out with relational databases (staff/characters) and APIs for queries. MAL’s character/VA info is often more user-curated, while Kitsu/Anime-Planet have lighter coverage. In summary, a competitor should provide detailed staff and character profiles (as AniList/AniDB do) as core features.

## 3. Tracking (User Library)  
All platforms allow users to mark anime as **Watching/Completed/On Hold/Planned/Dropped**. They also let users track episodes seen and assign scores. Key features:  
- **Status and Progress:** MAL, AniList, Kitsu, Anime-Planet, and Simkl all support standard statuses (watching, completed, etc.) and manual episode count. AniList and MAL additionally have a “Rewatching” status and rewatch count. Manga/manga volumes are tracked by AniList, Kitsu, and Anime-Planet, but MAL separates anime/manga lists.  
- **Episode Progress:** AniList and Kitsu track episodes watched automatically; MAL users manually increment episodes. Simkl can auto-scrobble from streaming (unique to Simkl). AniList’s API allows progress updates; MAL requires manual entry.  
- **Custom Lists:** AniList allows arbitrarily named custom lists and sections (e.g. “Favorites”, “Advice”), while MAL limits lists (pro users can create >20 anime favorites). Kitsu has a “Library” but less customization. Anime-Planet has a single list of “Anime I’ve Watched/Plan”. Custom lists (tagging entries in any way) are a differentiator – AniList excels here with full custom lists, MAL offers simple “tags on list entries”, and Anime-Planet is fixed.  
- **Privacy & Sharing:** AniList lets each list or list entry be private/public. MAL’s list privacy is all-or-nothing (public profile or private). Users note wanting more granular privacy (e.g. “I can't set timeline private separate from list”). This is a pain point in AniList, whereas MAL simply lacks an episode-update feed.  
- **Scores & Ratings:** MAL uses a 1–10 scale (with 0.5 increments now) whereas AniList uses 1–100. Many users switched to AniList for finer scoring. Kitsu and Anime-Planet also use 5- or 10-point scales. Supporting multiple rating systems (stars, ten-point, percent) would match user expectations.  
- **Notes:** Kitsu uniquely allows per-entry user notes and “private notes”; AniList supports optional notes/comments on entries; MAL has no built-in notes (users sometimes put comments in forum). Providing a notes field on list entries is a desirable feature (used by Kitsu).  
- **Dates:** All platforms let users log start/end dates. MAL and AniList show these on the user profile. AniList additionally shows “date watched” for episodes.  
- **Tags/Filtering:** AniList users can add tags to list entries and then filter/sort by them (e.g. “action”, “re-watching”). MAL list tagging is more limited (an older feature rarely used). Kitsu allows filtering by status but has weak tagging. AniList’s filtering UI (genre, status, tags) is notably stronger.  
- **Bulk Editing:** AniList provides multi-edit controls (adjust scores, statuses in bulk). MAL lacks built-in bulk editing. Users often rely on third-party MAL tools (MALSync, scripts) for batch operations. Bulk import/export: MAL allows full XML export; AniList import from MAL or CSV, but lacks a native export (a cited user noted “MAL has native XML export; AniList doesn't”).  
- **History:** AniList and MAL show an activity feed (AniList’s “Timeline” vs MAL’s own forum threads per episode). AniList notifies followers of each episode watched (social feed). MAL’s “History” page logs list updates for the user. Kitsu’s activity feed was minimal. Providing a readable watch history is expected.  

**Summary:** Core tracking features (status, scores, progress) exist on all major platforms. AniList stands out for custom lists, filtering, and exports; MAL’s strengths include simplicity and built-in export (though MAL caps some features behind Pro). Unique tracking features in the wild include Simkl’s auto-scrobble and Kitsu’s entry notes, but most users expect at least MAL/AniList parity (mass edit, multi scoring, API access).

## 4. Discovery  
- **Search & Filters:** AniList and Kitsu offer advanced search (by genre, episodes, status, ratings). AniList’s GraphQL search can filter by season, tag, popularity, etc. MAL’s search is basic text/title. AniDB’s search is the most powerful (Boolean tag logic and exclusions, but its UI is complex). Anime-Planet has simple search plus the advanced *Wanna Watch* multi-filter (by genre, rating, etc). Most platforms let users sort lists by popularity or score. Filtering by exclusion (e.g. exclude ecchi) is only in AniDB as a user trick. Modern platform should include robust filtering.  
- **Trending/Popular/Top:** MAL has top anime (by score) and seasonal charts. AniList displays trending and top lists. Anime-Planet and Kitsu list “popular anime” by member count. Seasonal browsing: Anime-Planet provides seasonal charts and an upcoming calendar. AniList allows browsing by season/year and has AniChart integration. Kitsu lists current season and trending anime. Having a seasonal/upcoming page is expected (users often use external AniChart or LiveChart).  
- **Similar Anime:** AniList’s API supports finding related titles, but the site’s “Recommendations” list is user-submitted. Anime-Planet’s *“Similar Anime”* uses actual viewing histories (“built on actual community data”). MAL’s “Recommendations” section is also user-driven. Nobody’s system is perfect. Anime-Planet’s algorithm (driven by 20-year data) is often cited as better than MAL’s. A new platform would ideally offer both algorithmic and community recs.  
- **Personalized Recommendations:** AniList does not have a built-in “AI recommender” (it uses collaborative filter and popularity). MAL’s recs are also basic. Anime-Planet is strongest in recommendations (free form). Dedicated recommendation engines are lacking on all platforms – user demand for AI-driven suggestions is noted (see user complaints about lack of AI).  
- **Browsing by Theme/Mood:** Anime-Planet provides curated lists by theme. Kitsu and MAL have tag searches for specific interests. AniList has tag filtering. Offering mood-based or thematic browsing (e.g. “strong female lead”) is usually done on Anime-Planet via community lists. This is a *differentiator* but not universally available.  

**Weaknesses:** Users frequently cite poor discovery on MAL (no advanced filters, outdated interface). Even AniList is limited (some users want more AI recs). A competitor must offer at least as-good search/filters as AniList/Kitsu and better recs than MAL. Anime-Planet’s community-driven suggestion network is arguably superior to purely algorithmic recs.

## 5. Watch Order / Franchise Navigation  
This is a notorious weak spot on all platforms. Complex franchises (Fate, Gundam, etc.) have multiple movies, OVAs, alternate timelines. AniDB provides a *Relation Graph* for each title, making it easier to visualize watch order. No other mainstream tracker has an equivalent built-in. MAL and AniList list prequels/sequels linearly but give no order guidance. Anime-Planet has no special watch-order feature. Because of this gap, fans rely on external wikis or user-compiled guides. We found that **AniDB’s watch-order graph is essentially unique** and highly valued by its niche community. Any new platform should aim to at least track chronology relations (as AniList does) and ideally offer a consolidated “watch order” tool to solve this major pain point.

## 6. Watching Experience  
- **Streaming / Legal Availability:** As noted, only Anime-Planet embeds actual streams (Crunchyroll/Hulu). AniList/MAL provide links to official pages (AniList explicitly lists Crunchyroll/Netflix). Users often use Google or LiveChart to find where to watch. A platform could integrate with an API like JustWatch or use AniList’s external link data.  
- **Episode Release Tracking:** AniList shows countdown timers for next episode. MAL only notifies users when a *new season* launches, not each episode. App-based solutions (Simkl, Anime-Countdown) exist. A standout feature would be personalized episode notifications (like AniList offers and Simkl automates).  
- **Notifications:** AniList can push notifications for friend activity (customizable), whereas MAL lacks a modern notification system. One user notes “I wish MAL had something like AniList where it just tells you when a new episode is out”. Simkl (via malSync) can email alerts. Providing timely notifications (app or email) for episodes and releases would match user expectations.  
- **Watch History & “Continue Watching”:** AniList and MAL keep a history of watched episodes (AniList’s feed, MAL’s page history). Neither has a “resume playback” feature (since they don’t stream). Users rely on the page or app watchlists.  
- **Episode Discussion & Spoilers:** MAL’s longstanding feature is per-episode forum threads; AniList lacks this (most discussion is in larger group chats). MAL users prize these episode discussions. Platforms should consider either threaded discussions per episode or robust spoiler tagging. Currently, this often happens on MAL or on sites like Reddit.  
- **Additional QoL:** MAL shows opening/ending theme info; AniList does not. Some users value that (MAL has static lists of OP/ED songs on anime pages). AniList and Kitsu lack OP/ED listings. If budget allows, including OP/ED tracking is a differentiator for enthusiasts.  

**Summary:** AniList excels at schedule and countdowns, MAL provides rich episode discussions, and Anime-Planet gives streaming access. A competitor should aim to combine these: integrate streaming data and provide superior release/notification features. 

## 7. Social System  
- **Friends/Following:** AniList has a follow model and a feed of watched episodes/status updates (its “Friends” page). MAL has a *Friends* list and friends’ updates, but it’s minimal; most social happens via Clubs and Forums. Anime-Planet has limited social (no real follow system). Kitsu has follows and an activity feed. Support for following other users and seeing their activity is standard (AniList does it best).  
- **Activity Feeds:** AniList’s feed shows each episode a user logs. MAL does *not* have a real-time feed (only forum threads per episode). Kitsu had a news feed. Reddit and Discord are major hubs outside these platforms.  
- **Clubs/Groups:** MAL pioneered anime clubs/forums. It still has thousands of Clubs. AniList has “Collections” but no club system. Kitsu and Anime-Planet have no official clubs (though Anime-Planet has discussion threads). Communities often form on MAL or external (Discord). Clubs/groups remain valuable for fan communities (MAL does this well). A new platform might support communities or integrate with Discord/Reddit.  
- **Posts/Status Updates:** AniList allows free-form status updates and forum threads. MAL’s social focus is on club/forum posts and user reviews. Kitsu had “posts” (like an old Facebook wall) for statuses. Offering a microblog or status feature (like AniList) is a plus, but not essential if clubs/forums exist.  
- **Likes/Comments/Replies:** MAL allows comments on clubs/forums and recommendations. AniList now has message boards and comments. Kitsu has “reactions” on reviews. Modern platforms should have comment/reply and like features for reviews or posts.  
- **Direct Messaging:** None of these sites emphasize DMs (some have internal mail, e.g. MAL’s *Messages*). Not usually a differentiator.  
- **Profile Sharing:** Users on AniList/MAL often share lists or recommendations. AniList has an “export to Markdown” feature for lists and forums. Sharing (e.g. list linking) is easy on all sites.  
- **Custom Profiles:** All allow avatar and some stats. AniList and Kitsu let you set a display banner. AniList has badges/achievements. MAL has customizable list categories. Profile personalization is a nice-to-have (AniList’s UI is cleaner).  

**Usage vs Existing:** AniList’s social feed is widely used and praised. MAL users often use clubs/forums. Kitsu’s social tools saw little use (hence its stagnation). The key lesson: provide a functional social feed (as AniList does) and/or vibrant group spaces (like MAL’s clubs). Many users juggle MAL/Discord; building a good community UX is valuable.

## 8. User Profiles & Identity  
- **Profile Pages:** All have them. AniList and Kitsu profiles highlight stats (total watched, etc). MAL’s profile is simpler (username, favorites, badges). AniList profiles display “Favorites,” “About Me,” and stats (e.g. total anime, avg score). MAL includes “About” text and favorites but clutters with adverts. A new platform needs at least a clean profile with customizable bio, avatar, favorites.  
- **Customization:** AniList supports banner images and selected favorite characters/series. Kitsu and MAL allow avatars and “profile pictures.” AniList’s cleaner look is favored. Profile theming (colors, etc.) is minimal on all sites except user-controlled via CSS. Not critical, but at least avatar/banner upload is expected.  
- **Favorites and Stats:** All show favorite anime/manga on profiles. AniList shows watch stats (genre breakdown, time), which MAL lacks. Users enjoy seeing “total episodes watched” and similar stats (AniList and Simkl offer these). Including a stats summary (either general or user-specific) encourages engagement. AniList’s robust stats page is a best-practice example.  
- **Privacy & Badges:** AniList has badges (for milestones), MAL has “Anime Hits / News” tags on profile. Privacy settings for profile/list are important (some users want anonymity). AniList allows hiding profile; MAL’s profiles are public by default.  
- **Themes & More:** Achievements or badges (like AniList has for contributions) encourage activity. MAL shows how long a user has had a Pro account etc. 
   
Key insight: Users love analytics and flair. AniList’s profile-driven stats and badge system stand out. MAL’s “history and badges” are more static. A competitor should offer profile stats summary and reputation signals.

## 9. Reviews & Opinions  
- **User Reviews:** MAL and Anime-Planet have long-form user reviews with upvotes. AniList also has text reviews (although user adoption is lower). Kitsu’s “reactions” are shorter posts rather than formal reviews.  
- **Episode-level Reviews:** MAL uniquely allows commenting on each episode in threads. AniList/Kitsu do not. Many users still go to MAL for episode discussions.  
- **Ratings:** All platforms support numeric ratings (see Tracking).  
- **Spoiler Controls:** MAL’s review/comment fields have spoiler tags. AniList also supports marking spoilers in forums. Kitsu did not have advanced spoiler tooling. Ensuring users can hide spoilers in reviews/comments is expected.  
- **Helpful Voting:** MAL and Anime-Planet allow marking a review as helpful or saving it. AniList reviews can be liked. Encouraging review quality via voting is standard.  
- **Moderation:** Large sites like MAL moderate reviews (MAL allows users to report/edit). AniList has community flags.  
   
Most existing platforms support basic reviews/ratings. MAL’s advantage is episode-level threads, and Anime-Planet’s moderated, thoughtful community reviews. AniList’s review feature is more modern (e.g. allowing Markdown) but less used. A new site should include a review section and basic spoiler/like controls.

## 10. Statistics & Personal Analytics  
- **Aggregate Stats:** AniList excels here. Its *“Statistics”* dashboard shows total episodes watched, total time spent, score distribution, and genre preferences. MAL’s equivalent (the “Statistics” page) is far simpler. None of the others match AniList’s depth by default.  
- **Genre Preferences:** AniList infers preferences from lists. MAL does not. Third-party tools exist to pull MAL/AniList data for custom charts. We note that users *care* about seeing their own stats – AniList’s detailed analytics keep users engaged.  
- **Completion Rate:** AniList can compute completion percentages (given episodes completed vs total). MAL used to show “Completed/Watching” counts but not percentage.  
- **Seasonal Habits:** AniList offers seasonal breakdown (e.g. “most-watched season”). MAL has no such feature out-of-the-box. Anime-Planet provides “AnimeIQ” (similar to Netflix “IQ” for taste), but it’s just genre breakdown.  
- **Third-Party Tools:** Many exist (e.g. *MyAnimeList Listalytics*, *Anilist-stats*) because native stats are lacking on MAL and moderate on AniList. We conclude: robust personal analytics (like AniList’s) are a differentiator.  
   
Citing [48]: *“AniList is the most popular MAL alternative… and a stats page shows your watch time, genre breakdowns, score distributions, and seasonal summaries in a format MAL’s stats page never managed.”*. That highlights user demand. 

## 11. Community Moderation  
All platforms must handle user moderation at scale:  
- **Reporting:** MAL and AniList allow reporting posts/reviews/users. Anime-Planet has a tight-knit staff. Kitsu also had a report system.  
- **Blocking/Muting:** AniList supports blocking users. MAL’s block is limited to forum messages.  
- **Moderation Tools:** MAL (owned by Cygames) has professional staff and volunteer mods managing content (spam, spoilers). AniList relies on community moderators and bot oversight.  
- **Spam & Abuse:** Most sites use CAPTCHAs on sign-up, some rate-limit posts, etc. AniList has an auto-moderation for hateful content (per guidelines). MAL historically struggled during rapid growth.  
- **Trust Systems:** AniList uses a “trust” or reputation tier (new users can’t post in forums until enough entries). MAL has no formal trust levels.  
- **Community Guidelines:** Each has rules; a new platform needs clear policy (AniList has extensive submission guidelines).  

In short, modern moderation infrastructure (user reporting, trust levels, bot-detection) is required for a serious site. Lessons: open guidelines and trusted-user systems (from AniList) can mitigate abuse.

## 12. Data Contribution System  
- **Content Addition:** MAL, AniList and AniDB allow user submissions for new titles. AniList has a public addition/edit form (crowdsourced with moderators). MAL historically relied on insiders, but now allows suggestions (updated only by staff). AniDB lets users propose and vote on tags and info. Anime-Planet is editorially curated (staff add anime, though community can suggest). Kitsu is (or was) open-source with community PRs.  
- **Editing & Approval:** AniList uses moderators to review edits. AniDB has a complex system for tag/vote approval. MAL’s contributions are handled by admins (limited contributors). Kitsu’s code being open means data edits are via GitHub PRs.  
- **Change History:** AniList keeps changelogs. AniDB has versioned releases. MAL has no public edit history.  
- **Permissions:** AniList grants trusted ranks to experienced editors. AniDB is volunteer-run with a core team. MAL does not expose contributor identity.  
- **Quality Control:** AniList and AniDB have checks to prevent duplicates. MAL had many duplicates in the past; AniList links to MAL IDs for alignment.  
   
Core expectation: the platform needs a robust wiki-style contribution system (like AniList/AniDB) if it plans community-curated data. Closed editorial curation (like Anime-Planet) yields higher quality but lower scale. AniList’s model (crowd submissions + mods) is proven.  

## 13. API / Developer Ecosystem  
- **Public API:** AniList provides a public GraphQL API used by many apps. Kitsu offers a JSON:API (APIary docs exist). MAL’s official REST API (v2 with OAuth) exists, but had high barriers to entry. Anime-Planet has no public API (private alternatives like Anakin.io scrape it). AniDB has an XMLRPC API (but no well-known public docs). Simkl has an API as well.  
- **Authentication:** AniList uses OAuth. MAL v2 uses OAuth2 (tokens). Kitsu uses OAuth2. A new platform should provide OAuth for login and secure token-based API access.  
- **Rate Limits:** AniList’s policy is fairly generous for non-commercial use; MAL’s API rate limits are modest.  
- **Data Access:** AniList’s API includes nearly all site data (lists, activity, anime data). MAL’s API is more restrictive (some endpoints are private). A competitor should have an open API (as user demand shows integration is valued).  
- **Webhooks & SDKs:** AniList has community SDKs (JS, Python, etc). MAL/Anime-Planet lack official SDKs (some community projects exist).  
- **Import/Export:** MAL’s XML export is widely used; AniList supports importing MAL lists easily (XML to GraphQL). Simkl can sync to others. Future site should allow easy migration (API importers or file uploads).  

Given the thriving third-party ecosystem around AniList/MAL, an open API is strategically crucial. Indeed AniList’s success is partly due to its API and integrations.  

## 14. Administration & Operations  
A new platform at scale needs robust admin tools:  
- **User Management:** Admins need to view/manage users (ban, warn, check trust level).  
- **Content Moderation Queue:** Must handle reported content (forums, reviews, messages).  
- **Data Editing:** Admin interfaces for editing anime/character data (like MAL’s back-end tools or AniList’s internal CMS).  
- **Contributor Roles:** Ability to assign roles (editor, moderator).  
- **Audit Logs:** Track changes to database entries for rollback.  
- **Analytics:** Site-wide usage stats (traffic, activity levels).  
- **Feature Flags:** Toggle features or beta-test.  
- **Notifications/Announcements:** Admin broadcast system for news.  
- **API Monitoring:** Logging and rate-limit control (prevent abuse).  
- **Security:** CAPTCHA, IP bans, etc.  
- **Email Management:** For signups, notifications.  

These are largely backend needs, but worth noting: AniList and MAL have dedicated admin teams. A new site should plan at least a minimal admin panel for content and user management. (No direct citations needed, this is standard practice.)

# Part 2 – Platform Profiles

### MyAnimeList (MAL)  
**Strengths:** Largest userbase and dataset; extremely comprehensive info on anime (detailed cast lists, themes, related media, etc.). Extensive community content: episode discussion threads, news, reviews, clubs. Robust anime/manga entries including producers and licensors. MAL’s export feature and XML data dump facilitates integrations. Historically a “time capsule” where virtually every known anime is catalogued. Many users like its straightforward desktop layout.  
**Weaknesses:** Outdated UI/UX (flashy adverts, cramped layout) and notoriously poor official mobile apps. Lack of advanced list features (bulk edits, flexible privacy). No built-in per-episode notifications (only season alerts). Limited search/filtering. Social features (feeds) are weak. MAL went down unexpectedly in past (users complain of unreliability). Many features (like favorites lists beyond a small limit) require paid upgrade. Premium monetization turning off some users (e.g. favorites cap).  
**Why Users Choose It:** Universality (every anime is there), depth of information (VAs, staff, theme songs), and active community (forum/clubs). Familiarity and longevity – “it’s what I started with and I don’t really have issues with it”. Also, official endorsement: it’s a household name (Kodansha/Shueisha involvement gives confidence). Its “export to XML” is a convenience for power users. Some prefer its old-school consistency (no constant redesign).  
**Why Users Leave/Use Alternatives:** Frustration with MAL’s dated interface and app performance. When downtime or bugs occur, users jump to AniList or Kitsu. Lack of features present elsewhere (like AniList’s 100-point ratings or tag search) push users away. Some hate ads or data caps. The need to switch to get better UI or free features (AniList has no paid tier) is common.  
**Unique Features:** Fansub info (used to have dedicated section), very detailed anime pages (MAL often has more voice actors than AniList), official manga/anime tracking and news feed, and one of the only anime club infrastructures. MAL’s webcomics wiki and news are extras other platforms lack.  
**Lessons for Anikawa:** Copy MAL’s rich data depth (especially staff/VA detail), community forums/clubs, and export functionality. Avoid MAL’s pitfalls: build a modern, responsive UI; ensure reliable uptime; make an excellent mobile app or PWA; keep core features free (avoid heavy paywalls); and add per-episode notifications and advanced search. Emphasize MAL’s strengths (data, reviews) while improving usability and engagement.

### AniList  
**Strengths:** Modern, clean interface designed for usability. Powerful public GraphQL API – virtually everything on the site is queryable, fostering a rich developer ecosystem and third-party apps. Flexible tracking features: 100-point rating, custom lists, tag filters, privacy controls. Strong social feed and mobile-friendly design. Comprehensive seasonal charts and notifications for upcoming episodes (the “AniList calendar”). Detailed analytics for users (time watched, genre breakdown). Completely free with no locked features.  
**Weaknesses:** Smaller userbase than MAL, so less “content” (fewer user-written reviews, smaller club community). Anime/manga only (no live-action, music). Slightly less detail in database for obscure works (users note AniList entries sometimes lack minor staff or subtitling credits that MAL has). Originally lacked review moderation, though it now supports it. Some find AniList’s “timeline” privacy too rigid (must hide all or none). No first-party mobile app (must use community apps). Gaps: no streaming embeds, no built-in episode forums (though it recently added discussion boards).  
**Why Users Choose It:** Superior UX and UI. The clean design and filtering tools make tracking pleasant (“it looks and feels more modern”). It’s free and open (no premium cap). The API and many unofficial apps allow users to track on mobile or third-party interfaces. AniList’s stats and trend charts attract data-savvy users. Also, AniList integrates English/Japanese titles easily (one user switched for English title support).  
**Why Users Leave/Use Alternatives:** Some miss MAL’s data depth (especially full voice actor lists and broadcast info). AniList’s smaller community means fewer active clubs/forums, so users sometimes stay on MAL for interactions. Certain custom features (e.g. MAL’s alphabetical list sections) are absent. If AniList ever has downtime or restrictive privacy, users fall back to MAL.  
**Unique Features:** AniList’s API is uniquely deep, and it pioneered 100-point ratings. It supports massive customizability (multiple score formats, tags, lists). Its personal analytics and notification system (episode countdowns) are also differentiators.  
**Lessons for Anikawa:** Emulate AniList’s clean design, strong API-first approach, and flexible tracking (custom lists, tags). Incorporate its analytics and social feed ideas. But also avoid missing MAL’s data: ensure staff and detailed info are fully supported. Strive for AniList’s freedom (no paywalls) and third-party compatibility. Recognize that AniList succeeded partly by having volunteer devs; Anikawa should aim for sustained development and official apps.

### AniDB  
**Strengths:** Unparalleled data depth. AniDB is an *“Anime DataBase”* in the purest sense – it catalogs CJK animation across every imaginable detail. Users praise its exhaustive staff/VA listings, broadcast dates, fansub group credits, and highly customizable tag-based search. Unique search power: users can include/exclude multiple tags to find niche content (e.g. “Original anime with romance but no harem or ecchi”). AniDB’s Relation Graph feature explicitly helps with complicated watch orders. The database is community-driven with rich metadata (opening/ending themes, sequel info, etc.) and a loyal, specialist user base.  
**Weaknesses:** Extremely outdated UI (menus in frames, Java in the past) that many find “clunky”. High learning curve: casual users rarely want to navigate its complexity. No social/community features beyond data (no easy lists or forums). Doesn’t support manga. No mobile app. The interface hasn’t modernized much. Also, AniDB content can be duplicated/fragmented (multiple “release” entries). It’s niche (mostly Japanese CJK anime, less emphasis on Western or OEL content).  
**Why Users Choose It:** When they *need* facts that no one else provides – e.g. complete VA lists or obscure broadcast data. AniDB’s tag search is preferred by power users (one noted *“AniDB’s search engine and tag system are more powerful than any others”*). It’s often used as a research tool, not a tracker (one said “I use it to learn detailed info about an anime’s staff”). Those frustrated by MAL/AniList’s limited filters also turn to AniDB.  
**Why Users Leave/Use Alternatives:** Most prefer the usability of AniList or MAL. As one user said: *“If only it didn’t have such an awful user experience. It has tons of info but browsing is a pain.”*. AniDB’s community is small and technical, so many casual fans never discover it. They use AniDB alongside another tracker if they need the data, but rarely *only* AniDB.  
**Unique Features:** Its advanced tagging and search (including exclusions), and its Graph relation for watch order, are unique. It allows tracking by “release group” (fansub). AniDB has nearly every anime variant catalogued.  
**Lessons for Anikawa:** Build in deep metadata and search (even if UI is modern). Consider offering an advanced search with tag exclusion like AniDB for power users. Include something like a visual relation graph for franchises. But pair this with an intuitive interface, so data depth doesn’t scare off casual users.

### Kitsu  
**Strengths:** Originally praised for its **modern, mobile-friendly design** and JSON:API backend. It supports anime/manga tracking and has good basics (statuses, ratings, reviews). It offers per-entry notes and episode-level updates, with comment sections on each anime and episode. Kitsu also includes manga/manhwa (with a larger manga DB than MAL, including OEL titles). Its **expandable record model (JSONAPI)** was attractive to developers.  
**Weaknesses:** Kitsu’s development slowed drastically. By 2025–2026 it is “effectively inactive”. The apps have been removed from stores, the web version is often buggy or outdated. Many features requested years ago remain unimplemented. Users have reported fatal login issues (Facebook login removal left some locked out). Its database still lags behind competitors (less comprehensive anime info). Socially, its forums were never very active.  
**Why Users Choose It:** In its heyday, some chose Kitsu for its “appealing, modern design” and as an open-source alternative. Kitsu’s expansive manga and manhwa coverage (including untranslated manhwa) drew some. Users who value note-taking and the idea of an open community (volunteer devs) were attracted.  
**Why Users Leave/Use Alternatives:** Almost all evidence shows users migrating away. Frequent downtime and lack of updates drove many to AniList or back to MAL. The mobile apps becoming unavailable and persistent bugs are cited. People gave up on it, with comments like “I stopped using it years ago when it straight up stopped working”. The consensus is: don’t start on Kitsu now – go to AniList instead.  
**Unique Features:** Kitsu’s open-source codebase was unique (MIT-licensed) and it once supported custom statuses (“private journals”). The concept of “Reactions” in place of formal reviews was unique design. However, none of these features have drawn sustained engagement.  
**Lessons for Anikawa:** Kitsu shows the pitfalls of underfunded projects: even a great design fails without active maintenance. For Anikawa, ensure long-term commitment (paid devs ideally) and plan mobile support from day one. A social design must be resilient; as users noted, a good-looking site means little if critical tracking features break.

### Anime-Planet  
**Strengths:** Strong community recommendations and **official streaming integration**. It claims partnerships with Crunchyroll, Hulu, Viki to embed thousands of episodes. Its recommendation network is arguably its greatest asset: *“built on actual viewing history”* over 20+ years. Anime-Planet recommends “similar anime” based on real user taste, not just genre matching. Seasonal charts and editorial lists (e.g. genre/character tags) are user-friendly. The site focuses on discovery: when users ask “what should I watch next?”, Anime-Planet often has an answer. It has a well-moderated, constructive review environment.  
**Weaknesses:** The design is fairly old and somewhat clunky compared to AniList; mobile experience is less polished. It has limited tracking capabilities (no custom lists; only a basic watchlist). No social feed or clubs. The anime database, while large, is slightly smaller than MAL’s. Search and sorting are not as flexible. The streaming is only as good as partner catalogs.  
**Why Users Choose It:** For discovery. Users who feel “lost after finishing a show” praise Anime-Planet’s recommendations: *“If you finish a show and have no idea what to watch next, Anime-Planet’s recommendation engine is stronger than MAL’s and competitive with AniList’s.”*. Also, being able to watch episodes directly through the site is a draw. Its editorial content (rankings, articles) attracts viewers. It’s 100% free and ad-friendly (no paywall).  
**Why Users Leave/Use Alternatives:** Some want more sophisticated trackers or social features. The lack of a user timeline or notifications, and its dated UI, drive users back to AniList or MAL after they find a few shows. List management is minimal, so heavy trackers must use another site too. However, few abandon it completely: they might use it for recs and streams while tracking elsewhere.  
**Unique Features:** The integrated video player via Crunchyroll/Hulu links is unique. The large network of user-curated recommendations (“Anime-Planet will recommend similar shows based on series you’ve enjoyed”) is also unique. The fact that it’s official (Crunchyroll partnership) ensures legal streaming.  
**Lessons for Anikawa:** Take Anime-Planet’s discovery engine as inspiration: crowd-sourced similar-anime graphs and editor-curated lists are valuable. Official streaming partnerships can differentiate (if feasible). However, don’t emulate the outdated UI – maintain a modern design. Expand community features to avoid the sense that Anime-Planet is “just a web portal.”

### Simkl  
**Strengths:** Cross-media tracking. Simkl began as a TV/movies tracker and added anime seamlessly. It uniquely offers **automatic scrobbling** from major streaming services (Crunchyroll, Netflix, Plex, etc.), so episodes watched are logged without manual input. It gives one dashboard for anime, movies, and TV, which is ideal for general media fans. Clean, minimalist interface and a mobile app are positives. Simkl’s calendar and notifications (via email/app) are solid.  
**Weaknesses:** The anime database is smaller than MAL/AniList and often misses niche titles. Tracking features are simpler (no custom lists, few social features). No community or forums. Some social stats (favorite characters/series) are less developed. It’s free, but premium adds advanced filtering. Social adoption by anime fans is low (they use it in conjunction with AniList/MAL, not as a primary site).  
**Why Users Choose It:** If someone watches a lot of anime on streaming platforms and wants to track everything automatically, Simkl is a draw. Also, users who want a unified watchlist across media (anime + TV + movies) appreciate it. It’s often cited when MAL/Crunchyroll integration is needed. The “AnimeCountdown” companion app extends its utility.  
**Why Users Leave/Use Alternatives:** Anime-focused users may find Simkl’s anime info lacking. Serious anime fans still maintain lists on AniList/MAL in parallel. Simkl’s social features are minimal, so it doesn’t replace an anime-centric community. Users often sync Simkl with an account elsewhere (MAL or AniList) rather than switch fully.  
**Unique Features:** Auto-scrobbling from legit streaming services is rare. Combined tracking of all entertainment media is unique (competing with non-anime trackers like Trakt).  
**Lessons for Anikawa:** Auto-update from streaming (via user authorizations or APIs) can greatly reduce user friction, so consider similar integrations. But ensure your anime DB can support such features. Also, being broad-media may not be our focus, but understanding cross-domain needs (books, music) could inform future expansion.

### Others (Bangumi, Shikimori, Annict, etc.)  
- **Shikimori (Russia):** Sleek interface, Russian community. Notably strong on stats (achievements, weekly tracker) and seasonal charts. Lacks English support.  
- **Bangumi (China/Japan):** Very detailed metadata (Chinese site linked with AniDB/AniList data). Good tracking of Chinese donghua.  
- **Annict (Japan):** Focused on per-episode logs and crowdsourced airing charts.  
- **Track.ma:** Minimalist open-source tracker with tag-based stats.  
- **AnimeTrakr:** A mobile-centric tracker syncing with MAL/AniList (rather than independent).  
- **Anime-Countdown:** Focused solely on episode release alerts (no tracking).  

These niche sites each address specific needs. For example, Shikimori offers heavy stat gamification (badges) for those users, Bangumi excels at Chinese-translated anime coverage, and Anime-Countdown nails alerts. Anikawa should monitor them but focus on broad features.

# Part 3 – Multi-Platform User Problems

Serious anime fans typically use a **toolchain of specialized sites** because no single platform covers all jobs. Recurring workflows include:

- **Tracking vs Information:** Many use one site for **tracking** and another for **info**. Example: *“I use MAL as a time capsule to read episode discussions, news, recommendations and reviews. AniList to track what I watch because it has nicer UI/UX”*. Or *“I use MAL if I want to look up info about an anime (especially OPs and EDs) and see discussion, but I use AniList to track my own anime”*. In practice, a user might track episodes on AniList but go to MAL or AniDB to lookup cast, licensor, or watch order.

- **Discover vs Track:** Anime-Planet (or MAL) for *“What should I watch next?”* versus AniList for list maintenance. Users cite Anime-Planet’s superior recommendations when “I finish a show and have no idea what to watch next”, yet still keep lists elsewhere. MAL’s recommendations and MAL-based apps (e.g. MAL-down) co-exist with AniList tracking.

- **Notifications/Calendar:** AniList for airing countdowns and notifications; MAL for official news threads. Users lament *“I really wish MAL had something like AniList where it just tells you when a new episode is out”*. They often use external LiveChart/Anime-Countdown apps alongside their tracker. 

- **Export/Backup:** MAL’s native XML export is used to move data. One user notes AniList lacks an export, so often they export MAL or use MALSync. Fans sometimes keep spreadsheets (Lotus-Vale in [64]) or secondary tools to avoid losing data.

- **Cross-Media Tracking:** Fans of multiple media use MAL/AniList for anime, Goodreads for books, Letterboxd for movies. The desire for one-stop tracking is unmet: *“I can track everything from anime, American shows to K-dramas in one place”* (one user notes preferring IMDb over separate anime sites). 

- **Watch Orders:** Complex series drive people off-site. Many use AniDB’s relation graph or fan wikis to get watch orders (see [56]). No tracker provides a clear “watch order” list, so fans juggle MAL/AniList plus external resources. The absence of watch-order workflows on MAL/AniList forces use of third-party sites or older threads.

- **Advanced Search/Filtering:** Users might track on AniList/MAL but search on AniDB for fine-grained filters (exclude tags, source). One user: *“AniDB's search engine and tag system are more powerful... great if I want to find shows with narrow criteria”*. This drives switching when seeking very specific anime (e.g. “original romance anime, no harem”).

- **Social vs Anonymity:** Some keep a public list on AniList (for social discovery) but use MAL privately or vice versa. Multi-account usage is reported: “I do use both at the same time (mainly in case something happens to one)”. They may follow friends on one site but maintain personal records on another.

- **Statistics:** Data geeks use AniList’s analytics or third-party sites (like AniList Chart or Stylr) to study habits, while casual fans ignore it. Others export MAL data to generate custom charts (e.g. an annual “Top 10 anime by watch-time”). 

- **Platform Niche:** Non-English speakers use Bangumi/Shikimori alongside. English speakers overlook these. Multi-language fans need multiple trackers.

**Ranked Jobs (importance):** 
1. *Tracking Anime & Manga:* Everyone needs a list tracker (AniList/MAL).
2. *Finding Next Anime:* Discovery (Anime-Planet/MAL).
3. *Managing Watch Schedule:* Episode tracking/notifications (AniList/Kitsu/Simkl).
4. *Anime Information:* Metadata lookup (MAL/AniDB).
5. *Watch Order Navigation:* Franchise chronology (AniDB/wiki).
6. *List Backup & Portability:* Data export (MAL/AniList).
7. *User Stats & Insights:* Personal analytics (AniList).
8. *Community Interaction:* Social feed, discussion (AniList/MAL/Discord).
9. *Streaming Availability:* Where to watch (Crunchyroll search/Anime-Planet).
10. *Cross-Media Tracking:* Unified library (Simkl/Achriom).

Fans frequently hop between sites to perform these jobs, since no platform covers all (e.g., track on AniList but research on AniDB or MAL).

# Part 4 – User Pain Database

Below is a sampling of common pain points from forums and discussions (each scored 1–10):

| **Problem**                                 | **Evidence & Demand**                          | **Platforms Affected**    | **Existing Solutions**                             | **Why Insufficient**                         | **Pain** | **Switch Potential** | **Recurring Use Impact** |
|---------------------------------------------|------------------------------------------------|--------------------------|---------------------------------------------------|---------------------------------------------|---------|---------------------|--------------------------|
| Outdated UI / poor usability                | Users repeatedly cite MAL’s “2000s feel”, request redesign | MAL                       | AniList alternative; user scripts (Stylus)        | Workarounds only; core site lags behind    | 10      | 9                   | 7                        |
| Slow/buggy official mobile app             | Complaints about MAL app; Kitsu apps gone | MAL, Kitsu                | Third-party apps (MALClient, Glass)               | Some features missing; not official        | 8       | 8                   | 6                        |
| Lack of streaming info (where to watch)     | Users ask for legal streaming links on MAL, many use Crunchyroll manually | MAL, AniList (partial)    | AniList shows some links; Outside sites (LiveChart) | MAL has none; manual search burdensome     | 8       | 7                   | 7                        |
| No per-episode notifications on MAL         | “wish MAL told you when new episode is out” | MAL                       | AniList’s built-in countdown; AnimeCountdown app | MAL’s forum threads only; no push alerts   | 8       | 7                   | 8                        |
| Fragmented watch orders (complex series)    | AniDB’s relation graph used to fix confusion | All (MAL, AniList lack solution) | Third-party wikis (AniDB graph, MAL forums)       | No integrated feature; manual effort      | 9       | 6                   | 6                        |
| Limited list export/import options          | Users export MAL XML; note AniList lacks export | AniList (no native), MAL (limited) | Community tools (malsync, Jikan)                 | Leads to using multiple accounts or loss of data | 7       | 7                   | 9                        |
| Clunky search / tag filtering              | “AniDB’s search engine more powerful...” | MAL, AniList, Kitsu      | AniDB tag search; custom scripts                  | Casual users don’t use AniDB; basic search only | 7       | 5                   | 4                        |
| MAL server downtime / reliability          | MAL outages push users to alternatives | MAL, Kitsu (inactive)     | Use secondary site (AniList)                      | Inconvenient; fear of data lock-out        | 6       | 5                   | 5                        |
| Incomplete data on some titles            | AniList lacks minor info MAL has | AniList                  | MAL or AniDB                                        | Users juggle multiple sources             | 6       | 4                   | 5                        |
| MAL Premium paywall for favorites         | “MAL makes you pay to add >20 favorites” | MAL                       | AniList offers unlimited favorites                | Frustrating limit                           | 5       | 4                   | 3                        |
| Privacy granularity (per-list)             | AniList only global private mode | AniList                  | Keep profile private entirely                     | Users want partially public lists         | 4       | 3                   | 4                        |
| No built-in bulk edit for lists           | Users mention needing MALSync | MAL, Anime-Planet        | Manual update; third-party apps                   | Tedious when updating many shows          | 6       | 4                   | 7                        |
| Lacking AI-driven recommendations         | Users demand “AI” recs | All                       | Algorithmic recs (AniList col-filter, AP data)   | Current rec is generic (“X-watched also Y”)| 5       | 3                   | 5                        |
| No anime-wide friends feed (MAL)          | MAL has no real feed; users use clubs     | MAL                       | AniList timeline; Discord channels                | Social tracking scattered outside         | 4       | 3                   | 3                        |
| Language/title confusion                   | MAL default to JP titles bothered some | MAL                       | AniList allows EN list names      | Small annoyance; easy workaround         | 3       | 2                   | 1                        |
| Limited tag usage (MAL has few)            | “AniList’s tag system” praised | MAL                       | Tagging on AniList; MAL’s synonyms               | Restricts custom organization             | 4       | 4                   | 4                        |

**Top 10 Switch-Worthy Problems:** (biggest drivers to create an account)  
1. **Outdated UI/UX** (MAL’s old design) – high frustration, drives users to AniList or new sites.  
2. **No per-episode notifications** (MAL) – AniList’s countdown is cited as “way nicer”.  
3. **Poor mobile support** (MAL/Kitsu apps) – many rely on third-party apps; official apps needed.  
4. **Fragmented watch order** – AniDB helps, but lack in main sites forces external wiki use. A built-in solution would be compelling.  
5. **Poor search filters** (MAL/AniList) – power users want AniDB-level search, or tag exclusion.  
6. **Lock-in/out concerns** – MAL’s downtime/investment risk (fall-back to AniList).  
7. **Lack of streaming links** – community wants quick watch location (AniList partly solves this).  
8. **List data portability** – need to easily migrate data; AniList’s lack of export hurts new adopters.  
9. **Paywalled features** – (favorites cap on MAL) pushes users to free alternatives like AniList.  
10. **Limited recommendations** – desire better suggestion engine (Anime-Planet excels here).

**Top 10 Retention Problems:** (encourage repeat visits)  
1. **Advanced tracking features:** Bulk-edit, custom lists, tags – users return to manage large libraries (AniList’s filtering, AniDB’s search).  
2. **Rich analytics:** Viewing personal stats (AniList style) keeps users engaged in the dashboard.  
3. **Social feed/activity:** Updates on friends’ watches/incoming notifications. AniList’s feed is a frequent draw.  
4. **Community interaction:** Clubs/forums make users revisit (MAL retains through forums).  
5. **Streaming integration:** Embedded videos or links can bring users back for viewing sessions.  
6. **Upcoming anime calendar:** Checking new season info (AniList/Kitsu schedule) is a daily habit.  
7. **Episode discussions:** Fans return to comment after watching each episode (MAL’s thread system).  
8. **Reviews/voting:** Contributing reviews or voting “helpful” on others’ reviews.  
9. **Personal lists customization:** Updating watch counts, tagging episodes (especially for long-running shows).  
10. **Badges/achievements:** AniList’s badges and MAL’s news contributions encourage returning for new milestones.  

**High-Risk / Hard Problems:**  
1. **AI-driven recommendations:** Highly desired (users ask for “personalized recommendation engine”) but AI complexity and training data access make this hard.  
2. **Global streaming integration:** Licensing complexities and API access (although Crunchyroll partnership as Anime-Planet did is huge investment).  
3. **Real-time episode notifications:** Building a reliable push system with global schedules is tough (requires constant calendar scraping).  
4. **Complex watch order solver:** Algorithmically determining optimal watch order (beyond AniDB’s manual graph) is non-trivial.  
5. **Cross-media AI librarian:** As with Achriom’s vision, reasoning across books/films is a lofty goal, likely beyond MVP.

# Part 5 – Feature Parity Matrix

Legend: ✓ = fully supported, ◐ = partially supported, ✗ = not supported, ★ = exceptionally well-supported.

| **Feature/System**                | MAL          | AniList      | AniDB       | Kitsu        | Anime-Planet | Simkl  | Anikawa (goal) |
|-----------------------------------|--------------|--------------|-------------|--------------|--------------|--------|---------------|
| **Database & Metadata**           |              |              |             |              |              |        |               |
| Titles (JP/EN/synonyms)           | ✓ (JP/EN/syn) | ✓ (multi)    | ✓           | ✓ (JP/EN)    | ✓            | ✓      | ✓             |
| Genre/Demographic/Theme           | ✓ (fixed gen) | ✓ (gen+tags) | ✓ (tags)    | ✓ (fixed)    | ✓            | ✓      | ✓             |
| Tags/Content Tags                 | ◐ (themes only)| ✓ (extensive)| ✓ (extensive)| ✗ (minimal)  | ✓            | ✗      | ✓             |
| Studios/Producers/Licensors       | ✓/✓/✓          | ✓/✗/✗        | ✓/✓/✓       | ✓/✗/✗        | ✓/?/✗        | ✓/✗/✗ | ✓/✓/✓         |
| Episodes/Specials/OVA/Movie count | ✓            | ✓            | ✓           | ✓            | ✓            | ✓      | ✓             |
| Release Dates & Airing Info       | ✓ (dates only)| ✓ (dates+airing sched) | ✓ (aired) | ✓            | ◐ (year only)| ✓      | ✓             |
| Seasonal Classification           | ✓ (year only)| ✓ (season+year) | ◐ (year)   | ✓ (seasonal)| ✓ (seasonal)| ✓      | ✓             |
| Rankings / Popularity             | ✓/✓          | ✓/✓          | ◐           | ◐/✗         | ✗/✓         | ✗/✓   | ✓/✓           |
| External Links (Wiki, ANN, etc.)  | ✓            | ✓            | ✓           | ✓            | ✗            | ✗      | ✓             |
| Streaming Availability Links      | ✗            | ✓★           | ✗           | ✗            | ✓★ (embedded)| ✗      | ✓             |
| Watch Order (chronology tools)    | ✗ (list only)| ◐ (relations)| ✓★ (graph)  | ✗            | ✗            | ✗      | ✓             |
| **Tracking**                      |              |              |             |              |              |        |               |
| Statuses (Watching/Completed/…)   | ✓            | ✓            | ✗           | ✓            | ✓            | ✓      | ✓             |
| Episode Progress (auto)           | ✗ (manual)   | ✓            | ✗           | ✗            | ✗            | ✓★     | ✓             |
| Multiple Lists / Custom Lists     | ◐ (fav only) | ✓★           | ✗           | ✓ (limited)  | ✗ (one list) | ✗      | ✓★            |
| Private/Shared Lists              | ◐ (all-or-none) | ✓          | ✗           | ✓            | ✓            | ✓      | ✓             |
| Notes per entry                   | ✗            | ◐ (comment)  | ✗           | ✓            | ✓            | ✗      | ✓             |
| Date Started/Finished             | ✓            | ✓            | ✗           | ✓            | ✓            | ✓      | ✓             |
| Rewatch Count                     | ✓            | ✓            | ✗           | ✗            | ✗            | ✗      | ✓             |
| Scoring (flexible)                | ◐ (1–10)     | ✓★ (1–100)   | ✗           | ✓ (1–10)     | ✓ (1–10)     | ✓      | ✓             |
| Tagging List Entries              | ✗            | ✓            | ✗           | ✗            | ✗            | ✗      | ✓             |
| List Filtering/Sorting            | ✓            | ✓★           | ◐           | ◐            | ✗            | ✓      | ✓★            |
| Bulk Edit                         | ✗            | ✓            | ✗           | ✗            | ✗            | ✓      | ✓             |
| Import/Export                     | XML export ✓ | CSV import ◐/No export | API only ✗| API only ✗   | ✗            | ✓ (some) | ✓            |
| History / Activity Feed           | ◐ (log page) | ✓            | ✗           | ✗            | ✗            | ✗      | ✓             |
| **Discovery**                     |              |              |             |              |              |        |               |
| Search (incl. advanced)           | ✗            | ✓★           | ✓ (tag search)| ✓ (JSONAPI) | ✓            | ✗      | ✓★            |
| Filters (genre, score, etc.)      | ◐            | ✓★           | ✓★          | ✓            | ✗            | ✗      | ✓★            |
| Seasonal/Upcoming Lists           | ✓            | ✓            | ✗           | ✓            | ✓            | ✗      | ✓             |
| Trending/Popular Charts           | ✓ (popularity)| ✓ (trending) | ✗           | ✓ (top)      | ✗            | ✗      | ✓             |
| Similar/“If you like” suggestions | ✗ (manual rec)| ◐ (recommend API)| ✗        | ✗            | ✓★           | ✗      | ✓             |
| Personalized Rec Engine           | ✗ (alg low)  | ◐ (alg)      | ✗           | ✗            | ✓ (community) | ✗      | TBD           |
| Mood/Theme Browsing               | ✗            | ✗            | ✗           | ✗            | ✗            | ✗      | ◐            |
| **Social**                        |              |              |             |              |              |        |               |
| Following/Friends                 | ◐ (friends)  | ✓            | ✗           | ✓            | ✗            | ✗      | ✓             |
| Activity Feed (friend updates)    | ✗            | ✓            | ✗           | ✗            | ✗            | ✗      | ✓             |
| Posts/Status Updates              | ✗            | ✓            | ✗           | ✓ (posts)    | ✗            | ✗      | ✓             |
| Comments/Threads                  | ✓ (forums)   | ✓ (forums)   | ✗           | ✗            | ✗ (reviews)  | ✗      | ✓             |
| Clubs/Groups                      | ✓            | ✗            | ✗           | ✗            | ✗            | ✗      | ✓             |
| Likes/Votes                       | ✓            | ✓            | ✗           | ✓            | ✓            | ✗      | ✓             |
| Direct Messaging                  | ✗ (messages) | ✗            | ✗           | ✗            | ✗            | ✗      | ?             |
| **Profiles/Identity**             |              |              |             |              |              |        |               |
| Avatar/Banner/Bio                 | ✓            | ✓            | ✓           | ✓            | ✓            | ✓      | ✓             |
| Favorite Anime/Character Display  | ✓            | ✓            | ✗           | ✓            | ✓            | ✓      | ✓             |
| Stats Display (time, breakdown)   | ✗ (minimal)  | ✓★           | ✗           | ✗            | ✗            | ✓      | ✓★            |
| Privacy Controls                  | ✗ (all/none) | ✓            | ✗           | ✓            | ✗            | ✗      | ✓             |
| Badges/Achievements               | ◐ (basic)    | ✓            | ✗           | ✗            | ✗            | ✗      | ✓             |
| **Reviews**                       |              |              |             |              |              |        |               |
| User Reviews on Anime             | ✓            | ✓            | ✗           | ✗ (reactions)| ✓            | ✗      | ✓             |
| Episode Reviews/Comments          | ✓            | ✗            | ✗           | ✗            | ✗            | ✗      | ✓             |
| Ratings (numeric)                 | ✓            | ✓            | ✗           | ✓            | ✓            | ✓      | ✓             |
| Spoiler Tagging                   | ✓            | ✓            | ✗           | ✗            | ✓            | ✗      | ✓             |
| Helpful Voting                    | ✓            | ✓            | ✗           | ✗            | ✓            | ✗      | ✓             |
| **Stats/Analytics**               |              |              |             |              |              |        |               |
| Total Watch Time                  | ✗            | ✓            | ✗           | ✗            | ✗            | ✓      | ✓             |
| Genre Breakdown                   | ✗            | ✓            | ✗           | ✗            | ✓            | ✓      | ✓             |
| Score Distribution                | ✗            | ✓            | ✗           | ✗            | ✗            | ✗      | ✓             |
| Completion Rate                   | ✗            | ✓            | ✗           | ✗            | ✗            | ✓      | ✓             |
| Seasonal/Yearly Stats            | ✗            | ✓            | ✗           | ✗            | ✗            | ✗      | ✓             |
| **Moderation & Contribution**     |              |              |             |              |              |        |               |
| User Reporting/Blocking           | ✓            | ✓            | ✗           | ✓            | ✓            | ✓      | ✓             |
| Edit/Submissions Workflow        | ✗ (captive)  | ✓            | ✓           | ✓            | ✗ (edit)    | ✗      | ✓             |

_Key differences noted_:
- MAL is weakest in advanced tracking/discovery (red in Bulk Edit, Export) and in social feeds. MAL is strongest in having a complete anime DB (top rows all ✓). AniList is strong across tracking and social, but lacks anime streaming. AniDB stands out in advanced search. Kitsu lacks many features (API and basic tracking only). Anime-Planet is unique on streaming and community recommendations. Simkl’s checkmarks reflect its focus (auto-tracking, cross-media, calendar). 

Anikawa’s goal column indicates the aim to cover all core features (✓) and distinguish in recommended/differentiating features (★), while missing only low-demand items (like built-in direct messaging which is rarely needed).

# Part 6 – Anikawa’s Baseline Roadmap

**TIER 1 – Required for Credibility:**  
Features an anime tracker user *expects* immediately:  
- Comprehensive anime/manga database (titles, synopsis, full metadata, relations).  
- Full tracking system: statuses (watching, completed, etc.), episode counts, custom scores, basic personal stats.  
- User profiles with avatars, “favorite” tags, and list export/import (MAL XML import + CSV export).  
- Search by title, basic filters (genre, status).  
- Import from MAL/AniList (onboard existing users).  
- Social basics: follow other users, basic activity feed.  
- Responsive UI (desktop+mobile), no paywalls on core functions.  
- Crunchyroll/Hulu streaming links (from AniList model).  
- Watchlist notifications (at least season releases).  
- API access (even v1), at least read-only, to allow third-party support.  

**TIER 2 – High-Value Improvements:**  
Problems that strongly differentiate product:  
- Modern, intuitive design to fix MAL’s UI pain.  
- Episode-level notifications and calendar (surpassing MAL’s limitation).  
- Advanced search/filters (including tag exclusion like AniDB).  
- Robust recommendations: algorithmic “similar anime” and user-curated recs (like Anime-Planet).  
- Bulk list editing and tagging tools (improves retention) – MAL users desperately need this.  
- Detailed personal analytics (time watched, genre breakdown) as AniList has.  
- Watch order assistance (embedding AniDB-like relation charts or curated lists).  
- Content warnings/age rating clarity (MAL has them, keep up to date).  

**TIER 3 – Potential Differentiators:**  
Features to explore if validated by demand:  
- AI-driven recommendations (RAG or ML; exciting but unproven).  
- Cross-media tracking (books, games) à la Achriom (ambitious, maybe future stretch).  
- Native streaming embedding (like Crunchyroll episodes) beyond links (hard legally).  
- Enhanced social: real-time chat, better mobile push notifications for friends.  
- Gamification (achievements, badges beyond basics).  
- Markdown-enabled reviews/forums for rich content.  

**TIER 4 – Do Not Build Yet:**  
Not critical given current demand or too complex:  
- In-app video playback (requires legal content deals).  
- Machine translation of anime info (scope creep).  
- VR/AR features (novel but niche).  
- Blockchain or NFT-related gamification (likely low demand, controversial).  
- Anything requiring partnership before critical mass (e.g. official content licensing).  

# Part 7 – 5-Day AI Build Strategy

## MVP/V1 Scope (“Build Immediately”):  
- **Core Database & Tracking**: Implement anime/manga pages, user list with statuses, score system, watch progress. Basic fields: titles, synopsis, genres, episodes, season info.  
- **User Accounts & Profiles**: Signup/login (OAuth?), profiles, avatars, favorites. List import (MAL/XML).  
- **UI/UX Framework**: Frontend scaffolding – responsive design, dark mode optional. Basic pages: Home (feed), Search, Anime Detail, User Profile, List View.  
- **API Foundation**: GraphQL or REST for core data (authenticate with OAuth2). Enables rapid frontend building and later third-party use.  
- **Basic Social Features**: Follow system, activity feed (friends’ updates). Simple comments on anime/reviews.  
- **Search & Browse**: Title search, genre filter, seasonal list.  
- **Notifications**: Simple email/onsite notification for new season airing.  

These give a functional anime tracker.  

## Reuse Existing Services/Software:  
1. **Authentication**: Use a managed OAuth solution or Firebase Auth. _Recommendation:_ Use a service (Auth0, Firebase Auth). Avoid building from scratch due to security concerns.  
2. **Search**: For complex filters, use an open-source search engine (e.g. Elasticsearch or Algolia). Given time constraints, initially integrate an open source filter library or use database indexing.  
3. **Comment Moderation**: Leverage existing open-source tools (e.g. Discourse-like engines or Flutter’s `profanity-filter`). Use simple flag/report system first.  
4. **Spam Prevention**: Use CAPTCHA (reCAPTCHA) for sign-up/comments.  
5. **Rate Limiting & Security**: Use middleware libraries (e.g. express-rate-limit) or managed API gateways.  
6. **Image Hosting**: Use a CDN or cloud service (e.g. Cloudflare Images, AWS S3). Do not store images on-prem.  
7. **Email**: Use SendGrid/Mailgun for transactional emails (verification, notifications).  
8. **Analytics**: Integrate Google Analytics/Matomo, plus monitoring (Sentry).  
9. **Error Monitoring**: Sentry or equivalent from day one.  
10. **Feature Flags**: A simple library (Flagsmith or open-source). Possibly postpone until needed.  
11. **Contributor Interface**: Initially skip complex admin tools; use a basic admin panel template (e.g. Strapi, but custom maybe better).  
12. **Discord Integration**: Use bots or webhooks for community announcements if needed.  

For each:  
- **Auth:** Use Firebase Auth or Auth0 (managed) – low effort, secure, supports OAuth2.  
- **Search:** Use Algolia (SaaS) or Elastic (open source). If 5 days, consider simple DB LIKE searches first.  
- **Comments/Moderation:** Leverage open-source commenting (utterances, or include Discourse embed) OR quick build with existing UI libs.  
- **Images/Static:** Use a managed bucket + CDN (AWS S3 + CloudFront, or Firebase Storage).  
- **Email/Notifications:** Use SendGrid (free tier) for email, push notifications can wait (use email reminders).  
- **Analytics:** Google Analytics (easy embed).  
- **Feature Flags/DevOps:** Skip advanced until post-MVP.  

## Parallel AI Tasks (Workstreams):  
1. **Database & API Setup:**  
   - **Scope:** Design DB schema (anime, users, lists), implement core GraphQL/REST endpoints.  
   - **Dependencies:** None initially (foundation).  
   - **Files/Systems:** DB migrations, GraphQL schema, core resolvers.  
   - **Independent:** Yes, critical path.  
   - **Priority:** 1.  

2. **Frontend – Core UI:**  
   - **Scope:** Build React (or other) UI components for search, anime page, list page, profile.  
   - **Dependencies:** API.  
   - **Files:** Components (SearchBar, AnimeDetail, ListView, ProfilePage). Styles and routing.  
   - **Independent:** Somewhat (but will integrate with backend).  
   - **Priority:** 1.  

3. **Authentication & User Management:**  
   - **Scope:** Set up auth (login/register), user session, profile editing.  
   - **Deps:** Database (user tables), Auth service.  
   - **Files:** Auth handlers, user controllers, UI for login.  
   - **Independent:** Yes, separate from anime data.  
   - **Priority:** 1.  

4. **Tracking Logic:**  
   - **Scope:** Implement user list features: adding/removing anime to/from list, updating status, score, episodes.  
   - **Deps:** Users, Anime DB.  
   - **Files:** ListEntry model, mutations/resolvers, list UI.  
   - **Independent:** Requires both DB and UI.  
   - **Priority:** 1.  

5. **Search & Filters UI:**  
   - **Scope:** UI for filtering anime (genre dropdown, sort options).  
   - **Deps:** Database (genres), Backend search endpoints.  
   - **Files:** UI components, queries.  
   - **Independent:** Follows DB/API.  
   - **Priority:** 2.  

6. **Anime-Planet Style Recommendations:**  
   - **Scope:** Build “Similar Anime” box using tag/genre overlap or a simple CF-based suggestion.  
   - **Deps:** Requires initial data on anime relations.  
   - **Files:** Recommendation engine code (maybe naïve at first).  
   - **Independent:** Could start from existing tags.  
   - **Priority:** 3 (if time).  

7. **Notifications/Calendar:**  
   - **Scope:** Basic “Upcoming Episodes” calendar (maybe static for first season).  
   - **Deps:** Airing schedule data, time.  
   - **Files:** UI component, maybe backend job.  
   - **Independent:** Might fetch from public schedule API (livechart).  
   - **Priority:** 3 (if time).  

8. **Stats & Analytics Dashboard:**  
   - **Scope:** Aggregate user stats page (total episodes, watch time).  
   - **Deps:** List tracking data.  
   - **Files:** Stats computation (backend), dashboard UI.  
   - **Independent:** Last, optional for V1.  
   - **Priority:** 4.  

9. **Admin Panel:**  
   - **Scope:** Basic tool to edit anime entries and moderate user content.  
   - **Deps:** All data models.  
   - **Files:** Admin UI + secured routes.  
   - **Independent:** Parallel to DB tasks.  
   - **Priority:** 4.  

10. **API & Developer Documentation:**  
    - **Scope:** Generate API docs and quickstart.  
    - **Deps:** API completed.  
    - **Files:** Documentation site.  
    - **Independent:** Once API stable.  
    - **Priority:** 5.  

Tasks 1–4 can run in parallel (database/API and core UI). Others can overlap as dependencies complete. Each stream should have its own files/modules to minimize merge conflicts. For example, “frontend” can work on React components while “backend” builds resolvers. UI and API teams coordinate contracts (schema definitions). DevOps (auth, DB) is separate.  

**Tools:** Likely React/Vue front-end, Node/Python backend, PostgreSQL DB, GraphQL or REST API, Redis/Socket.io for live notifications (later). Use modular repo structure to allow independent branches merging.

# Executive Summary

- **Must-Haves (Tier 1):** Comprehensive anime/manga database (titles, metadata, relations) and user tracking (all standard statuses, episode counts, scores, notes). A modern, responsive UI (desktop & mobile) with search, filters, and a reliable ranking/popularity view. Social features at least to follow users and share updates. Secure login (OAuth2) and import from MAL. Hosting licensed streaming links to episodes (via Crunchyroll/Hulu) is essential for finding content. Must match MAL/AniList on core data fields and UX smoothness.  

- **High-Value Improvements:** Solve MAL’s weaknesses: add per-episode notifications and countdowns, introduce advanced list management (bulk edit, custom lists, fine-grained filtering), and provide powerful search (tag exclusions like AniDB). Build out a strong recommendation engine (leveraging community data like Anime-Planet). Enhance analytics for users (e.g. total watch time, genre breakdown). Offer flexible privacy settings. Ensure excellent mobile app or PWA, avoiding MAL’s app pitfalls.  

- **Postpone Features:** Advanced AI recs, fully automated cross-media (books/music) tracking, native video streaming. These excite users but carry technical/legal risk. Also, extensive gamification or blockchain gimmicks are premature. Focus on nailing core tracking/discovery first.  

- **Top Opportunities:**  
  1. **Modern UI/UX** – fix the biggest user complaint (MAL’s dated design) to attract those frustrated with incumbents.  
  2. **Integrated Streaming Links** – provide “where to watch” info directly on anime pages (like AniList, better than nothing).  
  3. **Advanced Search & Filters** – implement AniDB-like tag search to wow power users.  
  4. **Personalized Notifications** – deliver episode alerts and reminders (areas where MAL/AniList lag).  
  5. **Rich Personal Analytics** – give users an AniList-caliber stats page to keep them returning.  
  6. **One-Click Data Import** – allow easy migration from MAL/AniList to lower the barrier to try Anikawa.  
  7. **Community Recommendations** – leverage crowdsourced “similar anime” (as Anime-Planet does) to compete on discovery.  
  8. **Deep Staff/Character Info** – ensure database rivals AniDB for detail (addressing MAL vs AniList gap).  
  9. **Watch Order Assistance** – implement a visual relation graph for complex series (unique value-add).  
  10. **Robust API** – from day one, offer an open API for integrations (following AniList’s success).  

These opportunities (especially UI/UX, notifications, search, analytics) align with clear user demands and would make Anikawa compelling. Anikawa should deliver MAL/AniList parity *plus* these innovations to be taken seriously by the community. The five-day AI-driven MVP should target tier-1 features first, enabling rapid user feedback.

