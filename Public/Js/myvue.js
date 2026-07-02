
const app = new Vue({
    el: '#app',
    data: {
      errors: [],
      name: null,
      number: null,
      email : null,
      option : null,
      message : null,
      isActive : false,

    },
    methods:{

      checkForm: function (e) {
        console.log("checking")
        if (this.name && this.number && this.email  && this.option && this.message) {
   
          this.isActive = true;
          return true;
        }
  
        this.errors = [];
  
        if (!this.name) {
          this.errors.push('Name required.');
        }
        if (!this.number) {
          this.errors.push('Phone Number required.');
        }
        if (!this.email) {
          this.errors.push('Email required.');
        }
        if (!this.option) {
          this.errors.push('Option required.');
        }
        if (!this.message) {
          this.errors.push('Message required.');
        }
 
  
        e.preventDefault();
      }
    }
  })