<template>
<div>
          <h1 class="text-center font-semibold text-4xl p-3"> My Cart </h1>
          <div class="grid grid-flow-row grid-cols-4 gap-6 p-5" >    
          <div v-for="(lesson, index) in cart" :key="index" class="group relative border-gray-300 shadow-xl border-1 border-gray-300 w-70 rounded-md m-2 font-semibold ">           
            <figure>
              <img class="bg-gray-200" v-bind:src="lesson.image" />
            </figure>
            <h2 class="pl-2">Subject: {{lesson.subject}}</h2>
            <p class="pl-2">Location: {{lesson.location}}</p>
            <p class="pl-2">Price: {{lesson.price}}$</p>
            <button class="bg-green-700 text-white rounded-b-md font-semibold p-3 bg-opacity-75 w-full text-center"
             v-on:click="remove(index,lesson)">
             Remove from Cart
            </button>
          </div>
        </div>
    <div class="container mx-auto px-5 bg-gray-200 border-gray-300 border-1 shadow-xl rounded-md p-4">
 
      <h1 class="font-semibold text-3xl p-3">Checkout</h1>
      <form
      @submit.prevent="checkForm"
      method="post" >
    <p class="bg-red-300 w-auto rounded-md shadow-xl p-2" v-if="errors.length">
      <b>Please enter the following required fields:</b>
      <ul>
        <li v-for="error in errors" :key="error.id">{{ error }}</li>
      </ul>
    </p>
      <strong>Name: </strong> <input class="rounded-md" placeholder=" Enter Name" v-model.trim="name"/>
      <strong class="pl-10">Phone: </strong> <input class="rounded-md" placeholder=" Enter Phone Number" v-model.trim="phoneNumber" >
      <button class="bg-gray-200 text-gray-600 rounded-md font-semibold p-1 px-2 text-center" v-if="!valid">
       Checkout
      </button>
      <button class="bg-green-700 text-white rounded-md font-semibold p-1 px-2 text-center" v-else-if="valid" type="submit" v-on:click="newOrder()">Checkout</button>     
      </form>
       
      </div>
  </div>
</template>

<script>
export default {
    name:"CartCheckout",
    props:['cart', `checkout`] ,
    data() {
      return {
      errors: [],
      name: '',
      phoneNumber: '',
      valid: false,
      }
    },
    methods: {
      remove(lesson,index){
        this.$emit("removeLesson", lesson,index);
        console.log("remove prodcut from child", lesson);
      },
      // order(cart){
      //   this.$emit("newOrder", cart);  
      //   console.log("order from child" , cart);
      // },
      newOrder() {
            const order = {
              name: this.name,
              phone: this.phoneNumber,
              lessons: this.cart.map((item) => {
                return { _id: item._id, lessonId : item.id, subject: item.subject, spaces: item.spaces };
              })
            };

            fetch('https://nalhabashe-cw3.herokuapp.com/orders',{
              method: 'POST',
              status: 200,
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(order),
              }).then(response => response.json()).then(alert("The order has been submitted successfully by name: " + this.name + " phone: " + this.phoneNumber))
              .then(this.updateSpace(order.lessons), console.log(JSON.stringify(order.lessons))).then(window.location);                
            // }).catch((err) => {
            //   console.error(err)
            // })
              // )},
            },
         
          updateSpace: (lessons) => {
            for(let i=0; i < lessons.length; i++){
            // const lesson = lessons.map((item) => {
            //   return { _id: item._id, spaces: item.spaces };
              console.log(lessons[i]._id)
            fetch('https://nalhabashe-cw3.herokuapp.com/lessons' + lessons[i]._id, {
              method: "PUT",
              status: 200,
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({"spaces" : lessons[i].spaces - 1}) ,
            })
              .then((response) => response.json()).catch((err) => {
              console.log(err)
          });
        }},
      cartCount(lesson) {
        let count = 0;
        for (let i = 0; i < this.cart.length; i++) {
          if (this.cart[i] === lesson) {
            count++;
          }
        }
        return count;
      },
      checkForm: function (e) {
          const regexString = /^[a-zA-z]+$/;
          const regexInt = /^[0-9]+$/;
          this.errors = [];

          if (!this.name) {
            this.errors.push('Name is required.');
            this.valid = false;
          }
          else if(!this.name.match(regexString)){
              this.errors.push('Name should be in letters.');
              this.valid = false;
          }
          if(!this.phoneNumber) {
             this.errors.push('Phone is required.');
             this.valid = false;
          }
          else if(!this.phoneNumber.match(regexInt)){
            this.errors.push('Phone should be in numbers.');
            this.valid = false;
            console.log("error"+ this.valid);
          }
          if(this.name.match(regexString) && this.phoneNumber.match(regexInt)) {
          this.valid = true;
          //console.log("no errors"+ this.valid);
          return true;
          }
          e.preventDefault();
         },
    },

}
</script>

<style>

</style>