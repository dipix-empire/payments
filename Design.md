# DiPix Payment service design document

## User

User is an entity that represents a player.
It contains balance, invoices, current subscription

## Invoice

Invoice is an entity that represents a payment.
It contains amount, user, invoice status and update date.

Invoice status may be "created", "canceled" of "fulfilled"

## Plan

Plan is an entity that represent a pricing unit
It contains cost, codename, duration

## Subscription

Subscription is unit that represents actual subscription status.
It contains all members of subscription, separate link to owner,
current plan and promo(soon).

## Updater

Daily takes ALL subscriptions which expires soon, tries to update it or notifies user.
Then takes ALL subscriptions expired last day and tries to update it. If update fails, retries in next 3 days and blocks access with user notification. On success just creates new record. 