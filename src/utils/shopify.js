import Client from "shopify-buy"

const shopify = Client.buildClient({
    domain: "iron-jimmy-sleeves.myshopify.com",
    storefrontAccessToken: process.env.GATSBY_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
})

const createCart = async() => {
    console.log("🛒🔧")
    const cart = await shopify.checkout.create()
    return cart
}

const getCart = async() => {
    console.log("🛒🤲🏼")
    let cart = {}

    const id = localStorage.getItem("shopifyCartId")

    if (!id) {
        console.log("🛒⛔")
        cart = await createCart()
        localStorage.setItem("shopifyCartId", cart.id)
    } else {
        console.log("🛒✨")
        cart = await shopify.checkout.fetch(id)
    }

    return cart
}

const addToCart = async(variant, attributes = {}) => {
    console.log("🛒✅")
    const id = localStorage.getItem("shopifyCartId")

    const lineItems = [
        {
            variantId: variant,
            quantity: 1,
            customAttributes: attributes,
        },
    ]

    const cart = await shopify.checkout.addLineItems(id, lineItems)
    return cart
}

const removeFromCart = async lineItem => {
    console.log("🛒❌")
    const id = localStorage.getItem("shopifyCartId")
    const lineItems = [lineItem]
    const cart = await shopify.checkout.removeLineItems(id, lineItems)
    return cart
}

const updateLineItem = async lineItem => {
    console.log("🛒📝")
    const id = localStorage.getItem("shopifyCartId")
    const lineItems = [lineItem]
    const cart = await shopify.checkout.updateLineItems(id, lineItems)
    return cart
}

const getVariant = (product, options) => {
    const variant = shopify.product.helpers.variantForOptions(product, options)
    return variant
}

export {
    createCart,
    getCart,
    addToCart,
    removeFromCart,
    getVariant,
    updateLineItem,
}
