<template>
  <div>
    <main>
      <!-- <div v-if="showLesson"> -->
      <div style="p-2" class="container h-auto p-2 content-center">
        <!-- class="fas fa-search" -->
        <input
          class="flex-grow px-4 rounded-l-full p-2 border-3 border-gray-300 rounded-r-full text-sm focus:outline"
          type="search"
          v-model="search"
          placeholder="Search"
        />

        <input
          id="sortSubject"
          name="filter"
          type="radio"
          v-on:Click="sortSubject"
        />
        <label for="sortSubject">Subject&nbsp;</label>

        <input
          id="sortLocation"
          name="filter"
          type="radio"
          v-on:Click="sortLocation"
        />
        <label for="sortLocation">Location&nbsp;</label>
        <input
          id="sortAvailability"
          name="filter"
          type="radio"
          v-on:Click="sortAvailability"
        />
        <label for="sortAvailability">Availability&nbsp;</label>
        <input
          id="sortLowestPrice"
          name="filter"
          type="radio"
          v-on:Click="sortLowestPrice"
        />
        <label for="sortLowestPrice">Low Price&nbsp;</label>
        <input
          id="sortHighestPrice"
          name="filter"
          type="radio"
          v-on:Click="sortHighestPrice"
        />
        <label for="sortHighestPrice">High Price&nbsp;</label>
        <input
          id="ascending"
          name="filter"
          type="radio"
          v-on:Click="ascending"
        />
        <label for="ascending">Ascending&nbsp;</label>
        <input
          id="descending"
          name="filter"
          type="radio"
          v-on:Click="descending"
        />
        <label for="descending">Descending&nbsp;</label>
      </div>
      <hr>
      <h1 class="text-center font-semibold text-4xl p-3"> Activites</h1>
      <div class="grid grid-flow-row grid-cols-4 gap-6">
        <div
          v-for="lesson in lessons"
          v-bind:key="lesson.id"
          class="group relative"
        >
          <div
            class="shadow-xl border-1 border-gray-300 w-70 rounded-md m-2 font-semibold"
          >
            <img
              class="w-50 h-50 object-center bg-gray-200 hover:bg-gray-100"
              v-bind:src="lesson.image"
            />
            <h2 class="pl-2">Subject: {{ lesson.subject }}</h2>
            <p class="pl-2">Location: {{ lesson.location }}</p>
            <p class="pl-2">Price: {{ lesson.price }}$</p>
            <p class="pl-2">Spaces: {{ lesson.spaces - cartCount(lesson) }}</p>
            <p>
              <span class="pl-2" v-for="n in lesson.rating" :key="n">★</span>
              <span class="pl-2" v-for="n in 5 - lesson.rating" :key="n"
                >☆</span
              >
            </p>
            <button
              class="bg-green-700 text-white rounded-b-md font-semibold p-3 bg-opacity-75 w-full text-center"
              v-on:click="add(lesson)"
              v-if="canAddToCart(lesson)"
            >
              Add to Cart
            </button>
            <button
              class="bg-gray-200 text-gray-600 rounded-b-md font-semibold p-3 bg-opacity-75 w-full text-center"
              disabled="disabled"
              v-else
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  export default {
    name: "LessonsList",
    props: ["lessons"],
    data() {
      return {
        cart: [],
      };
    },
    methods: {
      add(lesson) {
      console.log("add prodcut from child", lesson)
      this.$emit("addLesson",lesson);
      },
      canAddToCart(lesson) {
        return lesson.spaces > this.cartCount(lesson);
      },
      cartCount(lesson) {
        let count = 0;
        for (let i = 0; i < this.cart.length; i++) {
          if (this.cart[i] === lesson) {
            count++;
          }
        }
        return count;
      },
      sortSubject() {
        // eslint-disable-next-line vue/no-mutating-props
        this.lessons.sort((a, b) => (a.subject > b.subject ? 1 : -1));
      },
      sortLowestPrice() {
        // eslint-disable-next-line vue/no-mutating-props
        this.lessons.sort((a, b) => (a.price > b.price ? 1 : -1));
      },
      sortHighestPrice() {
         // eslint-disable-next-line vue/no-mutating-props
        this.lessons.sort((a, b) => (a.price < b.price ? 1 : -1));
      },
      ascending() {
         // eslint-disable-next-line vue/no-mutating-props
        this.lessons.sort((a, b) => (a.subject > b.subject ? 1 : -1));
      },
      descending() {
         // eslint-disable-next-line vue/no-mutating-props
        this.lessons.sort((a, b) => (a.subject < b.subject ? 1 : -1));
      },
      sortLocation() {
         // eslint-disable-next-line vue/no-mutating-props
        this.lessons.sort((a, b) => (a.location > b.location ? 1 : -1));
      },
      sortAvailability() {
         // eslint-disable-next-line vue/no-mutating-props
        this.lessons.sort((a, b) => (a.spaces < b.spaces ? 1 : -1));
      },
      sortHighRating() {
         // eslint-disable-next-line vue/no-mutating-props
        this.lessons.sort((a, b) => (a.rating < b.rating ? 1 : -1));
      },
    },
    // computed: {
    //   searchData() {
    //     const searchInput = this.search.toLowerCase();
    //     fetch("http://localhost:3000/lessons/" + searchInput).then(function (
    //       response
    //     ) {
    //       response.json().then(function (json) {
    //         app.lessons = JSON.parse(JSON.stringify(json));
    //         console.log(JSON.parse(JSON.stringify(json)));
    //         return json;
    //       });
    //     });
    //   },
    // },
  };
</script>

<style></style>
