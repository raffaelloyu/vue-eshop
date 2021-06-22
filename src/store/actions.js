export default {
  addCart(context, payload){
    let oldProduct = context.state.cartList.find(x=> x.iid === payload.iid)
    console.log(oldProduct);
    if(oldProduct){
      context.commit('addCounter', oldProduct)
    } else {
      payload.count = 1
      context.commit('addToCart', payload)
    }
  }
}
