export const makePrice = (price: number) => {
  return price.toString().length === 1
    ? "00.0" + price.toString() :
    price.toString().length === 2 ?
      "00." + price.toString() :
      price.toString().length === 3 ?
        "0" + price.toString().slice(0, 1) + "." + price.toString().slice(-2) :
        price.toString().length >= 4 ?
          price.toString().slice(0, -2) + "." + price.toString().slice(-2) :
          ""
}