---
title: Calling Ordergroove’s REST APIs from within Subscription Manager
source: https://developer.ordergroove.com/docs/call-rest-apis-from-within-subscription-manager
converted_from: html
---

# Calling Ordergroove’s REST APIs from within Subscription Manager

## Ordergroove 101

*   [Developer Fundamentals](/docs/developer-fundamentals)
    *   [Systems Landscape Map](/docs/landscape-map)
    *   [Data model at a glance](/docs/data-model-at-a-glance)
    *   [Subscription Creation via Purchase POST](/docs/subscription-creation-via-purchase-post)
    *   [Recurring Order Placement](/docs/recurring-order-placement)
    *   [Subscription Manager Tagging and Authentication](/docs/subscription-manager-tagging-and-authentication)
    *   [Customer and Payment Updates](/docs/customer-and-payment-updates)
*   [General FAQ](/docs/general-faq)
*   [Install Ordergroove on an Online Store 2.0 theme](/docs/use-ordergroove-with-online-store-20)
    *   [Installing Ordergroove with App Embed](/docs/installing-ordergroove-with-app-embed)
*   [Custom Platform and Headless Subscription Implementation](/docs/integrating-with-a-custom-platform-1)

## Program Migration

*   [Migrate my data to Ordergroove](/docs/program-migration)
*   [Self-serve migration guide](/docs/view-self-serve-migration-guide)
*   [Self-serve migration guide for Recharge](/docs/self-serve-migration-guide-for-recharge)
*   [Staged Migrations](/docs/staged-migrations)

## Syncing Ordergroove Data

*   [Sync Ordergroove Data into Internal Systems](/docs/sync-ordergroove-data-into-internal-systems)
*   [Sync Objects](/docs/implement-custom-data-pipelines)
    *   [Implement Custom Data Pipelines](/docs/implement-custom-data-pipelines)
    *   [Using Prebuilt Connectors](/docs/using-prebuilt-connectors)
    *   [SFTP File Drops](/docs/sftp-file-drops)
*   [Sync Events](/docs/sync-events)

## Product Catalog

*   [Offer Tagging](/docs/offer-tagging)
*   [Product Feed](/docs/integrating-with-a-custom-platform)

## Subscription Enrollment

*   [Getting started](/docs/getting-started)
*   [First Order Place Date control for Shopify Merchants](/docs/first-order-place-date-control-for-shopify-merchants)
*   [Showing Discounted Price](/docs/showing-discounted-price-in-shopify)
*   [Customizing the Initial Offer Incentive (IOI)](/docs/customizing-the-initial-offer-incentive-ioi-using-shopify-scripts)
*   [Free shipping on initial orders](/docs/free-shipping-on-initial-orders-with-shopify-scripts)
*   [Cart Opt-In Tagging](/docs/shopify-cart-opt-in-tagging)
*   [Tagging the Product Details Page (PDP)](/docs/tagging-the-product-details-page-pdp)
*   [Real Time Stock Update](/docs/real-time-stock-update)
*   [Add a subscription to cart](/docs/modify-a-subscription-from-checkout-flow)
    *   [Offer Code Elements](/docs/offer-code-elements)
    *   [Domain Objects](/docs/domain-objects)
    *   [Helper Methods](/docs/helper-methods)
*   [Add a subscription offer to quickview, homepage, or other areas of your site](/docs/quickview-offers)
    *   [Tracking Affiliate Codes on Recurring Orders](/docs/tracking-affiliate-codes-on-recurring-orders)
*   [Troubleshooting Cart Offers](/docs/troubleshooting-cart-offers)
*   [Modify a subscription from email and SMS](/docs/modify-a-subscription-from-email-and-sms)
*   [Advanced Offer Customizations & FAQ](/docs/advanced-offer-customizations-faq)

## Subscription Manager Overview

*   [Subscription Manager From The Customer's Perspective](/docs/getting-started-1)
*   [Tour of Subscription Manager v25](/docs/tour-of-subscription-manager-v25)
    *   [Intro to v25 for Developers transitioning from v0](/docs/intro-to-v25-for-developers-transitioning-from-v0)
    *   [Customizing calendars and dates in v25](/docs/customizing-calendars-and-dates-in-v25)
    *   [Understanding Subscription Manager Custom Elements](/docs/understanding-subscription-manager-custom-elements)
*   [Subscription Manager File Descriptions](/docs/subscription-manager-file-descriptions)
*   [Subscription Manager v0 Components & Containers](/docs/subscription-manager-components-containers)
    *   [Subscription Manager Templates](/docs/subscription-manager-templates)
    *   [Orders Unsent Section](/docs/orders-unsent-section)
        *   [Skip Order](/docs/skip-order)
        *   [Send Now](/docs/send-now)
        *   [Change Date](/docs/change-date)
    *   [Orders Processing Section](/docs/orders-processing-section)
    *   [Inactive Subscriptions Section](/docs/inactive-subscriptions-section)
*   [Customize your Subscription Manager templates without breaking tracking](/docs/sm-template-customization-tracking)
*   [Subscription Manager Templates Changelog](/docs/subscription-manager-templates-changelog)

## Subscription Manager Modifications

*   [Subscription Manager Development Overview](/docs/subscription-manager-overview)
    *   [Edit Code with the Advanced Editor](/docs/edit-code-with-the-advanced-editor)
    *   [Subscription Manager Theme Editor Overview](/docs/subscription-manager-theme-editor-overview)
    *   [Subscription Manager Development Guide](/docs/subscription-manager-development-guide)
    *   [Customizing Subscription Manager Sections on Shopify](/docs/customizing-subscription-manager-sections-on-shopify)
    *   [Refreshing data in the Subscription Manager](/docs/refreshing-data-in-the-subscription-manager)
    *   [Objects](/docs/objects)
    *   [Object Reference](/docs/object-reference)
    *   [Translations](/docs/translations)
    *   [Subscription Manager Local Development](/docs/subscription-manager-local-development)
    *   [Debugging with Redux](/docs/debugging-with-redux)
    *   [Working with dates in the Subscription Manager](/docs/working-with-dates-in-the-subscription-manager)
*   [Modify the Change Billing Process Button](/docs/modify-the-change-billing-process-button)
*   [Implementing Country & State Dropdown in Subscription Manager Themes](/docs/implementing-country-state-dropdown-in-subscription-manager-themes)
*   [Adding a Cancel Button to Modals](/docs/adding-a-cancel-button-to-modals)
*   [Limiting Future Dates in the Change Date Calendar](/docs/limiting-future-dates-in-the-change-date-calendar)
*   [Dynamic Shipping Restrictions in the Subscription Manager](/docs/dynamic-shipping-restrictions-in-the-subscription-manager)
*   [One Time SKU Swap Configuration in the Subscription Manager](/docs/one-time-sku-swap-configuration-in-the-subscription-manager)
*   [Adding a Scrollbar to Inactive Subscriptions in the Subscription Manager](/docs/adding-a-scrollbar-to-inactive-subscriptions-in-the-subscription-manager)
*   [Enabling Payment Updates for Shopify New Accounts](/docs/enabling-payment-updates-for-shopify-new-accounts)

## Subscription Manager Development with APIs

*   [Calling Ordergroove’s REST APIs from within Subscription Manager](/docs/call-rest-apis-from-within-subscription-manager)
*   [Integrating External APIs in the Subscription Manager](/docs/integrating-external-apis-in-the-subscription-manager)

## Tagging Subscription Manager

*   [Tagging the Subscription Manager](/docs/tagging-the-subscription-manager-on-shopify)
*   [Convert your customers/account page to support Online Store 2.0](/docs/convert-your-customersaccount-page-to-support-online-store-20)

## Upsell and 1-Click

*   [Instant Upsell Overview](/docs/getting-started-2)
    *   [Instant Upsell through API](/docs/add-a-one-time-item-to-an-upcoming-order)
*   [1-Click Actions in Emails](/docs/1-click-actions-in-emails)

## Subscription Types

*   [Bundle Subscriptions](/docs/bundle-subscriptions)
    *   [Configuring Bundles](/docs/configuring-bundles)
    *   [Box Subscription Creation on Shopify](/docs/box-subscription-creation-on-shopify)
    *   [Bundle API Components](/docs/bundle-api-components)
    *   [Build Your Own Box Subscriptions (Legacy)](/docs/build-your-own-box-subscriptions)
        *   [Shopify - Build Your Own Box Subscriptions (Legacy)](/docs/build-your-own-box-subscriptions-on-shopify)
*   [Guided Selling](/docs/guided-selling)
*   [Curation Subscriptions: Rotating Box or Club](/docs/curation-subscriptions-rotating-box-or-club)
*   [Prepaid Subscriptions](/docs/how-to-manage-prepaid-renewal-behaviors)
    *   [How to Manage Prepaid Renewal Behaviors](/docs/how-to-manage-prepaid-renewal-behaviors)
*   [Rotating Subscriptions](/docs/rotating-subscriptions)
    *   [Ordinal Based Rotating Products](/docs/ordinal-based-rotating-products)
    *   [Time Window Based Rotating Products](/docs/time-window-based-rotating-products)
*   [Digital Subscriptions](/docs/digital-subscriptions)

## program data

*   [Configuring PayPal](/docs/configuring-paypal)
*   [Removing Ordergroove code from your Shopify theme](/docs/removing-ordergroove-code-from-your-shopify-theme)
*   [Webhooks overview (Legacy)](/docs/via-webhooks)
    *   [Configure Webhooks via API](/docs/configure-webhooks-via-api)
    *   [Expiring or Termed Subscriptions Using Webhooks](/docs/expiring-or-termed-subscriptions-using-webhooks)
*   [HMAC and AES Authentication](/docs/hmac-and-aes-authentication)

# Calling Ordergroove’s REST APIs from within Subscription Manager

[Suggest Edits](/edit/call-rest-apis-from-within-subscription-manager)

There may be times when you want to go beyond the standard functionality of the Subscription Manager and use the advanced editor to make calls to Ordergroove’s suite of [REST APIs](/reference/introduction).

This article outlines a few options for how to call these APIs by leveraging [Storefront Auth](/reference/authentication#storefront-api-scope) within the Subscription Manager. Please note that any APIs requiring Application API scope can only be accessed server-to-server and will require a separate backend application.

* * *

## 

Option 1 - Retrieve the Authorization Headers Directly

[](#option-1---retrieve-the-authorization-headers-directly)

You can retrieve the authorization headers directly using JavaScript. There are two ways to add the required JavaScript code:

1.  Add the JavaScript to your `script.js` file (editable via RC3).
2.  Add the JavaScript to your own script that executes on your page.

**Note:** The variables change slightly depending on whether you are making the call from a page with `main.js` tagged or `msi.js` tagged.

### 

For page tagged with `main.js` and customer is logged in

[](#for-page-tagged-with-mainjs-and-customer-is-logged-in)

To retrieve the authorization headers, use the following code snippet:

JavaScript

`const getAuthorizationHeader = () => {     const { public_id, sig_field, ts, sig } = og.store.getState().auth;     return JSON.stringify({         public_id,         sig_field,         ts,         sig     }); };  fetch('https://restapi.ordergroove.com/<resource>', {     headers: {         'Content-Type': 'application/json',         'Authorization': getAuthorizationHeader()     } });`

 

### 

For page tagged with`msi.js` and customer is logged in

[](#for-page-tagged-withmsijs-and-customer-is-logged-in)

If you are making the call from a page with `msi.js` tagged, use the following code snippet:

JavaScript

`const getAuthorizationHeader = () => {     const { public_id, sig_field, ts, sig } = og.smi.store.getState().customer;     return JSON.stringify({         public_id,         sig_field,         ts,         sig     }); };  fetch('https://restapi.ordergroove.com/<resource>', {     headers: {         'Content-Type': 'application/json',         'Authorization': getAuthorizationHeader()     } });`

 

### 

Summary

[](#summary)

By using the appropriate JavaScript code based on whether `main.js` or `msi.js` is tagged, you can easily retrieve the authorization headers required for making API calls to the OrderGroove REST API.

* * *

## 

Option 2 - Leverage the existing API calls via window.og.smi

[](#option-2---leverage-the-existing-api-calls-via-windowogsmi)

A subset of the REST APIs are already called from Ordergroove’s JavaScript and you can use window.og.smi to make the same calls as needed.

### 

refresh\_page\_state

[](#refresh_page_state)

Performs an asynchronous request to re-retrieve the initial page data (including, but not limited to, orders, items, subscriptions, and addresses) and updates the state with the result. If orders or items have been removed since the page was last loaded, calling this function will remove those items from the state.

#### 

Parameters

[](#parameters)

*   None

#### 

Returns

[](#returns)

*   `Promise<void>`

* * *

### 

request\_orders

[](#request_orders)

Performs an asynchronous request to fetch orders and update the state with the result

#### 

Parameters

[](#parameters-1)

*   `options` (Object): Describing filter and ordering.
    *   `status` (OrderStatus\[\]): The status of the orders to fetch.
    *   `ordering` (string): How results should be sorted. Defaults to `place`.

#### 

Returns

[](#returns-1)

*   `Promise<Results<Order>>`

* * *

### 

request\_orders\_items

[](#request_orders_items)

Performs an asynchronous request to fetch order items and update the state with the result. If you want deleted order items to be removed from the page state, call `refresh_page_state` instead.

#### 

Parameters

[](#parameters-2)

*   `options` (Object): Describes order status filter.
    *   `status` (OrderStatus\[\]): The status of the order items to fetch (optional).

#### 

Returns

[](#returns-2)

*   `Promise<Results<OrderItem>>`

* * *

### 

request\_subscriptions

[](#request_subscriptions)

Performs an asynchronous request to fetch subscriptions and update the state with the result

#### 

Parameters

[](#parameters-3)

*   `options` (Object): Object describing filter and ordering.
    *   `live` (boolean): Filter for live subscriptions (optional).

#### 

Returns

[](#returns-3)

*   `Promise<Results<Subscription>>`

* * *

### 

request\_product

[](#request_product)

Performs an asynchronous request to fetch a product and update the state with the result

#### 

Parameters

[](#parameters-4)

*   `external_product_id` (string): Product identifier (external\_product\_id).

#### 

Returns

[](#returns-4)

*   `Promise<Product>`

* * *

### 

request\_delete\_item

[](#request_delete_item)

Performs an asynchronous request to remove an item from an order

#### 

Parameters

[](#parameters-5)

*   `item_id` (string): Item identifier (item\_id).

#### 

Returns

[](#returns-5)

*   `Promise<Product>`

* * *

### 

request\_skip\_order

[](#request_skip_order)

Performs an asynchronous request to skip an order

#### 

Parameters

[](#parameters-6)

*   `order_id` (string): Item identifier (order\_id).

#### 

Returns

[](#returns-6)

*   `Promise<Product>`

Updated 9 months ago

* * *

*   [Table of Contents](#)
*   *   [Option 1 - Retrieve the Authorization Headers Directly](#option-1---retrieve-the-authorization-headers-directly)
        *   [For page tagged with `main.js` and customer is logged in](#for-page-tagged-with-mainjs-and-customer-is-logged-in)
        *   [For page tagged with`msi.js` and customer is logged in](#for-page-tagged-withmsijs-and-customer-is-logged-in)
        *   [Summary](#summary)
    *   [Option 2 - Leverage the existing API calls via window.og.smi](#option-2---leverage-the-existing-api-calls-via-windowogsmi)
        *   [refresh\_page\_state](#refresh_page_state)
        *   [request\_orders](#request_orders)
        *   [request\_orders\_items](#request_orders_items)
        *   [request\_subscriptions](#request_subscriptions)
        *   [request\_product](#request_product)
        *   [request\_delete\_item](#request_delete_item)
        *   [request\_skip\_order](#request_skip_order)
