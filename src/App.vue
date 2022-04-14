<template>
  <div id="app">
    <header
      class="p-4 flex w-full bg-blue-900 text-white font-semibold justify-between" >
      <h1 class="font-semibold text-center p-2" v-text="sitename"></h1>
      <button
        v-on:click="showCheckout"
        class="bg-green-700 w-40 font-semibold h-10 p-2 rounded-lg"
        v-if="cartItemCount > 0" >
        {{ cartItemCount }}
        <span class="fas fa-cart-plus"></span>
        View Cart
      </button>
      <button
        class="bg-gray-200 text-gray-600 w-40 font-semibold h-10 p-2 rounded-lg"
        v-on:click="showLesson"
        v-else
      >
        <span class="fas fa-cart-plus"></span> Cart
      </button>
    </header>
    <LessonsList
      v-if="showLesson"
      v-bind:lessons="lessons"
      @addLesson="addToCart"
    />
    <CartCheckout
      v-else-if="showCheckout"
      v-bind:cart="cart"
      @removeLesson="removeFromCart"
    />
    <footer class="text-center font-mono text-xl p-4 text-gray-300">
      ©2022 Nour Alhabashi M00841472
    </footer>
  </div>
</template>

<script>
  import CartCheckout from "./components/CartCheckout.vue";
  import LessonsList from "./components/LessonsList.vue";

  export default {
    name: "App",
    components: {
      CartCheckout,
      LessonsList,
    },
    data() {
      return {
        sitename: "Hamilton - After School Clubs",
        lessons: [],
        cart: [],
        showLesson: true,
      };
    },
    created() {
      fetch("https://nalhabashe-cw3.herokuapp.com/lessons")
        .then((res) => res.json())
        .then((data) => (this.lessons = data));
      // console.log(this.data);
    },
    methods: {
      new(cart) {
        console.log(cart + "order parent");
      },
      addToCart(lesson) {
        this.cart.push(lesson);
        console.log("add from parent");
        lesson.spaces--;
      },
      removeFromCart(index, lesson) {
        this.cart.splice(index, 1);
        console.log("remove from parent");
        lesson.spaces++;
      },
      // changed showLesson to true, used in disabled button Cart to go back to lessons list
      showBackLesson() {
        this.showCheckout = this.showCheckout ? false : true;
      },
      showCheckout() {
        this.showLesson = this.showLesson ? false : true;
      },
    },
    computed: {
      cartItemCount() {
        return this.cart.length;
      },
    },
  };
</script>

<style></style>
