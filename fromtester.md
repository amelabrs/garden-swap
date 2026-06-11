Garden Swap — Stage 2 Test Cases
Tester: Reshma Rajkumar
Date: _______________
Environment: https://garden-swap.onrender.com
Demo Login: priya@demo.com / demo1234

| ID | Feature | Steps | Expected Result | Pass/Fail | Notes |
|---|---|---|---|---|---|
| TC-01 | Login | Enter priya@demo.com / demo1234 and click Sign In | User is logged in, Sign Out button appears, + FAB visible | pass | Priya’s credentials did not work, I signed up with my own name
The next day when I tried to sign in with the previously created credentials, the sign in window does not close, however the view behind changes with sign out option. |
| TC-02 | View Feed | After login, check the feed view | 18 plant listings displayed with images, badges, distance | pass |  |
| TC-03 | Open Listing Detail | Click any plant card in the feed | Detail modal shows image, title, type, condition, distance, lister name | pass |  |
| TC-04 | Swap Button Visibility (own) | Open a listing you own (Priya's listing) | Request Swap button is HIDDEN, Delete button visible |  | Could not test as I have not logged in using Priya’s credentials |
| TC-05 | Swap Button Visibility (other) | Open a listing from another user | Request Swap button is VISIBLE | Pass |  |
| TC-06 | Open Swap Request Modal | Click 'Request Swap' on another user's listing | Swap request modal opens with offer type radio, plant select, message field | pass |  |
| TC-07 | Toggle Offer Type | Switch between 'Offer a plant' and 'Request as giveaway' | Plant select dropdown shows/hides based on selection | Pass |  |
| TC-08 | Submit Swap Request (trade) | Select 'Offer a plant', pick one of your plants, add message, submit | Success alert, redirected to Chats tab, swap appears |  | Could not as my plants could not be listed. Also I was unable to create a listing. It said ‘used not found’, although I was signed in |
| TC-09 | Submit Swap Request (giveaway) | Select 'Request as giveaway', add message, submit | Success alert, swap created without offered listing | fail |  |
| TC-10 | Chats Tab - List View | Click the 💬 Chats tab | All swap conversations listed with listing title, other party name, state badge | fail |  |
| TC-11 | Open Chat | Click a swap conversation in the Chats list | Chat modal opens with header, messages, action buttons | fail |  |
| TC-12 | Send Message | Type a message in chat input and press Enter or Send | Message appears in chat bubble (right-aligned, 'mine') | fail |  |
| TC-13 | Accept Swap (as lister) | Login as lister (priya@demo.com), open pending swap, click Accept | State changes to 'Accepted', confirm button appears |  |
| TC-14 | Decline Swap (as lister) | Login as lister, open a pending swap, click Decline | State changes to 'Declinqed', input area hidden |  |
| TC-15 | Confirm Handoff (first party) | In an accepted swap, click 'Confirm Handoff Complete' | Shows 'Waiting for other party to confirm…' |  |
| TC-16 | Confirm Handoff (second party) | Login as other party, open same swap, click Confirm | State changes to 'Completed', rate button appears |  |
| TC-17 | Rate Swap | Click 'Rate this swap', select stars, add comment, submit | Rating submitted, chat shows 'You rated this swap X ⭐' |  |
| TC-18 | Star Rating Selection | Click different star buttons in rating modal | Stars highlight cumulatively (1-5) |  |
| TC-19 | Cannot Rate Twice | Try to rate a swap already rated | No rate button shown, displays existing rating |  |
| TC-20 | Cannot Swap Own Listing | Try to request swap on your own listing | Request Swap button not visible |  |
| TC-21 | Unauthenticated - Chats Tab | Sign out, click Chats tab | Redirected to feed, login modal appears |  |
| TC-22 | Chat Message Display | Open a chat with multiple messages | Messages show sender name (theirs), timestamp, correct bubble alignment |  |
| TC-23 | Swap Request - No Plant Selected | Choose 'Offer a plant' but don't select one, submit | Alert: 'Please select a plant to offer' |  |
| TC-24 | Navigation Between Tabs | Click Feed → Chats → Profile → Feed | Correct view shown for each tab, active state on nav button |  |
| TC-25 | Listing Status After Accept | After a swap is accepted, check the listing in feed | Listing swap_status shows as pending/accepted (not available for new swaps) |  |

## Test Summary

| Total Test Cases | 25 |
|---|---|
| Passed |  |
| Failed |  |
| Blocked |  |

Tester Signature: _______________     Date: _______________