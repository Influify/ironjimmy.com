import React, {useState} from "react"
import PropTypes from "prop-types"
import {graphql} from "gatsby"
import Layout from "../components/Layout"
import Image from "../components/Image"
import Container from "../styles/Container"
import Product from "../styles/Product"
import ProductHeader from "../styles/ProductHeader"
import ProductForm from "../styles/ProductForm"
import Field from "../styles/Field"
import Colors from "../components/Colors"
import AddToCart from "../components/AddToCart"
import {displayPrice} from "../utils/price"
import {addToCart} from "../utils/shopify"

const StrapsTemplate = ({data}) => {
    const [variant, setVariant] = useState(
        "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xNDMwNTYwMzI4OTE1NA==",
    )

    const handleSubmit = event => {
        event.preventDefault()
        addToCart(variant)
        return
    }

    const {
        images,
        description,
        priceRange,
        title,
        options,
        variants,
    } = data.shopifyProduct

    const variantImages = variants.reduce((acc, curr) => {
        const image = curr.image.originalSrc
        !acc.includes(image) && acc.push(image)
        return acc
    }, [])

    const productImages = images.reduce((acc, curr) => {
        const image = curr.originalSrc
        !variantImages.includes(image) && acc.push(image)
        return acc
    }, [])

    const price = priceRange.minVariantPrice.amount

    return (
        <Layout>
            <Container>
                <Product>
                    <div>
                        <Image src={productImages[0]}/>
                        <p>{description}</p>
                    </div>

                    <div>
                        <ProductHeader>
                            <h1>{title}</h1>
                            <p>{displayPrice(price)}</p>
                        </ProductHeader>

                        <Colors images={variantImages}/>

                        <ProductForm onSubmit={handleSubmit}>
                            {options.map((option, index) => {
                                const {name, values} = option

                                if (!isColor(name) && !isDefault(name)) {
                                    return (
                                        <Field key={index}>
                                            <label>{name}</label>
                                            <select>
                                                {values.map((value, index) => (
                                                    <option
                                                        key={index}
                                                        value={value}
                                                    >
                                                        {value}
                                                    </option>
                                                ))}
                                            </select>
                                        </Field>
                                    )
                                }
                            })}

                            <AddToCart/>
                        </ProductForm>
                    </div>
                </Product>
            </Container>
        </Layout>
    )
}

StrapsTemplate.propTypes = {
    data: PropTypes.object.isRequired,
}

const isDefault = name => {
    return name === "Title"
}

const isColor = name => {
    const matches = ["color", "pattern"]
    name = name.toLowerCase()
    return matches.some(element => name.includes(element))
}

export const query = graphql`
    query($shopifyId: String!) {
        shopifyProduct(shopifyId: {eq: $shopifyId}) {
            shopifyId
            title
            description
            images {
                originalSrc
            }
            priceRange {
                minVariantPrice {
                    amount
                }
            }
            options {
                name
                values
            }
            variants {
                shopifyId
                selectedOptions {
                    name
                    value
                }
                image {
                    originalSrc
                }
            }
        }
    }
`

export default StrapsTemplate
