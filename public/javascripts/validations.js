$(function(){
  $(".form-newUser form").form({
    fields:{
      name:{
        identifier: 'name',
        rules: [
         {
          type: 'empty',
          prompt: 'El campo nombre no puede estar vacío'
         }
        ]
      },
      lastname:{
        identifier: 'lastname',
        rules: [
         {
          type: 'empty',
          prompt: 'El campo primer apellido no puede estar vacío'
         }
        ]
      },
      phone:{
        identifier: 'phone',
        rules: [
         {
          type: 'empty',
          prompt: 'El campo telefono no puede estar vacío'
         },
         {
          type: 'number',
          prompt: 'El campo telefono solo debe llevar numeros'
         }
        ]
      },
      email:{
        identifier: 'email',
        rules: [
         {
          type: 'empty',
          prompt: 'El campo correo no puede estar vacío'
         },
         {
          type: 'email',
          prompt: 'El campo correo debe ser un correo'
         }
        ]
      },
      RFC:{
        identifier: 'RFC',
        rules: [
         {
          type: 'minLength[12]',
          prompt: 'El campo RFC debe tener al menos 12 caracteres'
         }
        ]
      }

    }
  })
});