---
title: Webhooks Overview
source: https://developer.ordergroove.com/reference/webhooks-overview
converted_from: html
---

# Webhooks Overview

JUMP TO

## Ordergroove RestRPC

*   [Introduction](/reference/introduction)
*   [URLs](/reference/urls)
*   [Authentication](/reference/authentication)
*   [API Rate Limits](/reference/ordergroove-api-rate-limits)
*   [API Pagination](/reference/pagination)
*   [Webhooks Overview](/reference/webhooks-overview)
    *   [Events and Payloads](/reference/events-and-payloads)
        *   [Item Events](/reference/webhooks-item-events)
        *   [Order Events](/reference/webhooks-order-events)
        *   [Subscription Events](/reference/webhook-subscription-events)
        *   [Subscriber Events](/reference/webhooks-subscriber-events)
    *   [Troubleshooting Webhooks](/reference/troubleshooting-webhooks)
    *   [Configuring Your Server for Ordergroove Webhooks](/reference/configuring-your-server-for-ordergroove-webhooks)

## Subscriptions

*   [Listget
    
    ](/reference/subscriptions-list)
*   [Retrieveget
    
    ](/reference/subscriptions-retrieve)
*   [Cancelpatch
    
    ](/reference/subscriptions-cancel)
*   [Change Quantitypatch
    
    ](/reference/subscriptions-change-quantity)
*   [Change Shipping Addresspatch
    
    ](/reference/subscriptions-change-shipping-address)
*   [Change Paymentpatch
    
    ](/reference/subscriptions-change-payment)
*   [Change Email Reminderpatch
    
    ](/reference/subscriptions-change-email-reminder)
*   [Change Frequencypatch
    
    ](/reference/subscriptions-change-frequency)
*   [Reactivatepatch
    
    ](/reference/subscriptions-reactivate)
*   [Updatepatch
    
    ](/reference/subscriptions-update)
*   [Create in Orderpost
    
    ](/reference/subscriptions-create-in-order)
*   [Create From Itempost
    
    ](/reference/subscriptions-create-from-item)
*   [Change Productpatch
    
    ](/reference/subscriptions-change-product)
*   [Change Next Order Datepatch
    
    ](/reference/change-next-order-date)
*   [Retrieve Rotating Ordinal Subscription Contextget
    
    ](/reference/retrieve-ordinal-subscription-context)
*   [Set Subscription Ordinal for Rotating Productpatch
    
    ](/reference/set-subscription-ordinal-for-rotation-product)
*   [Prepaid subscriptions](/reference/prepaid-subscriptions)
    *   [Update Prepaid Subscriptionpatch
        
        ](/reference/update-prepaid-subscription-context)
    *   [Change Prepaid Renewal Behaviorpatch
        
        ](/reference/change-prepaid-subscription-renewal-behavior)
    *   [Upgrade Subscription To Prepaidpatch
        
        ](/reference/upgrade-to-prepaid-subscription)
*   [Bundle Components](/reference/bundle-components)
    *   [Retrieve Componentget
        
        ](/reference/retrieve-component)
    *   [Update Componentspost
        
        ](/reference/update-components)

## Orders

*   [Order Status Codes](/reference/order-status-codes)
*   [Listget
    
    ](/reference/orders-list)
*   [Retrieveget
    
    ](/reference/orders-retrieve)
*   [Cancelpatch
    
    ](/reference/orders-cancel)
*   [Send Nowpatch
    
    ](/reference/orders-send-now)
*   [Change Shipping Addresspatch
    
    ](/reference/orders-change-shipping-address)
*   [Change Paymentpatch
    
    ](/reference/orders-change-payment)
*   [Change Place Datepatch
    
    ](/reference/orders-change-place-date)
*   [Updatepatch
    
    ](/reference/orders-update)
*   [Skip Subscriptionpatch
    
    ](/reference/skip-subscription)
*   [Finalize processing Orderpatch
    
    ](/reference/finalize-processing-order)

## Items

*   [Listget
    
    ](/reference/items-list)
*   [Retrieveget
    
    ](/reference/items-retrieve)
*   [Change Quantitypatch
    
    ](/reference/items-change-quantity)
*   [Change Pricepatch
    
    ](/reference/items-change-price)
*   [Createpost
    
    ](/reference/items-create)
*   [Create in Orderpost
    
    ](/reference/items-create-in-order)
*   [Deletedel
    
    ](/reference/items-delete)
*   [Updatepatch
    
    ](/reference/items-update)
*   [Product Changepatch
    
    ](/reference/product-change)

## Customers

*   [Listget
    
    ](/reference/customers-list)
*   [Retrieveget
    
    ](/reference/customers-retrieve)
*   [Createpost
    
    ](/reference/customers-create)
*   [Updatepatch
    
    ](/reference/update)
*   [Set Contact Detailspatch
    
    ](/reference/customers-set-contact-details)

## Merchant

*   [List Cancellation Reasonsget
    
    ](/reference/list-cancellation-reasons)

## Addresses

*   [Listget
    
    ](/reference/addresses-list)
*   [Retrieveget
    
    ](/reference/addresses-retrieve)
*   [Createpost
    
    ](/reference/addresses-create)
*   [Updatepatch
    
    ](/reference/addresses-update)
*   [Use address for allpost
    
    ](/reference/use-address-for-all)

## Payments

*   [Credit Card Types](/reference/credit-card-types)
*   [Listget
    
    ](/reference/payments-list)
*   [Retrieveget
    
    ](/reference/payments-retrieve)
*   [Createpost
    
    ](/reference/payments-create)
*   [Updatepatch
    
    ](/reference/payments-update)
*   [Use payment for allpost
    
    ](/reference/use-payment-for-all)

## Products

*   [Listget
    
    ](/reference/products-list)
*   [Retrieveget
    
    ](/reference/products-retrieve)
*   [Group Checkget
    
    ](/reference/products-group-check)
*   [Relationshipsget
    
    ](/reference/product-relationships)
*   [Updatepatch
    
    ](/reference/products-update)
*   [Bulk Createpost
    
    ](/reference/bulk-create)
*   [Bulk Updatepatch
    
    ](/reference/bulk-update)
*   [Time-Window Rotating Product](/reference/rotating-product)
    *   [Manage Time-Window Rotating Productpost
        
        ](/reference/manage-time-window-rotating-product)
*   [Ordinal Rotating Product](/reference/ordinal-based-rotating-product)
    *   [Manage Ordinal Rotating Productpost
        
        ](/reference/manage-ordinal-rotating-product)
*   [Retrieve Rotating Delivery Productget
    
    ](/reference/rotating-products)
*   [Manage Digital Plan Productpost
    
    ](/reference/manage-digital-plan-product)

## PRODUCT GROUPS

*   [Listget
    
    ](/reference/product-groups-list)
*   [Createpost
    
    ](/reference/product-groups-create)
*   [Updatepatch
    
    ](/reference/product-groups-update)

## RESOURCES

*   [Listget
    
    ](/reference/resource-list)
*   [Retrieveget
    
    ](/reference/resource-retrieve)
*   [Createpost
    
    ](/reference/resource-create)
*   [Updatepatch
    
    ](/reference/resource-update)

## Offer Profile

*   [Listget
    
    ](/reference/offer-profile-list)

## One Time Incentives

*   [Listget
    
    ](/reference/otd-list)
*   [Retrieveget
    
    ](/reference/otd-retrieve)
*   [Createpost
    
    ](/reference/otd-create)
*   [Updatepatch
    
    ](/reference/otd-update)
*   [Deletedel
    
    ](/reference/otd-delete)

## 1-click actions

*   [1-Click Delayget
    
    ](/reference/1-click-delay)
*   [1-Click Reactivateget
    
    ](/reference/1-click-reactivate)

## Composites (SC.ordergroove.com)

*   [Purchase POST](/reference/purchase-post)
*   [Purchase POST APIpost
    
    ](/reference/purchase-post-api)
*   [Purchase POST Statusget
    
    ](/reference/purchase-post-status)

## Cart (om.ordergroove.com)

*   [Retrieveget
    
    ](/reference/cart-retrieve)

## ENTITLEMENTS (ENTITLEMENTS-SERVICE.ORDERGROOVE.COM)

*   [Listget
    
    ](/reference/entitlements-list)

# Webhooks Overview

Webhooks are proactive notifications, via HTTP requests from one application to another, that a specific event has occurred. Put simply, webhooks allow you to send Ordergroove to proactively contact your application(s) with information about the events that happen in your subscription program - for example, if a subscription is created, an order is skipped, etc.

Here is a simplified example:

![](https://files.readme.io/1e4e653-797cb96-Screenshot_from_2020-09-17_14-12-49.png)

## 

Why Would I Use Webhooks?

[](#why-would-i-use-webhooks)

Webhooks allow you to create custom applications that automate or create additional functionality and experiences not otherwise native to Ordergroove's platform. Some examples you might use a webhook for:

*   Automatically cancel a subscription after a certain number of shipments
*   Update your CRM with information about subscribers, subscriptions, and orders
*   Send additional marketing emails at significant points in a subscription or subscriber's lifecycle

**Note**: Ordergroove runs the webhook delivery process every 5 minutes, and anything that still is in the queue gets retried.

* * *

## 

Create and Manage Webhooks

[](#create-and-manage-webhooks)

You can create, configure, and disable webhooks in the [Ordergroove Admin](https://rc3.ordergroove.com/webhooks/). **Note**: you will need an Ordergroove login, your organization can set one up.

1.  Log in to [Ordergroove](https://rc3.ordergroove.com/webhooks/).
2.  Go to **Developers** on the top toolbar, and select **Webhooks**.
3.  Click **\+ CREATE WEBHOOK** to begin
4.  Select which events you want to receive webhook notification for and any additional webhooks data that you want included in the payload. For example, an order event will only contain order level information. If you select to add subscription and item level data, that will also be sent in the payload of the webhook.

![](https://files.readme.io/3c4a505-7fb256b-image1_clean.png)

* * *

## 

Authentication

[](#authentication)

Verification keys are used to sign webhook requests, allowing the recipient to verify that the requests are genuinely issued by Ordergroove. In the event the verification key of a given route needs to be changed, because it got compromised or due for routine security updates, it is possible to start a key rotation process so that webhooks requests start being signed with a new key.

### 

Rotating signing key of a webhook route

[](#rotating-signing-key-of-a-webhook-route)

Verification keys are used to sign webhook requests, allowing the recipient to verify that the requests are genuinely issued by Ordergroove. In the event the verification key of a given route needs to be changed, because it got compromised or due for routine security updates, it is possible to start a key rotation process so that webhooks requests start being signed with a new key.

### 

Key Rotation Process

[](#key-rotation-process)

When the key rotation process is initiated for a webhook route, a transitional period of 24 hours begins. During this period, the Ordergroove-Signature header in webhook requests will include signatures for both the new and the old verification keys.

The format for these headers will be `ts=<TIMESTAMP>,sig=<PAYLOAD_SIGNED_WITH_NEW_KEY>,sig=<PAYLOAD_SIGNED_WITH_OLD_KEY>`. This dual-signature approach ensures a smooth transition, allowing the recipient to verify the webhook requests using either the old or the new key.

### 

Transition Completion

[](#transition-completion)

After the 24-hour transition period, the Ordergroove-Signature header will revert to its standard format, containing only the new key signature: `ts=<TIMESTAMP>,sig=<PAYLOAD_SIGNED_WITH_NEW_KEY>`.

At this point, the old verification key becomes obsolete for request verification. It is imperative that all webhook recipients update their systems to use the new verification key within this 24-hour window to maintain uninterrupted verification of webhook requests.

In order to initiate a verification key rotation process for a given webhook, follow these steps:

1.  Log in to [Ordergroove](https://rc3.ordergroove.com/).
2.  Go to Developers > Webhooks.
3.  Locate the webhook you want to enable, click the **3 dots**, and select **Regenerate key**.

![](https://files.readme.io/12c01b8-image12_regenerate_clean.png)

4.  Confirm the operation by clicking **Regenerate key**

![](https://files.readme.io/7e265b5-image4.png)

5.  After the operation completes successfully, the new key is available for copying it from the Verification Key column and adopting it in the recipient servers.

* * *

## 

Test Events

[](#test-events)

You can test your webhook events right in Ordergroove without going to your website to make a test customer and manually creating subscriptions with your credit card.

The _webhooks test events_ feature allows you to generate fake payloads for different types of events. This will help you early in the implementation process by making sure your webhook target can receive the data and parse it correctly.

### 

Sending Test Events

[](#sending-test-events)

1.  Log in to [Ordergroove](https://rc3.ordergroove.com/), and go to Developers > Webhooks.
2.  Locate the Webhook you want to test, and click the configuration dropdown to the right.
3.  Select **Send test events**
4.  A pop-up will ask you to **Confirm**, and the test events are sent.

![](https://files.readme.io/c1295d8-image3_clean.png)

### 

Results

[](#results)

You can see the delivery result of the test events in the _deliveries log page._

* * *

## 

FAQ

[](#faq)

**Can I Configure Only Some Events To Be Sent To My Endpoint?**  
Yes! We have now included the ability to filter which Webhook events are sent to each of your targets.

*   [Table of Contents](#)
*   *   [Why Would I Use Webhooks?](#why-would-i-use-webhooks)
    *   [Create and Manage Webhooks](#create-and-manage-webhooks)
    *   [Authentication](#authentication)
        *   [Rotating signing key of a webhook route](#rotating-signing-key-of-a-webhook-route)
        *   [Key Rotation Process](#key-rotation-process)
        *   [Transition Completion](#transition-completion)
    *   [Test Events](#test-events)
        *   [Sending Test Events](#sending-test-events)
        *   [Results](#results)
    *   [FAQ](#faq)
