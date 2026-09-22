# Arena 2006 iPhone website review

Prepared September 22, 2026. This change is local and has not been published.
It does not change the game repository, SDK/account configuration, or App Store
Connect. No app build or purchase has been uploaded or submitted for review.

## Intended public URLs

- Marketing: https://www.variety.gifts/arena2006
- Privacy policy (Apple / AdMob URL): https://www.variety.gifts/privacy-policy
- Direct iPhone disclosure section: https://www.variety.gifts/privacy-policy#arena2006-ios
- Support: https://www.variety.gifts/contact/
- AdMob authorization: https://www.variety.gifts/app-ads.txt

The current live policy was the September 17, 2024 version when checked; live
`/app-ads.txt` returned 404. The prepared file adds only the publisher record
provided by the owner and confirmed in the phone repository:

```text
google.com, pub-8038077083732047, DIRECT, f08c47fec0942fa0
```

The supplied Arena 2006 PNG is used unchanged as the main artwork and social
preview. The desktop trailer is the owner's replacement video:
https://youtu.be/pIkLnhj5-uU?si=75mAQz2vaHc9LIVZ

## Product and implementation evidence

Read-only review of the `phone-build` checkout at
`/Users/hal/.codex/worktrees/phone-campaign/mtn`:

- `docs/monetization.md`: free download and Black Sand; one non-consumable US
  $4.99 base-price purchase for Arctic Terminal and Meridian Coast; localized
  price; unlimited owned attempts with no required ads; story gates remain.
- `native/ArenaCommerce/Sources/ArenaCommerce/Bridge.swift`: anonymous RevenueCat
  configuration, no custom identity/contact attributes, Apple purchase/restore,
  CustomerInfo entitlement authority and cache, optional rewarded ads,
  `loadAndTrack`, UMP request gating and privacy-options entry, no ATT request.
  Ads can preload after consent permits, including for owners; the policy does
  not equate optional ads or premium ownership with zero SDK processing.
- `native/ArenaCommerce/Package.resolved`: RevenueCat Purchases and RevenueCatAdMob
  5.90.2, Google Mobile Ads 13.10.0, UMP 3.1.0.
- `src/commerce.rs`, `src/campaign/save.rs`, `src/menu/settings.rs`: local campaign,
  settings and rewarded-pass files; pass activation/consumption and crash/load
  behavior. Purchase ownership is separate from local campaign data.
- `src/frontend/layout.rs`: the visible consent entry is named `Ad privacy`.
- Resolved Google Mobile Ads and UMP `PrivacyInfo.xcprivacy` manifests in
  `target/commerce-sdk/Build/Products/Release-iphoneos/`: SDK data declarations,
  including UMP coarse location, performance and product interaction.
- Resolved RevenueCat source `Sources/Ads/Events/Networking/AdEventsRequest.swift`:
  ad-event identifiers, timestamps, revenue/currency and app-user association.

The existing website source confirms Stripe checkout, Web3Forms contact
submissions, and Vercel Analytics. The website/shop section remains separate
from the iPhone disclosures. No specific retention period, audience designation,
blanket no-tracking claim, or in-app account deletion control has been invented.

## Official sources checked September 22, 2026

- [RevenueCat Apple App Privacy](https://www.revenuecat.com/docs/platform-resources/apple-platform-resources/apple-app-privacy): purchase history, analytics and app functionality; identity depends on integration.
- [RevenueCat customer identifiers](https://www.revenuecat.com/docs/customers/user-ids): default anonymous App User IDs and CustomerInfo.
- [RevenueCat AdMob adapter](https://www.revenuecat.com/docs/ad-monetization/admob): automatic load, impression, click, revenue, and failure events.
- [RevenueCat privacy information](https://www.revenuecat.com/privacy): end-user technical and transaction information; developer handles end-user requests.
- [Google iOS data disclosure](https://developers.google.com/admob/ios/data-disclosure): IP/coarse location, identifiers, ad interactions, crash/performance/diagnostic data.
- [Google UMP setup](https://developers.google.com/admob/ios/privacy): required messages, privacy options and ad-request gating.
- [Google partner-app information](https://policies.google.com/technologies/partner-sites): advertising, analytics, service improvement and fraud prevention.

These sources describe provider behavior; the policy narrows the description to
features found in this implementation. It does not assert that the public SDK
manifest alone determines Apple's final App Privacy answers.

## Verification

- `npm ci --no-audit --no-fund` installed the existing lockfile without changing it.
- `npx astro check`: 0 errors, 0 warnings (existing repository hints remain).
- `npx astro build --config astro.config-server.mjs`: passed. Existing adapter
  deprecation and local Node 24 / Vercel Node 22 runtime notices remain.
- Local HTTP checks: Arena page, policy, support, image and app-ads return 200;
  app-ads is `text/plain` and byte-for-byte matches the provided publisher file.
- Page checks: supplied artwork and trailer, Windows and Linux links, policy
  section anchors, and no App Store download link.
- Desktop and 390px phone browser inspection: readable page sections, uncropped
  artwork, working navigation, no horizontal overflow on Arena or policy.
- The existing hardcoded desktop fallback returned 404 for both clients. The
  public `latest.json` identified `d1719949f4f323cd33a18a119db8a92dbab71c3d`;
  HEAD requests for both ZIPs returned 200. The new fallback uses that revision.
  Browser manifest refresh is retained; failed refresh leaves usable links.

## Publication handoff

Review the prepared policy wording before publishing these changes to production.
This task has made no deployment or remote push. Once published, check all five
public URLs above and the image, then the game/account task can use the policy
URL in Apple and AdMob. That task owns consent-message configuration, device SDK
verification, and App Privacy answers. Keep the App Store upload/review hold.
