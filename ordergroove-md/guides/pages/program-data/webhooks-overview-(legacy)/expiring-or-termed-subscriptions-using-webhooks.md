---
title: Expiring or Termed Subscriptions Using Webhooks
source: https://developer.ordergroove.com/docs/expiring-or-termed-subscriptions-using-webhooks
converted_from: html
---

# Expiring or Termed Subscriptions Using Webhooks

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

# Expiring or Termed Subscriptions Using Webhooks

[Suggest Edits](/edit/expiring-or-termed-subscriptions-using-webhooks)

Ordergroove supports termed subscriptions using webhooks - subscriptions with a set time frame that will automatically expire when they run their course. These are commonly used for gifts.

For general information take a look at the [Knowledge Center](https://help.ordergroove.com/hc/en-us/articles/360055734913-Expiring-or-Termed-Subscriptions-Using-Webhooks). In this guide we'll go through how to set it up.

* * *

## 

Example Design Using Subscription Extra Data

[](#example-design-using-subscription-extra-data)

You’ll want to set up a listener endpoint for Ordergroove’s [subscription creation webhook](/docs/configure-webhooks-via-api).

> ## 📘
> 
> Platform
> 
> If you use Shopify as your eCommerce platform, you will already see webhooks already created for Ordergroove's communication with Shopify. Please create new webhooks - **do not** update or disrupt those existing webhook settings.

When the subscription webhook triggers to you and contains a termed SKU - you’ll want to call the Subscription Update endpoint and pass in extra\_data information that will set the fulfillment counter (you can choose any key/value pair for this, but for this documentation, we’ll use “fulfillment\_counter” and a string as the number “2”).

For example, this is what you could send in the body of the PATCH to update:

PATCH

`"extra_data":{   "fulfillment_counter": "2",   "termed": "true" }`

By including the termed true setting, there will be an identifier returned to the front end to assist you with visuals in the Subscription Manager via the Ordergroove Advanced Editor.

When a recurring order is placed successfully for a gift, you will call Ordergroove’s REST endpoint to update the fulfillment\_counter again.

*   For any eCommerce environment, Ordergroove can send a webhook notification when an order is successful.
*   For Shopify merchants, Ordergroove can set subscription ID, counter, and original order ID as line item properties on the order.

> ## 🚧
> 
> Warning
> 
> Updating subscription extra\_data will overwrite the existing values of everything in that field, so be sure to copy and update all information to patch back to the endpoint

When a customer has reached their last order, you will make a call to update subscription extra data with an addition of “hide”: true so that you can hide this from reactivation, and then you will also call the cancel subscription endpoint to cancel.

* * *

## 

Potential or Example Data Flow

[](#potential-or-example-data-flow)

![](https://files.readme.io/52538d6-Termed_Flowchart_V2.png)

Updated over 1 year ago

* * *

*   [Table of Contents](#)
*   *   [Example Design Using Subscription Extra Data](#example-design-using-subscription-extra-data)
    *   [Potential or Example Data Flow](#potential-or-example-data-flow)
